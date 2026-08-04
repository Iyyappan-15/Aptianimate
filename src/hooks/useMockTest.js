/**
 * useMockTest.js
 * The core brain of the Mock Test, managing multiple sections (e.g. Aptitude -> Technical).
 * Uses useReducer so the entire state is one object — trivially autosaved to sessionStorage on every action.
 */
import { useReducer, useEffect, useCallback, useRef } from 'react';

const SESSION_KEY = 'mock_test_unified_session';
const TAB_LOCK_KEY = 'mock_test_active_tab';

// ──────────────────────────────────────────────────────────
// State shape
// ──────────────────────────────────────────────────────────
function makeInitialState(sessionId, sectionsConfig) {
  // sectionsConfig looks like: [{ id: 'aptitude', questions: [...], totalSeconds: 3000 }, ...]
  const state = {
    sessionId,
    currentSectionIndex: 0,
    sections: sectionsConfig.map(sec => ({
      id: sec.id,
      questions: sec.questions,
      totalSeconds: sec.totalSeconds,
      currentIndex: 0,
      answers: {},    // { questionId: 'A' | 'B' | 'C' | 'D' }
      marked: {},     // { questionId: true }
      secondsLeft: sec.totalSeconds,
      submitted: false,
    })),
    overallSubmitted: false,
    startedAt: Date.now(),
  };
  return state;
}

// ──────────────────────────────────────────────────────────
// Reducer
// ──────────────────────────────────────────────────────────
function reducer(state, action) {
  if (state.overallSubmitted) return state;

  const currentSection = state.sections[state.currentSectionIndex];
  
  switch (action.type) {
    case 'NAVIGATE': {
      const sections = [...state.sections];
      sections[state.currentSectionIndex] = { ...currentSection, currentIndex: action.index };
      return { ...state, sections };
    }

    case 'SELECT_ANSWER': {
      const sections = [...state.sections];
      sections[state.currentSectionIndex] = {
        ...currentSection,
        answers: { ...currentSection.answers, [action.questionId]: action.option }
      };
      return { ...state, sections };
    }

    case 'CLEAR_ANSWER': {
      const answers = { ...currentSection.answers };
      delete answers[action.questionId];
      const sections = [...state.sections];
      sections[state.currentSectionIndex] = { ...currentSection, answers };
      return { ...state, sections };
    }

    case 'TOGGLE_MARK': {
      const marked = { ...currentSection.marked };
      if (marked[action.questionId]) delete marked[action.questionId];
      else marked[action.questionId] = true;
      const sections = [...state.sections];
      sections[state.currentSectionIndex] = { ...currentSection, marked };
      return { ...state, sections };
    }

    case 'TICK': {
      if (currentSection.submitted) return state;
      if (currentSection.secondsLeft <= 0) return state;
      const sections = [...state.sections];
      sections[state.currentSectionIndex] = {
        ...currentSection,
        secondsLeft: currentSection.secondsLeft - 1
      };
      return { ...state, sections };
    }

    case 'SUBMIT_SECTION': {
      const sections = [...state.sections];
      sections[state.currentSectionIndex] = { ...currentSection, submitted: true };
      
      const isLastSection = state.currentSectionIndex === state.sections.length - 1;
      return {
        ...state,
        sections,
        currentSectionIndex: isLastSection ? state.currentSectionIndex : state.currentSectionIndex + 1,
        overallSubmitted: isLastSection
      };
    }

    case 'RESTORE':
      return action.state;

    default:
      return state;
  }
}

// ──────────────────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────────────────
export function useMockTest({ sectionsConfig, onSubmitOverall, sessionId }) {
  // Try to restore session from sessionStorage
  const [state, dispatch] = useReducer(reducer, null, () => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore if same session and not completely submitted
        if (parsed.sessionId === sessionId && !parsed.overallSubmitted) {
          return parsed;
        }
      }
    } catch (_) { /* ignore */ }
    return makeInitialState(sessionId, sectionsConfig);
  });

  const onSubmitRef = useRef(onSubmitOverall);
  useEffect(() => { onSubmitRef.current = onSubmitOverall; }, [onSubmitOverall]);

  // ── Autosave on every state change ──────────────────────
  useEffect(() => {
    if (!state.overallSubmitted) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [state]);

  const activeSection = state.sections[state.currentSectionIndex];

  // ── Countdown timer ──────────────────────────────────────
  useEffect(() => {
    if (state.overallSubmitted || activeSection.submitted) return;
    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.overallSubmitted, activeSection.submitted, state.currentSectionIndex]);

  // ── Auto-submit section when time is up ──────────────────
  useEffect(() => {
    if (activeSection.secondsLeft === 0 && !activeSection.submitted) {
      dispatch({ type: 'SUBMIT_SECTION' });
    }
  }, [activeSection.secondsLeft, activeSection.submitted]);
  
  // ── Final Submit Trigger ─────────────────────────────────
  useEffect(() => {
    if (state.overallSubmitted) {
      onSubmitRef.current({ state });
    }
  }, [state.overallSubmitted]);

  // ── Prevent accidental exit (beforeunload) ───────────────
  useEffect(() => {
    if (state.overallSubmitted) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = 'Your test is in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.overallSubmitted]);

  // ── Prevent Ctrl+R / F5 shortcuts ────────────────────────
  useEffect(() => {
    if (state.overallSubmitted) return;
    const handler = (e) => {
      if (
        e.key === 'F5' ||
        ((e.ctrlKey || e.metaKey) && e.key === 'r') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'w')
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handler, { capture: true });
    return () => window.removeEventListener('keydown', handler, { capture: true });
  }, [state.overallSubmitted]);

  // ──────────────────────────────────────────────────────────
  // Actions
  // ──────────────────────────────────────────────────────────
  const navigate = useCallback((index) => dispatch({ type: 'NAVIGATE', index }), []);
  const selectAnswer = useCallback((questionId, option) => dispatch({ type: 'SELECT_ANSWER', questionId, option }), []);
  const clearAnswer = useCallback((questionId) => dispatch({ type: 'CLEAR_ANSWER', questionId }), []);
  const toggleMark = useCallback((questionId) => dispatch({ type: 'TOGGLE_MARK', questionId }), []);
  const submitSection = useCallback(() => dispatch({ type: 'SUBMIT_SECTION' }), []);

  // ──────────────────────────────────────────────────────────
  // Derived Data for the Active Section
  // ──────────────────────────────────────────────────────────
  const currentQuestion = activeSection.questions[activeSection.currentIndex];
  const unansweredCount = activeSection.questions.filter(q => !activeSection.answers[q.id]).length;

  return {
    state,
    activeSection,
    currentQuestion,
    unansweredCount,
    navigate,
    selectAnswer,
    clearAnswer,
    toggleMark,
    submitSection,
  };
}
