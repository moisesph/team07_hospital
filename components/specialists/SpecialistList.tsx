import { getHospitalById } from "../../lib/hospitals-db";
import type { Specialist } from "../../lib/types";
import SpecialistCard from "./SpecialistCard";

interface SpecialistListProps {
  specialists: Specialist[];
}

export default function SpecialistList({
  specialists,
}: SpecialistListProps) {
  return (
    <>
      {specialists.length > 0 ? (
        <ul className="specialist-list" aria-label="Specialists">
          {specialists.map((specialist) => (
            <li className="specialist-list__item" key={specialist.id}>
              <SpecialistCard
                hospital={getHospitalById(specialist.hospitalId)}
                specialist={specialist}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="specialist-list__empty" role="status">
          No specialists are currently available.
        </p>
      )}

      <style>{`
        .specialist-list {
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          list-style: none;
        }

        .specialist-list__item {
          min-width: 0;
          height: 100%;
        }

        .specialist-list__empty {
          margin: 0;
          padding: 1.5rem;
          background: var(--color-surface);
          color: var(--color-muted);
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-section);
          line-height: 1.65;
          text-align: center;
        }

        @media (max-width: 900px) {
          .specialist-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .specialist-list {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </>
  );
}
