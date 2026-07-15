const fs = require('fs');
let content = fs.readFileSync('src/pages/TopicPage.jsx', 'utf8');

// The original line:
// style={{ width:210, height:210, objectFit:"contain", filter:`drop-shadow(0 8px 32px rgba(${glowRgba},0.45))` }}

const oldStyle = 'style={{ width:210, height:210, objectFit:"contain", filter:`drop-shadow(0 8px 32px rgba(${glowRgba},0.45))` }}';
const newStyle = 'style={{ width:"100%", maxWidth:360, height:"auto", maxHeight:360, objectFit:"contain", filter:`drop-shadow(0 12px 40px rgba(${glowRgba},0.55))`, mixBlendMode: document.documentElement.getAttribute("data-theme") === "dark" ? "screen" : "multiply" }}';

if (content.includes(oldStyle)) {
  content = content.replace(oldStyle, newStyle);
} else {
  console.log("Could not find style to replace");
}

// Update grid template columns so the right column is bigger
const oldGrid = 'gridTemplateColumns:"1fr 240px"';
const newGrid = 'gridTemplateColumns:"1fr 360px"';
if (content.includes(oldGrid)) {
  content = content.replace(oldGrid, newGrid);
}

// Make glow bigger
const oldGlow = 'width:300, height:300';
const newGlow = 'width:420, height:420';
if (content.includes(oldGlow)) {
  content = content.replace(oldGlow, newGlow);
}

// Shift glow left slightly so it stays centered behind the bigger trophy
const oldGlowPos = 'right:40, top:"50%"';
const newGlowPos = 'right:10, top:"50%"';
if (content.includes(oldGlowPos)) {
  content = content.replace(oldGlowPos, newGlowPos);
}

fs.writeFileSync('src/pages/TopicPage.jsx', content, 'utf8');
console.log('Fixed trophy size successfully');
