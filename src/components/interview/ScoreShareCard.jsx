// src/components/interview/ScoreShareCard.jsx
// World-Class UI/UX Pro Placement Assessment Flashcard (1200×675 - 16:9 Widescreen).
// Captures as high-resolution PNG for LinkedIn, WhatsApp, Twitter/X & Instagram.
// Designed with executive glassmorphism, SVG gauges, competency matrices, and recruiter takeaways.

import { forwardRef } from 'react';

// Competency Pillar Row
function CompetencyRow({ icon, title, score, color, trackBg }) {
  const safeScore = Math.max(0, Math.min(100, score ?? 0));
  const tagText = safeScore >= 80 ? 'Exceptional' : safeScore >= 65 ? 'Proficient' : safeScore > 0 ? 'Needs Polish' : 'Unattempted';
  const tagColor = safeScore >= 80 ? '#34d399' : safeScore >= 65 ? '#fbbf24' : safeScore > 0 ? '#f87171' : '#64748b';
  const tagBg = safeScore >= 80 ? 'rgba(52,211,153,0.12)' : safeScore >= 65 ? 'rgba(251,191,36,0.12)' : safeScore > 0 ? 'rgba(248,113,113,0.12)' : 'rgba(100,116,139,0.12)';

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.45)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '12px 16px',
      marginBottom: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px' }}>{icon}</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.2px' }}>
            {title}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '2px 8px',
            borderRadius: '10px',
            color: tagColor,
            background: tagBg,
            border: `1px solid ${tagColor}33`
          }}>
            {tagText}
          </span>
          <span style={{ fontSize: '15px', fontWeight: 900, color, minWidth: '40px', textAlign: 'right' }}>
            {safeScore}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div style={{ height: '7px', background: trackBg, borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          width: `${Math.max(safeScore > 0 ? 3 : 0, safeScore)}%`,
          height: '100%',
          background: color,
          borderRadius: '4px'
        }} />
      </div>
    </div>
  );
}

// Circular Score Dial
function ScoreDial({ score }) {
  const safeScore = Math.max(0, Math.min(100, score ?? 0));
  const radius = 62;
  const circumference = 2 * Math.PI * radius; // ~389.5
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const ringColor = safeScore >= 80 ? '#10b981' : safeScore >= 65 ? '#f59e0b' : safeScore > 0 ? '#ef4444' : '#64748b';
  const tierLabel = safeScore >= 80 ? 'TIER 1 • READY' : safeScore >= 65 ? 'TIER 2 • QUALIFIED' : safeScore > 0 ? 'NEEDS PRACTICE' : 'NOT ATTEMPTED';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{ width: '160px', height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
          {/* Subtle outer halo */}
          <circle
            cx="80"
            cy="80"
            r="74"
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Background track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="#0b1120"
            stroke="rgba(30, 41, 59, 0.8)"
            strokeWidth="12"
          />
          {/* Progress arc */}
          {safeScore > 0 && (
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Center Text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '46px', fontWeight: 900, color: '#f8fafc', lineHeight: 1, letterSpacing: '-1px' }}>
            {safeScore}
          </span>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', letterSpacing: '1.2px', marginTop: '4px' }}>
            OUT OF 100
          </span>
        </div>
      </div>

      <div style={{
        marginTop: '10px',
        padding: '3px 12px',
        borderRadius: '20px',
        background: `${ringColor}1a`,
        border: `1px solid ${ringColor}44`,
        fontSize: '10px',
        fontWeight: 800,
        color: ringColor,
        letterSpacing: '0.8px'
      }}>
        {tierLabel}
      </div>
    </div>
  );
}

const ScoreShareCard = forwardRef(function ScoreShareCard({ scorecard, candidateConfig, durationSeconds, qaPairs = [] }, ref) {
  if (!scorecard) return null;

  const score = scorecard.overallScore ?? 0;
  const role = candidateConfig?.targetRole || 'Full-Stack Software Engineer';
  const name = candidateConfig?.candidateName || 'Candidate';
  const durationMin = Math.floor((durationSeconds || 0) / 60);
  const durationSec = (durationSeconds || 0) % 60;
  const questionsCount = qaPairs.length > 0 ? qaPairs.length : 6;

  // Verdict config
  const isHigh = score >= 80;
  const isMid = score >= 65 && score < 80;
  const isLow = score > 0 && score < 65;
  const isZero = score === 0;

  const verdictText = isZero
    ? 'NO ANSWERS RECORDED'
    : isHigh
    ? 'PLACEMENT READY'
    : isMid
    ? 'GOOD FOUNDATION'
    : 'NEEDS MORE PRACTICE';

  const verdictColor = isHigh ? '#10b981' : isMid ? '#f59e0b' : isLow ? '#f87171' : '#94a3b8';
  const verdictBg = isHigh
    ? 'rgba(16, 185, 129, 0.15)'
    : isMid
    ? 'rgba(245, 158, 11, 0.15)'
    : isLow
    ? 'rgba(248, 113, 113, 0.15)'
    : 'rgba(148, 163, 184, 0.12)';

  const cat = scorecard.categoryScores || {};

  // Extract initial
  const initial = (name || 'C').trim().charAt(0).toUpperCase();

  // Pick top strength & improvement
  const topStrength = scorecard.strengths?.[0] || 'Structured thought process and technical readiness.';
  const topArea = scorecard.areasForImprovement?.[0] || 'Provide quantifiable STAR metrics in project explanations.';

  return (
    <div
      ref={ref}
      id="score-share-card"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1200px',
        height: '675px',
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #060913 0%, #0c1222 45%, #140d28 80%, #060913 100%)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '36px 44px 30px',
        boxSizing: 'border-box'
      }}
    >
      {/* ── Ambient Background Lighting ── */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.12)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-60px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(168, 85, 247, 0.10)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '45%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(6, 182, 212, 0.05)',
        pointerEvents: 'none'
      }} />

      {/* ══════════════════════════════════════════════════════════════
          HEADER BAR
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        {/* Brand & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '13px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(99,102,241,0.45)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="7" width="10" height="10" rx="2" stroke="white" strokeWidth="1.8"/>
              <path d="M10 9.5h4M10 12h4M10 14.5h2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M9 4v3M12 4v3M15 4v3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9 17v3M12 17v3M15 17v3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M4 9h3M4 12h3M4 15h3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M17 9h3M17 12h3M17 15h3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.5px' }}>
                AptIAnimate
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#818cf8',
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                padding: '2px 8px',
                borderRadius: '6px',
                letterSpacing: '0.4px'
              }}>
                PRO
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              AI Technical Interview Evaluation • Placement Audit
            </div>
          </div>
        </div>

        {/* Verdict Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, letterSpacing: '1px' }}>
              VERIFICATION AUDIT
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
              ID: APT-{(name || 'USR').slice(0, 3).toUpperCase()}-2026
            </div>
          </div>
          <div style={{
            padding: '10px 22px',
            borderRadius: '24px',
            background: verdictBg,
            border: `1.5px solid ${verdictColor}`,
            fontSize: '13px',
            fontWeight: 900,
            color: verdictColor,
            letterSpacing: '0.8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: verdictColor }} />
            {verdictText}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN 3-COLUMN REPORT GRID
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '310px 480px 280px', gap: '20px', flex: 1, alignItems: 'stretch' }}>

        {/* ── COLUMN 1: Score & Candidate Identity Card ── */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '18px',
          padding: '22px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)'
        }}>
          {/* Circular Score */}
          <ScoreDial score={score} />

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '14px 0' }} />

          {/* Candidate Card */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: '#fff',
              fontWeight: 900,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              {initial}
            </div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', marginBottom: '2px' }}>
              {name}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#c084fc',
              fontWeight: 700,
              padding: '2px 10px',
              borderRadius: '8px',
              background: 'rgba(168, 85, 247, 0.12)',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              {role}
            </div>

            {/* Quick Meta Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '11px',
              color: '#64748b',
              fontWeight: 600
            }}>
              <span>⏱ {durationMin}m {String(durationSec).padStart(2, '0')}s</span>
              <span>•</span>
              <span>❓ {questionsCount} Questions</span>
              <span>•</span>
              <span>⚡ AI Evaluated</span>
            </div>
          </div>
        </div>

        {/* ── COLUMN 2: 4 Core Competency Pillars ── */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '18px',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                CORE COMPETENCY BREAKDOWN
              </span>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                BENCHMARK: 80%+
              </span>
            </div>

            <CompetencyRow
              icon="💬"
              title="Communication & Clarity"
              score={cat.communication}
              color="#60a5fa"
              trackBg="#172554"
            />
            <CompetencyRow
              icon="🔬"
              title="Technical Depth & Architecture"
              score={cat.technicalDepth}
              color="#34d399"
              trackBg="#064e3b"
            />
            <CompetencyRow
              icon="📁"
              title="Project Context & STAR Method"
              score={cat.projectClarity}
              color="#f472b6"
              trackBg="#500724"
            />
            <CompetencyRow
              icon="🧩"
              title="Problem Solving & Critical Logic"
              score={cat.problemSolving}
              color="#fbbf24"
              trackBg="#451a03"
            />
          </div>

          {/* Benchmarking Note */}
          <div style={{
            fontSize: '11px',
            color: '#64748b',
            background: 'rgba(2, 6, 23, 0.5)',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>🎯 Placement standard requires &gt;75% across all 4 pillars</span>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>Industry Calibrated</span>
          </div>
        </div>

        {/* ── COLUMN 3: AI Recruiter Takeaways & Recommendations ── */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '18px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
              RECRUITER QUICK-TAKE
            </div>

            {isZero ? (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '12px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#fca5a5', marginBottom: '6px' }}>
                  ⚠️ Session Incomplete
                </div>
                <div style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.5 }}>
                  No spoken or typed responses were recorded. Check your microphone or practice in Type Mode to receive a verified score.
                </div>
              </div>
            ) : (
              <>
                {/* Strength */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    🌟 Core Strength
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#e2e8f0', lineHeight: 1.4, fontWeight: 500 }}>
                    {topStrength}
                  </div>
                </div>

                {/* Focus Area */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '12px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    🎯 Priority Focus
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#e2e8f0', lineHeight: 1.4, fontWeight: 500 }}>
                    {topArea}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Skill Tag Pills */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {['#SystemDesign', '#Algorithms', '#Architecture', '#Communication'].map((tag, i) => (
                <span key={i} style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94a3b8',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Official Audit Seal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }}>
              <span style={{ fontSize: '16px' }}>🛡️</span>
              <div style={{ fontSize: '10px', color: '#c7d2fe', fontWeight: 600 }}>
                AptIAnimate Certified AI Rubric
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER BAR
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '18px',
        paddingTop: '14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
            aptianimate.vercel.app  •  AI-Powered Placement Prep &amp; Technical Interviews
          </span>
        </div>

        <div style={{
          padding: '8px 22px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          fontSize: '12px',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '0.4px',
          boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>Practice Your Resume Free</span>
          <span>➔</span>
        </div>
      </div>
    </div>
  );
});

export default ScoreShareCard;
