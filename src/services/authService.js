import { supabase } from '../lib/supabase';

// SHA-256 hash a string using the browser's built-in Web Crypto API
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Load the Google Identity Services script dynamically
const loadGoogleScript = () => {
  return new Promise((resolve) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

// Analytics Logger
const logAuthEvent = (eventName, details = {}) => {
  console.log(`[Auth Analytics] ${eventName}`, details);
  // Future: Send to PostHog, Mixpanel, Vercel Analytics, etc.
};

// Helper: Open a centered popup window
const openCenteredPopup = (url, title, w, h) => {
  const y = window.top.outerHeight / 2 + window.top.screenY - ( h / 2);
  const x = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
  return window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
};

/**
 * Public function to handle Google Sign-In.
 * Implements the Popup -> One Tap fallback logic.
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
    throw new Error(err.message);
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
