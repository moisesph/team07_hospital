# Project Structure

This tree describes the current state of the checkout. It does not include dependencies or generated files such as `node_modules/`, `.next/`, and `.git/`.

Team 07 Hospital is a patient-facing hospital-network portal. Patients can
explore hospitals, find healthcare professionals by specialty, and access
appointment services. Medicine delivery remains a future-service foundation.

## Legend

- **Existing**: an existing project file.
- **Prepared previously**: a folder or `.gitkeep` file retained from earlier structure preparation.
- **Primary TypeScript mock**: a typed in-memory data module used by application code.
- **Implemented**: working functionality or UI, with limitations described in this document.
- **Placeholder**: a valid route or component file that does not implement its planned feature.
- **Pending**: future functionality that has not been implemented.

## Current Tree

```text
team07_hospital/
├── .github/
│   ├── agents/
│   │   ├── speckit.analyze.agent.md [existing]
│   │   ├── speckit.checklist.agent.md [existing]
│   │   ├── speckit.clarify.agent.md [existing]
│   │   ├── speckit.constitution.agent.md [existing]
│   │   ├── speckit.implement.agent.md [existing]
│   │   ├── speckit.plan.agent.md [existing]
│   │   ├── speckit.specify.agent.md [existing]
│   │   ├── speckit.tasks.agent.md [existing]
│   │   └── speckit.taskstoissues.agent.md [existing]
│   └── prompts/
│       ├── speckit.analyze.prompt.md [existing]
│       ├── speckit.checklist.prompt.md [existing]
│       ├── speckit.clarify.prompt.md [existing]
│       ├── speckit.constitution.prompt.md [existing]
│       ├── speckit.implement.prompt.md [existing]
│       ├── speckit.plan.prompt.md [existing]
│       ├── speckit.specify.prompt.md [existing]
│       ├── speckit.tasks.prompt.md [existing]
│       └── speckit.taskstoissues.prompt.md [existing]
├── .specify/
│   ├── memory/
│   │   └── constitution.md [existing]
│   ├── scripts/
│   │   └── powershell/
│   │       ├── check-prerequisites.ps1 [existing]
│   │       ├── common.ps1 [existing]
│   │       ├── create-new-feature.ps1 [existing]
│   │       ├── setup-plan.ps1 [existing]
│   │       └── update-agent-context.ps1 [existing]
│   └── templates/
│       ├── agent-file-template.md [existing]
│       ├── checklist-template.md [existing]
│       ├── plan-template.md [existing]
│       ├── spec-template.md [existing]
│       └── tasks-template.md [existing]
├── .vscode/
│   └── settings.json [existing]
├── app/
│   ├── api/
│   │   ├── appointments/
│   │   │   ├── availability/
│   │   │   │   └── route.ts [mock availability]
│   │   │   └── route.ts [demo request POST; no public listing]
│   │   ├── auth/
│   │   │   └── .gitkeep [reserved]
│   │   ├── patients/
│   │   │   └── route.ts [existing]
│   │   └── specialists/
│   │       ├── [id]/route.ts [implemented]
│   │       └── route.ts [implemented]
│   ├── appointments/
│   │   ├── new/
│   │   │   └── page.tsx [request form placeholder]
│   │   └── page.tsx [request entry]
│   ├── hospitals/
│   │   └── page.tsx [placeholder]
│   ├── login/
│   │   └── page.tsx [login UI only]
│   ├── patients/
│   │   ├── [id]/
│   │   │   └── page.tsx [placeholder]
│   │   └── page.tsx [placeholder]
│   ├── specialists/
│   │   ├── [id]/page.tsx [implemented]
│   │   └── page.tsx [implemented]
│   ├── globals.css [existing]
│   ├── layout.tsx [existing]
│   ├── loading.tsx [existing]
│   ├── not-found.tsx [existing]
│   └── page.tsx [existing Home composition]
├── components/
│   ├── appointments/
│   │   ├── AppointmentCard.tsx [null-returning developer scaffold]
│   │   ├── AppointmentForm.tsx [request form placeholder]
│   │   └── AppointmentList.tsx [appointment history placeholder]
│   ├── auth/
│   │   └── LoginPanel.tsx [login UI only]
│   ├── home/
│   │   ├── HomeHero.tsx [existing]
│   │   ├── HospitalNetwork.tsx [existing]
│   │   ├── MedicineDelivery.tsx [existing]
│   │   └── QuickAccess.tsx [existing]
│   ├── hospitals/
│   │   └── .gitkeep [prepared previously]
│   ├── layout/
│   │   ├── Footer.tsx [existing]
│   │   ├── Header.tsx [existing]
│   │   └── Navigation.tsx [existing]
│   ├── patients/
│   │   ├── PatientCard.tsx [existing]
│   │   ├── PatientDetail.tsx [existing]
│   │   ├── PatientForm.tsx [existing]
│   │   └── PatientList.tsx [existing]
│   ├── specialists/
│   │   ├── SpecialistCard.tsx [implemented]
│   │   ├── SpecialistDetail.tsx [implemented]
│   │   └── SpecialistList.tsx [implemented]
│   └── ui/
│       ├── Button.tsx [existing]
│       ├── EmptyState.tsx [existing]
│       ├── Input.tsx [existing]
│       ├── LoadingSpinner.tsx [existing]
│       ├── NavigationCard.tsx [existing]
│       ├── SectionHeading.tsx [existing]
│       └── Select.tsx [existing]
├── docs/
│   └── carpet_structure.md [project documentation]
├── lib/
│   ├── appointments.ts [primary TypeScript mock]
│   ├── db.ts [existing]
│   ├── hospitals-db.ts [primary TypeScript mock]
│   ├── auth/
│   │   └── .gitkeep [reserved]
│   ├── booking/
│   │   ├── schema.ts [shared request validation]
│   │   └── services.ts [mock identity, availability, and request repository]
│   ├── patients.ts [primary TypeScript mock]
│   ├── specialists.ts [primary TypeScript mock]
│   ├── types.ts [shared models]
│   └── utils.ts [existing]
├── public/
│   └── images/
│       └── hero-image.jpg [existing]
├── specs/
│   └── 001-patient-services-portal/
│       ├── checklists/
│       │   └── requirements.md [existing]
│       ├── plan.md [existing]
│       └── spec.md [existing]
├── .gitignore [existing]
├── .prettierrc [existing]
├── AGENTS.md [existing]
├── eslint.config.mjs [existing]
├── next-env.d.ts [existing]
├── next.config.ts [existing]
├── package-lock.json [existing]
├── package.json [existing]
├── README.md [existing]
└── tsconfig.json [existing]
```

## Previously Prepared Folders

`components/hospitals/` was prepared for future hospital-related components
and currently contains only `.gitkeep`. `docs/` contains project
documentation, including this structure document.

The Home and Specialists components are implemented. The hospitals page and
patient pages remain placeholders; they do not provide a hospital directory
or patient-record browsing. Appointment UI pages and components are
placeholders. Retained appointment demo API endpoints and services are not
connected to those pages; see the section below.

## TypeScript Data Types

`lib/types.ts` defines the explicit TypeScript models used by the primary in-memory mock modules.

### Hospital Types

`HospitalLocation` contains:

- `address`
- `city`
- `region`
- `country`

`Hospital` contains:

- `id`
- `name`
- `description`
- `location`

### Specialist Types

`Specialist` is a healthcare professional, distinct from a `Patient`. It
contains:

- `id`
- `name`
- `specialty`
- `hospitalId`

Each current specialist sample references an existing hospital ID.

### Patient Types

`Patient` contains:

- `id`
- `hospitalId`
- `firstName`
- `lastName`
- `dateOfBirth`
- `gender`
- `email`
- `phone`
- `bloodType`

`PatientGender` limits gender values to the values used by the current fixtures.

`BloodType` limits blood-type values to valid values used by the mock patient records.

### Appointment Types

`Appointment` contains:

- `id`
- `hospitalId`
- `patientId`
- `date`
- `time`
- `reason`
- `status`

`AppointmentStatus` limits appointment status values to:

- `pending`
- `scheduled`
- `confirmed`
- `completed`
- `cancelled`
- `no-show`

`AppointmentFilters` defines the optional filters accepted by `getAppointments`:

- `hospitalId`
- `patientId`
- `date`

`Appointment` still relates to a patient through `patientId`. No specialist
relationship has been added to the appointment model or fixtures.

### Booking Request Types

`BookingIdentity`, `BookingIdentityProfile`, `BookingSlot`, and
`BookingRequest` support a separate demo intake flow. A request records a
trusted requester kind, selected hospital and specialist, an availability
slot, contact details, and the unresolved status. Guest requests do not
receive a `patientId`; an authenticated request can carry only the patient ID
supplied by the trusted server-side identity provider. `BookingRequest` does
not create or confirm an `Appointment`.

No type in `lib/types.ts` uses `any`.

## Primary TypeScript Mock Data

The TypeScript modules in `lib/` are now the primary mock data source for application development.

Hospital, patient, specialist, and appointment fixture modules follow an
in-memory data-module pattern:

1. Each module stores a private typed array.
2. Each module exports read-only query functions.
3. No module exports its internal array directly.
4. Query results are copied before they are returned.
5. Callers cannot mutate the internal arrays by modifying a returned record or returned array.
6. The modules use fixed deterministic data.
7. The modules do not use random values or the current date.
8. No create, update, or delete operations are implemented.

These fixture modules are temporary development scaffolding. They are not a
real database and do not provide persistence. Booking requests use a separate
private in-memory mock repository; its limitations are described below.

### `lib/hospitals-db.ts`

Contains three typed fictitious hospital records.

Exported functions:

- `getHospitals(): Hospital[]`
  - Returns copies of all hospital records.
  - Returns a new array on every call.
  - Copies each nested `location` object.
- `getHospitalById(id: string): Hospital | null`
  - Returns a copied hospital record when the ID exists.
  - Returns `null` when no hospital matches the ID.

### `lib/patients.ts`

Contains twelve typed fictitious patient records. It remains separate from the
specialist directory and is not connected to the public patient pages or API.

Exported functions:

- `getPatients(hospitalId?: string | null): Patient[]`
  - Returns copies of all patients when no hospital ID is supplied.
  - Filters patients by `hospitalId` when a hospital ID is supplied.
  - Returns a new array and copied records.
- `getPatientById(id: string): Patient | null`
  - Returns a copied patient record when the ID exists.
  - Returns `null` when no patient matches the ID.

### `lib/appointments.ts`

Contains eighteen typed fictitious appointment records.

Exported functions:

- `getAppointments(filters?: AppointmentFilters): Appointment[]`
  - Returns copies of all appointments when no filters are supplied.
  - Supports filtering by `hospitalId`.
  - Supports filtering by `patientId`.
  - Supports filtering by exact ISO date.
  - Supports combining the three filters.
  - Returns a new array and copied records.
- `getAppointmentById(id: string): Appointment | null`
  - Returns a copied appointment record when the ID exists.
  - Returns `null` when no appointment matches the ID.

### `lib/specialists.ts`

Contains six typed fictitious healthcare professionals covering Dentistry,
Physiotherapy, General Medicine, Cardiology, Pediatrics, and Dermatology.

Exported functions:

- `getSpecialists(): Specialist[]`
  - Returns a new array of copied specialist records.
- `getSpecialistById(id: string): Specialist | null`
  - Returns a copied record or `null` when the ID is unknown.
- `getSpecialistsByHospital(hospitalId?: string | null): Specialist[]`
  - Returns copies filtered by hospital when a hospital ID is supplied.
- `isValidSpecialistId(id: string): boolean`
  - Validates the current synthetic ID format for the individual GET endpoint.

There are no static JSON fixtures in the current `lib/` tree.

## Mock Data Relationships

The typed in-memory data modules use these relationships:

```text
Hospital
    id
     │
     ├── Specialist
     │      hospitalId
     │
     ├── Patient
     │      hospitalId
     │      id
     │       │
     │       └── Appointment
     │               patientId
     │
     └── Appointment
            hospitalId

BookingRequest (unresolved)
    ├── hospitalId ───────────> Hospital.id
    ├── specialistId ─────────> Specialist.id
    ├── slot <──────────────── snapshot of mock availability slot
    └── requester ────────────> guest or trusted server identity

BookingRequest has no automatic link to Appointment.
```

Relationship rules:

1. One hospital can have multiple patients.
2. One hospital can have multiple appointments.
3. One patient can have multiple appointments.
4. Every patient belongs to exactly one hospital through `hospitalId`.
5. Every appointment belongs to exactly one patient through `patientId`.
6. Every appointment belongs to exactly one hospital through `hospitalId`.
7. Every appointment references an existing patient.
8. Every patient references an existing hospital.
9. An appointment's `hospitalId` matches the `hospitalId` of its referenced patient.
10. Every specialist belongs to exactly one existing hospital through `hospitalId`.
11. A `BookingRequest` references an existing hospital and a specialist belonging to that hospital.
12. Its `slot` stores the selected mock availability slot as a snapshot, including the date, start time, and scheduling timezone.
13. A `BookingRequest` remains unresolved and does not create, confirm, or automatically link to an `Appointment`.

Booking requests remain separate, unresolved intake records. Their submitted
hospital, specialist, and slot are validated together; they do not alter
appointment fixtures or assign patient ownership from client input. Only a
future verified workflow can resolve a request to the correct patient and
create a definitive appointment.

## Data Safety and Determinism

All records are fictitious and intended only for development.

- Email addresses use `example.com`.
- Hospital locations are demonstration locations.
- Phone numbers are fictitious development values.
- Dates are fixed ISO values.
- Appointment times use fixed 24-hour values.
- No record is generated randomly.
- The deterministic fixture modules do not generate records from the current
  date. The demo booking clock intentionally reads the current time to reject
  past slots at submission.
- No specialist fixture contains patient information.
- No credentials, tokens, or real contact details are stored.

## Specialists and Public Interface

The public directory is `/specialists`; individual profiles are
`/specialists/[id]`. Navigation, the Home hero, QuickAccess, and the footer
link to this directory. The directory pages and components share the
`lib/specialists.ts` data module. Both specialist API handlers are read-only:

- `GET /api/specialists` returns the specialists with their associated
  hospitals.
- `GET /api/specialists/[id]` returns one specialist and associated hospital.
  Invalid ID formats return HTTP 400; unknown IDs return HTTP 404.

The Home page continues to compose the hero, QuickAccess, MedicineDelivery,
and HospitalNetwork sections. The shared Header preserves the “Patient
Services Portal” branding, and the shared Footer remains in the root layout.
The Header also includes a Patient Services link to `/patients` and a Login
link to `/login`. QuickAccess contains Hospitals, Specialists, Appointments,
and Patient Services cards.

## Retained Patient Scaffolding

The `/patients` and `/patients/[id]` pages remain valid Server Components
that display unavailable/coming-soon text. The `/patients` route is linked
from the Header and QuickAccess as Patient Services; it is not a directory
for browsing patient records. The `/api/patients` route remains a valid API
route with GET and POST handlers that return HTTP 501 because the feature is
unimplemented. The four files in `components/patients/` are retained planned
component files and currently contain no implementation.

`lib/patients.ts` retains its synthetic patient records and its
`getPatients`/`getPatientById` query functions. It is not connected to the
public patient pages or API. Patient records are not listed in the public
directory, and no patient data is exposed by the Specialists feature.

No authentication or authorization exists. The current patient pages and API
do not serve patient records. Any future route that handles non-synthetic
patient data must implement appropriate access control before serving it.

## Login UI and Reserved Authentication Folders

`app/login/page.tsx` and `components/auth/LoginPanel.tsx` provide a
server-rendered login interface with a reserved integration area, an honest
unavailable status, and a working Return to Home link. The panel has a TODO
for connecting the authentication flow selected by the authentication
teammate.

This UI does not implement authentication. No provider has been chosen; there
are no login forms, OAuth callbacks, registration, sessions, password
handling, route protection, or authorization. The authentication teammate
owns that integration. `app/api/auth/.gitkeep` and `lib/auth/.gitkeep` reserve
empty directories without assuming a route or library structure.

The `/hospitals` page is a placeholder, not a hospital directory. `/orders`
is a coming-soon page; `MedicineDelivery` is a future-service foundation only.

## Appointment UI Placeholders and Retained Demo API

`/appointments` displays a request-form entry and an appointment-history
placeholder. `/appointments/new` displays the coming-soon form placeholder
and a link back to `/appointments`. The pages do not render interactive form
fields, read identity, fetch availability, submit requests, or show personal
appointment history. The request-form UI and history UI are not currently
connected to the retained backend demo endpoints.

The backend demo endpoints and services remain available:

- `POST /api/appointments` validates and records a demo `BookingRequest`.
- `GET /api/appointments/availability` returns mock availability slots.
- `GET /api/appointments` returns HTTP `501` and does not list appointments.

The POST path uses the shared `parseBookingInput` schema in
`lib/booking/schema.ts` and server-side `submitBookingRequest` in
`lib/booking/services.ts`. It normalizes and validates fields, verifies
hospital/specialist association, derives requester ownership only from the
server identity, validates the authoritative slot, checks the injected clock
at submission, rechecks availability, and handles retry idempotency.
Client-supplied patient IDs, status values, and other unsupported properties
are rejected. `BookingAvailabilityService` supplies mock UTC slots for the
current fictitious hospitals.

The server-only `BOOKING_DEMO_IDENTITY` setting (`guest`, `signed-in`, or
`signed-in-incomplete`) selects synthetic identity behavior for direct
development/testing of the retained API; it defaults to `signed-in`. There is
no public impersonation control, real authentication, or automatic
account-to-patient matching.

`BookingRequest` remains separate from the existing `Appointment` model and
all requests are marked `unresolved`. A successful API response says “Demo
request created. No real appointment has been reserved.” No real slot is
reserved, no notification is sent, and no definitive Appointment is created.
The mock repository is temporary in-memory state: it can reset on restart,
is not shared reliably across server instances, and provides neither
production persistence nor concurrency guarantees. Idempotency works only
while the in-memory key record exists.

Production integration remains pending: trusted real identity, guest contact
verification, persistent storage, atomic availability/reservation handling,
database constraints against double booking, server-side abuse controls, and
an explicit process to resolve a verified request to the correct patient.

## Patient and Appointment Data Preservation

The Patient model, synthetic data, query functions, and existing appointment
fixtures remain separate from Specialists and BookingRequest:

- `lib/patients.ts`
- `lib/appointments.ts`

`Appointment.patientId`, appointment fixtures, and appointment query
functions remain unchanged. The demo request path does not expose a public
appointment list or guest contact details.

## Functionality Not Implemented

The following functionality remains unimplemented:

- MongoDB integration
- Data persistence
- Create, update, and delete operations for definitive patient, hospital,
  specialist, and appointment records
- Authentication
- Authorization
- Authentication provider and sign-in flow
- Hospital directory and its functionality
- Hospital-specific components
- Patient record pages, components, and APIs
- Interactive appointment-request and personal appointment-history UI
- Real appointment booking, confirmation, and reservation
- Guest contact verification and notifications
- Persistent booking-request storage and cross-instance idempotency
- Atomic availability handling and double-booking prevention
- Production server-side abuse controls
- Medicine ordering, prescription collection, delivery tracking,
  geolocation, and payment

The existing fixture modules provide deterministic typed mock data. The
booking-request repository is temporary in-memory demo state. No database
connection or production persistence is implemented.