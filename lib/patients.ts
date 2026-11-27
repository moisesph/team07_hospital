import type { Patient } from "./types";
import { getDb } from "./db";

interface PatientRow {
  id: string;
  hospital_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: Patient["gender"];
  email: string;
  phone: string;
  blood_type: Patient["bloodType"];
}

function mapPatient(row: PatientRow): Patient {
  return {
    id: row.id,
    hospitalId: row.hospital_id,
    firstName: row.first_name,
    lastName: row.last_name,
    dateOfBirth: row.date_of_birth,
    gender: row.gender,
    email: row.email,
    phone: row.phone,
    bloodType: row.blood_type,
  };
}

const patientColumns = `
  id, hospital_id, first_name, last_name, date_of_birth::text AS date_of_birth,
  gender, email, phone, blood_type
`;

export async function getPatients(
  hospitalId?: string | null,
): Promise<Patient[]> {
  const rows = hospitalId
    ? await getDb().query<PatientRow>(
        `SELECT ${patientColumns} FROM patients WHERE hospital_id = $1 ORDER BY id`,
        [hospitalId],
      )
    : await getDb().query<PatientRow>(
        `SELECT ${patientColumns} FROM patients ORDER BY id`,
      );
  return rows.map(mapPatient);
}

export async function getPatientById(id: string): Promise<Patient | null> {
  const rows = await getDb().query<PatientRow>(
    `SELECT ${patientColumns} FROM patients WHERE id = $1 LIMIT 1`,
    [id],
  );
  return rows[0] ? mapPatient(rows[0]) : null;
}