// src/utils/localStorage.js
// Helpers for all localStorage operations

const STORAGE_KEY = 'aptitude_animate_v1';

function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    return { ...defaultStore(), ...JSON.parse(raw) };
  } catch {
    return defaultStore();
  }
}

function saveStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

function defaultStore() {
  return {
    goal: null,
    streak: { lastDate: null, count: 0 },
    stats: {
      total_attempted: 0,
      total_correct: 0,
      by_category: {}
    },
    bookmarks: [],
    last_session: null,
    answered: {}   // questionId → { correct: bool, timestamp }
  };
}

// ── Goal ──
export function getGoal() { return getStore().goal; }
export function setGoal(goal) {
  const s = getStore(); s.goal = goal; saveStore(s);
}

// ── Progress / Stats ──
export function getStats() { return getStore().stats; }
export function recordAnswer(questionId, categoryId, isCorrect) {
  const s = getStore();
  // Avoid double-counting
  if (s.answered[questionId]) return;
  s.answered[questionId] = { correct: isCorrect, timestamp: Date.now() };
  s.stats.total_attempted += 1;
  if (isCorrect) s.stats.total_correct += 1;
  if (!s.stats.by_category[categoryId]) {
    s.stats.by_category[categoryId] = { attempted: 0, correct: 0 };
  }
  s.stats.by_category[categoryId].attempted += 1;
  if (isCorrect) s.stats.by_category[categoryId].correct += 1;
  // Streak
  const today = new Date().toISOString().split('T')[0];
  if (s.streak.lastDate === today) {
    // already counted today
  } else if (s.streak.lastDate === yesterday()) {
    s.streak.count += 1;
    s.streak.lastDate = today;
  } else {
    s.streak = { lastDate: today, count: 1 };
  }
  saveStore(s);
}
export function getStreak() { return getStore().streak; }
export function isAnswered(questionId) { return !!getStore().answered[questionId]; }
export function getAnswered() { return getStore().answered; }

// ── Bookmarks ──
export function getBookmarks() { return getStore().bookmarks; }
export function toggleBookmark(questionId) {
  const s = getStore();
  const idx = s.bookmarks.indexOf(questionId);
  if (idx === -1) s.bookmarks.push(questionId);
  else s.bookmarks.splice(idx, 1);
  saveStore(s);
  return s.bookmarks.includes(questionId);
}
export function isBookmarked(questionId) {
  return getStore().bookmarks.includes(questionId);
}

// ── Last Session ──
export function getLastSession() { return getStore().last_session; }
export function setLastSession(categoryId, questionId) {
  const s = getStore();
  s.last_session = { categoryId, questionId, timestamp: Date.now() };
  saveStore(s);
}

// ── Helpers ──
function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}
