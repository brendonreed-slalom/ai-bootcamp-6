/**
 * Date utility functions for todo items
 */

/**
 * Normalizes a date to midnight local time
 * @param {Date} date - Date to normalize
 * @returns {Date} Date set to midnight
 */
function normalizeToMidnight(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Checks if a todo is overdue
 * A todo is overdue if it has a past due date and is incomplete
 * @param {string|null|undefined} dueDate - ISO 8601 date string
 * @param {boolean} completed - Completion status
 * @returns {boolean} True if overdue, false otherwise
 */
export function isOverdue(dueDate, completed) {
  // Cannot be overdue if no due date or if completed
  if (!dueDate || completed) {
    return false;
  }

  // Normalize both dates to midnight for accurate comparison
  const today = normalizeToMidnight(new Date());
  const due = normalizeToMidnight(new Date(dueDate));

  // Overdue if due date is before today
  return due < today;
}

/**
 * Calculates the number of days a todo is overdue
 * @param {string|null|undefined} dueDate - ISO 8601 date string
 * @returns {number} Number of days overdue (0 if not overdue)
 */
export function calculateDaysOverdue(dueDate) {
  // Return 0 if no due date
  if (!dueDate) {
    return 0;
  }

  // Normalize both dates to midnight
  const today = normalizeToMidnight(new Date());
  const due = normalizeToMidnight(new Date(dueDate));

  // Calculate difference in milliseconds and convert to days
  const diffInMs = today - due;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Return 0 if not overdue (future or today)
  return diffInDays > 0 ? diffInDays : 0;
}
