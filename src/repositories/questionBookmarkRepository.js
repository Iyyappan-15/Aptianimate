// src/repositories/questionBookmarkRepository.js
import { supabase } from '../lib/supabase';

/**
 * Fetch all bookmarked questions for a user.
 */
export const getQuestionBookmarks = async (userId) => {
  if (!supabase) {
    console.warn('getQuestionBookmarks: Supabase not initialized.');
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('question_bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching question bookmarks:', error.message);
    return [];
  }
};

/**
 * Add a question bookmark for a user.
 */
export const addQuestionBookmark = async (userId, topicSlug, topicName, question) => {
  if (!supabase) {
    console.warn('addQuestionBookmark: Supabase not initialized.');
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('question_bookmarks')
      .insert([{
        user_id: userId,
        topic_slug: topicSlug,
        topic_name: topicName,
        question_text: question.question,
        question_data: question,
      }])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding question bookmark:', error.message);
    throw error;
  }
};

/**
 * Remove a question bookmark by its id.
 */
export const removeQuestionBookmark = async (bookmarkId) => {
  if (!supabase) {
    console.warn('removeQuestionBookmark: Supabase not initialized.');
    return;
  }
  try {
    const { error } = await supabase
      .from('question_bookmarks')
      .delete()
      .eq('id', bookmarkId);
    if (error) throw error;
  } catch (error) {
    console.error('Error removing question bookmark:', error.message);
    throw error;
  }
};

/**
 * Check if a specific question is already bookmarked by searching question_text.
 */
export const findQuestionBookmark = async (userId, questionText) => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('question_bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('question_text', questionText)
      .maybeSingle();
    if (error) throw error;
    return data; // returns { id } or null
  } catch (error) {
    console.error('Error finding question bookmark:', error.message);
    return null;
  }
};
