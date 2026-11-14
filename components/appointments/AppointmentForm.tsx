import { ButtonLink } from "../ui/Button";

/*
 * TODO: For a future interactive form:
 * - Use React Hook Form for values, errors, and submission state.
 * - Use Zod for shared client/server structural validation via @hookform/resolvers.
 * - Reuse the existing Input, Select, and Button components.
 * - Support guest requests and contact prefill from a trusted session provider.
 * - Filter specialists by hospital and clear incompatible selections.
 * - Keep availability fetching separate, with safe cancellation and explicit retry.
 * - Preserve authoritative server-side identity, relationship, slot, and idempotency checks.
 * - Use contextual skeletons for real loading and focus validation errors only after failed attempts.
 */
export default function AppointmentForm() {
  return (
    <section
      className="appointment-form-placeholder"
      aria-labelledby="appointment-form-placeholder-title"
    >
      <h2 id="appointment-form-placeholder-title">
        Appointment request form coming soon.
      </h2>
      <p>Appointment request submission through this page is not available yet.</p>
      <ButtonLink href="/appointments" variant="secondary">
        Back to appointments
      </ButtonLink>

      <style>{`
        .appointment-form-placeholder {
          padding: clamp(1.25rem, 5vw, 2rem);
          display: grid;
          justify-items: start;
          gap: 1rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-section);
          box-shadow: var(--shadow-section);
        }

        .appointment-form-placeholder h2,
        .appointment-form-placeholder p {
          margin: 0;
        }

        .appointment-form-placeholder p {
          color: var(--color-muted);
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}
