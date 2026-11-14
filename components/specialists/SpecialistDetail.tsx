import Link from "next/link";

import type { Hospital, Specialist } from "../../lib/types";

interface SpecialistDetailProps {
  hospital: Hospital | null;
  specialist: Specialist;
}

export default function SpecialistDetail({
  hospital,
  specialist,
}: SpecialistDetailProps) {
  return (
    <>
      <article className="specialist-detail">
        <p className="specialist-detail__eyebrow">Specialist profile</p>
        <h1 className="specialist-detail__name">{specialist.name}</h1>

        <dl className="specialist-detail__facts">
          <div className="specialist-detail__fact">
            <dt>Specialty</dt>
            <dd>{specialist.specialty}</dd>
          </div>

          <div className="specialist-detail__fact">
            <dt>Associated hospital</dt>
            <dd>
              {hospital ? (
                <>
                  <span>{hospital.name}</span>
                  <span className="specialist-detail__location">
                    {hospital.location.city}, {hospital.location.region}
                  </span>
                </>
              ) : (
                "Hospital information unavailable"
              )}
            </dd>
          </div>
        </dl>

        <Link className="specialist-detail__back-link" href="/specialists">
          Back to specialists
        </Link>
      </article>

      <style>{`
        .specialist-detail {
          min-width: 0;
          padding: clamp(1.25rem, 5vw, 2.5rem);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-section);
          box-shadow: var(--shadow-section);
        }

        .specialist-detail__eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .specialist-detail__name {
          margin: 0;
          overflow-wrap: anywhere;
        }

        .specialist-detail__facts {
          margin: 1.5rem 0 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .specialist-detail__fact {
          min-width: 0;
          padding: 1rem;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-control);
        }

        .specialist-detail__fact dt {
          color: var(--color-muted);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .specialist-detail__fact dd {
          margin: 0.45rem 0 0;
          font-weight: 700;
          line-height: 1.55;
          overflow-wrap: anywhere;
        }

        .specialist-detail__location {
          display: block;
          color: var(--color-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .specialist-detail__back-link {
          width: fit-content;
          min-height: 44px;
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
          color: var(--color-primary);
          border-radius: 4px;
          font-weight: 700;
          text-underline-offset: 4px;
        }

        .specialist-detail__back-link:hover {
          color: var(--color-primary-hover);
        }

        .specialist-detail__back-link:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
        }

        @media (max-width: 600px) {
          .specialist-detail__facts {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </>
  );
}
