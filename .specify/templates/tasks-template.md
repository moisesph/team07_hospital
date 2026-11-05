---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Each user story MUST include automated test tasks for observable behavior.
If the repository has no test runner, add test-tooling setup as a foundational task.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **This project**: Next.js App Router routes under `app/`, shared components under
  `components/`, shared utilities under `lib/`, and automated tests under `tests/`
  or colocated with source according to the test runner's established convention.
- Paths in generated tasks MUST match the actual structure recorded in `plan.md`.

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify the project structure against the implementation plan
- [ ] T002 Verify required dependencies and package scripts in package.json
- [ ] T003 [P] Configure linting and formatting tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 [P] Configure the TypeScript/React test runner and test scripts if absent; otherwise verify them in repository configuration files
- [ ] T005 [P] Set up shared validation or error-handling infrastructure required by the feature in [exact project file]

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1

- [ ] T010 [P] [US1] Test [acceptance scenario] in tests/[test type]/[name].test.ts(x)
  or the established colocated test path

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create [Component] in components/[component].tsx
- [ ] T012 [US1] Implement [route or feature] in app/[route]/page.tsx
- [ ] T013 [US1] Add validation and error handling in [exact project file]

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2

- [ ] T015 [P] [US2] Test [acceptance scenario] in tests/[test type]/[name].test.ts(x)
  or the established colocated test path

### Implementation for User Story 2

- [ ] T016 [P] [US2] Create [Component] in components/[component].tsx
- [ ] T017 [US2] Implement [route or feature] in app/[route]/page.tsx
- [ ] T018 [US2] Integrate with shared components or utilities in [exact project file]

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3

- [ ] T019 [P] [US3] Test [acceptance scenario] in tests/[test type]/[name].test.ts(x)
  or the established colocated test path

### Implementation for User Story 3

- [ ] T020 [P] [US3] Create [Component] in components/[component].tsx
- [ ] T021 [US3] Implement [route or feature] in app/[route]/page.tsx
- [ ] T022 [US3] Verify the required Server/Client boundary in app/[route]/page.tsx and components/[component].tsx

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Add or update regression tests in [exact test paths]
- [ ] TXXX Run the project's automated test command
- [ ] TXXX Run `npm run lint` and `npm run build`
- [ ] TXXX Verify route, file, component, hook, and type names follow the project conventions
- [ ] TXXX Coordinate shared-file ownership and obtain independent teammate review before merge
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Each user story MUST have tests mapped to its acceptance scenarios
- Keep Server Components by default; add Client Components only for required browser behavior
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Independent tests for a user story marked [P] can run in parallel
- Independent components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch independent tests for User Story 1 together:
Task: "Test [acceptance scenario] in tests/[type]/[name].test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup, including test tooling if absent
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 with its automated tests
4. **STOP and VALIDATE**: Run User Story 1 tests independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Map automated tests to acceptance scenarios; document manual checks and rationale when automation is impractical
- Run tests, `npm run lint`, and `npm run build` before review
- Include naming-convention checks and independent teammate review in cross-cutting work
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
