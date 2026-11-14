



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

The appointments page and API remain placeholders. The `/orders` page states
that medicine delivery is coming soon; ordering, tracking, prescription
collection, geolocation, and payments are not implemented.

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
