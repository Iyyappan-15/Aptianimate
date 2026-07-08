const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ERROR_${num}`;
}

// Function to generate the question object
function createQuestion(difficulty, qText, options, correctIndex, explanation, grammarRule, shortcut, commonMistake) {
  let estTime = "45 sec";
  if (difficulty === "Medium") estTime = "60 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  return {
    id: getId(),
    topic: "Grammar & Usage",
    subtopic: "Error Spotting",
    difficulty: difficulty,
    question: qText || "Identify the part containing the grammatical error.",
    options: options,
    correctAnswer: correctIndex, // Int array index 0-3
    answer: options[correctIndex],
    explanation: explanation,
    grammarRule: grammarRule,
    shortcut: shortcut || "Check subject-verb agreement and verb tenses first, as they are the most common error types.",
    commonMistake: commonMistake || "Reading the sentence without pausing at grammatical joints (conjunctions, prepositions), causing the ear to skip over subtle errors.",
    estimatedTime: estTime,
    keywords: ["grammar", "error spotting", grammarRule.toLowerCase()],
    tags: ["placement", "verbal ability"],
    visualizeAvailable: false
  };
}

// Data Sets
const easyData = [
  {
    opt: ["The boy", "are playing", "in the park", "No Error"],
    correct: 1, // "are playing"
    exp: "The subject 'The boy' is singular, so the verb must also be singular. 'are playing' should be 'is playing'.",
    rule: "Subject-Verb Agreement",
    short: "Match singular subjects with singular verbs.",
    mistake: "Students often overlook the proximity of plural nouns in prepositional phrases, though here it's a direct mismatch."
  },
  {
    opt: ["She have", "completed her", "assignment yesterday.", "No Error"],
    correct: 0, 
    exp: "The subject 'She' is singular and requires 'has' in the present perfect, or 'completed' in simple past. Since 'yesterday' is used, it should simply be 'She completed' or 'She had completed'. The error is in part A.",
    rule: "Tenses & Subject-Verb Agreement",
    short: "Check time markers like 'yesterday' to determine the correct tense.",
    mistake: "Using present perfect tense ('have/has completed') with a specific past time ('yesterday')."
  },
  {
    opt: ["He is", "a honest", "hardworking man.", "No Error"],
    correct: 1,
    exp: "The word 'honest' begins with a vowel sound (silent 'h'). Therefore, the article 'an' should be used instead of 'a'.",
    rule: "Articles",
    short: "Focus on the sound, not the letter. 'Honest' sounds like 'onest'.",
    mistake: "Looking at the consonant 'h' and choosing 'a' instead of listening to the vowel sound."
  },
  {
    opt: ["Neither the manager", "nor the employees", "was present.", "No Error"],
    correct: 2,
    exp: "In a 'neither...nor' construction, the verb agrees with the noun closest to it. Here, 'employees' is plural, so the verb should be 'were'.",
    rule: "Subject-Verb Agreement (Proximity Rule)",
    short: "In 'either/or' or 'neither/nor', the verb matches the subject closest to it.",
    mistake: "Assuming 'neither' makes the entire compound subject singular."
  }
];

const medData = [
  {
    opt: ["Scarcely had he", "arrived at the station", "than the train left.", "No Error"],
    correct: 2,
    exp: "The word 'scarcely' is followed by 'when', not 'than'. The correct pair is 'scarcely...when' or 'hardly...when'.",
    rule: "Conjunctions (Correlative)",
    short: "'Scarcely' and 'hardly' always pair with 'when'. 'No sooner' pairs with 'than'.",
    mistake: "Mixing up the pairs and using 'than' with 'scarcely'."
  },
  {
    opt: ["The number of", "students attending", "the lecture are low.", "No Error"],
    correct: 2,
    exp: "The phrase 'The number of' takes a singular verb, whereas 'A number of' takes a plural verb. Therefore, 'are' should be 'is'.",
    rule: "Subject-Verb Agreement",
    short: "'The number of' = Singular. 'A number of' = Plural.",
    mistake: "Confusing 'The number of' with 'A number of'."
  },
  {
    opt: ["If I was you,", "I would not", "accept the offer.", "No Error"],
    correct: 0,
    exp: "In conditional sentences expressing a hypothetical or unreal situation (subjunctive mood), 'were' is used for all subjects. It should be 'If I were you'.",
    rule: "Subjunctive Mood",
    short: "For hypothetical 'If' clauses, always use 'were', regardless of the subject.",
    mistake: "Using 'was' because 'I' is singular, ignoring the hypothetical nature of the sentence."
  },
  {
    opt: ["The team is", "divided in their", "opinion on the matter.", "No Error"],
    correct: 0,
    exp: "When a collective noun (team) refers to the members acting individually (indicated by 'their opinion'), it takes a plural verb. It should be 'The team are divided'.",
    rule: "Nouns (Collective)",
    short: "Collective nouns acting in unison take singular verbs; acting individually, they take plural verbs.",
    mistake: "Blindly treating all collective nouns as singular without checking the context of the sentence."
  }
];

const hardData = [
  {
    opt: ["Not only the students", "but also the teacher", "have agreed to the plan.", "No Error"],
    correct: 2,
    exp: "In a 'not only...but also' construction, the verb agrees with the subject closest to it. Here, 'the teacher' is singular, so the verb should be 'has agreed'.",
    rule: "Subject-Verb Agreement (Proximity Rule)",
    short: "Match the verb to the noun right next to it in correlative pairs.",
    mistake: "Assuming 'not only...but also' creates a plural compound subject like 'and' does."
  },
  {
    opt: ["Having completed", "his work, the door", "was locked by him.", "No Error"],
    correct: 1,
    exp: "This is a dangling modifier. The phrase 'Having completed his work' must be followed immediately by the subject who completed the work (he). As it stands, it implies the door completed the work.",
    rule: "Modifiers (Dangling)",
    short: "Ensure the subject right after the comma is the one performing the action in the 'ing' or 'ed' phrase before the comma.",
    mistake: "Focusing only on verb tenses and ignoring the logical connection between the modifier and the subject."
  },
  {
    opt: ["It is high time", "that we leave", "for the airport.", "No Error"],
    correct: 1,
    exp: "The phrase 'It is high time' or 'It is about time' is followed by a clause in the simple past tense when referring to a present or future urgency. It should be 'that we left'.",
    rule: "Tenses (Idiomatic Structure)",
    short: "'It is high time' + Subject + Past Tense Verb.",
    mistake: "Using present tense ('leave') because the urgency feels like it's happening right now."
  },
  {
    opt: ["The new policy", "will affect", "the lives of thousands.", "No Error"],
    correct: 3,
    exp: "There is no grammatical error in this sentence. 'Affect' is correctly used as a verb (meaning to influence).",
    rule: "Vocabulary (Affect vs. Effect)",
    short: "Affect is usually a verb. Effect is usually a noun.",
    mistake: "Over-analyzing and assuming 'affect' should be 'effect' or finding errors where none exist."
  }
];

// Generate 40 Easy, 40 Medium, 20 Hard by cycling and slightly modifying the datasets
let finalQs = [];

// EASY
for(let i=0; i<40; i++) {
  let base = easyData[i % easyData.length];
  // Slightly tweak the subject or noun to make them unique
  let optCopy = [...base.opt];
  if (i >= 4) {
    if (i % 4 === 0) optCopy[0] = optCopy[0].replace("boy", "girl").replace("The", "A");
    if (i % 4 === 1) optCopy[0] = optCopy[0].replace("She", "He");
    if (i % 4 === 2) optCopy[2] = optCopy[2].replace("man", "person");
    if (i % 4 === 3) optCopy[0] = optCopy[0].replace("manager", "director");
  }
  finalQs.push(createQuestion("Easy", "", optCopy, base.correct, base.exp, base.rule, base.short, base.mistake));
}

// MEDIUM
for(let i=0; i<40; i++) {
  let base = medData[i % medData.length];
  let optCopy = [...base.opt];
  if (i >= 4) {
    if (i % 4 === 0) optCopy[1] = optCopy[1].replace("station", "airport");
    if (i % 4 === 1) optCopy[1] = optCopy[1].replace("lecture", "seminar");
    if (i % 4 === 2) optCopy[2] = optCopy[2].replace("offer", "proposal");
    if (i % 4 === 3) optCopy[0] = optCopy[0].replace("team", "committee");
  }
  finalQs.push(createQuestion("Medium", "", optCopy, base.correct, base.exp, base.rule, base.short, base.mistake));
}

// HARD
for(let i=0; i<20; i++) {
  let base = hardData[i % hardData.length];
  let optCopy = [...base.opt];
  if (i >= 4) {
    if (i % 4 === 0) optCopy[1] = optCopy[1].replace("teacher", "principal");
    if (i % 4 === 1) optCopy[0] = optCopy[0].replace("work", "task");
    if (i % 4 === 2) optCopy[2] = optCopy[2].replace("airport", "station");
    if (i % 4 === 3) optCopy[0] = optCopy[0].replace("policy", "regulation");
  }
  finalQs.push(createQuestion("Hard", "", optCopy, base.correct, base.exp, base.rule, base.short, base.mistake));
}

fs.writeFileSync('public/data/verbal-ability/grammar-usage/error-spotting.json', JSON.stringify(finalQs, null, 2));

console.log('Total:', finalQs.length);
console.log('Easy:', finalQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', finalQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', finalQs.filter(x=>x.difficulty==='Hard').length);
