import { supabase } from '../lib/supabase';

/**
 * Retrieves the roadmap progress for a specific user.
 * 
 * @param {string} userId - The Supabase user ID
 * @returns {Promise<Object|null>} The roadmap progress object or null if none exists
 */
export const getRoadmapProgress = async (userId) => {
  if (!supabase) {
    console.warn("getRoadmapProgress: Supabase not initialized. Returning null.");
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('roadmap_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // maybeSingle because a new user might not have a record yet

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error retrieving roadmap progress:", error.message);
    throw error;
  }
};

/**
 * Upserts (updates or inserts) roadmap progress for a user.
 * 
 * @param {string} userId - The Supabase user ID
 * @param {string} currentPhase - The phase the user is currently studying
 * @param {Array<string>} unlockedPhases - Array or string of unlocked phases
 * @param {number} completedTopics - Total number of completed topics
 * @param {number} totalTopics - Total number of topics in the roadmap
 * @returns {Promise<Object>} The updated roadmap object
 */
export const updateRoadmapProgress = async (userId, currentPhase, unlockedPhases, completedTopics, totalTopics) => {
  if (!supabase) {
    console.warn("updateRoadmapProgress: Supabase not initialized. Skipping DB update.");
    return { current_phase: currentPhase, unlocked_phase: unlockedPhases, completed_topics: completedTopics, total_topics: totalTopics };
  }
  try {
    const { data, error } = await supabase
      .from('roadmap_progress')
      .upsert(
        { 
          user_id: userId,
          current_phase: currentPhase,
          unlocked_phase: unlockedPhases,
          completed_topics: completedTopics,
          total_topics: totalTopics,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id' } // Assuming one roadmap record per user
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating roadmap progress:", error.message);
    throw error;
  }
};
