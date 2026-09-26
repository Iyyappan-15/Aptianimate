// src/components/StreakShareCard.jsx
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function StreakShareCard({ streak = 7, milestoneName = 'Week Warrior', username = 'Student' }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const shareText = `🔥 I just reached a ${streak}-Day Streak on Aptianimate! Practicing aptitude visually with animated lessons & AI Battles. Check it out free: https://aptianimate.vercel.app/`;

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://aptianimate.vercel.app/')}`, '_blank');
  };

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `aptianimate-streak-${streak}d.png`;
      a.click();
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* ── Visual Card to Capture ── */}
      <div
        ref={cardRef}
        style={{
          width: 320,
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
          borderRadius: 20,
          padding: '24px 20px',
          color: '#ffffff',
          boxShadow: '0 12px 30px rgba(76, 29, 149, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          boxSizing: 'border-box',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140,
          height: 140,
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ fontSize: '3rem', marginBottom: 4 }}>🔥</div>
        <div style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
          {streak} Days
        </div>
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          color: '#fde047',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: 12,
        }}>
          {milestoneName}
        </div>

        <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)', margin: '0 0 16px', lineHeight: 1.4 }}>
          <strong>@{username}</strong> is mastering aptitude visually on Aptianimate!
        </p>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 10,
          padding: '8px 12px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          <span>✨</span> aptianimate.vercel.app
        </div>
      </div>

      {/* ── Share Actions ── */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={handleWhatsApp}
          style={{
            background: '#25D366',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          WhatsApp
        </button>

        <button
          onClick={handleLinkedIn}
          style={{
            background: '#0A66C2',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          LinkedIn
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            background: 'var(--surface-hover, #374151)',
            color: 'var(--text-main, #ffffff)',
            border: '1px solid var(--border, #4b5563)',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {downloading ? 'Saving...' : 'Download Card'}
        </button>
      </div>
    </div>
  );
}
