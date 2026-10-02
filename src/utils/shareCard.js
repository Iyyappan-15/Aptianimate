// src/utils/shareCard.js
// Captures a hidden flashcard div as a high-resolution PNG.
// On mobile: uses Web Share API to open native WhatsApp/Instagram sheet.
// On desktop: auto-downloads the PNG and opens WhatsApp Web with a pre-filled message.

import html2canvas from 'html2canvas';

/**
 * Captures the given ref element as a 2x-resolution PNG and shares/downloads it.
 * @param {React.RefObject} cardRef - ref pointing to the ScoreShareCard <div>
 * @param {Object} shareData - { score, role }
 * @returns {Promise<string|null>} resolves to 'shared' | 'downloaded' | null
 */
export async function captureCardAndShare(cardRef, { score, role } = {}) {
  if (!cardRef?.current) {
    console.warn('shareCard: cardRef is not mounted');
    return null;
  }

  const el = cardRef.current;

  // ── STEP 1: Temporarily bring element into the visible rendering area ──
  // html2canvas CANNOT render elements at top:-9999px or with visibility:hidden.
  // We move it to top:0/left:0 behind everything (z-index:-99999) for capture.
  const savedStyle = {
    position: el.style.position,
    top: el.style.top,
    left: el.style.left,
    visibility: el.style.visibility,
    opacity: el.style.opacity,
    zIndex: el.style.zIndex,
    pointerEvents: el.style.pointerEvents
  };

  el.style.position = 'fixed';
  el.style.top = '0px';
  el.style.left = '0px';
  el.style.visibility = 'visible';
  el.style.opacity = '1';
  el.style.zIndex = '-99999';       // behind all page content
  el.style.pointerEvents = 'none';  // no accidental interactions

  // Give the browser one frame to paint the element before html2canvas reads it
  await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 80)));

  let canvas;
  try {
    canvas = await html2canvas(el, {
      scale: 2,            // 2x resolution = crisp on HD/retina displays
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      width: 1200,
      height: 630,
      windowWidth: 1200,
      windowHeight: 630
    });
  } catch (err) {
    console.error('html2canvas capture failed:', err);
    return null;
  } finally {
    // ── STEP 2: Always restore original styles ──
    el.style.position = savedStyle.position;
    el.style.top = savedStyle.top;
    el.style.left = savedStyle.left;
    el.style.visibility = savedStyle.visibility;
    el.style.opacity = savedStyle.opacity;
    el.style.zIndex = savedStyle.zIndex;
    el.style.pointerEvents = savedStyle.pointerEvents;
  }

  const shareText =
    `🎯 I scored ${score}/100 on an AI Voice Technical Interview for ${role} on AptIAnimate!\n` +
    `Try yours free 👇 https://aptianimate.vercel.app/#/resume-interview`;

  const waText = encodeURIComponent(shareText);

  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) { resolve(null); return; }

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
  //    User just needs to attach the downloaded image in the chat
  setTimeout(() => {
    window.open(`https://web.whatsapp.com/send?text=${waText}`, '_blank');
  }, 800);
}
