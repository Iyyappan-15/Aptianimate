/**
 * useMockTest.js
 * The core brain of the TCS Ninja Aptitude Test.
 * Uses useReducer so the entire state is one object — trivially autosaved to sessionStorage on every action.
 */
import { useReducer, useEffect, useCallback, useRef } from 'react';

const SESSION_KEY = 'tcs_ninja_aptitude_session';
const TAB_LOCK_KEY = 'tcs_ninja_active_tab';
const TOTAL_SECONDS = 50 * 60; // 50 minutes

// ──────────────────────────────────────────────────────────
// State shape
// ──────────────────────────────────────────────────────────
function makeInitialState(questions, sessionId) {
  return {
    sessionId,
    questions,
    currentIndex: 0,
    answers: {},    // { questionId: 'A' | 'B' | 'C' | 'D' }
    marked: {},     // { questionId: true }
    secondsLeft: TOTAL_SECONDS,
    submitted: false,
    startedAt: Date.now(),
  };
}

// ──────────────────────────────────────────────────────────
// Reducer
// ──────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentIndex: action.index };

    case 'SELECT_ANSWER': {
      const answers = { ...state.answers, [action.questionId]: action.option };
      return { ...state, answers };
    }

    case 'CLEAR_ANSWER': {
      const answers = { ...state.answers };
      delete answers[action.questionId];
      return { ...state, answers };
    }

    case 'TOGGLE_MARK': {
      const marked = { ...state.marked };
      if (marked[action.questionId]) delete marked[action.questionId];
      else marked[action.questionId] = true;
      return { ...state, marked };
    }

    case 'TICK':
      if (state.secondsLeft <= 0) return state;
      return { ...state, secondsLeft: state.secondsLeft - 1 };

    case 'SUBMIT':
      return { ...state, submitted: true };

    case 'RESTORE':
      return action.state;

    default:
      return state;
  }
}

// ──────────────────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────────────────
export function useMockTest({ questions, onSubmit, sessionId }) {
  // Try to restore session from sessionStorage
  const [state, dispatch] = useReducer(reducer, null, () => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore if same session and not yet submitted
        if (parsed.sessionId === sessionId && !parsed.submitted) {
          return parsed;
        }
      }
    } catch (_) { /* ignore */ }
    return makeInitialState(questions, sessionId);
  });

  const onSubmitRef = useRef(onSubmit);
  useEffect(() => { onSubmitRef.current = onSubmit; }, [onSubmit]);

  // ── Autosave on every state change ──────────────────────
  useEffect(() => {
    if (!state.submitted) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    }
  }, [state]);

  // ── Countdown timer ──────────────────────────────────────
  useEffect(() => {
    if (state.submitted) return;
    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.submitted]);

  // ── Auto-submit when time is up ──────────────────────────
  useEffect(() => {
    if (state.secondsLeft === 0 && !state.submitted) {
      dispatch({ type: 'SUBMIT' });
      sessionStorage.removeItem(SESSION_KEY);
      const timeTaken = TOTAL_SECONDS; // used all time
      onSubmitRef.current({ state: { ...state, submitted: true }, timeTaken });
    }
  }, [state.secondsLeft, state.submitted]);

  // ── Prevent accidental exit (beforeunload) ───────────────
  useEffect(() => {
    if (state.submitted) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = 'Your test is in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.submitted]);

  // ── Prevent Ctrl+R / F5 shortcuts ────────────────────────
  useEffect(() => {
    if (state.submitted) return;
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
  }, [state.submitted]);

  // ──────────────────────────────────────────────────────────
  // Actions
  // ──────────────────────────────────────────────────────────
  const navigate = useCallback((index) => dispatch({ type: 'NAVIGATE', index }), []);

  const selectAnswer = useCallback((questionId, option) => {
    dispatch({ type: 'SELECT_ANSWER', questionId, option });
  }, []);

  const clearAnswer = useCallback((questionId) => {
    dispatch({ type: 'CLEAR_ANSWER', questionId });
  }, []);

  const toggleMark = useCallback((questionId) => {
    dispatch({ type: 'TOGGLE_MARK', questionId });
  }, []);

  const submitTest = useCallback(() => {
    const timeTaken = TOTAL_SECONDS - state.secondsLeft;
    dispatch({ type: 'SUBMIT' });
    sessionStorage.removeItem(SESSION_KEY);
    onSubmitRef.current({ state: { ...state, submitted: true }, timeTaken });
  }, [state]);

  // ──────────────────────────────────────────────────────────
  // Derived
  // ──────────────────────────────────────────────────────────
  const currentQuestion = state.questions[state.currentIndex];
  const unansweredCount = state.questions.filter(q => !state.answers[q.id]).length;

  return {
    state,
    currentQuestion,
    unansweredCount,
    TOTAL_SECONDS,
    navigate,
    selectAnswer,
    clearAnswer,
    toggleMark,
    submitTest,
  };
}
