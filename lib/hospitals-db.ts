import type { Hospital } from "./types";

const hospitals: Hospital[] = [
  {
    id: "hospital-001",
    name: "Green Valley Teaching Hospital",
    description:
      "Fictitious general hospital used for development and interface testing.",
    location: {
      address: "101 Demo Health Avenue",
      city: "North Example City",
      region: "Development District",
      country: "Fictional Territory",
    },
  },
  {
    id: "hospital-002",
    name: "Sunrise Community Medical Center",
    description:
      "Fictitious community medical center used for sample patient and appointment data.",
    location: {
      address: "202 Prototype Boulevard",
      city: "East Example City",
      region: "Testing District",
      country: "Fictional Territory",
    },
  },
  {
    id: "hospital-003",
    name: "Riverside Family Hospital",
    description:
      "Fictitious family hospital created for development, search, and form testing.",
    location: {
      address: "303 Mock River Road",
      city: "South Example City",
      region: "Sandbox District",
      country: "Fictional Territory",
    },
  },
];

function cloneHospital(hospital: Hospital): Hospital {
  return {
    ...hospital,
    location: {
      ...hospital.location,
    },
  };
}

export function getHospitals(): Hospital[] {
  return hospitals.map(cloneHospital);
}

export function getHospitalById(id: string): Hospital | null {
  const hospital = hospitals.find((record) => record.id === id);

  return hospital ? cloneHospital(hospital) : null;
}