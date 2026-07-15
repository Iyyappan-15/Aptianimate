const fs = require('fs');
let content = fs.readFileSync('src/pages/TopicPage.jsx', 'utf8');

const oldStyle = 'style={{ width:210, height:210, objectFit:"contain", filter:"drop-shadow(0 8px 32px rgba(" + glowRgba + ",.45))" }}';
const newStyle = 'style={{ width:"100%", maxWidth:360, height:"auto", maxHeight:360, objectFit:"contain", filter:"drop-shadow(0 12px 40px rgba(" + glowRgba + ",.55))", mixBlendMode: document.documentElement.getAttribute("data-theme") === "dark" ? "screen" : "multiply" }}';

if (content.includes(oldStyle)) {
  content = content.replace(oldStyle, newStyle);
  console.log('Replaced trophy style');
} else {
  console.log('Could not find trophy style');
}

// Update grid template columns so the right column is bigger
const oldGrid = 'gridTemplateColumns:"1fr 240px"';
const newGrid = 'gridTemplateColumns:"1fr 360px"';
if (content.includes(oldGrid)) {
  content = content.replace(oldGrid, newGrid);
  console.log('Replaced grid');
}

// Make glow bigger
const oldGlow = 'width:300, height:300';
const newGlow = 'width:450, height:450';
if (content.includes(oldGlow)) {
  content = content.replace(oldGlow, newGlow);
  console.log('Replaced glow');
}

// Shift glow left slightly so it stays centered behind the bigger trophy
const oldGlowPos = 'right:40, top:"50%"';
const newGlowPos = 'right:10, top:"50%"';
if (content.includes(oldGlowPos)) {
  content = content.replace(oldGlowPos, newGlowPos);
  console.log('Replaced glow position');
}

fs.writeFileSync('src/pages/TopicPage.jsx', content, 'utf8');
