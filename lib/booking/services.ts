import "server-only";

import { randomUUID } from "node:crypto";

import { getDb } from "../db";
import {
  getHospitalById,
  getHospitalTimeZone,
} from "../hospitals-db";
import { getPatientById } from "../patients";
import { getSpecialistById } from "../specialists";
import type {
  BookingIdentity,
  BookingRequest,
  BookingSlot,
  Hospital,
} from "../types";
import {
  isValidIsoDate,
  parseBookingInput,
  type BookingValidationErrors,
  type ValidatedBookingInput,
} from "./schema";

export interface BookingClock {
  now(): Date;
}

export const systemBookingClock: BookingClock = {
  now: () => new Date(),
};

export interface BookingIdentityProvider {
  getCurrentIdentity(): Promise<BookingIdentity | null>;
}

export class MockBookingIdentityProvider
  implements BookingIdentityProvider
{
  async getCurrentIdentity(): Promise<BookingIdentity | null> {
    const mode = process.env.BOOKING_DEMO_IDENTITY ?? "signed-in";

    if (mode === "guest") {
      return null;
    }

    if (mode === "signed-in") {
      return {
        subjectId: "demo-account-001",
        patientId: null,
        profile: {
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          phone: "+1-202-555-0199",
        },
      };
    }

    if (mode === "signed-in-incomplete") {
      return {
        subjectId: "demo-account-incomplete-001",
        patientId: null,
        profile: {
          name: "Jordan Demo",
          email: null,
          phone: null,
        },
      };
    }

    throw new Error(
      "BOOKING_DEMO_IDENTITY must be guest, signed-in, or signed-in-incomplete.",
    );
  }
}

// The authentication teammate replaces this adapter with the trusted session provider.
export const bookingIdentityProvider: BookingIdentityProvider =
  new MockBookingIdentityProvider();

export interface SlotSelection {
  hospitalId: string;
  specialistId: string;
  date: string;
}

export type BookingRequestDraft = Omit<BookingRequest, "id">;

export type RepositoryCreateResult =
  | { kind: "created"; requestId: string }
  | { kind: "replayed"; requestId: string }
  | { kind: "slot-conflict" }
  | { kind: "idempotency-conflict" };

export interface BookingRequestRepository {
  hasSlotRequest(slotId: string): Promise<boolean>;
  lookupIdempotency(
    requester: BookingRequest["requester"],
    idempotencyKey: string,
    fingerprint: string,
  ): Promise<RepositoryCreateResult | null>;
  create(
    request: BookingRequestDraft,
    idempotencyKey: string,
    fingerprint: string,
  ): Promise<RepositoryCreateResult>;
}

function requesterScope(requester: BookingRequest["requester"]): string {
  return requester.kind === "authenticated"
    ? `authenticated:${requester.subjectId}`
    : "guest";
}

export class PostgresBookingRequestRepository
  implements BookingRequestRepository
{
  async hasSlotRequest(slotId: string): Promise<boolean> {
    const rows = await getDb().query<{ exists: boolean }>(
      "SELECT EXISTS (SELECT 1 FROM booking_requests WHERE slot_id = $1 AND status = 'unresolved') AS exists",
      [slotId],
    );
    return rows[0]?.exists ?? false;
  }

  async lookupIdempotency(
    requester: BookingRequest["requester"],
    idempotencyKey: string,
    fingerprint: string,
  ): Promise<RepositoryCreateResult | null> {
    const rows = await getDb().query<{
      fingerprint: string;
      request_id: string;
    }>(
      `SELECT fingerprint, id AS request_id
       FROM booking_requests
       WHERE requester_scope = $1 AND idempotency_key = $2
       LIMIT 1`,
      [requesterScope(requester), idempotencyKey],
    );
    const previous = rows[0];

    if (!previous) {
      return null;
    }

    return previous.fingerprint === fingerprint
      ? { kind: "replayed", requestId: previous.request_id }
      : { kind: "idempotency-conflict" };
  }

  async create(
    request: BookingRequestDraft,
    idempotencyKey: string,
    fingerprint: string,
  ): Promise<RepositoryCreateResult> {
    const scope = requesterScope(request.requester);
    const previous = await this.lookupIdempotency(
      request.requester,
      idempotencyKey,
      fingerprint,
    );

    if (previous) {
      return previous;
    }

    const requestId = randomUUID();
    const rows = await getDb().query<{ id: string }>(
      `INSERT INTO booking_requests (
         id, requester_kind, requester_subject_id, patient_id, hospital_id,
         specialist_id, slot_id, slot_date, slot_start_time, time_zone,
         starts_at, contact_name, contact_email, contact_phone, reason,
         submitted_at, status, requester_scope, idempotency_key, fingerprint
       )
       VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8::date, $9::time, $10,
         $11::timestamptz, $12, $13, $14, $15, $16::timestamptz,
         $17, $18, $19, $20
       )
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [
        requestId,
        request.requester.kind,
        request.requester.kind === "authenticated"
          ? request.requester.subjectId
          : null,
        request.requester.kind === "authenticated"
          ? request.requester.patientId
          : null,
        request.hospitalId,
        request.specialistId,
        request.slot.id,
        request.slot.date,
        request.slot.startTime,
        request.slot.timeZone,
        request.slot.startsAt,
        request.contact.name,
        request.contact.email,
        request.contact.phone,
        request.reason,
        request.submittedAt,
        request.status,
        scope,
        idempotencyKey,
        fingerprint,
      ],
    );

    if (rows[0]) {
      return { kind: "created", requestId: rows[0].id };
    }

    const concurrentRetry = await this.lookupIdempotency(
      request.requester,
      idempotencyKey,
      fingerprint,
    );
    if (concurrentRetry) {
      return concurrentRetry;
    }

    return (await this.hasSlotRequest(request.slot.id))
      ? { kind: "slot-conflict" }
      : { kind: "idempotency-conflict" };
  }
}

export interface BookingAvailabilityService {
  getSchedulingTimeZone(hospitalId: string): Promise<string | null>;
  listSlots(selection: SlotSelection): Promise<BookingSlot[]>;
  isSlotAvailable(slot: BookingSlot, now: Date): Promise<boolean>;
}

const mockSlotStartTimes = ["09:00", "10:30", "13:30", "15:00"] as const;

export class DatabaseBookingAvailabilityService
  implements BookingAvailabilityService
{
  constructor(
    private readonly repository: Pick<
      BookingRequestRepository,
      "hasSlotRequest"
    >,
  ) {}

  async getSchedulingTimeZone(hospitalId: string): Promise<string | null> {
    return getHospitalTimeZone(hospitalId);
  }

  async listSlots(selection: SlotSelection): Promise<BookingSlot[]> {
    const [hospital, specialist, timeZone] = await Promise.all([
      getHospitalById(selection.hospitalId),
      getSpecialistById(selection.specialistId),
      this.getSchedulingTimeZone(selection.hospitalId),
    ]);

    if (
      !hospital ||
      !specialist ||
      specialist.hospitalId !== hospital.id ||
      !timeZone ||
      !isValidIsoDate(selection.date)
    ) {
      return [];
    }

    return mockSlotStartTimes.map((startTime) => ({
      id: [
        "demo-slot",
        selection.hospitalId,
        selection.specialistId,
        selection.date,
        startTime.replace(":", ""),
      ].join(":"),
      hospitalId: selection.hospitalId,
      specialistId: selection.specialistId,
      date: selection.date,
      startTime,
      timeZone,
      startsAt: `${selection.date}T${startTime}:00.000Z`,
    }));
  }

  async isSlotAvailable(slot: BookingSlot, now: Date): Promise<boolean> {
    return (
      Date.parse(slot.startsAt) > now.getTime() &&
      !(await this.repository.hasSlotRequest(slot.id))
    );
  }
}

export const bookingRequestRepository =
  new PostgresBookingRequestRepository();

export const bookingAvailabilityService =
  new DatabaseBookingAvailabilityService(bookingRequestRepository);

export interface BookingServices {
  identityProvider: BookingIdentityProvider;
  availabilityService: BookingAvailabilityService;
  repository: BookingRequestRepository;
  clock: BookingClock;
}

const defaultBookingServices: BookingServices = {
  identityProvider: bookingIdentityProvider,
  availabilityService: bookingAvailabilityService,
  repository: bookingRequestRepository,
  clock: systemBookingClock,
};

export interface AvailableSlotsResult {
  hospital: Hospital;
  timeZone: string;
  slots: BookingSlot[];
}

export type BookingSubmissionResult =
  | {
      ok: true;
      requestId: string;
      replayed: boolean;
      message: string;
    }
  | {
      ok: false;
      status: 400 | 409;
      errors: BookingValidationErrors;
    };

function fieldError(
  field: keyof ValidatedBookingInput,
  message: string,
  status: 400 | 409 = 400,
): BookingSubmissionResult {
  return {
    ok: false,
    status,
    errors: { fields: { [field]: message } },
  };
}

function formError(
  message: string,
  status: 400 | 409 = 400,
): BookingSubmissionResult {
  return {
    ok: false,
    status,
    errors: { fields: {}, formError: message },
  };
}

export async function getAvailableBookingSlots(
  selection: SlotSelection,
  services: Pick<BookingServices, "availabilityService" | "clock"> =
    defaultBookingServices,
): Promise<AvailableSlotsResult | null> {
  const [hospital, specialist, timeZone] = await Promise.all([
    getHospitalById(selection.hospitalId),
    getSpecialistById(selection.specialistId),
    services.availabilityService.getSchedulingTimeZone(selection.hospitalId),
  ]);

  if (
    !hospital ||
    !specialist ||
    specialist.hospitalId !== hospital.id ||
    !timeZone ||
    !isValidIsoDate(selection.date)
  ) {
    return null;
  }

  const now = services.clock.now();
  const candidates = await services.availabilityService.listSlots(selection);
  const available = await Promise.all(
    candidates.map(async (slot) => ({
      slot,
      available: await services.availabilityService.isSlotAvailable(slot, now),
    })),
  );
  const slots = available
    .filter(({ available: isAvailable }) => isAvailable)
    .map(({ slot }) => slot);

  return { hospital, timeZone, slots };
}

const idempotencyKeyPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function submitBookingRequest(
  payload: unknown,
  idempotencyKey: string | null,
  services: BookingServices = defaultBookingServices,
): Promise<BookingSubmissionResult> {
  const parsed = parseBookingInput(payload);

  if (!parsed.success) {
    return { ok: false, status: 400, errors: parsed.errors };
  }

  if (!idempotencyKey || !idempotencyKeyPattern.test(idempotencyKey)) {
    return formError("A valid idempotency key is required.");
  }

  const identity = await services.identityProvider.getCurrentIdentity();
  const input = parsed.data;
  const [hospital, specialist] = await Promise.all([
    getHospitalById(input.hospitalId),
    getSpecialistById(input.specialistId),
  ]);

  if (!hospital) {
    return fieldError("hospitalId", "Choose a hospital in this network.");
  }

  if (!specialist) {
    return fieldError("specialistId", "Choose an available specialist.");
  }

  if (specialist.hospitalId !== hospital.id) {
    return fieldError(
      "specialistId",
      "Choose a specialist associated with the selected hospital.",
    );
  }

  let patientId: string | null = null;
  if (identity?.patientId) {
    const patient = await getPatientById(identity.patientId);
    if (!patient) {
      throw new Error(
        "The trusted booking identity references an unknown patient.",
      );
    }

    if (patient.hospitalId !== hospital.id) {
      return fieldError(
        "hospitalId",
        "This account's linked patient record belongs to a different hospital.",
      );
    }

    patientId = patient.id;
  }

  const slots = await services.availabilityService.listSlots({
    hospitalId: hospital.id,
    specialistId: specialist.id,
    date: input.date,
  });
  const slot = slots.find((candidate) => candidate.id === input.slotId);

  if (!slot) {
    return fieldError(
      "slotId",
      "Choose a slot offered for the selected hospital, specialist, and date.",
    );
  }

  const requester = identity
    ? {
        kind: "authenticated" as const,
        subjectId: identity.subjectId,
        patientId,
      }
    : { kind: "guest" as const };

  const fingerprint = JSON.stringify({
    requester,
    hospitalId: hospital.id,
    specialistId: specialist.id,
    slotId: slot.id,
    contact: {
      name: input.contactName,
      email: input.contactEmail,
      phone: input.contactPhone || null,
    },
    reason: input.reason || null,
  });

  const previous = await services.repository.lookupIdempotency(
    requester,
    idempotencyKey,
    fingerprint,
  );
  if (previous?.kind === "replayed") {
    return {
      ok: true,
      requestId: previous.requestId,
      replayed: true,
      message: "Demo request created. No real appointment has been reserved.",
    };
  }
  if (previous?.kind === "idempotency-conflict") {
    return formError(
      "This retry key was already used for different request details. Review your request and try again.",
      409,
    );
  }

  const now = services.clock.now();
  if (Date.parse(slot.startsAt) <= now.getTime()) {
    return fieldError(
      "slotId",
      "That time has passed. Choose another available slot.",
      409,
    );
  }

  if (!(await services.availabilityService.isSlotAvailable(slot, now))) {
    return fieldError(
      "slotId",
      "That demo slot is no longer available. Choose another slot.",
      409,
    );
  }

  const request: BookingRequestDraft = {
    requester,
    hospitalId: hospital.id,
    specialistId: specialist.id,
    slot,
    contact: {
      name: input.contactName,
      email: input.contactEmail,
      phone: input.contactPhone || null,
    },
    reason: input.reason || null,
    submittedAt: now.toISOString(),
    status: "unresolved",
  };
  const result = await services.repository.create(
    request,
    idempotencyKey,
    fingerprint,
  );

  if (result.kind === "slot-conflict") {
    return fieldError(
      "slotId",
      "That demo slot is no longer available. Choose another slot.",
      409,
    );
  }

  if (result.kind === "idempotency-conflict") {
    return formError(
      "This retry key was already used for different request details. Review your request and try again.",
      409,
    );
  }

  return {
    ok: true,
    requestId: result.requestId,
    replayed: result.kind === "replayed",
    message: "Demo request created. No real appointment has been reserved.",
  };
}
