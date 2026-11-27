import "dotenv/config";

import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "../lib/generated/prisma/client";
import { getSpecialists } from "../lib/specialists";

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Set DATABASE_URL_UNPOOLED (direct Neon URL) before running the seed.",
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

const slotTimes = ["09:00", "10:30", "13:30", "15:00"] as const;
const daysToSeed = 14;

function slotStart(dayOffset: number, time: (typeof slotTimes)[number]) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today.setUTCDate(today.getUTCDate() + dayOffset);

  const [hours, minutes] = time.split(":").map(Number);
  today.setUTCHours(hours, minutes, 0, 0);

  return today;
}

async function main() {
  const doctors = await getSpecialists();

  for (const doctor of doctors) {
    await prisma.doctor.upsert({
      where: { id: doctor.id },
      update: {
        name: doctor.name,
        specialty: doctor.specialty,
        hospitalId: doctor.hospitalId,
      },
      create: doctor,
    });
  }

  const slots = doctors.flatMap((doctor) =>
    Array.from({ length: daysToSeed }, (_, dayOffset) =>
      slotTimes.map((time) => ({
        doctorId: doctor.id,
        startsAt: slotStart(dayOffset, time),
      })),
    ).flat(),
  );

  await prisma.timeSlot.createMany({
    data: slots,
    skipDuplicates: true,
  });

  const unavailable = [
    { doctorId: "specialist-001", dayOffset: 1, time: "10:30" as const, status: "BOOKED" as const },
    { doctorId: "specialist-003", dayOffset: 2, time: "13:30" as const, status: "BOOKED" as const },
    { doctorId: "specialist-004", dayOffset: 3, time: "15:00" as const, status: "BLOCKED" as const },
  ];

  for (const entry of unavailable) {
    const slot = await prisma.timeSlot.findUniqueOrThrow({
      where: {
        doctorId_startsAt: {
          doctorId: entry.doctorId,
          startsAt: slotStart(entry.dayOffset, entry.time),
        },
      },
    });

    await prisma.timeSlot.update({
      where: { id: slot.id },
      data: { status: entry.status },
    });

    if (entry.status === "BOOKED") {
      await prisma.booking.upsert({
        where: { timeSlotId: slot.id },
        create: { timeSlotId: slot.id, status: "CONFIRMED" },
        update: { status: "CONFIRMED" },
      });
    }
  }

  console.log(
    `Seeded ${doctors.length} doctors and ${slots.length} time slots.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
