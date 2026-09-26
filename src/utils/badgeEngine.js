// src/utils/badgeEngine.js
// ─── Streak Milestones & Badge Engine ──────────────────────────────────────

export const STREAK_MILESTONES = [
  {
    id: 'streak_3',
    days: 3,
    name: 'Just Starting',
    icon: '🌱',
    description: 'Practiced 3 days in a row',
    color: '#10b981',
  },
  {
    id: 'streak_7',
    days: 7,
    name: 'Week Warrior',
    icon: '⚡',
    description: 'Practiced 7 days in a row',
    color: '#ef4444',
    border: 'silver',
  },
  {
    id: 'streak_14',
    days: 14,
    name: 'Fortnight Fighter',
    icon: '💪',
    description: '14 consecutive days of practice',
    color: '#f59e0b',
  },
  {
    id: 'streak_30',
    days: 30,
    name: 'Month Master',
    icon: '🔥',
    description: '30 consecutive days of practice',
    color: '#7c3aed',
    border: 'gold',
  },
  {
    id: 'streak_60',
    days: 60,
    name: 'Consistent Scholar',
    icon: '🎯',
    description: '60 consecutive days of practice',
    color: '#06b6d4',
  },
  {
    id: 'streak_100',
    days: 100,
    name: 'Century Champion',
    icon: '💎',
    description: '100 days streak! Legendary Blue Flame unlocked',
    color: '#2563eb',
    isLegendary: true,
  },
  {
    id: 'streak_365',
    days: 365,
    name: 'Year Legend',
    icon: '👑',
    description: '1 full year of non-stop daily practice',
    color: '#ec4899',
    isLegendary: true,
  },
];

/**
 * Returns the flame tier styling based on streak days.
 */
export function getFlameTier(days = 0) {
  const d = Number(days) || 0;
  if (d <= 0) {
    return {
      color: '#9ca3af',
      label: 'Start streak',
      tier: 'inactive',
      glow: 'none',
      icon: '🔥',
    };
  }
  if (d < 7) {
    return {
      color: '#f97316',
      label: 'Spark',
      tier: 'orange',
      glow: '0 0 10px rgba(249, 115, 22, 0.4)',
      icon: '🔥',
    };
  }
  if (d < 30) {
    return {
      color: '#ef4444',
      label: 'Blaze',
      tier: 'red',
      glow: '0 0 12px rgba(239, 68, 68, 0.5)',
      icon: '🔥',
    };
  }
  if (d < 100) {
    return {
      color: '#7c3aed',
      label: 'Inferno',
      tier: 'purple',
      glow: '0 0 14px rgba(124, 58, 237, 0.6)',
      icon: '🔥',
    };
  }
  return {
    color: '#2563eb',
    label: 'Legendary',
    tier: 'blue',
    glow: '0 0 16px rgba(37, 99, 235, 0.7)',
    icon: '🔥',
  };
}

/**
 * Evaluates current streak against user's existing badges.
 * Returns array of newly unlocked badges (empty if none).
 */
export function checkNewBadges(currentStreak = 0, existingBadges = []) {
  const existingIds = new Set((existingBadges || []).map(b => b.id));
  const newlyUnlocked = [];

  for (const m of STREAK_MILESTONES) {
    if (currentStreak >= m.days && !existingIds.has(m.id)) {
      newlyUnlocked.push({
        id: m.id,
        name: m.name,
        icon: m.icon,
        days: m.days,
        description: m.description,
        earned_at: new Date().toISOString().slice(0, 10),
      });
    }
  }

  return newlyUnlocked;
}
