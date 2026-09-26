// src/pages/StreakLeaderboardPage.jsx
import StreakLeaderboard from '../components/profile/StreakLeaderboard';
import { signInWithGoogle } from '../services/authService';

export default function StreakLeaderboardPage({ navigate }) {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      alert("Sign-in failed: " + e.message);
    }
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: '32px 16px 80px',
      width: '100%',
      boxSizing: 'border-box',
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <button
          onClick={() => navigate('')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted, #94a3b8)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ← Back to Home
        </button>

        <div style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--text-muted, #94a3b8)',
          background: 'var(--surface, #1e293b)',
          padding: '6px 14px',
          borderRadius: 10,
          border: '1px solid var(--border, #334155)',
        }}>
          Updated in real-time
        </div>
      </div>

      <StreakLeaderboard onSignInClick={handleSignIn} />
    </div>
  );
}
