# Project Structure

This tree describes the current state of the checkout. It does not include dependencies or generated files such as `node_modules/`, `.next/`, and `.git/`.

**Legend**

- **Existing**: a file that was already present before this request.
- **Created now**: a `.gitkeep` file or this document, added to record the structure.
- **Pending**: future functionality; it is not a created or implemented file.

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
│   │   └── .gitkeep [created now]
│   ├── patients/
│   │   ├── [id]/
│   │   │   └── page.tsx [existing]
│   │   └── page.tsx [existing]
│   ├── globals.css [existing, unchanged]
│   ├── layout.tsx [existing, unchanged]
│   ├── loading.tsx [existing]
│   ├── not-found.tsx [existing]
│   └── page.tsx [existing; retains `return null`]
├── components/
│   ├── appointments/
│   │   ├── AppointmentCard.tsx [existing]
│   │   ├── AppointmentForm.tsx [existing]
│   │   └── AppointmentList.tsx [existing]
│   ├── home/
│   │   └── .gitkeep [created now]
│   ├── hospitals/
│   │   └── .gitkeep [created now]
│   ├── layout/
│   │   ├── Footer.tsx [existing, unchanged]
│   │   ├── Header.tsx [existing, unchanged]
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
│   └── ESTRUCTURA_PROYECTO.md [created now]
├── lib/
│   ├── mock/
│   │   └── .gitkeep [created now]
│   ├── appointments.ts [existing]
│   ├── db.ts [existing]
│   ├── patients.ts [existing]
│   ├── types.ts [existing]
│   └── utils.ts [existing]
├── public/
│   └── images/ [existing, empty folder]
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

## Purpose of the Prepared Folders

- `app/hospitals/`: reserved for the hospitals route. It contains only `.gitkeep`; the page has not been implemented yet.
- `components/home/`: space for shared visual components of the future Home page. Only `.gitkeep` was added during this request.
- `components/hospitals/`: space for hospital-related visual components. Only `.gitkeep` was added during this request.
- `lib/mock/`: space reserved for mock data when it is implemented. It does not contain a catalog, mock database, or logic.
- `docs/`: project documentation; it contains this record.

## Pending Route

`/hospitals` is **pending implementation**. The future file `app/hospitals/page.tsx` **does not exist** and was not created as an empty file. `app/page.tsx` remains unchanged, with `return null`.

## Folders Created During This Request

These are the only folders that did not previously exist and were created:

1. `app/hospitals/`
2. `lib/mock/`

`components/home/`, `components/hospitals/`, and `docs/` already existed. `.gitkeep` files were added to the two empty component folders; `docs/` contains the document recording this structure. No changes were made to `app/page.tsx`, `Header`, `Footer`, `layout.tsx`, or `globals.css`.

## Future Files — Not Created

- `app/hospitals/page.tsx`: page for the `/hospitals` route; pending.
- Components inside `components/home/` and `components/hospitals/`: they will be added when the interface is implemented.
- Data or fixtures inside `lib/mock/`: they will be added only when the corresponding code is written.

The items above are plans, not files or implementations present in the current tree.