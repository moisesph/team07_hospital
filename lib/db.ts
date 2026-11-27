import "server-only";

import { neon } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

import { bookingAvailabilityService } from "./booking/services";
import { PrismaClient } from "./generated/prisma/client";
import { getSpecialistById } from "./specialists";
import type {
  AvailabilitySlot,
  AvailabilitySlotStatus,
  DoctorAvailability,
} from "./types";

interface DatabaseClient {
  query<Row = Record<string, unknown>>(
    statement: string,
    parameters?: unknown[],
  ): Promise<Row[]>;
}

let client: DatabaseClient | undefined;

export function getDb(): DatabaseClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is required. Configure it in your local environment or Vercel project settings.",
    );
  }

  if (!client) {
    const neonClient = neon(connectionString);
    client = {
      async query<Row>(
        statement: string,
        parameters?: unknown[],
      ): Promise<Row[]> {
        return (await neonClient.query(statement, parameters)) as Row[];
      },
    };
    return client;
  }

  return client;
}

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

export async function getMockDoctorAvailability({
  doctorId,
  from,
  to,
}: MockAvailabilityQuery): Promise<DoctorAvailability | null> {
  const specialist = await getSpecialistById(doctorId);

  if (!specialist) {
    return null;
  }

  const slots: AvailabilitySlot[] = [];
  const cursor = new Date(`${from}T00:00:00.000Z`);
  const end = new Date(`${to}T00:00:00.000Z`);
  const now = Date.now();

  while (cursor <= end) {
    const date = cursor.toISOString().slice(0, 10);
    const times = await bookingAvailabilityService.listSlots({
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
