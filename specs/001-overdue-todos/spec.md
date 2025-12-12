# Feature Specification: Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Created**: 2025-12-12  
**Status**: Draft  
**Input**: User description: "Support for Overdue Todo Items - Users need a clear, visual way to identify which todos have not been completed by their due date"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Identification of Overdue Todos (Priority: P1)

Users can immediately identify which incomplete todos are past their due date through visual styling in the todo list.

**Why this priority**: This is the core value of the feature - enabling users to quickly spot overdue items without manual date comparison. All other functionality builds upon this foundation.

**Independent Test**: Can be fully tested by creating todos with past due dates and verifying they display with overdue styling. Delivers immediate value by making overdue items visually distinct.

**Acceptance Scenarios**:

1. **Given** a todo with a due date in the past and incomplete status, **When** the user views the todo list, **Then** the todo displays with overdue visual styling (todo title text in danger color with warning icon)
2. **Given** a todo with a due date today and incomplete status, **When** the user views the todo list, **Then** the todo does NOT display with overdue styling
3. **Given** a todo with a due date in the past and completed status, **When** the user views the todo list, **Then** the todo does NOT display with overdue styling (completed todos are never overdue)
4. **Given** a todo with no due date set, **When** the user views the todo list, **Then** the todo does NOT display with overdue styling

---

### User Story 2 - Overdue Date Display (Priority: P2)

Users can see how many days a todo is overdue to understand urgency level.

**Why this priority**: Enhances the basic overdue indicator by providing context about how late the task is. Helps users prioritize among multiple overdue items.

**Independent Test**: Can be tested by creating todos with various past due dates and verifying the "X days overdue" text appears correctly. Adds prioritization value on top of basic visual identification.

**Acceptance Scenarios**:

1. **Given** a todo that is 1 day overdue, **When** the user views the todo, **Then** the system displays "1 day overdue" text
2. **Given** a todo that is 5 days overdue, **When** the user views the todo, **Then** the system displays "5 days overdue" text
3. **Given** a todo that is due today (0 days overdue), **When** the user views the todo, **Then** the system displays the due date without "overdue" text
4. **Given** a todo with no due date, **When** the user views the todo, **Then** no overdue text is displayed

---

### Edge Cases

- What happens when a todo's due date is exactly midnight today? (Should not be considered overdue until tomorrow)
- How does the system handle timezone differences? (Use browser's local timezone for date calculations)
- What happens when a user marks an overdue todo as complete? (Overdue styling immediately removes)
- How does the system behave if system date changes? (Recalculate overdue status on page load/refresh)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST identify todos as overdue when their due date is before the current date AND the todo is incomplete
- **FR-002**: System MUST apply distinct visual styling to overdue todos by rendering the todo title text in danger color and displaying a warning icon
- **FR-003**: System MUST calculate and display the number of days a todo is overdue
- **FR-004**: System MUST NOT mark completed todos as overdue, regardless of their due date
- **FR-005**: System MUST NOT mark todos without a due date as overdue
- **FR-006**: System MUST recalculate overdue status dynamically based on current date
- **FR-007**: System MUST use the user's local timezone for date comparisons

### Key Entities

- **Todo Item**: Existing entity with attributes: id, title, dueDate (optional), completed (boolean), createdAt
  - No new attributes required - overdue status is calculated dynamically from existing dueDate and completed fields

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify overdue todos within 2 seconds of viewing the list without reading individual dates
- **SC-002**: 100% of overdue todos (incomplete with past due date) display with distinct visual styling
- **SC-003**: Overdue status updates immediately (within 1 second) when todo completion status changes
- **SC-004**: System correctly calculates overdue days across timezone boundaries with 100% accuracy
- **SC-005**: Visual styling for overdue items meets WCAG AA contrast standards for accessibility

## Non-Functional Requirements *(optional)*

### Performance

- Overdue status calculation must not add noticeable delay to todo list rendering (< 50ms for 1000 todos)

### Design Consistency

- Overdue visual styling must follow the established design system:
  - Todo title text rendered in defined danger color from theme (#c62828 light mode, #ef5350 dark mode)
  - Warning icon displayed adjacent to todo title (standard 20px × 20px icon size from design system)
  - Maintain consistent spacing and typography
  - Respect dark/light mode theming

### Accessibility

- Overdue status must be conveyed through both color AND text/icon (not color alone) - warning icon serves as visual indicator beyond color
- ARIA labels should identify overdue status for screen readers (e.g., aria-label="overdue")
- Keyboard navigation must work with overdue todos

## Assumptions

- The existing todo app already has due date functionality implemented
- Date comparison will use browser's Date API and local timezone
- "Overdue" means the due date is strictly before today (due today is not overdue)
- The app already has a defined danger color in the design system for overdue indication

## Out of Scope

- Sorting or filtering todos by overdue status (future enhancement)
- Notifications or reminders for overdue todos
- Customizable overdue visual styling (must use design system colors)
- Historical tracking of how long a todo was overdue
- Bulk actions on overdue todos
- Configurable timezone settings (uses browser timezone)

## Clarifications

### Session 2025-12-12

- Q: Visual Styling Implementation - The spec requires "distinct visual styling" for overdue todos (FR-002), but doesn't specify HOW the styling should be applied. Options were: (A) Change entire card background, (B) Text color + icon, (C) Left border, (D) Badge/chip. → A: Text color to danger color + add warning icon
