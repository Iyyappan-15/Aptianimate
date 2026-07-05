import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUsernameAvailable, createProfile } from '../repositories/profileRepository';

export default function UsernameModal() {
  const { user, profile, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState(null); // 'available', 'taken', 'invalid', or null
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Set default full name from Google metadata if available
  useEffect(() => {
    if (user && user.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name);
    }
  }, [user]);

  // Debounce username check
  useEffect(() => {
    if (!username) {
      setStatus(null);
      return;
    }

    const cleanUsername = username.trim().toLowerCase();
    
    // Simple regex: letters, numbers, underscores, 3-20 chars
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      setStatus('invalid');
      return;
    }

    setChecking(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const available = await isUsernameAvailable(cleanUsername);
        setStatus(available ? 'available' : 'taken');
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [username]);

  // Only show for real (Google-authenticated) users who don't have a profile yet
  if (!user || user.is_anonymous || profile) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'available' || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const avatarUrl = user.user_metadata?.avatar_url || '';
      await createProfile(user.id, username, fullName, avatarUrl);
      await refreshProfile(); // Refresh AuthContext state to close modal
    } catch (err) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      animation: 'fadeIn 0.3s ease',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '36px',
        maxWidth: '460px',
        width: '100%',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '8px' }}>
          Welcome to AptiAnimate!
        </h2>
        <p style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '24px' }}>
          Please choose a unique username to personalize your journey and identify yourself to friends.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--surface2)',
                color: 'var(--text-main)',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--violet)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Username */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Choose Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. johndoe123"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                maxLength={20}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--surface2)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  paddingRight: '40px'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--violet)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                {checking && <div style={{ border: '2px solid rgba(0,0,0,0.1)', borderTop: '2px solid var(--violet)', borderRadius: '50%', width: '16px', height: '16px', animation: 'spin 0.8s linear infinite' }} />}
              </div>
            </div>

            {/* Status Helper */}
            {username && !checking && (
              <div style={{ marginTop: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                {status === 'available' && <span style={{ color: 'var(--teal)' }}>✓ Username is available!</span>}
                {status === 'taken' && <span style={{ color: 'var(--coral)' }}>✗ Username is already taken.</span>}
                {status === 'invalid' && <span style={{ color: 'var(--coral)' }}>⚠ 3-20 characters: letters, numbers, underscores only.</span>}
              </div>
            )}
          </div>

          {error && (
            <div style={{ color: 'var(--coral)', fontSize: '0.85rem', fontWeight: 600, padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status !== 'available' || submitting}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: status === 'available' ? 'linear-gradient(135deg, var(--violet), var(--violet-dim))' : 'var(--border)',
              color: status === 'available' ? '#ffffff' : 'var(--text-sec)',
              fontWeight: 800,
              fontSize: '1.02rem',
              cursor: status === 'available' ? 'pointer' : 'not-allowed',
              boxShadow: status === 'available' ? '0 4px 14px rgba(37, 99, 235, 0.3)' : 'none',
              transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.2s',
              marginTop: '8px'
            }}
            onMouseOver={(e) => { if (status === 'available') e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseOut={(e) => { if (status === 'available') e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {submitting ? 'Setting up...' : 'Start Learning! 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}
