import { useState } from 'react';
import { signInWithGoogle } from '../services/authService';

export default function AuthPrompt({ title = "Sign in to access", message = "Please sign in to view this page." }) {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      setLoading(false);
      alert("Sign in failed: " + err.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="auth-prompt-card" style={{
        position: 'relative',
        zIndex: 1,
        background: 'var(--surface)',
        padding: '48px 40px',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        textAlign: 'center',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
        animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          width: '72px', height: '72px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', border: '1px solid var(--border)'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '32px' }}>
          {message}
        </p>

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="btn-google"
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '12px', padding: '14px 24px', borderRadius: '12px', border: '1px solid var(--border)',
            background: 'var(--surface2)', color: 'var(--text-main)', fontWeight: 700,
            fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', outline: 'none'
          }}
          onMouseOver={e => { if (!loading) { e.currentTarget.style.background = 'var(--surface3)'; e.currentTarget.style.borderColor = 'var(--muted)'; } }}
          onMouseOut={e => { if (!loading) { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.borderColor = 'var(--border)'; } }}
        >
          {loading ? (
            <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid var(--border)', borderTopColor: 'var(--violet)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.75c-.53 2.87-2.14 5.3-4.57 6.96l7.14 5.53C43.51 36.31 46.5 30.8 46.5 24z"/>
                <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.14-5.53c-2.15 1.45-4.92 2.3-8.75 2.3-6.72 0-12.41-4.54-14.45-10.63l-7.98 6.19C5.43 41.89 13.96 48 24 48z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
