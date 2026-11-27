import type { Hospital, Specialist } from "./types";
import { getDb } from "./db";

interface SpecialistRow {
  id: string;
  name: string;
  specialty: string;
  hospital_id: string;
}

function mapSpecialist(row: SpecialistRow): Specialist {
  return {
    id: row.id,
    name: row.name,
    specialty: row.specialty,
    hospitalId: row.hospital_id,
  };
}

interface SpecialistWithHospitalRow extends SpecialistRow {
  hospital_name: string;
  hospital_description: string;
  hospital_address: string;
  hospital_city: string;
  hospital_region: string;
  hospital_country: string;
}

export interface SpecialistWithHospital extends Specialist {
  hospital: Hospital;
}

function mapSpecialistWithHospital(
  row: SpecialistWithHospitalRow,
): SpecialistWithHospital {
  return {
    ...mapSpecialist(row),
    hospital: {
      id: row.hospital_id,
      name: row.hospital_name,
      description: row.hospital_description,
      location: {
        address: row.hospital_address,
        city: row.hospital_city,
        region: row.hospital_region,
        country: row.hospital_country,
      },
    },
  };
}

const specialistWithHospitalColumns = `
  s.id, s.name, s.specialty, s.hospital_id,
  h.name AS hospital_name, h.description AS hospital_description,
  h.address AS hospital_address, h.city AS hospital_city,
  h.region AS hospital_region, h.country AS hospital_country
`;

export function isValidSpecialistId(id: string): boolean {
  return /^specialist-\d{3}$/.test(id);
}

export async function getSpecialistsWithHospitals(): Promise<
  SpecialistWithHospital[]
> {
  const rows = await getDb().query<SpecialistWithHospitalRow>(
    `SELECT ${specialistWithHospitalColumns}
     FROM specialists s
     JOIN hospitals h ON h.id = s.hospital_id
     ORDER BY s.id`,
  );
  return rows.map(mapSpecialistWithHospital);
}

export async function getSpecialists(): Promise<Specialist[]> {
  const rows = await getDb().query<SpecialistRow>(
    "SELECT id, name, specialty, hospital_id FROM specialists ORDER BY id",
  );
  return rows.map(mapSpecialist);
}

export async function getSpecialistById(
  id: string,
): Promise<Specialist | null> {
  const rows = await getDb().query<SpecialistRow>(
    "SELECT id, name, specialty, hospital_id FROM specialists WHERE id = $1 LIMIT 1",
    [id],
  );
  return rows[0] ? mapSpecialist(rows[0]) : null;
}

export async function getSpecialistsByHospital(
  hospitalId?: string | null,
): Promise<Specialist[]> {
  const rows = hospitalId
    ? await getDb().query<SpecialistRow>(
        "SELECT id, name, specialty, hospital_id FROM specialists WHERE hospital_id = $1 ORDER BY id",
        [hospitalId],
      )
    : await getDb().query<SpecialistRow>(
        "SELECT id, name, specialty, hospital_id FROM specialists ORDER BY id",
      );
  return rows.map(mapSpecialist);
}
