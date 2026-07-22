const fs = require('fs');
const path = require('path');

const NUM_EASY = 40;
const NUM_MEDIUM = 40;
const NUM_HARD = 20;
const TOTAL = 100;

const baseDir = path.join(process.cwd(), 'public');
const imgDir = path.join(baseDir, 'images', 'logical-reasoning', 'visual-reasoning', 'figure-series');
const dataDir = path.join(baseDir, 'data', 'logical-reasoning', 'visual-reasoning');

// Ensure directories exist
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

let idCounter = 1;
function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `FIGURE_SERIES_${num}`;
}

// Helper to write SVG files
function writeSvg(filename, content) {
  const filepath = path.join(imgDir, filename);
  fs.writeFileSync(filepath, content);
  return `images/logical-reasoning/visual-reasoning/figure-series/${filename}`;
}

// --- SVG Generator Helpers ---

function createBaseSVG(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${content}
</svg>`;
}

// Figure Series is usually a horizontal row of 3 or 4 figures, and we have to find the next one.
// Let's create a 4-cell row: 3 given figures + 1 Question Mark
function createRowGrid(contents) {
  const cellSize = 100;
  const padding = 10;
  const spacing = 10;
  const width = (cellSize * 4) + (spacing * 3) + (padding * 2); // 400 + 30 + 20 = 450
  const height = cellSize + (padding * 2); // 120

  let svg = '';
  // Draw boxes
  for (let i = 0; i < 4; i++) {
    let x = padding + i * (cellSize + spacing);
    svg += `<rect x="${x}" y="${padding}" width="${cellSize}" height="${cellSize}" fill="none" stroke="#000" stroke-width="3" />`;
  }
  // Insert contents
  for (let i = 0; i < 4; i++) {
    let x = padding + i * (cellSize + spacing);
    if (i === 3) { // Question mark in the last box
      svg += `<text x="${x + 50}" y="${padding + 65}" font-family="Arial" font-size="40" text-anchor="middle" font-weight="bold" fill="#555">?</text>`;
    } else {
      svg += `<g transform="translate(${x}, ${padding})">${contents[i]}</g>`;
    }
  }
  return createBaseSVG(width, height, svg);
}

function createOptionSVG(content) {
  return createBaseSVG(100, 100, `<rect width="100" height="100" fill="none" stroke="#000" stroke-width="2" />${content}`);
}

// Pattern generators

// Pattern 1: Simple clock hand rotation
function getClockHand(angle) {
  let r = Math.PI * (angle - 90) / 180;
  let x2 = 50 + 35 * Math.cos(r);
  let y2 = 50 + 35 * Math.sin(r);
  return `<circle cx="50" cy="50" r="40" fill="none" stroke="#34495e" stroke-width="4"/><line x1="50" y1="50" x2="${x2}" y2="${y2}" stroke="#e74c3c" stroke-width="4"/><circle cx="50" cy="50" r="5" fill="#34495e"/>`;
}

// Pattern 2: Triangle moving corners
// positions: 0:TL, 1:TR, 2:BR, 3:BL
function getCornerTriangle(pos) {
  let coords = [
    "20,10 30,30 10,30", // TL
    "80,10 90,30 70,30", // TR
    "80,70 90,90 70,90", // BR
    "20,70 30,90 10,90"  // BL
  ];
  return `<polygon points="${coords[pos]}" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>`;
}

// Pattern 3: Line additions
function getLineAddition(num) {
  let lines = [
    `<line x1="20" y1="20" x2="80" y2="20" stroke="#8e44ad" stroke-width="4"/>`,
    `<line x1="80" y1="20" x2="80" y2="80" stroke="#8e44ad" stroke-width="4"/>`,
    `<line x1="80" y1="80" x2="20" y2="80" stroke="#8e44ad" stroke-width="4"/>`,
    `<line x1="20" y1="80" x2="20" y2="20" stroke="#8e44ad" stroke-width="4"/>`
  ];
  return lines.slice(0, num).join('');
}

// Pattern 4: Polygon sides increasing
function getPolygon(sides) {
  if (sides === 3) return `<polygon points="50,15 85,85 15,85" fill="#f1c40f" stroke="#f39c12" stroke-width="2"/>`;
  if (sides === 4) return `<rect x="20" y="20" width="60" height="60" fill="#f1c40f" stroke="#f39c12" stroke-width="2"/>`;
  if (sides === 5) return `<polygon points="50,15 85,40 70,85 30,85 15,40" fill="#f1c40f" stroke="#f39c12" stroke-width="2"/>`;
  if (sides === 6) return `<polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="#f1c40f" stroke="#f39c12" stroke-width="2"/>`;
  if (sides === 7) return `<polygon points="50,15 75,25 90,55 75,85 25,85 10,55 25,25" fill="#f1c40f" stroke="#f39c12" stroke-width="2"/>`;
  return '';
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

// EASY (40 items): single visible progression
for (let i = 0; i < NUM_EASY; i++) {
  let qId = getId();
  let type = i % 4;
  
  let cells = [];
  let correctCell = '';
  let wrongCells = [];
  let meta = {};
  let exp = "";
  
  if (type === 0) {
    // Clock rotation
    let angle = (i * 30) % 360;
    let step = 45;
    cells = [getClockHand(angle), getClockHand(angle + step), getClockHand(angle + 2*step), getClockHand(angle + 3*step)];
    correctCell = cells[3];
    wrongCells = [getClockHand(angle + 4*step), getClockHand(angle + step/2), getClockHand(angle - step)];
    meta = { type: "Rotation", progression: "+45 degrees" };
    exp = "Step 1: Observe the red hand in the circle. Step 2: It rotates exactly 45 degrees clockwise in each subsequent figure. Step 3: To find the next figure, rotate the last visible hand 45 degrees clockwise. Final Answer: Select the option matching this position.";
  } else if (type === 1) {
    // Corner triangle moving
    let start = i % 4;
    cells = [getCornerTriangle(start), getCornerTriangle((start+1)%4), getCornerTriangle((start+2)%4), getCornerTriangle((start+3)%4)];
    correctCell = cells[3];
    wrongCells = [getCornerTriangle(start), getCornerTriangle((start+2)%4), getCornerTriangle((start+4)%4)]; // 4%4 is start, but whatever
    meta = { type: "Movement", progression: "clockwise corner to corner" };
    exp = "Step 1: Locate the triangle in the first square. Step 2: Notice it moves clockwise to the next corner in each step. Step 3: Following this pattern, move the triangle from its 3rd position to the next clockwise corner. Final Answer: Select the matching figure.";
  } else if (type === 2) {
    // Line additions
    cells = [getLineAddition(1), getLineAddition(2), getLineAddition(3), getLineAddition(4)];
    correctCell = cells[3];
    wrongCells = [getLineAddition(2), getLineAddition(1), `<line x1="20" y1="20" x2="80" y2="80" stroke="#8e44ad" stroke-width="4"/>`];
    meta = { type: "Shape Addition", progression: "+1 line" };
    exp = "Step 1: Count the lines in each frame. Frame 1 has 1 line, Frame 2 has 2, Frame 3 has 3. Step 2: The pattern is clearly adding one more connected line. Step 3: The 4th figure must have 4 lines forming a complete square. Final Answer: Select the completed square.";
  } else {
    // Polygon sides
    cells = [getPolygon(3), getPolygon(4), getPolygon(5), getPolygon(6)];
    correctCell = cells[3];
    wrongCells = [getPolygon(7), getPolygon(3), getPolygon(4)];
    meta = { type: "Shape Progression", progression: "+1 side" };
    exp = "Step 1: Count the sides of the polygon in each figure. They are 3, 4, 5... Step 2: The number of sides increases by 1 in each step. Step 3: The next figure must be a hexagon (6 sides). Final Answer: Select the hexagon.";
  }

  let qImgStr = createRowGrid(cells);
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
    subtopic: "Figure Series",
    difficulty: "Easy",
    questionImage: qImgPath,
    question: "Choose the figure that logically follows the series.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: "Identify the primary moving or changing element and track its sequence.",
    commonMistake: "Ignoring the direction of rotation or movement.",
    estimatedTime: "40 sec",
    keywords: ["visual reasoning", "figure series", "svg"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

// MEDIUM (40 items): combination of 2 variables (e.g. 2 objects moving, or 1 object moving and color changing)
for (let i = 0; i < NUM_MEDIUM; i++) {
  let qId = getId();
  let type = i % 2;
  
  let cells = [];
  let correctCell = '';
  let wrongCells = [];
  let meta = {};
  let exp = "";
  
  if (type === 0) {
    // Outer rotates one way, inner rotates the other way
    function getDualRotation(outAngle, inAngle) {
      let outer = `<g transform="translate(50,50) rotate(${outAngle})"><rect x="-35" y="-35" width="70" height="70" fill="none" stroke="#e67e22" stroke-width="4"/></g>`;
      let inner = `<g transform="translate(50,50) rotate(${inAngle})"><path d="M0,-20 L15,10 L-15,10 Z" fill="#2980b9"/></g>`;
      return outer + inner;
    }
    
    let oa = (i * 15) % 360;
    let ia = (i * 30) % 360;
    cells = [
      getDualRotation(oa, ia),
      getDualRotation(oa + 45, ia - 90),
      getDualRotation(oa + 90, ia - 180),
      getDualRotation(oa + 135, ia - 270)
    ];
    correctCell = cells[3];
    wrongCells = [
      getDualRotation(oa + 135, ia - 90), // wrong inner
      getDualRotation(oa + 90, ia - 270), // wrong outer
      getDualRotation(oa + 180, ia - 360) // skipped step
    ];
    meta = { type: "Dual Rotation", progression: "Outer +45, Inner -90" };
    exp = "Step 1: Focus on the outer square. It rotates 45 degrees clockwise in each step. Step 2: Now look at the inner triangle. It rotates 90 degrees anti-clockwise in each step. Step 3: Apply both transformations to the 3rd figure to get the 4th. Final Answer: Select the option with the correctly rotated square and triangle.";
  } else {
    // Grid of 4 dots. 1 dot moves clockwise, 1 dot toggles color.
    // Positions: 1: (30,30), 2: (70,30), 3: (70,70), 4: (30,70)
    function getDotMatrix(movingDotPos, toggleDotCol) {
      let p = {1: [30,30], 2: [70,30], 3: [70,70], 4: [30,70]};
      let svg = '';
      for(let j=1; j<=4; j++) {
        if(j === movingDotPos) {
          svg += `<circle cx="${p[j][0]}" cy="${p[j][1]}" r="10" fill="#8e44ad"/>`;
        } else if (j === 3) {
          // Dot 3 is static but toggles color
          svg += `<circle cx="${p[j][0]}" cy="${p[j][1]}" r="8" fill="${toggleDotCol}"/>`;
        } else {
          // The rest are empty placeholder circles
          svg += `<circle cx="${p[j][0]}" cy="${p[j][1]}" r="8" fill="none" stroke="#bdc3c7" stroke-width="2"/>`;
        }
      }
      return svg;
    }
    
    let startPos = (i % 4) + 1;
    let c1 = "#e74c3c", c2 = "#2ecc71";
    
    cells = [
      getDotMatrix(startPos, c1),
      getDotMatrix((startPos%4)+1, c2),
      getDotMatrix(((startPos+1)%4)+1, c1),
      getDotMatrix(((startPos+2)%4)+1, c2)
    ];
    correctCell = cells[3];
    wrongCells = [
      getDotMatrix(((startPos+2)%4)+1, c1), // wrong color
      getDotMatrix(((startPos+3)%4)+1, c2), // wrong pos
      getDotMatrix(startPos, c2) // wrong pos
    ];
    meta = { type: "Movement + Color Toggle", progression: "Clockwise move + alternate color" };
    exp = "Step 1: Observe the large purple dot. It moves clockwise to the next position in each figure. Step 2: Observe the static dot at the bottom right. It alternates color between red and green. Step 3: For the next figure, move the purple dot clockwise once more and flip the color of the static dot. Final Answer: Select the matching figure.";
  }

  let qImgStr = createRowGrid(cells);
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
    subtopic: "Figure Series",
    difficulty: "Medium",
    questionImage: qImgPath,
    question: "Choose the figure that logically follows the series.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: "Track each moving part or changing attribute completely independently.",
    commonMistake: "Failing to notice the color toggle or confusing the rotation directions.",
    estimatedTime: "60 sec",
    keywords: ["visual reasoning", "figure series", "svg", "medium"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

// HARD (20 items): 3 transformations or highly complex shifts
for (let i = 0; i < NUM_HARD; i++) {
  let qId = getId();
  
  // 3-part pattern:
  // 1. A central polygon (sides increase 3,4,5,6)
  // 2. An arrow on the border (rotates +90)
  // 3. Polygon fill color cycles (blue, red, green, yellow)
  
  function getHardComplex(sides, arrowAngle, polyColor) {
    let poly = '';
    let scale = 0.6;
    if (sides === 3) poly = `<polygon points="50,20 75,70 25,70" fill="${polyColor}"/>`;
    if (sides === 4) poly = `<rect x="30" y="30" width="40" height="40" fill="${polyColor}"/>`;
    if (sides === 5) poly = `<polygon points="50,20 75,40 65,70 35,70 25,40" fill="${polyColor}"/>`;
    if (sides === 6) poly = `<polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill="${polyColor}"/>`;
    
    // Arrow on outer radius
    let r = 40;
    let rad = arrowAngle * Math.PI / 180;
    let ax = 50 + r * Math.cos(rad);
    let ay = 50 + r * Math.sin(rad);
    
    let arrow = `<g transform="translate(${ax},${ay}) rotate(${arrowAngle})"><path d="M-8,-8 L8,0 L-8,8 Z" fill="#000"/></g>`;
    
    return poly + arrow;
  }
  
  let cList = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f"];
  let angStart = (i * 45) % 360;
  
  let cells = [
    getHardComplex(3, angStart, cList[0]),
    getHardComplex(4, angStart + 90, cList[1]),
    getHardComplex(5, angStart + 180, cList[2]),
    getHardComplex(6, angStart + 270, cList[3])
  ];
  
  let correctCell = cells[3];
  let wrongCells = [
    getHardComplex(5, angStart + 270, cList[3]), // wrong shape
    getHardComplex(6, angStart + 180, cList[3]), // wrong arrow
    getHardComplex(6, angStart + 270, cList[0])  // wrong color
  ];
  
  let meta = { type: "Shape + Rotation + Color", progression: "Sides +1, Arrow +90, Color cycle" };
  let exp = "Step 1: The central shape increases its number of sides (3->4->5). The next must have 6 sides (hexagon). Step 2: The small arrow rotates 90 degrees clockwise around the center in each step. Find the next 90-degree position. Step 3: The fill color of the central shape changes completely each step in a fixed sequence. Step 4: The correct answer must combine the hexagon, the correctly rotated arrow, and the final color in the cycle. Final Answer: Select the matching figure.";
  
  let qImgStr = createRowGrid(cells);
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
    subtopic: "Figure Series",
    difficulty: "Hard",
    questionImage: qImgPath,
    question: "Choose the figure that logically follows the series.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: "Identify the most easily trackable attribute (like shape sides) and use it to eliminate 2-3 options instantly.",
    commonMistake: "Focusing too hard on one variable and selecting an option where the other two variables are wrong.",
    estimatedTime: "120 sec",
    keywords: ["visual reasoning", "figure series", "svg", "complex"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

fs.writeFileSync(path.join(dataDir, 'figure-series.json'), JSON.stringify(questionsData, null, 2));

console.log('Total Generated:', questionsData.length);
console.log('Images generated:', fs.readdirSync(imgDir).length);
