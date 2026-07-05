// src/hooks/useAnalytics.js
// Custom hooks — UI consumes these. Never call repository directly from components.

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as analyticsRepo from '../repositories/analyticsRepository';

// ─── Weekly Progress ────────────────────────────────────────────────────────
export const useWeeklyProgress = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const result = await analyticsRepo.getWeeklyProgress(user.id, 12);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load weekly progress');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, loading, error, refresh: fetch };
};

// ─── Heatmap ────────────────────────────────────────────────────────────────
export const useHeatmap = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const result = await analyticsRepo.getHeatmapData(user.id);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load heatmap');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, loading, error, refresh: fetch };
};

// ─── Statistics ──────────────────────────────────────────────────────────────
export const useStatistics = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const result = await analyticsRepo.getStatistics(user.id);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetch(); }, [fetch]);
  return { data, loading, error, refresh: fetch };
};

// ─── Streak ───────────────────────────────────────────────────────────────────
export const useStreak = () => {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const [cur, lng] = await Promise.all([
        analyticsRepo.getCurrentStreak(user.id),
        analyticsRepo.getLongestStreak(user.id),
      ]);
      setCurrentStreak(cur);
      setLongestStreak(lng);
    } catch (err) {
      console.error('useStreak:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { fetch(); }, [fetch]);
  return { currentStreak, longestStreak, loading, refresh: fetch };
};
