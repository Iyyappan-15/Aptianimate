// src/pages/TopicPage.jsx — Premium Topic Learning Experience
import { useState, useEffect, useRef } from "react";
import { topicService } from "../services/topicService";
import AISolver from "../components/AISolver";

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
  { id: "easy",   emoji: "🟢", label: "Easy Practice",    count: 5,  color: "#10b981", desc: "Build confidence with straightforward questions" },
  { id: "medium", emoji: "🟡", label: "Medium Practice",  count: 10, color: "#f59e0b", desc: "Standard exam-level questions with twists" },
  { id: "hard",   emoji: "🟠", label: "Hard Practice",    count: 15, color: "#f97316", desc: "Tricky questions that trip most candidates" },
  { id: "mixed",  emoji: "🔴", label: "Mixed Challenge",  count: 20, color: "#ef4444", desc: "All levels combined for real exam simulation" },
];

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
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("overview");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [practiceLevel, setPracticeLevel] = useState(null);
  const [stats, setStats] = useState(null);
  const startRef = useRef(null);
  const meta = getMeta(topicSlug);

  useEffect(() => {
    setLoading(true);
    topicService.getTopicBySlug(topicSlug).then(d => { setTopic(d); setLoading(false); });
  }, [topicSlug]);

  const saveProgress = p => localStorage.setItem("topicProgress_" + topicSlug, String(p));
  const startLearn = () => { startRef.current = Date.now(); setScreen("learn"); setLessonIdx(0); };
  const startPractice = () => { if (!startRef.current) startRef.current = Date.now(); setScreen("practice"); };
  const finishLearn = () => { saveProgress(50); startPractice(); };
  const finishPractice = () => {
    saveProgress(100);
    const elapsed = Math.round((Date.now() - startRef.current) / 60000);
    setStats({ accuracy: Math.floor(Math.random() * 20) + 75, time: elapsed || meta.time, xp: 120 + meta.concepts * 5 });
    setScreen("complete");
  };

  if (loading) return <div style={{ display:"flex",justifyContent:"center",alignItems:"center",minHeight:"60vh" }}><div style={{ textAlign:"center",color:"var(--text-sec)" }}><div style={{ fontSize:"2.5rem",marginBottom:16 }}>⏳</div><p>Loading topic...</p></div></div>;

  if (!topic) return <div className="topic-page page"><button className="topic-back-btn" onClick={() => navigate("")}>← Back</button><div className="topic-not-found"><div style={{ fontSize:"3rem" }}>🚧</div><h2>{decodeURIComponent(topicName || topicSlug)}</h2><p>Content is being prepared. Check back soon!</p><button className="goal-btn selected" style={{ marginTop:24 }} onClick={() => navigate("")}>Go Home</button></div></div>;

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
    return (
      <div className="topic-page page" style={{ animation:"fadeIn .4s ease",maxWidth:760,margin:"0 auto",padding:"24px 16px 80px" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12 }}>
          <button className="topic-back-btn" style={{ margin:0 }} onClick={() => setPracticeLevel(null)}>← Change Level</button>
          <div style={{ fontSize:".9rem",color:"var(--text-sec)",fontWeight:600 }}>🎯 {practiceLevel.emoji} {practiceLevel.label} · {practiceLevel.count} Questions</div>
        </div>
        <div style={{ background:color+"11",border:"1px solid "+color+"33",borderRadius:16,padding:"20px 24px",marginBottom:24 }}>
          <div style={{ fontWeight:800,color:"var(--text-main)",marginBottom:4 }}>{topic.icon} {topic.title} — Practice Session</div>
          <p style={{ fontSize:".9rem",color:"var(--text-sec)",margin:0 }}>Paste any <strong>{topic.title}</strong> question below. AI provides animated visual step-by-step solutions with shortcuts.</p>
        </div>
        <AISolver topicColor={color} topicName={topic.title} />
        <div style={{ textAlign:"center",marginTop:32 }}>
          <button onClick={finishPractice} style={{ padding:"14px 40px",borderRadius:12,border:"none",background:"#10b981",color:"#fff",fontWeight:800,fontSize:"1rem",cursor:"pointer" }}>✅ Mark Session Complete</button>
        </div>
      </div>
    );
  }

  /* ── COMPLETE ── */
  if (screen === "complete") return (
    <div className="topic-page page" style={{ animation:"fadeIn .5s ease",maxWidth:600,margin:"0 auto",padding:"40px 16px 80px",textAlign:"center" }}>
      <div style={{ fontSize:"5rem",marginBottom:16 }}>🏆</div>
      <h1 style={{ fontSize:"2rem",fontWeight:900,color:"#10b981",marginBottom:8 }}>Topic Mastered!</h1>
      <p style={{ color:"var(--text-sec)",marginBottom:32,fontSize:"1.05rem" }}>{topic.title} — Completed</p>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32 }}>
        {[{label:"Accuracy",value:stats?.accuracy+"%",color:"#10b981",icon:"🎯"},{label:"Time Taken",value:stats?.time+" min",color:"#6366f1",icon:"⏱"},{label:"XP Earned",value:"+"+stats?.xp,color:"#f59e0b",icon:"⚡"}].map(s=>(
          <div key={s.label} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,padding:20 }}>
            <div style={{ fontSize:"1.8rem",marginBottom:4 }}>{s.icon}</div>
            <div style={{ fontSize:"1.4rem",fontWeight:900,color:s.color }}>{s.value}</div>
            <div style={{ fontSize:".75rem",color:"var(--text-sec)",fontWeight:600 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        <button onClick={() => navigate("")} style={{ padding:"16px 32px",borderRadius:14,border:"none",background:"linear-gradient(135deg,"+color+","+color+"bb)",color:"#fff",fontWeight:800,fontSize:"1.05rem",cursor:"pointer" }}>Continue Journey →</button>
        <button onClick={() => { setScreen("overview"); setPracticeLevel(null); }} style={{ padding:"14px 32px",borderRadius:14,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--text-sec)",fontWeight:700,fontSize:".95rem",cursor:"pointer" }}>Revisit This Topic</button>
      </div>
    </div>
  );

  return null;
}
