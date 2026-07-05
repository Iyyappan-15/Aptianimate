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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProfile = async () => {
    if (user) {
      try {
        const prof = await getProfile(user.id);
        setProfile(prof);
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
      setLoading(false);
      setUser(null);
      return;
    }

    let mounted = true;

    const checkUserAndFetchProfile = async (sessionUser) => {
      if (!sessionUser) {
        if (mounted) {
          setProfile(null);
          setUser(null);
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
            setProfile(prof);
          }
        } catch (err) {
          console.error("Error fetching profile during auth init:", err);
        }
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
          if (mounted) setLoading(false);
          return;
        }
        // Returning Google user
        checkUserAndFetchProfile(session.user).then(() => {
          if (mounted) setLoading(false);
        });
      } else {
        // No session — guest mode, no auto sign-in
        if (mounted) setLoading(false);
      }
    });

    // 2. Listen to auth state changes (handles Google sign-in / sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`onAuthStateChange event: ${event}`);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          await checkUserAndFetchProfile(session.user);
          if (mounted) setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        // After sign out, go back to pure guest mode (no user, no profile)
        if (mounted) {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
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
    <AuthContext.Provider value={{ user, profile, loading, error, refreshProfile, signOut }}>
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
