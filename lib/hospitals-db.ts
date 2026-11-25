import type { Hospital } from "./types";
import { getDb } from "./db";

interface HospitalRow {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  region: string;
  country: string;
}

function mapHospital(row: HospitalRow): Hospital {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    location: {
      address: row.address,
      city: row.city,
      region: row.region,
      country: row.country,
    },
  };
}

const hospitalColumns = `
  id, name, description, address, city, region, country
`;

export async function getHospitals(): Promise<Hospital[]> {
  const rows = await getDb().query<HospitalRow>(
    `SELECT ${hospitalColumns} FROM hospitals ORDER BY id`,
  );
  return rows.map(mapHospital);
}

export async function getHospitalById(id: string): Promise<Hospital | null> {
  const rows = await getDb().query<HospitalRow>(
    `SELECT ${hospitalColumns} FROM hospitals WHERE id = $1 LIMIT 1`,
    [id],
  );
  return rows[0] ? mapHospital(rows[0]) : null;
}

export async function getHospitalTimeZone(
  id: string,
): Promise<string | null> {
  const rows = await getDb().query<{ time_zone: string }>(
    "SELECT time_zone FROM hospitals WHERE id = $1 LIMIT 1",
    [id],
  );
  return rows[0]?.time_zone ?? null;
}