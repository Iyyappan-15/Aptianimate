const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `DIRECTION_SENSE_${num}`;
}

function shuffleOptions(correctAnswerText, otherOptions) {
  const options = [String(correctAnswerText), ...otherOptions.map(String)].slice(0, 4);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const correctIndex = options.indexOf(String(correctAnswerText));
  return { options, correctIndex };
}

function createQuestion(difficulty, questionText, nextVal, wrongVals, patternText, expText, shortcutText, mistakeText) {
  const { options, correctIndex } = shuffleOptions(nextVal, wrongVals);
  
  let estTime = "30 sec";
  if (difficulty === "Medium") estTime = "60 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Direction Sense",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Draw a small plus sign (+) to represent N, S, E, W and trace the path step-by-step.",
    commonMistake: mistakeText || "Confusing Left and Right turns, especially when facing South (where Left is East and Right is West).",
    estimatedTime: estTime,
    keywords: ["direction", "logical reasoning", "NSEW", "shortest distance", "path"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

let generatedQs = [];

const dirs = ["North", "South", "East", "West"];
const turns = ["left", "right"];

function getNewDir(currentDir, turn) {
  if (currentDir === "North") return turn === "left" ? "West" : "East";
  if (currentDir === "South") return turn === "left" ? "East" : "West";
  if (currentDir === "East") return turn === "left" ? "North" : "South";
  if (currentDir === "West") return turn === "left" ? "South" : "North";
}

function getOpposite(dir) {
  if (dir === "North") return "South";
  if (dir === "South") return "North";
  if (dir === "East") return "West";
  if (dir === "West") return "East";
}

// EASY: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 3;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Basic Direction tracking (No distance)
    let d1 = dirs[i % 4];
    let t1 = turns[i % 2];
    let t2 = turns[(i+1) % 2];
    let d2 = getNewDir(d1, t1);
    let d3 = getNewDir(d2, t2);
    
    qText = `A man starts walking towards ${d1}. After walking some distance, he turns to his ${t1}. He walks further and then turns to his ${t2}. In which direction is he facing now?`;
    next = d3;
    wrongs = dirs.filter(d => d !== d3).slice(0, 3);
    if(wrongs.length < 3) wrongs.push("North-East");
    pat = `Tracking cardinal directions through ${t1} and ${t2} turns`;
    exp = `Step 1: He starts facing ${d1}. Step 2: A ${t1} turn from ${d1} makes him face ${d2}. Step 3: A ${t2} turn from ${d2} makes him face ${d3}. Final Answer: ${next}.`;
  } else if (type === 1) {
    // Distance on straight line
    let d1 = dirs[i % 4];
    let dist1 = 10 + (i % 10) * 5;
    let dist2 = dist1 + 10;
    qText = `Rahul walks ${dist1}m towards ${d1}, then turns around and walks ${dist2}m in the opposite direction. How far and in which direction is he from the starting point?`;
    let opp = getOpposite(d1);
    let finalDist = dist2 - dist1;
    next = `${finalDist}m ${opp}`;
    wrongs = [
      `${finalDist}m ${d1}`,
      `${dist1 + dist2}m ${opp}`,
      `${dist1 + dist2}m ${d1}`
    ];
    pat = "Net distance on a single axis";
    exp = `Step 1: Rahul goes ${dist1}m towards ${d1}. Step 2: He turns around, meaning he goes towards ${opp}. Step 3: He travels ${dist2}m towards ${opp}. Since ${dist2} > ${dist1}, he crosses the starting point. The net distance from start is ${dist2} - ${dist1} = ${finalDist}m. Since the larger distance is towards ${opp}, he is in the ${opp} direction. Final Answer: ${next}.`;
  } else {
    // Pythagorean triplet simple
    let bases = [3, 6, 9, 12, 15];
    let heights = [4, 8, 12, 16, 20];
    let b = bases[i % bases.length];
    let h = heights[i % heights.length];
    let hyp = Math.sqrt(b*b + h*h);
    
    let d1 = i % 2 === 0 ? "North" : "South";
    let d2 = i % 2 === 0 ? "East" : "West";
    
    qText = `A girl walks ${b}km towards ${d1}. Then she turns to her ${d1==="North" ? (d2==="East"?"right":"left") : (d2==="East"?"left":"right")} and walks ${h}km. What is the shortest distance between her starting and ending point?`;
    next = `${hyp}km`;
    wrongs = [`${b+h}km`, `${hyp+5}km`, `${hyp-1}km`];
    pat = "Shortest distance using Pythagorean theorem";
    exp = `Step 1: She walks ${b}km ${d1}. This is the vertical leg of a right-angled triangle. Step 2: She turns and walks ${h}km ${d2}. This is the horizontal leg. Step 3: To find the shortest distance, calculate the hypotenuse: sqrt(${b}² + ${h}²) = sqrt(${b*b} + ${h*h}) = sqrt(${b*b + h*h}) = ${hyp}. Final Answer: ${next}.`;
  }
  generatedQs.push(createQuestion("Easy", qText, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 3;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // U-shape walking (finding displacement)
    // Walk North, right, right -> parallel to start
    let d1 = "North";
    let dist1 = 20;
    let turn1 = "right"; // faces East
    let dist2 = 15 + (i % 5)*5; // 15, 20, 25
    let turn2 = "right"; // faces South
    let dist3 = 20; // same as dist1 to form a perfect rectangle
    
    qText = `A boy walks ${dist1}m towards ${d1}. Then he turns ${turn1} and walks ${dist2}m. Again he turns ${turn2} and walks ${dist3}m. How far is he from his starting point?`;
    next = `${dist2}m`;
    wrongs = [`${dist1+dist2+dist3}m`, `${dist1+dist3}m`, `${dist2 + 10}m`];
    pat = "Rectangular path, finding horizontal/vertical displacement";
    exp = `Step 1: The boy walks ${dist1}m ${d1}. Step 2: He turns right (East) and walks ${dist2}m. Step 3: He turns right again (South) and walks ${dist3}m. Step 4: Since he walked ${dist1}m North and then ${dist3}m South (which is the same distance), his vertical displacement is zero. He is only horizontally displaced by the distance he walked East. Final Answer: ${next}.`;
  } else if (type === 1) {
    // Angles/Clockwise
    let startDir = dirs[i % 4];
    let a1 = 45 + (i % 3) * 45; // 45, 90, 135
    let a2 = 90 + (i % 3) * 45; // 90, 135, 180
    
    // Net angle calculation
    let net = a1 - a2; // clockwise is positive, anti is negative
    // Convert angle to direction
    let degrees = [0, 45, 90, 135, 180, 225, 270, 315];
    let dirNames = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
    
    // Base index for startDir
    let baseIdx = dirNames.indexOf(startDir);
    let netIdx = (baseIdx + Math.floor(net / 45)) % 8;
    if (netIdx < 0) netIdx += 8;
    
    next = dirNames[netIdx];
    
    qText = `A man is facing ${startDir}. He turns ${a1} degrees in the clockwise direction and then ${a2} degrees in the anti-clockwise direction. Which direction is he facing now?`;
    
    wrongs = [];
    for(let w=0; w<3; w++) {
      let wr = dirNames[(netIdx + w + 1) % 8];
      wrongs.push(wr);
    }
    
    pat = "Net angular rotation";
    exp = `Step 1: Clockwise turn = +${a1}°. Anti-clockwise turn = -${a2}°. Step 2: Net rotation = ${a1} - ${a2} = ${net}°. Step 3: A ${net}° rotation from ${startDir} brings him to face ${next}. Final Answer: ${next}.`;
  } else {
    // Relative position of multiple points (A is North of B...)
    qText = `Point A is 5m North of Point B. Point C is 5m East of Point B. Point D is 5m North of Point C. In which direction is Point D with respect to Point A?`;
    next = "East";
    wrongs = ["North", "South-East", "North-East"];
    pat = "Grid-based coordinate geometry";
    exp = `Step 1: Let B be at origin (0,0). Step 2: A is 5m North of B, so A is at (0,5). Step 3: C is 5m East of B, so C is at (5,0). Step 4: D is 5m North of C, so D is at (5,5). Step 5: Comparing A (0,5) and D (5,5), D is purely along the positive X axis from A. Therefore, D is East of A. Final Answer: East.`;
  }
  generatedQs.push(createQuestion("Medium", qText, next, wrongs, pat, exp));
}

// HARD: 20 questions
for (let i = 0; i < 20; i++) {
  let type = i % 2;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Shadows
    // Morning (Sun in East, shadow in West) vs Evening (Sun in West, shadow in East)
    let isMorning = i % 2 === 0;
    let time = isMorning ? "One morning after sunrise" : "One evening before sunset";
    let shadowDir = isMorning ? "West" : "East";
    // If shadow is to the left/right/front/back
    let p1 = "Rohan";
    let p2 = "Mohit";
    
    // Let's say shadow of Mohit falls exactly to the right of Rohan.
    // If Rohan's right is West (morning shadow), Rohan is facing South.
    // If Rohan's right is East (evening shadow), Rohan is facing North.
    let faceDir = isMorning ? "South" : "North"; 
    
    qText = `${time}, ${p1} and ${p2} were standing in a park, talking to each other face to face. If ${p2}'s shadow fell exactly to the right of ${p1}, which direction was ${p1} facing?`;
    next = faceDir;
    wrongs = dirs.filter(d => d !== faceDir);
    pat = "Sun and shadow logical deduction";
    exp = `Step 1: Determine the sun's position. ${isMorning ? "In the morning, the sun is in the East." : "In the evening, the sun is in the West."} Step 2: Because of the sun, shadows always fall to the ${shadowDir}. Step 3: The problem states the shadow fell to the right of ${p1}. This means ${p1}'s right side is towards the ${shadowDir}. Step 4: If a person's right arm points ${shadowDir}, they must be facing ${faceDir}. Final Answer: ${faceDir}.`;
  } else {
    // Complex path with Pythagorean theorem
    let d1 = "North";
    let dist1 = 10;
    let turn1 = "right"; // East
    let dist2 = 10;
    let turn2 = "right"; // South
    let dist3 = 34; // Net vertical is 34 - 10 = 24 South
    let turn3 = "left"; // East
    let dist4 = 8; // Net horizontal is 10 + 8 = 18 East
    // Now from start, displacement is 18 East, 24 South.
    // Hyp = sqrt(18^2 + 24^2) = sqrt(324 + 576) = sqrt(900) = 30
    
    qText = `A vehicle starts from point P and runs 10km towards North. It turns right and runs 10km. It then turns right again and runs 34km. Finally, it turns left and runs 8km to reach point Q. What is the shortest distance between P and Q?`;
    next = `30km`;
    wrongs = [`62km`, `24km`, `34km`];
    pat = "Complex polygonal path reduced to a right triangle";
    exp = `Step 1: Calculate net horizontal (East/West) movement. Right turn from North is East (10km). Left turn from South is also East (8km). Total East = 10 + 8 = 18km. Step 2: Calculate net vertical (North/South) movement. Initial North = 10km. Right turn from East is South (34km). Total South displacement = 34 - 10 = 24km. Step 3: Draw a right-angled triangle with base 18km and height 24km. Step 4: Shortest distance = sqrt(18² + 24²) = sqrt(324 + 576) = sqrt(900) = 30km. Final Answer: 30km.`;
  }
  generatedQs.push(createQuestion("Hard", qText, next, wrongs, pat, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `DIRECTION_SENSE_${String(idx + 1).padStart(3, '0')}`;
});

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/logical-relations');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'direction-sense.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
