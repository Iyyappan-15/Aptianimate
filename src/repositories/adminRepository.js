import { supabase } from '../lib/supabase';

/**
 * Fetch all user profiles for the admin dashboard.
 * Requires the user to have 'admin' or 'super_admin' role (enforced by RLS in future, or accessible if policy allows).
 */
export const getAllProfiles = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all profiles:', error.message);
    return [];
  }
};

/**
 * Fetch global system settings.
 */
export const getSystemSettings = async () => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching system settings:', error.message);
    return null;
  }
};

/**
 * Update global system settings. Requires admin role.
 */
export const updateSystemSettings = async (updates) => {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { data, error } = await supabase
      .from('system_settings')
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating system settings:', error.message);
    throw error;
  }
};

/**
 * Get basic dashboard stats (Total Users).
 */
export const getDashboardStats = async () => {
  if (!supabase) return { totalUsers: 0 };
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    return { totalUsers: count || 0 };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.message);
    return { totalUsers: 0 };
  }
};

/**
 * Delete a user profile (soft delete or direct removal from profiles table).
 * Real deletion from auth.users requires Edge Function, but removing profile restricts access.
 */
export const deleteUserProfile = async (userId) => {
  if (!supabase) throw new Error('Supabase client not initialized');
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting user profile:', error.message);
    throw error;
  }
};
