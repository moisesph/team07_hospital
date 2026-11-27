CREATE TABLE IF NOT EXISTS hospitals (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  region text NOT NULL,
  country text NOT NULL,
  time_zone text NOT NULL DEFAULT 'UTC'
);

CREATE TABLE IF NOT EXISTS specialists (
  id text PRIMARY KEY,
  name text NOT NULL,
  specialty text NOT NULL,
  hospital_id text NOT NULL REFERENCES hospitals(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS specialists_hospital_id_idx ON specialists (hospital_id);

CREATE TABLE IF NOT EXISTS patients (
  id text PRIMARY KEY,
  hospital_id text NOT NULL REFERENCES hospitals(id) ON DELETE RESTRICT,
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL CHECK (gender IN ('female', 'male')),
  email text NOT NULL,
  phone text NOT NULL,
  blood_type text NOT NULL CHECK (
    blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
  )
);

CREATE INDEX IF NOT EXISTS patients_hospital_id_idx ON patients (hospital_id);

CREATE TABLE IF NOT EXISTS appointments (
  id text PRIMARY KEY,
  hospital_id text NOT NULL REFERENCES hospitals(id) ON DELETE RESTRICT,
  patient_id text NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
  date date NOT NULL,
  time time NOT NULL,
  reason text NOT NULL,
  status text NOT NULL CHECK (
    status IN ('pending', 'scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')
  )
);

CREATE INDEX IF NOT EXISTS appointments_hospital_date_idx ON appointments (hospital_id, date, time);
CREATE INDEX IF NOT EXISTS appointments_patient_id_idx ON appointments (patient_id);

CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY,
  requester_kind text NOT NULL CHECK (requester_kind IN ('authenticated', 'guest')),
  requester_subject_id text,
  patient_id text REFERENCES patients(id) ON DELETE RESTRICT,
  hospital_id text NOT NULL REFERENCES hospitals(id) ON DELETE RESTRICT,
  specialist_id text NOT NULL REFERENCES specialists(id) ON DELETE RESTRICT,
  slot_id text NOT NULL UNIQUE,
  slot_date date NOT NULL,
  slot_start_time time NOT NULL,
  time_zone text NOT NULL,
  starts_at timestamptz NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  reason text,
  submitted_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status = 'unresolved'),
  requester_scope text NOT NULL,
  idempotency_key text NOT NULL,
  fingerprint text NOT NULL,
  CHECK (
    (requester_kind = 'guest' AND requester_subject_id IS NULL AND patient_id IS NULL)
    OR (requester_kind = 'authenticated' AND requester_subject_id IS NOT NULL)
  ),
  UNIQUE (requester_scope, idempotency_key)
);
