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
 * @param {Object} shareData - { score, role, name, durationSeconds, verdict, categoryScores }
 * @returns {Promise<string|null>} resolves to 'shared' | 'downloaded' | null
 */
export async function captureCardAndShare(cardRef, shareData = {}) {
  const score = shareData.score ?? 0;
  const role = shareData.role || 'Software Engineer';
  const name = shareData.name || 'Candidate';
  const durationSeconds = shareData.durationSeconds || 0;
  const durationMin = Math.floor(durationSeconds / 60);
  const durationSec = durationSeconds % 60;
  const verdict = shareData.verdict || (score >= 80 ? 'Placement Ready' : score >= 65 ? 'Good Foundation' : 'Needs More Practice');
  const categoryScores = shareData.categoryScores || {};

  let canvas = null;

  // ── ATTEMPT 1: html2canvas with offscreen clone ──
  const el = cardRef?.current;
  if (el) {
    try {
      canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#0a0e1a',
        logging: false,
        width: 1200,
        height: 630,
        windowWidth: 1200,
        windowHeight: 630,
        onclone: (_clonedDoc, clonedEl) => {
          // Inside the isolated offscreen iframe: make element visible for render
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
      categoryScores
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
            // Share failed — fall back to download + WhatsApp Web
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
  // 1. Auto-download the PNG to the user's Downloads folder
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);

  // 2. Open WhatsApp Web with pre-filled message
  setTimeout(() => {
    window.open(`https://web.whatsapp.com/send?text=${waText}`, '_blank');
  }, 800);
}

/**
 * Direct HTML5 2D Canvas rendering fallback
 * Guarantees crisp 1200x630 flashcard PNG generation on all browsers without any external dependency.
 */
function drawFlashcardOnCanvas({
  score = 0,
  role = 'Software Engineer',
  name = 'Candidate',
  durationMin = 0,
  durationSec = 0,
  verdict = 'Placement Ready',
  categoryScores = {}
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGrad.addColorStop(0, '#0a0e1a');
  bgGrad.addColorStop(0.4, '#0f172a');
  bgGrad.addColorStop(0.7, '#1a0e2e');
  bgGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  // Decorative glow
  ctx.save();
  ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
  ctx.beginPath();
  ctx.arc(1140, 60, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(168, 85, 247, 0.10)';
  ctx.beginPath();
  ctx.arc(60, 570, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Top Row: Logo & Header
  ctx.save();
  const iconGrad = ctx.createLinearGradient(52, 44, 96, 88);
  iconGrad.addColorStop(0, '#6366f1');
  iconGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = iconGrad;
  if (ctx.roundRect) ctx.roundRect(52, 44, 44, 44, 12);
  else ctx.fillRect(52, 44, 44, 44);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(62, 54, 24, 24);

  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('AptIAnimate', 110, 68);
  ctx.fillStyle = '#818cf8';
  ctx.font = '600 12px system-ui, sans-serif';
  ctx.fillText('AI INTERVIEW CERTIFICATE', 110, 84);

  // Verdict badge
  const verdictLower = (verdict || '').toLowerCase();
  const vColor = (verdictLower.includes('ready') || verdictLower.includes('strong')) && score >= 70
    ? '#10b981'
    : verdictLower.includes('good') && score >= 50
    ? '#f59e0b'
    : '#ef4444';

  ctx.font = 'bold 14px system-ui, sans-serif';
  const badgeText = (verdict || 'Needs More Practice').toUpperCase();
  const badgeWidth = ctx.measureText(badgeText).width + 36;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  if (ctx.roundRect) ctx.roundRect(1200 - 52 - badgeWidth, 44, badgeWidth, 38, 19);
  else ctx.fillRect(1200 - 52 - badgeWidth, 44, badgeWidth, 38);
  ctx.fill();
  ctx.strokeStyle = vColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = vColor;
  ctx.textAlign = 'center';
  ctx.fillText(badgeText, 1200 - 52 - (badgeWidth / 2), 68);
  ctx.restore();

  // Score Ring
  ctx.save();
  const cx = 175;
  const cy = 250;
  const r = 64;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 14;
  ctx.stroke();

  const pct = Math.max(0, Math.min(100, score));
  const ringColor = pct >= 80 ? '#10b981' : pct >= 65 ? '#f59e0b' : pct > 0 ? '#ef4444' : '#64748b';
  if (pct > 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (pct / 100)));
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  ctx.fillStyle = '#f1f5f9';
  ctx.font = '900 44px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(String(pct), cx, cy + 12);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 11px system-ui, sans-serif';
  ctx.fillText('OUT OF 100', cx, cy + 32);

  // Candidate Name + Role + Duration
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(name, cx, 375);
  ctx.fillStyle = '#a78bfa';
  ctx.font = '600 14px system-ui, sans-serif';
  ctx.fillText(role, cx, 400);
  ctx.fillStyle = '#64748b';
  ctx.font = '500 12px system-ui, sans-serif';
  ctx.fillText(`⏱ ${durationMin}m ${String(durationSec).padStart(2, '0')}s • Completed`, cx, 425);
  ctx.restore();

  // Vertical divider
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(330, 160);
  ctx.lineTo(330, 470);
  ctx.stroke();

  // Performance Breakdown
  ctx.save();
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('PERFORMANCE BREAKDOWN', 370, 175);

  const categories = [
    { label: '💬 Communication', val: categoryScores.communication ?? 0, col: '#60a5fa', bg: '#1e3a5f' },
    { label: '🔬 Technical Depth', val: categoryScores.technicalDepth ?? 0, col: '#34d399', bg: '#0d2e22' },
    { label: '📁 Project Clarity', val: categoryScores.projectClarity ?? 0, col: '#f472b6', bg: '#3b1a2e' },
    { label: '🧩 Problem Solving', val: categoryScores.problemSolving ?? 0, col: '#fbbf24', bg: '#2e230a' }
  ];

  let y = 220;
  categories.forEach(cat => {
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '600 15px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(cat.label, 370, y + 2);

    ctx.fillStyle = cat.bg;
    if (ctx.roundRect) ctx.roundRect(570, y - 8, 480, 10, 5);
    else ctx.fillRect(570, y - 8, 480, 10);
    ctx.fill();

    const fillW = Math.max(8, (cat.val / 100) * 480);
    ctx.fillStyle = cat.col;
    if (ctx.roundRect) ctx.roundRect(570, y - 8, fillW, 10, 5);
    else ctx.fillRect(570, y - 8, fillW, 10);
    ctx.fill();

    ctx.fillStyle = cat.col;
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${cat.val}%`, 1120, y + 2);

    y += 48;
  });
  ctx.restore();

  // Footer Branding
  ctx.save();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(52, 550);
  ctx.lineTo(1148, 550);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '500 13px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('aptianimate.vercel.app • AI-powered mock interviews tailored to your resume', 52, 585);

  const ctaGrad = ctx.createLinearGradient(1030, 565, 1148, 597);
  ctaGrad.addColorStop(0, '#6366f1');
  ctaGrad.addColorStop(1, '#a855f7');
  ctx.fillStyle = ctaGrad;
  if (ctx.roundRect) ctx.roundRect(1030, 565, 118, 34, 17);
  else ctx.fillRect(1030, 565, 118, 34);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Try it free →', 1089, 587);
  ctx.restore();

  return canvas;
}
