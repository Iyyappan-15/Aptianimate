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
  } catch {
    // Ignore storage quota errors
  }
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
    answered: {},   // questionId → { correct: bool, timestamp }
    daily_answers: {}, // 'YYYY-MM-DD' -> count
    streak_freezes: 0,
    daily_challenge: { lastDate: null, score: 0 }
  };
}

// ── Date Helpers (IST UTC+5:30) ──
export function getISTDate(date = new Date()) {
  return new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
}

export function getISTDateStr(date = new Date()) {
  return getISTDate(date).toISOString().split('T')[0];
}

export function getISTYesterdayStr(date = new Date()) {
  const d = getISTDate(date);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

// ── Goal ──
export function getGoal() { return getStore().goal; }
export function setGoal(goal) {
  const s = getStore(); s.goal = goal; saveStore(s);
}

// ── Progress / Stats ──
export function getStats() { return getStore().stats; }

export function getTodayAnswerCount() {
  const s = getStore();
  const today = getISTDateStr();
  return (s.daily_answers && s.daily_answers[today]) || 0;
}

export function getTodayProgress() {
  const s = getStore();
  const today = getISTDateStr();
  const count = (s.daily_answers && s.daily_answers[today]) || 0;
  const target = 5;
  return {
    count,
    target,
    percentage: Math.min(100, Math.round((count / target) * 100)),
    isComplete: count >= target,
    streak: s.streak || { lastDate: null, count: 0 },
    streakFreezes: s.streak_freezes || 0,
  };
}

export function recordAnswer(questionId, categoryId, isCorrect) {
  const s = getStore();
  if (!s.daily_answers) s.daily_answers = {};

  // Track today's attempt count for IST date
  const todayIST = getISTDateStr();
  s.daily_answers[todayIST] = (s.daily_answers[todayIST] || 0) + 1;

  // Avoid double-counting stats for the same question
  if (!s.answered[questionId]) {
    s.answered[questionId] = { correct: isCorrect, timestamp: Date.now() };
    s.stats.total_attempted += 1;
    if (isCorrect) s.stats.total_correct += 1;
    if (!s.stats.by_category[categoryId]) {
      s.stats.by_category[categoryId] = { attempted: 0, correct: 0 };
    }
    s.stats.by_category[categoryId].attempted += 1;
    if (isCorrect) s.stats.by_category[categoryId].correct += 1;
  }

  // Streak logic (handles both UTC and IST compatibility)
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

// ── Daily Challenge (Local for Guests) ──
export function getLocalDailyChallenge() {
  return getStore().daily_challenge || { lastDate: null, score: 0 };
}

export function completeLocalDailyChallenge(score) {
  const s = getStore();
  const today = getISTDateStr();
  s.daily_challenge = { lastDate: today, score };
  // Award 1 streak freeze up to max 2
  s.streak_freezes = Math.min(2, (s.streak_freezes || 0) + 1);
  // Credit 5 questions towards today's goal
  if (!s.daily_answers) s.daily_answers = {};
  s.daily_answers[today] = (s.daily_answers[today] || 0) + 5;
  saveStore(s);
  return s.streak_freezes;
}

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
