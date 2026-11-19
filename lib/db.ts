import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";

import { mockBookingAvailabilityService } from "./booking/services";
import { PrismaClient } from "./generated/prisma/client";
import { getSpecialistById } from "./specialists";
import type {
  AvailabilitySlot,
  AvailabilitySlotStatus,
  DoctorAvailability,
} from "./types";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function hasDatabaseUrl() {
  return Boolean(
    process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED,
  );
}

export function isMockAvailabilityEnabled() {
  return (
    process.env.USE_MOCK_AVAILABILITY === "1" ||
    (!hasDatabaseUrl() && process.env.NODE_ENV !== "production")
  );
}

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const connectionString =
    process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED;

  if (!connectionString) {
    throw new Error("Set DATABASE_URL to enable doctor availability.");
  }

  const client = new PrismaClient({
    adapter: new PrismaNeon({ connectionString }),
  });

  globalForPrisma.prisma = client;

  return client;
}

interface MockAvailabilityQuery {
  doctorId: string;
  from: string;
  to: string;
}

export function getMockDoctorAvailability({
  doctorId,
  from,
  to,
}: MockAvailabilityQuery): DoctorAvailability | null {
  const specialist = getSpecialistById(doctorId);

  if (!specialist) {
    return null;
  }

  const slots: AvailabilitySlot[] = [];
  const cursor = new Date(`${from}T00:00:00.000Z`);
  const end = new Date(`${to}T00:00:00.000Z`);
  const now = Date.now();

  while (cursor <= end) {
    const date = cursor.toISOString().slice(0, 10);
    const times = mockBookingAvailabilityService.listSlots({
      hospitalId: specialist.hospitalId,
      specialistId: doctorId,
      date,
    });

    times.forEach((time, index) => {
      const startsAt = Date.parse(time.startsAt);
      const marker = cursor.getUTCDate() + index;
      let status: AvailabilitySlotStatus = "available";

      if (startsAt <= now) {
        status = "past";
      } else if (marker % 7 === 0) {
        status = "booked";
      } else if (marker % 13 === 0) {
        status = "blocked";
      }

      slots.push({
        id: time.id,
        doctorId,
        date,
        startTime: time.startTime,
        startsAt: time.startsAt,
        durationMinutes: 90,
        timeZone: time.timeZone,
        status,
        available: status === "available",
      });
    });

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return {
    doctorId,
    schedulingTimeZone: slots[0]?.timeZone ?? "UTC",
    from,
    to,
    slots,
    source: "mock",
  };
}
