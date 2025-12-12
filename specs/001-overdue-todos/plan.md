# Implementation Plan: Overdue Todo Items

**Branch**: `001-overdue-todos` | **Date**: 2025-12-12 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-overdue-todos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enable visual identification of overdue todos through styling and calculated overdue days display. Implementation adds client-side date comparison logic to identify incomplete todos with past due dates, applies danger-color styling with warning icon, and calculates/displays days overdue. No backend changes required - uses existing todo data model with dueDate field.

## Technical Context

**Language/Version**: JavaScript (Node.js v16+) / React 18.2.0  
**Primary Dependencies**: React, Express.js 4.18.2, axios 1.6.2, Jest 29.7.0  
**Storage**: SQLite (better-sqlite3 11.10.0) via backend API  
**Testing**: Jest with @testing-library/react for frontend, Jest with supertest for backend  
**Target Platform**: Web browsers (desktop-focused, responsive design)  
**Project Type**: Web application (monorepo with frontend/backend packages)  
**Performance Goals**: < 50ms overdue calculation for 1000 todos, no noticeable rendering delay  
**Constraints**: WCAG AA contrast, single-user app, browser local timezone for date calculations  
**Scale/Scope**: Small-scale single-user application, ~10-20 components, basic CRUD operations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with [AI Bootcamp Todo App Constitution](../../.specify/memory/constitution.md):

- [x] **Test-First Development**: Feature spec includes testable acceptance criteria with specific scenarios for overdue visual styling and day calculations. Tests will be written alongside implementation.
- [x] **Code Quality**: Implementation will follow camelCase naming, DRY principles (extract date comparison utility), KISS (simple date comparison logic), and single responsibility (separate utility for date calculations).
- [x] **Modularity**: Clear separation - TodoCard component handles presentation, utility function handles date logic, no backend changes needed (uses existing API).
- [x] **Design System**: Uses defined danger color (#c62828 light, #ef5350 dark), standard 20px × 20px warning icon, maintains spacing and typography, respects dark/light mode theming.
- [x] **Scope Discipline**: Feature is within defined functional requirements - only visual identification and days overdue display. No filtering, sorting, or notifications.
- [x] **Architecture Alignment**: Fits within monorepo structure - changes only in packages/frontend (components and utilities).
- [x] **Technology Constraints**: Uses approved stack - React for UI components, Jest for testing, follows existing ESLint configuration.

**Status**: ✅ PASS - All constitution principles satisfied. No violations or complexity additions required.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todos/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/frontend/
├── src/
│   ├── components/
│   │   ├── TodoCard.js          # MODIFY: Add overdue styling logic
│   │   └── __tests__/
│   │       └── TodoCard.test.js # MODIFY: Add overdue styling tests
│   ├── utils/
│   │   ├── dateUtils.js         # NEW: Date comparison and calculation utilities
│   │   └── __tests__/
│   │       └── dateUtils.test.js # NEW: Tests for date utilities
│   └── styles/
│       └── theme.css            # REFERENCE: Uses existing danger colors

packages/backend/
└── (No changes - uses existing todo API with dueDate field)
```

**Structure Decision**: Selected "Web application" structure (frontend + backend). Changes are isolated to frontend package only - specifically the TodoCard component for visual presentation and a new utility module for date calculations. No backend modifications needed as the existing todo data model already includes the dueDate field required for overdue calculations.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - this section is not applicable. Constitution Check passed without requiring any complexity additions or deviations from established principles.
