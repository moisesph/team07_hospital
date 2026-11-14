import Link from "next/link";

import type { Hospital, Specialist } from "../../lib/types";

interface SpecialistCardProps {
  hospital: Hospital | null;
  specialist: Specialist;
}

export default function SpecialistCard({
  hospital,
  specialist,
}: SpecialistCardProps) {
  return (
    <>
      <article className="specialist-card">
        <Link
          className="specialist-card__link"
          href={`/specialists/${encodeURIComponent(specialist.id)}`}
          aria-label={`View profile for ${specialist.name}`}
        >
          <span className="specialist-card__eyebrow">Healthcare professional</span>
          <h2 className="specialist-card__name">{specialist.name}</h2>
          <p className="specialist-card__specialty">{specialist.specialty}</p>

          <span className="specialist-card__hospital-label">
            Associated hospital
          </span>
          <span className="specialist-card__hospital">
            {hospital?.name ?? "Hospital information unavailable"}
          </span>

          <span className="specialist-card__action" aria-hidden="true">
            View profile <span>→</span>
          </span>
        </Link>
      </article>

      <style>{`
        .specialist-card {
          min-width: 0;
          height: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-section);
          box-shadow: var(--shadow-section);
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        .specialist-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 12px 28px rgb(32 55 43 / 12%);
          transform: translateY(-2px);
        }

        .specialist-card__link {
          min-height: 100%;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: inherit;
          border-radius: inherit;
          text-decoration: none;
        }

        .specialist-card__link:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
        }

        .specialist-card__eyebrow,
        .specialist-card__hospital-label {
          color: var(--color-muted);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .specialist-card__name {
          margin: 0.7rem 0 0;
          font-size: 1.25rem;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        .specialist-card__specialty {
          width: fit-content;
          margin: 0.75rem 0 1.2rem;
          padding: 0.3rem 0.65rem;
          background: var(--color-primary-soft);
          color: var(--color-primary);
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .specialist-card__hospital-label {
          margin-top: auto;
        }

        .specialist-card__hospital {
          margin-top: 0.35rem;
          font-weight: 600;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .specialist-card__action {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-primary);
          font-weight: 700;
        }

        @media (max-width: 600px) {
          .specialist-card__link {
            padding: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .specialist-card {
            transition: none;
          }

          .specialist-card:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
