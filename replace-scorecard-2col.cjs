const fs = require('fs');
let content = fs.readFileSync('src/pages/TopicPage.jsx', 'utf8');

const startIndex = content.indexOf('/* ── COMPLETE ── */');
const endIndex = content.lastIndexOf('return null;\n}');
const endIndexWin = content.lastIndexOf('return null;\r\n}');

if (startIndex === -1) {
  console.log("Could not find start");
  process.exit(1);
}
let actualEndIndex = Math.max(endIndex, endIndexWin);
if (actualEndIndex === -1) {
  console.log("Could not find end");
  process.exit(1);
}
actualEndIndex += ('return null;\n}').length;

const newCompleteScreen = `  /* ── COMPLETE ── */
  if (screen === "complete") {
    const accuracy       = stats?.accuracy       ?? 0;
    const totalQ         = stats?.totalQuestions ?? questionsList.length ?? 0;
    const correctAnswers = stats?.correctAnswers ?? 0;
    const timeTaken      = stats?.time           ?? "--";

    let trophyImg = "/bronze_badge.png";
    let titleLines = ["Topic", "Completed", "Successfully!"];
    let highlightIndex = 1;
    let messageText = "You've completed this topic. Review key concepts to strengthen your understanding.";
    let topBadge = "🟠 Needs Practice";
    let badgeColor = "#ea580c";
    let badgeBg = "#ffedd5";

    if (accuracy >= 95) {
      trophyImg = "/master_crown.png";
      titleLines = ["Outstanding", "Performance", "Achieved!"];
      highlightIndex = 1;
      messageText = "You've achieved exceptional mastery of this topic.";
      topBadge = "🏆 Mastered";
      badgeColor = "#16a34a";
      badgeBg = "#dcfce7";
    } else if (accuracy >= 80) {
      trophyImg = "/gold_trophy.png";
      titleLines = ["You've", "Mastered", "This Topic!"];
      highlightIndex = 1;
      messageText = "Excellent work! You've demonstrated strong understanding and mastery.";
      if (accuracy >= 90) { topBadge = "🏆 Mastered"; }
      else { topBadge = "🟢 Proficient"; }
      badgeColor = "#16a34a";
      badgeBg = "#dcfce7";
    } else if (accuracy >= 50) {
      trophyImg = "/silver_trophy.png";
      titleLines = ["Making", "Good", "Progress!"];
      highlightIndex = 1;
      messageText = "You've built a solid foundation. Keep practicing to reach mastery.";
      if (accuracy >= 75) { topBadge = "🟢 Proficient"; badgeColor = "#16a34a"; badgeBg = "#dcfce7"; }
      else { topBadge = "🔵 Developing"; badgeColor = "#2563eb"; badgeBg = "#dbeafe"; }
    }

    const metrics = [
      { value: accuracy + "%", label: "Accuracy" },
      { value: timeTaken, label: "Time Taken" },
      { value: correctAnswers + " / " + totalQ, label: "Correct Answers" },
    ];

    const LaurelSVG = ({ flip }) => (
      <svg width="60" height="140" viewBox="0 0 60 140" fill="none" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
        <path d="M40 140 C 20 100, 10 50, 20 0" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M20 100 Q 0 80, 5 60 Q 20 60, 25 80 Z" fill="#4ade80"/>
        <path d="M15 70 Q -5 50, 0 30 Q 15 30, 20 50 Z" fill="#22c55e"/>
        <path d="M20 40 Q 0 20, 5 0 Q 20 0, 25 20 Z" fill="#16a34a"/>
        <path d="M28 120 Q 40 100, 50 110 Q 50 125, 35 130 Z" fill="#22c55e"/>
        <path d="M25 90 Q 45 70, 55 80 Q 55 95, 35 100 Z" fill="#4ade80"/>
        <path d="M22 60 Q 45 40, 55 50 Q 55 65, 32 70 Z" fill="#16a34a"/>
      </svg>
    );

    return (
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "16px 16px 80px", animation: "sc-fadein .6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <style>{\`
          @keyframes sc-fadein { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }
          @keyframes trophyFloat { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-15px); } }
          @keyframes confettiFloat { 0%{ transform:translateY(0) rotate(0deg); } 50%{ transform:translateY(-10px) rotate(180deg); } 100%{ transform:translateY(0) rotate(360deg); } }
          
          .sc-wrapper {
            background: #f4f7fa; /* Very light cool blue/gray matching reference */
            border-radius: 32px;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 60px;
            gap: 40px;
            position: relative;
            box-shadow: 0 24px 80px rgba(0,0,0,0.06);
          }
          [data-theme="dark"] .sc-wrapper { background: #13141f; }
          
          /* LEFT COLUMN */
          .sc-left { flex: 1; z-index: 10; display: flex; flex-direction: column; align-items: flex-start; }
          
          .sc-top-badge {
            background: \${badgeBg};
            color: \${badgeColor};
            padding: 8px 16px;
            border-radius: 100px;
            font-size: 0.95rem;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          
          .sc-title {
            font-size: clamp(3rem, 5vw, 4.2rem);
            font-weight: 900;
            color: var(--text-main, #0f172a);
            line-height: 1.1;
            margin: 0 0 24px;
            letter-spacing: -1.5px;
          }
          .sc-title span.highlight { color: #10b981; }
          
          .sc-desc {
            font-size: 1.15rem;
            color: var(--text-sec, #475569);
            line-height: 1.6;
            margin: 0 0 40px;
            max-width: 90%;
            font-weight: 500;
          }
          
          .sc-bottom-badges { display: flex; gap: 12px; flex-wrap: wrap; }
          .sc-pill {
            background: #fff;
            border: 1px solid #e2e8f0;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 700;
            color: #334155;
            display: flex; align-items: center; gap: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          }
          [data-theme="dark"] .sc-pill { background: #1e1f2e; border-color: #334155; color: #cbd5e1; }
          
          /* RIGHT COLUMN */
          .sc-right {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }
          
          .sc-pedestal {
            position: absolute;
            bottom: 20px;
            width: 320px;
            height: 100px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08), inset 0 -10px 20px rgba(0,0,0,0.03);
            z-index: 1;
          }
          .sc-pedestal::after {
            content: '';
            position: absolute;
            top: 20px; left: 10px; right: 10px; bottom: 10px;
            background: #f8fafc;
            border-radius: 50%;
            box-shadow: inset 0 4px 10px rgba(0,0,0,0.05);
          }
          [data-theme="dark"] .sc-pedestal { background:#1e1f2e; box-shadow:0 20px 40px rgba(0,0,0,0.4); }
          [data-theme="dark"] .sc-pedestal::after { background:#2a2b3d; }
          
          .sc-trophy-img {
            position: relative;
            z-index: 10;
            width: 300px;
            height: 300px;
            object-fit: contain;
            animation: trophyFloat 4s ease-in-out infinite;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));
            /* Ensure the white background from the generated image is blended out, or just use it as is if it looks good */
            mix-blend-mode: multiply;
          }
          [data-theme="dark"] .sc-trophy-img { mix-blend-mode: screen; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.4)); }
          
          .sc-laurel-left { position: absolute; left: 10px; top: 120px; z-index: 5; }
          .sc-laurel-right { position: absolute; right: 10px; top: 120px; z-index: 5; }
          
          .sc-glow {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 400px; height: 400px;
            background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(255,255,255,0) 70%);
            z-index: 0;
            border-radius: 50%;
          }
          
          /* Metrics row (below main card) */
          .sc-metrics-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 24px;
          }
          .sc-metric-card {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 24px;
            text-align: center;
          }
          [data-theme="dark"] .sc-metric-card { background:#1e1f2e; border-color:#334155; }
          
          /* CTA Row */
          .sc-cta-box { display: flex; gap: 16px; margin-top: 24px; }
          .sc-btn { flex: 1; padding: 18px 24px; border-radius: 16px; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: transform 0.2s; border:none; }
          .sc-btn-primary { background: linear-gradient(135deg, #10b981, #059669); color: #fff; box-shadow: 0 8px 20px rgba(16,185,129,0.3); }
          .sc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(16,185,129,0.4); }
          .sc-btn-secondary { background: #fff; border: 2px solid #e2e8f0; color: #475569; }
          .sc-btn-secondary:hover { transform: translateY(-2px); background: #f8fafc; }
          [data-theme="dark"] .sc-btn-secondary { background:#1e1f2e; border-color:#334155; color:#cbd5e1; }
          
          /* Confetti */
          .confetti { position: absolute; width: 12px; height: 12px; z-index: 2; opacity: 0.8; }
          .c1 { top: 20%; left: 10%; background: #a855f7; animation: confettiFloat 5s infinite; }
          .c2 { top: 10%; left: 50%; background: #eab308; transform: rotate(45deg); animation: confettiFloat 6s infinite 1s; }
          .c3 { top: 30%; right: 15%; background: #10b981; animation: confettiFloat 4s infinite 2s; }
          .c4 { top: 70%; left: 20%; background: #3b82f6; border-radius: 50%; animation: confettiFloat 7s infinite; }
          .c5 { top: 80%; right: 10%; background: #f43f5e; transform: rotate(45deg); animation: confettiFloat 5s infinite 1.5s; }

          @media (max-width: 900px) {
            .sc-wrapper { flex-direction: column; padding: 40px 24px; text-align: center; }
            .sc-left { align-items: center; }
            .sc-title { font-size: 2.8rem; }
            .sc-bottom-badges { justify-content: center; }
            .sc-metrics-row { grid-template-columns: 1fr; }
            .sc-cta-box { flex-direction: column; }
          }
        \`}
        </style>

        {/* MAIN HERO CARD */}
        <div className="sc-wrapper">
          {/* Confetti Background */}
          <div className="confetti c1"></div>
          <div className="confetti c2"></div>
          <div className="confetti c3"></div>
          <div className="confetti c4"></div>
          <div className="confetti c5"></div>
          
          <div className="sc-left">
            <div className="sc-top-badge">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              {topBadge}
            </div>
            
            <h1 className="sc-title">
              {titleLines.map((line, idx) => (
                <div key={idx} className={idx === highlightIndex ? "highlight" : ""}>
                  {line}
                </div>
              ))}
            </h1>
            
            <p className="sc-desc">{messageText}</p>
            
            <div className="sc-bottom-badges">
              <div className="sc-pill">
                📚 {topic?.title || topicName}
              </div>
              <div className="sc-pill" style={{ background:"#dcfce7", color:"#16a34a", borderColor:"#bbf7d0" }}>
                ✓ Completed
              </div>
            </div>
          </div>
          
          <div className="sc-right">
            <div className="sc-glow"></div>
            <div className="sc-pedestal"></div>
            <div className="sc-laurel-left"><LaurelSVG flip={false} /></div>
            <div className="sc-laurel-right"><LaurelSVG flip={true} /></div>
            <img src={trophyImg} alt="Achievement Trophy" className="sc-trophy-img" />
          </div>
        </div>

        {/* METRICS */}
        <div className="sc-metrics-row">
          {metrics.map((m, i) => (
            <div key={i} className="sc-metric-card">
              <div style={{ fontSize:"2.2rem", fontWeight:900, color:"var(--text-main)", marginBottom:8 }}>{m.value}</div>
              <div style={{ fontSize:"0.85rem", fontWeight:800, color:"var(--text-sec)", textTransform:"uppercase", letterSpacing:"1px" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="sc-cta-box">
          <button className="sc-btn sc-btn-secondary" onClick={() => { setScreen("overview"); setPracticeLevel(null); }}>
            Revisit This Topic
          </button>
          <button className="sc-btn sc-btn-primary" onClick={() => navigate("")}>
            Continue Learning →
          </button>
        </div>

      </div>
    );
  }

  return null;
}
`;

const modifiedContent = content.substring(0, startIndex) + newCompleteScreen + content.substring(actualEndIndex);
fs.writeFileSync('src/pages/TopicPage.jsx', modifiedContent, 'utf8');
console.log('Replaced successfully via substring mapping for exact reference layout');
