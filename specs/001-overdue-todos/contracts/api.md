# API Contracts: Overdue Todo Items

**Feature**: Overdue Todo Items  
**Date**: 2025-12-12  
**Phase**: 1 - Design & Contracts

## Overview

This feature **does not require any API changes**. All overdue calculations are performed client-side using the existing todo API endpoints and data structure.

## Existing API Endpoints (No Changes)

### GET /api/todos

Retrieve all todos.

**Request**:
```http
GET /api/todos HTTP/1.1
```

**Response** (200 OK):
```json
[
  {
    "id": "uuid-string",
    "title": "Complete project",
    "dueDate": "2025-12-15",
    "completed": false,
    "createdAt": "2025-12-01T10:30:00Z"
  },
  {
    "id": "uuid-string-2",
    "title": "Review code",
    "dueDate": null,
    "completed": true,
    "createdAt": "2025-12-02T14:20:00Z"
  }
]
```

**Notes**:
- `dueDate` is an ISO 8601 date string or null
- Frontend will calculate overdue status from this data

---

### GET /api/todos/:id

Retrieve a single todo by ID.

**Request**:
```http
GET /api/todos/uuid-string HTTP/1.1
```

**Response** (200 OK):
```json
{
  "id": "uuid-string",
  "title": "Complete project",
  "dueDate": "2025-12-15",
  "completed": false,
  "createdAt": "2025-12-01T10:30:00Z"
}
```

---

### POST /api/todos

Create a new todo.

**Request**:
```http
POST /api/todos HTTP/1.1
Content-Type: application/json

{
  "title": "New todo",
  "dueDate": "2025-12-20"
}
```

**Response** (201 Created):
```json
{
  "id": "uuid-string",
  "title": "New todo",
  "dueDate": "2025-12-20",
  "completed": false,
  "createdAt": "2025-12-12T15:45:00Z"
}
```

---

### PUT /api/todos/:id

Update an existing todo (full replacement).

**Request**:
```http
PUT /api/todos/uuid-string HTTP/1.1
Content-Type: application/json

{
  "title": "Updated todo",
  "dueDate": "2025-12-25",
  "completed": false
}
```

**Response** (200 OK):
```json
{
  "id": "uuid-string",
  "title": "Updated todo",
  "dueDate": "2025-12-25",
  "completed": false,
  "createdAt": "2025-12-01T10:30:00Z"
}
```

---

### PATCH /api/todos/:id

Partially update a todo (e.g., toggle completed status).

**Request**:
```http
PATCH /api/todos/uuid-string HTTP/1.1
Content-Type: application/json

{
  "completed": true
}
```

**Response** (200 OK):
```json
{
  "id": "uuid-string",
  "title": "Complete project",
  "dueDate": "2025-12-15",
  "completed": true,
  "createdAt": "2025-12-01T10:30:00Z"
}
```

---

### DELETE /api/todos/:id

Delete a todo.

**Request**:
```http
DELETE /api/todos/uuid-string HTTP/1.1
```

**Response** (204 No Content)

---

## Client-Side Contract

While the API remains unchanged, the frontend introduces a **view model** that enhances todo data with calculated fields.

### Todo View Model (Client-Side Only)

```typescript
// TypeScript notation for documentation (project uses JavaScript)

// Raw API response
interface TodoDTO {
  id: string;
  title: string;
  dueDate: string | null;  // ISO 8601 date or null
  completed: boolean;
  createdAt: string;       // ISO 8601 timestamp
}

// Enhanced view model with calculated fields
interface TodoViewModel extends TodoDTO {
  isOverdue: boolean;      // Calculated client-side
  daysOverdue: number;     // Calculated client-side (0 if not overdue)
}
```

### Calculation Logic Contract

```javascript
/**
 * Determines if a todo is overdue
 * @param {string|null} dueDate - ISO 8601 date string
 * @param {boolean} completed - Whether todo is completed
 * @param {Date} currentDate - Reference date for comparison (defaults to now)
 * @returns {boolean} - True if overdue
 */
function isOverdue(dueDate, completed, currentDate = new Date()) {
  if (!dueDate || completed) return false;
  
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  return due < now;
}

/**
 * Calculates days overdue
 * @param {string} dueDate - ISO 8601 date string
 * @param {Date} currentDate - Reference date for comparison (defaults to now)
 * @returns {number} - Number of days overdue (0 if not overdue)
 */
function calculateDaysOverdue(dueDate, currentDate = new Date()) {
  const due = new Date(dueDate);
  const now = new Date(currentDate);
  
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffMs = now - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
```

## Error Handling (No Changes)

Existing error responses remain unchanged:

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "message": "Title is required"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Todo not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Versioning

No API version changes required. Existing endpoints at `/api/todos` continue to work without modification.

## Migration Strategy

1. **Backend**: No changes required
2. **Frontend**: 
   - Add utility functions for overdue calculations
   - Update TodoCard component to use calculated fields
   - No breaking changes to existing functionality

## Testing Contract

### API Tests (No Changes Required)

Existing backend tests remain valid. No new API test cases needed.

### Client Calculation Tests (New)

```javascript
// Test cases for dateUtils.js
describe('isOverdue', () => {
  test('returns true for past due date and incomplete', () => {
    const result = isOverdue('2025-12-10', false, new Date('2025-12-12'));
    expect(result).toBe(true);
  });
  
  test('returns false for due date = today', () => {
    const result = isOverdue('2025-12-12', false, new Date('2025-12-12'));
    expect(result).toBe(false);
  });
  
  test('returns false for completed todo', () => {
    const result = isOverdue('2025-12-10', true, new Date('2025-12-12'));
    expect(result).toBe(false);
  });
  
  test('returns false for null due date', () => {
    const result = isOverdue(null, false, new Date('2025-12-12'));
    expect(result).toBe(false);
  });
});

describe('calculateDaysOverdue', () => {
  test('returns correct days for past due date', () => {
    const result = calculateDaysOverdue('2025-12-10', new Date('2025-12-12'));
    expect(result).toBe(2);
  });
  
  test('returns 0 for due date = today', () => {
    const result = calculateDaysOverdue('2025-12-12', new Date('2025-12-12'));
    expect(result).toBe(0);
  });
  
  test('returns 0 for future due date', () => {
    const result = calculateDaysOverdue('2025-12-15', new Date('2025-12-12'));
    expect(result).toBe(0);
  });
});
```

## Summary

This feature requires **zero API contract changes**. The existing REST API provides all necessary data (dueDate field) for client-side overdue calculations. This approach:

- ✅ Minimizes backend complexity
- ✅ Reduces deployment risk (no API changes)
- ✅ Keeps feature self-contained in frontend
- ✅ Allows independent frontend testing
- ✅ Maintains backward compatibility
- ✅ Follows single-user app architecture (no server-side state needed)
