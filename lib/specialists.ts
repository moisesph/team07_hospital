import type { Specialist } from "./types";

const specialists: Specialist[] = [
  {
    id: "specialist-001",
    name: "Dr. Elena Morris",
    specialty: "Dentistry",
    hospitalId: "hospital-001",
  },
  {
    id: "specialist-002",
    name: "Jordan Ellis, DPT",
    specialty: "Physiotherapy",
    hospitalId: "hospital-002",
  },
  {
    id: "specialist-003",
    name: "Dr. Priya Raman",
    specialty: "General Medicine",
    hospitalId: "hospital-001",
  },
  {
    id: "specialist-004",
    name: "Dr. Samuel Ortiz",
    specialty: "Cardiology",
    hospitalId: "hospital-003",
  },
  {
    id: "specialist-005",
    name: "Dr. Lila Chen",
    specialty: "Pediatrics",
    hospitalId: "hospital-002",
  },
  {
    id: "specialist-006",
    name: "Dr. Amara Okafor",
    specialty: "Dermatology",
    hospitalId: "hospital-003",
  },
];

function cloneSpecialist(specialist: Specialist): Specialist {
  return { ...specialist };
}

export function isValidSpecialistId(id: string): boolean {
  return /^specialist-\d{3}$/.test(id);
}

export function getSpecialists(): Specialist[] {
  return specialists.map(cloneSpecialist);
}

export function getSpecialistById(id: string): Specialist | null {
  const specialist = specialists.find((record) => record.id === id);

  return specialist ? cloneSpecialist(specialist) : null;
}

export function getSpecialistsByHospital(
  hospitalId?: string | null,
): Specialist[] {
  const matchingSpecialists = hospitalId
    ? specialists.filter((specialist) => specialist.hospitalId === hospitalId)
    : specialists;

  return matchingSpecialists.map(cloneSpecialist);
}
