# Tasks: Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todos/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Per the [constitution](../../.specify/memory/constitution.md), tests are NON-NEGOTIABLE. All user stories MUST include test tasks that are completed BEFORE implementation tasks (RED-GREEN-REFACTOR cycle).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

This is a web application with monorepo structure:
- **Frontend**: `packages/frontend/src/`
- **Backend**: `packages/backend/src/` (no changes for this feature)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Verify project structure matches plan.md expectations (packages/frontend/src/components, utils)
- [X] T002 [P] Ensure theme.css has danger color CSS variables defined (--danger-color for light/dark modes)
- [X] T003 [P] Verify TodoCard component exists and can be modified

**Checkpoint**: Environment ready for implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utility that BOTH user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests for Date Utilities (RED phase) 🔴

- [X] T004 [P] Create test file packages/frontend/src/utils/__tests__/dateUtils.test.js with failing tests for isOverdue function
- [X] T005 [P] Add failing test: isOverdue returns true for past due date and incomplete status
- [X] T006 [P] Add failing test: isOverdue returns false when due date is today
- [X] T007 [P] Add failing test: isOverdue returns false when todo is completed (even with past due date)
- [X] T008 [P] Add failing test: isOverdue returns false when dueDate is null
- [X] T009 [P] Add failing test: calculateDaysOverdue returns correct number for past dates
- [X] T010 [P] Add failing test: calculateDaysOverdue returns 0 for today's date
- [X] T011 [P] Add failing test: calculateDaysOverdue returns 0 for future dates
- [X] T012 Run tests and verify all dateUtils tests FAIL (RED phase complete)

### Implementation for Date Utilities (GREEN phase) 🟢

- [X] T013 Create packages/frontend/src/utils/ directory if it doesn't exist
- [X] T014 Implement isOverdue function in packages/frontend/src/utils/dateUtils.js with date normalization to midnight
- [X] T015 Implement calculateDaysOverdue function in packages/frontend/src/utils/dateUtils.js using Math.floor for day calculation
- [X] T016 Export both functions from packages/frontend/src/utils/dateUtils.js
- [X] T017 Run tests and verify all dateUtils tests PASS (GREEN phase complete)

### Refactor for Date Utilities (REFACTOR phase) 🔧

- [X] T018 Review dateUtils.js for DRY violations - extract date normalization if repeated
- [X] T019 Add JSDoc comments to isOverdue and calculateDaysOverdue functions
- [X] T020 Verify functions are pure (no side effects, same input = same output)
- [X] T021 Run ESLint on packages/frontend/src/utils/dateUtils.js - resolve all warnings
- [X] T022 Re-run all dateUtils tests to verify refactoring didn't break functionality

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visual Identification of Overdue Todos (Priority: P1) 🎯 MVP

**Goal**: Apply danger-color styling and warning icon to overdue todos for immediate visual identification

**Independent Test**: Create todos with past due dates and verify they display with red text and warning icon. Completed todos and those without due dates should not show overdue styling.

### Tests for User Story 1 (RED phase) 🔴

**CONSTITUTION REQUIREMENT: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T023 [P] [US1] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: overdue todo displays with danger color className
- [X] T024 [P] [US1] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: overdue todo displays warning icon with aria-label="overdue"
- [X] T025 [P] [US1] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: todo with due date = today does NOT show overdue styling
- [X] T026 [P] [US1] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: completed todo with past due date does NOT show overdue styling
- [X] T027 [P] [US1] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: todo without due date does NOT show overdue styling
- [X] T028 [US1] Run TodoCard tests and verify all US1 tests FAIL (RED phase complete)

### Implementation for User Story 1 (GREEN phase) 🟢

- [X] T029 [US1] Import isOverdue from utils/dateUtils.js in packages/frontend/src/components/TodoCard.js
- [X] T030 [US1] Calculate overdue status in TodoCard component: const overdue = isOverdue(todo.dueDate, todo.completed)
- [X] T031 [US1] Add conditional className to todo title in packages/frontend/src/components/TodoCard.js: className={overdue ? 'todo-title overdue' : 'todo-title'}
- [X] T032 [US1] Add warning icon element before title in packages/frontend/src/components/TodoCard.js: {overdue && <span className="warning-icon" aria-label="overdue" role="img">⚠️</span>}
- [X] T033 [US1] Add CSS rule for .todo-title.overdue in packages/frontend/src/styles/theme.css: color: var(--danger-color)
- [X] T034 [US1] Add CSS rule for .warning-icon in packages/frontend/src/styles/theme.css: margin-right: 8px, font-size: 20px
- [X] T035 [US1] Run TodoCard tests and verify all US1 tests PASS (GREEN phase complete)

### Refactor for User Story 1 (REFACTOR phase) 🔧

- [X] T036 [US1] Review TodoCard.js for single responsibility - ensure component only handles presentation
- [X] T037 [US1] Verify overdue logic is not duplicated - should call utility function once
- [X] T038 [US1] Check CSS follows 8px spacing grid system (margin-right: 8px confirmed)
- [X] T039 [US1] Run ESLint on packages/frontend/src/components/TodoCard.js - resolve all warnings
- [X] T040 [US1] Re-run all TodoCard tests to verify refactoring didn't break functionality

**Checkpoint**: User Story 1 complete - overdue todos are visually distinct with red text and warning icon

---

## Phase 4: User Story 2 - Overdue Date Display (Priority: P2)

**Goal**: Display "X days overdue" text to show urgency level for overdue todos

**Independent Test**: Create todos with various past due dates (1 day, 5 days, etc.) and verify the correct "X day(s) overdue" text appears. Non-overdue todos should not display this text.

### Tests for User Story 2 (RED phase) 🔴

**CONSTITUTION REQUIREMENT: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T041 [P] [US2] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: todo 1 day overdue displays "1 day overdue"
- [X] T042 [P] [US2] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: todo 5 days overdue displays "5 days overdue" (plural)
- [X] T043 [P] [US2] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: todo due today does NOT display overdue text
- [X] T044 [P] [US2] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: todo without due date does NOT display overdue text
- [X] T045 [P] [US2] Add failing test to packages/frontend/src/components/__tests__/TodoCard.test.js: completed overdue todo does NOT display overdue text
- [X] T046 [US2] Run TodoCard tests and verify all US2 tests FAIL (RED phase complete)

### Implementation for User Story 2 (GREEN phase) 🟢

- [X] T047 [US2] Import calculateDaysOverdue from utils/dateUtils.js in packages/frontend/src/components/TodoCard.js
- [X] T048 [US2] Calculate days overdue in TodoCard component: const daysOverdue = overdue ? calculateDaysOverdue(todo.dueDate) : 0
- [X] T049 [US2] Add overdue text element in packages/frontend/src/components/TodoCard.js after due date: {overdue && <span className="overdue-text">{daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue</span>}
- [X] T050 [US2] Add CSS rule for .overdue-text in packages/frontend/src/styles/theme.css: font-size: 12px, color: var(--text-secondary), margin-left: 8px
- [X] T051 [US2] Run TodoCard tests and verify all US2 tests PASS (GREEN phase complete)

### Refactor for User Story 2 (REFACTOR phase) 🔧

- [X] T052 [US2] Review plural handling logic for readability - consider extracting to helper function if complex
- [X] T053 [US2] Verify overdue text follows typography guidelines (12px caption size confirmed)
- [X] T054 [US2] Check that overdue text uses text-secondary color for proper contrast
- [X] T055 [US2] Run ESLint on packages/frontend/src/components/TodoCard.js - resolve all warnings
- [X] T056 [US2] Re-run all TodoCard tests to verify refactoring didn't break functionality

**Checkpoint**: User Story 2 complete - overdue todos now show both visual styling AND days overdue count

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and validation across all user stories

- [X] T057 [P] Run full frontend test suite: npm test --workspace=frontend
- [X] T058 [P] Verify test coverage meets 80%+ threshold: npm test --workspace=frontend -- --coverage
- [X] T059 [P] Check for console.log statements in packages/frontend/src/components/TodoCard.js and packages/frontend/src/utils/dateUtils.js
- [X] T060 [P] Run ESLint on all modified files: packages/frontend/src/components/TodoCard.js, packages/frontend/src/utils/dateUtils.js
- [X] T061 Verify WCAG AA contrast for danger color in both light and dark modes using browser DevTools
- [X] T062 Test keyboard navigation with overdue todos (tab through, interact with icons)
- [X] T063 Test screen reader announcement of aria-label="overdue" on warning icon
- [X] T064 Manual test: Create todo with past due date → verify red text, icon, and "X days overdue" appear
- [X] T065 Manual test: Mark overdue todo complete → verify styling immediately disappears
- [X] T066 Manual test: Create todo with due date = today → verify NO overdue styling
- [X] T067 Manual test: Test in dark mode → verify danger color adapts correctly
- [X] T068 Manual test: Create todo without due date → verify NO overdue styling
- [X] T069 Performance test: Render todo list with 1000 items → verify no noticeable lag (< 50ms requirement)
- [X] T070 [P] Update documentation if needed (README, quickstart.md validation)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2)
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) - technically could run parallel to US1, but logically builds on US1 for UX
- **Polish (Phase 5)**: Depends on User Story 1 AND User Story 2 completion

### User Story Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational - dateUtils)
    ↓
    ├─→ Phase 3 (US1 - Visual Styling) ← MVP DELIVERY
    │       ↓
    │   Phase 4 (US2 - Days Display)
    │       ↓
    └───────┴─→ Phase 5 (Polish)
```

**User Story 1 (P1)**: 
- **Depends on**: Phase 2 (dateUtils foundation)
- **Delivers**: Visual identification via styling and icon
- **MVP Ready**: Yes - this story alone provides value

**User Story 2 (P2)**:
- **Depends on**: Phase 2 (dateUtils foundation)
- **Optional dependency**: Phase 3 (US1) for better UX flow, but technically independent
- **Delivers**: Days overdue count for prioritization
- **MVP Ready**: No - enhances US1 but US1 is sufficient for MVP

### Within Each Phase

**Phase 2 (Foundational)**:
- T004-T011 (Tests) can run in parallel
- T013 must complete before T014-T016 (need directory first)
- T014-T016 are sequential (build on each other)
- T017-T022 are sequential validation steps

**Phase 3 (User Story 1)**:
- T023-T027 (Tests) can run in parallel
- T029-T034 (Implementation) have dependencies:
  - T029 (import) must happen first
  - T030-T032 (component logic) can be done together
  - T033-T034 (CSS) can run parallel to T030-T032
- T036-T040 (Refactor) are sequential

**Phase 4 (User Story 2)**:
- T041-T045 (Tests) can run in parallel
- T047-T050 (Implementation) have dependencies:
  - T047 (import) must happen first
  - T048-T049 (component logic) can be done together
  - T050 (CSS) can run parallel to T048-T049
- T052-T056 (Refactor) are sequential

**Phase 5 (Polish)**:
- T057-T060, T070 (automated checks) can run in parallel
- T061-T069 (manual testing) are sequential

### Parallel Opportunities

**Within Foundational Phase**:
- All test tasks (T004-T011) can be written in parallel
- CSS verification (T002) and component verification (T003) can run parallel in Phase 1

**Between User Stories** (if multiple developers):
- After Phase 2 completes, User Story 1 (T023-T040) and User Story 2 (T041-T056) could technically run in parallel
- However, sequential execution (US1 → US2) is recommended for better UX testing flow

**Within User Stories**:
- Test writing tasks marked [P] can be written in parallel
- CSS tasks can run parallel to component logic tasks (different files)

### Critical Path (Sequential Only)

For single developer, fastest path to MVP:

1. Phase 1: Setup (T001-T003) - ~15 min
2. Phase 2: Foundational (T004-T022) - ~2 hours
3. Phase 3: User Story 1 (T023-T040) - ~3 hours
4. Phase 5: Polish validation (T057-T069) - ~1 hour

**Estimated MVP Completion**: ~6-7 hours for User Story 1 with tests and polish

**Full Feature Completion** (US1 + US2): Add ~2 hours for User Story 2 = ~8-9 hours total

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational - dateUtils)
3. Complete Phase 3 (User Story 1 - Visual Styling)
4. Complete Phase 5 (Polish - validation for US1 only)
5. **SHIP MVP** - Users can now identify overdue todos visually
6. Then complete Phase 4 (User Story 2 - Days Display) for enhancement
7. Final Phase 5 polish for US2

### Full Feature (Alternative)

Complete all phases sequentially: 1 → 2 → 3 → 4 → 5

Both strategies are valid per the constitution's scope discipline principle.

---

## Task Summary

- **Total Tasks**: 70
- **Setup Phase**: 3 tasks
- **Foundational Phase**: 19 tasks (includes full TDD cycle)
- **User Story 1 (P1)**: 18 tasks (includes full TDD cycle)
- **User Story 2 (P2)**: 16 tasks (includes full TDD cycle)
- **Polish Phase**: 14 tasks

### Tasks by User Story

- **User Story 1**: T023-T040 (18 tasks) - Visual identification with styling and icon
- **User Story 2**: T041-T056 (16 tasks) - Days overdue text display

### Test Coverage

- **dateUtils tests**: 8 test cases (T004-T011)
- **TodoCard US1 tests**: 5 test cases (T023-T027)
- **TodoCard US2 tests**: 5 test cases (T041-T045)
- **Total test cases**: 18 (ensures 80%+ coverage requirement)

### Parallel Task Count

- **Phase 1**: 2 parallel tasks (T002, T003)
- **Phase 2**: 8 parallel tasks (T004-T011 tests)
- **Phase 3**: 5 parallel tasks (T023-T027 tests)
- **Phase 4**: 5 parallel tasks (T041-T045 tests)
- **Phase 5**: 4 parallel tasks (T057-T060, T070)

### File Changes

**New Files** (2):
- packages/frontend/src/utils/dateUtils.js
- packages/frontend/src/utils/__tests__/dateUtils.test.js

**Modified Files** (3):
- packages/frontend/src/components/TodoCard.js
- packages/frontend/src/components/__tests__/TodoCard.test.js
- packages/frontend/src/styles/theme.css

**No Backend Changes**: All work is frontend-only

---

## Constitution Compliance Verification

- ✅ **Test-First Development**: Every phase includes RED-GREEN-REFACTOR cycle
- ✅ **80%+ Coverage**: 18 test cases across 3 test files
- ✅ **DRY**: Date logic extracted to dateUtils, not duplicated
- ✅ **KISS**: Simple Date API usage, no complex libraries
- ✅ **Single Responsibility**: Utility handles logic, component handles presentation
- ✅ **Design System**: Uses CSS variables, 8px grid, defined colors
- ✅ **Scope Discipline**: Only US1 (P1) and US2 (P2) from spec - no extra features
- ✅ **Modularity**: Clear separation between utils and components
- ✅ **No New Dependencies**: Uses existing React, Jest, JavaScript Date API

All tasks align with the [AI Bootcamp Todo App Constitution](../../.specify/memory/constitution.md).
