const fs = require('fs');
const path = require('path');

const NUM_EASY = 40;
const NUM_MEDIUM = 40;
const NUM_HARD = 20;
const TOTAL = 100;

const baseDir = path.join(process.cwd(), 'public');
const imgDir = path.join(baseDir, 'images', 'logical-reasoning', 'visual-reasoning', 'water-images');
const dataDir = path.join(baseDir, 'data', 'logical-reasoning', 'visual-reasoning');

// Ensure directories exist
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

let idCounter = 1;
function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `WATER_IMG_${num}`;
}

// Helper to write SVG files
function writeSvg(filename, content) {
  const filepath = path.join(imgDir, filename);
  fs.writeFileSync(filepath, content);
  return `images/logical-reasoning/visual-reasoning/water-images/${filename}`;
}

// --- SVG Generator Helpers ---
function createBaseSVG(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${content}
</svg>`;
}

// Generates the Question Image (Figure + Horizontal Water Line at the bottom)
function createQuestionSVG(innerSVG) {
  const width = 140, height = 160;
  // Box for the figure, and a dashed line for the water below
  const svg = `
    <rect x="20" y="10" width="100" height="100" fill="none" stroke="#2c3e50" stroke-width="3" />
    <g transform="translate(20,10)">${innerSVG}</g>
    <line x1="10" y1="130" x2="130" y2="130" stroke="#3498db" stroke-width="4" stroke-dasharray="8,8" />
    <path d="M15,140 L15,150 M25,140 L25,150 M35,140 L35,150 M45,140 L45,150 M55,140 L55,150 M65,140 L65,150 M75,140 L75,150 M85,140 L85,150 M95,140 L95,150 M105,140 L105,150 M115,140 L115,150 M125,140 L125,150" stroke="#bdc3c7" stroke-width="1" />
  `;
  return createBaseSVG(width, height, svg);
}

// Generates the Option Image (Just the bounding box and the figure)
function createOptionSVG(innerSVG) {
  const svg = `
    <rect x="10" y="10" width="100" height="100" fill="none" stroke="#2c3e50" stroke-width="3" />
    <g transform="translate(10,10)">${innerSVG}</g>
  `;
  return createBaseSVG(120, 120, svg);
}

// Transform helper
function getTransformedShape(shapeStr, flipX, flipY) {
  let sx = flipX ? -1 : 1;
  let sy = flipY ? -1 : 1;
  let tx = flipX ? -100 : 0;
  let ty = flipY ? -100 : 0;
  return `<g transform="scale(${sx}, ${sy}) translate(${tx}, ${ty})">${shapeStr}</g>`;
}

// --- Base shapes ---

const shapes = [
  // 0: Letter 'P'
  `<path d="M30,20 L60,20 C75,20 75,50 60,50 L40,50 L40,80 L30,80 Z" fill="#e74c3c" />`,
  // 1: Asymmetric triangle pointing right-down
  `<polygon points="20,20 80,40 20,80" fill="#2ecc71"/>`,
  // 2: Half circle with line
  `<path d="M20,50 A 30 30 0 0 1 80 50 Z" fill="#f1c40f"/><line x1="10" y1="50" x2="90" y2="50" stroke="#000" stroke-width="4"/>`,
  // 3: Abstract zigzag
  `<polyline points="20,80 40,40 60,60 80,20" fill="none" stroke="#9b59b6" stroke-width="6"/>`,
  // 4: Composite icon (House)
  `<polygon points="10,50 50,20 90,50" fill="#34495e"/><rect x="25" y="50" width="50" height="40" fill="#7f8c8d"/><rect x="40" y="60" width="20" height="30" fill="#bdc3c7"/>`,
  // 5: Letter 'N'
  `<path d="M25,80 L25,20 L40,20 L75,60 L75,20 L90,20 L90,80 L75,80 L40,40 L40,80 Z" fill="#e67e22" />`
];

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

// Generate questions
for (let i = 0; i < TOTAL; i++) {
  let qId = getId();
  let diff = i < NUM_EASY ? "Easy" : i < NUM_EASY + NUM_MEDIUM ? "Medium" : "Hard";
  
  let baseShape = '';
  if (diff === "Easy") {
    // Basic single shapes (indices 0, 1, 5)
    let idx = [0, 1, 5][i % 3];
    baseShape = shapes[idx];
  } else if (diff === "Medium") {
    // Intermediate shapes (indices 2, 3, 4)
    let idx = [2, 3, 4][i % 3];
    baseShape = shapes[idx];
  } else {
    // Composite shapes (shape + external elements like a dot)
    let s = shapes[i % shapes.length];
    let cx = 20 + (i * 15) % 60; // 20 to 80
    let cy = 20 + (i * 7) % 60;
    baseShape = s + `<circle cx="${cx}" cy="${cy}" r="6" fill="#3498db"/>`;
  }
  
  // Apply a random base flip to make every question unique
  let baseFlipX = Math.random() > 0.5;
  let baseFlipY = Math.random() > 0.5;
  
  let qShape = getTransformedShape(baseShape, baseFlipX, baseFlipY);
  
  // Correct Water Image (Flip Y)
  // Water image = reflection across horizontal line -> vertical flip
  let correctOpt = getTransformedShape(qShape, false, true);
  
  // Wrong options
  let wrong1 = getTransformedShape(qShape, true, false); // Mirror image (horizontal flip)
  let wrong2 = getTransformedShape(qShape, true, true);  // Upside down AND mirrored (rotated 180)
  let wrong3 = qShape; // No change
  
  let qImgStr = createQuestionSVG(qShape);
  let qImgPath = writeSvg(`${qId.toLowerCase()}_q.svg`, qImgStr);
  
  let { opts, correctIndex } = shuffleOptions(correctOpt, [wrong1, wrong2, wrong3]);
  
  let optionsArr = [];
  const labels = ["A", "B", "C", "D"];
  for(let j=0; j<4; j++){
    let optImgPath = writeSvg(`${qId.toLowerCase()}_opt_${labels[j].toLowerCase()}.svg`, createOptionSVG(opts[j]));
    optionsArr.push({ id: labels[j], image: optImgPath });
  }
  
  let meta = {
    type: "Horizontal Mirror (Water)",
    transformation: "Flip Vertical (y-axis invert)",
    shapesInvolved: "polygon/path/composite"
  };
  
  let estTime = diff === "Easy" ? "30 sec" : diff === "Medium" ? "45 sec" : "90 sec";

  questionsData.push({
    id: qId,
    topic: "Logical Reasoning",
    subtopic: "Water Images",
    difficulty: diff,
    questionImage: qImgPath,
    question: "Choose the correct water image of the given figure from the four alternatives.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: "Water",
    visualMetadata: meta,
    explanation: "Step 1: Observe the original figure and the horizontal water line below it. Step 2: A water image acts as a horizontal mirror, which flips the image vertically (top becomes bottom). The left and right sides remain unchanged. Step 3: Identify the top-most features of the original shape; they will become the bottom-most features in the water image. Verify the options to find the one that correctly inverts the vertical axis without flipping horizontally. Final Answer: Select the perfectly vertically flipped option.",
    shortcut: "Check a distinctive feature on the top or bottom and see where it lands. Top becomes Bottom, Left remains Left.",
    commonMistake: "Selecting the Mirror Image (horizontal flip) or the 180-degree rotation instead of the Water Image.",
    estimatedTime: estTime,
    keywords: ["visual reasoning", "water image", "svg"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

fs.writeFileSync(path.join(dataDir, 'water-images.json'), JSON.stringify(questionsData, null, 2));

console.log('Total Generated:', questionsData.length);
console.log('Images generated:', fs.readdirSync(imgDir).length);
