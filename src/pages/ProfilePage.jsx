import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        gap: '16px',
      }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <p style={{ color: 'var(--muted)', fontWeight: 600 }}>Please log in to view your profile.</p>
      </div>
    );
  }

  const avatarSrc = profile.avatar_url || user?.user_metadata?.avatar_url || null;

  return (
    <div className="page" style={{ paddingTop: '40px' }}>
      <div style={{
        maxWidth: '520px',
        margin: '0 auto',
        background: 'var(--surface)',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        animation: 'fadeIn 0.4s ease',
      }}>
        {/* Header band */}
        <div style={{
          height: '80px',
          background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
        }} />

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-50px', marginBottom: '16px' }}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={profile.username}
              style={{
                display: 'inline-block',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '4px solid var(--surface)',
                objectFit: 'cover',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
            />
          ) : (
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
              border: '4px solid var(--surface)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '2.5rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>
              {profile.username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ textAlign: 'center', padding: '0 32px 40px' }}>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 900,
            color: 'var(--text)',
            margin: '0 0 6px',
          }}>
            {profile.full_name || profile.username}
          </h1>
          <p style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--violet)',
            margin: 0,
          }}>
            @{profile.username}
          </p>
        </div>
      </div>
    </div>
  );
}
