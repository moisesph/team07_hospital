# Hospital Patient Services Portal

## Project Title & Description

Hospital Patient Services Portal is a web app that helps patients access common hospital services without needing an in-person visit.

The initial release focuses on core self-service workflows: account creation, doctor discovery, appointment booking, medicine browsing, and home delivery requests.

## Purpose & Target Audience

- Audience: Existing and prospective patients who want to access hospital doctors, appointments, and medicines.
- Purpose: Provide a clear self-service path for patients to manage their healthcare needs efficiently.

## User Stories

1. As a patient, I want to create an account so that I can securely book appointments and request medicine deliveries.
2. As a patient, I want to browse and search doctors by name or specialty so that I can find the right clinician.
3. As a signed-in patient, I want to book an available appointment slot so that I can arrange a hospital visit.
4. As a patient, I want to browse the medicine catalog so that I can see item availability and prescription requirements.
5. As a signed-in patient, I want to submit a home-delivery request for medicines so that the hospital can review and fulfill it.

## Acceptance Criteria

### Story 1: Create an account

- Given a new patient, when they submit valid registration information (name, email, password), then the system creates an account and signs them in.
- Given an invalid or already registered email, when the form is submitted, then the system shows a validation message and prevents duplicate account creation.

### Story 2: Browse doctors

- Given a patient browsing the portal, when they search by doctor name or filter by specialty, then only matching doctors are shown.
- Given no matching doctors, when a filter is applied, then the system displays an empty-state message.

### Story 3: Book an appointment

- Given a signed-in patient, when they select an available appointment slot and confirm, then the system creates exactly one appointment and shows a confirmation reference.
- Given an unauthenticated visitor, when they try to book, then the system requires them to sign in first.
- Given a slot is no longer available, when the patient confirms, then the system rejects the booking and offers alternatives.

### Story 4: Browse medicines

- Given a patient viewing the catalog, when they open an item, then the system shows its name, strength, availability, and whether a prescription is required.
- Given a medicine is unavailable, when viewed, then the system clearly distinguishes it from available items.

### Story 5: Request home delivery

- Given a signed-in patient with a valid address and contact number, when they submit a delivery request for an available medicine, then the system returns a unique reference and an "awaiting confirmation" status.
- Given missing delivery details or an unavailable medicine, when submitted, then the system blocks the request and highlights the issue.

## Technical Requirements

- Framework: Next.js App Router
- Language: TypeScript in strict mode (no use of `any`)
- Styling: Tailwind CSS (utility-first)
- Data: PostgreSQL with Prisma ORM
- Auth: NextAuth or Clerk for sign-in and session management
- Performance: Server components by default; client components only where interactivity is needed
- Code Quality: ESLint and Prettier configured with a `.prettierrc` file

## Core API Endpoints

- POST /api/auth/signup
- POST /api/auth/signin
- GET /api/doctors
- GET /api/doctors/:id
- GET /api/doctors/:id/availability
- POST /api/appointments
- GET /api/medicines
- POST /api/delivery-requests
- GET /api/delivery-requests/:id

## Implementation Priority

- P0 (MVP): Sign up, sign in, browse doctors, book an appointment
- P1: Browse medicines, request home delivery, track request status
- P2: Account recovery, prescription uploads, delivery payment integration
