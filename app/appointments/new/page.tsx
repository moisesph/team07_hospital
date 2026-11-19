import { Suspense } from "react";

import AppointmentForm from "../../../components/appointments/AppointmentForm";
import AvailabilityPicker from "../../../components/availability/AvailabilityPicker";
import { ButtonLink, ButtonStyles } from "../../../components/ui/Button";
import { isValidIsoDate } from "../../../lib/booking/schema";
import { getSpecialistById } from "../../../lib/specialists";

interface NewAppointmentPageProps {
  searchParams: Promise<{
    specialistId?: string | string[];
    date?: string | string[];
    slotId?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

async function AppointmentTimeSelection({
  searchParams,
}: NewAppointmentPageProps) {
  const query = await searchParams;
  const specialistId = firstValue(query.specialistId);
  const date = firstValue(query.date);
  const slotId = firstValue(query.slotId);
  const specialist = specialistId ? getSpecialistById(specialistId) : null;

  return (
    <>
      <p className="new-appointment-page__description">
        {specialist
          ? `Review available times for ${specialist.name} and choose a slot. Request submission is coming soon.`
          : "Choose a specialist and select an available time. Request submission is coming soon."}
      </p>

      {specialist ? (
        <div className="mt-6">
          <AvailabilityPicker
            doctorId={specialist.id}
            initialDate={isValidIsoDate(date) ? date : undefined}
            initialSlotId={slotId || undefined}
          />
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">
            Select a specialist to see their available appointment times.
          </p>
          <ButtonLink href="/specialists" variant="primary">
            Browse specialists
          </ButtonLink>
        </div>
      )}
    </>
  );
}

export default function NewAppointmentPage({
  searchParams,
}: NewAppointmentPageProps) {
  return (
    <>
      <div className="new-appointment-page">
        <section aria-labelledby="new-appointment-title">
          <header className="new-appointment-page__header">
            <p className="new-appointment-page__eyebrow">Patient services</p>
            <h1 id="new-appointment-title">Request an appointment</h1>

            <Suspense
              fallback={
                <p className="new-appointment-page__description">
                  Loading appointment times…
                </p>
              }
            >
              <AppointmentTimeSelection searchParams={searchParams} />
            </Suspense>
          </header>

          <div className="mt-6">
            <AppointmentForm />
          </div>
        </section>
      </div>

      <ButtonStyles />

      <style>{`
        .new-appointment-page {
          width: min(900px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.5rem, 5vw, 3.5rem);
        }

        .new-appointment-page__header {
          margin-bottom: 1.5rem;
        }

        .new-appointment-page__eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .new-appointment-page__header h1 {
          margin: 0;
        }

        .new-appointment-page__description {
          max-width: 680px;
          margin: 0.75rem 0 0;
          color: var(--color-muted);
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .new-appointment-page {
            width: calc(100% - 1.25rem);
            padding-block: 1.25rem 2rem;
          }
        }
      `}</style>
    </>
  );
}
