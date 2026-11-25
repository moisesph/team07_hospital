import { Suspense } from "react";
import { notFound } from "next/navigation";

import SpecialistDetail from "../../../components/specialists/SpecialistDetail";
import { getHospitalById } from "../../../lib/hospitals-db";
import { getSpecialistById } from "../../../lib/specialists";

interface SpecialistPageProps {
  params: Promise<{ id: string }>;
}

async function SpecialistProfile({
  params,
}: SpecialistPageProps) {
  const { id } = await params;
  const specialist = await getSpecialistById(id);

  if (!specialist) {
    notFound();
  }

  const hospital = await getHospitalById(specialist.hospitalId);

  return (
    <SpecialistDetail
      hospital={hospital}
      specialist={specialist}
    />
  );
}

export default function SpecialistPage({ params }: SpecialistPageProps) {
  return (
    <>
      <div className="specialist-profile-page">
        <Suspense
          fallback={
            <p className="specialist-profile-page__loading" role="status">
              Loading specialist profile…
            </p>
          }
        >
          <SpecialistProfile params={params} />
        </Suspense>
      </div>

      <style>{`
        .specialist-profile-page {
          width: min(900px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.5rem, 5vw, 3.5rem);
        }

        .specialist-profile-page__loading {
          margin: 0;
          padding: 1.5rem;
          color: var(--color-muted);
          text-align: center;
        }

        @media (max-width: 600px) {
          .specialist-profile-page {
            width: calc(100% - 1.25rem);
            padding-block: 1.25rem 2rem;
          }
        }
      `}</style>
    </>
  );
}
