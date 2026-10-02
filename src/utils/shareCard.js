// src/utils/shareCard.js
// Captures the flashcard as a high-resolution PNG for social sharing.
// On mobile: uses Web Share API to open native WhatsApp/Instagram sheet.
// On desktop: auto-downloads the PNG and opens WhatsApp Web with a pre-filled message.

import html2canvas from 'html2canvas';

/**
 * Captures the given ref element as a 2x-resolution PNG and shares/downloads it.
 * Uses html2canvas with onclone (never flashes on screen), and falls back to
 * direct Canvas 2D rendering if html2canvas encounters any issue.
 *
 * @param {React.RefObject} cardRef - ref pointing to the ScoreShareCard <div>
 * @param {Object} shareData - { score, role, name, durationSeconds, verdict, categoryScores, strengths, areasForImprovement }
 * @returns {Promise<string|null>} resolves to 'shared' | 'downloaded' | null
 */
export async function captureCardAndShare(cardRef, shareData = {}) {
  const score = shareData.score ?? 0;
  const role = shareData.role || 'Full-Stack Software Engineer';
  const name = shareData.name || 'Candidate';
  const durationSeconds = shareData.durationSeconds || 0;
  const durationMin = Math.floor(durationSeconds / 60);
  const durationSec = durationSeconds % 60;
  const verdict = shareData.verdict || (score >= 80 ? 'PLACEMENT READY' : score >= 65 ? 'GOOD FOUNDATION' : score > 0 ? 'NEEDS MORE PRACTICE' : 'NO ANSWERS RECORDED');
  const categoryScores = shareData.categoryScores || {};
  const strengths = shareData.strengths || [];
  const areasForImprovement = shareData.areasForImprovement || [];

  let canvas = null;

  // ── ATTEMPT 1: html2canvas with offscreen clone ──
  const el = cardRef?.current;
  if (el) {
    try {
      canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#060913',
        logging: false,
        width: 1200,
        height: 675,
        windowWidth: 1200,
        windowHeight: 675,
        onclone: (_clonedDoc, clonedEl) => {
          if (clonedEl) {
            clonedEl.style.position = 'static';
            clonedEl.style.top = '0';
            clonedEl.style.left = '0';
            clonedEl.style.visibility = 'visible';
            clonedEl.style.opacity = '1';
            clonedEl.style.display = 'flex';
          }
        }
      });
    } catch (err) {
      console.warn('html2canvas capture warning, using canvas fallback:', err);
      canvas = null;
    }
  }

  // ── ATTEMPT 2: Native HTML5 2D Canvas Fallback (100% reliable) ──
  if (!canvas) {
    canvas = drawFlashcardOnCanvas({
      score,
      role,
      name,
      durationMin,
      durationSec,
      verdict,
      categoryScores,
      strengths,
      areasForImprovement
    });
  }

  if (!canvas) {
    console.error('All canvas generation attempts failed');
    return null;
  }

  const shareText =
    `🎯 I scored ${score}/100 on an AI Voice Technical Interview for ${role} on AptIAnimate!\n` +
    `Try yours free 👇 https://aptianimate.vercel.app/#/resume-interview`;

  const waText = encodeURIComponent(shareText);

  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(null);
        return;
      }

      const fileName = `aptianimate-interview-score-${score}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // ── Mobile (Android/iOS): Web Share API → opens native WhatsApp share sheet ──
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `I scored ${score}/100 — AptIAnimate AI Interview`,
            text: shareText,
            files: [file]
          });
          resolve('shared');
        } catch (err) {
          if (err.name !== 'AbortError') {
            downloadAndOpenWhatsApp(blob, fileName, waText);
            resolve('downloaded');
          } else {
            resolve(null);
          }
        }
      } else {
        // ── Desktop: Download the PNG, then open WhatsApp Web pre-filled ──
        downloadAndOpenWhatsApp(blob, fileName, waText);
        resolve('downloaded');
      }
    }, 'image/png', 1.0);
  });
}

function downloadAndOpenWhatsApp(blob, fileName, waText) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);

  setTimeout(() => {
    window.open(`https://web.whatsapp.com/send?text=${waText}`, '_blank');
  }, 800);
}

/**
 * Direct HTML5 2D Canvas rendering fallback
 * Renders the full 1200x675 UI/UX Pro design directly with 2D Canvas context.
 */
function drawFlashcardOnCanvas({
  score = 0,
  role = 'Full-Stack Software Engineer',
  name = 'Candidate',
  durationMin = 0,
  durationSec = 0,
  verdict = 'PLACEMENT READY',
  categoryScores = {},
  strengths = [],
  areasForImprovement = []
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const isHigh = score >= 80;
  const isMid = score >= 65 && score < 80;
  const isLow = score > 0 && score < 65;
  const isZero = score === 0;

  const vColor = isHigh ? '#10b981' : isMid ? '#f59e0b' : isLow ? '#f87171' : '#94a3b8';
  const vBg = isHigh ? 'rgba(16, 185, 129, 0.15)' : isMid ? 'rgba(245, 158, 11, 0.15)' : isLow ? 'rgba(248, 113, 113, 0.15)' : 'rgba(148, 163, 184, 0.12)';

  // ── Background & Ambient Lighting ──
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
  bgGrad.addColorStop(0, '#060913');
  bgGrad.addColorStop(0.45, '#0c1222');
  bgGrad.addColorStop(0.8, '#140d28');
  bgGrad.addColorStop(1, '#060913');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 675);

  ctx.save();
  ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
  ctx.beginPath();
  ctx.arc(1150, 50, 220, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(168, 85, 247, 0.10)';
  ctx.beginPath();
  ctx.arc(50, 620, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ── Header Bar ──
  ctx.save();
  const iconGrad = ctx.createLinearGradient(44, 36, 90, 82);
  iconGrad.addColorStop(0, '#6366f1');
  iconGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = iconGrad;
  if (ctx.roundRect) ctx.roundRect(44, 36, 46, 46, 13);
  else ctx.fillRect(44, 36, 46, 46);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 47, 24, 24);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '900 24px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('AptIAnimate', 104, 62);

  ctx.fillStyle = '#818cf8';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.fillText('PRO', 255, 60);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 11px system-ui, sans-serif';
  ctx.fillText('AI TECHNICAL INTERVIEW EVALUATION • PLACEMENT AUDIT', 104, 78);

  // Verdict Pill
  const badgeText = (verdict || (isZero ? 'NO ANSWERS RECORDED' : 'PLACEMENT READY')).toUpperCase();
  ctx.font = 'bold 13px system-ui, sans-serif';
  const badgeWidth = ctx.measureText(badgeText).width + 48;
  ctx.fillStyle = vBg;
  if (ctx.roundRect) ctx.roundRect(1200 - 44 - badgeWidth, 40, badgeWidth, 38, 19);
  else ctx.fillRect(1200 - 44 - badgeWidth, 40, badgeWidth, 38);
  ctx.fill();
  ctx.strokeStyle = vColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = vColor;
  ctx.beginPath();
  ctx.arc(1200 - 44 - badgeWidth + 18, 59, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.fillText(badgeText, 1200 - 44 - badgeWidth + 28, 64);
  ctx.restore();

  // ── 3 Column Cards ──
  const yTop = 104;
  const cardH = 485;

  // Card 1: Score & Identity
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  if (ctx.roundRect) ctx.roundRect(44, yTop, 310, cardH, 18);
  else ctx.fillRect(44, yTop, 310, cardH);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Score Dial
  const cx = 44 + 155;
  const cy = yTop + 105;
  const r = 62;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
  ctx.lineWidth = 12;
  ctx.stroke();

  if (score > 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (score / 100)));
    ctx.strokeStyle = vColor;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = '900 46px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(String(score), cx, cy + 12);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 10px system-ui, sans-serif';
  ctx.fillText('OUT OF 100', cx, cy + 28);

  const tierText = isHigh ? 'TIER 1 • READY' : isMid ? 'TIER 2 • QUALIFIED' : isLow ? 'NEEDS PRACTICE' : 'NOT ATTEMPTED';
  ctx.fillStyle = `${vColor}22`;
  if (ctx.roundRect) ctx.roundRect(cx - 65, cy + 42, 130, 22, 11);
  else ctx.fillRect(cx - 65, cy + 42, 130, 22);
  ctx.fill();
  ctx.strokeStyle = `${vColor}66`;
  ctx.stroke();
  ctx.fillStyle = vColor;
  ctx.font = 'bold 10px system-ui, sans-serif';
  ctx.fillText(tierText, cx, cy + 57);

  // Candidate avatar & name
  const initial = (name || 'C').trim().charAt(0).toUpperCase();
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.arc(cx, yTop + 270, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(initial, cx, yTop + 277);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 18px system-ui, sans-serif';
  ctx.fillText(name, cx, yTop + 320);

  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.fillText(role, cx, yTop + 344);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px system-ui, sans-serif';
  ctx.fillText(`⏱ ${durationMin}m ${String(durationSec).padStart(2, '0')}s • 6 Questions • AI Evaluated`, cx, yTop + 380);
  ctx.restore();

  // Card 2: Competency Breakdown
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  if (ctx.roundRect) ctx.roundRect(374, yTop, 480, cardH, 18);
  else ctx.fillRect(374, yTop, 480, cardH);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '800 12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CORE COMPETENCY BREAKDOWN', 396, yTop + 34);

  const pillars = [
    { icon: '💬', title: 'Communication & Clarity', val: categoryScores.communication ?? 0, col: '#60a5fa', bg: '#172554' },
    { icon: '🔬', title: 'Technical Depth & Architecture', val: categoryScores.technicalDepth ?? 0, col: '#34d399', bg: '#064e3b' },
    { icon: '📁', title: 'Project Context & STAR Method', val: categoryScores.projectClarity ?? 0, col: '#f472b6', bg: '#500724' },
    { icon: '🧩', title: 'Problem Solving & Critical Logic', val: categoryScores.problemSolving ?? 0, col: '#fbbf24', bg: '#451a03' }
  ];

  let pY = yTop + 54;
  pillars.forEach(p => {
    // Row box
    ctx.fillStyle = 'rgba(30, 41, 59, 0.45)';
    if (ctx.roundRect) ctx.roundRect(396, pY, 436, 74, 12);
    else ctx.fillRect(396, pY, 436, 74);
    ctx.fill();

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${p.icon}  ${p.title}`, 412, pY + 28);

    ctx.fillStyle = p.col;
    ctx.font = '900 15px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${p.val}%`, 816, pY + 28);

    // Track
    ctx.fillStyle = p.bg;
    if (ctx.roundRect) ctx.roundRect(412, pY + 44, 404, 7, 4);
    else ctx.fillRect(412, pY + 44, 404, 7);
    ctx.fill();

    // Fill
    const fillW = Math.max(p.val > 0 ? 6 : 0, (p.val / 100) * 404);
    ctx.fillStyle = p.col;
    if (ctx.roundRect) ctx.roundRect(412, pY + 44, fillW, 7, 4);
    else ctx.fillRect(412, pY + 44, fillW, 7);
    ctx.fill();

    pY += 88;
  });

  ctx.fillStyle = 'rgba(2, 6, 23, 0.5)';
  if (ctx.roundRect) ctx.roundRect(396, yTop + 424, 436, 36, 8);
  else ctx.fillRect(396, yTop + 424, 436, 36);
  ctx.fill();

  ctx.fillStyle = '#64748b';
  ctx.font = '600 11px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('🎯 Placement standard requires >75% across all 4 pillars', 412, yTop + 446);
  ctx.restore();

  // Card 3: Recruiter Quick-Take
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  if (ctx.roundRect) ctx.roundRect(874, yTop, 282, cardH, 18);
  else ctx.fillRect(874, yTop, 282, cardH);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '800 12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('RECRUITER QUICK-TAKE', 894, yTop + 34);

  if (isZero) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
    if (ctx.roundRect) ctx.roundRect(894, yTop + 54, 242, 140, 12);
    else ctx.fillRect(894, yTop + 54, 242, 140);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
    ctx.stroke();

    ctx.fillStyle = '#fca5a5';
    ctx.font = '800 13px system-ui, sans-serif';
    ctx.fillText('⚠️ Session Incomplete', 910, yTop + 84);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 11.5px system-ui, sans-serif';
    ctx.fillText('No spoken or typed responses', 910, yTop + 112);
    ctx.fillText('were recorded. Check microphone', 910, yTop + 132);
    ctx.fillText('or practice in Type Mode.', 910, yTop + 152);
  } else {
    // Strength
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    if (ctx.roundRect) ctx.roundRect(894, yTop + 54, 242, 90, 12);
    else ctx.fillRect(894, yTop + 54, 242, 90);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('🌟 CORE STRENGTH', 910, yTop + 76);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 11px system-ui, sans-serif';
    ctx.fillText(strengths[0] ? strengths[0].slice(0, 50) + '...' : 'Strong articulation and depth.', 910, yTop + 98);

    // Area
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    if (ctx.roundRect) ctx.roundRect(894, yTop + 158, 242, 90, 12);
    else ctx.fillRect(894, yTop + 158, 242, 90);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('🎯 PRIORITY FOCUS', 910, yTop + 180);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 11px system-ui, sans-serif';
    ctx.fillText(areasForImprovement[0] ? areasForImprovement[0].slice(0, 50) + '...' : 'Add quantifiable STAR metrics.', 910, yTop + 202);
  }

  // Tags
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 10px system-ui, sans-serif';
  ctx.fillText('#SystemDesign  #Architecture  #DSA', 894, yTop + 370);

  // Seal
  ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
  if (ctx.roundRect) ctx.roundRect(894, yTop + 404, 242, 56, 10);
  else ctx.fillRect(894, yTop + 404, 242, 56);
  ctx.fill();
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
  ctx.stroke();

  ctx.fillStyle = '#c7d2fe';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.fillText('🛡️ AptIAnimate Certified', 914, yTop + 428);
  ctx.fillStyle = '#818cf8';
  ctx.font = '500 10px system-ui, sans-serif';
  ctx.fillText('Industry-Standard AI Placement Rubric', 914, yTop + 444);
  ctx.restore();

  // ── Footer Bar ──
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(44, 615);
  ctx.lineTo(1156, 615);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '600 12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('aptianimate.vercel.app • AI-Powered Placement Prep & Technical Interviews', 44, 646);

  const ctaGrad = ctx.createLinearGradient(940, 626, 1156, 660);
  ctaGrad.addColorStop(0, '#6366f1');
  ctaGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = ctaGrad;
  if (ctx.roundRect) ctx.roundRect(940, 626, 216, 34, 17);
  else ctx.fillRect(940, 626, 216, 34);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Practice Your Resume Free ➔', 1048, 647);
  ctx.restore();

  return canvas;
}
