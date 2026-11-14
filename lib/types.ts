export interface HospitalLocation {
  address: string;
  city: string;
  region: string;
  country: string;
}

export interface Hospital {
  id: string;
  name: string;
  description: string;
  location: HospitalLocation;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  hospitalId: string;
}

export type PatientGender = "female" | "male";

export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export interface Patient {
  id: string;
  hospitalId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: PatientGender;
  email: string;
  phone: string;
  bloodType: BloodType;
}

export type AppointmentStatus =
  | "pending"
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no-show";

export interface Appointment {
  id: string;
  hospitalId: string;
  patientId: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
}

export interface AppointmentFilters {
  hospitalId?: string | null;
  patientId?: string | null;
  date?: string | null;
}
