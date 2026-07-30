// src/pages/ResumePreparationPage.jsx
import { useState, useEffect, useRef } from 'react';
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
    script.onload = () => {
      resolve(window.mammoth);
    };
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
  'Extracting Resume text...',
  'Understanding skills and domain...',
  'Identifying projects from experience...',
  'Detecting specific technologies...',
  'Finding interview-readiness weaknesses...',
  'Generating personalized interview questions...',
  'Preparing your practice workspace...'
];

export default function ResumePreparationPage({ navigate }) {
  // Application Modes: 'UPLOAD', 'PROCESSING', 'REPORT', 'PRACTICE'
  const [mode, setMode] = useState('UPLOAD');
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [extractedText, setExtractedText] = useState('');
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
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
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
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
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
      
      // If same hash is found in existing analysis, ask the user
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
      
      // Proceed to parse if no conflict
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

    // Dynamic timer for updating process animation steps
    const stepInterval = setInterval(() => {
      setCurrentStepIdx(prev => {
        if (prev >= PROCESSING_STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, 1800);

    try {
      let text = '';
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      if (ext === 'pdf') {
        text = await extractTextFromPDF(selectedFile);
      } else {
        text = await extractTextFromDOCX(selectedFile);
      }

      if (!text || !text.trim()) {
        throw new Error('Unable to extract text content from the document. Please verify it is not corrupted or scanned.');
      }

      setExtractedText(text);

      // Perform AI Analysis on backend
      const result = await analyzeUserResume(text);
      
      // Save locally
      const fullData = {
        ...result,
        resumeHash: hash,
        timestamp: new Date().toISOString()
      };
      
      // Complete remaining loading steps with small delay
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
      setExtractedText('');
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
    
    const formatted = `APTINIMATE RESUME ANALYSIS REPORT
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

  // Score styling config
  const getScoreColor = (score) => {
    if (score >= 85) return { border: '#10b981', bg: '#10b98115', text: '#10b981' };
    if (score >= 70) return { border: '#3b82f6', bg: '#3b82f615', text: '#3b82f6' };
    if (score >= 50) return { border: '#f59e0b', bg: '#f59e0b15', text: '#f59e0b' };
    return { border: '#ef4444', bg: '#ef444415', text: '#ef4444' };
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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--surface2, #0f1115)', color: 'var(--text-main)' }}>
      {/* Background ambient mesh */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      <div className="page-wide" style={{ position: 'relative', zIndex: 1, padding: '24px 24px 80px' }}>
        {/* Navigation / Header Bar */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '24px', padding: '16px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '32px', boxShadow: 'var(--shadow)'
        }}>
          <button
            onClick={() => navigate('')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 16px',
              color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.color = '#3b82f6'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem', width: '36px', height: '36px', borderRadius: '8px', background: '#3b82f615', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📄
            </span>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
              Resume Preparation
            </div>
          </div>
        </div>

        {/* ── MODE 1: UPLOAD ────────────────────────────────────────────────────── */}
        {mode === 'UPLOAD' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '12px', background: 'linear-gradient(135deg, #3b82f6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Resume Preparation
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto' }}>
                Upload your resume and generate personalized interview questions based on your skills, projects, and experience.
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#ef444415', border: '1px solid #ef444430', color: '#ef4444', borderRadius: '16px', padding: '16px', marginBottom: '24px', fontSize: '0.92rem', fontWeight: 500 }}>
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Drag and Drop Card */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              style={{
                background: 'var(--surface)',
                border: dragActive ? '2px dashed #3b82f6' : '1px dashed var(--border)',
                borderRadius: '24px',
                padding: '48px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
                transition: 'all 0.25s',
                position: 'relative'
              }}
              onClick={() => document.getElementById('file-upload-input').click()}
            >
              <input
                id="file-upload-input"
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
              
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📂</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>
                Drag & Drop your resume here
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
                or click to browse your files
              </p>
              
              <span style={{
                background: '#3b82f6', color: '#fff', padding: '10px 24px', borderRadius: '12px',
                fontWeight: 700, fontSize: '0.9rem', display: 'inline-block', transition: 'transform 0.15s'
              }}>
                Upload Resume
              </span>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '32px', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>
                <span>Formats: PDF, DOCX</span>
                <span>•</span>
                <span>Max size: 10 MB</span>
              </div>
            </div>

            {/* Privacy note */}
            <div style={{
              display: 'flex', gap: '12px', background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '16px', marginTop: '32px'
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>🛡️</span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                <strong>Privacy Note:</strong> Your uploaded resume is processed only to generate interview questions. The original file is permanently discarded immediately after text extraction. Only your personalized interview preparation data is stored locally in your browser.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── MODE 2: PROCESSING ────────────────────────────────────────────────── */}
        {mode === 'PROCESSING' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center', padding: '48px 16px' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 28px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, #3b82f6, #10b981, #3b82f6)', animation: 'spin 1.8s linear infinite', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: '6px', borderRadius: '50%', background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem' }}>⚡</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              AI Parsing & Analysis
            </h3>
            
            {/* Steps tracker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', textAlign: 'left', marginTop: '24px', boxShadow: 'var(--shadow)' }}>
              {PROCESSING_STEPS.map((step, idx) => {
                const isDone = idx < currentStepIdx;
                const isActive = idx === currentStepIdx;
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: isDone ? 1 : isActive ? 1 : 0.4, transition: 'all 0.3s' }}>
                    <span style={{ fontSize: '1rem', color: isDone ? '#10b981' : '#3b82f6', fontWeight: 800 }}>
                      {isDone ? '✓' : isActive ? '⏳' : '•'}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text-main)' : 'var(--muted)' }}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── MODE 3: REPORT ────────────────────────────────────────────────────── */}
        {mode === 'REPORT' && analysisResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Hero Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '28px', padding: '32px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
                {/* Readiness Score circle */}
                <div style={{
                  position: 'relative', width: '110px', height: '110px', borderRadius: '50%',
                  border: `8px solid ${getScoreColor(analysisResult.readinessScore).border}`,
                  background: getScoreColor(analysisResult.readinessScore).bg,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: getScoreColor(analysisResult.readinessScore).text }}>
                    {analysisResult.readinessScore}
                  </span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                    Readiness
                  </span>
                </div>

                <div>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: getScoreColor(analysisResult.readinessScore).text, background: `${getScoreColor(analysisResult.readinessScore).border}15`,
                    padding: '4px 10px', borderRadius: '8px', display: 'inline-block', marginBottom: '8px'
                  }}>
                    {analysisResult.scoreDescription}
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                    Your Resume Evaluation
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                    Personalized questions generated based on {analysisResult.detectedSkills.length} skills and {analysisResult.detectedProjects.length} projects.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleCopyReport}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
                    padding: '12px 20px', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  Copy Report
                </button>
                <button
                  onClick={() => setMode('PRACTICE')}
                  style={{
                    background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px',
                    padding: '12px 24px', fontWeight: 800, cursor: 'pointer', fontSize: '0.88rem', transition: 'all 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Practice Questions ({analysisResult.questions.length})
                </button>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="grid-2col">
              <style>{`
                @media (min-width: 768px) {
                  .grid-2col { grid-template-columns: 1fr 1fr !important; }
                }
              `}</style>
              
              {/* Strengths */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✓ Resume Strengths
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analysisResult.strengths.length > 0 ? (
                    analysisResult.strengths.map((str, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#10b98108', border: '1px solid #10b98115', borderRadius: '12px', padding: '12px 14px' }}>
                        <span style={{ color: '#10b981', fontWeight: 800 }}>★</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 550 }}>{str}</span>
                      </div>
                    ))
                  ) : (
                    <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No strengths noted.</span>
                  )}
                </div>
              </div>

              {/* Weaknesses */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚠ Preparation Areas (Weaknesses)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {analysisResult.weaknesses.length > 0 ? (
                    analysisResult.weaknesses.map((weak, idx) => (
                      <div key={idx} style={{ borderLeft: `3px solid ${getSeverityStyle(weak.severity).color}`, paddingLeft: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: getSeverityStyle(weak.severity).color, background: `${getSeverityStyle(weak.severity).color}15`, padding: '2px 6px', borderRadius: '4px' }}>
                            {getSeverityStyle(weak.severity).label}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-main)' }}>
                          {weak.weakness}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.4 }}>
                          <strong style={{ color: 'var(--text-sec)' }}>Tip:</strong> {weak.suggestion}
                        </p>
                      </div>
                    ))
                  ) : (
                    <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No readiness weaknesses detected. Excellent job!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Projects */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
                Detected Skills & Expertise
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysisResult.detectedSkills.length > 0 ? (
                  analysisResult.detectedSkills.map(skill => (
                    <span key={skill} style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px', fontWeight: 600 }}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Not Mentioned</span>
                )}
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
                Detected Projects ({analysisResult.detectedProjects.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="grid-2col">
                {analysisResult.detectedProjects.length > 0 ? (
                  analysisResult.detectedProjects.map((proj, idx) => (
                    <div key={idx} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-main)' }}>
                        {proj.name}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {proj.technologies.map(tech => (
                          <span key={tech} style={{ fontSize: '0.72rem', background: '#3b82f615', color: '#3b82f6', borderRadius: '4px', padding: '1px 6px', fontWeight: 700 }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                        {proj.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>No specific projects detected.</span>
                )}
              </div>
            </div>

            {/* Reset Card */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button
                onClick={handleReset}
                style={{
                  background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 700,
                  fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                🗑 Delete Report & Upload Another Resume
              </button>
            </div>
          </motion.div>
        )}

        {/* ── MODE 4: PRACTICE ──────────────────────────────────────────────────── */}
        {mode === 'PRACTICE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Header / Filter Toolbar */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: 'var(--shadow)' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                    My Resume Questions
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: '2px 0 0 0' }}>
                    Practice personalized questions targeted precisely to your resume profile.
                  </p>
                </div>
                
                <button
                  onClick={() => setMode('REPORT')}
                  style={{
                    background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px',
                    padding: '8px 16px', color: 'var(--text-main)', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  View Resume Report
                </button>
              </div>

              {/* Filters */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="filters-grid">
                <style>{`
                  @media (min-width: 768px) {
                    .filters-grid { grid-template-columns: 1fr 260px !important; }
                  }
                `}</style>
                
                {/* Search box */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search my resume questions..."
                    style={{
                      width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                </div>

                {/* Section filter tabs */}
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  style={{
                    padding: '12px 16px', borderRadius: '12px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer'
                  }}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestionId === q.id;
                  const isBookmarked = bookmarkedIds.includes(q.id);
                  const isCompleted = completedIds.includes(q.id);
                  const difficultyColor = q.difficulty === 'Easy' ? '#10b981' : q.difficulty === 'Medium' ? '#f59e0b' : '#ef4444';

                  return (
                    <div
                      key={q.id}
                      style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '20px', padding: '20px', cursor: 'pointer',
                        transition: 'border-color 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                      }}
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'}
                      onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      {/* Top Header Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            background: `${difficultyColor}15`, color: difficultyColor,
                            borderRadius: '8px', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 700
                          }}>
                            {q.difficulty}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--muted)' }}>
                            {q.section}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button
                            onClick={(e) => toggleCompleted(q.id, e)}
                            style={{
                              background: isCompleted ? '#10b981' : 'transparent',
                              border: isCompleted ? 'none' : '1px solid var(--border)',
                              width: '24px', height: '24px', borderRadius: '6px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            {isCompleted && <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>}
                          </button>

                          <button
                            onClick={(e) => toggleBookmark(q.id, e)}
                            style={{
                              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                              fontSize: '1.2rem', color: isBookmarked ? '#f59e0b' : 'var(--muted2)'
                            }}
                          >
                            ★
                          </button>
                        </div>
                      </div>

                      {/* Question Content */}
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                        {idx + 1}. {q.question}
                      </h4>

                      {/* Expanded View */}
                      {isExpanded && (
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '20px', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div>
                            <h5 style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Short Answer</h5>
                            <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '16px', color: 'var(--text-main)', fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.5 }}>
                              {q.shortAnswer}
                            </div>
                          </div>

                          <div>
                            <h5 style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Detailed Explanation</h5>
                            <p style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                              {q.detailedAnswer}
                            </p>
                          </div>

                          {q.keyPoints && q.keyPoints.length > 0 && (
                            <div>
                              <h5 style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Key Takeaways</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {q.keyPoints.map((kp, i) => (
                                  <li key={i} style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.5 }}>{kp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {q.commonMistakes && q.commonMistakes.length > 0 && (
                            <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '16px', padding: '16px' }}>
                              <h5 style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                                ⚠️ Common Mistakes
                              </h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {q.commonMistakes.map((cm, i) => (
                                  <li key={i} style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.5 }}>{cm}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {q.codeExample && q.codeExample.code && (
                            <div>
                              <h5 style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Code Implementation ({q.codeExample.language})</h5>
                              <pre style={{ background: '#1e2028', color: '#f8fafc', padding: '16px', borderRadius: '12px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', margin: 0 }}>
                                <code>{q.codeExample.code}</code>
                              </pre>
                            </div>
                          )}

                          {q.interviewerExpectation && (
                            <div style={{ border: '1px solid #3b82f625', background: '#3b82f603', borderRadius: '16px', padding: '16px' }}>
                              <h5 style={{ fontSize: '0.82rem', color: '#3b82f6', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>🎯 Interviewer Expectation</h5>
                              <p style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                                {q.interviewerExpectation}
                              </p>
                            </div>
                          )}

                          {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                            <div>
                              <h5 style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Follow-up Questions</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {q.followUpQuestions.map((fq, i) => (
                                  <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>{fq}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '48px', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', marginBottom: '16px', display: 'block' }}>🔍</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>No questions match filters</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Try clearing your search query or selecting a different section.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ── SHA-256 Conflict Resolution Modal ──────────────────────────────────────── */}
      {showHashConflictModal && pendingAnalysis && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px', maxWidth: '440px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>📄</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '12px' }}>
              Existing Analysis Found
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
              You have already uploaded and analyzed this resume. Would you like to use the existing analysis or generate a fresh one?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setAnalysisResult(pendingAnalysis);
                  localStorage.setItem('resume_prep_data', JSON.stringify(pendingAnalysis));
                  setShowHashConflictModal(false);
                  setPendingAnalysis(null);
                  setMode('REPORT');
                }}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Use Existing Analysis
              </button>
              <button
                onClick={async () => {
                  setShowHashConflictModal(false);
                  setPendingAnalysis(null);
                  await startExtraction(file, resumeHash);
                }}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', color: 'var(--text-main)', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Generate Fresh Analysis
              </button>
              <button
                onClick={() => {
                  setShowHashConflictModal(false);
                  setPendingAnalysis(null);
                  setFile(null);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', marginTop: '8px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic Keyframe Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
