/**
 * TcsNinjaAptitudeTest.jsx
 * Main test page for TCS Ninja Aptitude section.
 * Features:
 * - DB-side random question fetch
 * - One question at a time
 * - Sticky timer (top-right)
 * - Question palette (side)
 * - Save & Next | Mark for Review | Clear Response
 * - Submit modal with unanswered count
 * - Auto-submit on timeout
 * - Session restore on refresh (sessionStorage)
 * - Prevent accidental exit (beforeunload)
 * - Multi-tab detection via BroadcastChannel
 * - Optional full-screen mode
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { aptitudeService } from '../services/aptitudeService';
import { useMockTest } from '../hooks/useMockTest';
import { calculateScore } from '../utils/scoreCalculator';
import Timer from '../components/mock-test/Timer';
import QuestionCard from '../components/mock-test/QuestionCard';
import QuestionPalette from '../components/mock-test/QuestionPalette';
import SubmitModal from '../components/mock-test/SubmitModal';

const SESSION_KEY = 'tcs_ninja_aptitude_session';
const TAB_CHANNEL = 'tcs_ninja_test_tab';
const TAB_LOCK_KEY = 'tcs_ninja_active_tab_id';
const TOTAL_QUESTIONS = 50;
const TOTAL_SECONDS = 50 * 60;

// Generate a unique session ID per test
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

// ──────────────────────────────────────────────────────────
// Pre-test instructions screen
// ──────────────────────────────────────────────────────────
function PreTestScreen({ onStart, onBack }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStart = () => {
    if (isFullscreen && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: '640px',
        margin: '60px auto',
        padding: '0 20px',
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--muted)',
          cursor: 'pointer',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.9rem',
        }}
      >
        ← Back
      </button>

      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧠</div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>
            TCS Ninja — Aptitude
          </h1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            Read the instructions carefully before starting.
          </p>
        </div>

        {/* Instructions */}
        <div style={{
          background: 'rgba(139,92,246,0.05)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '24px',
        }}>
          <h3 style={{ margin: '0 0 14px 0', color: 'var(--text)', fontWeight: 700 }}>📋 Instructions</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 2, color: 'var(--muted)', fontSize: '0.9rem' }}>
            <li>This test contains <strong>50 questions</strong> to be answered in <strong>50 minutes</strong>.</li>
            <li>Each correct answer carries <strong>1 mark</strong>. There is <strong>no negative marking</strong>.</li>
            <li>You can navigate freely between questions using the palette.</li>
            <li>Use <strong>Mark for Review</strong> to flag questions you want to revisit.</li>
            <li>Your progress is <strong>auto-saved</strong>. A refresh will not lose your work.</li>
            <li>The test will <strong>auto-submit</strong> when the timer reaches 00:00.</li>
            <li>Do <strong>not</strong> open this test in multiple tabs.</li>
          </ul>
        </div>

        {/* Full Screen toggle */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            marginBottom: '28px',
            padding: '12px 16px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={isFullscreen}
            onChange={e => setIsFullscreen(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--violet)' }}
          />
          <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>
            🔲 Enter Full Screen for a distraction-free experience
          </span>
        </label>

        <button
          onClick={handleStart}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.1rem',
            cursor: 'pointer',
            letterSpacing: '0.5px',
          }}
        >
          🚀 Start Test
        </button>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────
// Main Test
// ──────────────────────────────────────────────────────────
function TestView({ questions, sessionId, onSubmitResults, navigate }) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const pendingSubmitRef = useRef(false);

  const handleFinalSubmit = useCallback(({ state, timeTaken }) => {
    const results = calculateScore({
      questions: state.questions,
      answers: state.answers,
      marked: state.marked,
      timeTakenSeconds: timeTaken,
      totalSeconds: TOTAL_SECONDS,
    });
    onSubmitResults(results);
  }, [onSubmitResults]);

  const {
    state,
    currentQuestion,
    unansweredCount,
    navigate: navTo,
    selectAnswer,
    clearAnswer,
    toggleMark,
    submitTest,
  } = useMockTest({ questions, onSubmit: handleFinalSubmit, sessionId });

  const currentIndex = state.currentIndex;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const handleSaveAndNext = () => {
    if (isLast) {
      setShowSubmitModal(true);
    } else {
      navTo(currentIndex + 1);
    }
  };

  const handleSubmitConfirm = () => {
    setShowSubmitModal(false);
    submitTest();
  };

  if (!currentQuestion) return null;

  const answeredCount = questions.length - unansweredCount;
  const progressPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '60px' }}>

      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 28px',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', flexShrink: 0,
            }}>🧠</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.2 }}>
                TCS Ninja · Aptitude
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.2 }}>
                {answeredCount} / {questions.length} answered ({progressPct}%)
              </div>
            </div>
          </div>

          {/* Timer (center) */}
          <Timer secondsLeft={state.secondsLeft} totalSeconds={TOTAL_SECONDS} />

          {/* Submit button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            style={{
              padding: '9px 22px',
              borderRadius: '10px',
              border: '2px solid #ef4444',
              background: 'transparent',
              color: '#ef4444',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ef4444';
            }}
          >
            📤 Submit Test
          </button>
        </div>

        {/* Progress bar underneath */}
        <div style={{ height: '3px', background: 'var(--border)' }}>
          <div style={{
            height: '100%',
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{
        maxWidth: '1160px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
      }}>
        {/* Left: Question card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={state.answers[currentQuestion.id]}
          isMarked={!!state.marked[currentQuestion.id]}
          onSelectAnswer={selectAnswer}
          onClearAnswer={clearAnswer}
          onToggleMark={toggleMark}
          onPrev={() => navTo(currentIndex - 1)}
          onSaveAndNext={handleSaveAndNext}
          isFirst={isFirst}
          isLast={isLast}
        />

        {/* Right: Palette */}
        <QuestionPalette
          questions={state.questions}
          answers={state.answers}
          marked={state.marked}
          currentIndex={currentIndex}
          onNavigate={navTo}
        />
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <SubmitModal
          unansweredCount={unansweredCount}
          totalQuestions={questions.length}
          onConfirm={handleSubmitConfirm}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Root component — orchestrates phases
// ──────────────────────────────────────────────────────────
export default function TcsNinjaAptitudeTest({ navigate, onResults }) {
  const [phase, setPhase] = useState('instructions'); // instructions | loading | test | error
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState(null);
  const [sessionId] = useState(generateSessionId);
  const [dupTabWarning, setDupTabWarning] = useState(false);
  const channelRef = useRef(null);
  const tabIdRef = useRef(`tab_${Date.now()}_${Math.random()}`);

  // ── Multi-tab prevention ──────────────────────────────
  useEffect(() => {
    // Only active during test
    if (phase !== 'test') return;

    const myTabId = tabIdRef.current;

    // Use BroadcastChannel if available
    if (window.BroadcastChannel) {
      const ch = new BroadcastChannel(TAB_CHANNEL);
      channelRef.current = ch;

      // Announce ourselves
      ch.postMessage({ type: 'TAB_OPEN', tabId: myTabId });

      // Listen for other tabs
      ch.onmessage = (event) => {
        if (event.data.type === 'TAB_OPEN' && event.data.tabId !== myTabId) {
          // Another tab opened the test — warn this tab
          setDupTabWarning(true);
          // Tell the new tab that this one is already active
          ch.postMessage({ type: 'TAB_CONFLICT', activeTabId: myTabId });
        }
        if (event.data.type === 'TAB_CONFLICT' && event.data.activeTabId !== myTabId) {
          // We are the new tab — show warning
          setDupTabWarning(true);
        }
      };

      return () => ch.close();
    } else {
      // Fallback: localStorage flag
      const existing = localStorage.getItem(TAB_LOCK_KEY);
      if (existing && existing !== myTabId) {
        setDupTabWarning(true);
      }
      localStorage.setItem(TAB_LOCK_KEY, myTabId);
      return () => {
        if (localStorage.getItem(TAB_LOCK_KEY) === myTabId) {
          localStorage.removeItem(TAB_LOCK_KEY);
        }
      };
    }
  }, [phase]);

  // ── Start test: fetch questions ───────────────────────
  const handleStart = useCallback(async () => {
    setPhase('loading');
    try {
      // Check if there's a restored session
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.submitted && parsed.questions?.length > 0) {
          setQuestions(parsed.questions);
          setPhase('test');
          return;
        }
      }
      const qs = await aptitudeService.getRandomQuestions(TOTAL_QUESTIONS);
      if (!qs || qs.length === 0) throw new Error('No questions returned from database.');
      setQuestions(qs);
      setPhase('test');
    } catch (err) {
      console.error('Failed to load questions:', err);
      setPhase('error');
    }
  }, []);

  // ── Handle submit → go to results via navigate ────────
  const handleSubmitResults = useCallback((res) => {
    setResults(res);
    setPhase('results');
  }, []);

  // ── Duplicate tab warning screen ─────────────────────
  if (dupTabWarning) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: 'var(--text)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>
          Test Already Open in Another Tab
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: '440px', lineHeight: 1.7, marginBottom: '28px' }}>
          The TCS Ninja Aptitude Test is already active in another browser tab. Please close this tab and continue there to avoid data conflicts.
        </p>
        <button
          onClick={() => window.close()}
          style={{
            padding: '12px 28px',
            borderRadius: '10px',
            border: 'none',
            background: 'var(--violet)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Close This Tab
        </button>
      </div>
    );
  }

  // ── Phases ────────────────────────────────────────────
  if (phase === 'instructions') {
    return <PreTestScreen onStart={handleStart} onBack={() => navigate(-1)} />;
  }

  if (phase === 'loading') {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: 'var(--muted)',
      }}>
        <div style={{
          width: '48px', height: '48px',
          border: '4px solid var(--border)',
          borderTopColor: 'var(--violet)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontWeight: 600 }}>Loading questions from database…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '12px',
        padding: '40px 20px',
      }}>
        <div style={{ fontSize: '3rem' }}>❌</div>
        <h2 style={{ color: 'var(--text)' }}>Failed to Load Questions</h2>
        <p style={{ color: 'var(--muted)' }}>
          Could not fetch questions from the database. Please check your internet connection and try again.
        </p>
        <button
          onClick={handleStart}
          style={{
            padding: '12px 28px', borderRadius: '10px', border: 'none',
            background: 'var(--violet)', color: '#fff', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (phase === 'test' && questions.length > 0) {
    return (
      <TestView
        questions={questions}
        sessionId={sessionId}
        onSubmitResults={handleSubmitResults}
        navigate={navigate}
      />
    );
  }

  if (phase === 'results' && results) {
    // Store results in sessionStorage so results page can pick them up
    sessionStorage.setItem('tcs_ninja_results', JSON.stringify(results));
    navigate('tcs-ninja-mock/results');
    return null;
  }

  return null;
}
