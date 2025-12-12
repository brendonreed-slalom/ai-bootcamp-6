<!--
  =============================================================================
  SYNC IMPACT REPORT - Constitution v1.0.0
  =============================================================================
  
  Version Change: Initial creation → v1.0.0
  
  Principles Established:
  - I. Test-First Development (NON-NEGOTIABLE)
  - II. Code Quality & Maintainability
  - III. Single Responsibility & Modularity
  - IV. Design System Consistency
  - V. Scope Discipline & Simplicity
  
  Modified Templates:
  ✅ plan-template.md - Constitution Check section verified
  ✅ spec-template.md - Alignment with functional requirements verified
  ✅ tasks-template.md - Task structure aligns with testing principles
  
  Follow-up Items:
  - None - all placeholders have been filled
  
  Rationale for Version 1.0.0 (MAJOR):
  - Initial establishment of project governance framework
  - Establishes foundational principles for all future development
  =============================================================================
-->

# AI Bootcamp Todo App Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

All features MUST follow test-driven development practices:
- Tests MUST be written before or alongside implementation
- Minimum 80% code coverage required across all packages
- Tests MUST verify behavior, not implementation details
- All tests MUST pass before code can be merged
- Tests MUST be independent, isolated, and repeatable

**Rationale**: Quality and reliability are paramount. TDD ensures features work as expected, reduces bugs, and provides living documentation. The 80% threshold balances thoroughness with pragmatism while preventing untested code from entering the codebase.

### II. Code Quality & Maintainability

All code MUST adhere to established quality principles:
- **DRY (Don't Repeat Yourself)**: Extract common code into shared functions/components/utilities
- **KISS (Keep It Simple)**: Prefer simple, readable solutions over complex ones
- **Single Responsibility**: Each module/component/function does one thing well
- **Clear Naming**: Use descriptive `camelCase` for variables/functions, `PascalCase` for components/classes, `UPPER_SNAKE_CASE` for constants
- **Error Handling**: All operations that can fail MUST include proper error handling with meaningful messages
- **No Linting Errors**: All code MUST pass ESLint checks before commit

**Rationale**: Maintainable code is essential for long-term project health. These principles ensure code remains readable, debuggable, and extensible as the project grows.

### III. Single Responsibility & Modularity

Code MUST be organized into focused, reusable modules:
- Each component/service/utility has exactly one reason to change
- Components handle presentation; services handle business logic and API communication
- Shared logic MUST be extracted into utilities (e.g., date formatting, validation)
- Dependencies MUST be injected, not hardcoded
- Imports MUST follow consistent ordering: (1) external libraries, (2) internal modules, (3) styles

**Rationale**: Modular architecture enables independent testing, parallel development, and easier debugging. Clear separation of concerns makes the codebase more approachable for new developers and AI assistants.

### IV. Design System Consistency

All UI implementation MUST strictly follow the established design system:
- **Color Palette**: Use only defined colors for light/dark modes (no arbitrary colors)
- **Typography**: Follow defined font sizes, weights, and hierarchy (28px headings, 16px body, etc.)
- **Spacing**: Adhere to 8px grid system (xs=8px, sm=16px, md=24px, lg=32px, xl=48px)
- **Components**: Maintain consistent styling for cards, buttons, inputs, and icons
- **Accessibility**: WCAG AA contrast standards, keyboard navigation, ARIA labels

**Rationale**: Design consistency creates a professional, cohesive user experience. A strict design system prevents visual drift and ensures all features feel like part of a unified application. Accessibility is non-negotiable for inclusive user experience.

### V. Scope Discipline & Simplicity

Features MUST remain within defined scope boundaries:
- Implement ONLY requirements explicitly defined in functional specifications
- Resist feature creep—mark additional ideas as "Out of Scope" for future consideration
- Prefer simple MVP implementations over complex, future-proof designs
- No premature optimization—optimize only when necessary and measurable
- Keep dependencies minimal—justify each new library/framework addition

**Rationale**: Scope creep is a primary cause of project delays and complexity. By maintaining strict scope discipline and favoring simplicity, we deliver working software faster and maintain code that's easier to understand and modify.

## Technology Stack & Constraints

### Architecture
- **Monorepo Structure**: npm workspaces managing `packages/frontend` and `packages/backend`
- **Frontend**: React application with component-based architecture
- **Backend**: Express.js REST API server
- **Single-User Application**: No authentication, authorization, or multi-user features

### Mandatory Technologies
- **Testing**: Jest for all unit and integration tests
- **Linting**: ESLint for code quality enforcement
- **Runtime**: Node.js v16+ with npm v7+

### Code Organization Standards
```
packages/frontend/src/
  components/       # Reusable UI components with colocated tests
  services/         # API communication layer
  styles/           # Global styles and theme definitions
  __tests__/        # Integration and app-level tests

packages/backend/src/
  services/         # Business logic and data access
  __tests__/        # API and service tests
```

### File Structure Requirements
- Tests MUST be colocated in `__tests__/` directories
- Test files MUST follow naming pattern: `{filename}.test.js`
- Each component/service in its own file matching the component/class name

## Development Workflow & Quality Gates

### Pre-Commit Requirements
- All ESLint errors and warnings MUST be resolved
- All tests MUST pass locally
- No `console.log` statements in production code
- No trailing whitespace or inconsistent indentation (2 spaces)

### Pull Request Requirements
- Atomic commits with clear, descriptive messages
- Code review approval required before merge
- All automated tests passing
- Coverage threshold maintained (80%+)

### Code Review Checklist
Every PR MUST verify:
- [ ] Follows naming conventions and import organization
- [ ] No linting errors or warnings
- [ ] Code is DRY and follows single responsibility
- [ ] Error handling implemented for failure paths
- [ ] Tests written for new functionality
- [ ] Design system guidelines followed (UI changes)
- [ ] Within scope of functional requirements
- [ ] Commits are atomic and well-described

### Test-First Workflow (RED-GREEN-REFACTOR)
1. **RED**: Write failing tests that describe desired behavior
2. **GREEN**: Write minimal code to make tests pass
3. **REFACTOR**: Improve code quality while keeping tests green
4. Repeat for next feature/requirement

### Testing Standards
- **Unit Tests**: Test individual components/functions in isolation with all dependencies mocked
- **Integration Tests**: Test component interactions and API communication
- **Test Structure**: Follow Arrange-Act-Assert pattern
- **Test Data**: Use consistent fixtures and mock data from `__mocks__/` directories

## Governance

This constitution supersedes all other development practices and guidelines. All code contributions, whether human-written or AI-generated, MUST comply with these principles.

### Amendment Process
- Amendments require documented justification and team consensus
- Version bumping follows semantic versioning:
  - **MAJOR**: Backward-incompatible principle changes or removals
  - **MINOR**: New principles added or material expansions
  - **PATCH**: Clarifications, wording improvements, non-semantic fixes
- All amendments MUST include impact analysis on dependent templates and documentation

### Compliance & Enforcement
- All PRs MUST pass constitution compliance review
- Deviations from principles MUST be explicitly justified and documented
- Constitution review is part of every planning and specification phase
- Detailed guidance available in `/docs/` directory:
  - `coding-guidelines.md` for implementation details
  - `testing-guidelines.md` for test practices
  - `ui-guidelines.md` for design system specifics
  - `functional-requirements.md` for scope boundaries

### Living Document
This constitution evolves with the project. When patterns emerge or lessons are learned, propose amendments to capture institutional knowledge and prevent repeated mistakes.

**Version**: 1.0.0 | **Ratified**: 2025-12-12 | **Last Amended**: 2025-12-12
