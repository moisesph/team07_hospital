"use client";

import { useState } from "react";

import type { AvailabilitySlot } from "../../lib/types";
import { ButtonLink, ButtonStyles } from "../ui/Button";
import AvailabilityPicker from "./AvailabilityPicker";

interface DoctorAvailabilityPanelProps {
  doctorId: string;
  doctorName?: string;
}

const selectedDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function DoctorAvailabilityPanel({
  doctorId,
  doctorName,
}: DoctorAvailabilityPanelProps) {
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null,
  );

  const requestHref = selectedSlot
    ? `/appointments/new?specialistId=${encodeURIComponent(doctorId)}&date=${encodeURIComponent(selectedSlot.date)}&slotId=${encodeURIComponent(selectedSlot.id)}`
    : null;

  return (
    <section className="mt-6 space-y-3" aria-labelledby="doctor-availability-title">
      <div>
        <h2
          className="text-xl font-semibold text-slate-900"
          id="doctor-availability-title"
        >
          {doctorName
            ? `Choose a time with ${doctorName}`
            : "Choose an appointment time"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Select an available slot to continue to the appointment request.
        </p>
      </div>

      <AvailabilityPicker doctorId={doctorId} onSelect={setSelectedSlot} />

      {selectedSlot && requestHref ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-900">
            {selectedDateFormatter.format(
              new Date(`${selectedSlot.date}T00:00:00.000Z`),
            )}{" "}
            at {selectedSlot.startTime} {selectedSlot.timeZone}
          </p>
          <ButtonLink href={requestHref} variant="primary">
            Continue to request
          </ButtonLink>
        </div>
      ) : null}

      <ButtonStyles />
    </section>
  );
}
