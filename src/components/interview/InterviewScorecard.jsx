// src/components/interview/InterviewScorecard.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { generateInterviewScorecard } from '../../services/aiInterviewService';
import ScoreShareCard from './ScoreShareCard';
import { captureCardAndShare } from '../../utils/shareCard';

export default function InterviewScorecard({
  candidateConfig,
  qaPairs,
  durationSeconds,
  onRetake
}) {
  const [scorecard, setScorecard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  // Ref pointing to the hidden 1200×630 flashcard div for html2canvas capture
  const shareCardRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function evaluate() {
      try {
        const result = await generateInterviewScorecard({
          candidateName: candidateConfig.candidateName,
          skills: candidateConfig.skills,
          projects: candidateConfig.projects,
          qaPairs,
          targetRole: candidateConfig.targetRole
        });
        if (isMounted) {
          setScorecard(result);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to generate scorecard:', err);
        if (isMounted) setIsLoading(false);
      }
    }
    evaluate();
    return () => { isMounted = false; };
  }, [candidateConfig, qaPairs]);

  // ── Generate & Download PDF ───────────────────────────────────────────
  const handleDownloadPDF = () => {
    if (!scorecard) return;
    const doc = new jsPDF();

    // Title & Header
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('Aptianimate - AI Interview Scorecard', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(203, 213, 225);
    doc.text(`Candidate: ${candidateConfig.candidateName} | Role: ${candidateConfig.targetRole} | Date: ${new Date().toLocaleDateString()}`, 14, 30);

    // Score Summary Box
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text(`Overall Score: ${scorecard.overallScore}/100 - ${scorecard.verdict}`, 14, 55);

    doc.setFontSize(11);
    doc.text('Performance Breakdown:', 14, 68);
    const cat = scorecard.categoryScores || {};
    doc.text(`• Communication: ${cat.communication || 80}%`, 20, 78);
    doc.text(`• Technical Depth: ${cat.technicalDepth || 75}%`, 20, 86);
    doc.text(`• Project Clarity: ${cat.projectClarity || 82}%`, 20, 94);
    doc.text(`• Problem Solving: ${cat.problemSolving || 78}%`, 20, 102);

    // Strengths & Improvements
    doc.setFontSize(12);
    doc.text('Key Strengths:', 14, 118);
    doc.setFontSize(10);
    (scorecard.strengths || []).forEach((str, i) => {
      doc.text(`+ ${str}`, 20, 126 + (i * 7));
    });

    const impStartY = 126 + ((scorecard.strengths?.length || 2) * 7) + 8;
    doc.setFontSize(12);
    doc.text('Areas for Improvement:', 14, impStartY);
    doc.setFontSize(10);
    (scorecard.areasForImprovement || []).forEach((imp, i) => {
      doc.text(`- ${imp}`, 20, impStartY + 8 + (i * 7));
    });

    // Self-Intro Feedback
    const introY = impStartY + 35;
    doc.setFontSize(12);
    doc.text('Question 1 (Self-Intro) Feedback:', 14, introY);
    doc.setFontSize(10);
    const splitFeedback = doc.splitTextToSize(scorecard.selfIntroAnalysis?.feedback || 'Good introduction.', 180);
    doc.text(splitFeedback, 20, introY + 8);

    doc.save(`${candidateConfig.candidateName.replace(/\s+/g, '_')}_Interview_Scorecard.pdf`);
  };

  // ── Share on LinkedIn ─────────────────────────────────────────────────
  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `🎯 I just completed an 8-minute AI Voice Mock Interview tailored to my resume on Aptianimate! \n\nI scored ${scorecard?.overallScore || 85}/100 (${scorecard?.verdict || 'Placement Ready'}) for the ${candidateConfig.targetRole} role. \n\nPractice your real-time interview here:`
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  // ── Share on WhatsApp ─────────────────────────────────────────────────
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I just practiced a live 8-minute AI voice technical interview on my resume and scored ${scorecard?.overallScore || 85}/100! Try it free: ${window.location.origin}/#/resume-interview`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // ── Share as Flashcard Image (html2canvas → Web Share API / PNG download) ──
  const handleShareCard = useCallback(async () => {
    if (!scorecard || isCapturing) return;
    setIsCapturing(true);
    try {
      await captureCardAndShare(shareCardRef, {
        score: scorecard.overallScore,
        verdict: scorecard.verdict,
        role: candidateConfig.targetRole
      });
    } finally {
      setIsCapturing(false);
    }
  }, [scorecard, isCapturing, candidateConfig.targetRole]);

  if (isLoading) {
    return (
      <div style={{
        maxWidth: '700px',
        margin: '60px auto',
        padding: '40px 20px',
        textAlign: 'center',
        background: 'var(--surface)',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: '3.5rem', marginBottom: '20px' }}
        >
          📊
        </motion.div>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', marginBottom: '8px' }}>
          Generating Your Placement Readiness Scorecard...
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
          Our AI evaluation engine is analyzing your responses against industry placement rubrics for communication, technical depth, and problem-solving.
        </p>
      </div>
    );
  }

  const durationMin = Math.floor(durationSeconds / 60);
  const durationSec = durationSeconds % 60;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 16px 48px' }}>
      {/* Top Banner with Big Score */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,72,153,0.08))',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '24px',
          padding: '32px 24px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <div style={{
            display: 'inline-block',
            background: scorecard.overallScore >= 80 ? '#10b981' : '#f59e0b',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '10px'
          }}>
            {scorecard.verdict || 'Placement Ready'}
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text)' }}>
            Interview Evaluation Report
          </h1>
          <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.95rem' }}>
            Candidate: <strong>{candidateConfig.candidateName}</strong> • Role: <strong>{candidateConfig.targetRole}</strong> • Time: <strong>{durationMin}m {durationSec}s</strong>
          </p>
        </div>

        {/* Big Circular Score */}
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'conic-gradient(#6366f1 0%, #ec4899 80%, var(--surface3, #e2e8f0) 80%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(99,102,241,0.25)'
        }}>
          <div style={{
            width: '105px',
            height: '105px',
            borderRadius: '50%',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text)' }}>
              {scorecard.overallScore}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>OUT OF 100</span>
          </div>
        </div>
      </motion.div>

      {/* 4 Category Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: '🗣️ Communication', score: scorecard.categoryScores?.communication || 82, color: '#3b82f6' },
          { label: '💻 Technical Depth', score: scorecard.categoryScores?.technicalDepth || 76, color: '#10b981' },
          { label: '🏗️ Project Clarity', score: scorecard.categoryScores?.projectClarity || 85, color: '#ec4899' },
          { label: '🧩 Problem Solving', score: scorecard.categoryScores?.problemSolving || 80, color: '#f59e0b' }
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: item.color, marginBottom: '8px' }}>
              {item.score}%
            </div>
            <div style={{ height: '6px', background: 'var(--surface3, #e2e8f0)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${item.score}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Compulsory Q1 (Self-Intro) Feedback */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>⭐</span>
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#10b981' }}>
            Question 1: Self-Introduction Analysis ({scorecard.selfIntroAnalysis?.score || 85}%)
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5 }}>
          {scorecard.selfIntroAnalysis?.feedback || "You provided a clear overview of your projects and technical skills. Remember to highlight your future career goals in the opening 60 seconds."}
        </p>
      </div>

      {/* Strengths & Improvements Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Strengths */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '1.05rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span> Key Strengths
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {(scorecard.strengths || []).map((s, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '1.05rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💡</span> Areas for Improvement
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {(scorecard.areasForImprovement || []).map((imp, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{imp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Review Accordion */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px'
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📋</span> Question-by-Question Breakdown ({qaPairs.length} Questions)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {qaPairs.map((pair, idx) => {
            const review = scorecard.questionReviews?.[idx];
            const isOpen = activeAccordion === idx;

            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  background: 'var(--surface2)',
                  overflow: 'hidden'
                }}
              >
                <div
                  onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isOpen ? 'rgba(99, 102, 241, 0.08)' : 'transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      background: '#6366f1',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      Q{idx + 1}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                      {pair.question.length > 70 ? `${pair.question.slice(0, 70)}...` : pair.question}
                    </span>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>

                {isOpen && (
                  <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', display: 'block' }}>FULL QUESTION:</span>
                      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--text)' }}>{pair.question}</p>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--violet, #6366f1)', display: 'block' }}>YOUR RESPONSE:</span>
                      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                        "{pair.answer}"
                      </p>
                    </div>

                    {review?.feedback && (
                      <div style={{ marginBottom: '12px', padding: '10px', borderRadius: '8px', background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.2)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ec4899', display: 'block' }}>AI FEEDBACK:</span>
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text)' }}>{review.feedback}</p>
                      </div>
                    )}

                    {review?.modelAnswer && (
                      <div style={{ padding: '10px', borderRadius: '8px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', display: 'block' }}>BENCHMARK MODEL ANSWER:</span>
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text)' }}>{review.modelAnswer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SHARE FLASHCARD BANNER ── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: '20px',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Card preview thumbnail */}
          <div style={{
            width: '72px',
            height: '40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            border: '1.5px solid rgba(99,102,241,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '1.2rem'
          }}>
            🃏
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '3px' }}>
              Share your score as a flashcard
            </div>
            <div style={{ fontSize: '0.83rem', color: 'var(--muted)' }}>
              Beautiful image card • Works on WhatsApp, Instagram, LinkedIn • Auto-downloads on desktop
            </div>
          </div>
        </div>

        <button
          onClick={handleShareCard}
          disabled={isCapturing}
          style={{
            padding: '13px 28px',
            borderRadius: '12px',
            background: isCapturing
              ? 'rgba(99,102,241,0.5)'
              : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: isCapturing ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          {isCapturing ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block' }}
              >
                ⚙️
              </motion.span>
              Generating card...
            </>
          ) : (
            <>📤 Share as Flashcard</>
          )}
        </button>
      </div>

      {/* ── Action Footer ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button
          onClick={onRetake}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          🔄 Practice Another Resume
        </button>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleShareWhatsApp}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              background: '#25D366',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            💬 WhatsApp (Text)
          </button>

          <button
            onClick={handleShareLinkedIn}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              background: '#0077b5',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            🔗 LinkedIn
          </button>

          <button
            onClick={handleDownloadPDF}
            style={{
              padding: '12px 22px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(99,102,241,0.35)'
            }}
          >
            📄 PDF Report
          </button>
        </div>
      </div>

      {/* ── Hidden flashcard div — captured by html2canvas ── */}
      <ScoreShareCard
        ref={shareCardRef}
        scorecard={scorecard}
        candidateConfig={candidateConfig}
        durationSeconds={durationSeconds}
      />
    </div>
  );
}
