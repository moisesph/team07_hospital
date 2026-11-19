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

export interface BookingIdentityProfile {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface BookingIdentity {
  subjectId: string;
  patientId: string | null;
  profile: BookingIdentityProfile;
}

export interface BookingSlot {
  id: string;
  hospitalId: string;
  specialistId: string;
  date: string;
  startTime: string;
  timeZone: string;
  startsAt: string;
}

export type AvailabilitySlotStatus =
  | "available"
  | "booked"
  | "blocked"
  | "past";

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  startsAt: string;
  durationMinutes: number;
  timeZone: string;
  status: AvailabilitySlotStatus;
  available: boolean;
}

export interface DoctorAvailability {
  doctorId: string;
  schedulingTimeZone: string;
  from: string;
  to: string;
  slots: AvailabilitySlot[];
  source?: "mock" | "database";
}

export type BookingRequestStatus = "unresolved";

export type BookingRequester =
  | {
      kind: "authenticated";
      subjectId: string;
      patientId: string | null;
    }
  | {
      kind: "guest";
    };

export interface BookingRequest {
  id: string;
  requester: BookingRequester;
  hospitalId: string;
  specialistId: string;
  slot: BookingSlot;
  contact: {
    name: string;
    email: string;
    phone: string | null;
  };
  reason: string | null;
  submittedAt: string;
  status: BookingRequestStatus;
}
