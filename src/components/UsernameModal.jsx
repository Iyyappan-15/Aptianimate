import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUsernameAvailable, createProfile } from '../repositories/profileRepository';

export default function UsernameModal() {
  const { user, profile, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState(null); // 'available', 'taken', 'invalid', or null
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Debounce username availability check
  useEffect(() => {
    if (!username) {
      setStatus(null);
      return;
    }

    const cleanUsername = username.trim().toLowerCase();

    // 3–20 chars: letters, numbers, underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      setStatus('invalid');
      return;
    }

    setChecking(true);
    const timer = setTimeout(async () => {
      try {
        const available = await isUsernameAvailable(cleanUsername);
        setStatus(available ? 'available' : 'taken');
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  // Only show for real (Google-authenticated) users without a profile yet
  if (!user || user.is_anonymous || profile) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'available' || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      const avatarUrl = user.user_metadata?.avatar_url || '';
      // Store the Google display name silently — user only picks their username
      const fullName = user.user_metadata?.full_name || '';
      await createProfile(user.id, username, fullName, avatarUrl);
      await refreshProfile();
    } catch (err) {
      setError(err.message || 'Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '40px 36px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center',
      }}>
        {/* Google avatar from OAuth */}
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="profile"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '3px solid var(--violet)',
              marginBottom: '16px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👋</div>
        )}

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          color: 'var(--text-main)',
          marginBottom: '6px',
        }}>
          Welcome{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}!` : '!'}
        </h2>
        <p style={{
          color: 'var(--text-sec)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}>
          Choose a unique username — this is how others will see you on AptiAnimate.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          {/* Username field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-sec)',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '8px',
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              {/* @ prefix */}
              <span style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--violet)',
                fontWeight: 800,
                fontSize: '1rem',
                pointerEvents: 'none',
              }}>@</span>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                maxLength={20}
                autoFocus
                required
                style={{
                  width: '100%',
                  padding: '13px 40px 13px 30px',
                  borderRadius: '12px',
                  border: `1.5px solid ${
                    status === 'available' ? 'var(--teal)' :
                    status === 'taken' || status === 'invalid' ? 'var(--coral)' :
                    'var(--border)'
                  }`,
                  background: 'var(--surface2)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  if (!status || status === null) e.target.style.borderColor = 'var(--violet)';
                }}
                onBlur={(e) => {
                  if (!status || status === null) e.target.style.borderColor = 'var(--border)';
                }}
              />
              {/* Spinner */}
              <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                {checking && (
                  <div style={{
                    border: '2px solid rgba(0,0,0,0.08)',
                    borderTop: '2px solid var(--violet)',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                )}
                {!checking && status === 'available' && <span style={{ color: 'var(--teal)', fontWeight: 800 }}>✓</span>}
                {!checking && (status === 'taken' || status === 'invalid') && <span style={{ color: 'var(--coral)', fontWeight: 800 }}>✗</span>}
              </div>
            </div>

            {/* Status message */}
            {username && !checking && (
              <div style={{ marginTop: '7px', fontSize: '0.82rem', fontWeight: 600 }}>
                {status === 'available' && <span style={{ color: 'var(--teal)' }}>✓ "@{username.toLowerCase()}" is available!</span>}
                {status === 'taken'     && <span style={{ color: 'var(--coral)' }}>✗ That username is already taken.</span>}
                {status === 'invalid'   && <span style={{ color: 'var(--coral)' }}>⚠ 3–20 characters: letters, numbers, underscores only.</span>}
              </div>
            )}
          </div>

          {error && (
            <div style={{
              color: 'var(--coral)',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '10px 14px',
              background: 'rgba(239,68,68,0.08)',
              borderRadius: '10px',
              border: '1px solid rgba(239,68,68,0.2)',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status !== 'available' || submitting}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: status === 'available'
                ? 'linear-gradient(135deg, var(--violet), #6d28d9)'
                : 'var(--border)',
              color: status === 'available' ? '#fff' : 'var(--text-sec)',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: status === 'available' ? 'pointer' : 'not-allowed',
              boxShadow: status === 'available' ? '0 4px 16px rgba(124,58,237,0.35)' : 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
              marginTop: '4px',
            }}
            onMouseOver={(e) => { if (status === 'available') e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { if (status === 'available') e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {submitting ? 'Setting up your profile…' : 'Confirm Username 🚀'}
          </button>
          
          <button
            type="button"
            onClick={async () => {
              const { signOut } = await import('../services/authService');
              signOut();
            }}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-sec)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '4px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Cancel & Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
