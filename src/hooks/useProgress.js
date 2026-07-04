import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as progressRepo from '../repositories/progressRepository';

export const useProgress = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await progressRepo.getAllProgress(user.id);
      setProgressData(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateProgress = async (topicName, completionPercentage, completedStatus) => {
    if (!user?.id) return;
    try {
      const updated = await progressRepo.updateProgress(user.id, topicName, completionPercentage, completedStatus);
      
      // Update local state to immediately reflect the change in UI
      setProgressData((prev) => {
        const index = prev.findIndex(p => p.topic_name === topicName);
        if (index > -1) {
          const newArray = [...prev];
          newArray[index] = updated;
          return newArray;
        }
        return [...prev, updated];
      });
      
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update progress');
      throw err;
    }
  };

  return {
    progressData,
    loading,
    error,
    updateProgress,
    refreshProgress: fetchProgress
  };
};
