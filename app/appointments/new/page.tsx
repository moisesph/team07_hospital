import AppointmentForm from "../../../components/appointments/AppointmentForm";
import { ButtonStyles } from "../../../components/ui/Button";

export default function NewAppointmentPage() {
  return (
    <>
      <div className="new-appointment-page">
        <section aria-labelledby="new-appointment-title">
          <header className="new-appointment-page__header">
            <p className="new-appointment-page__eyebrow">Patient services</p>
            <h1 id="new-appointment-title">Request an appointment</h1>
            <p className="new-appointment-page__description">
              The appointment request form is not available yet.
            </p>
          </header>

          <AppointmentForm />
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
