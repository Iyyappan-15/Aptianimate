// src/components/interview/VoiceCallRoom.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNextInterviewTurn } from '../../services/aiInterviewService';

export default function VoiceCallRoom({
  candidateConfig, // { candidateName, voiceGender, targetRole, skills, projects, resumeSummary }
  onComplete,
  onExit
}) {
  // 8 minutes = 480 seconds
  const [secondsRemaining, setSecondsRemaining] = useState(480);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);

  // Transcript state
  const [transcript, setTranscript] = useState([]);
  const [currentSpokenInput, setCurrentSpokenInput] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [qaPairs, setQaPairs] = useState([]); // [{ question, answer }]

  // Mic Mute toggle
  const [isMuted, setIsMuted] = useState(false);

  // Speech Recognition & Synthesis references
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const transcriptEndRef = useRef(null);
  const currentAnswerAccumulator = useRef('');

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, currentSpokenInput]);

  // ── Helper to find appropriate browser voice ──────────────────────────
  const getSelectedVoice = useCallback(() => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices();
    if (!voices || voices.length === 0) return null;

    const isFemale = candidateConfig.voiceGender === 'female';

    if (isFemale) {
      return (
        // Prefer high-quality Google voices first for natural, pleasant sound
        voices.find(v => /google uk english female/i.test(v.name)) ||
        voices.find(v => /google.*female|microsoft.*zira|samantha|karen|victoria/i.test(v.name)) ||
        voices.find(v => v.lang === 'en-GB' && /female/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('en-')) ||
        voices[0]
      );
    } else {
      return (
        // Prefer high-quality Google voices first for natural, pleasant sound
        voices.find(v => /google uk english male/i.test(v.name)) ||
        voices.find(v => /google.*male|microsoft.*david|daniel|george/i.test(v.name)) ||
        voices.find(v => v.lang === 'en-GB' && /male/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('en-')) ||
        voices[0]
      );
    }
  }, [candidateConfig.voiceGender]);

  // ── Speak text aloud via SpeechSynthesis ──────────────────────────────
  const speakText = useCallback((text, onFinish) => {
    if (!synthRef.current) {
      onFinish?.();
      return;
    }

    synthRef.current.cancel(); // Stop any pending speech

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      const chosenVoice = getSelectedVoice();
      if (chosenVoice) utterance.voice = chosenVoice;

      // More natural, professional pace
      utterance.rate = 0.92;
      utterance.pitch = candidateConfig.voiceGender === 'female' ? 1.05 : 0.9;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsAiSpeaking(true);
        // Stop recognition so AI doesn't hear itself — use ref to avoid stale closure
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch { /* already stopped */ }
        }
      };

      utterance.onend = () => {
        setIsAiSpeaking(false);
        onFinish?.();
      };

      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') {
          // These are normal when cancel() is called — not real errors
          return;
        }
        console.warn('SpeechSynthesis error:', e.error);
        setIsAiSpeaking(false);
        onFinish?.();
      };

      synthRef.current.speak(utterance);
    };

    // Chrome loads voices asynchronously — wait if not ready yet
    const voices = synthRef.current.getVoices();
    if (voices && voices.length > 0) {
      doSpeak();
    } else {
      synthRef.current.onvoiceschanged = () => {
        synthRef.current.onvoiceschanged = null;
        doSpeak();
      };
    }
  }, [candidateConfig.voiceGender, getSelectedVoice]);

  // ── Initialize Speech Recognition ──────────────────────────────────────
  // Use a ref to track whether we WANT recognition active so we can auto-restart
  const wantsListeningRef = useRef(false);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available in this browser.');
      setIsTypingMode(true);
      return;
    }

    wantsListeningRef.current = true;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped
      }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let newFinal = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const confidence = result[0].confidence;
        const text = result[0].transcript;

        if (result.isFinal) {
          // Discard clearly low-confidence garbled results (< 0.35)
          // but accept them if confidence is 0 (some browsers don't report it)
          if (confidence === 0 || confidence >= 0.35) {
            newFinal += text + ' ';
          }
        } else {
          interim += text;
        }
      }

      if (newFinal) {
        currentAnswerAccumulator.current += newFinal;
      }
      setCurrentSpokenInput(currentAnswerAccumulator.current + interim);
    };

    recognition.onerror = (event) => {
      console.warn('SpeechRecognition error:', event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        wantsListeningRef.current = false;
        setIsListening(false);
        setIsTypingMode(true);
      } else if (event.error === 'no-speech') {
        // No-speech is normal — don't treat it as failure; recognition.onend will auto-restart
      } else if (event.error === 'network') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-restart only if we still want to be listening (prevents mic from "pausing")
      if (wantsListeningRef.current) {
        setTimeout(() => {
          if (wantsListeningRef.current && recognitionRef.current === recognition) {
            try {
              recognition.start();
              setIsListening(true);
            } catch {
              // If restart fails, create a new instance next time startListening is called
              recognitionRef.current = null;
            }
          }
        }, 300);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
    }
  }, []);

  const stopListening = useCallback(() => {
    wantsListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // ── Handle moving to next question ────────────────────────────────────
  const loadTurn = useCallback(async (index, previousCandidateAnswer = '') => {
    setIsProcessingTurn(true);

    try {
      const turn = await getNextInterviewTurn({
        questionIndex: index,
        candidateName: candidateConfig.candidateName,
        skills: candidateConfig.skills,
        projects: candidateConfig.projects,
        resumeSummary: candidateConfig.resumeSummary,
        targetRole: candidateConfig.targetRole,
        chatHistory: transcript,
        latestCandidateAnswer: previousCandidateAnswer
      });

      const qText = turn.interviewerText;
      setCurrentQuestionText(qText);
      setTranscript(prev => [...prev, { role: 'interviewer', text: qText, timestamp: new Date().toLocaleTimeString() }]);

      // Speak aloud
      speakText(qText, () => {
        // After speaking ends, start listening if not muted
        if (!isMuted && !isTypingMode) {
          startListening();
        }
      });
    } catch (err) {
      console.error('Error fetching question:', err);
    } finally {
      setIsProcessingTurn(false);
    }
  }, [candidateConfig, transcript, isMuted, isTypingMode, speakText, startListening]);

  // Initial Question 1 (Self Intro) on Mount
  useEffect(() => {
    loadTurn(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Countdown Timer (8 minutes) ───────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Submit Current Answer & Advance ───────────────────────────────────
  const handleSubmitAnswer = () => {
    stopListening();
    if (synthRef.current) synthRef.current.cancel();

    const answer = (isTypingMode ? typedInput : currentSpokenInput).trim();
    const finalAnswer = answer || "(Candidate moved to next question)";

    // Record Q&A
    const updatedQAPairs = [
      ...qaPairs,
      { question: currentQuestionText, answer: finalAnswer }
    ];
    setQaPairs(updatedQAPairs);

    setTranscript(prev => [
      ...prev,
      { role: 'candidate', text: finalAnswer, timestamp: new Date().toLocaleTimeString() }
    ]);

    // Reset inputs
    currentAnswerAccumulator.current = '';
    setCurrentSpokenInput('');
    setTypedInput('');

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= 6) {
      // Completed all 6 structured questions
      handleFinishInterview(updatedQAPairs);
    } else {
      setCurrentQuestionIndex(nextIndex);
      loadTurn(nextIndex, finalAnswer);
    }
  };

  // ── Conclude Interview ────────────────────────────────────────────────
  const handleFinishInterview = useCallback((completedQAPairs = qaPairs) => {
    stopListening();
    if (synthRef.current) synthRef.current.cancel();

    const durationTaken = 480 - secondsRemaining;
    onComplete({
      candidateConfig,
      qaPairs: completedQAPairs.length > 0 ? completedQAPairs : [
        { question: currentQuestionText, answer: currentSpokenInput || typedInput || "Self introduction completed." }
      ],
      durationSeconds: durationTaken,
      transcript
    });
  }, [stopListening, secondsRemaining, onComplete, candidateConfig, qaPairs, currentQuestionText, currentSpokenInput, typedInput, transcript]);

  // Format time mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const STAGE_LABELS = [
    "Q1: Self-Introduction (Compulsory)",
    "Q2: Project Architecture",
    "Q3: Problem Solving & Debugging",
    "Q4: Core Skill Deep-Dive",
    "Q5: Real-World Scenario",
    "Q6: Cultural & HR Fit"
  ];

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '16px',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Top Bar: Progress & Timer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--surface)',
        padding: '12px 20px',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px'
      }}>
        {/* Candidate & Stage */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Professional AI interviewer icon — no emoji */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(99,102,241,0.4)'
          }}>
            {/* AI chip / circuit SVG icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7" y="7" width="10" height="10" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M10 9.5h4M10 12h4M10 14.5h2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M9 4v3M12 4v3M15 4v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 17v3M12 17v3M15 17v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 9h3M4 12h3M4 15h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M17 9h3M17 12h3M17 15h3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              AI Interviewer
            </div>
            <div style={{ fontSize: '0.78rem', color: '#a855f7', fontWeight: 600 }}>
              {STAGE_LABELS[currentQuestionIndex] || `Question ${currentQuestionIndex + 1} of 6`}
            </div>
          </div>
        </div>

        {/* 8-Min Countdown Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: secondsRemaining < 90 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.15)',
          border: `1px solid ${secondsRemaining < 90 ? '#ef4444' : '#6366f1'}`,
          padding: '6px 14px',
          borderRadius: '20px',
          color: secondsRemaining < 90 ? '#ef4444' : '#818cf8',
          fontWeight: 700,
          fontSize: '1.05rem',
          fontVariantNumeric: 'tabular-nums'
        }}>
          <span>⏱️</span>
          <span>{formatTime(secondsRemaining)}</span>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => {
              if (window.confirm('Cancel call and return to resume upload?')) {
                stopListening();
                if (synthRef.current) synthRef.current.cancel();
                onExit?.();
              }
            }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            ✕ Exit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to end the interview call now? Your scorecard will be generated based on questions completed so far.')) {
                handleFinishInterview();
              }
            }}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔴 Finish & Score
          </button>
        </div>
      </div>

      {/* Main Calling Stage: Visual Orb & Transcript */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        flex: 1
      }}>
        {/* Glowing Audio Visualizer Card */}
        <div style={{
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, var(--surface) 70%)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          borderRadius: '20px',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Pulsing AI Orb */}
          <motion.div
            animate={{
              scale: isAiSpeaking ? [1, 1.2, 1.06, 1.25, 1] : isListening ? [1, 1.06, 1] : 1,
              boxShadow: isAiSpeaking
                ? [
                    '0 0 20px rgba(99,102,241,0.4)',
                    '0 0 50px rgba(168,85,247,0.8)',
                    '0 0 25px rgba(99,102,241,0.6)'
                  ]
                : isListening
                ? '0 0 25px rgba(16,185,129,0.5)'
                : '0 0 8px rgba(99,102,241,0.15)'
            }}
            transition={{
              duration: isAiSpeaking ? 1.4 : 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: isAiSpeaking
                ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                : isListening
                ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
                : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '16px'
            }}
          >
            {isAiSpeaking ? (
              /* Sound waves / speaking icon */
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" fillOpacity="0.9"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M18.07 5.93a9 9 0 0 1 0 12.14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : isListening ? (
              /* Microphone icon */
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="white"/>
                <path d="M5 10a7 7 0 0 0 14 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M12 17v4M9 21h6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              /* Headphones / paused icon */
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <rect x="3" y="14" width="4" height="7" rx="2" fill="white"/>
                <rect x="17" y="14" width="4" height="7" rx="2" fill="white"/>
              </svg>
            )}
          </motion.div>

          {/* Status Label */}
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: isAiSpeaking ? '#ec4899' : isListening ? '#10b981' : 'var(--muted)',
            marginBottom: '12px',
            letterSpacing: '0.5px'
          }}>
            {isProcessingTurn
              ? '⚡ AI is analyzing your response...'
              : isAiSpeaking
              ? 'AI Interviewer is speaking...'
              : isListening
              ? 'Listening to you... Speak now'
              : 'Microphone paused'}
          </div>

          {/* Current Question Display */}
          <div style={{
            maxWidth: '720px',
            textAlign: 'center',
            fontSize: '1.15rem',
            fontWeight: 600,
            lineHeight: 1.5,
            color: 'var(--text)',
            padding: '12px 18px',
            borderRadius: '12px',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            marginBottom: '16px'
          }}>
            "{currentQuestionText || 'Loading question...'}"
          </div>

          {/* Repeat Question Button */}
          <button
            onClick={() => speakText(currentQuestionText)}
            disabled={isAiSpeaking}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontSize: '0.8rem',
              cursor: isAiSpeaking ? 'not-allowed' : 'pointer',
              textDecoration: 'underline'
            }}
          >
            🔄 Repeat Question Aloud
          </button>
        </div>

        {/* Live Transcript / Response Section */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '260px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)' }}>
              📝 LIVE TRANSCRIPT
            </span>
            <button
              onClick={() => setIsTypingMode(!isTypingMode)}
              style={{
                background: isTypingMode ? '#6366f1' : 'transparent',
                border: '1px solid #6366f1',
                color: isTypingMode ? '#fff' : '#818cf8',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isTypingMode ? '🎙️ Switch to Voice Mic' : '⌨️ Switch to Type Mode'}
            </button>
          </div>

          {/* Transcript Scroll Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingRight: '6px'
          }}>
            {transcript.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'candidate' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: msg.role === 'candidate' ? 'rgba(99, 102, 241, 0.12)' : 'var(--surface2)',
                  border: msg.role === 'candidate' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--border)',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                  color: 'var(--text)'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: msg.role === 'candidate' ? '#6366f1' : '#ec4899', fontWeight: 700, marginBottom: '2px' }}>
                  {msg.role === 'candidate' ? 'You' : 'Interviewer'} • {msg.timestamp}
                </div>
                {msg.text}
              </div>
            ))}

            {/* Live unconfirmed speech */}
            {isListening && currentSpokenInput && (
              <div style={{
                alignSelf: 'flex-end',
                maxWidth: '85%',
                padding: '8px 12px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px dashed #10b981',
                fontSize: '0.85rem',
                color: '#10b981',
                fontStyle: 'italic'
              }}>
                Speaking: {currentSpokenInput}
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>

          {/* Typing Fallback Input */}
          <AnimatePresence>
            {isTypingMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: '12px' }}
              >
                <textarea
                  rows={2}
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  placeholder="Type your response here..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '0.88rem',
                    resize: 'none'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Mic toggle */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              if (isListening) {
                stopListening();
                setIsMuted(true);
              } else {
                startListening();
                setIsMuted(false);
              }
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: isListening ? '#10b981' : 'var(--surface3, #e2e8f0)',
              color: isListening ? '#fff' : 'var(--text)',
              border: '1px solid var(--border)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isListening ? '🎙️ Mic Active' : '🔇 Mic Muted (Click to talk)'}
          </button>
        </div>

        {/* Advance / Submit Turn */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              if (window.confirm('Skip this question and move to the next?')) {
                handleSubmitAnswer();
              }
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            ⏭️ Skip Question
          </button>

          <button
            onClick={handleSubmitAnswer}
            disabled={isProcessingTurn || isAiSpeaking}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: isProcessingTurn || isAiSpeaking ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>✅</span> Submit Answer & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
