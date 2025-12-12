# Research: Overdue Todo Items

**Feature**: Overdue Todo Items  
**Date**: 2025-12-12  
**Phase**: 0 - Outline & Research

## Research Questions

Based on the Technical Context and feature requirements, the following areas required research:

1. **Date Comparison in JavaScript**: How to reliably compare dates in browser environment
2. **Timezone Handling**: Best practices for using browser's local timezone
3. **React Component Styling**: Conditional styling patterns in React
4. **Performance Optimization**: Efficient date calculations for list rendering
5. **Accessibility**: Conveying overdue status for screen readers

## Findings

### 1. Date Comparison in JavaScript

**Decision**: Use JavaScript Date object with `setHours(0,0,0,0)` for day-level comparison

**Rationale**:
- Built-in Date API is widely supported and requires no additional dependencies
- Setting hours to midnight normalizes dates for accurate day-level comparison
- Prevents time-of-day issues (e.g., 11:59 PM vs 12:01 AM same day)
- Simple to test and maintain

**Implementation Pattern**:
```javascript
function isOverdue(dueDate, currentDate = new Date()) {
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  
  // Normalize to midnight for day comparison
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return due < now;
}
```

**Alternatives Considered**:
- date-fns library: Adds 67KB dependency for simple comparison
- Moment.js: Deprecated and large bundle size
- Day.js: Lightweight but unnecessary for basic date comparison
- String comparison: Unreliable with different date formats and timezones

### 2. Timezone Handling

**Decision**: Use browser's local timezone via JavaScript Date constructor

**Rationale**:
- Date constructor automatically uses browser's timezone
- No server-side conversion needed (single-user app)
- Matches user's expectation (sees overdue based on their local time)
- No additional configuration or libraries required

**Implementation Pattern**:
```javascript
// new Date() automatically uses browser timezone
const now = new Date(); // Uses user's local timezone
```

**Alternatives Considered**:
- UTC timestamps: Requires timezone conversion display logic
- Server-side timezone: Unnecessary for single-user app
- Configurable timezone: Out of scope per requirements

### 3. React Component Styling

**Decision**: Use conditional className with inline logic and CSS variables from theme

**Rationale**:
- Follows existing project pattern (theme.css with CSS variables)
- No additional styling library needed
- Maintains separation of concerns (CSS in theme.css, logic in component)
- Simple conditional rendering for warning icon

**Implementation Pattern**:
```javascript
function TodoCard({ todo }) {
  const overdue = isOverdue(todo.dueDate) && !todo.completed;
  
  return (
    <div className="todo-card">
      <span className={overdue ? 'todo-title overdue' : 'todo-title'}>
        {overdue && <WarningIcon />}
        {todo.title}
      </span>
    </div>
  );
}
```

```css
/* theme.css */
.todo-title.overdue {
  color: var(--danger-color);
}
```

**Alternatives Considered**:
- Inline styles: Less maintainable, harder to theme
- CSS-in-JS (styled-components): Adds dependency, breaks existing pattern
- CSS Modules: Project not configured for this approach

### 4. Performance Optimization

**Decision**: Calculate overdue status during render, no memoization initially

**Rationale**:
- Date comparison is O(1) and extremely fast (<1ms)
- Premature optimization violates constitution KISS principle
- For 1000 todos: ~1ms total (well under 50ms requirement)
- Can add useMemo later if profiling shows need

**Implementation Pattern**:
```javascript
function TodoCard({ todo }) {
  // Direct calculation - fast enough
  const overdue = isOverdue(todo.dueDate) && !todo.completed;
  const daysOverdue = overdue ? calculateDaysOverdue(todo.dueDate) : 0;
  // ... render
}
```

**Alternatives Considered**:
- useMemo: Adds complexity without measured benefit
- Backend calculation: Unnecessary API change for simple logic
- Cached calculations: Over-engineering for current scale

### 5. Accessibility

**Decision**: Use aria-label on warning icon and semantic text for screen readers

**Rationale**:
- Warning icon provides visual indicator (meets "not color alone" requirement)
- aria-label announces overdue status to screen readers
- Text "X days overdue" is already accessible
- Follows WCAG AA guidelines

**Implementation Pattern**:
```javascript
<span className={overdue ? 'todo-title overdue' : 'todo-title'}>
  {overdue && (
    <span className="warning-icon" aria-label="overdue" role="img">
      ⚠️
    </span>
  )}
  {todo.title}
</span>
{overdue && <span className="overdue-text">{daysOverdue} days overdue</span>}
```

**Alternatives Considered**:
- aria-live region: Unnecessary for static list
- Screen-reader-only text: Redundant with aria-label + visible text
- Role="alert": Too aggressive for non-critical information

## Technology Choices

### Required Dependencies
None - all functionality uses existing dependencies:
- React (already in project)
- Jest + @testing-library/react (already in project)

### New Utilities
- `dateUtils.js`: Date comparison and calculation functions
  - `isOverdue(dueDate, currentDate?)`: Returns boolean
  - `calculateDaysOverdue(dueDate, currentDate?)`: Returns number

### Component Modifications
- `TodoCard.js`: Add conditional styling and overdue display logic

## Best Practices Applied

1. **Pure Functions**: Date utilities are pure functions for easy testing
2. **Default Parameters**: `currentDate` parameter defaults to `new Date()` for testability
3. **Separation of Concerns**: Date logic in utils, presentation in components
4. **Test-Driven**: Date utilities can be tested in isolation
5. **No External Dependencies**: Uses standard JavaScript Date API

## Open Questions Resolved

All questions from Technical Context marked as "NEEDS CLARIFICATION" have been resolved:
- ✅ Date comparison approach: JavaScript Date API with midnight normalization
- ✅ Timezone handling: Browser's local timezone via Date constructor
- ✅ Styling approach: Conditional className with CSS variables
- ✅ Performance strategy: Direct calculation (fast enough for requirements)
- ✅ Accessibility implementation: aria-label + visible text + icon

## References

- [MDN: Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://react.dev/learn/accessibility)
- Project Constitution: Test-First Development, KISS, DRY principles
