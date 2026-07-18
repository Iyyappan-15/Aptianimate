// src/repositories/analyticsRepository.js
// UI → Hooks → Repository → Supabase (never query Supabase directly in components)

import { supabase } from '../lib/supabase';

const guard = (name) => {
  if (!supabase) { console.warn(`${name}: Supabase not initialised`); return true; }
  return false;
};

// ─────────────────────────────────────────────
// Write helpers (called from existing practice flow)
// ─────────────────────────────────────────────

/**
 * Record a single practice attempt and update the daily_activity rollup.
 */
export const recordSession = async (userId, { questionId, topic, solved, timeSeconds }) => {
  if (guard('recordSession')) return null;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // 1. Insert raw session
  const { error: se } = await supabase.from('practice_sessions').insert({
    user_id: userId,
    question_id: questionId,
    topic: topic || null,
    solved: !!solved,
    time_seconds: timeSeconds || 0,
    session_date: today,
  });
  if (se) { console.error('recordSession insert:', se.message); return null; }

  // 2. Upsert daily_activity rollup
  const { data: existing } = await supabase
    .from('daily_activity')
    .select('*')
    .eq('user_id', userId)
    .eq('activity_date', today)
    .maybeSingle();

  const minutes = Math.round((timeSeconds || 0) / 60);
  const topicsSet = new Set(existing?.topics_studied || []);
  if (topic) topicsSet.add(topic);

  await supabase.from('daily_activity').upsert({
    user_id: userId,
    activity_date: today,
    problems_solved: (existing?.problems_solved || 0) + (solved ? 1 : 0),
    minutes_practiced: (existing?.minutes_practiced || 0) + minutes,
    topics_studied: [...topicsSet],
    sessions_count: (existing?.sessions_count || 0) + 1,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,activity_date' });

  return true;
};

/**
 * Record multiple practice attempts at once and update daily_activity.
 * This prevents slowing down Supabase with too many requests.
 */
export const recordBulkSessions = async (userId, topic, totalTimeSeconds, results) => {
  if (guard('recordBulkSessions')) return null;
  if (!results || results.length === 0) return true;

  const today = new Date().toISOString().slice(0, 10);

  // 1. Bulk insert raw sessions
  const sessionsToInsert = results.map(r => ({
    user_id: userId,
    question_id: r.questionId || 'unknown',
    topic: topic || null,
    solved: !!r.solved,
    time_seconds: 0, // Individual times not tracked in this flow
    session_date: today,
  }));

  const { error: se } = await supabase.from('practice_sessions').insert(sessionsToInsert);
  if (se) { console.error('recordBulkSessions insert:', se.message); return null; }

  // 2. Upsert daily_activity rollup
  const { data: existing } = await supabase
    .from('daily_activity')
    .select('*')
    .eq('user_id', userId)
    .eq('activity_date', today)
    .maybeSingle();

  const minutes = Math.max(1, Math.round((totalTimeSeconds || 0) / 60)); // at least 1 minute if they practiced
  const solvedCount = results.filter(r => r.solved).length;
  const topicsSet = new Set(existing?.topics_studied || []);
  if (topic) topicsSet.add(topic);

  await supabase.from('daily_activity').upsert({
    user_id: userId,
    activity_date: today,
    problems_solved: (existing?.problems_solved || 0) + solvedCount,
    minutes_practiced: (existing?.minutes_practiced || 0) + minutes,
    topics_studied: [...topicsSet],
    sessions_count: (existing?.sessions_count || 0) + 1, // Count as 1 session block
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,activity_date' });

  return true;
};

// ─────────────────────────────────────────────
// Read helpers
// ─────────────────────────────────────────────

/**
 * Weekly progress for the last N weeks.
 * Returns [{week, weekLabel, problemsSolved, minutesPracticed}]
 */
export const getWeeklyProgress = async (userId, weeks = 12) => {
  if (guard('getWeeklyProgress')) return [];

  const since = new Date();
  since.setDate(since.getDate() - weeks * 7);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('daily_activity')
    .select('activity_date, problems_solved, minutes_practiced')
    .eq('user_id', userId)
    .gte('activity_date', sinceStr)
    .order('activity_date', { ascending: true });

  if (error) { console.error('getWeeklyProgress:', error.message); return []; }

  // Bucket by ISO week
  const map = new Map();
  (data || []).forEach((row) => {
    const d = new Date(row.activity_date);
    // ISO week number
    const jan4 = new Date(d.getFullYear(), 0, 4);
    const weekNum = Math.ceil(((d - jan4) / 86400000 + jan4.getDay() + 1) / 7);
    const key = `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
    const existing = map.get(key) || { week: key, weekLabel: `W${weekNum}`, problemsSolved: 0, minutesPracticed: 0 };
    existing.problemsSolved += row.problems_solved;
    existing.minutesPracticed += row.minutes_practiced;
    map.set(key, existing);
  });

  // Fill missing weeks with zeros
  const result = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * 7);
    const jan4 = new Date(d.getFullYear(), 0, 4);
    const weekNum = Math.ceil(((d - jan4) / 86400000 + jan4.getDay() + 1) / 7);
    const key = `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
    result.push(map.get(key) || { week: key, weekLabel: `W${weekNum}`, problemsSolved: 0, minutesPracticed: 0 });
  }
  return result;
};

/**
 * Raw daily_activity for the last 365 days (for heatmap).
 */
export const getHeatmapData = async (userId) => {
  if (guard('getHeatmapData')) return [];

  const since = new Date();
  since.setDate(since.getDate() - 364);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('daily_activity')
    .select('activity_date, problems_solved, minutes_practiced, topics_studied, sessions_count')
    .eq('user_id', userId)
    .gte('activity_date', sinceStr);

  if (error) { console.error('getHeatmapData:', error.message); return []; }
  return data || [];
};

/**
 * Aggregate statistics for the profile dashboard.
 */
export const getStatistics = async (userId) => {
  if (guard('getStatistics')) return null;

  const { data: sessions, error: se } = await supabase
    .from('practice_sessions')
    .select('solved, time_seconds, session_date, topic')
    .eq('user_id', userId);

  if (se) { console.error('getStatistics sessions:', se.message); return null; }

  const { data: activity, error: ae } = await supabase
    .from('daily_activity')
    .select('activity_date, problems_solved, minutes_practiced, topics_studied, sessions_count')
    .eq('user_id', userId)
    .order('activity_date', { ascending: true });

  if (ae) { console.error('getStatistics activity:', ae.message); return null; }

  const rows = sessions || [];
  const days = activity || [];

  const totalSolved = rows.filter(r => r.solved).length;
  const totalMinutes = days.reduce((a, d) => a + d.minutes_practiced, 0);
  const activeDays = days.filter(d => d.problems_solved > 0 || d.minutes_practiced > 0).length;
  const totalSessions = days.reduce((a, d) => a + d.sessions_count, 0);

  // Unique topics
  const allTopics = new Set();
  days.forEach(d => (d.topics_studied || []).forEach(t => allTopics.add(t)));

  // Solve times (for solved sessions only, ignore 0s)
  const solveTimes = rows.filter(r => r.solved && r.time_seconds > 0).map(r => r.time_seconds);
  const avgSolveTime = solveTimes.length ? Math.round(solveTimes.reduce((a, b) => a + b, 0) / solveTimes.length) : 0;
  const fastestSolve = solveTimes.length ? Math.min(...solveTimes) : 0;

  // Avg problems/day (over active days)
  const avgProblemsPerDay = activeDays > 0 ? +(totalSolved / activeDays).toFixed(1) : 0;

  const totalTimeSeconds = rows.reduce((a, r) => a + (r.time_seconds || 0), 0);

  return {
    totalSolved,
    totalMinutes,
    totalTimeSeconds,
    activeDays,
    totalSessions,
    topicsCompleted: allTopics.size,
    avgSolveTime,
    fastestSolve,
    avgProblemsPerDay,
  };
};

/**
 * Current streak (consecutive days with activity up to today).
 */
export const getCurrentStreak = async (userId) => {
  if (guard('getCurrentStreak')) return 0;

  const { data, error } = await supabase
    .from('daily_activity')
    .select('activity_date, problems_solved, minutes_practiced')
    .eq('user_id', userId)
    .order('activity_date', { ascending: false });

  if (error || !data?.length) return 0;

  const activeDates = new Set(
    data.filter(d => d.problems_solved > 0 || d.minutes_practiced > 0).map(d => d.activity_date)
  );

  let streak = 0;
  const today = new Date();
  for (let i = 0; i <= 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (activeDates.has(key)) {
      streak++;
    } else if (i > 0) {
      break; // gap found
    }
  }
  return streak;
};

/**
 * Longest ever streak.
 */
export const getLongestStreak = async (userId) => {
  if (guard('getLongestStreak')) return 0;

  const { data, error } = await supabase
    .from('daily_activity')
    .select('activity_date, problems_solved, minutes_practiced')
    .eq('user_id', userId)
    .order('activity_date', { ascending: true });

  if (error || !data?.length) return 0;

  const activeDates = data
    .filter(d => d.problems_solved > 0 || d.minutes_practiced > 0)
    .map(d => d.activity_date)
    .sort();

  if (!activeDates.length) return 0;

  let longest = 1;
  let current = 1;
  for (let i = 1; i < activeDates.length; i++) {
    const prev = new Date(activeDates[i - 1]);
    const curr = new Date(activeDates[i]);
    const diff = (curr - prev) / 86400000;
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }
  return longest;
};

/**
 * Delete all analytics data for a user (used in Reset Progress).
 */
export const deleteAllAnalytics = async (userId) => {
  if (guard('deleteAllAnalytics')) return;
  await supabase.from('practice_sessions').delete().eq('user_id', userId);
  await supabase.from('daily_activity').delete().eq('user_id', userId);
};
