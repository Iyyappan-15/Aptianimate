import { supabase } from '../lib/supabase';

/**
 * Fetch a profile by User ID.
 * @param {string} userId 
 * @returns {Promise<Object|null>}
 */
export const getProfile = async (userId) => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
};

/**
 * Check if a username is available.
 * @param {string} username 
 * @returns {Promise<boolean>} True if available, false otherwise
 */
export const isUsernameAvailable = async (username) => {
  if (!supabase) return true;
  try {
    const cleanUsername = username.trim().toLowerCase();
    
    // Check against a list of reserved words
    const reserved = ['admin', 'moderator', 'system', 'superuser', 'null', 'undefined', 'anonymous', 'guest'];
    if (reserved.includes(cleanUsername)) return false;

    // Check database
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', cleanUsername)
      .maybeSingle();

    if (error) throw error;
    return !data; // Available if no profile found
  } catch (error) {
    console.error('Error checking username availability:', error.message);
    return false;
  }
};

/**
 * Create a new user profile.
 * @param {string} userId 
 * @param {string} username 
 * @param {string} fullName 
 * @param {string} avatarUrl 
 * @returns {Promise<Object>}
 */
export const createProfile = async (userId, username, fullName = '', avatarUrl = '') => {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const cleanUsername = username.trim().toLowerCase();
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          username: cleanUsername,
          full_name: fullName,
          avatar_url: avatarUrl,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating profile:', error.message);
    throw error;
  }
};

/**
 * Update an existing profile.
 * @param {string} userId 
 * @param {Object} updates 
 * @returns {Promise<Object>}
 */
export const updateProfile = async (userId, updates) => {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
};
