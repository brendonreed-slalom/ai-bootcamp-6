import { isOverdue, calculateDaysOverdue } from '../dateUtils';

describe('dateUtils', () => {
  describe('isOverdue', () => {
    test('returns true for past due date and incomplete status', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dueDate = yesterday.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, false)).toBe(true);
    });

    test('returns false when due date is today', () => {
      const today = new Date().toISOString().split('T')[0];
      
      expect(isOverdue(today, false)).toBe(false);
    });

    test('returns false when todo is completed (even with past due date)', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dueDate = yesterday.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, true)).toBe(false);
    });

    test('returns false when dueDate is null', () => {
      expect(isOverdue(null, false)).toBe(false);
    });

    test('returns false when dueDate is undefined', () => {
      expect(isOverdue(undefined, false)).toBe(false);
    });

    test('returns false for future dates', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dueDate = tomorrow.toISOString().split('T')[0];
      
      expect(isOverdue(dueDate, false)).toBe(false);
    });
  });

  describe('calculateDaysOverdue', () => {
    test('returns correct number for past dates', () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const dueDate = fiveDaysAgo.toISOString().split('T')[0];
      
      expect(calculateDaysOverdue(dueDate)).toBe(5);
    });

    test('returns 1 for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dueDate = yesterday.toISOString().split('T')[0];
      
      expect(calculateDaysOverdue(dueDate)).toBe(1);
    });

    test('returns 0 for today\'s date', () => {
      const today = new Date().toISOString().split('T')[0];
      
      expect(calculateDaysOverdue(today)).toBe(0);
    });

    test('returns 0 for future dates', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dueDate = tomorrow.toISOString().split('T')[0];
      
      expect(calculateDaysOverdue(dueDate)).toBe(0);
    });

    test('returns 0 for null date', () => {
      expect(calculateDaysOverdue(null)).toBe(0);
    });

    test('returns 0 for undefined date', () => {
      expect(calculateDaysOverdue(undefined)).toBe(0);
    });
  });
});
