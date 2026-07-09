const fs = require('fs');
const path = require('path');

const NUM_EASY = 40;
const NUM_MEDIUM = 40;
const NUM_HARD = 20;
const TOTAL = 100;

const baseDir = path.join(process.cwd(), 'public');
const imgDir = path.join(baseDir, 'images', 'logical-reasoning', 'visual-reasoning', 'pattern-completion');
const dataDir = path.join(baseDir, 'data', 'logical-reasoning', 'visual-reasoning');

// Ensure directories exist
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

let idCounter = 1;
function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `PATTERN_${num}`;
}

// Helper to write SVG files
function writeSvg(filename, content) {
  const filepath = path.join(imgDir, filename);
  fs.writeFileSync(filepath, content);
  return `images/logical-reasoning/visual-reasoning/pattern-completion/${filename}`;
}

// --- SVG Generator Helpers ---

function createBaseSVG(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${content}
</svg>`;
}

// Renders a 2x2 grid
// contents: array of 4 SVG strings for cells (top-left, top-right, bottom-left, bottom-right)
function create2x2Grid(contents, qMarkIndex = 3) {
  const cellSize = 100;
  let svg = `<rect x="10" y="10" width="200" height="200" fill="none" stroke="#000" stroke-width="4" />
<line x1="110" y1="10" x2="110" y2="210" stroke="#000" stroke-width="2" />
<line x1="10" y1="110" x2="210" y2="110" stroke="#000" stroke-width="2" />`;

  const positions = [
    { x: 10, y: 10 },
    { x: 110, y: 10 },
    { x: 10, y: 110 },
    { x: 110, y: 110 }
  ];

  for (let i = 0; i < 4; i++) {
    if (i === qMarkIndex) {
      svg += `<text x="${positions[i].x + 50}" y="${positions[i].y + 65}" font-family="Arial" font-size="40" text-anchor="middle" font-weight="bold" fill="#555">?</text>`;
    } else {
      svg += `<g transform="translate(${positions[i].x}, ${positions[i].y})">${contents[i]}</g>`;
    }
  }
  return createBaseSVG(220, 220, svg);
}

function createOptionSVG(content) {
  return createBaseSVG(100, 100, `<rect width="100" height="100" fill="none" stroke="#000" stroke-width="2" />${content}`);
}

// Pattern 1: Rotating Arrow
function getRotatingArrow(angle) {
  return `<g transform="translate(50,50) rotate(${angle})"><path d="M-10,20 L10,20 L10,-10 L25,-10 L0,-40 L-25,-10 L-10,-10 Z" fill="#2c3e50"/></g>`;
}

// Pattern 2: Growing Circles
function getGrowingCircle(radius) {
  return `<circle cx="50" cy="50" r="${radius}" fill="#3498db" />`;
}

// Pattern 3: Quadrant fill
function getQuadrantFill(quads) {
  let svg = '';
  if (quads.includes(1)) svg += `<rect x="50" y="0" width="50" height="50" fill="#e74c3c" />`;
  if (quads.includes(2)) svg += `<rect x="0" y="0" width="50" height="50" fill="#e74c3c" />`;
  if (quads.includes(3)) svg += `<rect x="0" y="50" width="50" height="50" fill="#e74c3c" />`;
  if (quads.includes(4)) svg += `<rect x="50" y="50" width="50" height="50" fill="#e74c3c" />`;
  svg += `<line x1="50" y1="0" x2="50" y2="100" stroke="#000" stroke-width="1"/><line x1="0" y1="50" x2="100" y2="50" stroke="#000" stroke-width="1"/>`;
  return svg;
}

// Pattern 4: Multiple shapes
function getMultiShapes(num) {
  let svg = '';
  const positions = [[50,50], [30,30], [70,70], [30,70], [70,30], [50,20], [50,80], [20,50], [80,50]];
  for(let i=0; i<num; i++) {
    svg += `<circle cx="${positions[i][0]}" cy="${positions[i][1]}" r="8" fill="#8e44ad" />`;
  }
  return svg;
}

function shuffleOptions(correctAnswerContent, otherOptionsContent) {
  const opts = [correctAnswerContent, ...otherOptionsContent].slice(0, 4);
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  const correctIndex = opts.indexOf(correctAnswerContent);
  return { opts, correctIndex };
}

const questionsData = [];

// EASY (40 items): simple rotations, growth, dot counts
for (let i = 0; i < NUM_EASY; i++) {
  let qId = getId();
  let type = i % 4;
  
  let cells = [];
  let correctCell = '';
  let wrongCells = [];
  let meta = {};
  let exp = "";
  
  if (type === 0) {
    // Rotation +90 deg
    let baseAngle = (i * 45) % 360;
    cells = [getRotatingArrow(baseAngle), getRotatingArrow(baseAngle + 90), getRotatingArrow(baseAngle + 180), getRotatingArrow(baseAngle + 270)];
    correctCell = cells[3];
    wrongCells = [getRotatingArrow(baseAngle), getRotatingArrow(baseAngle + 45), getRotatingArrow(baseAngle + 135)];
    meta = { type: "Rotation", rotation: 90, shape: "arrow" };
    exp = "Step 1: Observe the arrow in the top-left cell. Step 2: The arrow rotates 90 degrees clockwise in each subsequent cell. Step 3: Following this pattern, the missing figure should be the arrow rotated 270 degrees from the start. Final Answer: Select the correctly rotated arrow.";
  } else if (type === 1) {
    // Growing Circles (10, 20, 30, 40)
    let baseR = 10 + (i % 3) * 5;
    cells = [getGrowingCircle(baseR), getGrowingCircle(baseR+10), getGrowingCircle(baseR+20), getGrowingCircle(baseR+30)];
    correctCell = cells[3];
    wrongCells = [getGrowingCircle(baseR+40), getGrowingCircle(baseR+5), getGrowingCircle(baseR+15)];
    meta = { type: "Scaling", shape: "circle", progression: "+10 radius" };
    exp = "Step 1: Observe the circle size. Step 2: The circle's radius increases uniformly across the cells. Step 3: The missing figure must be the largest circle in the sequence. Final Answer: Select the circle with the correct increased size.";
  } else if (type === 2) {
    // Quadrants filling (1, 1+2, 1+2+3, 1+2+3+4)
    let start = (i % 4) + 1;
    let s2 = (start % 4) + 1;
    let s3 = (s2 % 4) + 1;
    let s4 = (s3 % 4) + 1;
    cells = [getQuadrantFill([start]), getQuadrantFill([start, s2]), getQuadrantFill([start, s2, s3]), getQuadrantFill([start, s2, s3, s4])];
    correctCell = cells[3];
    wrongCells = [getQuadrantFill([start, s2]), getQuadrantFill([s2, s3, s4]), getQuadrantFill([s3, s4])];
    meta = { type: "Shape Addition", shape: "quadrants", progression: "clockwise fill" };
    exp = "Step 1: Notice which quadrant is filled initially. Step 2: In each step, one additional adjacent quadrant is filled. Step 3: The missing figure should have all four quadrants filled based on the sequence. Final Answer: Select the fully filled square.";
  } else {
    // Multi shapes (dots 1 -> 2 -> 3 -> 4)
    let startNum = (i % 3) + 1;
    cells = [getMultiShapes(startNum), getMultiShapes(startNum+1), getMultiShapes(startNum+2), getMultiShapes(startNum+3)];
    correctCell = cells[3];
    wrongCells = [getMultiShapes(startNum+4), getMultiShapes(startNum-1 > 0 ? startNum-1 : 5), getMultiShapes(startNum+5)];
    meta = { type: "Number progression", shape: "dots", progression: "+1 dot" };
    exp = "Step 1: Count the dots in the first cell. Step 2: The number of dots increases by 1 in each subsequent cell. Step 3: The missing figure must have exactly one more dot than the previous cell. Final Answer: Select the correct dot count.";
  }

  let qImgStr = create2x2Grid(cells, 3);
  let qImgPath = writeSvg(`${qId.toLowerCase()}_q.svg`, qImgStr);
  
  let { opts, correctIndex } = shuffleOptions(correctCell, wrongCells);
  let optionsArr = [];
  const labels = ["A", "B", "C", "D"];
  for(let j=0; j<4; j++){
    let optImgPath = writeSvg(`${qId.toLowerCase()}_opt_${labels[j].toLowerCase()}.svg`, createOptionSVG(opts[j]));
    optionsArr.push({ id: labels[j], image: optImgPath });
  }

  questionsData.push({
    id: qId,
    topic: "Logical Reasoning",
    subtopic: "Pattern Completion",
    difficulty: "Easy",
    questionImage: qImgPath,
    question: "Choose the missing figure that completes the pattern.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: "Identify the single rule (like rotation or counting) and apply it directly to the last state.",
    commonMistake: "Overcomplicating the pattern instead of looking for basic increment or rotation.",
    estimatedTime: "40 sec",
    keywords: ["visual reasoning", "pattern completion", "svg"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

// MEDIUM (40 items): combination of 2 transformations (e.g. rotation + size, or 2 shapes moving differently)
for (let i = 0; i < NUM_MEDIUM; i++) {
  let qId = getId();
  let type = i % 2;
  
  let cells = [];
  let correctCell = '';
  let wrongCells = [];
  let meta = {};
  let exp = "";
  
  if (type === 0) {
    // Shape + Rotation + Color change
    // Using a triangle that rotates and changes color
    function getMediumPoly(angle, col) {
      return `<g transform="translate(50,50) rotate(${angle})"><polygon points="0,-30 25,20 -25,20" fill="${col}"/></g>`;
    }
    let colors = ["#e74c3c", "#f1c40f", "#2ecc71", "#3498db"];
    let a = i * 30;
    cells = [
      getMediumPoly(a, colors[0]),
      getMediumPoly(a+90, colors[1]),
      getMediumPoly(a+180, colors[2]),
      getMediumPoly(a+270, colors[3])
    ];
    correctCell = cells[3];
    wrongCells = [
      getMediumPoly(a+270, colors[1]), 
      getMediumPoly(a+90, colors[3]), 
      getMediumPoly(a, colors[2])
    ];
    meta = { type: "Rotation + Color", rotation: 90, progression: "color cycles" };
    exp = "Step 1: Observe the triangle's rotation; it turns 90 degrees clockwise each step. Step 2: Observe the color; it changes completely each step. Step 3: The missing figure must be rotated 270 degrees from start and have the 4th color in the sequence. Final Answer: Select the matching rotated and colored shape.";
  } else {
    // Two elements: an outer shape and inner shape
    function getNested(outer, inner, oR) {
      let oSvg = outer === 'circle' ? `<circle cx="50" cy="50" r="${oR}" fill="none" stroke="#2c3e50" stroke-width="4"/>` : `<rect x="${50-oR}" y="${50-oR}" width="${oR*2}" height="${oR*2}" fill="none" stroke="#2c3e50" stroke-width="4"/>`;
      let iSvg = inner === 'circle' ? `<circle cx="50" cy="50" r="${oR/2}" fill="#e67e22"/>` : `<rect x="${50-oR/2}" y="${50-oR/2}" width="${oR}" height="${oR}" fill="#e67e22"/>`;
      return oSvg + iSvg;
    }
    
    // Pattern: Outer shape alternates (circle->rect->circle->rect), Inner shape stays same but size grows
    cells = [
      getNested('circle', 'rect', 20),
      getNested('rect', 'rect', 30),
      getNested('circle', 'rect', 40),
      getNested('rect', 'rect', 45) // the inner rect grows
    ];
    correctCell = cells[3];
    wrongCells = [
      getNested('circle', 'circle', 45),
      getNested('rect', 'circle', 45),
      getNested('circle', 'rect', 30)
    ];
    meta = { type: "Alternation + Scaling", shapes: ["circle", "rect"] };
    exp = "Step 1: Look at the outer shape; it alternates between circle and square. Step 2: Look at the inner shape; it is always a square but grows in size. Step 3: Since cell 3 has an outer circle, cell 4 must have an outer square with a large inner square. Final Answer: Select the correct combination.";
  }

  let qImgStr = create2x2Grid(cells, 3);
  let qImgPath = writeSvg(`${qId.toLowerCase()}_q.svg`, qImgStr);
  
  let { opts, correctIndex } = shuffleOptions(correctCell, wrongCells);
  let optionsArr = [];
  const labels = ["A", "B", "C", "D"];
  for(let j=0; j<4; j++){
    let optImgPath = writeSvg(`${qId.toLowerCase()}_opt_${labels[j].toLowerCase()}.svg`, createOptionSVG(opts[j]));
    optionsArr.push({ id: labels[j], image: optImgPath });
  }

  questionsData.push({
    id: qId,
    topic: "Logical Reasoning",
    subtopic: "Pattern Completion",
    difficulty: "Medium",
    questionImage: qImgPath,
    question: "Choose the missing figure that completes the pattern.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: "Check transformations independently (e.g. track shape first, then color).",
    commonMistake: "Failing to notice one of the transformations (e.g. noticing rotation but missing color change).",
    estimatedTime: "60 sec",
    keywords: ["visual reasoning", "pattern completion", "svg"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

// HARD (20 items): 3 transformations (movement + rotation + state change)
for (let i = 0; i < NUM_HARD; i++) {
  let qId = getId();
  
  // Complex pattern:
  // A dot moves to corners, a line rotates, background shape changes color
  function getHard(dotPos, lineAngle, bgColor) {
    let dpos = { 1: [20,20], 2: [80,20], 3: [80,80], 4: [20,80] };
    let bg = `<rect x="5" y="5" width="90" height="90" fill="${bgColor}" rx="10"/>`;
    let line = `<line x1="50" y1="50" x2="${50 + 30*Math.cos(lineAngle*Math.PI/180)}" y2="${50 + 30*Math.sin(lineAngle*Math.PI/180)}" stroke="#000" stroke-width="4"/>`;
    let dot = `<circle cx="${dpos[dotPos][0]}" cy="${dpos[dotPos][1]}" r="8" fill="#fff"/>`;
    return bg + line + dot;
  }
  
  let colors = ["#34495e", "#95a5a6", "#34495e", "#95a5a6"];
  let dotSeq = [1, 2, 3, 4];
  let angleSeq = [0, 45, 90, 135];
  
  let cells = [
    getHard(dotSeq[0], angleSeq[0], colors[0]),
    getHard(dotSeq[1], angleSeq[1], colors[1]),
    getHard(dotSeq[2], angleSeq[2], colors[2]),
    getHard(dotSeq[3], angleSeq[3], colors[3])
  ];
  
  let correctCell = cells[3];
  let wrongCells = [
    getHard(dotSeq[2], angleSeq[3], colors[3]), // wrong dot
    getHard(dotSeq[3], angleSeq[2], colors[3]), // wrong line
    getHard(dotSeq[3], angleSeq[3], colors[0])  // wrong color
  ];
  
  let meta = { type: "Movement + Rotation + Color", progression: "complex" };
  let exp = "Step 1: Observe the dot; it moves clockwise to each corner. Step 2: Observe the line; it rotates 45 degrees clockwise. Step 3: Observe the background; it alternates colors. Step 4: Combine all three rules for the final cell. Final Answer: Select the option with the dot in the bottom-left, line at 135 degrees, and the alternating background color.";
  
  let qImgStr = create2x2Grid(cells, 3);
  let qImgPath = writeSvg(`${qId.toLowerCase()}_q.svg`, qImgStr);
  
  let { opts, correctIndex } = shuffleOptions(correctCell, wrongCells);
  let optionsArr = [];
  const labels = ["A", "B", "C", "D"];
  for(let j=0; j<4; j++){
    let optImgPath = writeSvg(`${qId.toLowerCase()}_opt_${labels[j].toLowerCase()}.svg`, createOptionSVG(opts[j]));
    optionsArr.push({ id: labels[j], image: optImgPath });
  }

  questionsData.push({
    id: qId,
    topic: "Logical Reasoning",
    subtopic: "Pattern Completion",
    difficulty: "Hard",
    questionImage: qImgPath,
    question: "Choose the missing figure that completes the pattern.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: "Eliminate options by verifying one rule at a time (e.g. check the dot position first to discard wrong answers instantly).",
    commonMistake: "Getting overwhelmed and guessing, or missing the background color alternation.",
    estimatedTime: "120 sec",
    keywords: ["visual reasoning", "pattern completion", "svg", "complex"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

fs.writeFileSync(path.join(dataDir, 'pattern-completion.json'), JSON.stringify(questionsData, null, 2));

console.log('Total Generated:', questionsData.length);
console.log('Images generated:', fs.readdirSync(imgDir).length);
