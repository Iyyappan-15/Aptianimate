const fs = require('fs');
const path = require('path');

const NUM_EASY = 40;
const NUM_MEDIUM = 40;
const NUM_HARD = 20;
const TOTAL = 100;

const baseDir = path.join(process.cwd(), 'public');
const imgDir = path.join(baseDir, 'images', 'logical-reasoning', 'visual-reasoning', 'mirror-images');
const dataDir = path.join(baseDir, 'data', 'logical-reasoning', 'visual-reasoning');

// Ensure directories exist
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

let idCounter = 1;
function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `MIRROR_IMG_${num}`;
}

// Helper to write SVG files
function writeSvg(filename, content) {
  const filepath = path.join(imgDir, filename);
  fs.writeFileSync(filepath, content);
  return `images/logical-reasoning/visual-reasoning/mirror-images/${filename}`;
}

// --- SVG Generator Helpers ---
function createBaseSVG(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${content}
</svg>`;
}

// Generates the Question Image (Figure + Vertical Mirror Line)
function createQuestionSVG(innerSVG) {
  const width = 200, height = 150;
  // Box for the figure, and a dashed line for the mirror on the right
  const svg = `
    <rect x="20" y="25" width="100" height="100" fill="none" stroke="#2c3e50" stroke-width="3" />
    <g transform="translate(20,25)">${innerSVG}</g>
    <line x1="160" y1="10" x2="160" y2="140" stroke="#7f8c8d" stroke-width="4" stroke-dasharray="8,8" />
    <path d="M150,15 L170,15 M150,25 L170,25 M150,35 L170,35 M150,45 L170,45 M150,55 L170,55 M150,65 L170,65 M150,75 L170,75 M150,85 L170,85 M150,95 L170,95 M150,105 L170,105 M150,115 L170,115 M150,125 L170,125 M150,135 L170,135" stroke="#bdc3c7" stroke-width="1" />
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

// --- Various Figures to mirror ---

// 1. Asymmetric Triangle
// Normal points: 20,20 to 20,80 to 80,80. (Right angle at bottom-left).
function getTriangle() {
  return `<polygon points="20,20 20,80 80,80" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>`;
}
function getTriangleMirrored() {
  // Mirror vertically across x=50. x -> 100 - x
  return `<polygon points="80,20 80,80 20,80" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>`;
}
function getTriangleUpsideDown() {
  // Water image (mirror horizontally across y=50)
  return `<polygon points="20,80 20,20 80,20" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>`;
}
function getTriangleUpsideDownMirrored() {
  return `<polygon points="80,80 80,20 20,20" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>`;
}

// 2. Letters/Text (Using paths to ensure it renders identically without font issues)
// Letter 'L'
function getLetterL() {
  return `<path d="M30,20 L30,80 L70,80 L70,60 L50,60 L50,20 Z" fill="#3498db" />`;
}
function getLetterLMirrored() {
  return `<path d="M70,20 L70,80 L30,80 L30,60 L50,60 L50,20 Z" fill="#3498db" />`;
}
function getLetterLUpsideDown() {
  return `<path d="M30,80 L30,20 L70,20 L70,40 L50,40 L50,80 Z" fill="#3498db" />`;
}
function getLetterLUpsideDownMirrored() {
  return `<path d="M70,80 L70,20 L30,20 L30,40 L50,40 L50,80 Z" fill="#3498db" />`;
}

// 3. Arrow pointing top-right
function getArrow() {
  return `<path d="M20,80 L70,30 L70,50 L80,50 L80,20 L50,20 L50,30 L70,30 Z" fill="#9b59b6"/>`;
}
// For complex shapes, we can just use SVG transform="scale(-1, 1) translate(-100, 0)" for horizontal flip.
function getFlippedShape(shapeStr, flipX, flipY) {
  let sx = flipX ? -1 : 1;
  let sy = flipY ? -1 : 1;
  let tx = flipX ? -100 : 0;
  let ty = flipY ? -100 : 0;
  return `<g transform="scale(${sx}, ${sy}) translate(${tx}, ${ty})">${shapeStr}</g>`;
}

const shapes = [
  `<path d="M20,80 L80,20 L80,40 L60,40 L60,80 Z" fill="#9b59b6"/>`, // shape 0
  `<polygon points="30,20 80,20 70,80 20,80" fill="#f1c40f"/>`, // shape 1 (parallelogram)
  `<path d="M20,50 Q 50,10 80,50 T 80,90 L 20,90 Z" fill="#1abc9c"/>`, // shape 2
  `<path d="M10,10 L40,10 L40,40 L60,40 L60,70 L90,70 L90,90 L10,90 Z" fill="#e67e22"/>` // shape 3 (steps)
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
    // Basic single shapes
    baseShape = i % 2 === 0 ? getTriangle() : getLetterL();
  } else if (diff === "Medium") {
    // Complex paths
    baseShape = shapes[i % shapes.length];
  } else {
    // Composite shapes (shape + internal dots/lines)
    let s = shapes[i % shapes.length];
    let cx = 30 + (i * 10) % 40;
    let cy = 30 + (i * 5) % 40;
    baseShape = s + `<circle cx="${cx}" cy="${cy}" r="5" fill="#2c3e50"/><line x1="20" y1="80" x2="80" y2="20" stroke="#2c3e50" stroke-width="2"/>`;
  }
  
  // Apply a random base rotation/flip to make every question highly unique
  let baseFlipX = Math.random() > 0.5;
  let baseFlipY = Math.random() > 0.5;
  
  let qShape = getFlippedShape(baseShape, baseFlipX, baseFlipY);
  
  // Correct Mirror Image (Flip X)
  let correctOpt = getFlippedShape(qShape, true, false);
  
  // Wrong options
  let wrong1 = getFlippedShape(qShape, false, true); // Upside down (Water image)
  let wrong2 = getFlippedShape(qShape, true, true);  // Upside down AND mirrored
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
    type: "Vertical Mirror",
    transformation: "Flip Horizontal (x-axis invert)",
    shapesInvolved: "polygon/path"
  };
  
  let estTime = diff === "Easy" ? "30 sec" : diff === "Medium" ? "45 sec" : "90 sec";

  questionsData.push({
    id: qId,
    topic: "Logical Reasoning",
    subtopic: "Mirror Images",
    difficulty: diff,
    questionImage: qImgPath,
    question: "Choose the correct mirror image of the given figure from the four alternatives.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: "Mirror",
    visualMetadata: meta,
    explanation: "Step 1: Observe the original figure and the vertical mirror line on the right. Step 2: A vertical mirror flips the image left-to-right (horizontal inversion). The top and bottom remain unchanged. Step 3: Identify the left-most features of the original shape; they will become the right-most features in the mirror image. Verify the options to find the one that correctly inverts the horizontal axis without flipping vertically. Final Answer: Select the perfectly horizontally mirrored option.",
    shortcut: "Find a distinctive feature on the far left or far right and check where it maps in the options. Left becomes Right, Top remains Top.",
    commonMistake: "Selecting the Water Image (vertical flip) instead of the Mirror Image.",
    estimatedTime: estTime,
    keywords: ["visual reasoning", "mirror image", "svg"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

fs.writeFileSync(path.join(dataDir, 'mirror-images.json'), JSON.stringify(questionsData, null, 2));

console.log('Total Generated:', questionsData.length);
console.log('Images generated:', fs.readdirSync(imgDir).length);
