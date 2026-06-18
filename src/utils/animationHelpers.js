// src/utils/animationHelpers.js
// Timing and easing utilities for animation engine

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Returns step duration in ms, adjusted by playback speed
export function stepDurationMs(durationSeconds, speed) {
  return (durationSeconds * 1000) / speed;
}

// Animate a value from start to end over duration using rAF
export function animateValue(start, end, durationMs, onUpdate, onDone) {
  const startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / durationMs, 1);
    const value = start + (end - start) * easeOutCubic(t);
    onUpdate(value);
    if (t < 1) requestAnimationFrame(tick);
    else if (onDone) onDone();
  }
  requestAnimationFrame(tick);
}

// SVG arc path helper for pie charts
export function describeArc(cx, cy, r, startAngle, endAngle) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

// Colors palette for charts
export const CHART_COLORS = [
  '#7F77DD', '#1D9E75', '#EF9F27', '#D85A30',
  '#5C85D6', '#2ECC71', '#E74C3C', '#9B59B6',
  '#1ABC9C', '#F39C12'
];
