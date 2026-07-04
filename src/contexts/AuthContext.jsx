import React, { createContext, useContext, useEffect, useState } from 'react';
import { ensureAuthenticatedUser } from '../services/authService';

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        setLoading(true);
        // This silently ensures an anonymous session is active if a real one isn't
        const authenticatedUser = await ensureAuthenticatedUser();
        if (mounted) {
          setUser(authenticatedUser);
          setError(null);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        if (mounted) {
          setError(err.message || 'Failed to authenticate user');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Authentication Error</h2>
        <p>There was a problem signing you in anonymously.</p>
        <pre style={{ background: '#f87171', color: '#450a0a', padding: '10px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
          {error.toString()}
        </pre>
        <p>Please ensure Anonymous Sign-Ins are enabled in your Supabase Dashboard.</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
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
