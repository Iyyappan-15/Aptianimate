// src/pages/TopicPage.jsx — Premium Topic Learning Experience
import { useState, useEffect, useRef } from "react";
import { topicService } from "../services/topicService";
import AISolver from "../components/AISolver";
import { useAuth } from "../contexts/AuthContext";
import { addQuestionBookmark, removeQuestionBookmark, findQuestionBookmark } from "../repositories/questionBookmarkRepository";
import { recordBulkSessions } from "../repositories/analyticsRepository";
import { getTopicCategoryPath } from "../utils/categoryMapper";
import TopicSkeleton from "../components/TopicSkeleton";
import DataInterpretationVisualizer from "../components/DataInterpretationVisualizer";

const TOPIC_META = {
  default:                  { difficulty: "Medium", time: 30, concepts: 8,  questions: 80,  desc: "Master this topic with step-by-step visual lessons and guided practice." },
  "number-system-basics":   { difficulty: "Easy",   time: 35, concepts: 10, questions: 120, desc: "Master factors, multiples, prime numbers, divisibility, remainders, unit digits and key placement shortcuts." },
  "lcm-hcf":                { difficulty: "Easy",   time: 25, concepts: 7,  questions: 90,  desc: "Understand HCF, LCM, their golden relationship, and how to quickly solve tile, bell, and rope problems." },
  "percentages":            { difficulty: "Easy",   time: 30, concepts: 9,  questions: 100, desc: "Master percentage calculations, percentage change, and the fraction-percent conversion table used in DI." },
  "profit-loss":            { difficulty: "Medium", time: 35, concepts: 11, questions: 110, desc: "Learn CP, SP, profit %, loss %, marked price, discount, and successive discount in a logical visual flow." },
  "simple-interest":        { difficulty: "Easy",   time: 20, concepts: 6,  questions: 70,  desc: "Understand SI formula, its applications, and how to reverse-calculate any variable from P, R, T, or I." },
  "compound-interest":      { difficulty: "Medium", time: 30, concepts: 8,  questions: 85,  desc: "Visualize compounding periods, derive CI from SI, and master shortcuts for 2-4 year questions." },
  "time-work":              { difficulty: "Medium", time: 40, concepts: 10, questions: 95,  desc: "Learn the 1-day work concept, pipe problems, efficiency ratios, and MDH formula for man-day-hours." },
  "time-speed-distance":    { difficulty: "Medium", time: 35, concepts: 10, questions: 100, desc: "Understand D=ST deeply, relative speed, average speed traps, and meeting-point problems." },
  "data-interpretation":    { difficulty: "Hard",   time: 45, concepts: 8,  questions: 80,  desc: "Master reading bar charts, line graphs, pie charts, and mixed DI tables at exam speed." },
  "algebra":                { difficulty: "Hard",   time: 40, concepts: 12, questions: 85,  desc: "Solve for unknowns using identities, quadratics, and the x+1/x shortcut used heavily in SSC." },
  "geometry":               { difficulty: "Hard",   time: 45, concepts: 14, questions: 75,  desc: "Master triangle properties, circle tangent rules, angle chasing, and congruency shortcuts." },
  "mensuration":            { difficulty: "Hard",   time: 45, concepts: 16, questions: 80,  desc: "Calculate areas and volumes for all 2D and 3D shapes, and use scaling rules for fast solving." },
};
const getMeta = (slug) => TOPIC_META[slug] || TOPIC_META.default;
const DIFF_COLOR = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444" };

const PRACTICE_LEVELS = [
  { id: "easy",   emoji: "🟢", label: "Easy Practice",    count: 25, color: "#10b981", desc: "Build confidence with straightforward questions" },
  { id: "medium", emoji: "🟡", label: "Medium Practice",  count: 25, color: "#f59e0b", desc: "Standard exam-level questions with twists" },
  { id: "hard",   emoji: "🟠", label: "Hard Practice",    count: 25, color: "#f97316", desc: "Tricky questions that trip most candidates" },
  { id: "mixed",  emoji: "🔴", label: "Mixed Challenge",  count: 100, color: "#ef4444", desc: "All levels combined for real exam simulation" },
];

// ─── Universal answer resolver ─────────────────────────────────────────────
// Handles 3 formats found in different JSON files:
//   1. number  (0-3) — most generated topics (e.g. percentages, error-spotting)
//   2. letter  (A/B/C/D) — number-series, letter-series etc.
//   3. string  (exact text) — number-system-basics
function resolveCorrectIndex(question) {
  const ca = question.correctAnswer;
  const opts = question.options || [];
  if (typeof ca === "number") return ca; // already an index
  if (typeof ca === "string") {
    // Letter A/B/C/D ?
    const letter = ca.trim().toUpperCase();
    if (/^[A-D]$/.test(letter)) return letter.charCodeAt(0) - 65;
    // Otherwise find exact text match
    const idx = opts.indexOf(ca);
    return idx >= 0 ? idx : 0;
  }
  return 0;
}

function isAnswerCorrect(question, selectedOption) {
  const correctIdx = resolveCorrectIndex(question);
  return selectedOption === (question.options || [])[correctIdx];
}

function getCorrectText(question) {
  const correctIdx = resolveCorrectIndex(question);
  return (question.options || [])[correctIdx] || "";
}

function renderOption(opt, letter) {
  if (typeof opt === 'object' && opt !== null) {
    if (opt.image) return <img src={opt.image} alt={`Option ${letter}`} style={{ maxHeight:"100px", maxWidth:"100%", borderRadius:"8px", objectFit:"contain", display:"block" }} />;
    return opt.text || JSON.stringify(opt);
  }
  return String(opt);
}

function getOptionString(opt) {
  if (typeof opt === 'object' && opt !== null) return opt.text || "(Image Option)";
  return String(opt || "");
}

function buildLessons(topic) {
  const lessons = [];
  lessons.push({ type: "intro",    heading: "What is " + topic.title + "?", body: topic.description, icon: topic.icon });
  (topic.keyFacts || []).forEach((f, i) => lessons.push({ type: "concept",  heading: f.label, body: f.value, index: i + 1 }));
  (topic.formulas || []).forEach((f, i) => lessons.push({ type: "formula",  heading: f.title, formula: f.formula, example: f.example, index: i + 1 }));
  if (topic.identify && topic.identify.length) lessons.push({ type: "identify", heading: "How to spot this question type?", items: topic.identify });
  (topic.approach || []).forEach(a => lessons.push({ type: "approach", heading: "Step " + a.step + ": Fast Solving Tip", body: a.tip }));
  lessons.push({ type: "quiz", heading: "Quick Knowledge Check", body: "Use the AI Solver below to test yourself on " + topic.title + ". Type a question and get an instant animated solution!" });
  return lessons;
}

function LessonSlide({ lesson, color, topicName, onNext, isLast }) {
  const nextBtn = (
    <button onClick={onNext} style={{ marginTop: 28, padding: "14px 32px", borderRadius: 12, border: "none", background: "linear-gradient(135deg," + color + "," + color + "bb)", color: "#fff", fontWeight: 800, fontSize: "1rem", cursor: "pointer", transition: "transform .15s" }}>
      {isLast ? "Go to Practice Mode 🎯" : "Got it! Next →"}
    </button>
  );
  const topBar = <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg," + color + "," + color + "55)" }} />;
  const card = { background: "var(--surface)", border: "1px solid " + color + "44", borderRadius: 20, padding: 36, animation: "fadeIn .4s ease", position: "relative", overflow: "hidden", marginBottom: 0 };

  if (lesson.type === "intro") return <div style={card}>{topBar}<div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20 }}><span style={{ fontSize:"3rem" }}>{lesson.icon}</span><h2 style={{ fontSize:"1.6rem",fontWeight:900,color:"var(--text-main)",margin:0 }}>{lesson.heading}</h2></div><p style={{ fontSize:"1.05rem",lineHeight:1.8,color:"var(--text-sec)",borderLeft:"4px solid "+color,paddingLeft:16 }}>{lesson.body}</p>{nextBtn}</div>;
  if (lesson.type === "concept") return <div style={card}>{topBar}<div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}><div style={{ width:36,height:36,borderRadius:"50%",background:color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800 }}>{lesson.index}</div><span style={{ fontSize:".8rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"2px" }}>Key Concept</span></div><h2 style={{ fontSize:"1.4rem",fontWeight:900,color:"var(--text-main)",marginBottom:16 }}>{lesson.heading}</h2><div style={{ background:color+"11",border:"1px solid "+color+"33",borderRadius:12,padding:20,fontSize:"1.05rem",color:"var(--text-main)",fontWeight:500 }}>{lesson.body}</div>{nextBtn}</div>;
  if (lesson.type === "formula") return <div style={card}>{topBar}<div style={{ fontSize:".8rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"2px",marginBottom:8 }}>📐 Formula</div><h2 style={{ fontSize:"1.4rem",fontWeight:900,color:"var(--text-main)",marginBottom:20 }}>{lesson.heading}</h2><div style={{ background:"#0f0f1a",borderRadius:14,padding:24,textAlign:"center",marginBottom:16,border:"1px solid "+color+"44" }}><div style={{ fontSize:"1.8rem",fontWeight:900,color,fontFamily:"monospace",letterSpacing:"2px" }}>{lesson.formula}</div></div>{lesson.example&&<div style={{ background:"var(--surface2)",borderRadius:10,padding:"14px 18px",fontSize:".9rem",color:"var(--text-sec)",marginBottom:8 }}><span style={{ fontWeight:700,color }}>Example: </span>{lesson.example}</div>}{nextBtn}</div>;
  if (lesson.type === "identify") return <div style={card}>{topBar}<div style={{ fontSize:".8rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"2px",marginBottom:8 }}>🔍 Recognition</div><h2 style={{ fontSize:"1.4rem",fontWeight:900,color:"var(--text-main)",marginBottom:20 }}>{lesson.heading}</h2><div style={{ display:"flex",flexDirection:"column",gap:10 }}>{lesson.items.map((item,i)=><div key={i} style={{ display:"flex",alignItems:"flex-start",gap:12,background:"var(--surface2)",borderRadius:10,padding:"12px 16px" }}><div style={{ width:8,height:8,borderRadius:"50%",background:color,marginTop:6,flexShrink:0 }}/><span style={{ fontSize:".95rem",color:"var(--text-main)" }}>{item}</span></div>)}</div>{nextBtn}</div>;
  if (lesson.type === "approach") return <div style={card}>{topBar}<div style={{ fontSize:".8rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"2px",marginBottom:8 }}>⚡ Speed Trick</div><h2 style={{ fontSize:"1.4rem",fontWeight:900,color:"var(--text-main)",marginBottom:20 }}>{lesson.heading}</h2><div style={{ background:color+"11",border:"2px solid "+color+"44",borderRadius:14,padding:"20px 24px",fontSize:"1.05rem",color:"var(--text-main)",fontWeight:500,lineHeight:1.7 }}>💡 {lesson.body}</div>{nextBtn}</div>;
  if (lesson.type === "quiz") return <div style={card}>{topBar}<div style={{ fontSize:".8rem",fontWeight:700,color,textTransform:"uppercase",letterSpacing:"2px",marginBottom:8 }}>🧠 Quick Check</div><h2 style={{ fontSize:"1.4rem",fontWeight:900,color:"var(--text-main)",marginBottom:12 }}>{lesson.heading}</h2><p style={{ color:"var(--text-sec)",marginBottom:20 }}>{lesson.body}</p><AISolver topicColor={color} topicName={topicName}/><button onClick={onNext} style={{ marginTop:24,padding:"14px 32px",borderRadius:12,border:"none",background:"#10b981",color:"#fff",fontWeight:800,fontSize:"1rem",cursor:"pointer" }}>✅ Done — Start Practice</button></div>;
  return null;
}

export default function TopicPage({ topicSlug, topicName, navigate }) {
  const { user } = useAuth();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("overview");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [practiceLevel, setPracticeLevel] = useState(null);
  const [stats, setStats] = useState(null);
  const startRef = useRef(null);
  const meta = getMeta(topicSlug);

  // Practice Mode states
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);

  // Bookmark states
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    topicService.getTopicBySlug(topicSlug).then(d => { setTopic(d); setLoading(false); });
  }, [topicSlug]);

  // Check bookmark status whenever active question changes
  useEffect(() => {
    const activeQuestion = questionsList[currentQuestionIdx];
    if (!user || !activeQuestion) {
      setIsBookmarked(false);
      setBookmarkId(null);
      return;
    }
    findQuestionBookmark(user.id, activeQuestion.question).then(result => {
      if (result) {
        setIsBookmarked(true);
        setBookmarkId(result.id);
      } else {
        setIsBookmarked(false);
        setBookmarkId(null);
      }
    });
  }, [currentQuestionIdx, questionsList, user]);

  const handleToggleBookmark = async () => {
    const activeQuestion = questionsList[currentQuestionIdx];
    if (!user || user.is_anonymous) {
      alert('Please sign in with Google to bookmark questions and save your progress!');
      return;
    }
    if (!activeQuestion || bookmarkLoading) return;
    setBookmarkLoading(true);
    try {
      if (isBookmarked && bookmarkId) {
        await removeQuestionBookmark(bookmarkId);
        setIsBookmarked(false);
        setBookmarkId(null);
      } else {
        const saved = await addQuestionBookmark(user.id, topicSlug, topic?.title || topicName, activeQuestion);
        if (saved) {
          setIsBookmarked(true);
          setBookmarkId(saved.id);
        }
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  // ─── Load questions when practice level selected ─────────────────────────
  useEffect(() => {
    if (screen !== "practice" || !practiceLevel) return;

    setLoadingQuestions(true);
    setErrorMessage(null);
    setQuestionsList([]);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setCorrectCount(0);
    setIsBookmarked(false);
    setBookmarkId(null);
    setSessionResults([]);

    const categoryPath = getTopicCategoryPath(topicSlug);
    const url = `/data/${categoryPath}/${topicSlug}.json`;

    console.log(`[TopicPage] Fetching questions from: ${url}`);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
        return res.json();
      })
      .then(data => {
        // Normalise: support both array and { questions: [] }
        let qs = Array.isArray(data) ? data : (data && data.questions) ? data.questions : [];

        if (qs.length === 0) {
          throw new Error("No questions found in data file.");
        }

        // Filter by difficulty
        let filtered = qs;
        if (practiceLevel.id !== "mixed") {
          const diffName = practiceLevel.id.charAt(0).toUpperCase() + practiceLevel.id.slice(1);
          const byDiff = qs.filter(q => (q.difficulty || "").toLowerCase() === practiceLevel.id);
          filtered = byDiff.length > 0 ? byDiff : qs; // graceful fallback to all
        }

        // Shuffle and slice
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, practiceLevel.count);

        setQuestionsList(selected);
        setLoadingQuestions(false);
      })
      .catch(err => {
        console.error("[TopicPage] Failed to load questions:", err);
        setErrorMessage(err.message);
        setLoadingQuestions(false);
      });
  }, [screen, practiceLevel, topicSlug]);

  const saveProgress = p => localStorage.setItem("topicProgress_" + topicSlug, String(p));
  const startLearn = () => { startRef.current = Date.now(); setScreen("learn"); setLessonIdx(0); };
  const startPractice = () => { if (!startRef.current) startRef.current = Date.now(); setScreen("practice"); };
  const finishLearn = () => { saveProgress(50); startPractice(); };
  const finishPractice = () => {
    saveProgress(100);
    const elapsedSecs = Math.round((Date.now() - startRef.current) / 1000);
    const elapsed = Math.round(elapsedSecs / 60);
    const actualAccuracy = questionsList.length > 0
      ? Math.round((correctCount / questionsList.length) * 100)
      : Math.floor(Math.random() * 20) + 75;
    const actualCorrect = questionsList.length > 0 ? correctCount : Math.floor(questionsList.length * actualAccuracy / 100);
    const totalQ = questionsList.length || practiceLevel?.count || 20;
    const timeStr = elapsed >= 60
      ? `${Math.floor(elapsed / 60)}h ${elapsed % 60}m`
      : elapsed > 0 ? `${elapsed} min` : `< 1 min`;

    setStats({
      accuracy: actualAccuracy,
      time: timeStr,
      correctAnswers: actualCorrect,
      totalQuestions: totalQ,
    });

    if (user && sessionResults.length > 0) {
      recordBulkSessions(user.id, topic.title || topicName, elapsedSecs, sessionResults)
        .catch(err => console.error("Failed to save progress", err));
    }

    setScreen("complete");
  };

  if (loading) return <TopicSkeleton />;

  if (!topic) return (
    <div className="topic-page page">
      <button className="topic-back-btn" onClick={() => navigate("")}>← Back</button>
      <div className="topic-not-found">
        <div style={{ fontSize: "3rem" }}>🚧</div>
        <h2>{decodeURIComponent(topicName || topicSlug)}</h2>
        <p>Content is being prepared. Check back soon!</p>
        <button className="goal-btn selected" style={{ marginTop: 24 }} onClick={() => navigate("")}>Go Home</button>
      </div>
    </div>
  );

  const color = topic.color || "#6366f1";
  const progress = parseInt(localStorage.getItem("topicProgress_" + topicSlug) || "0", 10);
  const lessons = buildLessons(topic);

  /* ── OVERVIEW ── */
  if (screen === "overview") return (
    <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:860,margin:"0 auto",padding:"24px 16px 80px" }}>
      <button className="topic-back-btn" onClick={() => history.back()}>← Back</button>
      <div style={{ background:"linear-gradient(135deg,"+color+"22,"+color+"08)",border:"1px solid "+color+"44",borderRadius:24,padding:40,marginBottom:32,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,"+color+","+color+"55)" }}/>
        <div style={{ display:"flex",alignItems:"center",gap:20,marginBottom:24,flexWrap:"wrap" }}>
          <span style={{ fontSize:"4rem" }}>{topic.icon}</span>
          <div><h1 style={{ fontSize:"2.2rem",fontWeight:900,color:"var(--text-main)",margin:0,lineHeight:1.2 }}>{topic.title}</h1><p style={{ color:"var(--text-sec)",marginTop:6 }}>{topic.tagline}</p></div>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:12,marginBottom:24 }}>
          {[{label:"Difficulty",value:meta.difficulty,vc:DIFF_COLOR[meta.difficulty]},{label:"Est. Time",value:meta.time+" mins"},{label:"Concepts",value:meta.concepts},{label:"Questions",value:meta.questions},{label:"Progress",value:progress+"%",vc:progress===100?"#10b981":color}].map(m=>(
            <div key={m.label} style={{ background:"var(--surface)",borderRadius:12,padding:"12px 18px",border:"1px solid var(--border)" }}>
              <div style={{ fontSize:".72rem",fontWeight:700,color:"var(--text-sec)",textTransform:"uppercase",letterSpacing:"1px" }}>{m.label}</div>
              <div style={{ fontSize:"1.1rem",fontWeight:800,color:m.vc||"var(--text-main)",marginTop:2 }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ height:8,background:"var(--surface2)",borderRadius:8,overflow:"hidden" }}>
            <div style={{ width:progress+"%",height:"100%",background:"linear-gradient(90deg,"+color+","+color+"99)",transition:"width .6s ease",borderRadius:8 }}/>
          </div>
        </div>
        <p style={{ fontSize:"1rem",color:"var(--text-sec)",lineHeight:1.7,margin:0,padding:16,background:"var(--surface)",borderRadius:12,borderLeft:"4px solid "+color }}>{meta.desc || topic.description}</p>
      </div>

      <h2 style={{ fontSize:"1.3rem",fontWeight:800,color:"var(--text-main)",marginBottom:4 }}>Choose Your Learning Mode</h2>
      <p style={{ color:"var(--text-sec)",fontSize:".9rem",marginBottom:20 }}>How do you want to approach this topic today?</p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,marginBottom:32 }}>

        <div onClick={startLearn} style={{ background:"linear-gradient(135deg,"+color+"18,"+color+"06)",border:"2px solid "+color,borderRadius:20,padding:28,cursor:"pointer",transition:"transform .2s,box-shadow .2s",position:"relative",overflow:"hidden" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px "+color+"33";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
          <div style={{ position:"absolute",top:14,right:14,background:color,color:"#fff",fontSize:".68rem",fontWeight:800,padding:"4px 10px",borderRadius:100,letterSpacing:"1px" }}>⭐ RECOMMENDED</div>
          <div style={{ fontSize:"2.5rem",marginBottom:12 }}>📚</div>
          <h3 style={{ fontSize:"1.3rem",fontWeight:900,color:"var(--text-main)",marginBottom:8 }}>Learn Mode</h3>
          <p style={{ color:"var(--text-sec)",fontSize:".9rem",lineHeight:1.6,marginBottom:16 }}>Understand every concept visually from scratch. Perfect for first-timers or thorough revision.</p>
          {["Step-by-step visual lessons","Interactive formula animations","Memory tricks & shortcuts","Guided AI practice"].map(f=><div key={f} style={{ display:"flex",alignItems:"center",gap:8,fontSize:".85rem",color:"var(--text-sec)",marginBottom:4 }}><span style={{ color:"#10b981" }}>✓</span>{f}</div>)}
          <div style={{ marginTop:16,fontSize:".8rem",color:"var(--text-sec)",marginBottom:16 }}>⏱ {meta.time}–{meta.time+10} mins</div>
          <button style={{ width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,"+color+","+color+"bb)",color:"#fff",fontWeight:800,fontSize:"1rem",cursor:"pointer" }}>Start Learning →</button>
        </div>

        <div onClick={startPractice} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:28,cursor:"pointer",transition:"transform .2s,box-shadow .2s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
          <div style={{ fontSize:"2.5rem",marginBottom:12 }}>🎯</div>
          <h3 style={{ fontSize:"1.3rem",fontWeight:900,color:"var(--text-main)",marginBottom:8 }}>Practice Mode</h3>
          <p style={{ color:"var(--text-sec)",fontSize:".9rem",lineHeight:1.6,marginBottom:16 }}>Already know the concept? Jump into questions with instant AI visual explanations.</p>
          {["Choose difficulty level","AI animated step-by-step solutions","Accuracy & speed tracking","Shortcut methods & mistake analysis"].map(f=><div key={f} style={{ display:"flex",alignItems:"center",gap:8,fontSize:".85rem",color:"var(--text-sec)",marginBottom:4 }}><span style={{ color:"#f59e0b" }}>✓</span>{f}</div>)}
          <button style={{ width:"100%",padding:14,borderRadius:12,border:"1px solid var(--border)",background:"var(--surface2)",color:"var(--text-main)",fontWeight:800,fontSize:"1rem",cursor:"pointer",marginTop:32 }}>Start Practice →</button>
        </div>
      </div>

      {topic.keyFacts && topic.keyFacts.length > 0 && (
        <div style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:28 }}>
          <h3 style={{ fontSize:"1.1rem",fontWeight:800,color:"var(--text-main)",marginBottom:16 }}>📌 Topics Covered</h3>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
            {topic.keyFacts.map((f,i)=><div key={i} style={{ padding:"8px 16px",background:color+"12",border:"1px solid "+color+"33",borderRadius:100,fontSize:".85rem",color:"var(--text-main)",fontWeight:600 }}>{f.label}</div>)}
          </div>
        </div>
      )}
    </div>
  );

  /* ── LEARN MODE ── */
  if (screen === "learn") {
    const lesson = lessons[lessonIdx];
    const isLast = lessonIdx === lessons.length - 1;
    const pct = Math.round(((lessonIdx + 1) / lessons.length) * 100);
    return (
      <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:760,margin:"0 auto",padding:"24px 16px 80px" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12 }}>
          <button className="topic-back-btn" style={{ margin:0 }} onClick={() => setScreen("overview")}>← Overview</button>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:".85rem",color:"var(--text-sec)",fontWeight:600 }}>{lessonIdx+1} / {lessons.length}</span>
            <div style={{ width:120,height:6,background:"var(--surface2)",borderRadius:6,overflow:"hidden" }}><div style={{ width:pct+"%",height:"100%",background:color,transition:"width .4s ease" }}/></div>
            <span style={{ fontSize:".8rem",fontWeight:700,color }}>{pct}%</span>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
          <span style={{ fontSize:"1.5rem" }}>{topic.icon}</span>
          <span style={{ fontSize:".9rem",fontWeight:700,color:"var(--text-sec)" }}>📚 Learn Mode —</span>
          <span style={{ fontSize:".9rem",fontWeight:700,color:"var(--text-main)" }}>{topic.title}</span>
        </div>
        <LessonSlide key={lessonIdx} lesson={lesson} color={color} topicName={topic.title} isLast={isLast} onNext={() => isLast ? finishLearn() : setLessonIdx(i => i+1)} />
        <div style={{ display:"flex",justifyContent:"center",gap:6,marginTop:24,flexWrap:"wrap" }}>
          {lessons.map((_,i)=><div key={i} onClick={() => setLessonIdx(i)} style={{ width:i===lessonIdx?24:8,height:8,borderRadius:4,background:i<=lessonIdx?color:"var(--border)",transition:"all .3s ease",cursor:"pointer" }}/>)}
        </div>
      </div>
    );
  }

  /* ── PRACTICE MODE ── */
  if (screen === "practice") {

    // STEP 1: Show level selection if no level chosen
    if (!practiceLevel) return (
      <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:760,margin:"0 auto",padding:"24px 16px 80px" }}>
        <button className="topic-back-btn" onClick={() => setScreen("overview")}>← Overview</button>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <div style={{ fontSize:"3rem",marginBottom:12 }}>🎯</div>
          <h2 style={{ fontSize:"1.8rem",fontWeight:900,color:"var(--text-main)",marginBottom:8 }}>Practice Mode</h2>
          <p style={{ color:"var(--text-sec)" }}>Choose your practice intensity for <strong>{topic.title}</strong></p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16 }}>
          {PRACTICE_LEVELS.map(lvl=>(
            <div key={lvl.id} onClick={() => setPracticeLevel(lvl)}
              style={{ background:"var(--surface)",border:"1px solid "+lvl.color+"66",borderRadius:16,padding:24,cursor:"pointer",transition:"transform .2s,box-shadow .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px "+lvl.color+"33";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ fontSize:"1.5rem",fontWeight:900,color:lvl.color,marginBottom:6 }}>{lvl.emoji} {lvl.label}</div>
              <div style={{ fontSize:".9rem",color:"var(--text-sec)",marginBottom:12 }}>{lvl.desc}</div>
              <div style={{ fontSize:"2rem",fontWeight:900,color:lvl.color }}>{lvl.count}</div>
              <div style={{ fontSize:".8rem",color:"var(--text-sec)" }}>Questions</div>
            </div>
          ))}
        </div>
      </div>
    );

    // STEP 2: Loading spinner
    if (loadingQuestions) return (
      <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:760,margin:"0 auto",padding:"24px 16px 80px" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24 }}>
          <button className="topic-back-btn" style={{ margin:0 }} onClick={() => setPracticeLevel(null)}>← Change Level</button>
          <div style={{ fontSize:".9rem",color:"var(--text-sec)",fontWeight:600 }}>🎯 {practiceLevel.emoji} {practiceLevel.label} · {practiceLevel.count} Questions</div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:300,gap:20 }}>
          <div style={{ width:56,height:56,borderRadius:"50%",border:"4px solid "+color+"33",borderTopColor:color,animation:"spin 0.8s linear infinite" }} />
          <p style={{ color:"var(--text-sec)",fontWeight:600,fontSize:"1rem" }}>Loading {practiceLevel.label} questions…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

    // STEP 3: Error state — questions couldn't load
    if (errorMessage) return (
      <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:760,margin:"0 auto",padding:"24px 16px 80px" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24 }}>
          <button className="topic-back-btn" style={{ margin:0 }} onClick={() => setPracticeLevel(null)}>← Change Level</button>
        </div>
        <div style={{ textAlign:"center",padding:"60px 24px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20 }}>
          <div style={{ fontSize:"3rem",marginBottom:16 }}>⚠️</div>
          <h3 style={{ color:"var(--text-main)",marginBottom:12 }}>Questions Unavailable</h3>
          <p style={{ color:"var(--text-sec)",fontSize:".9rem",marginBottom:24 }}>The question bank for <strong>{topic.title}</strong> — {practiceLevel.label} could not be loaded. Please try a different level or come back later.</p>
          <p style={{ color:"var(--text-sec)",fontSize:".8rem",fontFamily:"monospace",background:"var(--surface2)",padding:"8px 16px",borderRadius:8,display:"inline-block" }}>{errorMessage}</p>
          <div style={{ marginTop:24,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={() => setPracticeLevel(null)} style={{ padding:"12px 28px",borderRadius:12,border:"1px solid var(--border)",background:"var(--surface2)",color:"var(--text-main)",fontWeight:700,cursor:"pointer" }}>← Try Another Level</button>
          </div>
        </div>
      </div>
    );

    // STEP 4: Actual question interface
    const activeQuestion = questionsList[currentQuestionIdx];
    const isLastQuestion = currentQuestionIdx === questionsList.length - 1;
    const optionKeys = ["A", "B", "C", "D"];

    if (!activeQuestion) return (
      <div className="topic-page page" style={{ maxWidth:760,margin:"0 auto",padding:"24px 16px 80px",textAlign:"center" }}>
        <button className="topic-back-btn" onClick={() => setPracticeLevel(null)}>← Change Level</button>
        <div style={{ padding:"60px 24px" }}>
          <div style={{ fontSize:"3rem",marginBottom:16 }}>📭</div>
          <p style={{ color:"var(--text-sec)" }}>No questions available for this level. Try another level.</p>
          <button onClick={() => setPracticeLevel(null)} style={{ marginTop:20,padding:"12px 28px",borderRadius:12,border:"none",background:color,color:"#fff",fontWeight:700,cursor:"pointer" }}>← Choose Another Level</button>
        </div>
      </div>
    );

    // Compute correct index and correct text ONCE for this question
    const correctIdx = resolveCorrectIndex(activeQuestion);
    const correctText = (activeQuestion.options || [])[correctIdx] || "";
    const isAnsweredCorrectly = submitted && selectedOption === correctText;

    return (
      <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:760,margin:"0 auto",padding:"24px 16px 80px" }}>
        {/* Top Bar */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12 }}>
          <button className="topic-back-btn" style={{ margin:0 }} onClick={() => setPracticeLevel(null)}>← Change Level</button>
          <div style={{ fontSize:".9rem",color:"var(--text-sec)",fontWeight:600 }}>🎯 {practiceLevel.emoji} {practiceLevel.label} · {questionsList.length} Questions</div>
        </div>

        {/* Question Card */}
        <div className="question-card" style={{ animation:"fadeIn 0.4s ease",padding:"32px",borderRadius:"20px",border:"1px solid var(--border)",background:"var(--surface)" }}>

          {/* Progress Header */}
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
            <span style={{ fontSize:"0.85rem",fontWeight:700,color:color,textTransform:"uppercase",letterSpacing:"1px" }}>
              Question {currentQuestionIdx + 1} of {questionsList.length}
            </span>
            <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
              <span className={`badge ${{ Easy:"badge-easy",Medium:"badge-medium",Hard:"badge-hard" }[activeQuestion.difficulty] || "badge-easy"}`}>
                {activeQuestion.difficulty}
              </span>
              {/* Score */}
              <span style={{ fontSize:".8rem",fontWeight:700,color:"#10b981" }}>✅ {correctCount} correct</span>
              {/* Bookmark Button */}
              <button
                onClick={handleToggleBookmark}
                disabled={bookmarkLoading}
                title={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
                style={{
                  background: isBookmarked ? "#f59e0b" : "var(--surface2)",
                  border: `2px solid ${isBookmarked ? "#f59e0b" : "var(--border)"}`,
                  borderRadius:"10px",width:"38px",height:"38px",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  cursor: bookmarkLoading ? "wait" : "pointer",
                  fontSize:"1.1rem",transition:"all 0.2s ease",
                }}
              >
                {bookmarkLoading ? "⏳" : isBookmarked ? "🔖" : "🏳️"}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ height:"6px",background:"var(--surface2)",borderRadius:"4px",overflow:"hidden",marginBottom:"24px" }}>
            <div style={{ width:`${((currentQuestionIdx + 1) / questionsList.length) * 100}%`,height:"100%",background:color,transition:"width 0.3s ease" }} />
          </div>

          {/* Subtopic */}
          <div style={{ fontSize:"0.85rem",color:"var(--text-sec)",marginBottom:"8px",fontWeight:500 }}>
            📌 {activeQuestion.subtopic || "General"}
          </div>

          {/* Dynamic Chart / Static Image for Data Interpretation */}
          {(activeQuestion.chartData || activeQuestion.tableData) ? (
            <DataInterpretationVisualizer question={activeQuestion} />
          ) : activeQuestion.image ? (
            <div style={{ marginBottom: "24px", textAlign: "center", background: "#fff", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <img
                src={activeQuestion.image}
                alt="Question Chart"
                style={{ maxWidth: "100%", maxHeight: "350px", objectFit: "contain", borderRadius: "8px" }}
              />
            </div>
          ) : null}

          {/* Question Text */}
          <div className="qc-question" style={{ fontSize:"1.2rem",fontWeight:700,color:"var(--text-main)",marginBottom:"28px",lineHeight:1.6 }}>
            {activeQuestion.question}
          </div>

          {/* Options */}
          <div className="options-grid" style={{ display:"flex",flexDirection:"column",gap:"12px",marginBottom:"28px" }}>
            {(activeQuestion.options || []).map((opt, idx) => {
              const letter = optionKeys[idx] || String(idx + 1);
              const isSelected = selectedOption === opt;
              const isThisCorrect = idx === correctIdx;

              let btnClass = "option-btn";
              if (submitted) {
                if (isThisCorrect) btnClass = "option-btn correct";
                else if (isSelected && !isThisCorrect) btnClass = "option-btn wrong";
              } else if (isSelected) {
                btnClass = "option-btn selected";
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => {
                    if (!submitted) {
                      setSelectedOption(opt);
                      setSubmitted(true);
                      const isCorrect = idx === correctIdx;
                      if (isCorrect) {
                        setCorrectCount(prev => prev + 1);
                      }
                      setSessionResults(prev => [
                        ...prev,
                        { questionId: activeQuestion.id || activeQuestion.question.substring(0, 50), solved: isCorrect }
                      ]);
                    }
                  }}
                  disabled={submitted}
                  style={{
                    width:"100%",display:"flex",alignItems:"center",textAlign:"left",
                    padding:"16px 20px",borderRadius:"12px",
                    cursor: submitted ? "default" : "pointer"
                  }}
                >
                  <span className="opt-letter" style={{ flexShrink:0 }}>{letter}</span>
                  <span style={{ fontSize:"1rem",fontWeight:500 }}>{renderOption(opt, letter)}</span>
                  {submitted && isThisCorrect && (
                    <span style={{ marginLeft:"auto",color:"var(--teal)",fontWeight:"bold",fontSize:"1.2rem" }}>✓</span>
                  )}
                  {submitted && isSelected && !isThisCorrect && (
                    <span style={{ marginLeft:"auto",color:"var(--coral)",fontWeight:"bold",fontSize:"1.2rem" }}>✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Result & Actions */}
          {submitted && (
            <div style={{ animation:"slideUp 0.3s ease",display:"flex",flexDirection:"column",gap:"20px" }}>

              {/* Correct / Wrong Banner */}
              <div style={{
                padding:"14px 20px",borderRadius:"12px",
                background: isAnsweredCorrectly ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                border: `1px solid ${isAnsweredCorrectly ? "var(--teal)" : "var(--coral)"}`,
                fontSize:"1rem",fontWeight:700,
                color: isAnsweredCorrectly ? "var(--teal)" : "var(--coral)",
                display:"flex",alignItems:"center",gap:"8px"
              }}>
                {isAnsweredCorrectly
                  ? "🎉 Correct! Great job."
                  : `❌ Wrong. Correct answer: Option ${optionKeys[correctIdx]} — ${getOptionString(correctText)}`
                }
              </div>

              {/* Memory Trick */}
              {!isAnsweredCorrectly && activeQuestion.memoryTrick && (
                <div style={{ background:"var(--surface2)",padding:"16px 20px",borderRadius:"12px",fontSize:"0.9rem",color:"var(--text-sec)",borderLeft:"3px solid var(--amber)" }}>
                  💡 <strong>Memory Trick:</strong> {activeQuestion.memoryTrick}
                </div>
              )}

              {/* Explanation if available */}
              {activeQuestion.explanation && (
                <div style={{ background:"var(--surface2)",padding:"16px 20px",borderRadius:"12px",fontSize:"0.9rem",color:"var(--text-sec)",borderLeft:"3px solid "+color }}>
                  📖 <strong>Explanation:</strong> {activeQuestion.explanation}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display:"flex",gap:"16px",flexWrap:"wrap",marginTop:"8px" }}>

                {/* AI Visual Explainer */}
                <button
                  onClick={() => {
                    const opts = activeQuestion.options || [];
                    const queryText = `${activeQuestion.question}\n\nOptions:\nA) ${getOptionString(opts[0])}\nB) ${getOptionString(opts[1])}\nC) ${getOptionString(opts[2])}\nD) ${getOptionString(opts[3])}\n\nExplain step-by-step with visual details.`;
                    window.open(`#/ask?q=${encodeURIComponent(queryText)}`, "_blank");
                  }}
                  style={{
                    flex:1,minWidth:"200px",padding:"14px 28px",borderRadius:"12px",border:"none",
                    background:`linear-gradient(135deg, ${color}, #8b5cf6)`,
                    color:"#fff",fontWeight:800,fontSize:"1rem",cursor:"pointer",
                    display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"8px",
                    boxShadow:`0 4px 14px ${color}33`,transition:"transform 0.15s, box-shadow 0.15s"
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform="translateY(0)"; }}
                >
                  🎬 Solve Visually (AI)
                </button>

                {/* Next / Finish */}
                <button
                  onClick={() => {
                    if (isLastQuestion) {
                      finishPractice();
                    } else {
                      setCurrentQuestionIdx(prev => prev + 1);
                      setSelectedOption(null);
                      setSubmitted(false);
                    }
                  }}
                  style={{
                    flex:1,minWidth:"200px",padding:"14px 28px",borderRadius:"12px",border:"none",
                    background: isLastQuestion
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #1e293b, #334155)",
                    color:"#ffffff",fontWeight:800,fontSize:"1rem",cursor:"pointer",
                    display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"8px",
                    whiteSpace:"nowrap",transition:"transform 0.15s",
                    boxShadow: isLastQuestion ? "0 4px 14px rgba(16,185,129,0.35)" : "0 4px 14px rgba(0,0,0,0.25)"
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform="translateY(0)"; }}
                >
                  {isLastQuestion ? "🏁 Finish Practice" : "➡️ Next Question"}
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── COMPLETE ── */
  if (screen === "complete") {
    const accuracy       = stats?.accuracy       ?? 0;
    const totalQ         = stats?.totalQuestions ?? questionsList.length ?? 0;
    const correctAnswers = stats?.correctAnswers ?? 0;
    const timeTaken      = stats?.time           ?? "--";

    const isMastered = accuracy >= 75;
    const performanceMsg =
      accuracy >= 90 ? "Outstanding! You have mastered this topic with excellence."
      : accuracy >= 75 ? "Great job! You have shown strong understanding of this topic."
      : accuracy >= 50 ? "Good progress! A little more practice will make you even stronger."
      : "You have completed the topic. Review key concepts to improve mastery.";

    /* glow colour for the trophy drop-shadow */
    const glowRgba = accuracy >= 75 ? "255,213,0" : accuracy >= 50 ? "160,160,220" : "171,71,188";

    /* metric colours */
    const accColor  = accuracy >= 75 ? "#10b981" : accuracy >= 50 ? "#f59e0b" : "#6366f1";
    const timeColor = "#6366f1";
    const corrColor = accuracy >= 75 ? "#f59e0b" : accuracy >= 50 ? "#6366f1" : "#8b5cf6";

    /* metric icon components — pure SVG, no emojis */
    const AccIcon = () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" fill={accColor + "22"}/>
        <circle cx="18" cy="18" r="10" stroke={accColor + "55"} strokeWidth="2" fill="none"/>
        <circle cx="18" cy="18" r="5"  fill={accColor}/>
        <circle cx="18" cy="18" r="13" stroke={accColor} strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
        <line x1="18" y1="4"  x2="18" y2="8"  stroke={accColor} strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="28" x2="18" y2="32" stroke={accColor} strokeWidth="2" strokeLinecap="round"/>
        <line x1="4"  y1="18" x2="8"  y2="18" stroke={accColor} strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="18" x2="32" y2="18" stroke={accColor} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
    const TimeIcon = () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="20" r="12" fill={timeColor + "1a"} stroke={timeColor} strokeWidth="2"/>
        <path d="M14 7 L14 11 M18 6 L18 11 M22 7 L22 11" stroke={timeColor} strokeWidth="2" strokeLinecap="round"/>
        <line x1="11" y1="9" x2="25" y2="9" stroke={timeColor} strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="20" x2="18" y2="12" stroke={timeColor} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="20" x2="24" y2="24" stroke={timeColor} strokeWidth="2"   strokeLinecap="round"/>
        <circle cx="18" cy="20" r="2.5" fill={timeColor}/>
      </svg>
    );
    const CorrIcon = () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" fill={corrColor + "22"} stroke={corrColor} strokeWidth="2"/>
        <path d="M10 18 L15 23 L26 12" stroke={corrColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );

    /* SVG icon for the "Revisit" button arrow */
    const RevisitIcon = () => (
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M2 8.5C2 5.46 4.46 3 7.5 3c1.8 0 3.4.88 4.4 2.24"  stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M15 8.5c0 3.04-2.46 5.5-5.5 5.5-1.8 0-3.4-.88-4.4-2.24" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 2v4h-4M4 15v-4h4" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );

    /* SVG icon for the "Continue" button */
    const RocketIcon = () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C9 2 13 3 14 8C14 12 11 15 9 16C7 15 4 12 4 8C5 3 9 2 9 2Z" fill="white" opacity="0.9"/>
        <circle cx="9" cy="8" r="2" fill="#7c3aed"/>
        <path d="M7 13L5 17L9 15L13 17L11 13" fill="white" opacity="0.7"/>
      </svg>
    );

    const metrics = [
      {
        Icon: AccIcon,
        value: accuracy + "%",
        label: "ACCURACY",
        sub: accuracy >= 90 ? "Excellent mastery"
           : accuracy >= 75 ? "Strong understanding"
           : accuracy >= 50 ? "Room to improve"
           : "Needs more practice",
        color: accColor,
      },
      {
        Icon: TimeIcon,
        value: timeTaken,
        label: "TIME TAKEN",
        sub: "Efficient completion",
        color: timeColor,
      },
      {
        Icon: CorrIcon,
        value: correctAnswers + " / " + totalQ,
        label: "CORRECT ANSWERS",
        sub: correctAnswers === totalQ ? "Perfect score!"
           : correctAnswers >= totalQ * 0.8 ? "Excellent result"
           : correctAnswers >= totalQ * 0.5 ? "Solid effort"
           : "Keep practicing",
        color: corrColor,
      },
    ];

    return (
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "20px 16px 60px", animation: "sc-fadein .5s ease" }}>
        <style>{`
          @keyframes sc-fadein   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
          @keyframes sc-diamond  { 0%,100%{ opacity:.5; transform:rotate(45deg) scale(1); } 50%{ opacity:.95; transform:rotate(45deg) scale(1.3); } }
          @keyframes sc-float    { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-10px); } }
          .sc-card { background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(99,102,241,.14),0 4px 18px rgba(0,0,0,.07); }
          [data-theme="dark"] .sc-card  { background:#1a1b2e; }
          [data-theme="dark"] .sc-hero  { background:linear-gradient(135deg,#1e1b3a,#252147,#1a2040) !important; }
          [data-theme="dark"] .sc-hero h1 { color:#f1f5f9 !important; }
          [data-theme="dark"] .sc-hero p  { color:#94a3b8 !important; }
          [data-theme="dark"] .sc-mrow   { background:#13141f !important; border-color:#2a2c3e !important; }
          [data-theme="dark"] .sc-mcell  { border-color:#2a2c3e !important; }
          [data-theme="dark"] .sc-tbadge { background:#252640 !important; border-color:#363859 !important; color:#e2e8f0 !important; }
          [data-theme="dark"] .sc-cta    { background:#1a1b2e !important; border-color:#2a2c3e !important; }
          [data-theme="dark"] .sc-revisit{ background:#1a1b2e !important; color:#cbd5e1 !important; border-color:#363859 !important; }
          [data-theme="dark"] .sc-jlabel { background:rgba(26,27,46,.92) !important; color:#a78bfa !important; border-color:#363859 !important; }
          @media (max-width:640px) {
            .sc-hero  { padding:32px 20px 28px !important; }
            .sc-hgrid { grid-template-columns:1fr !important; }
            .sc-hgrid .sc-twrap { order:-1; margin:0 auto 20px; }
            .sc-mrow  { grid-template-columns:1fr !important; }
            .sc-mcell { border-right:none !important; border-bottom:1px solid #efeffa !important; }
            .sc-mcell:last-child { border-bottom:none !important; }
            .sc-cta   { flex-direction:column !important; padding:20px !important; }
          }
        `}</style>

        <div className="sc-card">

          {/* ════ HERO ════ */}
          <div className="sc-hero" style={{ background:"linear-gradient(135deg,#f5f3ff 0%,#ede9fe 45%,#e8f4fd 100%)", padding:"48px 52px 44px", position:"relative", overflow:"hidden" }}>

            {/* Glow blob behind trophy */}
            <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(" + glowRgba + ",.18) 0%,transparent 68%)", pointerEvents:"none" }}/>

            {/* Pulsing diamond accents */}
            {[
              { top:"8%",  left:"8%",  s:9,  c:"#10b981", d:"0s"    },
              { top:"14%", left:"42%", s:7,  c:"#6366f1", d:"0.5s"  },
              { top:"5%",  left:"66%", s:8,  c:"#f59e0b", d:"0.9s"  },
              { top:"52%", left:"33%", s:8,  c:"#8b5cf6", d:"0.25s" },
              { top:"62%", left:"10%", s:6,  c:"#10b981", d:"1.1s"  },
              { top:"70%", left:"57%", s:7,  c:"#3b82f6", d:"0.65s" },
            ].map((d, i) => (
              <div key={i} style={{ position:"absolute", top:d.top, left:d.left, width:d.s, height:d.s, background:d.c, transform:"rotate(45deg)", borderRadius:2, animation:"sc-diamond 2.8s ease-in-out " + d.d + " infinite", opacity:.55, pointerEvents:"none" }}/>
            ))}

            {/* Two-column grid */}
            <div className="sc-hgrid" style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:28, alignItems:"center", position:"relative", zIndex:2 }}>

              {/* Left: text */}
              <div>
                {/* Status pill */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 14px", borderRadius:999, fontSize:".78rem", fontWeight:700, marginBottom:20, background:isMastered?"#dcfce7":"#dbeafe", color:isMastered?"#15803d":"#1d4ed8", border:"1px solid " + (isMastered?"#86efac":"#93c5fd") }}>
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5" fill={isMastered?"#16a34a":"#2563eb"}/>
                    <path d="M3 6L5 8L9 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {isMastered ? "Well Done!" : "Completed!"}
                </div>

                {/* Headline */}
                <h1 style={{ fontSize:"clamp(1.85rem,3.5vw,2.75rem)", fontWeight:900, lineHeight:1.12, margin:"0 0 14px", color:"#0f172a" }}>
                  {accuracy >= 75
                    ? <><span style={{ color:"#10b981" }}>Mastered</span> This Topic!</>
                    : <>Topic <span style={{ color:"#6366f1" }}>Completed</span>!</>
                  }
                </h1>

                <p style={{ color:"#64748b", fontSize:".95rem", lineHeight:1.7, margin:"0 0 22px", maxWidth:430 }}>{performanceMsg}</p>

                {/* Topic name + Completed badges */}
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <span className="sc-tbadge" style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#f1f5f9", border:"1px solid #e2e8f0", borderRadius:10, padding:"6px 14px", fontSize:".82rem", fontWeight:700, color:"#334155" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="1" width="12" height="12" rx="2" stroke="#6366f1" strokeWidth="1.5"/>
                      <line x1="3" y1="4.5" x2="11" y2="4.5" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="3" y1="7"   x2="9"  y2="7"   stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="3" y1="9.5" x2="7"  y2="9.5" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    {topic?.title || topicName}
                  </span>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#dcfce7", border:"1px solid #86efac", borderRadius:10, padding:"6px 14px", fontSize:".82rem", fontWeight:700, color:"#15803d" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13">
                      <circle cx="6.5" cy="6.5" r="5.5" fill="#16a34a"/>
                      <path d="M3.5 6.5L5.5 8.5L9.5 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Completed
                  </span>
                </div>
              </div>

              {/* Right: Trophy Display */}
              <div className="sc-twrap" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 320,
                  aspectRatio: "1 / 1",
                  borderRadius: 28,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(237,233,254,0.6) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 16px 56px rgba(" + glowRgba + ",.22), inset 0 1px 0 rgba(255,255,255,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  animation: "sc-float 3.5s ease-in-out infinite",
                }}>
                  {/* Radial glow inside card */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(circle at 50% 60%, rgba(" + glowRgba + ",.14) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />
                  {/* Sparkle dots inside card */}
                  {[
                    { top:"12%", left:"10%", c:"#f59e0b", s:7 },
                    { top:"10%", right:"12%", c:"#6366f1", s:6 },
                    { bottom:"14%", left:"14%", c:"#10b981", s:5 },
                    { bottom:"16%", right:"10%", c:"#3b82f6", s:6 },
                  ].map((d, i) => (
                    <div key={i} style={{
                      position: "absolute", top: d.top, left: d.left, right: d.right, bottom: d.bottom,
                      width: d.s, height: d.s, borderRadius: "50%", background: d.c,
                      opacity: 0.7, animation: `sc-diamond 2.8s ease-in-out ${i * 0.4}s infinite`,
                    }} />
                  ))}
                  <img
                    src="/trophy.png"
                    alt="Achievement Trophy"
                    style={{
                      width: "78%",
                      height: "78%",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 1,
                      filter: "drop-shadow(0 8px 24px rgba(" + glowRgba + ",.4)) drop-shadow(0 2px 6px rgba(0,0,0,.12))",
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>{/* /hero */}

          {/* ════ METRICS ════ */}
          <div className="sc-mrow" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", background:"#fafafa", borderTop:"1px solid #efeffa", borderBottom:"1px solid #efeffa" }}>
            {metrics.map((m, i) => (
              <div key={i} className="sc-mcell" style={{ padding:"26px 22px", borderRight:i < 2 ? "1px solid #efeffa" : "none", display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ flexShrink:0, width:56, height:56, borderRadius:16, background:"linear-gradient(135deg," + m.color + "1e," + m.color + "08)", border:"1.5px solid " + m.color + "28", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <m.Icon />
                </div>
                <div>
                  <div style={{ fontSize:"1.85rem", fontWeight:900, color:m.color, lineHeight:1, letterSpacing:"-0.5px", marginBottom:4 }}>{m.value}</div>
                  <div style={{ fontSize:".72rem", fontWeight:800, color:"#94a3b8", letterSpacing:"1.1px", marginBottom:5 }}>{m.label}</div>
                  <div style={{ fontSize:".81rem", color:"#94a3b8", fontWeight:500 }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ════ CTA BUTTONS ════ */}
          <div className="sc-cta" style={{ display:"flex", gap:14, padding:"26px 32px", background:"#fff", borderTop:"1px solid #efeffa" }}>
            <button
              onClick={() => navigate("")}
              style={{ flex:1, padding:"16px 22px", borderRadius:14, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontWeight:800, fontSize:"1rem", color:"#fff", background:"linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow:"0 6px 22px rgba(124,58,237,.4)", transition:"transform .14s,box-shadow .14s" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,.52)"; }}
              onMouseOut={e  => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "0 6px 22px rgba(124,58,237,.4)";  }}
            >
              <RocketIcon /> Continue Your Journey
            </button>
            <button
              className="sc-revisit"
              onClick={() => { setScreen("overview"); setPracticeLevel(null); }}
              style={{ flex:1, padding:"16px 22px", borderRadius:14, border:"1.5px solid #e2e8f0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontWeight:700, fontSize:"1rem", color:"#475569", background:"#fff", transition:"transform .14s,background .14s" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#f8fafc"; }}
              onMouseOut={e  => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.background = "#fff";    }}
            >
              <RevisitIcon /> Revisit This Topic
            </button>
          </div>

          {/* ════ MOUNTAIN JOURNEY ════ */}
          <div style={{ position:"relative", overflow:"hidden", borderBottomLeftRadius:24, borderBottomRightRadius:24 }}>
            <img
              src="/mountain_journey.png"
              alt="Learning journey mountain"
              style={{ width:"100%", display:"block", objectFit:"cover", objectPosition:"center bottom", maxHeight:240 }}
            />
            <div className="sc-jlabel" style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", background:"rgba(255,255,255,.88)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", borderRadius:999, padding:"7px 22px", fontSize:".77rem", fontWeight:700, color:"#7c3aed", whiteSpace:"nowrap", border:"1px solid #ede9fe", boxShadow:"0 2px 14px rgba(124,58,237,.18)" }}>
              Your Learning Journey Continues
            </div>
          </div>

        </div>{/* .sc-card */}
      </div>
    );
  }

  return null;
}

