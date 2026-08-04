import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { mockTestService } from '../services/mockTestService';
import { useMockTest } from '../hooks/useMockTest';
import Timer from '../components/mock-test/Timer';
import QuestionCard from '../components/mock-test/QuestionCard';
import QuestionPalette from '../components/mock-test/QuestionPalette';
import SubmitModal from '../components/mock-test/SubmitModal';

// Generate a unique session ID per test
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

// ──────────────────────────────────────────────────────────
// Pre-test instructions screen
// ──────────────────────────────────────────────────────────
function PreTestScreen({ onStart }) {
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
      style={{ maxWidth: '640px', margin: '60px auto', padding: '0 20px' }}
    >
      <div style={{
        background: 'var(--card)', borderRadius: '24px',
        border: '1px solid var(--border)', padding: '40px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', marginBottom: '24px'
        }}>💼</div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>
          TCS Ninja Mock Test
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
          Complete simulation of the TCS Ninja assessment.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#8b5cf6', fontSize: '1.2rem' }}>⏱️</span>
            <span style={{ color: 'var(--text)' }}><strong>Part 1:</strong> Aptitude (50 mins, 50 Qs)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#ec4899', fontSize: '1.2rem' }}>💻</span>
            <span style={{ color: 'var(--text)' }}><strong>Part 2:</strong> Technical (15 mins, 10 Qs)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#10b981', fontSize: '1.2rem' }}>🛡️</span>
            <span style={{ color: 'var(--text)' }}>Anti-cheat enabled (No exit, full-screen recommended)</span>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={isFullscreen} 
            onChange={e => setIsFullscreen(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#8b5cf6' }}
          />
          <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            Start in full-screen mode (Recommended)
          </span>
        </label>

        <button
          onClick={handleStart}
          style={{
            width: '100%', padding: '16px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: '#fff',
            fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '0.5px',
          }}
        >
          🚀 Start Test
        </button>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────
// Section View (Reused for both Aptitude and Technical)
// ──────────────────────────────────────────────────────────
function SectionView({ 
  sectionConfig, 
  activeSection, 
  currentQuestion, 
  unansweredCount, 
  navigate, 
  selectAnswer, 
  clearAnswer, 
  toggleMark, 
  submitSection 
}) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentIndex = activeSection.currentIndex;
  const questions = activeSection.questions;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const sectionTitle = sectionConfig.id.charAt(0).toUpperCase() + sectionConfig.id.slice(1);

  const handleSaveAndNext = () => {
    if (isLast) {
      setShowSubmitModal(true);
    } else {
      navigate(currentIndex + 1);
    }
  };

  const handleSubmitConfirm = () => {
    setShowSubmitModal(false);
    submitSection();
  };

  if (!currentQuestion) return null;

  const answeredCount = questions.length - unansweredCount;
  const progressPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '60px' }}>
      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100, background: 'var(--card)',
        borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 28px', gap: '16px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', flexShrink: 0,
            }}>🧠</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.2 }}>
                TCS Ninja · {sectionTitle}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.2 }}>
                {answeredCount} / {questions.length} answered ({progressPct}%)
              </div>
            </div>
          </div>

          <Timer secondsLeft={activeSection.secondsLeft} totalSeconds={sectionConfig.totalSeconds} />

          <button
            onClick={() => setShowSubmitModal(true)}
            style={{
              padding: '9px 22px', borderRadius: '10px', border: '2px solid #ef4444',
              background: 'transparent', color: '#ef4444', fontWeight: 700,
              fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; }}
          >
            📤 Submit Section
          </button>
        </div>

        <div style={{ height: '3px', background: 'var(--border)' }}>
          <div style={{
            height: '100%', width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{
        maxWidth: '1160px', margin: '0 auto', padding: '32px 24px',
        display: 'flex', gap: '24px', alignItems: 'flex-start',
      }}>
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={activeSection.answers[currentQuestion.id]}
          isMarked={!!activeSection.marked[currentQuestion.id]}
          onSelectAnswer={(opt) => selectAnswer(currentQuestion.id, opt)}
          onClearAnswer={() => clearAnswer(currentQuestion.id)}
          onToggleMark={() => toggleMark(currentQuestion.id)}
          onPrev={() => navigate(currentIndex - 1)}
          onSaveAndNext={handleSaveAndNext}
          isFirst={isFirst}
          isLast={isLast}
        />
        <QuestionPalette
          questions={questions}
          answers={activeSection.answers}
          marked={activeSection.marked}
          currentIndex={currentIndex}
          onNavigate={navigate}
        />
      </div>

      {showSubmitModal && (
        <SubmitModal
          unansweredCount={unansweredCount}
          totalQuestions={questions.length}
          markedCount={Object.keys(activeSection.marked).length}
          onConfirm={handleSubmitConfirm}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Main Test Component (Coordinator)
// ──────────────────────────────────────────────────────────
export default function TcsNinjaAptitudeTest({ navigate }) {
  const [phase, setPhase] = useState('instructions'); // instructions | loading | test | results
  const [sectionsConfig, setSectionsConfig] = useState([]);
  const [sessionId] = useState(generateSessionId);

  // ── Start test: fetch questions ───────────────────────
  const handleStart = useCallback(async () => {
    setPhase('loading');
    try {
      const config = mockTestService.getConfig('TCS');
      
      // Load both sections
      const [aptitudeQs, technicalQs] = await Promise.all([
        mockTestService.getAptitudeQuestions('TCS'),
        mockTestService.getTechnicalQuestions('TCS', 'Technical')
      ]);

      if (!aptitudeQs.length || !technicalQs.length) {
        throw new Error('Not enough questions returned from database.');
      }

      setSectionsConfig([
        { id: 'aptitude', questions: aptitudeQs, totalSeconds: config.aptitude.duration },
        { id: 'technical', questions: technicalQs, totalSeconds: config.technical.duration }
      ]);
      setPhase('test');
    } catch (err) {
      console.error('Failed to load questions:', err);
      setPhase('error');
    }
  }, []);

  // ── Final Submit ──────────────────────────────────────
  const handleOverallSubmit = useCallback(({ state }) => {
    sessionStorage.setItem('mock_test_results', JSON.stringify(state));
    navigate('tcs-ninja-mock/results');
  }, [navigate]);

  if (phase === 'instructions') {
    return <PreTestScreen onStart={handleStart} />;
  }

  if (phase === 'loading') {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '16px', color: 'var(--muted)',
      }}>
        <div style={{
          width: '48px', height: '48px', border: '4px solid var(--border)',
          borderTopColor: 'var(--violet)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontWeight: 600 }}>Loading mock test environment…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', gap: '12px', padding: '40px 20px',
      }}>
        <div style={{ fontSize: '3rem' }}>❌</div>
        <h2 style={{ color: 'var(--text)' }}>Failed to Load Questions</h2>
        <button
          onClick={handleStart}
          style={{
            padding: '12px 28px', borderRadius: '10px', border: 'none', background: 'var(--violet)',
            color: '#fff', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (phase === 'test' && sectionsConfig.length > 0) {
    return <TestRunner sectionsConfig={sectionsConfig} sessionId={sessionId} onOverallSubmit={handleOverallSubmit} />;
  }

  return null;
}

// ──────────────────────────────────────────────────────────
// Helper Runner Wrapper
// ──────────────────────────────────────────────────────────
function TestRunner({ sectionsConfig, sessionId, onOverallSubmit }) {
  const {
    state,
    activeSection,
    currentQuestion,
    unansweredCount,
    navigate,
    selectAnswer,
    clearAnswer,
    toggleMark,
    submitSection
  } = useMockTest({ sectionsConfig, onSubmitOverall: onOverallSubmit, sessionId });

  const [cheatStrikes, setCheatStrikes] = useState(0);
  const [showCheatWarning, setShowCheatWarning] = useState(false);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  
  // Use a ref to always have the latest state for the event listener without re-binding
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatStrikes(prev => {
          const newStrikes = prev + 1;
          if (newStrikes >= 4) {
             onOverallSubmit({ state: stateRef.current });
          } else {
             setShowCheatWarning(true);
          }
          return newStrikes;
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowFullscreenWarning(true);
      } else {
        setShowFullscreenWarning(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onOverallSubmit]);

  const sectionConfig = sectionsConfig[state.currentSectionIndex];

  return (
    <>
      <SectionView
        sectionConfig={sectionConfig}
        activeSection={activeSection}
        currentQuestion={currentQuestion}
        unansweredCount={unansweredCount}
        navigate={navigate}
        selectAnswer={selectAnswer}
        clearAnswer={clearAnswer}
        toggleMark={toggleMark}
        submitSection={submitSection}
      />
      {showCheatWarning && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 99999, textAlign: 'center', padding: '20px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#ef4444', fontSize: '2rem', fontWeight: 900, marginBottom: '12px' }}>Tab Switch Detected</h2>
          <p style={{ color: '#fff', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6, marginBottom: '32px' }}>
            Warning {cheatStrikes} of 3. Please do not leave this window or switch tabs during the test. Your test will automatically submit upon the 4th violation. The timer is still running.
          </p>
          <button
            onClick={() => setShowCheatWarning(false)}
            style={{
              padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(239,68,68,0.4)',
            }}
          >
            Continue Test
          </button>
        </div>
      )}
      {showFullscreenWarning && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 99999, textAlign: 'center', padding: '20px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📺</div>
          <h2 style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 900, marginBottom: '12px' }}>Fullscreen Exited</h2>
          <p style={{ color: '#fff', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6, marginBottom: '32px' }}>
            For the best experience and to prevent accidental tab switches, please return to fullscreen mode.
          </p>
          <button
            onClick={() => {
              document.documentElement.requestFullscreen().catch(() => {});
              setShowFullscreenWarning(false);
            }}
            style={{
              padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
            }}
          >
            Return to Fullscreen
          </button>
          <button
            onClick={() => setShowFullscreenWarning(false)}
            style={{
              marginTop: '16px', padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'transparent',
              color: 'var(--muted)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', textDecoration: 'underline'
            }}
          >
            Continue Windowed
          </button>
        </div>
      )}
    </>
  );
}
