import React, { createContext, useContext, useEffect, useState } from 'react';
import { ensureAuthenticatedUser } from '../services/authService';
import { getProfile } from '../repositories/profileRepository';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  error: null,
  refreshProfile: async () => {},
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
    if (!supabase) {
      setLoading(false);
      setUser({ id: "offline_user", email: "offline@example.com", is_anonymous: true });
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
      try {
        const prof = await getProfile(sessionUser.id);
        if (mounted) {
          setProfile(prof);
        }
      } catch (err) {
        console.error("Error fetching profile during auth init:", err);
      }
    };

    // 1. Initial check
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
        checkUserAndFetchProfile(session.user).then(() => {
          if (mounted) setLoading(false);
        });
      } else {
        // No session found, trigger anonymous login
        ensureAuthenticatedUser()
          .then((anonUser) => {
            if (mounted) {
              setUser(anonUser);
              setError(null);
            }
          })
          .catch((err) => {
            if (mounted) {
              setError(err.message || 'Failed to authenticate user');
            }
          })
          .finally(() => {
            if (mounted) setLoading(false);
          });
      }
    });

    // 2. Listen to state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`onAuthStateChange event: ${event}`);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          await checkUserAndFetchProfile(session.user);
          if (mounted) setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setUser(null);
          setProfile(null);
          setLoading(true);
        }
        try {
          const anonUser = await ensureAuthenticatedUser();
          if (mounted) {
            setUser(anonUser);
          }
        } catch (err) {
          console.error("Error signing in anonymously after sign out:", err);
        } finally {
          if (mounted) setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, profile, loading, error, refreshProfile }}>
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
