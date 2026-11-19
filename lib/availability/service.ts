import "server-only";

import {
  getMockDoctorAvailability,
  getPrisma,
  isMockAvailabilityEnabled,
} from "../db";
import type {
  AvailabilitySlot,
  AvailabilitySlotStatus,
  DoctorAvailability,
} from "../types";

export const SCHEDULING_TIME_ZONE = "UTC";
export const MAX_AVAILABILITY_DAYS = 31;

export interface DoctorAvailabilityQuery {
  doctorId: string;
  from: string;
  to: string;
}

export function addDaysIso(date: string, days: number): string {
  const value = new Date(`${date}T00:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() + days);

  return value.toISOString().slice(0, 10);
}

function getSlotStatus(
  slot: {
    startsAt: Date;
    status: "AVAILABLE" | "BOOKED" | "BLOCKED";
    booking: { id: string; status: "CONFIRMED" | "CANCELLED" } | null;
  },
  now: number,
): AvailabilitySlotStatus {
  if (slot.startsAt.getTime() <= now) {
    return "past";
  }

  if (slot.status === "BLOCKED") {
    return "blocked";
  }

  if (slot.status === "BOOKED" || slot.booking?.status === "CONFIRMED") {
    return "booked";
  }

  return "available";
}

export async function getDoctorAvailability({
  doctorId,
  from,
  to,
}: DoctorAvailabilityQuery): Promise<DoctorAvailability | null> {
  if (isMockAvailabilityEnabled()) {
    return getMockDoctorAvailability({ doctorId, from, to });
  }

  const prisma = getPrisma();

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { id: true },
  });

  if (!doctor) {
    return null;
  }

  const start = new Date(`${from}T00:00:00.000Z`);
  const end = new Date(`${addDaysIso(to, 1)}T00:00:00.000Z`);
  const now = Date.now();

  const timeSlots = await prisma.timeSlot.findMany({
    where: {
      doctorId,
      startsAt: { gte: start, lt: end },
    },
    include: {
      booking: {
        select: { id: true, status: true },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  const slots: AvailabilitySlot[] = timeSlots.map((slot) => {
    const status = getSlotStatus(slot, now);
    const startsAt = slot.startsAt.toISOString();

    return {
      id: slot.id,
      doctorId: slot.doctorId,
      date: startsAt.slice(0, 10),
      startTime: startsAt.slice(11, 16),
      startsAt,
      durationMinutes: slot.durationMinutes,
      timeZone: SCHEDULING_TIME_ZONE,
      status,
      available: status === "available",
    };
  });

  return {
    doctorId,
    schedulingTimeZone: SCHEDULING_TIME_ZONE,
    from,
    to,
    slots,
    source: "database",
  };
}
