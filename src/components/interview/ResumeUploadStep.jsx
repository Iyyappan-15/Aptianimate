// src/components/interview/ResumeUploadStep.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractTextFromPDF, extractTextFromDOCX, analyzeParsedResume } from '../../utils/resumeParser';
import { getActiveGroqKey, saveGroqKey } from '../../services/aiInterviewService';

export default function ResumeUploadStep({ onStartInterview }) {
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [parsedData, setParsedData] = useState(null);

  // User configuration options
  const [candidateName, setCandidateName] = useState('');
  const [voiceGender, setVoiceGender] = useState('female'); // 'female' | 'male'
  const [targetRole, setTargetRole] = useState('Full-Stack Software Engineer');
  const [skillsList, setSkillsList] = useState([]);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Mic check test state
  const [micStatus, setMicStatus] = useState('idle'); // 'idle' | 'testing' | 'success' | 'error'
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);

  // Groq API Key Modal
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [groqKeyInput, setGroqKeyInput] = useState(getActiveGroqKey() || '');
  const [keySavedMsg, setKeySavedMsg] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (uploadedFile) => {
    if (!uploadedFile) return;
    setErrorMsg('');
    setFile(uploadedFile);
    setIsParsing(true);

    try {
      let rawText = '';
      if (uploadedFile.name.endsWith('.pdf')) {
        rawText = await extractTextFromPDF(uploadedFile);
      } else if (uploadedFile.name.endsWith('.docx')) {
        rawText = await extractTextFromDOCX(uploadedFile);
      } else {
        throw new Error('Please upload a PDF (.pdf) or Word (.docx) document.');
      }

      if (!rawText || rawText.trim().length < 40) {
        throw new Error('Could not extract text. The document might be image-only or scanned. Please upload a text-based resume.');
      }

      const analyzed = analyzeParsedResume(rawText);
      setParsedData(analyzed);
      setCandidateName(analyzed.name);
      setSkillsList(analyzed.skills.length > 0 ? analyzed.skills : ['JavaScript', 'Problem Solving', 'SQL']);
    } catch (err) {
      console.error('Resume parse error:', err);
      setErrorMsg(err.message || 'Failed to process resume file.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (newSkillInput.trim() && !skillsList.includes(newSkillInput.trim())) {
        setSkillsList(prev => [...prev, newSkillInput.trim()]);
        setNewSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(prev => prev.filter(s => s !== skillToRemove));
  };

  // Test microphone audio
  const handleTestMic = async () => {
    setMicStatus('testing');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 64;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let count = 0;

      const checkVolume = () => {
        if (!micStreamRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round(avg * 1.5)));

        count++;
        if (count < 30) {
          requestAnimationFrame(checkVolume);
        } else {
          // Finish mic test
          setMicStatus('success');
          stopMicTest();
        }
      };
      requestAnimationFrame(checkVolume);
    } catch (err) {
      console.error('Microphone access denied:', err);
      setMicStatus('error');
    }
  };

  const stopMicTest = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
  };

  const handleSaveKey = () => {
    saveGroqKey(groqKeyInput);
    setKeySavedMsg(true);
    setTimeout(() => {
      setKeySavedMsg(false);
      setShowKeyModal(false);
    }, 1200);
  };

  const handleLaunch = () => {
    if (!parsedData) {
      setErrorMsg('Please upload a resume first.');
      return;
    }

    onStartInterview({
      candidateName: candidateName || 'Candidate',
      voiceGender,
      targetRole,
      skills: skillsList,
      projects: parsedData.projects,
      resumeSummary: parsedData.rawText
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '32px' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(99,102,241,0.15))',
          padding: '6px 16px',
          borderRadius: '24px',
          border: '1px solid rgba(236,72,153,0.3)',
          marginBottom: '12px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🎙️</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ec4899', letterSpacing: '0.5px' }}>
            AI-POWERED VOICE INTERVIEW
          </span>
          <span style={{ background: '#ec4899', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
            8 MIN CALL
          </span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0 12px', color: 'var(--text)' }}>
          Real-Time Voice Mock Interview
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Upload your resume. Our AI interviewer analyzes your projects and conducts a live 8-minute screening call with voice dialogue and comprehensive scorecard evaluation.
        </p>
      </motion.div>

      {/* Main Grid: Upload on Left / Details on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        {/* Step 1: Upload Card */}
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid var(--border-color, #334155)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📄</span> 1. Upload Your Resume
            </h3>

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #6366f1',
                borderRadius: '12px',
                padding: '36px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(99,102,241,0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              />
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                {isParsing ? '⏳' : file ? '📑' : '📤'}
              </div>
              <p style={{ fontWeight: 600, margin: '0 0 6px', color: 'var(--text)' }}>
                {isParsing ? 'Reading & Analyzing Resume...' : file ? file.name : 'Drop your resume PDF or DOCX here'}
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                {file ? `${(file.size / 1024).toFixed(1)} KB • Click to replace` : 'Click to browse files (Client-side private parsing)'}
              </span>
            </div>

            {errorMsg && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                fontSize: '0.88rem'
              }}>
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Compulsory Q1 Badge */}
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.4rem' }}>⭐</span>
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#10b981', display: 'block' }}>
                  Question 1 is Compulsory: Self-Introduction
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                  Questions 2 to 6 will be automatically generated from your resume projects and skills.
                </span>
              </div>
            </div>
          </div>

          {/* Quick API Key Trigger */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color, #334155)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
              Engine: <strong style={{ color: '#6366f1' }}>Groq Llama 3.1 & 3.3</strong>
            </span>
            <button
              onClick={() => setShowKeyModal(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#a855f7',
                fontSize: '0.82rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ⚙️ {getActiveGroqKey() ? 'Custom Groq Key Active' : 'Configure Custom Key (Optional)'}
            </button>
          </div>
        </div>

        {/* Step 2: Settings & Detected Profile */}
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          border: '1px solid var(--border-color, #334155)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚙️</span> 2. Call Preferences
            </h3>

            {/* Candidate Name Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '6px' }}>
                Candidate Name
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg, #0f172a)',
                  border: '1px solid var(--border-color, #334155)',
                  color: 'var(--text, #fff)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* Voice Gender Toggle */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '6px' }}>
                Interviewer Voice
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setVoiceGender('female')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: voiceGender === 'female' ? '2px solid #ec4899' : '1px solid var(--border-color, #334155)',
                    background: voiceGender === 'female' ? 'rgba(236,72,153,0.15)' : 'var(--bg, #0f172a)',
                    color: voiceGender === 'female' ? '#ec4899' : 'var(--text)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  👩 Female Voice
                </button>
                <button
                  type="button"
                  onClick={() => setVoiceGender('male')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: voiceGender === 'male' ? '2px solid #3b82f6' : '1px solid var(--border-color, #334155)',
                    background: voiceGender === 'male' ? 'rgba(59,130,246,0.15)' : 'var(--bg, #0f172a)',
                    color: voiceGender === 'male' ? '#3b82f6' : 'var(--text)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  👨 Male Voice
                </button>
              </div>
            </div>

            {/* Target Role Selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '6px' }}>
                Target Company & Role Style
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg, #0f172a)',
                  border: '1px solid var(--border-color, #334155)',
                  color: 'var(--text, #fff)',
                  fontSize: '0.9rem'
                }}
              >
                <option value="Full-Stack Software Engineer">🚀 Full-Stack / Software Engineer</option>
                <option value="TCS / Service-Based Placement Drive">🏢 Service-Based (TCS / Infosys / Cognizant)</option>
                <option value="Product-Based Tech Startup">⚡ Product-Based Tech Company (System & Logic)</option>
                <option value="Frontend Developer (React / Web)">🎨 Frontend Web Specialist</option>
                <option value="Backend & Database Engineer">⚙️ Backend & API Engineer</option>
              </select>
            </div>

            {/* Detected Skills */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '6px' }}>
                Detected Skills ({skillsList.length})
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '100px', overflowY: 'auto', marginBottom: '8px' }}>
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(99,102,241,0.15)',
                      color: '#a5b4fc',
                      fontSize: '0.78rem',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      style={{ background: 'transparent', border: 'none', color: '#a5b4fc', cursor: 'pointer', padding: 0 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="+ Add another skill..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  style={{
                    flex: 1,
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg, #0f172a)',
                    border: '1px solid var(--border-color, #334155)',
                    color: 'var(--text)',
                    fontSize: '0.82rem'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Microphone Diagnostic Check */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'var(--bg, #0f172a)',
              border: '1px solid var(--border-color, #334155)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: 'var(--text)' }}>
                  🎙️ Mic Diagnostic Check
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {micStatus === 'idle' && 'Test your microphone before calling'}
                  {micStatus === 'testing' && `Speak now... Volume: ${audioLevel}%`}
                  {micStatus === 'success' && '✅ Mic working properly!'}
                  {micStatus === 'error' && '❌ Mic permission denied. You can still type.'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleTestMic}
                disabled={micStatus === 'testing'}
                style={{
                  background: micStatus === 'success' ? '#10b981' : '#334155',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {micStatus === 'testing' ? 'Testing...' : micStatus === 'success' ? 'Retest' : 'Test Mic'}
              </button>
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={handleLaunch}
            disabled={!parsedData}
            style={{
              marginTop: '24px',
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              background: parsedData
                ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)'
                : '#475569',
              color: '#fff',
              border: 'none',
              fontSize: '1.05rem',
              fontWeight: 700,
              cursor: parsedData ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: parsedData ? '0 4px 18px rgba(236,72,153,0.35)' : 'none',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>📞</span> Start 8-Minute Mock Interview Call
          </button>
        </div>
      </div>

      {/* Groq Key Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              zIndex: 9999
            }}
          >
            <div style={{
              background: 'var(--card-bg, #1e293b)',
              border: '1px solid var(--border-color, #334155)',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--text)' }}>
                🔑 Configure Custom Groq API Key
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Groq offers ultra-fast AI inference (~750 tokens/sec) and a 100% free tier (14,400 requests/day). 
                Adding your own key ensures zero wait time and dedicated rate limits.
              </p>

              <input
                type="password"
                placeholder="gsk_..."
                value={groqKeyInput}
                onChange={(e) => setGroqKeyInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg, #0f172a)',
                  border: '1px solid var(--border-color, #334155)',
                  color: 'var(--text)',
                  fontSize: '0.9rem',
                  marginBottom: '16px'
                }}
              />

              {keySavedMsg && (
                <div style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: '12px' }}>
                  ✅ Key saved successfully!
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color, #334155)',
                    color: 'var(--text)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveKey}
                  style={{
                    background: '#6366f1',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Save Key
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
