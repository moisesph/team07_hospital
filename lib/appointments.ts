import type { Appointment, AppointmentFilters } from "./types";
import { getDb } from "./db";

interface AppointmentRow {
  id: string;
  hospital_id: string;
  patient_id: string;
  date: string;
  time: string;
  reason: string;
  status: Appointment["status"];
}

function mapAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    hospitalId: row.hospital_id,
    patientId: row.patient_id,
    date: row.date,
    time: row.time,
    reason: row.reason,
    status: row.status,
  };
}

const appointmentColumns = `
  id, hospital_id, patient_id, date::text AS date,
  to_char(time, 'HH24:MI') AS time,
  reason, status
`;

export async function getAppointments(
  filters: AppointmentFilters = {},
): Promise<Appointment[]> {
  const { hospitalId, patientId, date } = filters;
  const rows = await getDb().query<AppointmentRow>(
    `SELECT ${appointmentColumns}
     FROM appointments
     WHERE ($1::text IS NULL OR hospital_id = $1)
       AND ($2::text IS NULL OR patient_id = $2)
       AND ($3::date IS NULL OR date = $3::date)
     ORDER BY date, time, id`,
    [hospitalId ?? null, patientId ?? null, date ?? null],
  );
  return rows.map(mapAppointment);
}

export async function getAppointmentById(
  id: string,
): Promise<Appointment | null> {
  const rows = await getDb().query<AppointmentRow>(
    `SELECT ${appointmentColumns} FROM appointments WHERE id = $1 LIMIT 1`,
    [id],
  );
  return rows[0] ? mapAppointment(rows[0]) : null;
}