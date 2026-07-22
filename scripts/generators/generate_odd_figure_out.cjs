const fs = require('fs');
const path = require('path');

const NUM_EASY = 40;
const NUM_MEDIUM = 40;
const NUM_HARD = 20;
const TOTAL = 100;

const baseDir = path.join(process.cwd(), 'public');
const imgDir = path.join(baseDir, 'images', 'logical-reasoning', 'visual-reasoning', 'odd-figure-out');
const dataDir = path.join(baseDir, 'data', 'logical-reasoning', 'visual-reasoning');

// Ensure directories exist
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

let idCounter = 1;
function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ODD_FIG_${num}`;
}

// Helper to write SVG files
function writeSvg(filename, content) {
  const filepath = path.join(imgDir, filename);
  fs.writeFileSync(filepath, content);
  return `images/logical-reasoning/visual-reasoning/odd-figure-out/${filename}`;
}

// --- SVG Generator Helpers ---
function createBaseSVG(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#ffffff" />
  ${content}
</svg>`;
}

// Generates the Question Image (just a nice banner)
function createQuestionSVG() {
  const width = 400, height = 100;
  const svg = `
    <rect x="10" y="10" width="380" height="80" fill="#f8f9fa" stroke="#bdc3c7" stroke-width="2" rx="10"/>
    <text x="200" y="55" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold" fill="#2c3e50">Find the Odd Figure Out</text>
  `;
  return createBaseSVG(width, height, svg);
}

// Generates the Option Image
function createOptionSVG(innerSVG) {
  const svg = `
    <rect x="5" y="5" width="110" height="110" fill="none" stroke="#2c3e50" stroke-width="2" />
    <g transform="translate(10,10)">${innerSVG}</g>
  `;
  return createBaseSVG(120, 120, svg);
}

// Transformations
function rotateShape(shapeStr, angle) {
  return `<g transform="translate(50,50) rotate(${angle}) translate(-50,-50)">${shapeStr}</g>`;
}

function flipShape(shapeStr) {
  return `<g transform="translate(100,0) scale(-1, 1)">${shapeStr}</g>`;
}

// Base shapes for rotation differences (All same shape, but 3 are rotations, 1 is a flip)
function getAsymmetricShape(color) {
  return `<path d="M20,20 L80,20 L80,40 L40,40 L40,80 L20,80 Z" fill="${color}"/>`; // L-shape
}

// Base shapes for number of sides (e.g. all even sides, 1 odd)
function getPolygon(sides, color) {
  if (sides === 3) return `<polygon points="50,15 85,85 15,85" fill="${color}"/>`;
  if (sides === 4) return `<rect x="20" y="20" width="60" height="60" fill="${color}"/>`;
  if (sides === 5) return `<polygon points="50,15 85,40 70,85 30,85 15,40" fill="${color}"/>`;
  if (sides === 6) return `<polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="${color}"/>`;
  if (sides === 8) return `<polygon points="35,15 65,15 85,35 85,65 65,85 35,85 15,65 15,35" fill="${color}"/>`;
  return '';
}

// Complex patterns (Lines intersecting)
// Rule: all have lines intersecting at the center, 1 does not.
function getIntersectingLines(isOdd) {
  if (isOdd) {
    // Lines do not intersect at exact center
    return `<circle cx="50" cy="50" r="40" fill="none" stroke="#34495e" stroke-width="4"/><line x1="20" y1="20" x2="80" y2="40" stroke="#e74c3c" stroke-width="4"/><line x1="20" y1="80" x2="80" y2="60" stroke="#e74c3c" stroke-width="4"/>`;
  } else {
    // Intersect at center
    let a1 = Math.random() * 180;
    let a2 = a1 + 45 + Math.random() * 90;
    return `<circle cx="50" cy="50" r="40" fill="none" stroke="#34495e" stroke-width="4"/>
    <g transform="translate(50,50) rotate(${a1})"><line x1="-40" y1="0" x2="40" y2="0" stroke="#e74c3c" stroke-width="4"/></g>
    <g transform="translate(50,50) rotate(${a2})"><line x1="-40" y1="0" x2="40" y2="0" stroke="#e74c3c" stroke-width="4"/></g>`;
  }
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

// Generate questions
for (let i = 0; i < TOTAL; i++) {
  let qId = getId();
  let diff = i < NUM_EASY ? "Easy" : i < NUM_EASY + NUM_MEDIUM ? "Medium" : "Hard";
  
  let qImgStr = createQuestionSVG();
  let qImgPath = writeSvg(`${qId.toLowerCase()}_q.svg`, qImgStr);
  
  let correctOpt = '';
  let wrongOpts = [];
  let meta = {};
  let exp = "";
  let shortcut = "";
  
  if (diff === "Easy") {
    let subType = i % 2;
    if (subType === 0) {
      // Rotation vs Flip (3 are rotations of each other, 1 is flipped)
      let c = "#3498db";
      let base = getAsymmetricShape(c);
      wrongOpts = [
        rotateShape(base, 0),
        rotateShape(base, 90),
        rotateShape(base, 180)
      ];
      correctOpt = rotateShape(flipShape(base), 0);
      meta = { type: "Rotation Difference", logic: "3 are rotations, 1 is a mirror image" };
      exp = "Step 1: Observe all the shapes carefully. Step 2: Mentally rotate the first shape to see if it matches the others. Step 3: Options A, B, and C (or similar) can be obtained by rotating the same original shape. The odd figure is a mirror image and cannot be obtained by simple rotation. Final Answer: Select the flipped shape.";
      shortcut = "Look for handedness. If you imagine it as a hand, 3 are 'right hands' and 1 is a 'left hand'.";
    } else {
      // Side counts (e.g., all have even sides, 1 has odd)
      let even = [4, 6, 8];
      let c = "#9b59b6";
      wrongOpts = [
        getPolygon(even[0], c),
        getPolygon(even[1], c),
        getPolygon(even[2], c)
      ];
      correctOpt = getPolygon(3, c); // Triangle is odd
      meta = { type: "Property Difference", logic: "Even number of sides vs Odd number of sides" };
      exp = "Step 1: Count the number of sides for each polygon. Step 2: Notice that three of the shapes have an even number of sides (e.g. 4, 6, 8). Step 3: The odd figure is a triangle, which has 3 sides (an odd number). Final Answer: Select the triangle.";
      shortcut = "Quickly count the sides. 3 of them will share a mathematical property (even/odd) that the 4th lacks.";
    }
  } else if (diff === "Medium") {
    // Intersecting lines vs non-intersecting / Center intersections
    let subType = i % 2;
    if (subType === 0) {
      wrongOpts = [
        getIntersectingLines(false),
        getIntersectingLines(false),
        getIntersectingLines(false)
      ];
      correctOpt = getIntersectingLines(true);
      meta = { type: "Position Difference", logic: "Lines intersect at the center in 3 shapes, but not in the odd one" };
      exp = "Step 1: Look at the internal lines within the circles. Step 2: In three of the options, the two lines perfectly intersect at the exact center of the circle. Step 3: In the odd option, the lines either do not intersect at the center or do not intersect at all. Final Answer: Select the figure with off-center lines.";
      shortcut = "Check the intersection point. If it's dead-center for 3 of them, the 4th is the odd one out.";
    } else {
      // Inner shape vs Outer shape relationship
      // 3 options: Inner shape has 1 less side than outer shape. Odd: inner shape has same/more sides.
      function getNestedPolys(outSides, inSides) {
        let outer = getPolygon(outSides, "none").replace('fill="none"', 'fill="none" stroke="#2c3e50" stroke-width="4"');
        let inner = `<g transform="scale(0.5) translate(50,50)">${getPolygon(inSides, "#e67e22")}</g>`;
        return outer + inner;
      }
      wrongOpts = [
        getNestedPolys(4, 3), // square, triangle
        getNestedPolys(5, 4), // pentagon, square
        getNestedPolys(6, 5)  // hexagon, pentagon
      ];
      correctOpt = getNestedPolys(4, 5); // square, pentagon (wrong rule)
      meta = { type: "Pattern Difference", logic: "Inner shape sides = Outer shape sides - 1" };
      exp = "Step 1: Count the sides of the outer shape and the inner shape for each option. Step 2: Observe the relationship: in three options, the inner shape has exactly one side less than the outer shape. Step 3: In the odd figure, this rule is broken. Final Answer: Select the figure that breaks the side-count relationship.";
      shortcut = "Compare the number of sides (Outer - Inner). Three will equal 1. The odd one won't.";
    }
  } else {
    // Hard: Complex composed rules
    // Rule: Arrow direction relative to a colored dot. 
    // 3 options: Arrow points clockwise towards the dot. Odd: points anti-clockwise.
    function getHardShape(isOdd) {
      let angle = Math.random() * 360;
      let dotAngle = isOdd ? angle - 45 : angle + 45; // +45 is clockwise, -45 is anti-clockwise
      
      let rad = angle * Math.PI / 180;
      let dotRad = dotAngle * Math.PI / 180;
      
      // Arrow at 'angle'
      let ax = 50 + 35 * Math.cos(rad);
      let ay = 50 + 35 * Math.sin(rad);
      let arrow = `<g transform="translate(${ax},${ay}) rotate(${angle})"><path d="M-10,-10 L10,0 L-10,10 Z" fill="#2980b9"/></g>`;
      
      // Dot at 'dotAngle'
      let dx = 50 + 35 * Math.cos(dotRad);
      let dy = 50 + 35 * Math.sin(dotRad);
      let dot = `<circle cx="${dx}" cy="${dy}" r="6" fill="#e74c3c"/>`;
      
      return `<circle cx="50" cy="50" r="45" fill="none" stroke="#7f8c8d" stroke-width="3"/>` + arrow + dot;
    }
    
    wrongOpts = [
      getHardShape(false),
      getHardShape(false),
      getHardShape(false)
    ];
    correctOpt = getHardShape(true);
    
    meta = { type: "Hidden Difference", logic: "Relative angular position (Clockwise vs Anti-clockwise)" };
    exp = "Step 1: Look at the circle containing an arrow and a red dot. Step 2: The absolute rotation changes in every option, so look at the relative position. Step 3: In three of the figures, if you travel in the direction the arrow is pointing, the red dot is situated clockwise (or 'ahead') of the arrow. Step 4: In the odd figure, the dot is positioned anti-clockwise (or 'behind') the arrow. Final Answer: Select the figure with the reversed relative dot position.";
    shortcut = "Mentally rotate all figures so the arrow points UP. Now check if the dot is on the left or the right. One will be different.";
  }
  
  let { opts, correctIndex } = shuffleOptions(correctOpt, wrongOpts);
  
  let optionsArr = [];
  const labels = ["A", "B", "C", "D"];
  for(let j=0; j<4; j++){
    let optImgPath = writeSvg(`${qId.toLowerCase()}_opt_${labels[j].toLowerCase()}.svg`, createOptionSVG(opts[j]));
    optionsArr.push({ id: labels[j], image: optImgPath });
  }
  
  let estTime = diff === "Easy" ? "30 sec" : diff === "Medium" ? "60 sec" : "120 sec";

  questionsData.push({
    id: qId,
    topic: "Logical Reasoning",
    subtopic: "Odd Figure Out",
    difficulty: diff,
    questionImage: qImgPath,
    question: "Choose the figure which is different from the rest.",
    options: optionsArr,
    correctAnswer: labels[correctIndex],
    patternType: meta.type,
    visualMetadata: meta,
    explanation: exp,
    shortcut: shortcut,
    commonMistake: "Focusing on absolute orientation instead of the relative rules (like number of sides or internal relationships).",
    estimatedTime: estTime,
    keywords: ["visual reasoning", "odd one out", "svg"],
    tags: ["placement", "visual"],
    visualizeAvailable: true
  });
}

fs.writeFileSync(path.join(dataDir, 'odd-figure-out.json'), JSON.stringify(questionsData, null, 2));

console.log('Total Generated:', questionsData.length);
console.log('Images generated:', fs.readdirSync(imgDir).length);
