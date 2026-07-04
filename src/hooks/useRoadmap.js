import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as roadmapRepo from '../repositories/roadmapRepository';

export const useRoadmap = () => {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoadmap = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await roadmapRepo.getRoadmapProgress(user.id);
      setRoadmap(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch roadmap');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  const updateRoadmap = async (currentPhase, unlockedPhases, completedTopics, totalTopics) => {
    if (!user?.id) return;
    try {
      const updated = await roadmapRepo.updateRoadmapProgress(
        user.id, 
        currentPhase, 
        unlockedPhases, 
        completedTopics, 
        totalTopics
      );
      setRoadmap(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update roadmap');
      throw err;
    }
  };

  return {
    roadmap,
    loading,
    error,
    updateRoadmap,
    refreshRoadmap: fetchRoadmap
  };
};
