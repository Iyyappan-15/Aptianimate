// src/data/topicContent.js
// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Topic Content Database Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Each key is a URL-safe topic slug.
// To add content for a new topic, just add a new entry below.

export const TOPIC_CONTENT = {

  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  QUANTITATIVE Ã¢â‚¬â€ Number Systems
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

  'number-system-basics': {
    title: 'Number System Basics',
    icon: 'Ã°Å¸â€Â¢',
    color: '#6366f1',
    tagline: 'The foundation of all aptitude math.',
    description: `The Number System is the most fundamental topic in Quantitative Aptitude. Every number you see in an aptitude exam falls into a specific category Ã¢â‚¬â€ knowing these categories helps you eliminate wrong answers instantly.`,
    keyFacts: [
      { label: 'Natural Numbers', value: '1, 2, 3, 4, ... (counting numbers, starts at 1)' },
      { label: 'Whole Numbers', value: '0, 1, 2, 3, ... (Natural + zero)' },
      { label: 'Integers', value: '...-2, -1, 0, 1, 2... (includes negatives)' },
      { label: 'Rational Numbers', value: 'Any number of the form p/q where q Ã¢â€°Â  0' },
      { label: 'Prime Numbers', value: 'Divisible only by 1 and itself (2, 3, 5, 7, 11...)' },
      { label: 'Composite Numbers', value: 'Has more than 2 factors (4, 6, 8, 9...)' },
    ],
    formulas: [
      { title: 'Sum of first n natural numbers', formula: 'n(n+1) / 2', example: 'Sum of 1Ã¢â‚¬â€œ10 = 10Ãƒâ€”11/2 = 55' },
      { title: 'Sum of first n odd numbers', formula: 'nÃ‚Â²', example: 'Sum of first 5 odds = 5Ã‚Â² = 25' },
      { title: 'Sum of first n even numbers', formula: 'n(n+1)', example: 'Sum of first 4 evens = 4Ãƒâ€”5 = 20' },
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
      { step: '4', tip: 'For range questions, simply count Ã¢â‚¬â€ do not try to calculate from formulas.' },
    ],
  },

  'lcm-hcf': {
    title: 'LCM & HCF',
    icon: 'Ã°Å¸â€â€”',
    color: '#6366f1',
    tagline: 'Two of the most frequently tested topics in campus aptitude.',
    description: `HCF (Highest Common Factor) is the largest number that divides two or more numbers exactly. LCM (Least Common Multiple) is the smallest number that is divisible by two or more numbers. These two are inverses of each other and have a golden relationship.`,
    keyFacts: [
      { label: 'HCF', value: 'Largest common divisor of given numbers' },
      { label: 'LCM', value: 'Smallest common multiple of given numbers' },
      { label: 'Product Rule', value: 'HCF Ãƒâ€” LCM = Product of two numbers (only for 2 numbers)' },
    ],
    formulas: [
      { title: 'Golden Relationship', formula: 'HCF Ãƒâ€” LCM = A Ãƒâ€” B', example: 'A=12, B=18 Ã¢â€ â€™ HCF=6, LCM=36. Check: 6Ãƒâ€”36 = 12Ãƒâ€”18 = 216 Ã¢Å“â€œ' },
      { title: 'HCF of fractions', formula: 'HCF of numerators / LCM of denominators', example: 'HCF of 2/3 and 4/9 = HCF(2,4)/LCM(3,9) = 2/9' },
      { title: 'LCM of fractions', formula: 'LCM of numerators / HCF of denominators', example: 'LCM of 2/3 and 4/9 = LCM(2,4)/HCF(3,9) = 4/3' },
    ],
    identify: [
      '"What is the largest number that divides X, Y, Z?" Ã¢â€ â€™ HCF',
      '"What is the smallest number divisible by X, Y, Z?" Ã¢â€ â€™ LCM',
      '"When do the bells ring together again?" Ã¢â€ â€™ LCM of time intervals',
      '"Tiles to fill a room" or "cut ropes into equal parts" Ã¢â€ â€™ HCF',
    ],
    approach: [
      { step: '1', tip: 'If question says "largest/maximum/greatest" Ã¢â€ â€™ Think HCF.' },
      { step: '2', tip: 'If question says "smallest/minimum/least" Ã¢â€ â€™ Think LCM.' },
      { step: '3', tip: 'Use factorization for small numbers. Use division method for large numbers.' },
      { step: '4', tip: 'For 3+ numbers, you CANNOT use HCF Ãƒâ€” LCM = product. Only works for exactly 2 numbers.' },
    ],
  },

  'divisibility-rules': {
    title: 'Divisibility Rules',
    icon: 'Ã¢Å¾â€”',
    color: '#6366f1',
    tagline: 'Solve in 5 seconds Ã¢â‚¬â€ no calculator needed.',
    description: `Divisibility rules let you check if a large number is divisible by small numbers (2Ã¢â‚¬â€œ11) without actually dividing. In competitive exams, these rules help you solve questions in under 5 seconds.`,
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
      { title: 'Div by 11', formula: '(Sum of odd-position digits) Ã¢Ë†â€™ (Sum of even-position digits) = 0 or multiple of 11', example: '121: (1+1)Ã¢Ë†â€™(2) = 0 Ã¢â€ â€™ Divisible by 11 Ã¢Å“â€œ' },
    ],
    identify: [
      'Question asks "Is X divisible by Y?"',
      '"Which of these numbers is divisible by 6/8/11?"',
      '"Find the missing digit so the number is divisible by 9"',
    ],
    approach: [
      { step: '1', tip: 'Memorize all rules from 2 to 11 Ã¢â‚¬â€ they appear verbatim in TCS, Wipro, Infosys papers.' },
      { step: '2', tip: 'For "divisible by 6" Ã¢â‚¬â€ check div by 2 first (quick), then by 3.' },
      { step: '3', tip: 'For missing digit questions: Use div-by-9 rule: add digits, subtract from next multiple of 9 to find the missing one.' },
    ],
  },

  'remainders': {
    title: 'Remainders',
    icon: 'Ã°Å¸Â§Â®',
    color: '#6366f1',
    tagline: 'Trick your way through remainder problems.',
    description: `Remainder problems look complex but follow simple patterns. The key insight is that when a number N divided by D gives remainder R, then N = DÃƒâ€”Q + R. Remainder questions are among the most commonly asked in TCS, Wipro, and Cognizant campus drives.`,
    keyFacts: [
      { label: 'Basic Rule', value: 'N = Divisor Ãƒâ€” Quotient + Remainder' },
      { label: 'Cyclicity Trick', value: 'Remainders of powers follow a repeating cycle (period usually 1Ã¢â‚¬â€œ4)' },
    ],
    formulas: [
      { title: 'Basic', formula: 'Remainder of NÃƒÂ·D = N mod D', example: '17 ÃƒÂ· 5 = 3 remainder 2. So 17 mod 5 = 2' },
      { title: 'Powers Trick', formula: 'Find pattern of N^1, N^2, N^3... mod D Ã¢â‚¬â€ cycle repeats', example: 'Remainder of 2^100 ÃƒÂ· 3: Cycle of 2^n mod 3 = 2,1,2,1... Power 100 (even) Ã¢â€ â€™ remainder 1' },
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
    description: `Percentage is used in almost every other aptitude topic Ã¢â‚¬â€ Profit & Loss, Simple Interest, Ratio, Data Interpretation. If you master percentages, half your arithmetic is already done. The key is converting percentages to fractions for faster mental calculation.`,
    keyFacts: [
      { label: '10%', value: '1/10' }, { label: '20%', value: '1/5' },
      { label: '25%', value: '1/4' }, { label: '33.3%', value: '1/3' },
      { label: '50%', value: '1/2' }, { label: '66.6%', value: '2/3' },
      { label: '75%', value: '3/4' }, { label: '12.5%', value: '1/8' },
    ],
    formulas: [
      { title: 'Basic', formula: 'X% of Y = (X Ãƒâ€” Y) / 100', example: '15% of 80 = 15Ãƒâ€”80/100 = 12' },
      { title: 'Percentage Change', formula: '((New Ã¢Ë†â€™ Old) / Old) Ãƒâ€” 100', example: 'Price goes 40Ã¢â€ â€™50: Change = (50Ã¢Ë†â€™40)/40 Ãƒâ€” 100 = 25% increase' },
      { title: 'Successive % Change', formula: 'a% then b% net change = a + b + (ab/100)', example: '10% then 20% = 10+20+(10Ãƒâ€”20/100) = 32% net increase' },
    ],
    identify: [
      '"X is what percent of Y?"',
      '"If price increases by X%, what is new price?"',
      '"Population decreases by X% then Y%, net change?"',
    ],
    approach: [
      { step: '1', tip: 'Convert % to fraction before calculating Ã¢â‚¬â€ much faster than decimal.' },
      { step: '2', tip: 'Use the successive change formula for two back-to-back percentage changes.' },
      { step: '3', tip: '"More by X%" means multiply by (1 + X/100). "Less by X%" means multiply by (1 Ã¢Ë†â€™ X/100).' },
      { step: '4', tip: 'Fraction shortcuts: 25% of any number = divide by 4. 33.3% = divide by 3.' },
    ],
  },

  'profit-loss': {
    title: 'Profit & Loss',
    icon: 'Ã°Å¸â€™Â°',
    color: '#ec4899',
    tagline: 'Always calculate on Cost Price Ã¢â‚¬â€ that is the key rule.',
    description: `Profit & Loss builds directly on Percentages. The most important rule: Profit % and Loss % are ALWAYS calculated on Cost Price (CP), never on Selling Price. Get this right and 80% of questions become trivial.`,
    keyFacts: [
      { label: 'Cost Price (CP)', value: 'Price you pay to buy/make the item' },
      { label: 'Selling Price (SP)', value: 'Price at which you sell the item' },
      { label: 'Marked Price (MP)', value: 'Price written on the label (before discount)' },
    ],
    formulas: [
      { title: 'Profit / Loss', formula: 'Profit = SP Ã¢Ë†â€™ CP   |   Loss = CP Ã¢Ë†â€™ SP', example: 'CP=100, SP=120 Ã¢â€ â€™ Profit = 20' },
      { title: 'Profit %', formula: 'Profit% = (Profit / CP) Ãƒâ€” 100', example: 'Profit=20, CP=100 Ã¢â€ â€™ Profit% = 20%' },
      { title: 'Find SP', formula: 'SP = CP Ãƒâ€” (100 + P%) / 100', example: 'CP=200, P%=25 Ã¢â€ â€™ SP = 200Ãƒâ€”125/100 = 250' },
      { title: 'Discount', formula: 'SP = MP Ãƒâ€” (100 Ã¢Ë†â€™ Discount%) / 100', example: 'MP=500, Discount=20% Ã¢â€ â€™ SP = 400' },
    ],
    identify: [
      '"A shopkeeper sells at X% profit" Ã¢â€ â€™ use SP = CPÃƒâ€”(100+X)/100',
      '"Find profit %" Ã¢â€ â€™ always use CP in denominator',
      '"Marked price, discount given, find CP or profit" Ã¢â€ â€™ chain: MP Ã¢â€ â€™ SP Ã¢â€ â€™ CP',
    ],
    approach: [
      { step: '1', tip: 'Identify what you are given: CP, SP, or MP + Discount.' },
      { step: '2', tip: 'Use multiplier method: 20% profit = multiply CP by 1.2' },
      { step: '3', tip: 'For dishonest dealer: Profit% = (True weight Ã¢Ë†â€™ False weight)/False weight Ãƒâ€” 100' },
    ],
  },

  'time-work': {
    title: 'Time & Work',
    icon: 'Ã¢Å¡â„¢Ã¯Â¸Â',
    color: '#10b981',
    tagline: 'Think in terms of work done per day Ã¢â‚¬â€ not total time.',
    description: `Time & Work problems are about efficiency. The trick is to stop thinking about "total time" and instead think about "fraction of work done per day". Once you express everyone's work as a daily fraction, the math becomes simple addition.`,
    keyFacts: [
      { label: 'Core Concept', value: 'If A can do work in N days Ã¢â€ â€™ A does 1/N of work per day' },
      { label: 'Together', value: 'Add individual daily work fractions' },
    ],
    formulas: [
      { title: 'Work Per Day', formula: 'Daily work = 1/Number of days', example: 'A takes 10 days Ã¢â€ â€™ does 1/10 per day' },
      { title: 'Together', formula: 'Days together = 1 / (1/A + 1/B)', example: 'A=10 days, B=15 days Ã¢â€ â€™ Together = 1/(1/10+1/15) = 6 days' },
      { title: 'Shortcut for 2 people', formula: '(A Ãƒâ€” B) / (A + B)', example: '(10Ãƒâ€”15)/(10+15) = 150/25 = 6 days Ã¢Å“â€œ' },
    ],
    identify: [
      '"A does work in X days, B does in Y days, together?"',
      '"A and B together for 3 days, then A leaves, B finishes in?"',
      '"Pipe fills tank in X hrs, pipe drains in Y hrs, net time?"',
    ],
    approach: [
      { step: '1', tip: 'Convert everyone to "per day" work fractions immediately.' },
      { step: '2', tip: 'Use LCM of days as "total work units" Ã¢â‚¬â€ it makes the math integer-friendly.' },
      { step: '3', tip: 'If B leaves after k days, calculate work done by both in k days, subtract from 1, rest done by A alone.' },
    ],
  },

  'time-speed-distance': {
    title: 'Time, Speed & Distance',
    icon: 'Ã°Å¸Å¡â‚¬',
    color: '#10b981',
    tagline: 'Everything is D = S Ãƒâ€” T. Master the unit conversion.',
    description: `Time, Speed & Distance is one of the highest-frequency topics in campus placement tests. Every single question Ã¢â‚¬â€ whether about cars, trains, boats, or races Ã¢â‚¬â€ is a variation of just one formula: Distance = Speed Ãƒâ€” Time.`,
    keyFacts: [
      { label: 'Unit Conversion', value: 'km/h Ãƒâ€” 5/18 = m/s  |  m/s Ãƒâ€” 18/5 = km/h' },
      { label: 'Relative Speed', value: 'Opposite directions: Add | Same direction: Subtract' },
    ],
    formulas: [
      { title: 'Core Formula', formula: 'Distance = Speed Ãƒâ€” Time', example: '60 km/h for 2 hrs = 120 km' },
      { title: 'Average Speed (equal distances)', formula: '2ab / (a + b)', example: 'Go at 40, return at 60 Ã¢â€ â€™ Avg = 2Ãƒâ€”40Ãƒâ€”60/100 = 48 km/h' },
      { title: 'Train crossing pole', formula: 'Time = Length of train / Speed', example: '200m train at 72 km/h (=20 m/s) Ã¢â€ â€™ 200/20 = 10 sec' },
    ],
    identify: [
      '"Train A crosses train B" Ã¢â€ â€™ Relative speed problem',
      '"Goes from A to B and returns" Ã¢â€ â€™ Average speed formula',
      '"Train crosses a platform of length X" Ã¢â€ â€™ Total distance = Train + Platform',
    ],
    approach: [
      { step: '1', tip: 'ALWAYS check units first Ã¢â‚¬â€ if speed is km/h and time is seconds, convert before substituting.' },
      { step: '2', tip: 'Average speed trick: Never add two speeds and divide unless time is equal.' },
      { step: '3', tip: 'Train + platform: distance = length of train + length of platform.' },
    ],
  },

  'probability': {
    title: 'Probability',
    icon: 'Ã°Å¸Å½Â²',
    color: '#6366f1',
    tagline: 'Favourable outcomes out of total outcomes.',
    description: `Probability measures the likelihood of an event. In campus aptitude, probability questions involve coins, dice, cards, and balls in a bag. The key is correctly counting the total outcomes and the favourable outcomes.`,
    keyFacts: [
      { label: 'Range', value: 'P(event) is always between 0 and 1' },
      { label: 'Certain Event', value: 'P = 1  |  Impossible Event: P = 0' },
      { label: 'Complement', value: "P(A') = 1 Ã¢Ë†â€™ P(A)" },
      { label: 'Standard deck', value: '52 cards: 4 suits Ãƒâ€” 13 cards each' },
    ],
    formulas: [
      { title: 'Basic', formula: 'P(E) = Favourable outcomes / Total outcomes', example: 'P(Head in coin toss) = 1/2' },
      { title: 'P(A or B)', formula: 'P(A) + P(B) Ã¢Ë†â€™ P(A and B)', example: '' },
      { title: 'P(A and B) Ã¢â‚¬â€ Independent', formula: 'P(A) Ãƒâ€” P(B)', example: 'P(2 heads in 2 tosses) = 1/2 Ãƒâ€” 1/2 = 1/4' },
    ],
    identify: [
      '"A card is drawn at random from a deck" Ã¢â€ â€™ Probability question',
      '"Two dice are rolled, find P(sum=7)"',
      '"Bag has X red, Y blue balls, find P(drawing red)"',
    ],
    approach: [
      { step: '1', tip: 'List total outcomes clearly Ã¢â‚¬â€ dice: 36, coin 2 tosses: 4, etc.' },
      { step: '2', tip: 'Count favourable outcomes carefully Ã¢â‚¬â€ draw a table for dice problems.' },
      { step: '3', tip: 'For "at least one" questions: use P(at least 1) = 1 Ã¢Ë†â€™ P(none).' },
    ],
  },

  'syllogism': {
    title: 'Syllogism',
    icon: 'Ã°Å¸Â§Â©',
    color: '#ec4899',
    tagline: 'Use Venn diagrams Ã¢â‚¬â€ never guess from words.',
    description: `Syllogism is a deductive reasoning topic where you are given statements and must identify which conclusions logically follow. The trick is to always draw Venn diagrams and NOT be misled by your real-world knowledge Ã¢â‚¬â€ only what the statements say counts.`,
    keyFacts: [
      { label: 'All A are B', value: 'Circle A is fully inside circle B' },
      { label: 'No A is B', value: 'Circles A and B do not overlap at all' },
      { label: 'Some A are B', value: 'Circles partially overlap' },
      { label: 'Some A are not B', value: 'Part of A is outside B' },
    ],
    formulas: [
      { title: 'All + All = All', formula: '"All A are B" + "All B are C" Ã¢â€ â€™ All A are C Ã¢Å“â€œ', example: '' },
      { title: 'All + No = No', formula: '"All A are B" + "No B is C" Ã¢â€ â€™ No A is C Ã¢Å“â€œ', example: '' },
      { title: 'Some + All = Some', formula: '"Some A are B" + "All B are C" Ã¢â€ â€™ Some A are C Ã¢Å“â€œ', example: '' },
    ],
    identify: [
      'Question gives 2Ã¢â‚¬â€œ3 "All/No/Some" statements and asks which conclusions follow',
      'Options say "Both I and II follow" or "Neither follows" etc.',
    ],
    approach: [
      { step: '1', tip: 'Draw Venn diagrams Ã¢â‚¬â€ do not rely on logic in your head.' },
      { step: '2', tip: 'Check if each conclusion is DEFINITELY true (not possibly true).' },
      { step: '3', tip: '"Some A are not B" does NOT mean "No A is B".' },
      { step: '4', tip: 'Complementary pairs: if one of "Some A are B" and "No A is B" is a conclusion, answer is "either I or II follows".' },
    ],
  },

  'coding-decoding': {
    title: 'Coding-Decoding',
    icon: 'Ã°Å¸â€Â',
    color: '#ec4899',
    tagline: 'Find the pattern Ã¢â‚¬â€ it is always consistent.',
    description: `Coding-Decoding tests your ability to find the rule by which one word or number is converted into a code. The rule is always consistent Ã¢â‚¬â€ find it with one example and apply it to the rest.`,
    keyFacts: [
      { label: 'Letter Position', value: 'A=1, B=2, C=3 ... Z=26. Also reverse: A=26, Z=1.' },
      { label: 'Opposite Letter', value: 'AÃ¢â€ â€Z, BÃ¢â€ â€Y, CÃ¢â€ â€X ... (A+Z=27)' },
    ],
    formulas: [],
    identify: [
      '"If CAT is coded as ECV, how is DOG coded?"',
      '"In a certain code language, 123 means Red Light Green, what does 2 mean?"',
    ],
    approach: [
      { step: '1', tip: 'For letter codes: find the shift. Is each letter shifted by +2? Ã¢Ë†â€™1? Reversed?' },
      { step: '2', tip: 'For number codes: map each number to a word, then identify which number = which word by finding the common element.' },
      { step: '3', tip: 'Always check: is the pattern applied to positions (1st, 2nd letter) or values (A=1)?' },
    ],
  },

  'blood-relations': {
    title: 'Blood Relations',
    icon: 'Ã°Å¸â€˜Â¨Ã¢â‚¬ÂÃ°Å¸â€˜Â©Ã¢â‚¬ÂÃ°Å¸â€˜Â§',
    color: '#ec4899',
    tagline: 'Draw the family tree Ã¢â‚¬â€ always.',
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
      { step: '3', tip: 'Be careful about gender Ã¢â‚¬â€ "sister\'s husband" is not the same as "husband\'s sister".' },
    ],
  },

  'reading-comprehension': {
    title: 'Reading Comprehension',
    icon: 'Ã°Å¸â€œâ€“',
    color: '#10b981',
    tagline: 'The answer is always in the passage Ã¢â‚¬â€ trust it.',
    description: `Reading Comprehension (RC) tests your ability to read a passage quickly and answer questions accurately. The key principle: NEVER answer from your personal knowledge. The answer is always found within the passage itself.`,
    keyFacts: [
      { label: 'Types of Questions', value: 'Main idea, Detail, Inference, Tone, Vocabulary-in-context' },
    ],
    formulas: [],
    identify: [
      'A passage (200Ã¢â‚¬â€œ500 words) followed by 4Ã¢â‚¬â€œ6 questions',
      'Questions like "What is the main idea?", "The author\'s tone is?", "What can be inferred?"',
    ],
    approach: [
      { step: '1', tip: 'Read the questions FIRST, then skim the passage for those answers.' },
      { step: '2', tip: 'For "main idea" Ã¢â‚¬â€ it is always stated in the first or last paragraph.' },
      { step: '3', tip: 'For "tone" Ã¢â‚¬â€ look for emotion words in the passage (critical, optimistic, neutral, etc.).' },
      { step: '4', tip: 'Eliminate options that are too extreme ("always", "never") or too narrow (only one detail).' },
    ],
  },

  'para-jumbles': {
    title: 'Para Jumbles',
    icon: 'Ã°Å¸â€â‚¬',
    color: '#10b981',
    tagline: 'Find the opening sentence and the mandatory pairs.',
    description: `Para Jumbles give you 4Ã¢â‚¬â€œ6 sentences in a scrambled order and ask you to arrange them into a coherent paragraph. The strategy is systematic Ã¢â‚¬â€ find the first sentence, find pairs that must go together, and the order will emerge.`,
    keyFacts: [
      { label: 'Opening Sentence', value: 'Introduces a new idea or topic Ã¢â‚¬â€ no pronouns or connector words like "however", "but", "also"' },
      { label: 'Closing Sentence', value: 'Contains a conclusion, result, or summary word like "thus", "therefore", "finally"' },
    ],
    formulas: [],
    identify: [
      '4Ã¢â‚¬â€œ6 numbered/lettered sentences asked to be arranged in correct order',
      'Options like BDAC, CABD, etc.',
    ],
    approach: [
      { step: '1', tip: 'Eliminate sentences with pronouns (he, she, it, they) from being the opener Ã¢â‚¬â€ they refer to something already introduced.' },
      { step: '2', tip: 'Find "mandatory pairs" Ã¢â‚¬â€ a sentence that introduces a concept followed by one that expands on it.' },
      { step: '3', tip: 'Transition words tell you order: "However/But" = contrast. "Also/Moreover" = addition. "Therefore" = conclusion.' },
      { step: '4', tip: 'Use elimination from options Ã¢â‚¬â€ once you fix the first sentence, half the options are ruled out.' },
    ],
  },

  'error-spotting': {
    title: 'Error Spotting',
    icon: 'Ã¢Å“ÂÃ¯Â¸Â',
    color: '#10b981',
    tagline: 'Focus on subject-verb agreement and tense consistency.',
    description: `Error Spotting questions give you a sentence divided into parts (A, B, C, D) and ask you to identify which part has a grammatical error. The errors almost always fall into a predictable set of patterns.`,
    keyFacts: [
      { label: 'Most common errors', value: 'Subject-Verb agreement, Wrong tense, Wrong preposition, Article misuse, Redundancy' },
    ],
    formulas: [],
    identify: [
      'A sentence split into 3Ã¢â‚¬â€œ4 underlined parts, asked "which has an error?"',
    ],
    approach: [
      { step: '1', tip: 'Always check Subject-Verb agreement first Ã¢â‚¬â€ singular subject needs singular verb.' },
      { step: '2', tip: 'Check tense consistency Ã¢â‚¬â€ if sentence starts in past, it should stay in past.' },
      { step: '3', tip: 'Watch out for: "each/every/either/neither" Ã¢â‚¬â€ these are always SINGULAR.' },
      { step: '4', tip: 'Common preposition traps: "Discuss about" (wrong Ã¢â‚¬â€ just "discuss"), "Married to" (right), "Accused of" (right).' },
    ],
  },


  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
  //  AUTO-GENERATED TOPICS
  // Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â

  'prime-factorization': {
    title: 'Prime Factorization',
    icon: 'Ã°Å¸Å’Â³',
    color: '#6366f1',
    tagline: 'Master the concepts of Prime Factorization.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Prime Factorization. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€Â¢',
    color: '#6366f1',
    tagline: 'Master the concepts of Number of Factors.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Number of Factors. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€â€ž',
    color: '#6366f1',
    tagline: 'Master the concepts of Unit Digits & Cyclicity.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Unit Digits & Cyclicity. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã¢Å¾â€”',
    color: '#6366f1',
    tagline: 'Master the concepts of Decimal Fractions.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Decimal Fractions. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã¢Å“â€šÃ¯Â¸Â',
    color: '#6366f1',
    tagline: 'Master the concepts of Simplification.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Simplification. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã£â‚¬Â°Ã¯Â¸Â',
    color: '#6366f1',
    tagline: 'Master the concepts of Approximation.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Approximation. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: '0Ã¯Â¸ÂÃ¢Æ’Â£',
    color: '#6366f1',
    tagline: 'Master the concepts of Trailing Zeros.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Trailing Zeros. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã¢Å¡â€“Ã¯Â¸Â',
    color: '#6366f1',
    tagline: 'Master the concepts of Ratio & Proportion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Ratio & Proportion. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã¢Å¡â€“Ã¯Â¸Â',
    color: '#6366f1',
    tagline: 'Balance everything out evenly.',
    description: 'An average is just a way to share things equally. If 5 people have different amounts of money, the average is how much each person gets if they pool all their money together and split it evenly.',
    keyFacts: [
      { label: 'Core Rule', value: 'Average = Sum of everything / Number of things' },
      { label: 'Shortcut', value: 'If the numbers go up by a fixed amount (like 2, 4, 6), the average is exactly the middle number.' },
    ],
    formulas: [
      { title: 'The Main Formula', formula: 'Average = Total Sum ÃƒÂ· Total Count', example: 'Average of 10, 20, 30 = (10+20+30) ÃƒÂ· 3 = 20' },
      { title: 'Finding Total', formula: 'Total Sum = Average Ãƒâ€” Count', example: 'If average of 4 kids is 10 years, total age = 4 Ãƒâ€” 10 = 40 years' },
    ],
    identify: [
      'Questions asking "What is the new average?"',
      'Questions where a new person joins a group or someone leaves.',
    ],
    approach: [
      { step: '1', tip: 'Always find the Total Sum first. Do not try to add or subtract averages directly.' },
      { step: '2', tip: 'If a person joins: New Total = Old Total + New Person. Then divide by the new count.' },
      { step: '3', tip: 'Use common sense: if a heavy person joins, the average goes up!' },
    ],
  },

  'simple-interest': {
    title: 'Simple Interest',
    icon: 'Ã°Å¸â€™Â¸',
    color: '#10b981',
    tagline: 'Interest is calculated only on the original money.',
    description: 'Simple interest is the easiest way to calculate extra money you owe or earn. The interest is ALWAYS calculated on the original amount you started with (the Principal), year after year.',
    keyFacts: [
      { label: 'Principal (P)', value: 'The original money borrowed or invested.' },
      { label: 'Rate (R)', value: 'The percentage of interest per year.' },
    ],
    formulas: [
      { title: 'Simple Interest Formula', formula: 'SI = (P Ãƒâ€” R Ãƒâ€” T) ÃƒÂ· 100', example: '1000 borrowed at 10% for 2 years = (1000 Ãƒâ€” 10 Ãƒâ€” 2) ÃƒÂ· 100 = 200' },
      { title: 'Total Amount', formula: 'Amount = Principal + Simple Interest', example: 'Total to pay back = 1000 + 200 = 1200' },
    ],
    identify: [
      'Questions asking for the total amount after a certain time at a flat rate.',
      'Questions mentioning "simple interest" explicitly.',
    ],
    approach: [
      { step: '1', tip: 'Write down P, R, and T from the question.' },
      { step: '2', tip: 'If T is given in months, divide by 12 to convert it to years!' },
      { step: '3', tip: 'Plug into the SI formula and calculate carefully.' },
    ],
  },

  'compound-interest': {
    title: 'Compound Interest',
    icon: 'Ã°Å¸â€œË†',
    color: '#6366f1',
    tagline: 'Master the concepts of Compound Interest.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Compound Interest. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã¢ÂÂ³',
    color: '#f59e0b',
    tagline: 'The difference in age never changes.',
    description: 'Problems on ages are just simple linear equations. The biggest secret to solving them is realizing that the age gap between two people is always exactly the same, no matter how many years pass!',
    keyFacts: [
      { label: 'Time Travel', value: 'If current age is x: Age 5 years ago = x - 5. Age in 5 years = x + 5.' },
      { label: 'The Golden Rule', value: 'The difference between the ages of two people never changes over time.' },
    ],
    formulas: [
      { title: 'Ratio Trick', formula: 'Use the cross-multiplication method for age ratios.', example: 'If ratio is 2:3 now, ages are 2x and 3x.' },
    ],
    identify: [
      'Questions comparing the ages of father and son.',
      'Questions giving age ratios from 5 years ago and 5 years in the future.',
    ],
    approach: [
      { step: '1', tip: 'Assume the CURRENT age of the main person is "x".' },
      { step: '2', tip: 'Write down their ages for the past or future as equations (e.g., x-5 or x+5).' },
      { step: '3', tip: 'Set up the equation based on the question\'s condition and solve for x.' },
    ],
  },

  'alligation-mixtures': {
    title: 'Alligation & Mixtures',
    icon: 'Ã°Å¸Â§Âª',
    color: '#6366f1',
    tagline: 'Master the concepts of Alligation & Mixtures.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Alligation & Mixtures. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Å¡Â°',
    color: '#6366f1',
    tagline: 'Master the concepts of Pipes & Cisterns.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Pipes & Cisterns. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Å¡â€ž',
    color: '#10b981',
    tagline: 'The length of the train is the secret.',
    description: 'Train problems are just simple Speed & Distance problems with one twist: trains are very long! When a train crosses a pole, it travels its own length. When it crosses a bridge, it travels its own length PLUS the bridge.',
    keyFacts: [
      { label: 'Crossing a Point', value: 'When crossing a pole or standing man, Distance = Length of Train.' },
      { label: 'Crossing an Object', value: 'When crossing a bridge or platform, Distance = Train + Bridge.' },
    ],
    formulas: [
      { title: 'The Golden Rule', formula: 'Distance = Speed Ãƒâ€” Time', example: '' },
      { title: 'Unit Conversion', formula: 'Multiply km/hr by (5/18) to get m/s', example: '54 km/hr = 54 Ãƒâ€” (5/18) = 15 m/s' },
    ],
    identify: [
      'Questions mentioning "train crosses a bridge in 10 seconds".',
      'Questions asking for the length of the train.',
    ],
    approach: [
      { step: '1', tip: 'Check the units! Usually speed is km/hr but time is seconds. Convert speed to m/s immediately.' },
      { step: '2', tip: 'Write down the total Distance. If there is a bridge, add both lengths.' },
      { step: '3', tip: 'Plug into Distance = Speed Ãƒâ€” Time and solve.' },
    ],
  },

  'boats-streams': {
    title: 'Boats & Streams',
    icon: 'Ã°Å¸â€ºÂ¶',
    color: '#6366f1',
    tagline: 'Master the concepts of Boats & Streams.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Boats & Streams. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œâ€¹',
    color: '#6366f1',
    tagline: 'Master the concepts of Tables.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Tables. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œÅ ',
    color: '#6366f1',
    tagline: 'Master the concepts of Bar Charts.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Bar Charts. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â¥Â§',
    color: '#6366f1',
    tagline: 'Master the concepts of Pie Charts.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Pie Charts. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œâ€°',
    color: '#6366f1',
    tagline: 'Master the concepts of Line Graphs.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Line Graphs. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€”â€šÃ¯Â¸Â',
    color: '#6366f1',
    tagline: 'Master the concepts of Mixed DI Sets.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Mixed DI Sets. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€â‚¬',
    color: '#6366f1',
    tagline: 'Master the concepts of Permutation & Combination.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Permutation & Combination. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸ÂªÂµ',
    color: '#6366f1',
    tagline: 'Master the concepts of Logarithm.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Logarithm. Understanding this topic is crucial for maximizing your score in the Quantitative Aptitude section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Number Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Number Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Letter Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Letter Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Alphanumeric Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Alphanumeric Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Direction Sense.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Direction Sense. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Ranking & Ordering.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Ranking & Ordering. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Statement & Conclusion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Statement & Conclusion. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Statement & Assumption.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Statement & Assumption. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Linear Arrangement.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Linear Arrangement. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Circular Arrangement.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Circular Arrangement. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Floor Puzzles.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Floor Puzzles. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Box Puzzles.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Box Puzzles. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Pattern Completion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Pattern Completion. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Figure Series.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Figure Series. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Mirror Images.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Mirror Images. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Water Images.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Water Images. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸Â§Â ',
    color: '#ec4899',
    tagline: 'Master the concepts of Odd Figure Out.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Odd Figure Out. Understanding this topic is crucial for maximizing your score in the Logical Reasoning section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œâ€“',
    color: '#10b981',
    tagline: 'Master the concepts of Sentence Correction.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Sentence Correction. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œâ€“',
    color: '#10b981',
    tagline: 'Master the concepts of Fill in the Blanks.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Fill in the Blanks. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œâ€“',
    color: '#10b981',
    tagline: 'Master the concepts of Sentence Completion.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Sentence Completion. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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
    icon: 'Ã°Å¸â€œâ€“',
    color: '#10b981',
    tagline: 'Master the concepts of Cloze Test.',
    description: `This section covers the core concepts, common question patterns, and fast-solving techniques for Cloze Test. Understanding this topic is crucial for maximizing your score in the Verbal Ability section.`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) Ãƒâ€” Concept', example: 'Apply the formula directly to the given numbers.' },
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

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  //  GOVERNMENT EXAMS â€” EXCLUSIVE TOPICS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  
  'geometry': {
    title: 'Geometry',
    icon: 'ðŸ“',
    color: '#3b82f6',
    tagline: 'Lines, angles, triangles, and circles.',
    description: `Geometry deals with the properties and relations of points, lines, surfaces, and solids. In government exams, questions heavily focus on triangle properties, circle tangents, and angle chasing.`,
    keyFacts: [
      { label: 'Triangle Sum', value: 'Sum of internal angles is always 180Â°' },
      { label: 'Straight Line', value: 'A straight line measures 180Â°' },
    ],
    formulas: [
      { title: 'Pythagoras Theorem', formula: 'aÂ² + bÂ² = cÂ²', example: '3Â² + 4Â² = 5Â²' },
    ],
    identify: [
      'Question mentions angles, triangles, circles, or parallel lines.',
    ],
    approach: [
      { step: '1', tip: 'Always draw a rough diagram.' },
      { step: '2', tip: 'Look for Z, F, and C shapes in parallel lines.' },
    ],
  },
  
  'mensuration': {
    title: 'Mensuration',
    icon: 'ðŸ§Š',
    color: '#3b82f6',
    tagline: 'Areas, Volumes, and Surface Areas.',
    description: `Mensuration is the branch of mathematics that deals with the measurement of length, area, or volume of various geometric shapes.`,
    keyFacts: [
      { label: '2D Shapes', value: 'Square, Rectangle, Circle, Triangle (measured in Area)' },
      { label: '3D Shapes', value: 'Cube, Cylinder, Cone, Sphere (measured in Volume)' },
    ],
    formulas: [
      { title: 'Area of Circle', formula: 'Ï€rÂ²', example: 'r=7 â†’ Area â‰ˆ 154' },
      { title: 'Volume of Cylinder', formula: 'Ï€rÂ²h', example: 'r=7, h=10 â†’ Vol â‰ˆ 1540' },
    ],
    identify: [
      'Keywords like area, volume, perimeter, surface area, melting and recasting.',
    ],
    approach: [
      { step: '1', tip: 'Ensure all units (cm, m) are the same before calculating.' },
      { step: '2', tip: 'When one 3D object is melted into another, their Volumes remain equal.' },
    ],
  },
  
  'algebra': {
    title: 'Algebra',
    icon: 'ðŸ§®',
    color: '#3b82f6',
    tagline: 'Equations, Polynomials, and Identities.',
    description: `Algebra involves solving for unknown variables using mathematical identities. SSC exams heavily feature x + 1/x type questions.`,
    keyFacts: [
      { label: 'Variables', value: 'Unknown values usually represented by x, y, z' },
    ],
    formulas: [
      { title: 'Basic Identity', formula: '(a+b)Â² = aÂ² + bÂ² + 2ab', example: '(x+1)Â² = xÂ² + 1 + 2x' },
    ],
    identify: [
      'Equations with x, y, or asks for the value of xÂ² + 1/xÂ².',
    ],
    approach: [
      { step: '1', tip: 'Try value putting (e.g., let x=1 or x=0) if it satisfies the condition.' },
    ],
  },

  'general-intelligence': {
    title: 'General Intelligence',
    icon: 'ðŸ§©',
    color: '#f59e0b',
    tagline: 'Visual patterns and logic puzzles.',
    description: `General intelligence tests your ability to spot visual and logical patterns quickly. It includes matrix puzzles, number analogies, and missing characters.`,
    keyFacts: [
      { label: 'Analogies', value: 'A is to B as C is to D' },
    ],
    formulas: [],
    identify: [
      'Matrix of numbers with one missing (?), or visual sequences.',
    ],
    approach: [
      { step: '1', tip: 'Check row-wise and column-wise differences or sums.' },
      { step: '2', tip: 'Look for squares and cubes of numbers.' },
    ],
  },
  
  'data-sufficiency': {
    title: 'Data Sufficiency',
    icon: '⚖️',
    color: '#3b82f6',
    tagline: 'Do you have enough information to solve?',
    description: `Data sufficiency questions don't ask you to solve the problem. They ask you to determine if the provided statements contain enough data to find the answer.`,
    keyFacts: [
      { label: 'Statement 1 Alone', value: 'Check if statement 1 gives a unique answer.' },
      { label: 'Statement 2 Alone', value: 'Check if statement 2 gives a unique answer.' },
    ],
    formulas: [
      { title: 'The Golden Rule', formula: 'Never calculate the final answer.', example: 'Just establish if it is POSSIBLE to calculate.' },
    ],
    identify: [
      'Options look like: "Statement 1 alone is sufficient", "Both are required".',
    ],
    approach: [
      { step: '1', tip: 'Evaluate Statement 1 completely ignoring Statement 2.' },
      { step: '2', tip: 'Evaluate Statement 2 completely ignoring Statement 1.' },
      { step: '3', tip: 'Only if both fail individually, combine them.' },
    ],
  },
  
  'error-detection': {
    title: 'Error Detection',
    icon: '🔍',
    color: '#10b981',
    tagline: 'Spot the grammatical mistake.',
    description: `A sentence is divided into 4 or 5 parts. You have to identify which part contains a grammatical error based on rules of tenses, subject-verb agreement, prepositions, or articles.`,
    keyFacts: [
      { label: 'SVA Rule', value: 'Singular subject takes singular verb, plural takes plural.' },
    ],
    formulas: [
      { title: 'Neither/Nor Rule', formula: 'Verb agrees with the nearest subject.', example: 'Neither the teacher nor the students ARE present.' },
    ],
    identify: [
      'Sentence is split with slashes ( / ) like: He goes (A) / to school (B) / everyday (C).',
    ],
    approach: [
      { step: '1', tip: 'Read the sentence as a whole to catch obvious flow errors.' },
      { step: '2', tip: 'Check Subject-Verb Agreement first, then Tense consistency.' },
    ],
  },

  'sentence-improvement': {
    title: 'Sentence Improvement',
    icon: '✨',
    color: '#10b981',
    tagline: 'Upgrade the highlighted phrase.',
    description: `A part of the sentence is bold or underlined. You must choose the option that grammatically improves the sentence, or choose 'No Improvement' if it is already correct.`,
    keyFacts: [
      { label: 'Phrasal Verbs', value: 'Often tested (e.g., look forward TO, not look forward FOR)' },
    ],
    formulas: [
      { title: 'Conditional Clause', formula: 'If + Past Perfect -> would have + V3', example: 'If I had seen him, I would have stopped him.' },
    ],
    identify: [
      'A sentence with a bold/underlined phrase and options to replace it.',
    ],
    approach: [
      { step: '1', tip: 'Identify why the current phrase might be wrong (tense, preposition).' },
      { step: '2', tip: 'Eliminate options that introduce new errors.' },
    ],
  },

  'fillers': {
    title: 'Fillers',
    icon: '📝',
    color: '#10b981',
    tagline: 'Fill in the blanks with the exact word.',
    description: `You are given a sentence with one or two blanks. You need to choose the most appropriate word(s) from the options that fit both grammatically and contextually.`,
    keyFacts: [
      { label: 'Tone', value: 'Is the sentence positive, negative, or neutral?' },
    ],
    formulas: [
      { title: 'Conjunction Clues', formula: 'Although/But = Contrast. And/Moreover = Similarity.', example: 'Although he is rich, he is ___ (look for negative word like miserly).' },
    ],
    identify: [
      'Sentence containing _______ blanks.',
    ],
    approach: [
      { step: '1', tip: 'Try to guess the word before looking at the options.' },
      { step: '2', tip: 'Use elimination based on grammar (e.g., blank needs a noun, option is a verb).' },
    ],
  },

  'active-passive-voice': {
    title: 'Active & Passive Voice',
    icon: '🔄',
    color: '#10b981',
    tagline: 'Flip the subject and object.',
    description: `Transform sentences from Active (Subject does action) to Passive (Action is done to Subject) without changing the tense or meaning. High scoring topic in SSC exams.`,
    keyFacts: [
      { label: 'Active', value: 'The cat (subject) ate (verb) the mouse (object).' },
      { label: 'Passive', value: 'The mouse (object) was eaten (verb) by the cat (subject).' },
    ],
    formulas: [
      { title: 'Present Continuous', formula: 'is/am/are + being + V3', example: 'He is writing a letter -> A letter is being written by him.' },
      { title: 'Past Perfect', formula: 'had + been + V3', example: 'She had finished work -> Work had been finished by her.' },
    ],
    identify: [
      'Question asks to select the correct passive/active form of the given sentence.',
    ],
    approach: [
      { step: '1', tip: 'Identify the Tense. The tense NEVER changes in Voice conversion.' },
      { step: '2', tip: 'Identify Subject, Verb, and Object, and swap S and O.' },
    ],
  },

  'direct-indirect-speech': {
    title: 'Direct & Indirect Speech',
    icon: '🗣️',
    color: '#10b981',
    tagline: 'Reporting what someone said.',
    description: `Converting direct quotes ("I am happy") into reported speech (He said that he was happy). Unlike Voice, the Tense DOES change in Narration.`,
    keyFacts: [
      { label: 'Tense Change', value: 'Present shifts to Past (if reporting verb is past).' },
      { label: 'Pronoun Change', value: 'I -> He/She, My -> His/Her based on speaker.' },
    ],
    formulas: [
      { title: 'Time Words', formula: 'Now -> Then, Today -> That day', example: 'Tomorrow -> The next day' },
    ],
    identify: [
      'Quotes "" are present, or question explicitly asks for reported speech.',
    ],
    approach: [
      { step: '1', tip: 'Check the reporting verb (said vs says). If "says", tense inside quotes does not change.' },
      { step: '2', tip: 'Eliminate options that fail to change "today" to "that day" or "this" to "that".' },
    ],
  },

  'cloze-test': {
    title: 'Cloze Test',
    icon: '🧩',
    color: '#10b981',
    tagline: 'A paragraph with multiple missing words.',
    description: `A passage is given with 5 to 10 blanks. You must fill in the blanks using the options provided. It tests reading comprehension, vocabulary, and grammar simultaneously.`,
    keyFacts: [
      { label: 'Context is King', value: 'The answer to blank #1 might be hidden in sentence #3.' },
    ],
    formulas: [
      { title: 'Forward Reading', formula: 'Always read past the blank.', example: 'He was ___ because he won. (Blank needs a happy word)' },
    ],
    identify: [
      'A paragraph with numbered blanks (1), (2), (3).',
    ],
    approach: [
      { step: '1', tip: 'Read the entire paragraph quickly WITHOUT looking at options to understand the theme.' },
      { step: '2', tip: 'Look at prepositional clues (e.g., if blank is followed by "of", find a word that pairs with "of").' },
    ],
  },

  'word-swap': {
    title: 'Word Swap',
    icon: '🔀',
    color: '#10b981',
    tagline: 'Exchange highlighted words to make sense.',
    description: `In a sentence, 3 or 4 words are highlighted. They might be in the wrong positions. You have to identify which pair of words needs to be swapped to make the sentence grammatically and contextually correct.`,
    keyFacts: [
      { label: 'Parts of Speech', value: 'A noun usually swaps with a noun, a verb with a verb.' },
    ],
    formulas: [
      { title: 'Elimination', formula: 'If A is correct where it is, eliminate options with A.', example: 'Options: A-B, A-C, B-C. If A is correct, answer is B-C.' },
    ],
    identify: [
      'Sentence with bold words labeled A, B, C, D and options like A-C, B-D.',
    ],
    approach: [
      { step: '1', tip: 'Find one word that is clearly out of place grammatically.' },
      { step: '2', tip: 'Look at the other bold words to find its rightful home.' },
    ],
  },

  'one-word-substitution': {
    title: 'One Word Substitution',
    icon: '🎯',
    color: '#10b981',
    tagline: 'Replace a phrase with a single exact word.',
    description: `A test of pure vocabulary. You are given a descriptive phrase and must choose the single English word that means exactly that. Common in SSC CGL.`,
    keyFacts: [
      { label: 'Root Words', value: 'Learn prefixes/suffixes (e.g., -cide means kill, -logy means study).' },
    ],
    formulas: [
      { title: 'Phobias', formula: 'Fear of X', example: 'Hydrophobia = Fear of water, Claustrophobia = Fear of closed spaces.' },
    ],
    identify: [
      'Question: "A person who loves mankind" -> Option: Philanthropist.',
    ],
    approach: [
      { step: '1', tip: 'Use root word analysis if you don\'t know the exact word.' },
      { step: '2', tip: 'Eliminate familiar words that you know mean something else.' },
    ],
  },

  'phrase-replacement': {
    title: 'Phrase Replacement',
    icon: '🛠️',
    color: '#10b981',
    tagline: 'Fix the idiomatic or grammatical phrase.',
    description: `Similar to sentence improvement, but heavily focused on Idioms, Phrases, and Phrasal verbs. You must replace a highlighted phrase with the correct standard usage.`,
    keyFacts: [
      { label: 'Idioms', value: 'Phrases whose meaning cannot be deduced literally (e.g., "piece of cake").' },
    ],
    formulas: [
      { title: 'Fixed Prepositions', formula: 'Certain verbs take fixed prepositions.', example: 'Accused OF (not for), Congratulate ON (not for).' },
    ],
    identify: [
      'Highlighted idiom or phrasal verb that feels "off".',
    ],
    approach: [
      { step: '1', tip: 'Do not translate idioms word-for-word into your native language.' },
      { step: '2', tip: 'If it sounds like a literal action but the context is abstract, it\'s an idiom.' },
    ],
  },

  // ════════════════════════════════════════
  //  ROADMAP EXCLUSIVE TOPICS (PHASES 2-9)
  // ════════════════════════════════════════
  
  'partnership': {
    title: 'Partnership', icon: '🤝', color: '#3b82f6', tagline: 'Dividing profits among partners.',
    description: `Partnership involves two or more individuals investing money in a business. Profits are divided based on the investment amount and the time duration of the investment.`,
    keyFacts: [{ label: 'Profit Ratio', value: 'Profit is directly proportional to Investment × Time.' }],
    formulas: [{ title: 'Profit Share', formula: 'P1 : P2 = (I1 × T1) : (I2 × T2)', example: 'If A invests 100 for 12m and B 200 for 6m, Ratio = 1200:1200 = 1:1.' }],
    identify: ['Keywords like investment, profit share, joined later, active partner.'],
    approach: [{ step: '1', tip: 'Always bring investments to a common time frame (usually months).' }]
  },

  'race-problems': {
    title: 'Race Problems', icon: '🏁', color: '#6366f1', tagline: 'Head starts and beating times.',
    description: `Race problems are an extension of Time, Speed, and Distance. They involve terms like 'A gives B a head start of 10m' or 'A beats B by 5 seconds'.`,
    keyFacts: [{ label: 'Head Start in Distance', value: 'If A gives B 10m start in 100m, A runs 100m while B runs 90m in the SAME time.' }],
    formulas: [{ title: 'Dead Heat', formula: 'Both runners reach the finish line at the exact same time.', example: '' }],
    identify: ['Mentions of circular tracks, head starts, or beating by distance/time.'],
    approach: [{ step: '1', tip: 'Identify what is constant: Time (head start in distance) or Distance (head start in time).' }]
  },

  'analogies': {
    title: 'Analogies', icon: '🔗', color: '#f43f5e', tagline: 'Finding the logical relationship.',
    description: `Analogy means similarity. You are given a pair of words/numbers with a certain relationship, and you must find another pair with the exact same relationship.`,
    keyFacts: [{ label: 'Word Analogy', value: 'E.g., Doctor : Hospital :: Teacher : School' }],
    formulas: [{ title: 'Number Analogy', formula: 'Look for squares, cubes, prime numbers, or common differences.', example: '4 : 16 :: 5 : 25' }],
    identify: ['Questions formatted as A : B :: C : ?'],
    approach: [{ step: '1', tip: 'Define the relationship between A and B precisely before looking at options.' }]
  },

  'classification': {
    title: 'Classification', icon: '🗂️', color: '#f43f5e', tagline: 'Find the odd one out.',
    description: `Classification involves grouping items based on common properties and identifying the one item that does not fit into that group.`,
    keyFacts: [{ label: 'Odd Man Out', value: '3 out of 4 options will share a logical rule. Find the one that doesn\'t.' }],
    formulas: [],
    identify: ['"Find the odd word/letters/number from the given alternatives."'],
    approach: [{ step: '1', tip: 'For numbers, check prime status, squares, cubes, and divisibility.' }]
  },

  'missing-number': {
    title: 'Missing Number', icon: '❓', color: '#f43f5e', tagline: 'Crack the mathematical pattern.',
    description: `You are presented with a figure (matrix, circle, star) containing numbers governed by a specific mathematical rule. You must find the rule to identify the missing number.`,
    keyFacts: [{ label: 'Common Operations', value: 'Addition, subtraction, multiplication, squares, cubes, and their combinations.' }],
    formulas: [],
    identify: ['A visual grid or shape with numbers and a question mark (?).'],
    approach: [{ step: '1', tip: 'If numbers grow very fast, look for multiplication or squares/cubes.' }, { step: '2', tip: 'Check row-wise and column-wise logic.' }]
  },

  'cause-effect': {
    title: 'Cause & Effect', icon: '💥', color: '#f43f5e', tagline: 'Identify the trigger and the result.',
    description: `You are given two statements. You need to determine if one is the cause and the other is its effect, or if both are independent causes/effects.`,
    keyFacts: [{ label: 'Cause', value: 'The reason why something happened.' }, { label: 'Effect', value: 'The result or outcome of the cause.' }],
    formulas: [],
    identify: ['Options like: "Statement I is cause and II is effect".'],
    approach: [{ step: '1', tip: 'Chronology: The cause always happens before the effect.' }]
  },

  'course-of-action': {
    title: 'Course of Action', icon: '🛠️', color: '#f43f5e', tagline: 'Solving a presented problem.',
    description: `A problem or situation is described, followed by suggested courses of action. You must choose the action that practically and positively resolves the problem.`,
    keyFacts: [{ label: 'Practicality', value: 'The action must be realistic and implementable.' }],
    formulas: [],
    identify: ['Followed by "Courses of Action: I..., II...".'],
    approach: [{ step: '1', tip: 'Avoid extreme or harsh actions unless the situation is dire.' }]
  },

  'decision-making': {
    title: 'Decision Making', icon: '⚖️', color: '#f43f5e', tagline: 'Evaluating eligibility criteria.',
    description: `You are given a set of criteria for selection (e.g., job recruitment) and a candidate\\'s profile. You must decide if the candidate is selected, rejected, or referred to higher authority.`,
    keyFacts: [{ label: 'Strict adherence', value: 'Do not assume any information not explicitly stated about the candidate.' }],
    formulas: [],
    identify: ['Long paragraphs detailing age limits, educational marks, and experience.'],
    approach: [{ step: '1', tip: 'Create a quick checklist table on your scratchpad to tick off criteria.' }]
  },

  'paper-folding': {
    title: 'Paper Folding', icon: '📄', color: '#f59e0b', tagline: 'Visualizing transparency.',
    description: `A transparent sheet with a pattern is folded along a dotted line. You must visualize how the pattern will look after folding.`,
    keyFacts: [{ label: 'Mirror Image Principle', value: 'The folded half acts as a mirror image superimposed on the stationary half.' }],
    formulas: [],
    identify: ['Dotted lines on a square sheet with arrows indicating a fold.'],
    approach: [{ step: '1', tip: 'Mentally trace the reflection of the folded side over the dotted line.' }]
  },

  'paper-cutting': {
    title: 'Paper Cutting', icon: '✂️', color: '#f59e0b', tagline: 'Unfolding a punched paper.',
    description: `A piece of paper is folded multiple times and then cut/punched. You must predict the pattern when the paper is completely unfolded.`,
    keyFacts: [{ label: 'Reverse Symmetry', value: 'Unfold step-by-step in reverse order, applying mirror images at each fold line.' }],
    formulas: [],
    identify: ['Sequence of 3-4 figures showing folding, followed by a cut mark.'],
    approach: [{ step: '1', tip: 'The number of cuts usually multiplies by 2 with every unfold.' }]
  },

  'embedded-figures': {
    title: 'Embedded Figures', icon: '🧩', color: '#f59e0b', tagline: 'Find the hidden shape.',
    description: `You are given a simple target figure and 4 complex option figures. You must find which option has the target figure perfectly hidden inside it.`,
    keyFacts: [{ label: 'Proportions matter', value: 'The hidden figure must have the exact same proportions and orientation (unless rotation is allowed).' }],
    formulas: [],
    identify: ['Question asks "Find the figure in which the given figure is embedded".'],
    approach: [{ step: '1', tip: 'Look for the most distinct or unique angle/curve in the target figure and scan for it.' }]
  },

  'cube-dice': {
    title: 'Cube & Dice', icon: '🎲', color: '#f59e0b', tagline: 'Unfolding 3D boxes.',
    description: `Problems involving standard/ordinary dice, finding opposite faces from different views, or folding a flat 2D net into a 3D cube.`,
    keyFacts: [{ label: 'Standard Dice', value: 'Opposite faces always sum to 7 (1-6, 2-5, 3-4).' }, { label: 'Ordinary Dice', value: 'Adjacent faces can sum to 7.' }],
    formulas: [{ title: 'One Common Face Rule', formula: 'Write adjacent faces clockwise starting from the common face to find opposites.', example: '' }],
    identify: ['Images of dice or flattened cross shapes.'],
    approach: [{ step: '1', tip: 'In an open net, alternate squares in a straight line are always opposite to each other.' }]
  },

  'figure-counting': {
    title: 'Figure Counting', icon: '📐', color: '#f59e0b', tagline: 'Counting hidden triangles and squares.',
    description: `You must count the total number of specific shapes (usually triangles, squares, or rectangles) within a complex composite figure.`,
    keyFacts: [{ label: 'Formula driven', value: 'Many standard symmetrical figures have mathematical formulas for counting.' }],
    formulas: [{ title: 'Square with diagonals', formula: 'Number of small triangles × 2', example: 'A square with 4 small internal triangles = 4 × 2 = 8 total triangles.' }],
    identify: ['"How many triangles are there in the given figure?"'],
    approach: [{ step: '1', tip: 'Count the smallest shapes first, then combine two at a time, then three.' }]
  },

  'vedic-maths': {
    title: 'Vedic Maths', icon: '⚡', color: '#eab308', tagline: 'Ancient high-speed calculation.',
    description: `Vedic Mathematics is a collection of ancient techniques/sutras to solve arithmetic operations rapidly and mentally.`,
    keyFacts: [{ label: 'Base Method', value: 'Multiplying numbers close to powers of 10 (e.g., 98 × 97) becomes a 3-second mental sum.' }],
    formulas: [],
    identify: ['Any calculation-heavy problem in exams.'],
    approach: [{ step: '1', tip: 'Master the Base Method and the Criss-Cross multiplication method.' }]
  },

  'calculation-tricks': {
    title: 'Calculation Tricks', icon: '🧮', color: '#eab308', tagline: 'Never use long division again.',
    description: `Modern shortcuts for handling decimals, fractions, and large numbers without resorting to slow, traditional methods.`,
    keyFacts: [{ label: 'Digital Sum', value: 'The sum of digits of the question equals the sum of digits of the answer (for +, -, ×).' }],
    formulas: [],
    identify: ['Simplification and Data Interpretation questions.'],
    approach: [{ step: '1', tip: 'Use Digital Sum to eliminate options instantly in complex multiplications.' }]
  },

  'percentage-tricks': {
    title: 'Percentage Tricks', icon: '💯', color: '#eab308', tagline: 'Fractions to percentages instantly.',
    description: `Mastering the conversion table between fractions and percentages is the single most important skill for Data Interpretation.`,
    keyFacts: [{ label: 'Reciprocals', value: 'Memorize 1/2 up to 1/20 as percentages.' }],
    formulas: [{ title: 'Reverse Percentage', formula: 'x% of y = y% of x', example: '16% of 25 is hard. 25% of 16 is easy (1/4 of 16 = 4).' }],
    identify: ['Profit/Loss, SI/CI, and DI tables.'],
    approach: [{ step: '1', tip: 'Never calculate 16.66% by multiplying. Divide by 6 instead (since 1/6 = 16.66%).' }]
  },

  'square-tricks': {
    title: 'Square Tricks', icon: '⬛', color: '#eab308', tagline: 'Squaring 1 to 100 mentally.',
    description: `Techniques to instantly find the square of any two-digit number, especially numbers ending in 5 or near 50.`,
    keyFacts: [{ label: 'Ending in 5', value: '(n5)² = [n × (n+1)] appended with 25.' }],
    formulas: [{ title: 'Example', formula: '65²', example: '6 × 7 = 42. Append 25. Answer: 4225.' }],
    identify: ['Compound interest or mensuration area formulas.'],
    approach: [{ step: '1', tip: 'Memorize squares 1 to 30. Use base 50 trick for 31-70, and base 100 trick for 71-100.' }]
  },

  'cube-tricks': {
    title: 'Cube Tricks', icon: '🧊', color: '#eab308', tagline: 'Finding cubes and cube roots.',
    description: `Shortcuts to find perfect cube roots instantly by looking at the last digit, and methods to calculate cubes using ratio expansion.`,
    keyFacts: [{ label: 'Last Digit Rule', value: 'The last digit of a perfect cube corresponds uniquely to a single digit.' }],
    formulas: [{ title: 'Pairs', formula: '2<->8, 3<->7', example: 'If cube ends in 2, root ends in 8. (All other digits stay the same, e.g. ends in 4 -> root ends in 4).' }],
    identify: ['Mensuration volume formulas and Simplification.'],
    approach: [{ step: '1', tip: 'Ignore the last 3 digits to find the tens place of a cube root.' }]
  },

  'multiplication-tricks': {
    title: 'Multiplication Tricks', icon: '✖️', color: '#eab308', tagline: 'Mental multiplication hacks.',
    description: `Techniques like multiplying by 11, multiplying by 5, 25, 125, and line multiplication.`,
    keyFacts: [{ label: 'Multiply by 11', value: 'Write the outer digits, and insert the sum of adjacent digits in the middle.' }],
    formulas: [{ title: 'Example', formula: '45 × 11', example: '4 (4+5) 5 = 495' }],
    identify: ['Whenever you need to multiply large numbers in DI.'],
    approach: [{ step: '1', tip: 'To multiply by 25, just multiply by 100 and divide by 4.' }]
  },

  'division-tricks': {
    title: 'Division Tricks', icon: '➗', color: '#eab308', tagline: 'Divide without the long bracket.',
    description: `How to divide by 5, 25, 9, and how to use cancellation techniques efficiently.`,
    keyFacts: [{ label: 'Divide by 5', value: 'Multiply by 2 and divide by 10 (move decimal one spot left).' }],
    formulas: [{ title: 'Example', formula: '140 / 5', example: '140 × 2 = 280 -> 28.0' }],
    identify: ['Averages, Ratio, and DI.'],
    approach: [{ step: '1', tip: 'Always look for common factors (2, 3, 5, 11) to cancel before actually dividing.' }]
  },

  'approximation-techniques': {
    title: 'Approximation Techniques', icon: '🎯', color: '#eab308', tagline: 'Close enough is good enough.',
    description: `In many exams, options are far apart. Approximation allows you to round numbers aggressively to reach the correct option in a fraction of the time.`,
    keyFacts: [{ label: 'Balancing', value: 'If you round the numerator UP, round the denominator UP to keep the fraction balanced.' }],
    formulas: [],
    identify: ['Data Interpretation (especially Pie Charts) and Banking Simplification sections.'],
    approach: [{ step: '1', tip: 'Look at the distance between the options first. If they are far, approximate wildly.' }]
  }

};

// Helper to create a URL-safe slug from a topic name
export function topicToSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}


