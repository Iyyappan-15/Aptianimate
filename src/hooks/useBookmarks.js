import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as bookmarkRepo from '../repositories/bookmarkRepository';

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookmarks = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await bookmarkRepo.getBookmarks(user.id);
      setBookmarks(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const addBookmark = async (topicName) => {
    if (!user?.id) return;
    try {
      const newBookmark = await bookmarkRepo.addBookmark(user.id, topicName);
      setBookmarks((prev) => [...prev, newBookmark]);
      return newBookmark;
    } catch (err) {
      setError(err.message || 'Failed to add bookmark');
      throw err;
    }
  };

  const removeBookmark = async (topicName) => {
    if (!user?.id) return;
    try {
      await bookmarkRepo.removeBookmark(user.id, topicName);
      setBookmarks((prev) => prev.filter(b => b.topic_name !== topicName));
    } catch (err) {
      setError(err.message || 'Failed to remove bookmark');
      throw err;
    }
  };

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    refreshBookmarks: fetchBookmarks
  };
};
