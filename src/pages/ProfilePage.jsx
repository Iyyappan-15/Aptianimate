import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--text-sec)' }}>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '40px',
      background: 'var(--surface)',
      borderRadius: '24px',
      border: '1px solid var(--border)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      textAlign: 'center',
      animation: 'fadeIn 0.4s ease'
    }}>
      {profile.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt={profile.username}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid var(--violet)',
            objectFit: 'cover',
            marginBottom: '20px'
          }}
        />
      ) : (
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '2.5rem',
          margin: '0 auto 20px auto'
        }}>
          {profile.username?.charAt(0).toUpperCase() || '?'}
        </div>
      )}

      <h1 style={{
        fontSize: '2rem',
        fontWeight: 900,
        color: 'var(--text-main)',
        marginBottom: '8px'
      }}>
        {profile.full_name || 'Anonymous User'}
      </h1>
      
      <p style={{
        fontSize: '1.1rem',
        fontWeight: 600,
        color: 'var(--violet)'
      }}>
        @{profile.username}
      </p>
    </div>
  );
}
