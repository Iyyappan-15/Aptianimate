import { supabase } from '../lib/supabase';

/**
 * Retrieves all learning progress for a specific user.
 * 
 * @param {string} userId - The Supabase user ID
 * @returns {Promise<Array>} Array of progress objects
 */
export const getAllProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('topic_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error retrieving progress:", error.message);
    throw error;
  }
};

/**
 * Upserts (updates or inserts) progress for a specific topic.
 * 
 * @param {string} userId - The Supabase user ID
 * @param {string} topicName - The name of the topic
 * @param {number} completionPercentage - How much of the topic is completed (0-100)
 * @param {boolean} completedStatus - Whether the topic is fully completed
 * @returns {Promise<Object>} The updated progress object
 */
export const updateProgress = async (userId, topicName, completionPercentage, completedStatus) => {
  try {
    const { data, error } = await supabase
      .from('topic_progress')
      .upsert(
        { 
          user_id: userId, 
          topic_name: topicName,
          completion_percentage: completionPercentage,
          completed_status: completedStatus,
          last_viewed: new Date().toISOString()
        },
        { onConflict: 'user_id, topic_name' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating progress:", error.message);
    throw error;
  }
};
