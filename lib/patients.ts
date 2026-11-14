import type { Patient } from "./types";

const patients: Patient[] = [
  {
    id: "patient-001",
    hospitalId: "hospital-001",
    firstName: "Elena",
    lastName: "Marin",
    dateOfBirth: "1988-04-12",
    gender: "female",
    email: "elena.marin@example.com",
    phone: "+1-202-555-0101",
    bloodType: "A+",
  },
  {
    id: "patient-002",
    hospitalId: "hospital-001",
    firstName: "Daniel",
    lastName: "Soto",
    dateOfBirth: "1976-11-03",
    gender: "male",
    email: "daniel.soto@example.com",
    phone: "+1-202-555-0102",
    bloodType: "O+",
  },
  {
    id: "patient-003",
    hospitalId: "hospital-001",
    firstName: "Maya",
    lastName: "Cortez",
    dateOfBirth: "2001-07-19",
    gender: "female",
    email: "maya.cortez@example.com",
    phone: "+1-202-555-0103",
    bloodType: "B-",
  },
  {
    id: "patient-004",
    hospitalId: "hospital-001",
    firstName: "Noah",
    lastName: "Vega",
    dateOfBirth: "1994-02-28",
    gender: "male",
    email: "noah.vega@example.com",
    phone: "+1-202-555-0104",
    bloodType: "AB+",
  },
  {
    id: "patient-005",
    hospitalId: "hospital-002",
    firstName: "Sofia",
    lastName: "Reyes",
    dateOfBirth: "1983-09-15",
    gender: "female",
    email: "sofia.reyes@example.com",
    phone: "+1-202-555-0105",
    bloodType: "O-",
  },
  {
    id: "patient-006",
    hospitalId: "hospital-002",
    firstName: "Mateo",
    lastName: "Luna",
    dateOfBirth: "1969-05-24",
    gender: "male",
    email: "mateo.luna@example.com",
    phone: "+1-202-555-0106",
    bloodType: "A-",
  },
  {
    id: "patient-007",
    hospitalId: "hospital-002",
    firstName: "Camila",
    lastName: "Navarro",
    dateOfBirth: "1998-12-08",
    gender: "female",
    email: "camila.navarro@example.com",
    phone: "+1-202-555-0107",
    bloodType: "B+",
  },
  {
    id: "patient-008",
    hospitalId: "hospital-002",
    firstName: "Lucas",
    lastName: "Mendez",
    dateOfBirth: "2005-03-31",
    gender: "male",
    email: "lucas.mendez@example.com",
    phone: "+1-202-555-0108",
    bloodType: "O+",
  },
  {
    id: "patient-009",
    hospitalId: "hospital-003",
    firstName: "Valeria",
    lastName: "Campos",
    dateOfBirth: "1991-06-17",
    gender: "female",
    email: "valeria.campos@example.com",
    phone: "+1-202-555-0109",
    bloodType: "AB-",
  },
  {
    id: "patient-010",
    hospitalId: "hospital-003",
    firstName: "Gabriel",
    lastName: "Rios",
    dateOfBirth: "1980-10-05",
    gender: "male",
    email: "gabriel.rios@example.com",
    phone: "+1-202-555-0110",
    bloodType: "A+",
  },
  {
    id: "patient-011",
    hospitalId: "hospital-003",
    firstName: "Isabella",
    lastName: "Fuentes",
    dateOfBirth: "2010-01-22",
    gender: "female",
    email: "isabella.fuentes@example.com",
    phone: "+1-202-555-0111",
    bloodType: "O+",
  },
  {
    id: "patient-012",
    hospitalId: "hospital-003",
    firstName: "Adrian",
    lastName: "Salas",
    dateOfBirth: "1958-08-14",
    gender: "male",
    email: "adrian.salas@example.com",
    phone: "+1-202-555-0112",
    bloodType: "B+",
  },
];

function clonePatient(patient: Patient): Patient {
  return {
    ...patient,
  };
}

export function getPatients(hospitalId?: string | null): Patient[] {
  const matchingPatients = hospitalId
    ? patients.filter((patient) => patient.hospitalId === hospitalId)
    : patients;

  return matchingPatients.map(clonePatient);
}

export function getPatientById(id: string): Patient | null {
  const patient = patients.find((record) => record.id === id);

  return patient ? clonePatient(patient) : null;
}