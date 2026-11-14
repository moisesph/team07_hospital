# Project Structure

This tree describes the current state of the checkout. It does not include dependencies or generated files such as `node_modules/`, `.next/`, and `.git/`.

## Legend

- **Existing**: a file that was already present before the structure-preparation and mock-data work.
- **Prepared previously**: a folder or `.gitkeep` file added during the earlier structure-preparation work.
- **Static JSON mock**: an earlier JSON fixture retained as a portable data reference.
- **Primary TypeScript mock**: a typed in-memory data module used as the primary mock source for application development.
- **Updated now**: a file created or updated for the typed in-memory data modules.
- **Implemented placeholder**: the minimal `/hospitals` route page added in this task; it is not the hospital directory.
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
│   │   │   └── route.ts [existing]
│   │   └── patients/
│   │       └── route.ts [existing]
│   ├── appointments/
│   │   └── page.tsx [existing]
│   ├── hospitals/
│   │   ├── .gitkeep [prepared previously]
│   │   └── page.tsx [implemented placeholder]
│   ├── patients/
│   │   ├── [id]/
│   │   │   └── page.tsx [existing]
│   │   └── page.tsx [existing]
│   ├── globals.css [existing]
│   ├── layout.tsx [existing]
│   ├── loading.tsx [existing]
│   ├── not-found.tsx [existing]
│   └── page.tsx [existing; returns null]
├── components/
│   ├── appointments/
│   │   ├── AppointmentCard.tsx [existing]
│   │   ├── AppointmentForm.tsx [existing]
│   │   └── AppointmentList.tsx [existing]
│   ├── home/
│   │   └── .gitkeep [prepared previously]
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
│   └── ui/
│       ├── Button.tsx [existing]
│       ├── EmptyState.tsx [existing]
│       ├── Input.tsx [existing]
│       ├── LoadingSpinner.tsx [existing]
│       └── Select.tsx [existing]
├── docs/
│   └── carpet_structure.md [updated now]
├── lib/
│   ├── mock/
│   │   ├── .gitkeep [prepared previously]
│   │   ├── appointments.json [static JSON mock]
│   │   ├── hospitals.json [static JSON mock]
│   │   └── patients.json [static JSON mock]
│   ├── appointments-db.ts [primary TypeScript mock]
│   ├── appointments.ts [existing, unchanged]
│   ├── db.ts [existing, unchanged]
│   ├── hospitals-db.ts [primary TypeScript mock]
│   ├── patients-db.ts [primary TypeScript mock]
│   ├── patients.ts [existing, unchanged]
│   ├── types.ts [updated now]
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

The following folders were prepared before the mock data modules were implemented:

- `app/hospitals/`: prepared for the hospitals route. It now contains `page.tsx`, a minimal placeholder that displays “Hospitals” and “Hospital network page coming soon.” The hospital directory and its functionality remain pending.
- `components/home/`: reserved for shared visual components for the future Home page. It currently contains only `.gitkeep`.
- `components/hospitals/`: reserved for future hospital-related visual components. It currently contains only `.gitkeep`.
- `lib/mock/`: originally prepared as an empty location for development fixtures. It now contains the earlier static JSON collections.
- `docs/`: contains project documentation, including this structure document.

The folder-preparation work did not implement components, API routes, database connections, CRUD operations, or business logic. The hospitals placeholder is the only route page added in this task; it does not implement hospital functionality.

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

No type in `lib/types.ts` uses `any`.

## Primary TypeScript Mock Data

The TypeScript modules in `lib/` are now the primary mock data source for application development.

They follow an in-memory data-module pattern:

1. Each module stores a private typed array.
2. Each module exports read-only query functions.
3. No module exports its internal array directly.
4. Query results are copied before they are returned.
5. Callers cannot mutate the internal arrays by modifying a returned record or returned array.
6. The modules use fixed deterministic data.
7. The modules do not use random values or the current date.
8. No create, update, or delete operations are implemented.

These modules are temporary development scaffolding. They are not a real database and do not provide persistence.

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

### `lib/patients-db.ts`

Contains twelve typed fictitious patient records.

Exported functions:

- `getPatients(hospitalId?: string | null): Patient[]`
  - Returns copies of all patients when no hospital ID is supplied.
  - Filters patients by `hospitalId` when a hospital ID is supplied.
  - Returns a new array and copied records.
- `getPatientById(id: string): Patient | null`
  - Returns a copied patient record when the ID exists.
  - Returns `null` when no patient matches the ID.

### `lib/appointments-db.ts`

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

## Static JSON Mock Data

The earlier JSON files remain in `lib/mock/`:

- `lib/mock/hospitals.json`
- `lib/mock/patients.json`
- `lib/mock/appointments.json`

These files contain the same stable IDs and fictitious records used by the TypeScript modules.

The JSON files are retained as portable fixture references. They are not the primary mock source after the addition of the typed TypeScript modules.

The JSON files:

- Do not export query functions.
- Do not provide runtime type checking.
- Do not implement persistence.
- Do not connect to MongoDB or another provider.
- Do not implement a functional booking system.

## Mock Data Relationships

The TypeScript modules and JSON fixtures use the same relationships:

```text
Hospital
    id
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

## Data Safety and Determinism

All records are fictitious and intended only for development.

- Email addresses use `example.com`.
- Hospital locations are demonstration locations.
- Phone numbers are fictitious development values.
- Dates are fixed ISO values.
- Appointment times use fixed 24-hour values.
- No record is generated randomly.
- No module calls `new Date()`.
- No module uses `Date.now()`.
- No module reads the current time during prerendering.
- No credentials, tokens, or real contact details are stored.

## Hospitals Route

The existing navigation link to `/hospitals` is unchanged. The route now opens `app/hospitals/page.tsx`, a minimal Server Component placeholder with the heading “Hospitals” and the message “Hospital network page coming soon.”

This placeholder is not a completed hospital directory. The directory, its functionality, and any hospital-specific components remain pending. No additional CSS, data fetching, or business logic was added for this placeholder.

`app/page.tsx` remains a valid page component that currently returns `null`. The shared root layout remains in `app/layout.tsx`.

## Existing Files Left Unchanged

The following existing data and integration files were not modified:

- `lib/db.ts`
- `lib/patients.ts`
- `lib/appointments.ts`

The new modules do not automatically replace imports in existing pages, components, or API routes. Application integration will be completed separately.

## Functionality Not Implemented

The following functionality remains unimplemented:

- MongoDB integration
- Integration with another database provider
- Data persistence
- Create operations
- Update operations
- Delete operations
- Authentication
- Authorization
- Hospital directory and its functionality
- Hospital-specific components
- Integration of the new modules with existing API routes
- Integration of the new modules with existing pages
- Integration of the new modules with existing components
- A functional appointment-booking workflow

The new TypeScript modules currently provide typed in-memory read operations only.