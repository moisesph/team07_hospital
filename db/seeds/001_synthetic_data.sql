INSERT INTO hospitals (id, name, description, address, city, region, country, time_zone)
VALUES
  ('hospital-001', 'Green Valley Teaching Hospital', 'Fictitious general hospital used for development and interface testing.', '101 Demo Health Avenue', 'North Example City', 'Development District', 'Fictional Territory', 'UTC'),
  ('hospital-002', 'Sunrise Community Medical Center', 'Fictitious community medical center used for sample patient and appointment data.', '202 Prototype Boulevard', 'East Example City', 'Testing District', 'Fictional Territory', 'UTC'),
  ('hospital-003', 'Riverside Family Hospital', 'Fictitious family hospital created for development, search, and form testing.', '303 Mock River Road', 'South Example City', 'Sandbox District', 'Fictional Territory', 'UTC')
ON CONFLICT (id) DO NOTHING;

INSERT INTO specialists (id, name, specialty, hospital_id)
VALUES
  ('specialist-001', 'Dr. Elena Morris', 'Dentistry', 'hospital-001'),
  ('specialist-002', 'Jordan Ellis, DPT', 'Physiotherapy', 'hospital-002'),
  ('specialist-003', 'Dr. Priya Raman', 'General Medicine', 'hospital-001'),
  ('specialist-004', 'Dr. Samuel Ortiz', 'Cardiology', 'hospital-003'),
  ('specialist-005', 'Dr. Lila Chen', 'Pediatrics', 'hospital-002'),
  ('specialist-006', 'Dr. Amara Okafor', 'Dermatology', 'hospital-003')
ON CONFLICT (id) DO NOTHING;

INSERT INTO patients (
  id, hospital_id, first_name, last_name, date_of_birth, gender, email, phone, blood_type
)
VALUES
  ('patient-001', 'hospital-001', 'Elena', 'Marin', '1988-04-12', 'female', 'elena.marin@example.com', '+1-202-555-0101', 'A+'),
  ('patient-002', 'hospital-001', 'Daniel', 'Soto', '1976-11-03', 'male', 'daniel.soto@example.com', '+1-202-555-0102', 'O+'),
  ('patient-003', 'hospital-001', 'Maya', 'Cortez', '2001-07-19', 'female', 'maya.cortez@example.com', '+1-202-555-0103', 'B-'),
  ('patient-004', 'hospital-001', 'Noah', 'Vega', '1994-02-28', 'male', 'noah.vega@example.com', '+1-202-555-0104', 'AB+'),
  ('patient-005', 'hospital-002', 'Sofia', 'Reyes', '1983-09-15', 'female', 'sofia.reyes@example.com', '+1-202-555-0105', 'O-'),
  ('patient-006', 'hospital-002', 'Mateo', 'Luna', '1969-05-24', 'male', 'mateo.luna@example.com', '+1-202-555-0106', 'A-'),
  ('patient-007', 'hospital-002', 'Camila', 'Navarro', '1998-12-08', 'female', 'camila.navarro@example.com', '+1-202-555-0107', 'B+'),
  ('patient-008', 'hospital-002', 'Lucas', 'Mendez', '2005-03-31', 'male', 'lucas.mendez@example.com', '+1-202-555-0108', 'O+'),
  ('patient-009', 'hospital-003', 'Valeria', 'Campos', '1991-06-17', 'female', 'valeria.campos@example.com', '+1-202-555-0109', 'AB-'),
  ('patient-010', 'hospital-003', 'Gabriel', 'Rios', '1980-10-05', 'male', 'gabriel.rios@example.com', '+1-202-555-0110', 'A+'),
  ('patient-011', 'hospital-003', 'Isabella', 'Fuentes', '2010-01-22', 'female', 'isabella.fuentes@example.com', '+1-202-555-0111', 'O+'),
  ('patient-012', 'hospital-003', 'Adrian', 'Salas', '1958-08-14', 'male', 'adrian.salas@example.com', '+1-202-555-0112', 'B+')
ON CONFLICT (id) DO NOTHING;

INSERT INTO appointments (id, hospital_id, patient_id, date, time, reason, status)
VALUES
  ('appointment-001', 'hospital-001', 'patient-001', '2026-01-12', '09:00', 'Annual wellness examination', 'completed'),
  ('appointment-002', 'hospital-001', 'patient-002', '2026-02-05', '10:30', 'Blood pressure follow-up', 'completed'),
  ('appointment-003', 'hospital-001', 'patient-003', '2026-04-18', '14:00', 'Routine laboratory review', 'cancelled'),
  ('appointment-004', 'hospital-001', 'patient-004', '2026-11-20', '08:30', 'General health consultation', 'scheduled'),
  ('appointment-005', 'hospital-001', 'patient-001', '2026-12-03', '11:15', 'Preventive care follow-up', 'confirmed'),
  ('appointment-006', 'hospital-001', 'patient-002', '2027-01-14', '15:45', 'Medication review', 'pending'),
  ('appointment-007', 'hospital-002', 'patient-005', '2026-03-09', '09:45', 'Nutrition consultation', 'completed'),
  ('appointment-008', 'hospital-002', 'patient-006', '2026-05-22', '13:30', 'Joint mobility assessment', 'no-show'),
  ('appointment-009', 'hospital-002', 'patient-007', '2026-07-16', '16:00', 'Allergy symptom review', 'completed'),
  ('appointment-010', 'hospital-002', 'patient-008', '2026-11-25', '10:00', 'Routine physical examination', 'confirmed'),
  ('appointment-011', 'hospital-002', 'patient-005', '2026-12-11', '08:15', 'Laboratory results discussion', 'scheduled'),
  ('appointment-012', 'hospital-002', 'patient-006', '2027-02-02', '14:30', 'Chronic care follow-up', 'pending'),
  ('appointment-013', 'hospital-003', 'patient-009', '2026-02-27', '11:00', 'Dermatology consultation', 'completed'),
  ('appointment-014', 'hospital-003', 'patient-010', '2026-06-04', '15:00', 'Respiratory symptom follow-up', 'cancelled'),
  ('appointment-015', 'hospital-003', 'patient-011', '2026-08-13', '09:30', 'School health examination', 'completed'),
  ('appointment-016', 'hospital-003', 'patient-012', '2026-11-28', '12:45', 'Cardiovascular health review', 'confirmed'),
  ('appointment-017', 'hospital-003', 'patient-009', '2026-12-18', '10:15', 'Follow-up skin assessment', 'scheduled'),
  ('appointment-018', 'hospital-003', 'patient-012', '2027-01-29', '13:00', 'Medication and wellness review', 'pending')
ON CONFLICT (id) DO NOTHING;
