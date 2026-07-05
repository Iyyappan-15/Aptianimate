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
