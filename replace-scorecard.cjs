const fs = require('fs');
let content = fs.readFileSync('src/pages/TopicPage.jsx', 'utf8');

// Use a more robust regex that ignores specific whitespace
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

// include the closing brace
actualEndIndex += ('return null;\n}').length;

const newCompleteScreen = `  /* ── COMPLETE ── */
  if (screen === "complete") {
    const accuracy       = stats?.accuracy       ?? 0;
    const totalQ         = stats?.totalQuestions ?? questionsList.length ?? 0;
    const correctAnswers = stats?.correctAnswers ?? 0;
    const timeTaken      = stats?.time           ?? "--";

    let achievementType = "bronze";
    let titleText = "Topic Completed";
    let messageText = "You've completed this topic. Review key concepts to strengthen your understanding.";
    let badgeText = "🟠 Needs Practice";
    let badgeColor = "#ea580c";
    let badgeBg = "#ffedd5";
    let glowColor = "rgba(205, 127, 50, 0.6)"; 

    if (accuracy >= 95) {
      achievementType = "crown";
      titleText = "Outstanding Performance";
      messageText = "You've achieved exceptional mastery of this topic.";
      badgeText = "🏆 Mastered";
      badgeColor = "#7c3aed";
      badgeBg = "#f5f3ff";
      glowColor = "rgba(139, 92, 246, 0.6)"; 
    } else if (accuracy >= 80) {
      achievementType = "gold";
      titleText = "Topic Mastered";
      messageText = "Excellent work! You've demonstrated strong understanding and mastery.";
      if (accuracy >= 90) { badgeText = "🏆 Mastered"; badgeColor = "#7c3aed"; badgeBg = "#f5f3ff"; }
      else { badgeText = "🟢 Proficient"; badgeColor = "#16a34a"; badgeBg = "#dcfce7"; }
      glowColor = "rgba(250, 204, 21, 0.6)"; 
    } else if (accuracy >= 50) {
      achievementType = "silver";
      titleText = "Good Progress";
      messageText = "You've built a solid foundation. Keep practicing to reach mastery.";
      if (accuracy >= 75) { badgeText = "🟢 Proficient"; badgeColor = "#16a34a"; badgeBg = "#dcfce7"; }
      else { badgeText = "🔵 Developing"; badgeColor = "#2563eb"; badgeBg = "#dbeafe"; }
      glowColor = "rgba(148, 163, 184, 0.6)"; 
    } else {
      badgeText = "🟠 Needs Practice";
      badgeColor = "#ea580c";
      badgeBg = "#ffedd5";
    }

    const AchievementSVG = () => {
      if (achievementType === "crown") return (
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde047"/>
              <stop offset="50%" stopColor="#eab308"/>
              <stop offset="100%" stopColor="#ca8a04"/>
            </linearGradient>
            <radialGradient id="jewelGrad" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#c084fc"/>
              <stop offset="100%" stopColor="#7e22ce"/>
            </radialGradient>
            <filter id="crownGlow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M20 140 L40 60 L80 100 L100 40 L120 100 L160 60 L180 140 Z" fill="url(#crownGrad)" filter="url(#crownGlow)"/>
          <rect x="30" y="145" width="140" height="20" rx="10" fill="url(#crownGrad)"/>
          {/* Jewels */}
          <circle cx="100" cy="55" r="10" fill="url(#jewelGrad)"/>
          <circle cx="50" cy="80" r="8" fill="url(#jewelGrad)"/>
          <circle cx="150" cy="80" r="8" fill="url(#jewelGrad)"/>
          <circle cx="100" cy="120" r="12" fill="url(#jewelGrad)"/>
          <circle cx="60" cy="125" r="8" fill="url(#jewelGrad)"/>
          <circle cx="140" cy="125" r="8" fill="url(#jewelGrad)"/>
        </svg>
      );
      if (achievementType === "gold") return (
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a"/>
              <stop offset="50%" stopColor="#eab308"/>
              <stop offset="100%" stopColor="#a16207"/>
            </linearGradient>
            <filter id="goldGlow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M60 40 Q50 100 80 120 L85 130 L115 130 L120 120 Q150 100 140 40 Z" fill="url(#goldGrad)" filter="url(#goldGlow)"/>
          <path d="M60 55 Q30 55 30 85 Q30 110 60 110" stroke="url(#goldGrad)" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <path d="M140 55 Q170 55 170 85 Q170 110 140 110" stroke="url(#goldGrad)" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <rect x="90" y="130" width="20" height="25" fill="url(#goldGrad)"/>
          <rect x="65" y="155" width="70" height="15" rx="7.5" fill="url(#goldGrad)"/>
          {/* Laurels */}
          <path d="M40 120 Q20 100 25 70" stroke="#22c55e" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M35 110 Q15 90 20 60" stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M160 120 Q180 100 175 70" stroke="#22c55e" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d="M165 110 Q185 90 180 60" stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M100 60 L105 75 L120 75 L108 85 L112 100 L100 90 L88 100 L92 85 L80 75 L95 75 Z" fill="#fff" opacity="0.9"/>
        </svg>
      );
      if (achievementType === "silver") return (
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc"/>
              <stop offset="50%" stopColor="#cbd5e1"/>
              <stop offset="100%" stopColor="#64748b"/>
            </linearGradient>
            <filter id="silverGlow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M60 40 Q50 100 80 120 L85 130 L115 130 L120 120 Q150 100 140 40 Z" fill="url(#silverGrad)" filter="url(#silverGlow)"/>
          <path d="M60 55 Q30 55 30 85 Q30 110 60 110" stroke="url(#silverGrad)" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <path d="M140 55 Q170 55 170 85 Q170 110 140 110" stroke="url(#silverGrad)" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <rect x="90" y="130" width="20" height="25" fill="url(#silverGrad)"/>
          <rect x="65" y="155" width="70" height="15" rx="7.5" fill="url(#silverGrad)"/>
        </svg>
      );
      return (
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="bronzeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a"/>
              <stop offset="50%" stopColor="#d97706"/>
              <stop offset="100%" stopColor="#78350f"/>
            </linearGradient>
            <filter id="bronzeGlow"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <circle cx="100" cy="90" r="60" fill="url(#bronzeGrad)" filter="url(#bronzeGlow)"/>
          <circle cx="100" cy="90" r="45" fill="none" stroke="#fff" strokeWidth="3" opacity="0.4"/>
          <path d="M70 140 L100 190 L130 140 Z" fill="url(#bronzeGrad)" filter="url(#bronzeGlow)"/>
          <path d="M100 65 L106 80 L122 80 L109 90 L114 105 L100 95 L86 105 L91 90 L78 80 L94 80 Z" fill="#fff" opacity="0.9"/>
        </svg>
      );
    };

    const metrics = [
      {
        value: accuracy + "%",
        label: "Accuracy",
      },
      {
        value: timeTaken,
        label: "Time Taken",
      },
      {
        value: correctAnswers + " / " + totalQ,
        label: "Correct Answers",
      },
    ];

    return (
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 16px 80px", animation: "sc-fadein .6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <style>{\`
          @keyframes sc-fadein { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }
          @keyframes sc-float  { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-12px); } }
          .sc-card { background:var(--surface,#fff); border-radius:28px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04); border:1px solid var(--border,#f1f5f9); }
          [data-theme="dark"] .sc-card { background:#1e1f2e; border-color:#2a2b3d; box-shadow:0 24px 80px rgba(0,0,0,0.3); }
          
          /* Hero Area */
          .sc-mountain-hero {
            position: relative;
            background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
            padding: 40px 32px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
          }
          [data-theme="dark"] .sc-mountain-hero { background: linear-gradient(to bottom, #13141f 0%, #1e1f2e 100%); }
          
          .sc-mountain-bg {
            width: 100%;
            max-width: 800px;
            margin-top: -60px;
            object-fit: cover;
            mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
            z-index: 1;
            pointer-events: none;
          }
          
          .sc-svg-wrapper {
            position: relative;
            z-index: 10;
            animation: sc-float 4s ease-in-out infinite;
            filter: drop-shadow(0 20px 40px \${glowColor});
          }

          /* Content Area */
          .sc-content {
            padding: 0 40px 48px;
            text-align: center;
            position: relative;
            z-index: 20;
            margin-top: -40px;
          }
          .sc-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; color: var(--text-main,#0f172a); margin: 0 0 16px; letter-spacing:-0.5px; }
          .sc-message { font-size: 1.1rem; color: var(--text-sec,#64748b); line-height: 1.6; max-width: 600px; margin: 0 auto 32px; }
          
          /* Metrics */
          .sc-metrics-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 40px;
          }
          .sc-metric-box {
            background: var(--surface2,#f8fafc);
            border: 1px solid var(--border,#e2e8f0);
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .sc-metric-val { font-size: 2rem; font-weight: 900; color: var(--text-main,#0f172a); margin-bottom: 4px; }
          .sc-metric-lab { font-size: 0.8rem; font-weight: 700; color: var(--text-sec,#94a3b8); text-transform: uppercase; letter-spacing: 1px; }

          /* CTA */
          .sc-cta-row { display: flex; gap: 16px; justify-content: center; max-width: 600px; margin: 0 auto; }
          .sc-btn-primary { flex:1; padding:18px 24px; border-radius:16px; border:none; background:linear-gradient(135deg,#4F46E5,#8B5CF6); color:#fff; font-size:1.05rem; font-weight:800; cursor:pointer; box-shadow:0 8px 30px rgba(99,102,241,0.35); transition:transform 0.2s, box-shadow 0.2s; }
          .sc-btn-primary:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(99,102,241,0.5); }
          .sc-btn-secondary { flex:1; padding:18px 24px; border-radius:16px; border:2px solid var(--border,#e2e8f0); background:var(--surface,#fff); color:var(--text-main,#334155); font-size:1.05rem; font-weight:700; cursor:pointer; transition:all 0.2s; }
          .sc-btn-secondary:hover { background:var(--surface2,#f8fafc); transform:translateY(-2px); }

          @media (max-width: 768px) {
            .sc-content { padding: 0 24px 32px; }
            .sc-metrics-grid { grid-template-columns: 1fr; gap: 12px; }
            .sc-cta-row { flex-direction: column; }
          }
        \`}
        </style>

        <div className="sc-card">
          {/* Top Header inside card */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"24px 32px", borderBottom:"1px solid var(--border)", background:"var(--surface)" }}>
            <div style={{ fontSize:"1.1rem", fontWeight:800, color:"var(--text-main)" }}>
              {topic?.title || topicName}
            </div>
            <div style={{ background:badgeBg, color:badgeColor, border:\`1px solid \${badgeColor}40\`, padding:"6px 14px", borderRadius:"100px", fontSize:"0.85rem", fontWeight:700 }}>
              {badgeText}
            </div>
          </div>

          <div className="sc-mountain-hero">
            <div className="sc-svg-wrapper">
              <AchievementSVG />
            </div>
            <img src="/mountain_summit_bg.png" alt="Learning Journey Mountain" className="sc-mountain-bg" />
          </div>

          <div className="sc-content">
            <h1 className="sc-title">{titleText}</h1>
            <p className="sc-message">{messageText}</p>

            <div className="sc-metrics-grid">
              {metrics.map((m, i) => (
                <div key={i} className="sc-metric-box">
                  <div className="sc-metric-val">{m.value}</div>
                  <div className="sc-metric-lab">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="sc-cta-row">
              <button className="sc-btn-secondary" onClick={() => { setScreen("overview"); setPracticeLevel(null); }}>
                Revisit This Topic
              </button>
              <button className="sc-btn-primary" onClick={() => navigate("")}>
                Continue Learning →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
`;

const modifiedContent = content.substring(0, startIndex) + newCompleteScreen + content.substring(actualEndIndex);
fs.writeFileSync('src/pages/TopicPage.jsx', modifiedContent, 'utf8');
console.log('Replaced successfully via substring mapping');
