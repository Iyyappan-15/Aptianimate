// src/pages/ResumePreparationPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeUserResume } from '../api/groqApi';

// ── Dynamic Script Loaders for CDN Parsing ──────────────────────────────────────
async function loadPdfJS() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => {
      window.pdfjsLib = window['pdfjs-dist/build/pdf'];
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error('Failed to load PDF parsing library.'));
    document.head.appendChild(script);
  });
}

async function loadMammoth() {
  if (window.mammoth) return window.mammoth;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
    script.onload = () => { resolve(window.mammoth); };
    script.onerror = () => reject(new Error('Failed to load DOCX parsing library.'));
    document.head.appendChild(script);
  });
}

// ── Text Extraction Helpers ─────────────────────────────────────────────────────
async function extractTextFromPDF(file) {
  const pdfjsLib = await loadPdfJS();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    text += pageText + '\n';
  }
  return text;
}

async function extractTextFromDOCX(file) {
  const mammoth = await loadMammoth();
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

// SHA-256 calculation for file contents (local only)
async function getFileHash(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Status Steps for Loading Screen ─────────────────────────────────────────────
const PROCESSING_STEPS = [
  { icon: '📄', label: 'Extracting resume text...' },
  { icon: '🧠', label: 'Understanding skills & domain...' },
  { icon: '🔨', label: 'Identifying projects from experience...' },
  { icon: '⚡', label: 'Detecting specific technologies...' },
  { icon: '🎯', label: 'Finding interview-readiness gaps...' },
  { icon: '💬', label: 'Generating personalized questions...' },
  { icon: '✅', label: 'Preparing your practice workspace...' },
];

// ── Animated SVG Score Ring ─────────────────────────────────────────────────────
function ScoreRing({ score, color }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const [animatedScore, setAnimatedScore] = useState(0);
  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(eased * score);
      const offset = circumference - (eased * score / 100) * circumference;
      setAnimatedScore(currentScore);
      setDashOffset(offset);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [score, circumference]);

  return (
    <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'none' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2px'
      }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 900, color, lineHeight: 1 }}>
          {animatedScore}
        </span>
        <span style={{ fontSize: '0.58rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          /100
        </span>
      </div>
    </div>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────────
export default function ResumePreparationPage({ navigate }) {
  // Application Modes: 'UPLOAD', 'PROCESSING', 'REPORT', 'PRACTICE'
  const [mode, setMode] = useState('UPLOAD');
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Resume Hash detection states
  const [resumeHash, setResumeHash] = useState('');
  const [showHashConflictModal, setShowHashConflictModal] = useState(false);
  const [pendingAnalysis, setPendingAnalysis] = useState(null);

  // Analysis result & question bank
  const [analysisResult, setAnalysisResult] = useState(null);

  // Dynamic list filters for practice mode
  const [selectedSection, setSelectedSection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);

  // Load saved analysis & bookmarks from localStorage on startup
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('resume_prep_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setAnalysisResult(parsed);
        setResumeHash(parsed.resumeHash || '');
        setMode('REPORT');
      }
      const savedBookmarks = localStorage.getItem('resume_question_bookmarks');
      if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));
      const savedCompleted = localStorage.getItem('resume_question_completed');
      if (savedCompleted) setCompletedIds(JSON.parse(savedCompleted));
    } catch (e) {
      console.error('Error loading saved resume data', e);
    }
  }, []);

  // Synchronize Bookmarks & Completions to LocalStorage
  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(x => x !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    localStorage.setItem('resume_question_bookmarks', JSON.stringify(updated));
  };

  const toggleCompleted = (id, e) => {
    e.stopPropagation();
    const updated = completedIds.includes(id)
      ? completedIds.filter(x => x !== id)
      : [...completedIds, id];
    setCompletedIds(updated);
    localStorage.setItem('resume_question_completed', JSON.stringify(updated));
  };

  // ── Drag & Drop Event Handlers ────────────────────────────────────────────────
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) handleFileSelection(e.target.files[0]);
  };

  // ── File validation and hash verification ─────────────────────────────────────
  const handleFileSelection = async (selectedFile) => {
    setErrorMsg(null);
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!validTypes.includes(selectedFile.type) && fileExtension !== 'pdf' && fileExtension !== 'docx') {
      setErrorMsg('Unsupported file format. Please upload a PDF or DOCX file.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 10 MB limit.');
      return;
    }
    setFile(selectedFile);
    try {
      const hash = await getFileHash(selectedFile);
      const savedData = localStorage.getItem('resume_prep_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.resumeHash === hash) {
          setResumeHash(hash);
          setPendingAnalysis(parsed);
          setShowHashConflictModal(true);
          return;
        }
      }
      await startExtraction(selectedFile, hash);
    } catch (e) {
      setErrorMsg(e.message || 'Error processing file.');
    }
  };

  // ── Text Extraction & AI Analysis Trigger ─────────────────────────────────────
  const startExtraction = async (selectedFile, hash) => {
    setMode('PROCESSING');
    setCurrentStepIdx(0);
    setErrorMsg(null);

    const stepInterval = setInterval(() => {
      setCurrentStepIdx(prev => {
        if (prev >= PROCESSING_STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, 1800);

    try {
      let text = '';
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      if (ext === 'pdf') text = await extractTextFromPDF(selectedFile);
      else text = await extractTextFromDOCX(selectedFile);

      if (!text || !text.trim()) {
        throw new Error('Unable to extract text content from the document. Please verify it is not corrupted or scanned.');
      }

      const result = await analyzeUserResume(text);

      const fullData = {
        ...result,
        resumeHash: hash,
        timestamp: new Date().toISOString()
      };

      clearInterval(stepInterval);
      for (let i = currentStepIdx; i < PROCESSING_STEPS.length; i++) {
        setCurrentStepIdx(i);
        await new Promise(r => setTimeout(r, 300));
      }

      localStorage.setItem('resume_prep_data', JSON.stringify(fullData));
      setAnalysisResult(fullData);
      setMode('REPORT');
    } catch (err) {
      clearInterval(stepInterval);
      setMode('UPLOAD');
      setErrorMsg(err.message || 'Analysis timed out or failed. Please check your network and try again.');
    }
  };

  // Reset module / Delete Analysis data
  const handleReset = () => {
    if (window.confirm('Are you sure you want to delete your current resume analysis and questions? This action cannot be undone.')) {
      localStorage.removeItem('resume_prep_data');
      localStorage.removeItem('resume_question_bookmarks');
      localStorage.removeItem('resume_question_completed');
      setFile(null);
      setAnalysisResult(null);
      setResumeHash('');
      setBookmarkedIds([]);
      setCompletedIds([]);
      setMode('UPLOAD');
    }
  };

  // Clipboard copy helper
  const handleCopyReport = () => {
    if (!analysisResult) return;
    const formatted = `APTIANIMATE RESUME ANALYSIS REPORT
Score: ${analysisResult.readinessScore}/100 (${analysisResult.scoreDescription})

STRENGTHS:
${analysisResult.strengths.map(s => `• ${s}`).join('\n')}

WEAKNESSES:
${analysisResult.weaknesses.map(w => `• [${w.severity}] ${w.weakness}\n  Suggestion: ${w.suggestion}`).join('\n\n')}

DETECTED SKILLS:
${analysisResult.detectedSkills.join(', ')}

DETECTED PROJECTS:
${analysisResult.detectedProjects.map(p => `• ${p.name} (${p.technologies.join(', ')}):\n  ${p.description}`).join('\n\n')}
`;
    navigator.clipboard.writeText(formatted);
    alert('Analysis report copied to clipboard! 📋');
  };

  const getSeverityStyle = (sev) => {
    const s = (sev || '').toLowerCase();
    if (s === 'critical') return { color: '#ef4444', label: '🔴 Critical' };
    if (s === 'medium') return { color: '#f59e0b', label: '🟡 Medium' };
    return { color: '#3b82f6', label: '🔵 Minor' };
  };

  // Question sections filtering
  const questions = analysisResult?.questions || [];
  const sections = ['All', ...new Set(questions.map(q => q.section))];

  const filteredQuestions = questions.filter(q => {
    const matchesSection = selectedSection === 'All' || q.section === selectedSection;
    const matchesSearch = searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.section || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  // ── Framer Motion Variants ────────────────────────────────────────────────────
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.07 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--surface2, #0f1115)', color: 'var(--text-main)', overflowX: 'hidden' }}>



      <div className="page-wide" style={{ position: 'relative', zIndex: 1, padding: '24px 24px 80px' }}>

        {/* ── Navigation / Header Bar ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: '28px', boxShadow: 'var(--shadow)'
          }}
        >
          <motion.button
            onClick={() => navigate('')}
            whileHover={{ scale: 1.03, x: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 16px',
              color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.color = '#3b82f6'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
          </motion.button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem', width: '34px', height: '34px', borderRadius: '8px', background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📄
            </span>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
              Resume Preparation
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MODE 1: UPLOAD                                                      */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {mode === 'UPLOAD' && (
            <motion.div
              key="upload"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ maxWidth: '680px', margin: '0 auto' }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ textAlign: 'center', marginBottom: '36px' }}
              >
                <motion.div variants={fadeUp}>
                  <h1 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '14px', lineHeight: 1.2, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                    Resume Preparation
                  </h1>
                </motion.div>
                <motion.p variants={fadeUp} style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.65, maxWidth: '540px', margin: '0 auto' }}>
                  Upload your resume and get AI-powered personalized interview questions based on your skills, projects, and experience.
                </motion.p>
              </motion.div>

              {/* Error Banner */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ background: '#ef444415', border: '1px solid #ef444435', color: '#ef4444', borderRadius: '16px', padding: '14px 18px', marginBottom: '24px', fontSize: '0.92rem', fontWeight: 500 }}
                  >
                    ⚠️ {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Drag and Drop Zone ─────────────────────────────────────────── */}
              <motion.div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload-input').click()}
                animate={{
                  scale: dragActive ? 1.015 : 1,
                  borderColor: dragActive ? 'var(--violet)' : 'var(--border)',
                  backgroundColor: dragActive ? 'var(--surface2)' : 'var(--surface)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                whileHover={{ scale: 1.005 }}
                style={{
                  border: '2px dashed',
                  borderRadius: '28px',
                  padding: '60px 32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >


                <input
                  id="file-upload-input"
                  type="file"
                  style={{ display: 'none' }}
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />

                {/* Cloud upload icon */}
                <motion.div
                  animate={dragActive ? { y: -6, scale: 1.1 } : { y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', fontSize: '1.9rem', transition: 'all 0.25s' }}>
                    {dragActive ? '📂' : '📄'}
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {dragActive ? (
                    <motion.div key="dragging" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                        Drop it here!
                      </h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Release to upload your resume</p>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>
                        Drag &amp; Drop your resume here
                      </h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                        or click anywhere to browse your files
                      </p>

                      <motion.span
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ display: 'inline-block', background: 'var(--violet)', color: '#fff', padding: '10px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.01em' }}
                      >
                        Upload Resume
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '28px', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>
                  <span>PDF</span>
                  <span>·</span>
                  <span>DOCX</span>
                  <span>·</span>
                  <span>Max 10 MB</span>
                </div>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}
              >
                {[
                  { label: 'Readiness Score' },
                  { label: 'Personalized Questions' },
                  { label: 'Strengths & Weaknesses' },
                  { label: 'Private & Secure' },
                ].map(({ label }) => (
                  <span key={label} style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '100px', padding: '5px 14px', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>
                    {label}
                  </span>
                ))}
              </motion.div>

              {/* Privacy note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ display: 'flex', gap: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px 18px', marginTop: '24px', alignItems: 'flex-start' }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>🛡️</span>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--text-sec)' }}>Privacy:</strong> Your resume is processed only to generate interview questions. The original file is discarded immediately after text extraction. Only your personalized preparation data is stored locally in your browser.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MODE 2: PROCESSING                                                  */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {mode === 'PROCESSING' && (
            <motion.div
              key="processing"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', padding: '32px 16px' }}
            >
              {/* Spinner */}
              <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 32px' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--violet)' }}
                />
                <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  ⚡
                </div>
              </div>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}
              >
                AI Analysis in Progress
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.15 } }}
                style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '32px' }}
              >
                This usually takes 10–20 seconds
              </motion.p>

              {/* ── Animated Step Timeline ─────────────────────────────────────── */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '28px', textAlign: 'left', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                {PROCESSING_STEPS.map((step, idx) => {
                  const isDone = idx < currentStepIdx;
                  const isActive = idx === currentStepIdx;
                  const isPending = idx > currentStepIdx;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.35 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 12px', borderRadius: '12px', marginBottom: idx < PROCESSING_STEPS.length - 1 ? '2px' : 0, background: isActive ? 'var(--surface2)' : 'transparent', transition: 'background 0.35s' }}
                    >
                      {/* Step indicator */}
                      <div style={{ width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: isDone ? 'var(--surface2)' : isActive ? 'var(--surface2)' : 'transparent', border: isDone ? '1px solid var(--border)' : isActive ? '1px solid var(--border)' : '1px solid transparent', transition: 'all 0.35s' }}>
                        {isDone ? (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: 'var(--violet)', fontWeight: 900, fontSize: '1rem' }}>✓</motion.span>
                        ) : isActive ? (
                          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>{step.icon}</motion.span>
                        ) : (
                          <span style={{ opacity: 0.4 }}>{step.icon}</span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500, color: isDone ? 'var(--text-main)' : isActive ? 'var(--text-main)' : 'var(--muted)', transition: 'all 0.3s' }}>
                        {step.label}
                      </span>

                      {/* Active pulse dot */}
                      {isActive && (
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--violet)', flexShrink: 0 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MODE 3: REPORT                                                      */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {mode === 'REPORT' && analysisResult && (
            <motion.div
              key="report"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
            >
              {/* ── Hero Header with Animated Score Ring ──────────────────────── */}
              <motion.div
                variants={fadeUp}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px', boxShadow: 'var(--shadow)' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                  {/* Animated Score Ring */}
                  <ScoreRing
                    score={analysisResult.readinessScore}
                    color={'var(--violet)'}
                  />

                  <div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                        color: 'var(--violet)',
                        background: 'var(--surface2)',
                        padding: '3px 10px', borderRadius: '6px', display: 'inline-block', marginBottom: '10px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {analysisResult.scoreDescription}
                    </motion.span>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                      Your Resume Evaluation
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: '6px 0 0' }}>
                      {analysisResult.detectedSkills.length} skills detected · {analysisResult.detectedProjects.length} projects identified · {analysisResult.questions.length} personalized questions
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCopyReport}
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '11px 20px', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}
                  >
                    📋 Copy Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMode('PRACTICE')}
                    style={{ background: 'var(--violet)', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 22px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', letterSpacing: '0.01em' }}
                  >
                    🎯 Practice Questions ({analysisResult.questions.length})
                  </motion.button>
                </div>
              </motion.div>

              {/* ── Strengths & Weaknesses ──────────────────────────────────────── */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="grid-2col">
                <style>{`@media (min-width: 768px) { .grid-2col { grid-template-columns: 1fr 1fr !important; } }`}</style>

                {/* Strengths */}
                <motion.div
                  variants={fadeUp}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                >
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet)', display: 'inline-block', flexShrink: 0 }} />
                    Resume Strengths
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {analysisResult.strengths.length > 0 ? (
                      analysisResult.strengths.map((str, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          whileHover={{ x: 2 }}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '11px 14px', cursor: 'default' }}
                        >
                          <span style={{ color: 'var(--violet)', fontWeight: 700, flexShrink: 0, marginTop: '3px', fontSize: '0.7rem' }}>✓</span>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500, lineHeight: 1.5 }}>{str}</span>
                        </motion.div>
                      ))
                    ) : (
                      <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No strengths noted.</span>
                    )}
                  </div>
                </motion.div>

                {/* Weaknesses */}
                <motion.div
                  variants={fadeUp}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                >
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet)', display: 'inline-block', flexShrink: 0 }} />
                    Areas to Improve
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {analysisResult.weaknesses.length > 0 ? (
                      analysisResult.weaknesses.map((weak, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          style={{ borderLeft: '3px solid var(--violet)', paddingLeft: '14px' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--violet)', background: 'var(--surface2)', padding: '2px 8px', borderRadius: '6px' }}>
                              {getSeverityStyle(weak.severity).label}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-main)' }}>
                            {weak.weakness}
                          </h4>
                          <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                            <strong style={{ color: 'var(--text-sec)' }}>Tip:</strong> {weak.suggestion}
                          </p>
                        </motion.div>
                      ))
                    ) : (
                      <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No readiness weaknesses detected. Excellent job!</span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* ── Skills ───────────────────────────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>⚡</span>
                  Detected Skills &amp; Expertise
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {analysisResult.detectedSkills.length > 0 ? (
                    analysisResult.detectedSkills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                        whileHover={{ y: -1 }}
                        style={{ fontSize: '0.82rem', color: 'var(--text-main)', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '5px 12px', fontWeight: 500, cursor: 'default' }}
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Not Mentioned</span>
                  )}
                </div>
              </motion.div>

              {/* ── Projects ─────────────────────────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '18px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🔨</span>
                  Detected Projects ({analysisResult.detectedProjects.length})
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }} className="grid-2col">
                  {analysisResult.detectedProjects.length > 0 ? (
                    analysisResult.detectedProjects.map((proj, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(0,0,0,0.05)' }}
                        style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '18px', transition: 'border-color 0.2s', cursor: 'default' }}
                        onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
                        onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-main)' }}>
                          {proj.name}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                          {proj.technologies.map(tech => (
                            <span key={tech} style={{ fontSize: '0.7rem', background: 'var(--surface)', color: 'var(--violet)', borderRadius: '6px', padding: '2px 8px', fontWeight: 700 }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                          {proj.description}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No specific projects detected.</span>
                  )}
                </div>
              </motion.div>

              {/* Reset */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleReset}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.75 }}
                  onMouseOver={e => e.currentTarget.style.opacity = 1}
                  onMouseOut={e => e.currentTarget.style.opacity = 0.75}
                >
                  🗑 Delete Report &amp; Upload Another Resume
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MODE 4: PRACTICE                                                    */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {mode === 'PRACTICE' && (
            <motion.div
              key="practice"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
            >
              {/* Header / Filter Toolbar */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                      My Resume Questions
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: '4px 0 0 0' }}>
                      Practice personalized questions tailored to your resume profile.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMode('REPORT')}
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '9px 18px', color: 'var(--text-main)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ← View Resume Report
                  </motion.button>
                </div>

                {/* Filters */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }} className="filters-grid">
                  <style>{`@media (min-width: 768px) { .filters-grid { grid-template-columns: 1fr 260px !important; } }`}</style>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search resume questions..."
                      style={{ width: '100%', padding: '11px 16px 11px 40px', borderRadius: '12px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                  </div>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    style={{ padding: '11px 16px', borderRadius: '12px', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="All">All Sections</option>
                    {sections.filter(s => s !== 'All').map(sec => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Questions List */}
              {filteredQuestions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {filteredQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestionId === q.id;
                    const isBookmarked = bookmarkedIds.includes(q.id);
                    const isCompleted = completedIds.includes(q.id);
                    return (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        whileHover={{ y: -1 }}
                        style={{
                          background: isCompleted ? 'rgba(16,185,129,0.02)' : 'var(--surface)',
                          border: `1px solid ${isCompleted ? '#10b98118' : 'var(--border)'}`,
                          borderRadius: '14px', padding: '18px', cursor: 'pointer',
                          transition: 'border-color 0.2s', boxShadow: 'var(--shadow)'
                        }}
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        onMouseOver={e => { if (!isCompleted) e.currentTarget.style.borderColor = 'var(--violet)'; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = isCompleted ? '#10b98118' : 'var(--border)'; }}
                      >
                        {/* Top row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ background: 'var(--surface2)', color: 'var(--violet)', borderRadius: '8px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: 700 }}>
                              {q.difficulty}
                            </span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>
                              {q.section}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={(e) => toggleCompleted(q.id, e)}
                              style={{ background: isCompleted ? '#10b981' : 'transparent', border: isCompleted ? 'none' : '1px solid var(--border)', width: '26px', height: '26px', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                              title="Mark as complete"
                            >
                              {isCompleted && <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 900 }}>✓</span>}
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={(e) => toggleBookmark(q.id, e)}
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontSize: '1.2rem', color: isBookmarked ? '#f59e0b' : 'var(--muted)', transition: 'color 0.2s' }}
                            >
                              ★
                            </motion.button>
                          </div>
                        </div>

                        <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px', color: isCompleted ? 'var(--muted)' : 'var(--text-main)', lineHeight: 1.45, textDecoration: isCompleted ? 'line-through' : 'none' }}>
                          {idx + 1}. {q.question}
                        </h4>

                        {/* Tags */}
                        {q.tags && q.tags.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                            {q.tags.map(tag => (
                              <span key={tag} style={{ fontSize: '0.72rem', color: 'var(--muted)', background: 'var(--surface2)', borderRadius: '6px', padding: '2px 8px', border: '1px solid var(--border)' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Expand chevron */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>
                          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'inline-block' }}>▾</motion.span>
                          {isExpanded ? 'Collapse answer' : 'Show answer & tips'}
                        </div>

                        {/* Expanded View */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ borderTop: '1px solid var(--border)', marginTop: '18px', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                {q.shortAnswer && (
                                  <div>
                                    <h5 style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Short Answer</h5>
                                    <div style={{ borderLeft: '3px solid var(--violet)', paddingLeft: '14px', color: 'var(--text-main)', fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.55 }}>
                                      {q.shortAnswer}
                                    </div>
                                  </div>
                                )}

                                {q.detailedAnswer && (
                                  <div>
                                    <h5 style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Detailed Explanation</h5>
                                    <p style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                                      {q.detailedAnswer}
                                    </p>
                                  </div>
                                )}

                                {q.keyPoints && q.keyPoints.length > 0 && (
                                  <div>
                                    <h5 style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Key Takeaways</h5>
                                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {q.keyPoints.map((kp, i) => (
                                        <li key={i} style={{ color: 'var(--text-sec)', fontSize: '0.9rem', lineHeight: 1.5 }}>{kp}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {q.commonMistakes && q.commonMistakes.length > 0 && (
                                  <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px 16px' }}>
                                    <h5 style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>⚠️ Common Mistakes</h5>
                                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {q.commonMistakes.map((cm, i) => (
                                        <li key={i} style={{ color: 'var(--text-sec)', fontSize: '0.9rem', lineHeight: 1.5 }}>{cm}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {q.codeExample && q.codeExample.code && (
                                  <div>
                                    <h5 style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Code Example ({q.codeExample.language})</h5>
                                    <pre style={{ background: 'var(--surface2)', color: 'var(--text-main)', padding: '16px', borderRadius: '12px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', margin: 0, border: '1px solid var(--border)' }}>
                                      <code>{q.codeExample.code}</code>
                                    </pre>
                                  </div>
                                )}

                                {q.interviewerExpectation && (
                                  <div style={{ border: '1px solid var(--violet)', background: 'var(--surface2)', borderRadius: '14px', padding: '14px 16px' }}>
                                    <h5 style={{ fontSize: '0.78rem', color: 'var(--violet)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>🎯 Interviewer Expectation</h5>
                                    <p style={{ color: 'var(--text-sec)', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
                                      {q.interviewerExpectation}
                                    </p>
                                  </div>
                                )}

                                {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                                  <div>
                                    <h5 style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Follow-up Questions</h5>
                                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                      {q.followUpQuestions.map((fq, i) => (
                                        <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>{fq}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}
                >
                  <span style={{ fontSize: '2.5rem', marginBottom: '14px', display: 'block' }}>🔍</span>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>No questions match filters</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Try clearing your search query or selecting a different section.</p>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── SHA-256 Conflict Resolution Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {showHashConflictModal && pendingAnalysis && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px', maxWidth: '420px', width: '90%', boxShadow: '0 16px 40px rgba(0,0,0,0.35)', textAlign: 'center' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '12px' }}>
                Existing Analysis Found
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '28px' }}>
                You've already analyzed this resume. Would you like to use the existing analysis or generate a fresh one?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setAnalysisResult(pendingAnalysis); localStorage.setItem('resume_prep_data', JSON.stringify(pendingAnalysis)); setShowHashConflictModal(false); setPendingAnalysis(null); setMode('REPORT'); }}
                  style={{ background: 'var(--violet)', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Use Existing Analysis
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={async () => { setShowHashConflictModal(false); setPendingAnalysis(null); await startExtraction(file, resumeHash); }}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '13px', color: 'var(--text-main)', fontWeight: 800, cursor: 'pointer', fontSize: '0.92rem' }}
                >
                  Generate Fresh Analysis
                </motion.button>
                <motion.button
                  whileHover={{ opacity: 1 }}
                  onClick={() => { setShowHashConflictModal(false); setPendingAnalysis(null); setFile(null); }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', marginTop: '4px', opacity: 0.7 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
