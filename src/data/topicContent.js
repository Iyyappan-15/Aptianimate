// src/data/topicContent.js
// ─── Topic Content Database ───
// Each key is a URL-safe topic slug.
// To add content for a new topic, just add a new entry below.

export const TOPIC_CONTENT = {

  // ════════════════════════════════════════
  //  QUANTITATIVE — Number Systems
  // ════════════════════════════════════════

  'number-system-basics': {
    title: 'Number System Basics',
    icon: '🔢',
    color: '#6366f1',
    tagline: 'The foundation of all aptitude math.',
    description: `The Number System is the most fundamental topic in Quantitative Aptitude. Every number you see in an aptitude exam falls into a specific category — knowing these categories helps you eliminate wrong answers instantly.`,
    keyFacts: [
      { label: 'Natural Numbers', value: '1, 2, 3, 4, ... (counting numbers, starts at 1)' },
      { label: 'Whole Numbers', value: '0, 1, 2, 3, ... (Natural + zero)' },
      { label: 'Integers', value: '...-2, -1, 0, 1, 2... (includes negatives)' },
      { label: 'Rational Numbers', value: 'Any number of the form p/q where q ≠ 0' },
      { label: 'Prime Numbers', value: 'Divisible only by 1 and itself (2, 3, 5, 7, 11...)' },
      { label: 'Composite Numbers', value: 'Has more than 2 factors (4, 6, 8, 9...)' },
    ],
    formulas: [
      { title: 'Sum of first n natural numbers', formula: 'n(n+1) / 2', example: 'Sum of 1–10 = 10×11/2 = 55' },
      { title: 'Sum of first n odd numbers', formula: 'n²', example: 'Sum of first 5 odds = 5² = 25' },
      { title: 'Sum of first n even numbers', formula: 'n(n+1)', example: 'Sum of first 4 evens = 4×5 = 20' },
    ],
    identify: [
      'Question says "How many prime numbers between X and Y?"',
      'Question asks you to classify a number (rational, irrational, etc.)',
      'Question involves sum of a sequence of numbers',
      'Asks "which of the following is NOT a natural/whole/integer?"',
    ],
    approach: [
      { step: '1', tip: 'Memorize primes up to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47' },
      { step: '2', tip: 'Remember: 1 is neither prime nor composite.' },
      { step: '3', tip: '2 is the ONLY even prime number.' },
      { step: '4', tip: 'For range questions, simply count — do not try to calculate from formulas.' },
    ],
  },

  'lcm-hcf': {
    title: 'LCM & HCF',
    icon: '🔗',
    color: '#6366f1',
    tagline: 'Two of the most frequently tested topics in campus aptitude.',
    description: `HCF (Highest Common Factor) is the largest number that divides two or more numbers exactly. LCM (Least Common Multiple) is the smallest number that is divisible by two or more numbers. These two are inverses of each other and have a golden relationship.`,
    keyFacts: [
      { label: 'HCF', value: 'Largest common divisor of given numbers' },
      { label: 'LCM', value: 'Smallest common multiple of given numbers' },
      { label: 'Product Rule', value: 'HCF × LCM = Product of two numbers (only for 2 numbers)' },
    ],
    formulas: [
      { title: 'Golden Relationship', formula: 'HCF × LCM = A × B', example: 'A=12, B=18 → HCF=6, LCM=36. Check: 6×36 = 12×18 = 216 ✓' },
      { title: 'HCF of fractions', formula: 'HCF of numerators / LCM of denominators', example: 'HCF of 2/3 and 4/9 = HCF(2,4)/LCM(3,9) = 2/9' },
      { title: 'LCM of fractions', formula: 'LCM of numerators / HCF of denominators', example: 'LCM of 2/3 and 4/9 = LCM(2,4)/HCF(3,9) = 4/3' },
    ],
    identify: [
      '"What is the largest number that divides X, Y, Z?" → HCF',
      '"What is the smallest number divisible by X, Y, Z?" → LCM',
      '"When do the bells ring together again?" → LCM of time intervals',
      '"Tiles to fill a room" or "cut ropes into equal parts" → HCF',
    ],
    approach: [
      { step: '1', tip: 'If question says "largest/maximum/greatest" → Think HCF.' },
      { step: '2', tip: 'If question says "smallest/minimum/least" → Think LCM.' },
      { step: '3', tip: 'Use factorization for small numbers. Use division method for large numbers.' },
      { step: '4', tip: 'For 3+ numbers, you CANNOT use HCF × LCM = product. Only works for exactly 2 numbers.' },
    ],
  },

  'divisibility-rules': {
    title: 'Divisibility Rules',
    icon: '➗',
    color: '#6366f1',
    tagline: 'Solve in 5 seconds — no calculator needed.',
    description: `Divisibility rules let you check if a large number is divisible by small numbers (2–11) without actually dividing. In competitive exams, these rules help you solve questions in under 5 seconds.`,
    keyFacts: [
      { label: 'Div by 2', value: 'Last digit is 0, 2, 4, 6, or 8' },
      { label: 'Div by 3', value: 'Sum of digits divisible by 3' },
      { label: 'Div by 4', value: 'Last 2 digits divisible by 4' },
      { label: 'Div by 5', value: 'Last digit is 0 or 5' },
      { label: 'Div by 6', value: 'Divisible by BOTH 2 and 3' },
      { label: 'Div by 8', value: 'Last 3 digits divisible by 8' },
      { label: 'Div by 9', value: 'Sum of digits divisible by 9' },
      { label: 'Div by 11', value: 'Alternate digit sum difference is 0 or divisible by 11' },
    ],
    formulas: [
      { title: 'Div by 11', formula: '(Sum of odd-position digits) − (Sum of even-position digits) = 0 or multiple of 11', example: '121: (1+1)−(2) = 0 → Divisible by 11 ✓' },
    ],
    identify: [
      'Question asks "Is X divisible by Y?"',
      '"Which of these numbers is divisible by 6/8/11?"',
      '"Find the missing digit so the number is divisible by 9"',
    ],
    approach: [
      { step: '1', tip: 'Memorize all rules from 2 to 11 — they appear verbatim in TCS, Wipro, Infosys papers.' },
      { step: '2', tip: 'For "divisible by 6" — check div by 2 first (quick), then by 3.' },
      { step: '3', tip: 'For missing digit questions: Use div-by-9 rule: add digits, subtract from next multiple of 9 to find the missing one.' },
    ],
  },

  'remainders': {
    title: 'Remainders',
    icon: '🧮',
    color: '#6366f1',
    tagline: 'Trick your way through remainder problems.',
    description: `Remainder problems look complex but follow simple patterns. The key insight is that when a number N divided by D gives remainder R, then N = D×Q + R. Remainder questions are among the most commonly asked in TCS, Wipro, and Cognizant campus drives.`,
    keyFacts: [
      { label: 'Basic Rule', value: 'N = Divisor × Quotient + Remainder' },
      { label: 'Cyclicity Trick', value: 'Remainders of powers follow a repeating cycle (period usually 1–4)' },
    ],
    formulas: [
      { title: 'Basic', formula: 'Remainder of N÷D = N mod D', example: '17 ÷ 5 = 3 remainder 2. So 17 mod 5 = 2' },
      { title: 'Powers Trick', formula: 'Find pattern of N^1, N^2, N^3... mod D — cycle repeats', example: 'Remainder of 2^100 ÷ 3: Cycle of 2^n mod 3 = 2,1,2,1... Power 100 (even) → remainder 1' },
    ],
    identify: [
      '"What is the remainder when X is divided by Y?"',
      '"N^100 divided by 7, find remainder"',
      '"A number when divided by 5 gives remainder 3 and by 3 gives remainder 1, find the number"',
    ],
    approach: [
      { step: '1', tip: 'For simple remainders: just use modulo directly.' },
      { step: '2', tip: 'For large powers: find the cyclicity pattern (usually repeats in 4 steps).' },
      { step: '3', tip: 'Divide the exponent by the cycle length and find which step you land on.' },
      { step: '4', tip: 'Use Chinese Remainder Theorem for "multiple conditions" problems.' },
    ],
  },

  'percentages': {
    title: 'Percentages',
    icon: '%',
    color: '#ec4899',
    tagline: 'The single most important topic in arithmetic.',
    description: `Percentage is used in almost every other aptitude topic — Profit & Loss, Simple Interest, Ratio, Data Interpretation. If you master percentages, half your arithmetic is already done. The key is converting percentages to fractions for faster mental calculation.`,
    keyFacts: [
      { label: '10%', value: '1/10' }, { label: '20%', value: '1/5' },
      { label: '25%', value: '1/4' }, { label: '33.3%', value: '1/3' },
      { label: '50%', value: '1/2' }, { label: '66.6%', value: '2/3' },
      { label: '75%', value: '3/4' }, { label: '12.5%', value: '1/8' },
    ],
    formulas: [
      { title: 'Basic', formula: 'X% of Y = (X × Y) / 100', example: '15% of 80 = 15×80/100 = 12' },
      { title: 'Percentage Change', formula: '((New − Old) / Old) × 100', example: 'Price goes 40→50: Change = (50−40)/40 × 100 = 25% increase' },
      { title: 'Successive % Change', formula: 'a% then b% net change = a + b + (ab/100)', example: '10% then 20% = 10+20+(10×20/100) = 32% net increase' },
    ],
    identify: [
      '"X is what percent of Y?"',
      '"If price increases by X%, what is new price?"',
      '"Population decreases by X% then Y%, net change?"',
    ],
    approach: [
      { step: '1', tip: 'Convert % to fraction before calculating — much faster than decimal.' },
      { step: '2', tip: 'Use the successive change formula for two back-to-back percentage changes.' },
      { step: '3', tip: '"More by X%" means multiply by (1 + X/100). "Less by X%" means multiply by (1 − X/100).' },
      { step: '4', tip: 'Fraction shortcuts: 25% of any number = divide by 4. 33.3% = divide by 3.' },
    ],
  },

  'profit-loss': {
    title: 'Profit & Loss',
    icon: '💰',
    color: '#ec4899',
    tagline: 'Always calculate on Cost Price — that is the key rule.',
    description: `Profit & Loss builds directly on Percentages. The most important rule: Profit % and Loss % are ALWAYS calculated on Cost Price (CP), never on Selling Price. Get this right and 80% of questions become trivial.`,
    keyFacts: [
      { label: 'Cost Price (CP)', value: 'Price you pay to buy/make the item' },
      { label: 'Selling Price (SP)', value: 'Price at which you sell the item' },
      { label: 'Marked Price (MP)', value: 'Price written on the label (before discount)' },
    ],
    formulas: [
      { title: 'Profit / Loss', formula: 'Profit = SP − CP   |   Loss = CP − SP', example: 'CP=100, SP=120 → Profit = 20' },
      { title: 'Profit %', formula: 'Profit% = (Profit / CP) × 100', example: 'Profit=20, CP=100 → Profit% = 20%' },
      { title: 'Find SP', formula: 'SP = CP × (100 + P%) / 100', example: 'CP=200, P%=25 → SP = 200×125/100 = 250' },
      { title: 'Discount', formula: 'SP = MP × (100 − Discount%) / 100', example: 'MP=500, Discount=20% → SP = 400' },
    ],
    identify: [
      '"A shopkeeper sells at X% profit" → use SP = CP×(100+X)/100',
      '"Find profit %" → always use CP in denominator',
      '"Marked price, discount given, find CP or profit" → chain: MP → SP → CP',
    ],
    approach: [
      { step: '1', tip: 'Identify what you are given: CP, SP, or MP + Discount.' },
      { step: '2', tip: 'Use multiplier method: 20% profit = multiply CP by 1.2' },
      { step: '3', tip: 'For dishonest dealer: Profit% = (True weight − False weight)/False weight × 100' },
    ],
  },

  'time-work': {
    title: 'Time & Work',
    icon: '⚙️',
    color: '#10b981',
    tagline: 'Think in terms of work done per day — not total time.',
    description: `Time & Work problems are about efficiency. The trick is to stop thinking about "total time" and instead think about "fraction of work done per day". Once you express everyone's work as a daily fraction, the math becomes simple addition.`,
    keyFacts: [
      { label: 'Core Concept', value: 'If A can do work in N days → A does 1/N of work per day' },
      { label: 'Together', value: 'Add individual daily work fractions' },
    ],
    formulas: [
      { title: 'Work Per Day', formula: 'Daily work = 1/Number of days', example: 'A takes 10 days → does 1/10 per day' },
      { title: 'Together', formula: 'Days together = 1 / (1/A + 1/B)', example: 'A=10 days, B=15 days → Together = 1/(1/10+1/15) = 6 days' },
      { title: 'Shortcut for 2 people', formula: '(A × B) / (A + B)', example: '(10×15)/(10+15) = 150/25 = 6 days ✓' },
    ],
    identify: [
      '"A does work in X days, B does in Y days, together?"',
      '"A and B together for 3 days, then A leaves, B finishes in?"',
      '"Pipe fills tank in X hrs, pipe drains in Y hrs, net time?"',
    ],
    approach: [
      { step: '1', tip: 'Convert everyone to "per day" work fractions immediately.' },
      { step: '2', tip: 'Use LCM of days as "total work units" — it makes the math integer-friendly.' },
      { step: '3', tip: 'If B leaves after k days, calculate work done by both in k days, subtract from 1, rest done by A alone.' },
    ],
  },

  'time-speed-distance': {
    title: 'Time, Speed & Distance',
    icon: '🚀',
    color: '#10b981',
    tagline: 'Everything is D = S × T. Master the unit conversion.',
    description: `Time, Speed & Distance is one of the highest-frequency topics in campus placement tests. Every single question — whether about cars, trains, boats, or races — is a variation of just one formula: Distance = Speed × Time.`,
    keyFacts: [
      { label: 'Unit Conversion', value: 'km/h × 5/18 = m/s  |  m/s × 18/5 = km/h' },
      { label: 'Relative Speed', value: 'Opposite directions: Add | Same direction: Subtract' },
    ],
    formulas: [
      { title: 'Core Formula', formula: 'Distance = Speed × Time', example: '60 km/h for 2 hrs = 120 km' },
      { title: 'Average Speed (equal distances)', formula: '2ab / (a + b)', example: 'Go at 40, return at 60 → Avg = 2×40×60/100 = 48 km/h' },
      { title: 'Train crossing pole', formula: 'Time = Length of train / Speed', example: '200m train at 72 km/h (=20 m/s) → 200/20 = 10 sec' },
    ],
    identify: [
      '"Train A crosses train B" → Relative speed problem',
      '"Goes from A to B and returns" → Average speed formula',
      '"Train crosses a platform of length X" → Total distance = Train + Platform',
    ],
    approach: [
      { step: '1', tip: 'ALWAYS check units first — if speed is km/h and time is seconds, convert before substituting.' },
      { step: '2', tip: 'Average speed trick: Never add two speeds and divide unless time is equal.' },
      { step: '3', tip: 'Train + platform: distance = length of train + length of platform.' },
    ],
  },

  'probability': {
    title: 'Probability',
    icon: '🎲',
    color: '#6366f1',
    tagline: 'Favourable outcomes out of total outcomes.',
    description: `Probability measures the likelihood of an event. In campus aptitude, probability questions involve coins, dice, cards, and balls in a bag. The key is correctly counting the total outcomes and the favourable outcomes.`,
    keyFacts: [
      { label: 'Range', value: 'P(event) is always between 0 and 1' },
      { label: 'Certain Event', value: 'P = 1  |  Impossible Event: P = 0' },
      { label: 'Complement', value: "P(A') = 1 − P(A)" },
      { label: 'Standard deck', value: '52 cards: 4 suits × 13 cards each' },
    ],
    formulas: [
      { title: 'Basic', formula: 'P(E) = Favourable outcomes / Total outcomes', example: 'P(Head in coin toss) = 1/2' },
      { title: 'P(A or B)', formula: 'P(A) + P(B) − P(A and B)', example: '' },
      { title: 'P(A and B) — Independent', formula: 'P(A) × P(B)', example: 'P(2 heads in 2 tosses) = 1/2 × 1/2 = 1/4' },
    ],
    identify: [
      '"A card is drawn at random from a deck" → Probability question',
      '"Two dice are rolled, find P(sum=7)"',
      '"Bag has X red, Y blue balls, find P(drawing red)"',
    ],
    approach: [
      { step: '1', tip: 'List total outcomes clearly — dice: 36, coin 2 tosses: 4, etc.' },
      { step: '2', tip: 'Count favourable outcomes carefully — draw a table for dice problems.' },
      { step: '3', tip: 'For "at least one" questions: use P(at least 1) = 1 − P(none).' },
    ],
  },

  'syllogism': {
    title: 'Syllogism',
    icon: '🧩',
    color: '#ec4899',
    tagline: 'Use Venn diagrams — never guess from words.',
    description: `Syllogism is a deductive reasoning topic where you are given statements and must identify which conclusions logically follow. The trick is to always draw Venn diagrams and NOT be misled by your real-world knowledge — only what the statements say counts.`,
    keyFacts: [
      { label: 'All A are B', value: 'Circle A is fully inside circle B' },
      { label: 'No A is B', value: 'Circles A and B do not overlap at all' },
      { label: 'Some A are B', value: 'Circles partially overlap' },
      { label: 'Some A are not B', value: 'Part of A is outside B' },
    ],
    formulas: [
      { title: 'All + All = All', formula: '"All A are B" + "All B are C" → All A are C ✓', example: '' },
      { title: 'All + No = No', formula: '"All A are B" + "No B is C" → No A is C ✓', example: '' },
      { title: 'Some + All = Some', formula: '"Some A are B" + "All B are C" → Some A are C ✓', example: '' },
    ],
    identify: [
      'Question gives 2–3 "All/No/Some" statements and asks which conclusions follow',
      'Options say "Both I and II follow" or "Neither follows" etc.',
    ],
    approach: [
      { step: '1', tip: 'Draw Venn diagrams — do not rely on logic in your head.' },
      { step: '2', tip: 'Check if each conclusion is DEFINITELY true (not possibly true).' },
      { step: '3', tip: '"Some A are not B" does NOT mean "No A is B".' },
      { step: '4', tip: 'Complementary pairs: if one of "Some A are B" and "No A is B" is a conclusion, answer is "either I or II follows".' },
    ],
  },

  'coding-decoding': {
    title: 'Coding-Decoding',
    icon: '🔐',
    color: '#ec4899',
    tagline: 'Find the pattern — it is always consistent.',
    description: `Coding-Decoding tests your ability to find the rule by which one word or number is converted into a code. The rule is always consistent — find it with one example and apply it to the rest.`,
    keyFacts: [
      { label: 'Letter Position', value: 'A=1, B=2, C=3 ... Z=26. Also reverse: A=26, Z=1.' },
      { label: 'Opposite Letter', value: 'A↔Z, B↔Y, C↔X ... (A+Z=27)' },
    ],
    formulas: [],
    identify: [
      '"If CAT is coded as ECV, how is DOG coded?"',
      '"In a certain code language, 123 means Red Light Green, what does 2 mean?"',
    ],
    approach: [
      { step: '1', tip: 'For letter codes: find the shift. Is each letter shifted by +2? −1? Reversed?' },
      { step: '2', tip: 'For number codes: map each number to a word, then identify which number = which word by finding the common element.' },
      { step: '3', tip: 'Always check: is the pattern applied to positions (1st, 2nd letter) or values (A=1)?' },
    ],
  },

  'blood-relations': {
    title: 'Blood Relations',
    icon: '👨‍👩‍👧',
    color: '#ec4899',
    tagline: 'Draw the family tree — always.',
    description: `Blood Relations questions ask you to find the relationship between people based on a series of clues. The only reliable method is to draw a family tree diagram as you read each clue. Never try to solve these in your head.`,
    keyFacts: [
      { label: "Father's / Mother's brother", value: 'Uncle' },
      { label: "Father's / Mother's sister", value: 'Aunt' },
      { label: "Brother's / Sister's son", value: 'Nephew' },
      { label: "Brother's / Sister's daughter", value: 'Niece' },
    ],
    formulas: [],
    identify: [
      '"Pointing to a photograph, A says She is the daughter of my father\'s only son"',
      '"B is the son of C\'s father\'s sister. How is B related to C?"',
    ],
    approach: [
      { step: '1', tip: 'Use M for Male, F for Female. Draw boxes and connect with lines.' },
      { step: '2', tip: 'Start from the person you know the most about and build outward.' },
      { step: '3', tip: 'Be careful about gender — "sister\'s husband" is not the same as "husband\'s sister".' },
    ],
  },

  'reading-comprehension': {
    title: 'Reading Comprehension',
    icon: '📖',
    color: '#10b981',
    tagline: 'The answer is always in the passage — trust it.',
    description: `Reading Comprehension (RC) tests your ability to read a passage quickly and answer questions accurately. The key principle: NEVER answer from your personal knowledge. The answer is always found within the passage itself.`,
    keyFacts: [
      { label: 'Types of Questions', value: 'Main idea, Detail, Inference, Tone, Vocabulary-in-context' },
    ],
    formulas: [],
    identify: [
      'A passage (200–500 words) followed by 4–6 questions',
      'Questions like "What is the main idea?", "The author\'s tone is?", "What can be inferred?"',
    ],
    approach: [
      { step: '1', tip: 'Read the questions FIRST, then skim the passage for those answers.' },
      { step: '2', tip: 'For "main idea" — it is always stated in the first or last paragraph.' },
      { step: '3', tip: 'For "tone" — look for emotion words in the passage (critical, optimistic, neutral, etc.).' },
      { step: '4', tip: 'Eliminate options that are too extreme ("always", "never") or too narrow (only one detail).' },
    ],
  },

  'para-jumbles': {
    title: 'Para Jumbles',
    icon: '🔀',
    color: '#10b981',
    tagline: 'Find the opening sentence and the mandatory pairs.',
    description: `Para Jumbles give you 4–6 sentences in a scrambled order and ask you to arrange them into a coherent paragraph. The strategy is systematic — find the first sentence, find pairs that must go together, and the order will emerge.`,
    keyFacts: [
      { label: 'Opening Sentence', value: 'Introduces a new idea or topic — no pronouns or connector words like "however", "but", "also"' },
      { label: 'Closing Sentence', value: 'Contains a conclusion, result, or summary word like "thus", "therefore", "finally"' },
    ],
    formulas: [],
    identify: [
      '4–6 numbered/lettered sentences asked to be arranged in correct order',
      'Options like BDAC, CABD, etc.',
    ],
    approach: [
      { step: '1', tip: 'Eliminate sentences with pronouns (he, she, it, they) from being the opener — they refer to something already introduced.' },
      { step: '2', tip: 'Find "mandatory pairs" — a sentence that introduces a concept followed by one that expands on it.' },
      { step: '3', tip: 'Transition words tell you order: "However/But" = contrast. "Also/Moreover" = addition. "Therefore" = conclusion.' },
      { step: '4', tip: 'Use elimination from options — once you fix the first sentence, half the options are ruled out.' },
    ],
  },

  'error-spotting': {
    title: 'Error Spotting',
    icon: '✏️',
    color: '#10b981',
    tagline: 'Focus on subject-verb agreement and tense consistency.',
    description: `Error Spotting questions give you a sentence divided into parts (A, B, C, D) and ask you to identify which part has a grammatical error. The errors almost always fall into a predictable set of patterns.`,
    keyFacts: [
      { label: 'Most common errors', value: 'Subject-Verb agreement, Wrong tense, Wrong preposition, Article misuse, Redundancy' },
    ],
    formulas: [],
    identify: [
      'A sentence split into 3–4 underlined parts, asked "which has an error?"',
    ],
    approach: [
      { step: '1', tip: 'Always check Subject-Verb agreement first — singular subject needs singular verb.' },
      { step: '2', tip: 'Check tense consistency — if sentence starts in past, it should stay in past.' },
      { step: '3', tip: 'Watch out for: "each/every/either/neither" — these are always SINGULAR.' },
      { step: '4', tip: 'Common preposition traps: "Discuss about" (wrong — just "discuss"), "Married to" (right), "Accused of" (right).' },
    ],
  },


  // ════════════════════════════════════════
  //  AUTO-GENERATED TOPICS
  // ════════════════════════════════════════

  'prime-factorization': {
    title: 'Prime Factorization',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Prime Factorization.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Prime Factorization. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Prime Factorization.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'number-of-factors': {
    title: 'Number of Factors',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Number of Factors.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Number of Factors. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Number of Factors.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'unit-digits-cyclicity': {
    title: 'Unit Digits & Cyclicity',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Unit Digits & Cyclicity.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Unit Digits & Cyclicity. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Unit Digits & Cyclicity.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'decimal-fractions': {
    title: 'Decimal Fractions',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Decimal Fractions.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Decimal Fractions. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Decimal Fractions.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'simplification': {
    title: 'Simplification',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Simplification.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Simplification. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Simplification.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'approximation': {
    title: 'Approximation',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Approximation.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Approximation. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Approximation.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'trailing-zeros': {
    title: 'Trailing Zeros',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Trailing Zeros.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Trailing Zeros. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Trailing Zeros.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'ratio-proportion': {
    title: 'Ratio & Proportion',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Ratio & Proportion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Ratio & Proportion. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Ratio & Proportion.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'averages': {
    title: 'Averages',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Averages.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Averages. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Averages.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'simple-interest': {
    title: 'Simple Interest',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Simple Interest.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Simple Interest. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Simple Interest.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'compound-interest': {
    title: 'Compound Interest',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Compound Interest.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Compound Interest. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Compound Interest.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'ages': {
    title: 'Ages',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Ages.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Ages. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Ages.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'alligation-mixtures': {
    title: 'Alligation & Mixtures',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Alligation & Mixtures.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Alligation & Mixtures. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Alligation & Mixtures.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'pipes-cisterns': {
    title: 'Pipes & Cisterns',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Pipes & Cisterns.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Pipes & Cisterns. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Pipes & Cisterns.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'trains': {
    title: 'Trains',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Trains.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Trains. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Trains.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'boats-streams': {
    title: 'Boats & Streams',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Boats & Streams.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Boats & Streams. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Boats & Streams.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'tables': {
    title: 'Tables',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Tables.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Tables. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Tables.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'bar-charts': {
    title: 'Bar Charts',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Bar Charts.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Bar Charts. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Bar Charts.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'pie-charts': {
    title: 'Pie Charts',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Pie Charts.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Pie Charts. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Pie Charts.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'line-graphs': {
    title: 'Line Graphs',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Line Graphs.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Line Graphs. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Line Graphs.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'mixed-di-sets': {
    title: 'Mixed DI Sets',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Mixed DI Sets.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Mixed DI Sets. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Mixed DI Sets.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'permutation-combination': {
    title: 'Permutation & Combination',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Permutation & Combination.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Permutation & Combination. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Permutation & Combination.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'logarithm': {
    title: 'Logarithm',
    icon: '📊',
    color: '#6366f1',
    tagline: 'Master the concepts of Logarithm.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Logarithm. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Logarithm.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'number-series': {
    title: 'Number Series',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Number Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Number Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Number Series.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'letter-series': {
    title: 'Letter Series',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Letter Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Letter Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Letter Series.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'alphanumeric-series': {
    title: 'Alphanumeric Series',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Alphanumeric Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Alphanumeric Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Alphanumeric Series.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'direction-sense': {
    title: 'Direction Sense',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Direction Sense.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Direction Sense. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Direction Sense.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'ranking-ordering': {
    title: 'Ranking & Ordering',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Ranking & Ordering.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Ranking & Ordering. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Ranking & Ordering.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'statement-conclusion': {
    title: 'Statement & Conclusion',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Statement & Conclusion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Statement & Conclusion. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Statement & Conclusion.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'statement-assumption': {
    title: 'Statement & Assumption',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Statement & Assumption.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Statement & Assumption. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Statement & Assumption.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'linear-arrangement': {
    title: 'Linear Arrangement',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Linear Arrangement.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Linear Arrangement. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Linear Arrangement.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'circular-arrangement': {
    title: 'Circular Arrangement',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Circular Arrangement.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Circular Arrangement. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Circular Arrangement.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'floor-puzzles': {
    title: 'Floor Puzzles',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Floor Puzzles.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Floor Puzzles. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Floor Puzzles.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'box-puzzles': {
    title: 'Box Puzzles',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Box Puzzles.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Box Puzzles. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Box Puzzles.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'pattern-completion': {
    title: 'Pattern Completion',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Pattern Completion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Pattern Completion. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Pattern Completion.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'figure-series': {
    title: 'Figure Series',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Figure Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Figure Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Figure Series.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'mirror-images': {
    title: 'Mirror Images',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Mirror Images.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Mirror Images. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Mirror Images.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'water-images': {
    title: 'Water Images',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Water Images.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Water Images. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Water Images.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'odd-figure-out': {
    title: 'Odd Figure Out',
    icon: '🧠',
    color: '#ec4899',
    tagline: 'Master the concepts of Odd Figure Out.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Odd Figure Out. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Odd Figure Out.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'sentence-correction': {
    title: 'Sentence Correction',
    icon: '📖',
    color: '#10b981',
    tagline: 'Master the concepts of Sentence Correction.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Sentence Correction. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Sentence Correction.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'fill-in-the-blanks': {
    title: 'Fill in the Blanks',
    icon: '📖',
    color: '#10b981',
    tagline: 'Master the concepts of Fill in the Blanks.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Fill in the Blanks. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Fill in the Blanks.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'sentence-completion': {
    title: 'Sentence Completion',
    icon: '📖',
    color: '#10b981',
    tagline: 'Master the concepts of Sentence Completion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Sentence Completion. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Sentence Completion.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

  'cloze-test': {
    title: 'Cloze Test',
    icon: '📖',
    color: '#10b981',
    tagline: 'Master the concepts of Cloze Test.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Cloze Test. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to Cloze Test.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },

};

// Helper to create a URL-safe slug from a topic name
export function topicToSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
