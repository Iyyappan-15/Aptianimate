// src/pages/AskPage.jsx
import { useState, useEffect, useRef } from "react";
import { parseUserQuestion } from "../api/groqApi";
import AnimationPlayer from "../components/AnimationPlayer";

const HISTORY_KEY = "ask_ai_history";
const MAX_HISTORY = 8;
const STATES = { IDLE: "idle", LOADING: "loading", SUCCESS: "success", ERROR: "error" };

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}
function saveToHistory(q) {
  const existing = loadHistory().filter(x => x !== q);
  localStorage.setItem(HISTORY_KEY, JSON.stringify([q, ...existing].slice(0, MAX_HISTORY)));
}

export default function AskPage({ navigate, initialQuery = "" }) {
  const [question, setQuestion] = useState(initialQuery);
  const [state, setState] = useState(STATES.IDLE);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [history, setHistory] = useState(loadHistory);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // base64 string
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) handleSubmit(null, initialQuery.trim());
    else setTimeout(() => textareaRef.current?.focus(), 300);
  }, []); // eslint-disable-line

  const handleSubmit = async (e, overrideQ) => {
    if (e) e.preventDefault();
    const q = (overrideQ !== undefined ? overrideQ : question).trim();
    if (!q && !selectedImage) return; // Allow empty question if image is present
    setState(STATES.LOADING);
    setResult(null); setErrorMsg("");
    setSelectedOption(null); setShowExplanation(false); setShowFollowUp(false);
    
    // Only save to history if there is text
    if (q) {
      saveToHistory(q);
      setHistory(loadHistory());
    }

    try {
      const data = await parseUserQuestion(q, selectedImage);
      setResult(data);
      setState(STATES.SUCCESS);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setState(STATES.ERROR);
    }
  };

  const handleReset = () => {
    setState(STATES.IDLE); setResult(null); setErrorMsg("");
    setSelectedOption(null); setShowExplanation(false); setShowFollowUp(false);
    setSelectedImage(null);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => setSelectedImage(event.target.result);
    reader.readAsDataURL(file);
    // Clear file input so same file can be selected again
    e.target.value = '';
  };

  const handleHistoryClick = (q) => { setQuestion(q); handleSubmit(null, q); };
  const handleFollowUp = (q) => { setQuestion(q.question); handleSubmit(null, q.question); };

  return (
    <div className="page" style={{ animation: "fadeIn 0.4s ease", maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(20,184,166,0.1))", border: "1px solid var(--border)", borderRadius: "100px", padding: "6px 18px", fontSize: "0.85rem", fontWeight: "600", color: "var(--violet)", marginBottom: "16px" }}>
          ✨ Visual AI Solver
        </div>
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: "800", margin: "0 0 10px", lineHeight: 1.2 }}>
          Ask Any Aptitude Question
        </h1>
        <p style={{ color: "var(--text-sec)", fontSize: "1rem", margin: "0 0 8px" }}>
          Type any question and get an instant step-by-step animated visual explanation.
        </p>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>
          Press <kbd style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "1px 6px", fontFamily: "monospace" }}>Ctrl</kbd> + <kbd style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "1px 6px", fontFamily: "monospace" }}>Enter</kbd> to submit
        </div>
      </div>

      {/* Input Form */}
      {(state === STATES.IDLE || state === STATES.ERROR) && (
        <form className="ai-solver-form" onSubmit={handleSubmit}>
          <div className="ai-solver-input-container">
            <div className="ai-solver-input-wrap">
              <textarea
                ref={textareaRef}
                className="ai-solver-textarea"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit(e); }}
                placeholder={"Paste or type any aptitude question here...\n\ne.g. \"The average marks of 4 students are 40, 50, 60, 70. Find the overall average.\"\ne.g. \"A train 130m long crosses a 245m bridge at 45 km/hr. Find the time.\""}
                rows={4}
              />
              <div className="ai-solver-hint">
                Press Ctrl + Enter to submit
              </div>
            </div>

            <div className="ai-solver-upload-wrap">
              <button
                type="button"
                className={`ai-solver-upload-btn ${selectedImage ? 'has-image' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                title="Upload Image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />

              {selectedImage && (
                <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid var(--violet)' }}>
                  <img src={selectedImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >✕</button>
                </div>
              )}
            </div>
          </div>

          {state === STATES.ERROR && (
            <div className="ai-solver-error">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="ai-solver-submit"
            disabled={!question.trim() && !selectedImage}
          >
            <span>✨ Solve Visually</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      )}

      {/* Loading */}
      {state === STATES.LOADING && (
        <div style={{ textAlign: "center", padding: "48px 24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--violet)", animation: `askBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
          </div>
          <p style={{ color: "var(--text-sec)", fontSize: "1.05rem", fontWeight: "600", margin: "0 0 8px" }}>🧠 AI is solving this visually...</p>
          <div style={{ maxWidth: "480px", margin: "0 auto", padding: "10px 16px", background: "var(--surface2)", borderRadius: "10px", color: "var(--text-muted)", fontSize: "0.9rem", fontStyle: "italic" }}>
            "{question.length > 110 ? question.slice(0, 110) + "..." : question}"
          </div>
        </div>
      )}

      {/* Result */}
      {state === STATES.SUCCESS && result && (
        <div style={{ animation: "fadeIn 0.5s ease", marginBottom: "32px" }}>
          {/* Meta */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {[`📂 ${result.topic || result.category}`, result.subTopic && `🏷️ ${result.subTopic}`, `💡 ${result.concept || result.concept_name}`, result.difficulty === "Easy" ? "🟢 Easy" : result.difficulty === "Hard" ? "🔴 Hard" : "🟡 Medium", result.verification?.verified && "✅ Verified"].filter(Boolean).map((tag, i) => (
              <span key={i} style={{ padding: "4px 12px", borderRadius: "100px", fontSize: "0.8rem", fontWeight: "600", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-sec)" }}>{tag}</span>
            ))}
          </div>
          {/* Question */}
          <div style={{ padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", marginBottom: "16px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "var(--violet)", color: "#fff", fontWeight: "900", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center" }}>Q</span>
            <p style={{ margin: 0, color: "var(--text-main)", fontSize: "1rem", lineHeight: 1.6 }}>{result.question_text}</p>
          </div>
          {/* Options */}
          {result.options && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              {Object.entries(result.options).map(([key, val]) => {
                const isSelected = selectedOption === key, isCorrect = result.correct_answer === key, revealed = selectedOption !== null;
                let bg = "var(--surface)", border = "2px solid var(--border)", color = "var(--text-main)";
                if (revealed && isCorrect) { bg = "rgba(16,185,129,0.1)"; border = "2px solid #10B981"; color = "#10B981"; }
                else if (revealed && isSelected) { bg = "rgba(239,68,68,0.1)"; border = "2px solid #EF4444"; color = "#EF4444"; }
                else if (revealed) { bg = "var(--surface2)"; color = "var(--text-muted)"; }
                return (
                  <div key={key} onClick={() => !selectedOption && setSelectedOption(key)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: bg, border, borderRadius: "10px", cursor: selectedOption ? "default" : "pointer", transition: "all 0.2s", color }}>
                    <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: isCorrect && revealed ? "#10B981" : "var(--surface2)", color: isCorrect && revealed ? "#fff" : "inherit", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.85rem", border: "1px solid var(--border)" }}>{key}</span>
                    <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>{val}</span>
                    {revealed && isCorrect && <span style={{ marginLeft: "auto", fontWeight: "800" }}>✓</span>}
                    {revealed && isSelected && !isCorrect && <span style={{ marginLeft: "auto", fontWeight: "800" }}>✕</span>}
                  </div>
                );
              })}
            </div>
          )}
          {/* CTA after selection */}
          {selectedOption && !showExplanation && (
            <div style={{ padding: "16px 20px", borderRadius: "12px", marginBottom: "16px", background: selectedOption === result.correct_answer ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${selectedOption === result.correct_answer ? "#10B981" : "#EF4444"}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ fontWeight: "700", color: selectedOption === result.correct_answer ? "#10B981" : "#EF4444" }}>
                {selectedOption === result.correct_answer ? "🎉 Correct! Great job." : `Oops! Option ${selectedOption} is incorrect.`}
              </span>
              <button onClick={() => setShowExplanation(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, var(--violet), var(--teal))", color: "#fff", border: "none", borderRadius: "8px", padding: "9px 20px", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer" }}>
                🎬 View Visual Explanation →
              </button>
            </div>
          )}
          {/* Animation Player */}
          {showExplanation && (
            <div style={{ animation: "slideUp 0.6s ease", display: "flex", flexDirection: "column", gap: "20px" }}>
              {result.animation_script?.length > 0 && (
                <AnimationPlayer animationScript={result.animation_script} conceptSummary={result.concept_summary || result.concept} formula={result.formula} verification={result.verification} onComplete={() => setTimeout(() => setShowFollowUp(true), 800)} />
              )}
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(20,184,166,0.08))", border: "1px solid var(--border)", display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ flexShrink: 0, width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, var(--violet), var(--teal))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>🎯</div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Correct Answer</div>
                  <div style={{ fontWeight: "800", fontSize: "1.1rem", color: "var(--text-main)" }}>Option {result.correct_answer}: {result.options?.[result.correct_answer]}</div>
                </div>
              </div>
              {showFollowUp && result.follow_up_questions?.length > 0 && (
                <div style={{ animation: "slideUp 0.5s ease" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>🔁 Try a Similar Question</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {result.follow_up_questions.slice(0, 2).map((q, i) => (
                      <button key={i} onClick={() => handleFollowUp(q)} style={{ textAlign: "left", padding: "12px 16px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-main)", cursor: "pointer", fontWeight: "500", fontSize: "0.9rem" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = "var(--violet)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; }}>
                        {q.question.length > 100 ? q.question.slice(0, 100) + "..." : q.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <button onClick={handleReset} style={{ marginTop: "24px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", padding: 0 }}>
            ← Ask another question
          </button>
        </div>
      )}

      {/* History Panel */}
      {(state === STATES.IDLE || state === STATES.ERROR) && history.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
            🕐 Recent Questions
            <button onClick={() => { localStorage.removeItem(HISTORY_KEY); setHistory([]); }} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.8rem" }}>Clear</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {history.map((q, i) => (
              <button key={i} onClick={() => handleHistoryClick(q)} style={{ textAlign: "left", padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-sec)", cursor: "pointer", fontWeight: "500", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "10px", transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--violet)"; e.currentTarget.style.color = "var(--text-main)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}>
                <span style={{ flexShrink: 0 }}>↩</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.length > 95 ? q.slice(0, 95) + "..." : q}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes askBounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }`}</style>
    </div>
  );
}
