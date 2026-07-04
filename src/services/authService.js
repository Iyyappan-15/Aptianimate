import { supabase } from '../lib/supabase';

/**
 * Ensures the user has an active session.
 * If no session exists, it signs them in anonymously.
 * The session is automatically persisted in localStorage by the Supabase client.
 * 
 * @returns {Promise<Object>} The authenticated user object
 */
export const ensureAuthenticatedUser = async () => {
  if (!supabase) {
    console.warn("ensureAuthenticatedUser: Supabase is not initialized. Running in offline/mock mode.");
    return { id: "offline_user", email: "offline@example.com", is_anonymous: true };
  }
  try {
    console.log("ensureAuthenticatedUser: Checking existing session...");
    // 1. Check for an existing session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;

    // 2. If a session exists, return the user
    if (session?.user) {
      console.log("ensureAuthenticatedUser: Found existing session:", session.user.id);
      return session.user;
    }

    console.log("ensureAuthenticatedUser: No session found, signing in anonymously...");
    // 3. If no session exists, sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();
    
    if (signInError) {
      console.error("ensureAuthenticatedUser: sign in anonymously failed!", signInError);
      throw signInError;
    }
    
    console.log("ensureAuthenticatedUser: Anonymous sign in successful!", data.user?.id);
    return data.user;
  } catch (error) {
    console.error("Error during authentication:", error.message);
    throw error;
  }
};

/**
 * Placeholder for future Google Login upgrade.
 * This will link the anonymous account to a Google account without losing data.
 */
export const upgradeWithGoogle = async () => {
  try {
    // We will use linkIdentity() when implementing Google Login in the future
    // await supabase.auth.linkIdentity({ provider: 'google' });
    console.log("Google Login upgrade to be implemented.");
  } catch (error) {
    console.error("Error upgrading account:", error.message);
    throw error;
  }
};
