export default function AppointmentList() {
  return (
    <section
      className="appointment-list-placeholder"
      aria-labelledby="appointment-history-title"
    >
      <h2 id="appointment-history-title">Appointment history coming soon.</h2>
      <p>Viewing personal appointments is not implemented.</p>

      <style>{`
        .appointment-list-placeholder {
          margin-top: 1.25rem;
          padding: clamp(1.25rem, 5vw, 2rem);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-section);
          box-shadow: var(--shadow-section);
        }

        .appointment-list-placeholder h2,
        .appointment-list-placeholder p {
          margin: 0;
        }

        .appointment-list-placeholder p {
          margin-top: 0.75rem;
          color: var(--color-muted);
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}

/*
 * TODO: Receive only appointments authorized for the current user, enforced server-side.
 * Render them using AppointmentCard and handle loading, empty, error, and ready states.
 * Never display the entire patient/appointment fixture collection publicly.
 */