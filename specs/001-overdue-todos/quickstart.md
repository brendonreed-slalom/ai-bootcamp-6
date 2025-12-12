# Quickstart: Overdue Todo Items

**Feature**: Overdue Todo Items  
**Branch**: `001-overdue-todos`  
**Date**: 2025-12-12

## Overview

Add visual identification for overdue todos with styling and day count display. This feature calculates overdue status client-side and applies danger-color styling with a warning icon for incomplete todos past their due date.

## Prerequisites

- Node.js v16+
- npm v7+
- Existing todo app running (frontend + backend)
- Git branch: `001-overdue-todos`

## Quick Start

### 1. Checkout Feature Branch

```bash
cd /workspaces/ai-bootcamp-6
git checkout -b 001-overdue-todos
```

### 2. Implementation Checklist

#### Frontend Changes

**Create Date Utility** (`packages/frontend/src/utils/dateUtils.js`):
```javascript
/**
 * Check if a todo is overdue
 * @param {string|null} dueDate - ISO 8601 date string
 * @param {boolean} completed - Todo completion status
 * @param {Date} currentDate - Reference date (for testing)
 * @returns {boolean}
 */
export function isOverdue(dueDate, completed, currentDate = new Date()) {
  if (!dueDate || completed) return false;
  
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return due < now;
}

/**
 * Calculate days overdue
 * @param {string} dueDate - ISO 8601 date string
 * @param {Date} currentDate - Reference date (for testing)
 * @returns {number}
 */
export function calculateDaysOverdue(dueDate, currentDate = new Date()) {
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffMs = now - due;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}
```

**Update TodoCard Component** (`packages/frontend/src/components/TodoCard.js`):
- Import `isOverdue` and `calculateDaysOverdue` from `utils/dateUtils`
- Calculate overdue status: `const overdue = isOverdue(todo.dueDate, todo.completed)`
- Calculate days: `const daysOverdue = overdue ? calculateDaysOverdue(todo.dueDate) : 0`
- Add conditional className: `className={overdue ? 'todo-title overdue' : 'todo-title'}`
- Add warning icon when overdue: `{overdue && <span className="warning-icon" aria-label="overdue">⚠️</span>}`
- Display overdue text: `{overdue && <span className="overdue-text">{daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue</span>}`

**Add CSS Styles** (`packages/frontend/src/styles/theme.css`):
```css
/* Overdue styling */
.todo-title.overdue {
  color: var(--danger-color);
}

.warning-icon {
  margin-right: 8px;
  font-size: 20px;
}

.overdue-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-left: 8px;
}
```

#### Testing

**Create Date Utils Tests** (`packages/frontend/src/utils/__tests__/dateUtils.test.js`):
```javascript
import { isOverdue, calculateDaysOverdue } from '../dateUtils';

describe('isOverdue', () => {
  const testDate = new Date('2025-12-12');
  
  test('returns true for past due date and incomplete', () => {
    expect(isOverdue('2025-12-10', false, testDate)).toBe(true);
  });
  
  test('returns false for due date = today', () => {
    expect(isOverdue('2025-12-12', false, testDate)).toBe(false);
  });
  
  test('returns false for completed todo', () => {
    expect(isOverdue('2025-12-10', true, testDate)).toBe(false);
  });
  
  test('returns false for null due date', () => {
    expect(isOverdue(null, false, testDate)).toBe(false);
  });
});

describe('calculateDaysOverdue', () => {
  const testDate = new Date('2025-12-12');
  
  test('returns correct days for past due date', () => {
    expect(calculateDaysOverdue('2025-12-10', testDate)).toBe(2);
  });
  
  test('returns 0 for today', () => {
    expect(calculateDaysOverdue('2025-12-12', testDate)).toBe(0);
  });
  
  test('returns 0 for future date', () => {
    expect(calculateDaysOverdue('2025-12-15', testDate)).toBe(0);
  });
});
```

**Update TodoCard Tests** (`packages/frontend/src/components/__tests__/TodoCard.test.js`):
- Add test for overdue styling with past due date
- Add test for no overdue styling with due date = today
- Add test for no overdue styling on completed todos
- Add test for days overdue display

### 3. Run Tests

```bash
# Test date utilities
npm test -- dateUtils.test.js

# Test TodoCard component
npm test -- TodoCard.test.js

# Run all frontend tests
npm test --workspace=frontend

# Check coverage (should be 80%+)
npm test --workspace=frontend -- --coverage
```

### 4. Manual Testing

```bash
# Start the application
npm start
```

**Test Scenarios**:
1. Create a todo with a past due date → Should show red text, warning icon, "X days overdue"
2. Create a todo with today's date → Should NOT show overdue styling
3. Create a todo with a future date → Should NOT show overdue styling
4. Mark an overdue todo complete → Overdue styling should disappear
5. Create a todo without a due date → Should NOT show overdue styling
6. Test in dark mode → Danger color should adapt

### 5. Verify Accessibility

- [ ] Warning icon has `aria-label="overdue"`
- [ ] Overdue status conveyed by icon + color (not color alone)
- [ ] Days overdue text is readable
- [ ] Keyboard navigation works
- [ ] Screen reader announces overdue status

### 6. Code Quality Checks

```bash
# Run linter (if configured)
npm run lint --workspace=frontend

# Check for console.log statements
grep -r "console.log" packages/frontend/src/components/
grep -r "console.log" packages/frontend/src/utils/
```

## File Changes Summary

### New Files
- `packages/frontend/src/utils/dateUtils.js` - Date calculation utilities
- `packages/frontend/src/utils/__tests__/dateUtils.test.js` - Tests for date utilities

### Modified Files
- `packages/frontend/src/components/TodoCard.js` - Add overdue display logic
- `packages/frontend/src/components/__tests__/TodoCard.test.js` - Add overdue tests
- `packages/frontend/src/styles/theme.css` - Add overdue styling

### No Changes
- Backend files (no API changes)
- Database schema
- TodoService or API layer

## Expected Behavior

### Visual Indicators
- **Overdue todos**: Title in danger color (#c62828 light / #ef5350 dark)
- **Warning icon**: ⚠️ displayed before title (20px size)
- **Days text**: "X day(s) overdue" in caption size (12px)

### Calculation Rules
- Overdue = due date < today AND incomplete
- Due today = NOT overdue
- Completed todos = NEVER overdue
- No due date = NOT overdue

### Performance
- Date calculations should be instant (< 1ms per todo)
- No noticeable rendering delay with 1000 todos

## Troubleshooting

### Tests Failing
- Ensure mock dates are consistent in tests
- Check that date comparison uses midnight normalization
- Verify import paths for utilities

### Styling Not Appearing
- Check that CSS variables (--danger-color) are defined in theme.css
- Verify conditional className is applied correctly
- Inspect element in browser DevTools

### Wrong Overdue Calculation
- Verify date strings are ISO 8601 format
- Check browser timezone vs expected timezone
- Ensure midnight normalization in date comparison

## Next Steps

After implementation:
1. Run full test suite: `npm test`
2. Verify 80%+ code coverage
3. Manual testing in browser
4. Code review for constitution compliance
5. Commit with clear message
6. Open pull request to main branch

## Constitution Compliance Checklist

- [x] Test-first: Tests written alongside implementation
- [x] DRY: Date logic extracted to utility module
- [x] KISS: Simple date comparison, no over-engineering
- [x] Single Responsibility: Utility handles logic, component handles display
- [x] Design System: Uses defined danger colors and spacing
- [x] Scope: Only overdue visual identification and days display
- [x] Tech Stack: React, Jest, no new dependencies

## References

- Feature Spec: [spec.md](./spec.md)
- Implementation Plan: [plan.md](./plan.md)
- Research: [research.md](./research.md)
- Data Model: [data-model.md](./data-model.md)
- API Contracts: [contracts/api.md](./contracts/api.md)
- Constitution: [../../.specify/memory/constitution.md](../../.specify/memory/constitution.md)
