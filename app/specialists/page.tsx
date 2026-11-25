import SpecialistList from "../../components/specialists/SpecialistList";
import { getSpecialistsWithHospitals } from "../../lib/specialists";

export default async function SpecialistsPage() {
  const specialists = await getSpecialistsWithHospitals();

  return (
    <>
      <div className="specialists-page">
        <section aria-labelledby="specialists-page-title">
          <header className="specialists-page__header">
            <p className="specialists-page__eyebrow">Care across our network</p>
            <h1 id="specialists-page-title">Find a specialist</h1>
            <p className="specialists-page__description">
              Browse healthcare professionals by specialty and see the
              hospital associated with each profile.
            </p>
          </header>

          <SpecialistList specialists={specialists} />
        </section>
      </div>

      <style>{`
        .specialists-page {
          width: min(1180px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.5rem, 4vw, 3.5rem);
        }

        .specialists-page__header {
          margin-bottom: 1.5rem;
        }

        .specialists-page__eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .specialists-page__header h1 {
          margin: 0;
        }

        .specialists-page__description {
          max-width: 680px;
          margin: 0.75rem 0 0;
          color: var(--color-muted);
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .specialists-page {
            width: calc(100% - 1.25rem);
            padding-block: 1.25rem 2rem;
          }
        }
      `}</style>
    </>
  );
}
