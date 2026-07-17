import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProfile } from '../repositories/profileRepository';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  error: null,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(() => {
    try {
      const cached = localStorage.getItem('apti_profile');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const updateProfileState = (prof) => {
    setProfile(prof);
    if (prof) {
      localStorage.setItem('apti_profile', JSON.stringify(prof));
    } else {
      localStorage.removeItem('apti_profile');
    }
  };
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProfile = async () => {
    if (user) {
      try {
        const prof = await getProfile(user.id);
        updateProfileState(prof);
        return prof;
      } catch (err) {
        console.error("Error refreshing profile:", err);
      }
    }
    return null;
  };

  useEffect(() => {
    // Offline / no Supabase config mode
    if (!supabase) {
      console.log("[AuthContext] No supabase, setting loading false");
      setLoading(false);
      setUser(null);
      return;
    }

    let mounted = true;
    console.log("[AuthContext] useEffect mounted, starting init");

    // SAFETY TIMEOUT: Force loading to false after 5 seconds just in case
    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        console.warn("[AuthContext] SAFETY TIMEOUT REACHED! Forcing loading to false.");
        setLoading(false);
      }
    }, 5000);

    const checkUserAndFetchProfile = async (sessionUser) => {
      if (!sessionUser) {
        if (mounted) {
          updateProfileState(null);
          setUser(null);
          setProfileLoading(false);
        }
        return;
      }
      if (mounted) {
        setUser(sessionUser);
      }
      // Only fetch profile for real (non-anonymous) users
      if (!sessionUser.is_anonymous) {
        try {
          const prof = await getProfile(sessionUser.id);
          if (mounted) {
            updateProfileState(prof);
          }
        } catch (err) {
          console.error("Error fetching profile during auth init:", err);
        } finally {
          if (mounted) setProfileLoading(false);
        }
      } else {
        if (mounted) setProfileLoading(false);
      }
    };

    // 1. Check if there is an existing session (e.g. a returning Google user)
    supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
      if (sessionError) {
        console.error("getSession error:", sessionError);
        if (mounted) {
          setError(sessionError.message);
          setLoading(false);
        }
        return;
      }

      if (session?.user) {
        if (session.user.is_anonymous) {
          // We no longer use anonymous sessions. Clear legacy sessions automatically.
          supabase.auth.signOut();
          if (mounted) { setLoading(false); setProfileLoading(false); }
          return;
        }
        // Returning Google user
        checkUserAndFetchProfile(session.user).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        // No session — guest mode, no auto sign-in
        if (mounted) { setLoading(false); setProfileLoading(false); }
      }
    }).catch(err => {
      console.error("Unhandled error in getSession:", err);
      if (mounted) setLoading(false);
    });

    // 2. Listen to auth state changes (handles Google sign-in / sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`onAuthStateChange event: ${event}`);
      if (event === 'INITIAL_SESSION') {
         // getSession handles this, but just in case:
         if (!session) {
            if (mounted) { setLoading(false); setProfileLoading(false); }
         }
      } else if (event === 'SIGNED_IN') {
        // Only fetch profile on a real SIGN_IN, not on token refreshes.
        if (session?.user) {
          try {
            await checkUserAndFetchProfile(session.user);
          } catch (err) {
            console.error("Error in onAuthStateChange:", err);
          } finally {
            if (mounted) setLoading(false);
          }
        }
      } else if (event === 'TOKEN_REFRESHED') {
        // Token was silently refreshed — user & profile haven't changed, do NOT re-fetch.
        // Just ensure loading states are cleared.
        if (mounted) { setLoading(false); setProfileLoading(false); }
      } else if (event === 'SIGNED_OUT') {
        // After sign out, go back to pure guest mode (no user, no profile)
        if (mounted) {
          setUser(null);
          updateProfileState(null);
          setLoading(false);
          setProfileLoading(false);
        }
      }
    });

    return () => {
      console.log("[AuthContext] useEffect cleanup, setting mounted = false");
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription?.unsubscribe();
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Authentication Error</h2>
        <p>There was a problem signing you in.</p>
        <pre style={{ background: '#f87171', color: '#450a0a', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
          {error.toString()}
        </pre>
        <p>Please check your internet connection or Supabase settings.</p>
      </div>
    );
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, profileLoading, error, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
