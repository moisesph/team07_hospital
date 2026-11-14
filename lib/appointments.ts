import type { Appointment, AppointmentFilters } from "./types";

const appointments: Appointment[] = [
  {
    id: "appointment-001",
    hospitalId: "hospital-001",
    patientId: "patient-001",
    date: "2026-01-12",
    time: "09:00",
    reason: "Annual wellness examination",
    status: "completed",
  },
  {
    id: "appointment-002",
    hospitalId: "hospital-001",
    patientId: "patient-002",
    date: "2026-02-05",
    time: "10:30",
    reason: "Blood pressure follow-up",
    status: "completed",
  },
  {
    id: "appointment-003",
    hospitalId: "hospital-001",
    patientId: "patient-003",
    date: "2026-04-18",
    time: "14:00",
    reason: "Routine laboratory review",
    status: "cancelled",
  },
  {
    id: "appointment-004",
    hospitalId: "hospital-001",
    patientId: "patient-004",
    date: "2026-11-20",
    time: "08:30",
    reason: "General health consultation",
    status: "scheduled",
  },
  {
    id: "appointment-005",
    hospitalId: "hospital-001",
    patientId: "patient-001",
    date: "2026-12-03",
    time: "11:15",
    reason: "Preventive care follow-up",
    status: "confirmed",
  },
  {
    id: "appointment-006",
    hospitalId: "hospital-001",
    patientId: "patient-002",
    date: "2027-01-14",
    time: "15:45",
    reason: "Medication review",
    status: "pending",
  },
  {
    id: "appointment-007",
    hospitalId: "hospital-002",
    patientId: "patient-005",
    date: "2026-03-09",
    time: "09:45",
    reason: "Nutrition consultation",
    status: "completed",
  },
  {
    id: "appointment-008",
    hospitalId: "hospital-002",
    patientId: "patient-006",
    date: "2026-05-22",
    time: "13:30",
    reason: "Joint mobility assessment",
    status: "no-show",
  },
  {
    id: "appointment-009",
    hospitalId: "hospital-002",
    patientId: "patient-007",
    date: "2026-07-16",
    time: "16:00",
    reason: "Allergy symptom review",
    status: "completed",
  },
  {
    id: "appointment-010",
    hospitalId: "hospital-002",
    patientId: "patient-008",
    date: "2026-11-25",
    time: "10:00",
    reason: "Routine physical examination",
    status: "confirmed",
  },
  {
    id: "appointment-011",
    hospitalId: "hospital-002",
    patientId: "patient-005",
    date: "2026-12-11",
    time: "08:15",
    reason: "Laboratory results discussion",
    status: "scheduled",
  },
  {
    id: "appointment-012",
    hospitalId: "hospital-002",
    patientId: "patient-006",
    date: "2027-02-02",
    time: "14:30",
    reason: "Chronic care follow-up",
    status: "pending",
  },
  {
    id: "appointment-013",
    hospitalId: "hospital-003",
    patientId: "patient-009",
    date: "2026-02-27",
    time: "11:00",
    reason: "Dermatology consultation",
    status: "completed",
  },
  {
    id: "appointment-014",
    hospitalId: "hospital-003",
    patientId: "patient-010",
    date: "2026-06-04",
    time: "15:00",
    reason: "Respiratory symptom follow-up",
    status: "cancelled",
  },
  {
    id: "appointment-015",
    hospitalId: "hospital-003",
    patientId: "patient-011",
    date: "2026-08-13",
    time: "09:30",
    reason: "School health examination",
    status: "completed",
  },
  {
    id: "appointment-016",
    hospitalId: "hospital-003",
    patientId: "patient-012",
    date: "2026-11-28",
    time: "12:45",
    reason: "Cardiovascular health review",
    status: "confirmed",
  },
  {
    id: "appointment-017",
    hospitalId: "hospital-003",
    patientId: "patient-009",
    date: "2026-12-18",
    time: "10:15",
    reason: "Follow-up skin assessment",
    status: "scheduled",
  },
  {
    id: "appointment-018",
    hospitalId: "hospital-003",
    patientId: "patient-012",
    date: "2027-01-29",
    time: "13:00",
    reason: "Medication and wellness review",
    status: "pending",
  },
];

function cloneAppointment(appointment: Appointment): Appointment {
  return {
    ...appointment,
  };
}

export function getAppointments(
  filters: AppointmentFilters = {},
): Appointment[] {
  const { hospitalId, patientId, date } = filters;

  return appointments
    .filter((appointment) => {
      if (hospitalId && appointment.hospitalId !== hospitalId) {
        return false;
      }

      if (patientId && appointment.patientId !== patientId) {
        return false;
      }

      if (date && appointment.date !== date) {
        return false;
      }

      return true;
    })
    .map(cloneAppointment);
}

export function getAppointmentById(id: string): Appointment | null {
  const appointment = appointments.find((record) => record.id === id);

  return appointment ? cloneAppointment(appointment) : null;
}