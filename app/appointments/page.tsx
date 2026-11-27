import AppointmentList from "../../components/appointments/AppointmentList";
import { ButtonLink, ButtonStyles } from "../../components/ui/Button";

export default function AppointmentsPage() {
  return (
    <>
      <div className="appointments-page">
        <section
          className="appointments-page__panel"
          aria-labelledby="appointments-page-title"
        >
          <p className="appointments-page__eyebrow">Patient services</p>
          <h1 id="appointments-page-title">Appointments</h1>
          <p className="appointments-page__description">
            Browse specialists to view their available appointment times and
            choose a slot. Request submission and personal appointment history
            are coming soon.
          </p>
          <div className="appointments-page__actions">
            <ButtonLink href="/specialists" variant="primary">
              Browse specialists
            </ButtonLink>
            <ButtonLink href="/appointments/new" variant="secondary">
              View time selection
            </ButtonLink>
          </div>
        </section>
        <AppointmentList />
      </div>

      <ButtonStyles />

      <style>{`
        .appointments-page {
          width: min(900px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.5rem, 5vw, 3.5rem);
        }

        .appointments-page__panel {
          padding: clamp(1.25rem, 5vw, 2.5rem);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-section);
          box-shadow: var(--shadow-section);
        }

        .appointments-page__eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .appointments-page__panel h1 {
          margin: 0;
        }

        .appointments-page__description {
          max-width: 680px;
          margin: 0.75rem 0 1.5rem;
          color: var(--color-muted);
          line-height: 1.7;
        }

        .appointments-page__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        @media (max-width: 600px) {
          .appointments-page {
            width: calc(100% - 1.25rem);
            padding-block: 1.25rem 2rem;
          }

          .appointments-page__panel .ui-button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}