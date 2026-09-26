// src/utils/dailyChallengeEngine.js
// ─── Daily Challenge Generator ───────────────────────────────────────────────
// Uses the IST date as a deterministic seed so all students get the SAME
// balanced 5-question challenge each day (Wordle-style)!

import { ALL_QUESTIONS } from '../data/aiBank';
import { getISTDateStr } from './localStorage';

// Fast seeded PRNG (Mulberry32)
function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Returns integer seed from IST date string (e.g., '2026-09-26' -> 20260926)
 */
export function getDailySeed(dateStr = getISTDateStr()) {
  return parseInt(dateStr.replace(/-/g, ''), 10) || 20260926;
}

/**
 * Get the 5 questions for today's daily challenge.
 * Mix: 1 Quant, 1 Logical, 1 Verbal, 1 Tech/GK, 1 Wildcard
 */
export function getDailyChallengeQuestions(dateStr = getISTDateStr()) {
  const seed = getDailySeed(dateStr);
  const prng = mulberry32(seed);

  const quant = ALL_QUESTIONS.filter(q => q.category === 'Quantitative Aptitude');
  const logical = ALL_QUESTIONS.filter(q => q.category === 'Logical Reasoning');
  const verbal = ALL_QUESTIONS.filter(q => q.category === 'Verbal Ability');
  const technical = ALL_QUESTIONS.filter(q => q.category === 'Technical');

  const pick = (arr) => {
    if (!arr || arr.length === 0) return ALL_QUESTIONS[Math.floor(prng() * ALL_QUESTIONS.length)];
    const idx = Math.floor(prng() * arr.length);
    return arr[idx];
  };

  const q1 = pick(quant);
  const q2 = pick(logical);
  const q3 = pick(verbal);
  const q4 = pick(technical.length ? technical : quant);

  // Wildcard from entire remaining pool
  const chosenIds = new Set([q1?.id, q2?.id, q3?.id, q4?.id].filter(Boolean));
  const remaining = ALL_QUESTIONS.filter(q => !chosenIds.has(q.id));
  const q5 = pick(remaining.length ? remaining : ALL_QUESTIONS);

  return [q1, q2, q3, q4, q5].filter(Boolean);
}

/**
 * Returns time left until next midnight IST in hours & minutes string.
 */
export function getTimeUntilNextDailyReset() {
  const now = new Date();
  // IST is UTC + 5h 30m
  const nowIST = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  
  // Next midnight IST
  const nextMidnightIST = new Date(nowIST);
  nextMidnightIST.setUTCDate(nextMidnightIST.getUTCDate() + 1);
  nextMidnightIST.setUTCHours(0, 0, 0, 0);

  const diffMs = nextMidnightIST.getTime() - nowIST.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours}h ${diffMinutes}m`;
}
