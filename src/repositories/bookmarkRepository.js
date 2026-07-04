import { supabase } from '../lib/supabase';

/**
 * Retrieves all bookmarks for a specific user.
 * 
 * @param {string} userId - The Supabase user ID
 * @returns {Promise<Array>} Array of bookmark objects
 */
export const getBookmarks = async (userId) => {
  if (!supabase) {
    console.warn("getBookmarks: Supabase not initialized. Returning empty bookmarks.");
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error retrieving bookmarks:", error.message);
    throw error;
  }
};

/**
 * Adds a new topic bookmark for a user.
 * 
 * @param {string} userId - The Supabase user ID
 * @param {string} topicName - The name or ID of the topic to bookmark
 * @returns {Promise<Object>} The inserted bookmark object
 */
export const addBookmark = async (userId, topicName) => {
  if (!supabase) {
    console.warn("addBookmark: Supabase not initialized. Skipping DB insert.");
    return { topic_name: topicName };
  }
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .insert([
        { 
          user_id: userId, 
          topic_name: topicName 
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding bookmark:", error.message);
    throw error;
  }
};

/**
 * Removes a specific topic bookmark for a user.
 * 
 * @param {string} userId - The Supabase user ID
 * @param {string} topicName - The name or ID of the topic to remove
 * @returns {Promise<void>}
 */
export const removeBookmark = async (userId, topicName) => {
  if (!supabase) {
    console.warn("removeBookmark: Supabase not initialized. Skipping DB delete.");
    return;
  }
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .match({ user_id: userId, topic_name: topicName });

    if (error) throw error;
  } catch (error) {
    console.error("Error removing bookmark:", error.message);
    throw error;
  }
};
