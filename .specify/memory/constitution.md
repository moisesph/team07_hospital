<!--
Sync Impact Report
Version change: Unratified template → 1.0.0 (initial adoption)
Modified principles:
- Existing principle placeholders 1–5 → I. Required Web Stack and App Router
- Existing principle placeholders 1–5 → II. Strict TypeScript
- Existing principle placeholders 1–5 → III. Utility-First Styling
- Existing principle placeholders 1–5 → IV. Server-First Components and File Routing
- Existing principle placeholders 1–5 → V. Tested, Verifiable Changes
- Added VI. Consistent Naming and VII. Team Collaboration and Review
Added sections: Additional Constraints; Development Workflow
Removed sections: None; all template sections were retained and defined.
Templates updated:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .github/agents/speckit.tasks.agent.md (test, naming, and teammate-review task requirements)
Reviewed, no changes required:
- ✅ README.md and AGENTS.md
- ✅ .specify/templates/checklist-template.md and agent-file-template.md
- ✅ Remaining .github agent and prompt guidance; no .specify/templates/commands directory exists
Follow-up TODOs: None.
-->
# Team 07 Hospital Management System Constitution

## Core Principles

### I. Required Web Stack and App Router
All application features MUST use Next.js App Router, TypeScript, and Tailwind CSS.
Route segments and layouts MUST follow the `app/` file-system routing model. A change
that proposes replacing or bypassing a required technology needs a constitution
amendment before implementation. This keeps the team's architecture consistent and
the application aligned with the existing project.

### II. Strict TypeScript
TypeScript strict mode MUST remain enabled. Application code MUST NOT use the `any`
type, including through casts, and MUST NOT disable type checking to bypass errors.
Use `unknown` for untrusted values and narrow or validate them before use. Type
definitions MUST describe actual data and component contracts. This prevents
avoidable runtime errors and makes shared code safer to change.

### III. Utility-First Styling
Tailwind utility classes MUST be the default styling method. New custom CSS MUST be
limited to cases that Tailwind cannot reasonably express, and the reason MUST be
documented in the change. Reuse existing project styling patterns rather than
introducing a competing styling system. This keeps presentation consistent and
reduces unnecessary stylesheet complexity.

### IV. Server-First Components and File Routing
App Router pages and components MUST remain Server Components unless browser-only
behavior, client-side state, effects, or event handlers require a Client Component.
Place `"use client"` at the narrowest practical boundary. Keep server-only data
access out of Client Components. Pages, layouts, route handlers, and other routes
MUST use the framework's conventional files and locations under `app/`. This
preserves server rendering by default and makes route ownership discoverable.

### V. Tested, Verifiable Changes
Every change to observable behavior MUST include automated tests appropriate to the
behavior and MUST cover applicable acceptance scenarios. Bug fixes MUST include
regression coverage. If test tooling is not available, its setup MUST be included as
a foundational task before feature test tasks. When a behavior cannot reasonably be
automated, document the manual verification steps and the reason. Before a change is
merged, the test suite, `npm run lint`, and `npm run build` MUST pass, or any
environmental blocker MUST be recorded for team review. This makes regressions
visible and keeps each feature independently verifiable.

### VI. Consistent Naming
Names MUST follow the established conventions for the language and framework:
React components and types use `PascalCase`; variables, functions, and hooks use
`camelCase` (hooks begin with `use`); fixed module-level constants use
`UPPER_SNAKE_CASE` when that improves clarity; and route segments and framework
special files use the lowercase names required by Next.js. File names MUST match
their exported component or purpose, and new code MUST follow the surrounding
directory's established convention. Consistent names make routes and shared code
easier for teammates to locate.

### VII. Team Collaboration and Review
Work MUST be scoped to a feature or issue, and teammates MUST coordinate ownership
of shared files before parallel implementation. Changes MUST be reviewed by at
least one teammate who did not author them before merge. Reviews MUST check
requirements, tests, and constitution compliance; unresolved design decisions and
intentional deviations MUST be documented in the plan or review discussion. This
reduces conflicting edits and shares responsibility for quality.

## Additional Constraints

- The required application stack is Next.js App Router, TypeScript, and Tailwind CSS.
- `strict` TypeScript checking MUST remain enabled; application code MUST NOT use
  `any`.
- Tailwind MUST be preferred over custom CSS. Each necessary custom stylesheet or
  CSS rule MUST have a documented reason in the change.
- New dependencies MUST have a feature-specific rationale in the plan, and the
  package manifest and lockfile MUST remain synchronized.
- No feature may weaken an existing principle through local configuration or an
  undocumented exception.

## Development Workflow

- Feature work MUST start from an agreed requirement or team issue and use the
  repository's specification, planning, and task workflow when those artifacts are
  applicable.
- Plans MUST identify affected App Router files, required Server/Client Component
  boundaries, the test strategy, and any justified custom CSS or new dependencies.
- Tasks MUST include tests for changed behavior and independent verification for
  each user story.
- Before review, contributors MUST run the relevant automated tests, `npm run lint`,
  and `npm run build`, then report the results.
- Contributors MUST coordinate overlapping files and route changes with teammates;
  work MUST be reviewed by another teammate before it is merged.

## Governance

This constitution is the authority for project architecture and engineering
practice. Every plan and code review MUST check applicable principles. A conflict
MUST be corrected or resolved through an explicit amendment; it MUST NOT be silently
waived. A temporary exception requires teammate approval and a written rationale
and scope in the plan or review discussion.

Any team member may propose an amendment by documenting its motivation, impact on
existing work, and affected templates or guidance. The team MUST review and approve
the proposal before it is applied. The amendment MUST update this constitution,
the Sync Impact Report, and all affected templates and runtime guidance in the same
change. Reviewers MUST verify that dependent specifications, plans, tasks, and
implementation guidance remain consistent.

Version numbers use semantic versioning: MAJOR for backward-incompatible removal
or redefinition of a principle or governance rule; MINOR for a new principle,
section, or materially expanded obligation; PATCH for clarifications and
non-semantic wording fixes. The ratification date records the initial adoption;
the last-amended date changes whenever an approved amendment is made.

**Version**: 1.0.0 | **Ratified**: 2026-11-04 | **Last Amended**: 2026-11-04
