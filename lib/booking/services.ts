import "server-only";

import { randomUUID } from "node:crypto";

import { getHospitalById } from "../hospitals-db";
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
  hasSlotRequest(slotId: string): boolean;
  lookupIdempotency(
    requester: BookingRequest["requester"],
    idempotencyKey: string,
    fingerprint: string,
  ): RepositoryCreateResult | null;
  create(
    request: BookingRequestDraft,
    idempotencyKey: string,
    fingerprint: string,
  ): RepositoryCreateResult;
}

export class MockBookingRequestRepository
  implements BookingRequestRepository
{
  private readonly requests: BookingRequest[] = [];
  private readonly idempotencyEntries = new Map<
    string,
    { fingerprint: string; requestId: string }
  >();

  hasSlotRequest(slotId: string): boolean {
    return this.requests.some(
      (request) =>
        request.slot.id === slotId && request.status === "unresolved",
    );
  }

  lookupIdempotency(
    requester: BookingRequest["requester"],
    idempotencyKey: string,
    fingerprint: string,
  ): RepositoryCreateResult | null {
    const requesterScope =
      requester.kind === "authenticated"
        ? `authenticated:${requester.subjectId}`
        : "guest";
    const previous = this.idempotencyEntries.get(
      `${requesterScope}:${idempotencyKey}`,
    );

    if (!previous) {
      return null;
    }

    return previous.fingerprint === fingerprint
      ? { kind: "replayed", requestId: previous.requestId }
      : { kind: "idempotency-conflict" };
  }

  create(
    request: BookingRequestDraft,
    idempotencyKey: string,
    fingerprint: string,
  ): RepositoryCreateResult {
    const requesterScope =
      request.requester.kind === "authenticated"
        ? `authenticated:${request.requester.subjectId}`
        : "guest";
    const scopedKey = `${requesterScope}:${idempotencyKey}`;
    const previous = this.lookupIdempotency(
      request.requester,
      idempotencyKey,
      fingerprint,
    );

    if (previous) {
      return previous;
    }

    if (this.hasSlotRequest(request.slot.id)) {
      return { kind: "slot-conflict" };
    }

    const requestId = randomUUID();
    this.requests.push({ ...request, id: requestId });
    this.idempotencyEntries.set(scopedKey, {
      fingerprint,
      requestId,
    });

    return { kind: "created", requestId };
  }
}

export interface BookingAvailabilityService {
  getSchedulingTimeZone(hospitalId: string): string | null;
  listSlots(selection: SlotSelection): BookingSlot[];
  isSlotAvailable(slot: BookingSlot, now: Date): boolean;
}

const mockTimeZones: Readonly<Record<string, string>> = {
  "hospital-001": "UTC",
  "hospital-002": "UTC",
  "hospital-003": "UTC",
};

const mockSlotStartTimes = ["09:00", "10:30", "13:30", "15:00"] as const;

export class MockBookingAvailabilityService
  implements BookingAvailabilityService
{
  constructor(
    private readonly repository: Pick<
      BookingRequestRepository,
      "hasSlotRequest"
    >,
  ) {}

  getSchedulingTimeZone(hospitalId: string): string | null {
    if (!getHospitalById(hospitalId)) {
      return null;
    }

    return mockTimeZones[hospitalId] ?? null;
  }

  listSlots(selection: SlotSelection): BookingSlot[] {
    const hospital = getHospitalById(selection.hospitalId);
    const specialist = getSpecialistById(selection.specialistId);
    const timeZone = this.getSchedulingTimeZone(selection.hospitalId);

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

  isSlotAvailable(slot: BookingSlot, now: Date): boolean {
    return (
      Date.parse(slot.startsAt) > now.getTime() &&
      !this.repository.hasSlotRequest(slot.id)
    );
  }
}

export const mockBookingRequestRepository =
  new MockBookingRequestRepository();

export const mockBookingAvailabilityService =
  new MockBookingAvailabilityService(mockBookingRequestRepository);

export interface BookingServices {
  identityProvider: BookingIdentityProvider;
  availabilityService: BookingAvailabilityService;
  repository: BookingRequestRepository;
  clock: BookingClock;
}

const defaultBookingServices: BookingServices = {
  identityProvider: bookingIdentityProvider,
  availabilityService: mockBookingAvailabilityService,
  repository: mockBookingRequestRepository,
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

export function getAvailableBookingSlots(
  selection: SlotSelection,
  services: Pick<BookingServices, "availabilityService" | "clock"> =
    defaultBookingServices,
): AvailableSlotsResult | null {
  const hospital = getHospitalById(selection.hospitalId);
  const specialist = getSpecialistById(selection.specialistId);
  const timeZone = services.availabilityService.getSchedulingTimeZone(
    selection.hospitalId,
  );

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
  const slots = services.availabilityService
    .listSlots(selection)
    .filter((slot) =>
      services.availabilityService.isSlotAvailable(slot, now),
    );

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
  const hospital = getHospitalById(input.hospitalId);
  const specialist = getSpecialistById(input.specialistId);

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
    const patient = getPatientById(identity.patientId);
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

  const slot = services.availabilityService
    .listSlots({
      hospitalId: hospital.id,
      specialistId: specialist.id,
      date: input.date,
    })
    .find((candidate) => candidate.id === input.slotId);

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

  const previous = services.repository.lookupIdempotency(
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

  if (!services.availabilityService.isSlotAvailable(slot, now)) {
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
  const result = services.repository.create(
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
