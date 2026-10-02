// src/utils/shareCard.js
// Captures a hidden flashcard div as a PNG and shares it via Web Share API (mobile)
// or downloads it as a file (desktop).

import html2canvas from 'html2canvas';

/**
 * Captures the given ref element as a high-resolution PNG and shares/downloads it.
 * @param {React.RefObject} cardRef - ref pointing to the hidden flashcard <div>
 * @param {Object} shareData - { score, verdict, role }
 */
export async function captureCardAndShare(cardRef, { score, verdict: _verdict, role } = {}) {
  if (!cardRef?.current) {
    console.warn('shareCard: cardRef is not mounted');
    return;
  }

  // Make the card temporarily visible off-screen so html2canvas can render it
  const el = cardRef.current;
  const prevVisibility = el.style.visibility;
  el.style.visibility = 'visible';

  let canvas;
  try {
    canvas = await html2canvas(el, {
      scale: 2,          // 2x = crisp on retina/HD screens
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
      // Force exact width so the 1200px card renders correctly
      width: 1200,
      windowWidth: 1200
    });
  } catch (err) {
    console.error('html2canvas error:', err);
    el.style.visibility = prevVisibility;
    return;
  }

  el.style.visibility = prevVisibility;

  const shareText =
    `🎯 I scored ${score}/100 on an AI Voice Technical Interview for ${role} on AptIAnimate!\n` +
    `Try yours free 👇 https://aptianimate.vercel.app/#/resume-interview`;

  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) { resolve(); return; }

      const fileName = `aptianimate-interview-score-${score}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // ── Mobile: Web Share API → opens native WhatsApp/Instagram share sheet ──
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `I scored ${score}/100 — AptIAnimate AI Interview`,
            text: shareText,
            files: [file]
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            // Fallback to download if share fails
            triggerDownload(blob, fileName);
          }
        }
      } else {
        // ── Desktop: download the PNG ──
        triggerDownload(blob, fileName);
      }

      resolve();
    }, 'image/png', 1.0);
  });
}

function triggerDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
