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
    console.warn("signInWithGoogle: Supabase is not initialized.");
    return;
  }

  logAuthEvent('Login Started');
  setLoadingState('Connecting...');

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error("Missing VITE_GOOGLE_CLIENT_ID");
    alert("Authentication configuration is missing.");
    setLoadingState(null);
    return;
  }

  // Ensure GIS is loaded (needed for One Tap fallback)
  await loadGoogleScript();

  // SHA-256 hash the nonce BEFORE sending it to Google.
  // Google embeds SHA256(rawNonce) in the token. Supabase receives rawNonce,
  // hashes it internally, and the two hashes will match correctly.

  const rawNonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const hashedNonce = await sha256(rawNonce);

  return new Promise((resolve, reject) => {
    
    // 1. ATTEMPT POPUP LOGIN FIRST
    const redirectUri = window.location.origin; // We will handle the callback on the homepage
    // rawNonce → passed to Supabase. hashedNonce → embedded in Google OAuth URL.
    
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=email%20profile&nonce=${hashedNonce}&prompt=select_account`;

    const popup = openCenteredPopup(oauthUrl, 'Google Login', 500, 600);

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // POPUP BLOCKED -> FALLBACK TO ONE TAP
      logAuthEvent('Popup Blocked');
      console.warn("Popup blocked, falling back to One Tap.");
      setLoadingState('Authenticating via One Tap...');
      
      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (response.credential) {
            logAuthEvent('One Tap Success');
            await handleTokenExchange(response.credential, rawNonce, setLoadingState, resolve, reject);
          } else {
            logAuthEvent('One Tap Failed');
            setLoadingState(null);
            reject(new Error("One Tap failed."));
          }
        },
        auto_select: false,
        cancel_on_tap_outside: false,
        nonce: rawNonce
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment() || notification.isDismissedMoment()) {
          logAuthEvent('One Tap Unavailable/Dismissed');
          setLoadingState(null);
          // Fails gracefully so the user can see the "Continue with Google" button again
          reject(new Error("Authentication popup was blocked and One Tap was dismissed. Please allow popups for this site."));
        } else {
          logAuthEvent('One Tap Shown');
        }
      });
      return;
    }

    // POPUP OPENED SUCCESSFULLY
    logAuthEvent('Popup Opened');
    setLoadingState('Authenticating...');

    // Listen for the postMessage from the popup
    const messageListener = async (event) => {
      // Security check: ensure message comes from our own domain
      if (event.origin !== window.location.origin) return;

      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        window.removeEventListener('message', messageListener);
        popup.close();
        
        logAuthEvent('Popup Success');
        await handleTokenExchange(event.data.id_token, rawNonce, setLoadingState, resolve, reject);
      }
      
      if (event.data && event.data.type === 'GOOGLE_AUTH_ERROR') {
        window.removeEventListener('message', messageListener);
        popup.close();
        logAuthEvent('Popup Failed', { error: event.data.error });
        setLoadingState(null);
        reject(new Error(event.data.error));
      }
    };

    window.addEventListener('message', messageListener);

    // Check if user closed the popup manually
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener('message', messageListener);
        logAuthEvent('Popup Closed by User');
        setLoadingState(null);
        // Don't throw a harsh error, just stop loading
        resolve(null);
      }
    }, 500);
  });
};

/**
 * Exchanges the Google ID Token with Supabase
 */
const handleTokenExchange = async (idToken, nonce, setLoadingState, resolve, reject) => {
  try {
    setLoadingState('Creating Session...');
    logAuthEvent('Token Exchange Started');

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
      nonce: nonce
    });

    if (error) throw error;

    logAuthEvent('Login Success', { userId: data.user.id });
    setLoadingState(null);
    resolve(data.user);
  } catch (err) {
    console.error("Token Exchange Failed:", err);
    logAuthEvent('Token Exchange Failed', { error: err.message });
    setLoadingState(null);
    reject(new Error(`Supabase Error: ${err.message}`));
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
