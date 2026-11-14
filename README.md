



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Team 07 Hospital

A patient-facing hospital-network portal. Patients can explore hospitals,
find healthcare professionals by specialty, and access appointment services.
Medicine delivery remains a future-service foundation and is not yet available.

## Team Members

- Christopher T. Bahinting
- **Laura Jocelyne Grajeda**
- Moises Pleytez

## Specialists Directory

The public specialist directory is available at `/specialists`, with profiles
at `/specialists/[id]`. Read-only GET endpoints are available at
`/api/specialists` and `/api/specialists/[id]`. The directory displays each
professional's name, specialty, and associated hospital.

`Patient` and `Specialist` are separate models. Patients are people receiving
care; specialists are healthcare professionals. Specialists reference
hospitals through `hospitalId`. Existing appointments continue to reference
patients through `patientId`; appointment records have not been linked to
specialists.

Specialist, hospital, patient, and appointment examples are stored in typed,
private in-memory arrays in `lib/`. They are deterministic development data,
not a database, and are not persistent.

The patient pages remain coming-soon scaffolding, the patient API returns
`501`, and the retained patient component files have no implementation.
`lib/patients.ts` continues to provide synthetic patient records and query
functions, but those records are not exposed through the public pages or API.
No authentication or authorization is implemented. Do not serve
non-synthetic patient information from future public routes without
appropriate access control.

The appointment UI is currently placeholder scaffolding: `/appointments`
provides a request-form entry and an appointment-history placeholder, while
`/appointments/new` says the request form is coming soon. The retained demo
API endpoints are not connected to these pages. They do not create definitive
appointments. The `/orders` page states that medicine delivery is coming soon;
ordering, tracking, prescription collection, geolocation, and payments are
not implemented.

## Patient Services and Login UI

The Header includes a **Patient Services** link to `/patients`. That route is
an unavailable placeholder, not a patient-record directory. The Home
QuickAccess section also includes a Patient Services card.

The `/login` page and `components/auth/LoginPanel.tsx` provide a
server-rendered sign-in interface, a reserved integration area, and a working
Return to Home link. Sign-in is unavailable: authentication is not connected,
and no provider or authentication flow has been selected.

Authentication integration, registration, OAuth, sessions, and authorization
belong to the authentication teammate. The panel contains a TODO for
connecting the teammate's selected flow. Empty `app/api/auth/` and `lib/auth/`
directories are reserved for that future work. No authentication behavior,
dependency, or database integration has been added.

## Appointment UI Placeholders and Retained Demo API

The appointment pages are intentionally placeholders. `/appointments`
provides a link to the request-form placeholder and displays an appointment
history placeholder. `/appointments/new` displays “Appointment request form
coming soon,” explains that submission is unavailable through the page, and
links back to `/appointments`. The pages do not render form fields, read a
mock identity, fetch availability, submit requests, or display personal
appointment history.

The backend demo endpoints and services are retained but are not connected to
this placeholder UI:

- `POST /api/appointments` validates and records a demo `BookingRequest`.
- `GET /api/appointments/availability` returns mock availability slots.
- `GET /api/appointments` does not expose appointment records; it returns
  HTTP `501`.

The POST path still uses the shared request schema, server-side mock identity,
hospital/specialist/slot validation, current-time checking, availability
rechecking, and idempotency handling. It derives requester ownership from the
server identity rather than client input. Its in-memory repository is
temporary, can reset on restart, is not reliably shared across instances, and
does not guarantee production persistence or concurrency safety. It creates
only unresolved `BookingRequest` records; no real appointment is reserved and
no notification is sent.

The server-only `BOOKING_DEMO_IDENTITY` setting accepts `guest`, `signed-in`,
or `signed-in-incomplete` for direct development/testing of the retained API.
It defaults to `signed-in`. There is no public impersonation control, real
session, or account-to-patient matching by email. The authentication teammate
replaces `bookingIdentityProvider` in `lib/booking/services.ts` with a trusted
session provider. Guest contact verification, persistent storage, atomic
availability/reservation handling, database constraints against double
booking, and server-side abuse controls remain future production work. A
verified request must be explicitly resolved to the correct patient before
becoming an `Appointment`; no patient is selected by matching email.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
