import { describe, it, expect, beforeEach } from 'vitest';
import {
  getGoal,
  setGoal,
  getStats,
  recordAnswer,
  getStreak,
  toggleBookmark,
  isBookmarked,
  getLastSession,
  setLastSession
} from '../utils/localStorage';

describe('localStorage helper methods', () => {
  beforeEach(() => {
    // LocalStorage is cleared automatically by setup.js afterEach,
    // but we can clear it here too just to be certain.
    window.localStorage.clear();
  });

  it('should get and set goal correctly', () => {
    expect(getGoal()).toBeNull();
    setGoal('daily_10');
    expect(getGoal()).toBe('daily_10');
  });

  it('should toggle and check bookmarks correctly', () => {
    const questionId = 'q-123';
    expect(isBookmarked(questionId)).toBe(false);
    
    // Add bookmark
    const added = toggleBookmark(questionId);
    expect(added).toBe(true);
    expect(isBookmarked(questionId)).toBe(true);

    // Remove bookmark
    const removed = toggleBookmark(questionId);
    expect(removed).toBe(false);
    expect(isBookmarked(questionId)).toBe(false);
  });

  it('should initialize and record answers correctly and update stats', () => {
    const statsInit = getStats();
    expect(statsInit.total_attempted).toBe(0);
    expect(statsInit.total_correct).toBe(0);

    // Record correct answer
    recordAnswer('q1', 'percentages', true);
    let stats = getStats();
    expect(stats.total_attempted).toBe(1);
    expect(stats.total_correct).toBe(1);
    expect(stats.by_category.percentages).toEqual({ attempted: 1, correct: 1 });

    // Record incorrect answer
    recordAnswer('q2', 'percentages', false);
    stats = getStats();
    expect(stats.total_attempted).toBe(2);
    expect(stats.total_correct).toBe(1);
    expect(stats.by_category.percentages).toEqual({ attempted: 2, correct: 1 });

    // Avoid double counting same question
    recordAnswer('q1', 'percentages', true);
    stats = getStats();
    expect(stats.total_attempted).toBe(2);
    expect(stats.total_correct).toBe(1);
  });

  it('should record streaks correctly', () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Record first answer today
    recordAnswer('q1', 'averages', true);
    let streak = getStreak();
    expect(streak.count).toBe(1);
    expect(streak.lastDate).toBe(today);

    // Another answer today shouldn't increment count
    recordAnswer('q2', 'averages', true);
    streak = getStreak();
    expect(streak.count).toBe(1);
  });

  it('should handle last session get and set', () => {
    expect(getLastSession()).toBeNull();
    setLastSession('arithmetic', 'q-1');
    const session = getLastSession();
    expect(session.categoryId).toBe('arithmetic');
    expect(session.questionId).toBe('q-1');
    expect(session.timestamp).toBeGreaterThan(0);
  });
});
