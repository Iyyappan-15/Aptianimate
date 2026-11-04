// src/components/ReelCaptureModal.jsx
// Mobile 9:16 vertical preview & recording helper for creating viral YouTube Shorts & Instagram Reels.

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReelCaptureModal({ isOpen, onClose, topicTitle, hookText, children, formulaPill, shareUrl }) {
  const [copied, setCopied] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const textToShare = `🔥 Check out this visual shortcut for ${topicTitle} on AptiAnimate!\n👉 ${shareUrl || window.location.href}`;
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyCaption = () => {
    const caption = `🔥 ${hookText || `Why do formulas work? Watch ${topicTitle}!`}

Master aptitude visually in seconds with interactive step-by-step physics simulations!
👉 Try it free at: ${shareUrl || 'https://aptianimate.vercel.app'}

#campusplacements #aptitudepreparation #tcsnqt #quantitativeaptitude #placementprep #shortcuts #shorts #reels`;
    navigator.clipboard.writeText(caption);
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const textToShare = `🔥 Master ${topicTitle} visually! Watch this interactive shortcut:\n👉 ${shareUrl || window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`, '_blank');
  };

  const handleAutoRecord = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRecording(false);
      setCountdown(15);
      return;
    }

    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert("In-browser recording works best on desktop Chrome or Edge. On mobile phones, swipe down from top and tap your phone's built-in Screen Recorder!");
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: false,
      });

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : 'video/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fileExt = mimeType.includes('mp4') ? 'mp4' : 'webm';
        a.href = url;
        const cleanName = (topicTitle || 'aptianimate-clip').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        a.download = `${cleanName}-short.${fileExt}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setIsRecording(false);
        setCountdown(15);
      };

      mediaRecorder.start();
      setIsRecording(true);
      let timeLeft = 15;
      setCountdown(timeLeft);

      timerRef.current = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timerRef.current);
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          }
        }
      }, 1000);
    } catch (err) {
      console.error('Recording cancelled or not permitted:', err);
      setIsRecording(false);
      setCountdown(15);
    }
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '850px',
            width: '100%',
          }}
        >
          {/* 9:16 Vertical Phone Simulator Frame */}
          <div style={{
            width: '320px',
            height: '568px',
            borderRadius: '36px',
            border: '8px solid #1e293b',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124, 58, 237, 0.3)',
            backgroundColor: '#090d16',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}>
            {/* Top Phone Speaker Notch */}
            <div style={{
              width: '100px',
              height: '16px',
              backgroundColor: '#1e293b',
              margin: '0 auto',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
            }} />

            {/* Hook Header for Shorts */}
            <div style={{ padding: '12px 16px 6px', textAlign: 'center' }}>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '3px 10px',
                borderRadius: '20px',
                marginBottom: '8px',
              }}>
                Aptitude Visual Trick
              </span>
              <h3 style={{
                color: '#f8fafc',
                fontSize: '1.05rem',
                fontWeight: 800,
                lineHeight: 1.25,
                margin: 0,
              }}>
                {hookText || `Why do formulas work? Watch ${topicTitle}!`}
              </h3>
            </div>

            {/* Central Animated Canvas (Embedded Physics Engine) */}
            <div style={{ padding: '0 8px', flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', transform: 'scale(0.92)', transformOrigin: 'center' }}>
                {children}
              </div>
            </div>

            {/* Bottom Formula & Watermark */}
            <div style={{
              padding: '12px 16px 16px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.95) 40%)',
            }}>
              {formulaPill && (
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(13, 148, 136, 0.2)',
                  border: '1px solid #0d9488',
                  color: '#2dd4bf',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '16px',
                  marginBottom: '10px',
                }}>
                  {formulaPill}
                </div>
              )}
              <div style={{
                fontSize: '0.72rem',
                color: '#94a3b8',
                fontWeight: 600,
              }}>
                Practice 800+ Free Interactive Questions
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#a78bfa',
                fontWeight: 800,
                letterSpacing: '0.5px',
              }}>
                aptianimate.vercel.app
              </div>
            </div>
          </div>

          {/* Action & Instructions Panel */}
          <div style={{
            flex: 1,
            minWidth: '280px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
            color: 'var(--text)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🎬</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Shorts / Reel Studio
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: 'var(--muted)',
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-sec)', margin: 0, lineHeight: 1.5 }}>
              Use the phone simulator on the left to screen-record a 15-second viral Short or Reel.
            </p>

            <div style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '12px 14px',
              fontSize: '0.82rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <div style={{ fontWeight: 700, color: 'var(--violet)' }}>💡 Quick Video Creation:</div>
              <div>• Click <strong>1-Click Record</strong> below to capture this 15-second animated clip and download it automatically.</div>
              <div>• Click <strong>Copy Post Caption</strong> to get viral hashtags and links ready to paste on YouTube Shorts / Instagram!</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sec)', marginTop: '2px' }}>
                (On mobile phones: use your phone’s built-in Screen Recorder from the quick settings menu)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              {/* 1-Click Auto-Record & Download */}
              <button
                onClick={handleAutoRecord}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: isRecording ? '#dc2626' : 'linear-gradient(135deg, #ef4444, #f59e0b)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '13px 18px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: isRecording ? '0 0 16px rgba(220, 38, 38, 0.7)' : '0 4px 14px rgba(239, 68, 68, 0.35)',
                  transition: 'all 0.2s',
                }}
              >
                <span>{isRecording ? '⏹️' : '🔴'}</span>
                {isRecording
                  ? `Recording... ${countdown}s left (Click to Stop & Save)`
                  : '1-Click Record & Download Clip (15s)'}
              </button>

              {/* Copy Ready-to-Post Caption */}
              <button
                onClick={handleCopyCaption}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: captionCopied ? '#10b981' : 'var(--surface2)',
                  color: captionCopied ? '#fff' : 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '11px 18px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span>{captionCopied ? '✅' : '📋'}</span>
                {captionCopied ? 'Viral Caption & Tags Copied!' : 'Copy Viral Caption & Tags'}
              </button>

              {/* Share to WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '11px 18px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                }}
              >
                <span>💬</span> Share to WhatsApp Group
              </button>

              {/* Direct Topic Link */}
              <button
                onClick={handleCopyLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: copied ? '#10b981' : 'linear-gradient(135deg, var(--violet), var(--teal))',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '11px 18px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span>{copied ? '✅' : '🔗'}</span>
                {copied ? 'Topic Link Copied!' : 'Copy Topic Link'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
