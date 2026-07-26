import { supabase } from '../lib/supabase';

// Analytics Logger
const logAuthEvent = (eventName, details = {}) => {
  console.log(`[Auth Analytics] ${eventName}`, details);
  // Future: Send to PostHog, Mixpanel, Vercel Analytics, etc.
};

/**
 * Public function to handle Google Sign-In.
 * Implements the standard Supabase OAuth redirect logic.
 */
export const signInWithGoogle = async (setLoadingState = () => {}) => {
  if (!supabase) {
    console.error("signInWithGoogle: Supabase is not initialized.");
    alert("Supabase connection is not configured. Please check your .env file or connect to Supabase.");
    return;
  }

  logAuthEvent('Login Started');
  setLoadingState('Connecting to Google...');

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname,
        queryParams: {
          prompt: 'select_account',
        }
      }
    });

    if (error) {
      throw error;
    }
    
    // The page will redirect to Google. We don't need to resolve anything here.
  } catch (err) {
    console.error("Google Sign In Failed:", err);
    logAuthEvent('Login Failed', { error: err.message });
    setLoadingState(null);
    throw err;
  }
};

/**
 * Ensures the user has an active session.
 * Existing users remain logged in automatically.
 */
export const ensureAuthenticatedUser = async () => {
  if (!supabase) return { id: "offline", is_anonymous: true };
  
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;

    if (session?.user) {
      return session.user;
    }

    // If no session exists, sign in anonymously
    const { data, error: signInError } = await supabase.auth.signInAnonymously();
    if (signInError) throw signInError;
    
    return data.user;
  } catch (error) {
    console.error("Error during authentication:", error.message);
    throw error;
  }
};

export const signOut = async () => {
  if (!supabase) return;
  await supabase.auth.signOut();
  localStorage.removeItem("supabase.auth.token");
};
