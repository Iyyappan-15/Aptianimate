// src/components/interview/ScoreShareCard.jsx
// The hidden 1200×630px flashcard div captured by html2canvas for social sharing.
// Positioned off-screen so it's rendered by the browser but invisible to the user.
// Uses only inline styles + SVG/canvas-safe rendering (no CSS vars, no external fonts needed).

import { forwardRef } from 'react';

// Category bar row inside the card
function CategoryBar({ label, score, color, barBg }) {
  const barWidth = `${Math.max(4, score)}%`;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
      <div style={{
        width: '180px',
        fontSize: '15px',
        fontWeight: 600,
        color: '#cbd5e1',
        flexShrink: 0,
        letterSpacing: '0.2px'
      }}>
        {label}
      </div>
      <div style={{
        flex: 1,
        height: '10px',
        background: barBg,
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: barWidth,
          height: '100%',
          background: color,
          borderRadius: '5px'
        }} />
      </div>
      <div style={{
        width: '48px',
        textAlign: 'right',
        fontSize: '15px',
        fontWeight: 800,
        color,
        flexShrink: 0
      }}>
        {score}%
      </div>
    </div>
  );
}

// Donut score ring — drawn as pure DOM (html2canvas-compatible)
function ScoreRing({ score }) {
  // We fake a conic-gradient ring with a nested circle
  const pct = Math.max(0, Math.min(100, score));
  const ringColor = pct >= 80 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{
      width: '170px',
      height: '170px',
      borderRadius: '50%',
      background: `conic-gradient(${ringColor} ${pct}%, #1e293b ${pct}%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 0 40px ${ringColor}55, 0 0 80px ${ringColor}22`,
      flexShrink: 0
    }}>
      {/* Inner white/dark circle */}
      <div style={{
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '42px',
          fontWeight: 900,
          color: '#f1f5f9',
          lineHeight: 1,
          letterSpacing: '-1px'
        }}>
          {score}
        </div>
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          fontWeight: 700,
          letterSpacing: '1px',
          marginTop: '2px'
        }}>
          OUT OF 100
        </div>
      </div>
    </div>
  );
}

const ScoreShareCard = forwardRef(function ScoreShareCard({ scorecard, candidateConfig, durationSeconds }, ref) {
  if (!scorecard) return null;

  const score = scorecard.overallScore || 0;
  const verdict = scorecard.verdict || 'Placement Ready';
  const role = candidateConfig?.targetRole || 'Software Engineer';
  const name = candidateConfig?.candidateName || 'Candidate';
  const durationMin = Math.floor((durationSeconds || 0) / 60);
  const durationSec = (durationSeconds || 0) % 60;

  const verdictColor = verdict.toLowerCase().includes('ready') || verdict.toLowerCase().includes('strong')
    ? '#10b981'
    : verdict.toLowerCase().includes('good')
    ? '#f59e0b'
    : '#ef4444';

  const cat = scorecard.categoryScores || {};
  const categories = [
    { label: '💬  Communication',   score: cat.communication  || 80, color: '#60a5fa', barBg: '#1e3a5f' },
    { label: '🔬  Technical Depth',  score: cat.technicalDepth || 75, color: '#34d399', barBg: '#0d2e22' },
    { label: '📁  Project Clarity',  score: cat.projectClarity || 82, color: '#f472b6', barBg: '#3b1a2e' },
    { label: '🧩  Problem Solving',  score: cat.problemSolving || 78, color: '#fbbf24', barBg: '#2e230a' }
  ];

  return (
    // Positioned off-screen so html2canvas can render it without it being visible
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        // NOTE: Do NOT use visibility:hidden — html2canvas can't render those.
        // opacity:0 keeps the element painted by the browser (needed for html2canvas).
        // shareCard.js temporarily sets top:0/left:0 + opacity:1 before capture.
        opacity: '0',
        pointerEvents: 'none',
        width: '1200px',
        height: '630px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0f172a 40%, #1a0e2e 70%, #0f172a 100%)',
        fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 52px 36px',
        boxSizing: 'border-box'
      }}
    >
      {/* ── Decorative glow blobs ── */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-60px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-40px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* ── TOP ROW: Logo + Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* AI chip icon */}
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99,102,241,0.5)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="7" width="10" height="10" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M10 9.5h4M10 12h4M10 14.5h2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M9 4v3M12 4v3M15 4v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 17v3M12 17v3M15 17v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 9h3M4 12h3M4 15h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M17 9h3M17 12h3M17 15h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
              AptIAnimate
            </div>
            <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600, letterSpacing: '1px' }}>
              AI INTERVIEW CERTIFICATE
            </div>
          </div>
        </div>

        {/* Verdict badge */}
        <div style={{
          padding: '8px 20px',
          borderRadius: '24px',
          background: `${verdictColor}18`,
          border: `1.5px solid ${verdictColor}`,
          fontSize: '14px',
          fontWeight: 800,
          color: verdictColor,
          letterSpacing: '0.5px'
        }}>
          {verdict.toUpperCase()}
        </div>
      </div>

      {/* ── MAIN CONTENT ROW: Score Ring + Categories ── */}
      <div style={{ display: 'flex', gap: '52px', flex: 1, alignItems: 'center' }}>

        {/* LEFT: Score ring + meta */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <ScoreRing score={score} />

          {/* Candidate info below ring */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
              {name}
            </div>
            <div style={{
              fontSize: '13px', color: '#7c3aed',
              fontWeight: 600,
              maxWidth: '200px',
              textAlign: 'center',
              lineHeight: 1.3
            }}>
              {role}
            </div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px', fontWeight: 500 }}>
              ⏱ {durationMin}m {String(durationSec).padStart(2, '0')}s  •  6 Questions
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div style={{
          width: '1px',
          alignSelf: 'stretch',
          background: 'linear-gradient(to bottom, transparent, #334155 30%, #334155 70%, transparent)',
          flexShrink: 0
        }} />

        {/* RIGHT: Category bars */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#475569',
            letterSpacing: '1.5px',
            marginBottom: '20px'
          }}>
            PERFORMANCE BREAKDOWN
          </div>
          {categories.map((cat, i) => (
            <CategoryBar key={i} {...cat} />
          ))}

          {/* Strengths snippet */}
          {scorecard.strengths?.[0] && (
            <div style={{
              marginTop: '18px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              fontSize: '13px',
              color: '#6ee7b7',
              lineHeight: 1.4
            }}>
              ✅ {scorecard.strengths[0]}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM: Branding + CTA ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>
          aptianimate.vercel.app  •  AI-powered mock interviews tailored to your resume
        </div>
        <div style={{
          padding: '8px 20px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          fontSize: '13px',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.3px'
        }}>
          Try it free →
        </div>
      </div>
    </div>
  );
});

export default ScoreShareCard;
