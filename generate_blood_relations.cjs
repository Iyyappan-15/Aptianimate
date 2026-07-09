const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `BLOOD_RELATIONS_${num}`;
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
  if (difficulty === "Hard") estTime = "120 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Blood Relations",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Draw a quick family tree: use (+) for male, (-) for female, (=) for marriage, and vertical lines for generations.",
    commonMistake: mistakeText || "Assuming gender based purely on a name when it is not explicitly stated in the problem.",
    estimatedTime: estTime,
    keywords: ["blood relations", "logical reasoning", "family tree", "relations"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

// Data generators
const namesM = ["Aarav", "Rohan", "Vikram", "Rahul", "Karan", "Ajay", "Amit", "Raj", "Sameer", "Ravi", "Suresh", "Ramesh", "Deepak", "Anil", "Sunil"];
const namesF = ["Priya", "Neha", "Simran", "Anjali", "Riya", "Pooja", "Kavita", "Anita", "Geeta", "Sunita", "Rita", "Meena", "Seema", "Reena", "Tina"];
const letters = ["A", "B", "C", "D", "E", "P", "Q", "R", "S", "T", "X", "Y", "Z", "M", "N"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDistinct(arr, count) {
  let res = [];
  while(res.length < count) {
    let r = getRandom(arr);
    if (!res.includes(r)) res.push(r);
  }
  return res;
}

let generatedQs = [];

// EASY: 40 questions (Direct relations, pointing to photograph simple)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Pointing to photograph (Male speaker)
    let speaker = getRandom(namesM);
    let l = getDistinct(letters, 2);
    qText = `Pointing to a photograph of a boy, ${speaker} said, "He is the son of the only son of my mother." How is ${speaker} related to that boy?`;
    next = "Father";
    wrongs = ["Brother", "Uncle", "Grandfather"];
    pat = "Direct family trace backward";
    exp = `Step 1: Break down the sentence. "${speaker}'s mother's only son" is ${speaker} himself (since he is male). Step 2: The boy is the "son of" this person (${speaker}). Step 3: Therefore, the boy is ${speaker}'s son, which means ${speaker} is the boy's father. Final Answer: Father.`;
  } else if (type === 1) {
    // Pointing to photograph (Female speaker)
    let speaker = getRandom(namesF);
    qText = `Pointing to a man in a photograph, ${speaker} said, "His brother's father is the only son of my grandfather." How is ${speaker} related to the man in the photograph?`;
    next = "Sister";
    wrongs = ["Mother", "Aunt", "Daughter"];
    pat = "Tracing from grandfather down";
    exp = `Step 1: "${speaker}'s grandfather's only son" is ${speaker}'s father. Step 2: "His (the man's) brother's father" is simply the man's father. Step 3: So, the man's father is ${speaker}'s father. Thus, they are siblings. Since ${speaker} is female, she is his sister. Final Answer: Sister.`;
  } else if (type === 2) {
    // A is brother of B direct relation
    let n = getDistinct(letters, 3);
    qText = `${n[0]} is the brother of ${n[1]}. ${n[1]} is the sister of ${n[2]}. How is ${n[0]} related to ${n[2]}?`;
    next = "Brother";
    wrongs = ["Sister", "Cousin", "Cannot be determined"];
    pat = "Sibling relationship chain";
    exp = `Step 1: ${n[0]} is the brother of ${n[1]} (So, ${n[0]} is male). Step 2: ${n[1]} is the sister of ${n[2]}. Step 3: This means ${n[0]}, ${n[1]}, and ${n[2]} are siblings. Since ${n[0]} is male, he is the brother of ${n[2]}. Final Answer: Brother.`;
  } else {
    // Uncle/Aunt relation
    let n = getDistinct(namesM, 3);
    qText = `${n[0]} is the father of ${n[1]}. ${n[2]} is the brother of ${n[0]}. How is ${n[2]} related to ${n[1]}?`;
    next = "Uncle";
    wrongs = ["Brother", "Grandfather", "Cousin"];
    pat = "Parent's sibling";
    exp = `Step 1: ${n[0]} is the father of ${n[1]}. Step 2: ${n[2]} is the brother of ${n[0]}. Step 3: The brother of a person's father is their uncle. Final Answer: Uncle.`;
  }
  generatedQs.push(createQuestion("Easy", qText, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions (Coded relations, multi-step family tree)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Multi-step tree: Cousin
    let m = getDistinct(namesM, 2);
    let f = getDistinct(namesF, 2);
    qText = `${m[0]} is the brother of ${f[0]}. ${m[1]} is the son of ${m[0]}. ${f[1]} is the daughter of ${f[0]}. How are ${m[1]} and ${f[1]} related?`;
    next = "Cousins";
    wrongs = ["Brother and Sister", "Uncle and Niece", "Nephew and Niece"];
    pat = "Children of siblings";
    exp = `Step 1: ${m[0]} and ${f[0]} are siblings. Step 2: ${m[1]} is the child of ${m[0]}, and ${f[1]} is the child of ${f[0]}. Step 3: The children of siblings are cousins. Final Answer: Cousins.`;
  } else if (type === 1) {
    // Multi-step tree: Grandparent/Grandchild
    let l = getDistinct(letters, 4);
    qText = `${l[0]} is the mother of ${l[1]}. ${l[1]} is the sister of ${l[2]}. ${l[3]} is the son of ${l[2]}. How is ${l[0]} related to ${l[3]}?`;
    next = "Grandmother";
    wrongs = ["Mother", "Aunt", "Sister"];
    pat = "Two generations up";
    exp = `Step 1: ${l[0]} is the mother of ${l[1]}. Step 2: ${l[1]} and ${l[2]} are siblings, so ${l[0]} is also the mother of ${l[2]}. Step 3: ${l[3]} is the son of ${l[2]}. Step 4: The mother of one's parent (${l[2]}) is their grandmother. Final Answer: Grandmother.`;
  } else if (type === 2) {
    // Coded Relations Type 1
    let l = getDistinct(letters, 3);
    qText = `If A + B means A is the father of B, A - B means A is the sister of B, and A * B means A is the brother of B. What does ${l[0]} + ${l[1]} - ${l[2]} mean?`;
    next = `${l[0]} is the father of ${l[2]}`;
    wrongs = [
      `${l[0]} is the brother of ${l[2]}`, 
      `${l[0]} is the uncle of ${l[2]}`, 
      `${l[2]} is the father of ${l[0]}`
    ];
    pat = "Coded equation: Father -> Sister -> Child";
    exp = `Step 1: Break down the equation. ${l[0]} + ${l[1]} means ${l[0]} is the father of ${l[1]}. Step 2: ${l[1]} - ${l[2]} means ${l[1]} is the sister of ${l[2]}. Step 3: Since ${l[1]} and ${l[2]} are siblings, their father is the same. Therefore, ${l[0]} is the father of ${l[2]}. Final Answer: ${l[0]} is the father of ${l[2]}.`;
  } else {
    // Coded Relations Type 2
    let l = getDistinct(letters, 4);
    qText = `If P @ Q means P is the mother of Q, P $ Q means P is the husband of Q, and P # Q means P is the sister of Q. How is ${l[0]} related to ${l[3]} in the expression ${l[0]} $ ${l[1]} @ ${l[2]} # ${l[3]}?`;
    next = "Father";
    wrongs = ["Uncle", "Grandfather", "Brother"];
    pat = "Coded equation: Husband -> Mother -> Sister -> Child";
    exp = `Step 1: ${l[2]} # ${l[3]} -> ${l[2]} is the sister of ${l[3]}. Step 2: ${l[1]} @ ${l[2]} -> ${l[1]} is the mother of ${l[2]}. So, ${l[1]} is the mother of both ${l[2]} and ${l[3]}. Step 3: ${l[0]} $ ${l[1]} -> ${l[0]} is the husband of ${l[1]}. Step 4: Husband of the mother is the father. Final Answer: Father.`;
  }
  generatedQs.push(createQuestion("Medium", qText, next, wrongs, pat, exp));
}

// HARD: 20 questions (Complex puzzles, mixed statements)
for (let i = 0; i < 20; i++) {
  let type = i % 2;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Family puzzle
    let p = getDistinct(letters, 6);
    qText = `There is a family of 6 members: ${p[0]}, ${p[1]}, ${p[2]}, ${p[3]}, ${p[4]}, and ${p[5]}. ${p[2]} is the sister of ${p[5]}. ${p[1]} is the brother of ${p[4]}'s husband. ${p[3]} is the father of ${p[0]} and grandfather of ${p[5]}. There are two fathers, three brothers, and a mother in the family. How is ${p[4]} related to ${p[5]}?`;
    next = "Mother";
    wrongs = ["Grandmother", "Aunt", "Sister"];
    pat = "Multi-generation puzzle with implicit marriages";
    exp = `Step 1: ${p[3]} is grandfather of ${p[5]}, and father of ${p[0]}. So generation 1 is ${p[3]}, generation 2 is ${p[0]} and ${p[4]}'s husband, generation 3 is ${p[5]} and ${p[2]}. Step 2: ${p[1]} is the brother of ${p[4]}'s husband. Since there are 3 brothers and 2 fathers, ${p[0]} must be ${p[4]}'s husband, making ${p[1]} and ${p[0]} brothers. Step 3: If ${p[4]} is married to ${p[0]}, and ${p[0]} is the son of ${p[3]} (grandfather of ${p[5]}), then ${p[0]} and ${p[4]} are the parents of ${p[5]} and ${p[2]}. Final Answer: Mother.`;
  } else {
    // Complex pointed photograph
    let p1 = getRandom(namesF);
    let p2 = getRandom(namesM);
    qText = `Pointing to a lady in the garden, ${p2} said, "She is the daughter of my grandfather's only son." How is the lady related to ${p2}?`;
    next = "Sister";
    wrongs = ["Daughter", "Cousin", "Aunt"];
    pat = "Ambiguous gender mapping required";
    exp = `Step 1: Break down the statement. "${p2}'s grandfather's only son" refers to ${p2}'s father (since it is the *only* son). Step 2: The lady is the "daughter of" ${p2}'s father. Step 3: The daughter of ${p2}'s father is ${p2}'s sister. Final Answer: Sister.`;
  }
  generatedQs.push(createQuestion("Hard", qText, next, wrongs, pat, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `BLOOD_RELATIONS_${String(idx + 1).padStart(3, '0')}`;
});

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/logical-relations');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'blood-relations.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
