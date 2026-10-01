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
        voices.find(v => /female|zira|samantha|karen|victoria|google uk english female/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0]
      );
    } else {
      return (
        voices.find(v => /male|david|daniel|george|google uk english male/i.test(v.name)) ||
        voices.find(v => v.lang.startsWith('en')) ||
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
    const utterance = new SpeechSynthesisUtterance(text);
    const chosenVoice = getSelectedVoice();
    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.rate = 1.0;
    utterance.pitch = candidateConfig.voiceGender === 'female' ? 1.1 : 0.95;

    utterance.onstart = () => {
      setIsAiSpeaking(true);
      // Temporarily pause recognition so AI doesn't hear itself
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }
    };

    utterance.onend = () => {
      setIsAiSpeaking(false);
      onFinish?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsAiSpeaking(false);
      onFinish?.();
    };

    synthRef.current.speak(utterance);
  }, [candidateConfig.voiceGender, getSelectedVoice, isListening]);

  // ── Initialize Speech Recognition ──────────────────────────────────────
  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available in this browser.');
      setIsTypingMode(true);
      return;
    }

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
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        currentAnswerAccumulator.current += final;
      }
      setCurrentSpokenInput(currentAnswerAccumulator.current + interim);
    };

    recognition.onerror = (event) => {
      console.warn('SpeechRecognition error:', event.error);
      if (event.error === 'not-allowed') {
        setIsListening(false);
        setIsTypingMode(true);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      console.warn('Failed to start speech recognition:', e);
    }
  }, []);

  const stopListening = useCallback(() => {
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
        background: 'var(--card-bg, #1e293b)',
        padding: '12px 20px',
        borderRadius: '16px',
        border: '1px solid var(--border-color, #334155)',
        marginBottom: '20px'
      }}>
        {/* Candidate & Stage */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: candidateConfig.voiceGender === 'female' ? '#ec4899' : '#3b82f6',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 700
          }}>
            {candidateConfig.voiceGender === 'female' ? '👩' : '👨'}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              AI Interviewer ({candidateConfig.voiceGender === 'female' ? 'Female' : 'Male'} Voice)
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
              border: '1px solid var(--border-color, #334155)',
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
          background: 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, var(--card-bg, #1e293b) 70%)',
          border: '1px solid var(--border-color, #334155)',
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
              scale: isAiSpeaking ? [1, 1.25, 1.08, 1.3, 1] : isListening ? [1, 1.08, 1] : 1,
              boxShadow: isAiSpeaking
                ? [
                    '0 0 20px rgba(236,72,153,0.4)',
                    '0 0 50px rgba(236,72,153,0.8)',
                    '0 0 25px rgba(99,102,241,0.6)'
                  ]
                : isListening
                ? '0 0 25px rgba(16,185,129,0.5)'
                : '0 0 10px rgba(99,102,241,0.2)'
            }}
            transition={{
              duration: isAiSpeaking ? 1.5 : 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: isAiSpeaking
                ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)'
                : isListening
                ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
                : 'linear-gradient(135deg, #475569 0%, #334155 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#fff',
              marginBottom: '16px'
            }}
          >
            {isAiSpeaking ? '🗣️' : isListening ? '🎙️' : '🎧'}
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
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid var(--border-color, #334155)',
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
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid var(--border-color, #334155)',
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
                  background: msg.role === 'candidate' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: msg.role === 'candidate' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color, #334155)',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                  color: 'var(--text)'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: msg.role === 'candidate' ? '#818cf8' : '#ec4899', fontWeight: 700, marginBottom: '2px' }}>
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
                background: 'rgba(16, 185, 129, 0.15)',
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
                    background: 'var(--bg, #0f172a)',
                    border: '1px solid #6366f1',
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
              background: isListening ? '#10b981' : '#334155',
              color: '#fff',
              border: 'none',
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
              border: '1px solid var(--border-color, #334155)',
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
