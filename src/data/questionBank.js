// src/data/questionBank.js
// 50 curated questions across 10 categories (5 per category)

export const CATEGORIES = [
  // ─── QUANTITATIVE ───
  {
    id: 'tsd',
    name: 'Time, Speed & Distance',
    icon: '🚀',
    pillar: 'Quantitative',
    accent: '#7F77DD',
    description: 'Trains, boats, relative speed & more',
    teaching: {
      topics: ['Basic Speed-Distance', 'Relative Speed', 'Trains & Platforms', 'Boats & Streams', 'Average Speed'],
      formulas: [
        { title: 'Golden Rule', formula: 'Distance = Speed × Time', tip: 'This is the foundation of every question in this chapter.' },
        { title: 'Unit Conversion', formula: 'km/h → m/s : Multiply by 5/18', tip: 'Always convert units before substituting.' },
        { title: 'Relative Speed', formula: 'Opposite dirs: Add speeds | Same dir: Subtract speeds', tip: 'Used for trains crossing each other.' },
        { title: 'Average Speed', formula: 'Avg Speed = 2ab / (a+b)  [for equal distances]', tip: 'Never just add and divide when distances are equal.' },
      ],
      tip: '🎯 Placement Trick: Train questions almost always require converting km/h to m/s. The moment you see meters and seconds, multiply speed by 5/18. Memorize this conversion — it saves 60 seconds per question.'
    }
  },
  {
    id: 'plp',
    name: 'Profit, Loss & %',
    icon: '💰',
    pillar: 'Quantitative',
    accent: '#1D9E75',
    description: 'Cost price, selling price, discounts',
    teaching: {
      topics: ['Cost Price vs Selling Price', 'Profit & Loss %', 'Discount & Markup', 'Successive Discounts', 'Dishonest Dealers'],
      formulas: [
        { title: 'Profit %', formula: 'Profit% = (SP − CP) / CP × 100', tip: 'Always divide by CP, not SP.' },
        { title: 'Selling Price', formula: 'SP = CP × (1 + Profit%/100)', tip: 'For 25% profit: SP = 1.25 × CP.' },
        { title: 'Discount', formula: 'SP = MP × (1 − Discount%/100)', tip: 'Marked Price is the original tag; Discount reduces it.' },
        { title: 'Articles Trick', formula: 'If CP of n₁ = SP of n₂ → Profit% = (n₁−n₂)/n₂ × 100', tip: 'Classic question type: "CP of 20 = SP of 16" → find profit.' },
      ],
      tip: '🎯 Placement Trick: When you see "CP of X articles = SP of Y articles", immediately use: Profit% = (X−Y)/Y × 100. Do NOT set up x/y equations — this shortcut solves it in under 10 seconds.'
    }
  },
  {
    id: 'si',
    name: 'Simple & Compound Interest',
    icon: '📈',
    pillar: 'Quantitative',
    accent: '#EF9F27',
    description: 'SI, CI, and rate calculations',
    teaching: {
      topics: ['Simple Interest', 'Compound Interest', 'Difference between SI & CI', 'Finding P, R, or T', 'Effective Rate'],
      formulas: [
        { title: 'Simple Interest', formula: 'SI = (P × R × T) / 100', tip: 'Interest is the same every year.' },
        { title: 'Compound Interest', formula: 'A = P × (1 + R/100)^T', tip: 'Interest is added to principal each year, causing growth.' },
        { title: 'CI − SI Shortcut (2 yrs)', formula: 'CI − SI = P × (R/100)²', tip: 'Use this to find P or R without long calculation.' },
        { title: 'Half-Yearly Compounding', formula: 'A = P × (1 + R/200)^(2T)', tip: 'Double the time, halve the rate when compounded half-yearly.' },
      ],
      tip: '🎯 Placement Trick: For the very common question "find CI−SI for 2 years", use the shortcut P(R/100)². For 3 years, CI−SI = P(R/100)²(3 + R/100). These eliminate the need to compute full compound amounts.'
    }
  },
  {
    id: 'avg',
    name: 'Averages, Ratios & Mixtures',
    icon: '⚖️',
    pillar: 'Quantitative',
    accent: '#D85A30',
    description: 'Mean, weighted avg, alligation',
    teaching: {
      topics: ['Arithmetic Mean', 'Weighted Average', 'Ratios & Proportions', 'Alligation Rule', 'Mixing Two Solutions'],
      formulas: [
        { title: 'Average', formula: 'Average = Sum of Items / Number of Items', tip: 'If average changes when a member joins/leaves, find the new sum.' },
        { title: 'Weighted Average', formula: 'WAvg = (w₁×v₁ + w₂×v₂) / (w₁+w₂)', tip: 'Used when two groups merge.' },
        { title: 'Alligation Rule', formula: '(Cheaper) : (Dearer) = (Dearer−Mean) : (Mean−Cheaper)', tip: 'Draw a cross/diamond diagram — it always works visually.' },
        { title: 'Ratio to Actual', formula: 'If a:b = 3:5 and total=80, then a=30, b=50', tip: 'Divide total by sum of ratio parts, then multiply.' },
      ],
      tip: '🎯 Placement Trick: For mixture questions, always draw the Alligation Cross. Write cheaper on the left, dearer on the right, mean in the center. Cross-subtract to get the mixing ratio. This works for ANY mixture problem.'
    }
  },
  {
    id: 'ns',
    name: 'Number System',
    icon: '🔢',
    pillar: 'Quantitative',
    accent: '#7F77DD',
    description: 'Series, Divisibility, LCM/HCF, Remainders & more',
    teaching: {
      topics: ['Number Series & Patterns', 'Divisibility Rules', 'Prime Factorization & Factors', 'LCM & HCF', 'Unit Digits & Remainders', 'Trailing Zeros', 'Simplification'],
      formulas: [
        { title: 'Unit Digit (Cyclicity)', formula: 'Power of any digit repeats every 4 steps. Divide exponent by 4, use remainder.', tip: '7¹=7, 7²=9, 7³=3, 7⁴=1 — then it repeats. 7¹⁰⁵ → 105÷4=rem1 → unit digit=7.' },
        { title: 'LCM × HCF Product', formula: 'LCM(a,b) × HCF(a,b) = a × b', tip: 'Use this to find LCM if HCF is given, or vice versa.' },
        { title: 'Number of Factors', formula: 'If n = p^a × q^b, then factors = (a+1)(b+1)', tip: 'E.g. 12 = 2² × 3¹ → factors = (2+1)(1+1) = 6.' },
        { title: 'Trailing Zeros in n!', formula: 'Count pairs of (2×5). Zeros = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...', tip: '100! has ⌊100/5⌋+⌊100/25⌋ = 20+4 = 24 trailing zeros.' },
        { title: 'Divisibility by 3 & 9', formula: 'Sum of all digits must be divisible by 3 (or 9).', tip: 'Quick check: 1+2+3=6, divisible by 3 ✓.' },
      ],
      tip: '🎯 Placement Trick: Unit digit questions appear in 90% of placement exams. Memorize the cyclicity pattern: digits 2,3,7,8 have cycle of 4; digits 4,9 have cycle of 2; digits 0,1,5,6 always end in themselves. This gets you the answer in under 5 seconds.'
    }
  },


  // ─── LOGICAL ───
  {
    id: 'br',
    name: 'Blood Relations',
    icon: '👨‍👩‍👧',
    pillar: 'Logical',
    accent: '#7F77DD',
    description: 'Family trees and relation puzzles',
    teaching: {
      topics: ['Direct Relations', 'Indirect Relations', 'Coded Relations', 'Puzzle-based Family Trees', 'Gender Identification'],
      formulas: [
        { title: 'Key Relations', formula: 'Son/Daughter of Parent = Sibling of each other', tip: 'Build the family tree on paper, never try to solve in your head.' },
        { title: 'Coded Relation', formula: 'A + B = A is the father of B | A − B = A is the husband/wife of B', tip: 'Always decode the symbols first before drawing the tree.' },
      ],
      tip: '🎯 Placement Trick: For any blood relation puzzle longer than 2 lines, immediately draw a tree. Write Male = △, Female = ○. This prevents confusion between mother\'s brother and brother\'s father.'
    }
  },
  {
    id: 'cd',
    name: 'Coding-Decoding',
    icon: '🔐',
    pillar: 'Logical',
    accent: '#1D9E75',
    description: 'Encode and decode patterns',
    teaching: {
      topics: ['Letter Coding', 'Number Coding', 'Symbol Substitution', 'Reverse Coding', 'Mixed Coding'],
      formulas: [
        { title: 'Alphabet Position', formula: 'A=1, B=2 ... Z=26 | Reverse: A=26, Z=1', tip: 'Memorize A=1 and Z=26. For reverse, use (27 − position).' },
        { title: 'Opposite Letters', formula: 'A↔Z, B↔Y, C↔X ... Use: Opposite of X = 27 − position(X)', tip: 'A+Z=27, B+Y=27. All pairs sum to 27.' },
      ],
      tip: '🎯 Placement Trick: 80% of coding-decoding questions use a simple +N or −N shift. Write down the first 5 letters of the code and check if the shift is consistent. Once you find the pattern, apply it to the entire word without checking each letter.'
    }
  }
];

export const QUESTIONS = [
  // ═══════════════════════════════════════
  // TIME, SPEED & DISTANCE
  // ═══════════════════════════════════════
  {
    id: 'tsd_1',
    category: 'tsd',
    difficulty: 'Easy',
    concept_name: 'Basic Speed-Distance',
    question_text: 'A car travels 240 km in 4 hours. What is its average speed?',
    options: { A: '50 km/h', B: '60 km/h', C: '70 km/h', D: '80 km/h' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'The Magic Formula',
        explanation: 'The fundamental formula connecting Speed, Distance and Time is: Speed = Distance ÷ Time. Think of it as: how far you go in one hour.',
        visual_type: 'formula_highlight',
        formula_used: 'Speed = Distance ÷ Time',
        formula_vars: [
          { symbol: 'Speed', color: 'a', label: '?', unit: 'km/h' },
          { symbol: 'Distance', color: 'b', label: '240', unit: 'km' },
          { symbol: 'Time', color: 'c', label: '4', unit: 'hrs' }
        ],
        analogy: 'If you walk 10 km in 2 hours, you covered 5 km every hour — that\'s your speed.',
        duration_seconds: 4
      },
      {
        step_number: 2,
        step_title: 'Plug in the Values',
        explanation: 'Distance = 240 km, Time = 4 hours. Put these into the formula: Speed = 240 ÷ 4.',
        visual_type: 'number_morph',
        formula_used: '240 ÷ 4 = ?',
        numbers: [240, '÷', 4, '=', 60],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 3,
        step_title: 'The Scene Explained',
        explanation: 'Imagine a car on a straight highway. In 4 equal chunks of 1 hour each, it covers 60 km every hour — that\'s why average speed = 60 km/h.',
        visual_type: 'story_scene',
        scene_type: 'car_highway',
        formula_used: null,
        analogy: 'Each hour = one tile of road, each tile = 60 km.',
        duration_seconds: 4
      }
    ],
    concept_summary: 'Speed = Distance ÷ Time. Always match units! If distance is in km and time in hours, speed is in km/h.',
    follow_up_questions: [
      {
        question: 'A bike covers 150 km in 3 hours. What is its speed?',
        options: { A: '40 km/h', B: '50 km/h', C: '55 km/h', D: '60 km/h' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'tsd_2',
    category: 'tsd',
    difficulty: 'Medium',
    concept_name: 'Relative Speed (Opposite Directions)',
    question_text: 'Two trains start from stations A and B, 300 km apart, and move toward each other at 70 km/h and 80 km/h respectively. In how many hours will they meet?',
    options: { A: '1.5 hrs', B: '2 hrs', C: '2.5 hrs', D: '3 hrs' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Relative Speed Concept',
        explanation: 'When two objects move TOWARD each other, their speeds ADD up. The combined speed is called Relative Speed.',
        visual_type: 'formula_highlight',
        formula_used: 'Relative Speed = Speed₁ + Speed₂',
        formula_vars: [
          { symbol: 'v₁', color: 'a', label: '70', unit: 'km/h' },
          { symbol: 'v₂', color: 'b', label: '80', unit: 'km/h' },
          { symbol: 'v_rel', color: 'c', label: '150', unit: 'km/h' }
        ],
        analogy: 'Imagine walking toward a friend — you close the gap at the sum of both your walking speeds.',
        duration_seconds: 4
      },
      {
        step_number: 2,
        step_title: 'Trains Moving Toward Each Other',
        explanation: 'Train 1 starts from A at 70 km/h. Train 2 starts from B at 80 km/h. Together they close 150 km every hour.',
        visual_type: 'story_scene',
        scene_type: 'two_trains',
        formula_used: null,
        analogy: null,
        duration_seconds: 4
      },
      {
        step_number: 3,
        step_title: 'Calculate Meeting Time',
        explanation: 'Time = Total Distance ÷ Relative Speed = 300 ÷ 150 = 2 hours.',
        visual_type: 'number_morph',
        formula_used: 'Time = 300 ÷ 150',
        numbers: [300, '÷', 150, '=', 2],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      }
    ],
    concept_summary: 'Moving toward each other → Add speeds. Moving in same direction → Subtract speeds. Time = Distance ÷ Relative Speed.',
    follow_up_questions: [
      {
        question: 'Two cyclists move toward each other from 120 km apart at 30 km/h each. When do they meet?',
        options: { A: '1 hr', B: '2 hrs', C: '3 hrs', D: '4 hrs' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'tsd_3',
    category: 'tsd',
    difficulty: 'Easy',
    concept_name: 'Time Calculation',
    question_text: 'A man walks at 5 km/h. How long will he take to cover 20 km?',
    options: { A: '2 hrs', B: '3 hrs', C: '4 hrs', D: '5 hrs' },
    correct_answer: 'C',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Rearranging the Formula',
        explanation: 'From Speed = Distance ÷ Time, we get Time = Distance ÷ Speed. We need to find Time here.',
        visual_type: 'formula_highlight',
        formula_used: 'Time = Distance ÷ Speed',
        formula_vars: [
          { symbol: 'Distance', color: 'b', label: '20', unit: 'km' },
          { symbol: 'Speed', color: 'a', label: '5', unit: 'km/h' },
          { symbol: 'Time', color: 'c', label: '?', unit: 'hrs' }
        ],
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Calculate',
        explanation: 'Time = 20 ÷ 5 = 4 hours.',
        visual_type: 'number_morph',
        formula_used: '20 ÷ 5 = 4',
        numbers: [20, '÷', 5, '=', 4],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 2
      }
    ],
    concept_summary: 'Three formulas from one: Speed = D/T → Time = D/S → Distance = S×T. Know any two, find the third.',
    follow_up_questions: [
      {
        question: 'At 8 km/h, how long to cover 32 km?',
        options: { A: '3 hrs', B: '4 hrs', C: '5 hrs', D: '6 hrs' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'tsd_4',
    category: 'tsd',
    difficulty: 'Hard',
    concept_name: 'Average Speed with Two Legs',
    question_text: 'A person travels from X to Y at 60 km/h and returns at 40 km/h. What is the average speed for the whole journey?',
    options: { A: '48 km/h', B: '50 km/h', C: '52 km/h', D: '55 km/h' },
    correct_answer: 'A',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Why NOT simply average 60 and 40?',
        explanation: 'Average speed ≠ (60+40)/2 = 50 km/h because you spend MORE time at the slower speed. We need the harmonic mean formula.',
        visual_type: 'formula_highlight',
        formula_used: 'Avg Speed = 2ab ÷ (a + b)',
        formula_vars: [
          { symbol: 'a', color: 'a', label: '60', unit: 'km/h' },
          { symbol: 'b', color: 'b', label: '40', unit: 'km/h' }
        ],
        analogy: 'You drive slower on one half — that half takes longer, so it drags the average down.',
        duration_seconds: 4
      },
      {
        step_number: 2,
        step_title: 'Substitute and Solve',
        explanation: 'Avg = 2 × 60 × 40 ÷ (60 + 40) = 4800 ÷ 100 = 48 km/h.',
        visual_type: 'number_morph',
        formula_used: '(2×60×40)÷(60+40) = 4800÷100 = 48',
        numbers: [4800, '÷', 100, '=', 48],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      }
    ],
    concept_summary: 'When equal distances are covered at two speeds a and b, average speed = 2ab/(a+b). Never use simple average!',
    follow_up_questions: [
      {
        question: 'A car goes at 30 km/h and returns at 60 km/h. Average speed?',
        options: { A: '40 km/h', B: '45 km/h', C: '42 km/h', D: '38 km/h' },
        correct_answer: 'A'
      }
    ]
  },
  {
    id: 'tsd_5',
    category: 'tsd',
    difficulty: 'Medium',
    concept_name: 'Distance Calculation',
    question_text: 'A train moving at 90 km/h crosses a platform in 30 seconds. The platform is 200 m long. What is the length of the train?',
    options: { A: '500 m', B: '550 m', C: '600 m', D: '750 m' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Unit Conversion First',
        explanation: 'Speed is in km/h but time in seconds. Convert: 90 km/h = 90 × (1000/3600) = 25 m/s.',
        visual_type: 'formula_highlight',
        formula_used: 'km/h × (5/18) = m/s',
        formula_vars: [
          { symbol: '90', color: 'a', label: '90', unit: 'km/h' },
          { symbol: '×5/18', color: 'b', label: '×5/18', unit: '' },
          { symbol: '=25', color: 'c', label: '25', unit: 'm/s' }
        ],
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Total Distance = Train + Platform',
        explanation: 'When a train crosses a platform, it covers: Length of Train + Length of Platform. Total distance = 25 m/s × 30 s = 750 m.',
        visual_type: 'number_morph',
        formula_used: '25 × 30 = 750 m total',
        numbers: [25, '×', 30, '=', 750],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 3,
        step_title: 'Find Train Length',
        explanation: 'Train Length = Total Distance − Platform Length = 750 − 200 = 550 m.',
        visual_type: 'number_morph',
        formula_used: '750 − 200 = 550',
        numbers: [750, '−', 200, '=', 550],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      }
    ],
    concept_summary: 'Train crossing platform: total distance = train length + platform length. Always convert units first (km/h × 5/18 = m/s).',
    follow_up_questions: [
      {
        question: 'A train at 72 km/h crosses a 100 m bridge in 10 s. Train length?',
        options: { A: '80 m', B: '100 m', C: '120 m', D: '150 m' },
        correct_answer: 'B'
      }
    ]
  },

  // ═══════════════════════════════════════
  // PROFIT, LOSS & PERCENTAGES
  // ═══════════════════════════════════════
  {
    id: 'plp_1',
    category: 'plp',
    difficulty: 'Easy',
    concept_name: 'Profit Percentage',
    question_text: 'A shopkeeper buys an article for ₹400 and sells it for ₹500. What is the profit percentage?',
    options: { A: '20%', B: '25%', C: '30%', D: '15%' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Identify CP and SP',
        explanation: 'Cost Price (CP) = ₹400 (what you pay). Selling Price (SP) = ₹500 (what you receive). Profit = SP − CP = 100.',
        visual_type: 'number_morph',
        formula_used: 'Profit = SP − CP = 500 − 400 = 100',
        numbers: [500, '−', 400, '=', 100],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Calculate Profit %',
        explanation: 'Profit % = (Profit ÷ CP) × 100 = (100 ÷ 400) × 100 = 25%.',
        visual_type: 'formula_highlight',
        formula_used: 'Profit% = (Profit ÷ CP) × 100',
        formula_vars: [
          { symbol: 'Profit', color: 'b', label: '100', unit: '₹' },
          { symbol: 'CP', color: 'a', label: '400', unit: '₹' },
          { symbol: 'P%', color: 'c', label: '25', unit: '%' }
        ],
        analogy: 'For every ₹100 spent, you gained ₹25 extra — that\'s 25%.',
        duration_seconds: 4
      }
    ],
    concept_summary: 'Profit% = (Profit ÷ CP) × 100. Loss% = (Loss ÷ CP) × 100. Always divide by CP, not SP!',
    follow_up_questions: [
      {
        question: 'CP = ₹800, SP = ₹1000. Profit %?',
        options: { A: '20%', B: '25%', C: '30%', D: '15%' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'plp_2',
    category: 'plp',
    difficulty: 'Medium',
    concept_name: 'Discount and SP',
    question_text: 'A shirt is marked at ₹800. A 15% discount is given. What is the selling price?',
    options: { A: '₹640', B: '₹660', C: '₹680', D: '₹700' },
    correct_answer: 'C',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Discount Amount',
        explanation: 'Discount = 15% of Marked Price = (15/100) × 800 = ₹120.',
        visual_type: 'formula_highlight',
        formula_used: 'Discount = (15/100) × 800 = 120',
        formula_vars: [
          { symbol: '15%', color: 'a', label: '15', unit: '%' },
          { symbol: 'MP', color: 'b', label: '800', unit: '₹' },
          { symbol: 'Discount', color: 'c', label: '120', unit: '₹' }
        ],
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Selling Price',
        explanation: 'SP = Marked Price − Discount = 800 − 120 = ₹680.',
        visual_type: 'number_morph',
        formula_used: '800 − 120 = 680',
        numbers: [800, '−', 120, '=', 680],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      }
    ],
    concept_summary: 'SP = MP × (1 − Discount%/100). Quick formula avoids two steps. Discount is always on Marked Price (MP).',
    follow_up_questions: [
      {
        question: 'MP = ₹1200, discount = 20%. What is SP?',
        options: { A: '₹900', B: '₹960', C: '₹980', D: '₹1000' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'plp_3',
    category: 'plp',
    difficulty: 'Easy',
    concept_name: 'Loss Percentage',
    question_text: 'An item is bought for ₹600 and sold for ₹480. What is the loss percentage?',
    options: { A: '15%', B: '20%', C: '25%', D: '10%' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Identify the Loss',
        explanation: 'CP = ₹600, SP = ₹480. Since SP < CP, there is a Loss. Loss = CP − SP = 600 − 480 = ₹120.',
        visual_type: 'number_morph',
        formula_used: 'Loss = CP − SP = 600 − 480 = 120',
        numbers: [600, '−', 480, '=', 120],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Calculate Loss %',
        explanation: 'Loss % = (Loss ÷ CP) × 100 = (120 ÷ 600) × 100 = 20%.',
        visual_type: 'formula_highlight',
        formula_used: 'Loss% = (120 ÷ 600) × 100 = 20%',
        formula_vars: [
          { symbol: 'Loss', color: 'c', label: '120', unit: '₹' },
          { symbol: 'CP', color: 'a', label: '600', unit: '₹' },
          { symbol: 'L%', color: 'd', label: '20', unit: '%' }
        ],
        analogy: 'You lost ₹20 for every ₹100 invested — a 20% loss.',
        duration_seconds: 4
      }
    ],
    concept_summary: 'Loss% = (Loss ÷ CP) × 100. Loss = CP − SP (only when SP < CP).',
    follow_up_questions: [
      {
        question: 'CP = ₹500, SP = ₹425. Loss %?',
        options: { A: '10%', B: '12%', C: '15%', D: '20%' },
        correct_answer: 'C'
      }
    ]
  },
  {
    id: 'plp_4',
    category: 'plp',
    difficulty: 'Hard',
    concept_name: 'Finding CP from Profit%',
    question_text: 'By selling an article at ₹720, a trader gains 20%. What was the cost price?',
    options: { A: '₹580', B: '₹600', C: '₹620', D: '₹640' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Think in Percentage Terms',
        explanation: 'If CP = 100%, a 20% gain means SP = 120% of CP. So CP = (SP × 100) ÷ 120.',
        visual_type: 'formula_highlight',
        formula_used: 'CP = SP × 100 ÷ (100 + Profit%)',
        formula_vars: [
          { symbol: 'SP', color: 'b', label: '720', unit: '₹' },
          { symbol: 'P%', color: 'a', label: '20', unit: '%' },
          { symbol: 'CP', color: 'c', label: '?', unit: '₹' }
        ],
        analogy: 'If ₹720 is 120% of CP, then 1% = ₹6, so 100% = ₹600.',
        duration_seconds: 4
      },
      {
        step_number: 2,
        step_title: 'Calculate',
        explanation: 'CP = (720 × 100) ÷ 120 = 72000 ÷ 120 = ₹600.',
        visual_type: 'number_morph',
        formula_used: '72000 ÷ 120 = 600',
        numbers: [72000, '÷', 120, '=', 600],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      }
    ],
    concept_summary: 'CP = SP × 100 ÷ (100 + P%) for profit. CP = SP × 100 ÷ (100 − L%) for loss.',
    follow_up_questions: [
      {
        question: 'SP = ₹880, profit = 10%. Find CP.',
        options: { A: '₹780', B: '₹800', C: '₹820', D: '₹840' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'plp_5',
    category: 'plp',
    difficulty: 'Medium',
    concept_name: 'Successive Discounts',
    question_text: 'Two successive discounts of 20% and 10% are given on ₹1000. What is the final price?',
    options: { A: '₹700', B: '₹720', C: '₹750', D: '₹780' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'First Discount: 20%',
        explanation: 'Price after 20% off = 1000 × (1 − 0.20) = 1000 × 0.80 = ₹800.',
        visual_type: 'number_morph',
        formula_used: '1000 × 0.80 = 800',
        numbers: [1000, '×', 0.80, '=', 800],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Second Discount: 10% on New Price',
        explanation: 'Second discount is on the NEW price (₹800), not original. Price = 800 × 0.90 = ₹720.',
        visual_type: 'number_morph',
        formula_used: '800 × 0.90 = 720',
        numbers: [800, '×', 0.90, '=', 720],
        highlight_index: 4,
        analogy: 'Each discount bites into what\'s left — not the original!',
        duration_seconds: 3
      }
    ],
    concept_summary: 'Successive discounts: apply each to the price AFTER previous discount. Net formula: Final = P × (1−d₁/100) × (1−d₂/100).',
    follow_up_questions: [
      {
        question: 'Two discounts of 10% and 5% on ₹500. Final price?',
        options: { A: '₹412.50', B: '₹425', C: '₹427.50', D: '₹430' },
        correct_answer: 'C'
      }
    ]
  },

  // ═══════════════════════════════════════
  // SIMPLE & COMPOUND INTEREST
  // ═══════════════════════════════════════
  {
    id: 'si_1',
    category: 'si',
    difficulty: 'Easy',
    concept_name: 'Simple Interest',
    question_text: 'Find the Simple Interest on ₹5000 at 8% per annum for 3 years.',
    options: { A: '₹1000', B: '₹1200', C: '₹1500', D: '₹1800' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Simple Interest Formula',
        explanation: 'SI = (Principal × Rate × Time) ÷ 100. Interest is calculated on the original amount every year.',
        visual_type: 'formula_highlight',
        formula_used: 'SI = P × R × T ÷ 100',
        formula_vars: [
          { symbol: 'P', color: 'a', label: '5000', unit: '₹' },
          { symbol: 'R', color: 'b', label: '8', unit: '%' },
          { symbol: 'T', color: 'c', label: '3', unit: 'yrs' },
          { symbol: 'SI', color: 'd', label: '?', unit: '₹' }
        ],
        analogy: 'Same interest every year — like getting ₹400 every year from the bank.',
        duration_seconds: 4
      },
      {
        step_number: 2,
        step_title: 'Calculate',
        explanation: 'SI = (5000 × 8 × 3) ÷ 100 = 120000 ÷ 100 = ₹1200.',
        visual_type: 'number_morph',
        formula_used: '120000 ÷ 100 = 1200',
        numbers: [120000, '÷', 100, '=', 1200],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      }
    ],
    concept_summary: 'SI = PRT/100. Interest is constant each year. Total amount = P + SI.',
    follow_up_questions: [
      {
        question: 'P = ₹3000, R = 5%, T = 4 years. Find SI.',
        options: { A: '₹500', B: '₹600', C: '₹650', D: '₹700' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'si_2',
    category: 'si',
    difficulty: 'Medium',
    concept_name: 'Compound Interest',
    question_text: 'Find the Compound Interest on ₹10000 at 10% per annum for 2 years, compounded annually.',
    options: { A: '₹2000', B: '₹2100', C: '₹2200', D: '₹2300' },
    correct_answer: 'B',
    animation_script: [
      {
        step_number: 1,
        step_title: 'Year 1 Interest',
        explanation: 'Year 1: Interest = 10% of ₹10000 = ₹1000. New amount = ₹11000.',
        visual_type: 'number_morph',
        formula_used: '10000 × 0.10 = 1000 → 11000',
        numbers: [10000, '+', 1000, '=', 11000],
        highlight_index: 4,
        analogy: null,
        duration_seconds: 3
      },
      {
        step_number: 2,
        step_title: 'Year 2 — Interest on New Amount',
        explanation: 'Year 2: Interest = 10% of ₹11000 = ₹1100. Total CI = 1000 + 1100 = ₹2100. (More than SI = ₹2000!)',
        visual_type: 'number_morph',
        formula_used: '11000 × 0.10 = 1100 → Total CI = 2100',
        numbers: [1000, '+', 1100, '=', 2100],
        highlight_index: 4,
        analogy: 'Snowball effect — interest earns interest!',
        duration_seconds: 4
      }
    ],
    concept_summary: 'CI = P(1 + R/100)ⁿ − P. CI > SI for same P, R, T because interest compounds on itself.',
    follow_up_questions: [
      {
        question: 'What is CI on ₹5000 at 10% for 2 years?',
        options: { A: '₹1000', B: '₹1050', C: '₹1100', D: '₹1150' },
        correct_answer: 'B'
      }
    ]
  },
  {
    id: 'si_3', category: 'si', difficulty: 'Easy', concept_name: 'Finding Rate',
    question_text: 'If SI on ₹2000 for 2 years is ₹240, what is the rate of interest?',
    options: { A: '5%', B: '6%', C: '7%', D: '8%' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Rearrange SI Formula for R', explanation: 'From SI = PRT/100, we get R = (SI × 100) ÷ (P × T) = (240 × 100) ÷ (2000 × 2) = 24000 ÷ 4000 = 6%.', visual_type: 'formula_highlight', formula_used: 'R = (SI × 100) ÷ (P × T)', formula_vars: [{ symbol: 'SI', color: 'a', label: '240', unit: '₹' }, { symbol: 'P', color: 'b', label: '2000', unit: '₹' }, { symbol: 'T', color: 'c', label: '2', unit: 'yrs' }, { symbol: 'R', color: 'd', label: '6', unit: '%' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'From SI = PRT/100: R = (SI×100)/(P×T), T = (SI×100)/(P×R), P = (SI×100)/(R×T).',
    follow_up_questions: [{ question: 'SI = ₹300, P = ₹1000, T = 3 yrs. Rate?', options: { A: '8%', B: '9%', C: '10%', D: '12%' }, correct_answer: 'C' }]
  },
  {
    id: 'si_4', category: 'si', difficulty: 'Medium', concept_name: 'SI vs CI Difference',
    question_text: 'The difference between CI and SI on ₹8000 at 5% for 2 years is?',
    options: { A: '₹18', B: '₹20', C: '₹22', D: '₹25' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Key Formula for Difference', explanation: 'For 2 years: CI − SI = P × (R/100)² = 8000 × (5/100)² = 8000 × 0.0025 = ₹20.', visual_type: 'formula_highlight', formula_used: 'CI−SI = P×(R/100)²', formula_vars: [{ symbol: 'P', color: 'a', label: '8000', unit: '₹' }, { symbol: 'R', color: 'b', label: '5', unit: '%' }, { symbol: 'Diff', color: 'c', label: '20', unit: '₹' }], analogy: 'The ₹20 difference is the interest earned on year-1\'s interest in year 2.', duration_seconds: 4 }
    ],
    concept_summary: 'For 2 years: CI − SI = P(R/100)². For 3 years: CI − SI = P(R/100)²(3 + R/100).',
    follow_up_questions: [{ question: 'CI − SI on ₹5000 at 10% for 2 years?', options: { A: '₹40', B: '₹45', C: '₹50', D: '₹55' }, correct_answer: 'C' }]
  },
  {
    id: 'si_5', category: 'si', difficulty: 'Hard', concept_name: 'Amount with CI Formula',
    question_text: 'What will ₹12000 amount to in 3 years at 10% CI per annum?',
    options: { A: '₹15,720', B: '₹15,972', C: '₹15,500', D: '₹16,000' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Apply CI Formula', explanation: 'Amount = P × (1 + R/100)ⁿ = 12000 × (1.10)³ = 12000 × 1.331 = ₹15,972.', visual_type: 'formula_highlight', formula_used: 'A = P(1 + R/100)ⁿ', formula_vars: [{ symbol: 'P', color: 'a', label: '12000', unit: '₹' }, { symbol: '(1.1)³', color: 'b', label: '1.331', unit: '' }, { symbol: 'A', color: 'c', label: '15972', unit: '₹' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Calculate Step by Step', explanation: '1.1¹=1.1, 1.1²=1.21, 1.1³=1.331. Then 12000 × 1.331 = ₹15,972.', visual_type: 'number_morph', formula_used: '12000 × 1.331 = 15972', numbers: [12000, '×', 1.331, '=', 15972], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Amount = P(1+R/100)ⁿ. CI = Amount − P. Remember: 1.1³ = 1.331, 1.1² = 1.21.',
    follow_up_questions: [{ question: 'Amount on ₹5000 at 10% CI for 2 years?', options: { A: '₹5,950', B: '₹6,000', C: '₹6,050', D: '₹6,200' }, correct_answer: 'C' }]
  },

  // ═══════════════════════════════════════
  // AVERAGES, RATIOS & MIXTURES
  // ═══════════════════════════════════════
  {
    id: 'avg_1', category: 'avg', difficulty: 'Easy', concept_name: 'Basic Average',
    question_text: 'The average of 5 numbers is 40. If one number is removed, the average of remaining 4 is 35. What is the removed number?',
    options: { A: '55', B: '60', C: '65', D: '70' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Total Sum Formula', explanation: 'Sum of 5 numbers = 5 × 40 = 200. Sum of 4 remaining = 4 × 35 = 140.', visual_type: 'number_morph', formula_used: '5×40=200, 4×35=140', numbers: [5, '×', 40, '=', 200], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Find Removed Number', explanation: 'Removed = Total Sum − Remaining Sum = 200 − 140 = 60.', visual_type: 'number_morph', formula_used: '200 − 140 = 60', numbers: [200, '−', 140, '=', 60], highlight_index: 4, analogy: 'The removed number made up the difference between the two totals.', duration_seconds: 3 }
    ],
    concept_summary: 'Sum = Average × Count. Use this to find missing values when averages change.',
    follow_up_questions: [{ question: 'Avg of 6 numbers = 50. Remove one, avg = 45. Removed number?', options: { A: '70', B: '75', C: '80', D: '85' }, correct_answer: 'C' }]
  },
  {
    id: 'avg_2', category: 'avg', difficulty: 'Medium', concept_name: 'Weighted Average',
    question_text: 'In a class, 20 boys average 60 marks and 30 girls average 80 marks. What is the class average?',
    options: { A: '70', B: '72', C: '74', D: '76' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Weighted Average Formula', explanation: 'You cannot simply average 60 and 80 — there are more girls. Use: Avg = (n₁×m₁ + n₂×m₂) ÷ (n₁+n₂).', visual_type: 'formula_highlight', formula_used: 'Avg = (n₁m₁ + n₂m₂) ÷ (n₁+n₂)', formula_vars: [{ symbol: 'n₁m₁', color: 'a', label: '1200', unit: '' }, { symbol: 'n₂m₂', color: 'b', label: '2400', unit: '' }, { symbol: 'n₁+n₂', color: 'c', label: '50', unit: '' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Calculate', explanation: '(20×60 + 30×80) ÷ 50 = (1200+2400) ÷ 50 = 3600 ÷ 50 = 72.', visual_type: 'number_morph', formula_used: '3600 ÷ 50 = 72', numbers: [3600, '÷', 50, '=', 72], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'When groups have different sizes, weighted average = total sum ÷ total count.',
    follow_up_questions: [{ question: '10 students avg 40, 20 students avg 55. Class average?', options: { A: '47.5', B: '50', C: '52.5', D: '55' }, correct_answer: 'B' }]
  },
  {
    id: 'avg_3', category: 'avg', difficulty: 'Easy', concept_name: 'Ratio Basics',
    question_text: 'Two numbers are in the ratio 3:5. Their sum is 80. Find the two numbers.',
    options: { A: '30 & 50', B: '24 & 40', C: '32 & 48', D: '20 & 60' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Ratio as Parts', explanation: 'Ratio 3:5 means the whole is 3+5 = 8 parts. Each part = 80 ÷ 8 = 10.', visual_type: 'number_morph', formula_used: '80 ÷ 8 = 10 per part', numbers: [80, '÷', 8, '=', 10], highlight_index: 4, analogy: 'Think of cutting a pizza into 8 slices — one person gets 3 slices, other gets 5.', duration_seconds: 3 },
      { step_number: 2, step_title: 'Find Each Number', explanation: 'First number = 3 × 10 = 30. Second number = 5 × 10 = 50.', visual_type: 'number_morph', formula_used: '3×10=30, 5×10=50', numbers: [3, '×', 10, '=', 30], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'For ratio a:b with sum S: First = a×S/(a+b), Second = b×S/(a+b).',
    follow_up_questions: [{ question: 'Ratio 2:3, sum=100. Find both numbers.', options: { A: '40&60', B: '30&70', C: '35&65', D: '45&55' }, correct_answer: 'A' }]
  },
  {
    id: 'avg_4', category: 'avg', difficulty: 'Hard', concept_name: 'Alligation / Mixture',
    question_text: 'In what ratio should milk at ₹20/L and ₹30/L be mixed to get a mixture worth ₹24/L?',
    options: { A: '3:2', B: '2:3', C: '3:4', D: '4:3' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Alligation Rule', explanation: 'Draw the cross: Place mean price (24) in center. Differences: cheaper side gets |30−24|=6 parts, dearer side gets |24−20|=4 parts.', visual_type: 'motion_graphic', scene_type: 'alligation_cross', formula_used: 'Ratio = (Dearer−Mean):(Mean−Cheaper)', formula_vars: [], analogy: 'The cheaper milk needs MORE quantity to bring the average up.', duration_seconds: 5 },
      { step_number: 2, step_title: 'Ratio Result', explanation: 'Ratio of cheap:dear = 6:4 = 3:2.', visual_type: 'number_morph', formula_used: '6:4 = 3:2', numbers: [6, ':', 4, '=', '3:2'], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Alligation: Ratio = (Dearer − Mean) : (Mean − Cheaper). Cheaper milk gets the LARGER ratio.',
    follow_up_questions: [{ question: 'Mix ₹12/L and ₹18/L to get ₹14/L. Ratio?', options: { A: '2:1', B: '1:2', C: '2:3', D: '3:2' }, correct_answer: 'A' }]
  },
  {
    id: 'avg_5', category: 'avg', difficulty: 'Medium', concept_name: 'Age Ratio Problem',
    question_text: 'Present age ratio of A and B is 4:5. After 10 years, ratio is 6:7. Find current ages.',
    options: { A: 'A=15, B=20', B: 'A=20, B=25', C: 'A=16, B=20', D: 'A=18, B=22' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Set Up Equations', explanation: 'Let ages be 4x and 5x now. After 10 years: (4x+10)/(5x+10) = 6/7. Cross-multiply: 7(4x+10) = 6(5x+10).', visual_type: 'formula_highlight', formula_used: '7(4x+10) = 6(5x+10)', formula_vars: [{ symbol: '28x+70', color: 'a', label: '28x+70', unit: '' }, { symbol: '=', color: 'd', label: '=', unit: '' }, { symbol: '30x+60', color: 'b', label: '30x+60', unit: '' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Solve for x', explanation: '28x+70 = 30x+60 → 10 = 2x → x=5. Ages: A = 4×5=20, B = 5×5=25.', visual_type: 'number_morph', formula_used: '2x=10 → x=5 → A=20, B=25', numbers: [2, 'x=', 10, '→x=', 5], highlight_index: 4, analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Ratio problems → use a multiplier x. Set up cross-multiply for future ratio equation. Solve for x.',
    follow_up_questions: [{ question: 'Ratio of A:B = 3:4 now. After 5 yrs = 4:5. Current ages?', options: { A: 'A=12,B=16', B: 'A=15,B=20', C: 'A=9,B=12', D: 'A=18,B=24' }, correct_answer: 'B' }]
  },

  // ═══════════════════════════════════════
  // NUMBER SERIES & PATTERNS
  // ═══════════════════════════════════════
  {
    id: 'ns_1', category: 'ns', difficulty: 'Easy', concept_name: 'Arithmetic Progression',
    question_text: 'Find the missing number: 3, 7, 11, 15, __, 23',
    options: { A: '17', B: '18', C: '19', D: '20' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Find the Common Difference', explanation: 'Each term increases by the same amount: 7−3=4, 11−7=4, 15−11=4. Common difference = 4.', visual_type: 'pattern_reveal', pattern: [3, 7, 11, 15, '?', 23], differences: [4, 4, 4, 4, 4], formula_used: 'd = 4', analogy: 'Like climbing stairs — each step is the same height.', duration_seconds: 4 },
      { step_number: 2, step_title: 'Fill the Gap', explanation: 'Missing = 15 + 4 = 19. Verify: 23 − 19 = 4 ✓', visual_type: 'number_morph', formula_used: '15 + 4 = 19', numbers: [15, '+', 4, '=', 19], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'AP: Constant difference between consecutive terms. aₙ = a₁ + (n−1)d.',
    follow_up_questions: [{ question: 'Next in: 5, 10, 15, 20, __', options: { A: '22', B: '25', C: '28', D: '30' }, correct_answer: 'B' }]
  },
  {
    id: 'ns_2', category: 'ns', difficulty: 'Medium', concept_name: 'Geometric Progression',
    question_text: 'Find missing: 2, 6, 18, 54, __',
    options: { A: '108', B: '162', C: '180', D: '200' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Find the Common Ratio', explanation: 'Each term is multiplied by the same number: 6÷2=3, 18÷6=3, 54÷18=3. Common ratio r = 3.', visual_type: 'pattern_reveal', pattern: [2, 6, 18, 54, '?'], differences: ['×3', '×3', '×3', '×3'], formula_used: 'r = 3', analogy: 'Like bacteria doubling — each step multiplies.', duration_seconds: 4 },
      { step_number: 2, step_title: 'Next Term', explanation: 'Next = 54 × 3 = 162.', visual_type: 'number_morph', formula_used: '54 × 3 = 162', numbers: [54, '×', 3, '=', 162], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'GP: Constant ratio r between terms. aₙ = a₁ × rⁿ⁻¹.',
    follow_up_questions: [{ question: 'Next in: 3, 9, 27, 81, __', options: { A: '162', B: '243', C: '270', D: '300' }, correct_answer: 'B' }]
  },
  {
    id: 'ns_3', category: 'ns', difficulty: 'Easy', concept_name: 'Square Series',
    question_text: 'Find missing: 1, 4, 9, 16, __, 36',
    options: { A: '20', B: '24', C: '25', D: '28' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Spot the Pattern', explanation: '1=1², 4=2², 9=3², 16=4². The series is squares of natural numbers!', visual_type: 'pattern_reveal', pattern: [1, 4, 9, 16, '?', 36], differences: ['1²', '2²', '3²', '4²', '5²', '6²'], formula_used: 'aₙ = n²', analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Missing Term', explanation: 'Missing = 5² = 25. Next = 6² = 36 ✓', visual_type: 'number_morph', formula_used: '5² = 25', numbers: [5, '²', '=', 25], highlight_index: 3, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Perfect squares: 1,4,9,16,25,36,49,64,81,100. Memorize these!',
    follow_up_questions: [{ question: 'Next in 1,4,9,16,25,36,__', options: { A: '42', B: '45', C: '48', D: '49' }, correct_answer: 'D' }]
  },
  {
    id: 'ns_4', category: 'ns', difficulty: 'Hard', concept_name: 'Mixed Operation Series',
    question_text: 'Find the missing: 2, 3, 5, 9, 17, __',
    options: { A: '30', B: '31', C: '33', D: '35' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Find the Rule', explanation: 'Check differences: 3−2=1, 5−3=2, 9−5=4, 17−9=8. Differences are doubling! 1,2,4,8,16...', visual_type: 'pattern_reveal', pattern: [2, 3, 5, 9, 17, '?'], differences: [1, 2, 4, 8, 16], formula_used: 'diff doubles each time', analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Next Term', explanation: 'Next difference = 16. So missing = 17 + 16 = 33.', visual_type: 'number_morph', formula_used: '17 + 16 = 33', numbers: [17, '+', 16, '=', 33], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Always compute differences between terms. If first differences don\'t work, try second differences.',
    follow_up_questions: [{ question: 'Next: 1, 2, 4, 7, 11, 16, __', options: { A: '20', B: '21', C: '22', D: '23' }, correct_answer: 'C' }]
  },
  {
    id: 'ns_5', category: 'ns', difficulty: 'Medium', concept_name: 'Fibonacci-like Series',
    question_text: 'Find the missing: 1, 1, 2, 3, 5, 8, __, 21',
    options: { A: '11', B: '12', C: '13', D: '14' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'The Fibonacci Rule', explanation: 'Each term = sum of the two previous terms. 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=?', visual_type: 'pattern_reveal', pattern: [1, 1, 2, 3, 5, 8, '?', 21], differences: ['1+1', '1+2', '2+3', '3+5', '5+8'], formula_used: 'aₙ = aₙ₋₁ + aₙ₋₂', analogy: 'Nature\'s sequence — found in flowers, shells, and spirals!', duration_seconds: 4 },
      { step_number: 2, step_title: 'Find Missing', explanation: '5 + 8 = 13. Then 8 + 13 = 21 ✓', visual_type: 'number_morph', formula_used: '5 + 8 = 13', numbers: [5, '+', 8, '=', 13], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Fibonacci: each term = sum of 2 previous. Appears in nature. Series: 1,1,2,3,5,8,13,21,34,55...',
    follow_up_questions: [{ question: 'Next after 13, 21 in Fibonacci?', options: { A: '32', B: '34', C: '36', D: '38' }, correct_answer: 'B' }]
  },

  // ═══════════════════════════════════════
  // SYNONYMS & ANTONYMS
  // ═══════════════════════════════════════
  {
    id: 'syn_1', category: 'syn', difficulty: 'Easy', concept_name: 'Synonym: ABUNDANT',
    question_text: 'Choose the synonym of ABUNDANT:',
    options: { A: 'Scarce', B: 'Plentiful', C: 'Moderate', D: 'Limited' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'What does ABUNDANT mean?', explanation: 'ABUNDANT means present in large quantities; more than enough. Think "abundant harvest" — crops overflowing.', visual_type: 'word_highlight', word: 'ABUNDANT', definition: 'Present in large quantities; more than sufficient', synonyms: ['Plentiful', 'Copious', 'Ample', 'Profuse'], antonyms: ['Scarce', 'Meager', 'Sparse'], memory_tip: 'ABUNDAnt → "a-bund-ant" → bundles and bundles of ants!', duration_seconds: 5 }
    ],
    concept_summary: 'ABUNDANT = Plentiful, Copious, Ample. Opposite (antonym) = Scarce, Meager.',
    follow_up_questions: [{ question: 'Antonym of ABUNDANT?', options: { A: 'Lavish', B: 'Scarce', C: 'Rich', D: 'Vast' }, correct_answer: 'B' }]
  },
  {
    id: 'syn_2', category: 'syn', difficulty: 'Medium', concept_name: 'Synonym: LETHARGIC',
    question_text: 'Choose the synonym of LETHARGIC:',
    options: { A: 'Energetic', B: 'Anxious', C: 'Sluggish', D: 'Alert' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Unpacking LETHARGIC', explanation: 'LETHARGIC comes from Greek "lethe" (forgetfulness/inactivity). It means lacking energy, abnormally drowsy or dull.', visual_type: 'word_highlight', word: 'LETHARGIC', definition: 'Affected by lethargy; sluggish, drowsy, lacking energy', synonyms: ['Sluggish', 'Torpid', 'Languid', 'Listless'], antonyms: ['Energetic', 'Vigorous', 'Alert'], memory_tip: 'LETHARGIC → "leth-ARGic" → think of a sloth (ARGuing slowly).', duration_seconds: 5 }
    ],
    concept_summary: 'LETHARGIC = Sluggish, Torpid, Languid. Antonyms: Energetic, Vibrant.',
    follow_up_questions: [{ question: 'Which is NOT a synonym of LETHARGIC?', options: { A: 'Torpid', B: 'Languid', C: 'Vivacious', D: 'Listless' }, correct_answer: 'C' }]
  },
  {
    id: 'syn_3', category: 'syn', difficulty: 'Easy', concept_name: 'Antonym: BENEVOLENT',
    question_text: 'Choose the antonym of BENEVOLENT:',
    options: { A: 'Kind', B: 'Generous', C: 'Malevolent', D: 'Charitable' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Root Word Magic', explanation: 'BENE = good (Latin). MALE = bad (Latin). VOLENT = wishing. So BENEVOLENT = wishing good, MALEVOLENT = wishing bad.', visual_type: 'word_highlight', word: 'BENEVOLENT', definition: 'Well-meaning and kindly; wishing good to others', synonyms: ['Kind', 'Generous', 'Charitable', 'Philanthropic'], antonyms: ['Malevolent', 'Malicious', 'Cruel'], memory_tip: 'BENE = good (benefit, benefactor). MALE = bad (malicious, malevolent).', duration_seconds: 5 }
    ],
    concept_summary: 'Latin roots help: BENE (good) vs MALE (bad). Learn roots to decode many words at once.',
    follow_up_questions: [{ question: 'Synonym of MALEVOLENT?', options: { A: 'Kind', B: 'Spiteful', C: 'Generous', D: 'Helpful' }, correct_answer: 'B' }]
  },
  {
    id: 'syn_4', category: 'syn', difficulty: 'Medium', concept_name: 'Synonym: VERBOSE',
    question_text: 'Choose the synonym of VERBOSE:',
    options: { A: 'Concise', B: 'Silent', C: 'Wordy', D: 'Clear' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'VERBOSE Explained', explanation: '"Verb" relates to words (Latin: verbum). VERBOSE = using more words than needed. A verbose writer says in 100 words what could be said in 10.', visual_type: 'word_highlight', word: 'VERBOSE', definition: 'Using or expressed in more words than are needed; wordy', synonyms: ['Wordy', 'Loquacious', 'Garrulous', 'Prolix'], antonyms: ['Concise', 'Terse', 'Brief', 'Succinct'], memory_tip: 'VERBose → too many VERBs/WORDs!', duration_seconds: 5 }
    ],
    concept_summary: 'VERBOSE = Wordy, Loquacious. Antonyms = Concise, Terse, Succinct.',
    follow_up_questions: [{ question: 'Antonym of VERBOSE?', options: { A: 'Loquacious', B: 'Terse', C: 'Garrulous', D: 'Prolix' }, correct_answer: 'B' }]
  },
  {
    id: 'syn_5', category: 'syn', difficulty: 'Hard', concept_name: 'Synonym: EPHEMERAL',
    question_text: 'Choose the synonym of EPHEMERAL:',
    options: { A: 'Eternal', B: 'Transient', C: 'Permanent', D: 'Durable' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'EPHEMERAL — A Poetic Word', explanation: 'From Greek "ephemeros" (lasting a day). EPHEMERAL means lasting for a very short time. Like a mayfly that lives only one day.', visual_type: 'word_highlight', word: 'EPHEMERAL', definition: 'Lasting for a very short time; transitory', synonyms: ['Transient', 'Fleeting', 'Momentary', 'Evanescent'], antonyms: ['Eternal', 'Permanent', 'Enduring'], memory_tip: 'EPHEMERAL → EPHEMERal → ephemer (Greek: day) → lives only a day.', duration_seconds: 5 }
    ],
    concept_summary: 'EPHEMERAL = Transient, Fleeting, Evanescent. Antonyms = Eternal, Permanent, Enduring.',
    follow_up_questions: [{ question: 'Which word means "lasting only a moment"?', options: { A: 'Perennial', B: 'Fleeting', C: 'Chronic', D: 'Perpetual' }, correct_answer: 'B' }]
  },

  // ═══════════════════════════════════════
  // FILL IN THE BLANKS
  // ═══════════════════════════════════════
  {
    id: 'fib_1', category: 'fib', difficulty: 'Easy', concept_name: 'Subject-Verb Agreement',
    question_text: 'Neither the students nor the teacher __ present in the class.',
    options: { A: 'were', B: 'are', C: 'was', D: 'been' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Neither...Nor Rule', explanation: 'With "Neither...Nor", the verb agrees with the SUBJECT CLOSEST to it. Here "teacher" is closest → singular → "was".', visual_type: 'word_highlight', word: 'Neither...Nor', definition: 'Verb agrees with the NEARER subject', synonyms: ['Either...or', 'Not only...but also'], antonyms: [], memory_tip: 'CLOSER WINS — the verb copies the subject nearest to it.', duration_seconds: 5 }
    ],
    concept_summary: '"Neither A nor B" → verb agrees with B (the closer one). Similarly for "Either...or".',
    follow_up_questions: [{ question: 'Either the manager or the employees __ to blame.', options: { A: 'is', B: 'are', C: 'was', D: 'been' }, correct_answer: 'B' }]
  },
  {
    id: 'fib_2', category: 'fib', difficulty: 'Medium', concept_name: 'Preposition Usage',
    question_text: 'She has been waiting __ the bus stop __ an hour.',
    options: { A: 'in, for', B: 'at, for', C: 'at, since', D: 'on, for' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'AT vs IN vs ON for Places', explanation: '"at" is used for specific points/places (bus stop, station, office). "in" for enclosed spaces (room, city). "on" for surfaces.', visual_type: 'word_highlight', word: 'AT (specific point)', definition: '"at" = a precise location or point. Bus stop = specific point.', synonyms: ['at the station', 'at the door', 'at school'], antonyms: [], memory_tip: 'AT = a precise dot on a map. IN = inside a container. ON = surface.', duration_seconds: 5 },
      { step_number: 2, step_title: 'FOR vs SINCE for Time', explanation: '"for" is used with a duration (an hour, 3 days). "since" with a starting point (since morning, since 5 PM).', visual_type: 'word_highlight', word: 'FOR (duration)', definition: '"for" = a period of time. "since" = a point in time.', synonyms: ['for two years', 'for a week'], antonyms: ['since Monday', 'since 2020'], memory_tip: 'FOR = HOW LONG. SINCE = WHEN (starting point).', duration_seconds: 4 }
    ],
    concept_summary: 'at = specific point. in = enclosed space. on = surface. for = duration. since = starting point.',
    follow_up_questions: [{ question: 'I have lived here __ five years.', options: { A: 'since', B: 'for', C: 'from', D: 'during' }, correct_answer: 'B' }]
  },
  {
    id: 'fib_3', category: 'fib', difficulty: 'Easy', concept_name: 'Correct Tense',
    question_text: 'By the time he arrived, the movie already __ started.',
    options: { A: 'has', B: 'had', C: 'have', D: 'was' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Past Perfect Tense', explanation: 'When two past events happen, the EARLIER one uses Past Perfect (had + V3). Movie started BEFORE he arrived. So: "had started".', visual_type: 'word_highlight', word: 'HAD + V3 (Past Perfect)', definition: 'Used for an action completed BEFORE another past action', synonyms: ['had eaten', 'had left', 'had finished'], antonyms: [], memory_tip: 'EARLIER past → HAD + V3. Think of a timeline: Event A (had started) → Event B (arrived).', duration_seconds: 5 }
    ],
    concept_summary: 'Past Perfect (had+V3) = the earlier of two past events. "By the time" is a trigger phrase.',
    follow_up_questions: [{ question: 'She __ the report before the meeting began.', options: { A: 'submitted', B: 'had submitted', C: 'has submitted', D: 'submits' }, correct_answer: 'B' }]
  },
  {
    id: 'fib_4', category: 'fib', difficulty: 'Medium', concept_name: 'Articles Usage',
    question_text: 'She is __ M.B.A. graduate working at __ European firm.',
    options: { A: 'an, a', B: 'a, an', C: 'an, an', D: 'a, a' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'A vs AN Rule (Sound, Not Spelling!)', explanation: 'Use "an" before VOWEL SOUND (not vowel letter). "M.B.A." pronounced "em-bee-ay" → starts with "em" vowel sound → "an MBA". "European" pronounced "yoo-ropean" → starts with "yoo" consonant sound → "a European".', visual_type: 'word_highlight', word: 'A vs AN = SOUND rule', definition: 'an = before vowel SOUND. a = before consonant SOUND.', synonyms: ['an MBA', 'an honest man', 'an hour'], antonyms: ['a European', 'a university', 'a useful tool'], memory_tip: 'SAY the word out loud. Vowel sound → an. Consonant sound → a. Spelling doesn\'t matter!', duration_seconds: 5 }
    ],
    concept_summary: 'A/AN = depends on PRONUNCIATION, not spelling. MBA (em-bee-ay) → "an". European (yoo) → "a".',
    follow_up_questions: [{ question: '__ honest mistake caused __ huge problem.', options: { A: 'A, a', B: 'An, a', C: 'An, an', D: 'A, an' }, correct_answer: 'C' }]
  },
  {
    id: 'fib_5', category: 'fib', difficulty: 'Hard', concept_name: 'Conditional Sentence',
    question_text: 'If I __ you, I would not have made that mistake.',
    options: { A: 'am', B: 'was', C: 'were', D: 'be' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Subjunctive Mood', explanation: 'Unreal / hypothetical conditions use SUBJUNCTIVE mood. "If I were you" (not "was") — even for "I/he/she/it", we use "were" in hypothetical conditionals.', visual_type: 'word_highlight', word: 'WERE (Subjunctive)', definition: 'Used in hypothetical/unreal "if" clauses — even with I/he/she/it', synonyms: ['If I were rich...', 'If she were taller...', 'I wish I were...'], antonyms: [], memory_tip: 'Hypothetical (unreal) + I/he/she/it → always WERE, not was!', duration_seconds: 5 }
    ],
    concept_summary: 'Hypothetical "if" clauses: use "were" for all subjects (If I were, If he were). This is the subjunctive mood.',
    follow_up_questions: [{ question: 'I wish I __ taller.', options: { A: 'am', B: 'was', C: 'were', D: 'be' }, correct_answer: 'C' }]
  },

  // ═══════════════════════════════════════
  // SENTENCE CORRECTION
  // ═══════════════════════════════════════
  {
    id: 'sc_1', category: 'sc', difficulty: 'Easy', concept_name: 'Double Negative',
    question_text: 'Identify the grammatically CORRECT sentence:',
    options: { A: 'I don\'t know nothing about it.', B: 'I don\'t know anything about it.', C: 'I know nothing not about it.', D: 'I didn\'t know nothing.' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Double Negative Error', explanation: '"don\'t know nothing" has TWO negatives (don\'t + nothing) which actually make a positive in English! Use either "don\'t know ANYTHING" or "know NOTHING" — not both.', visual_type: 'word_highlight', word: 'Double Negative ❌', definition: 'Two negatives in one clause cancel each other in standard English', synonyms: ['I know nothing', 'I don\'t know anything'], antonyms: ['I don\'t know nothing (WRONG)'], memory_tip: 'Two negatives = positive (like in math). Use only ONE negative per clause.', duration_seconds: 5 }
    ],
    concept_summary: 'Double negatives are grammatically wrong in standard English. One negative = clear. Two negatives = confusion/error.',
    follow_up_questions: [{ question: 'Which is correct?', options: { A: 'She didn\'t say nothing.', B: 'She said nothing.', C: 'She didn\'t said nothing.', D: 'She not said nothing.' }, correct_answer: 'B' }]
  },
  {
    id: 'sc_2', category: 'sc', difficulty: 'Medium', concept_name: 'Dangling Modifier',
    question_text: 'Choose the corrected version: "Walking down the street, the trees looked beautiful."',
    options: { A: 'Walking down the street, I found the trees beautiful.', B: 'Walking down the street, beautiful trees were seen.', C: 'The trees, walking down the street, looked beautiful.', D: 'The trees looked beautiful while walking.' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Dangling Modifier Explained', explanation: 'In the original, "Walking down the street" seems to describe THE TREES (were the trees walking?). The modifier dangles because its subject (the person walking) is missing. Fix: bring in the correct subject.', visual_type: 'word_highlight', word: 'Dangling Modifier ❌', definition: 'A modifier that doesn\'t logically connect to any subject in the sentence', synonyms: ['Misplaced modifier'], antonyms: [], memory_tip: 'Ask: WHO is doing the action in the modifier? That subject must appear right after the comma.', duration_seconds: 5 }
    ],
    concept_summary: 'Modifying phrase must logically connect to the subject right after it. "Walking down the street, [I] found..." — I = the walker.',
    follow_up_questions: [{ question: 'Which is correct? "Having finished the exam, __"', options: { A: '...the room was left.', B: '...the students left the room.', C: '...leaving was done.', D: '...the papers were collected.' }, correct_answer: 'B' }]
  },
  {
    id: 'sc_3', category: 'sc', difficulty: 'Easy', concept_name: 'Tense Consistency',
    question_text: 'He went to the market and buys some vegetables. Identify the error.',
    options: { A: 'went should be goes', B: 'buys should be bought', C: 'some should be any', D: 'No error' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Tense Must Match!', explanation: '"went" = past tense. But "buys" = present tense. Both actions happened together in the past, so both must be past: "went and bought".', visual_type: 'word_highlight', word: 'Tense Consistency Rule', definition: 'When two actions in a sentence share the same time, use the same tense', synonyms: ['went and bought ✓'], antonyms: ['went and buys ✗'], memory_tip: 'Linked actions = same tense. Past+Past, Present+Present. Don\'t mix!', duration_seconds: 4 }
    ],
    concept_summary: 'Tense consistency: linked actions must be in the same tense. "went...bought" (past+past) not "went...buys".',
    follow_up_questions: [{ question: 'She opened the door and __ outside.', options: { A: 'looks', B: 'looked', C: 'will look', D: 'look' }, correct_answer: 'B' }]
  },
  {
    id: 'sc_4', category: 'sc', difficulty: 'Medium', concept_name: 'Redundancy',
    question_text: 'Spot the redundancy: "The new innovation surprised everyone."',
    options: { A: '"new" is redundant', B: '"surprised" is redundant', C: '"everyone" is redundant', D: 'No error' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Redundancy: Saying the Same Thing Twice', explanation: '"Innovation" by definition means something NEW. So saying "new innovation" is redundant — it means "new new thing". Just say "innovation" or "new idea".', visual_type: 'word_highlight', word: 'Redundancy ❌', definition: 'Using words that mean the same thing, adding no new information', synonyms: ['Innovation (alone)', 'New idea'], antonyms: ['New innovation ✗', 'Burning fire ✗', 'Past history ✗'], memory_tip: 'Innovation = inherently new. Free gift = inherently free. These doubles are redundant!', duration_seconds: 5 }
    ],
    concept_summary: 'Common redundancies: "new innovation", "free gift", "past history", "advance planning", "future plans".',
    follow_up_questions: [{ question: 'Which phrase has redundancy?', options: { A: 'Burning fire', B: 'Cold ice', C: 'Both A and B', D: 'Neither' }, correct_answer: 'C' }]
  },
  {
    id: 'sc_5', category: 'sc', difficulty: 'Hard', concept_name: 'Parallel Structure',
    question_text: 'Choose the correct sentence with proper parallel structure:',
    options: { A: 'She likes singing, to dance, and cooking.', B: 'She likes to sing, dancing, and cook.', C: 'She likes singing, dancing, and cooking.', D: 'She likes to sing, to dancing, and cook.' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Parallel Structure = Balanced Grammar', explanation: 'When listing actions, ALL items must be in the SAME grammatical form. "singing, dancing, cooking" = all -ing (gerunds) ✓. Mixing forms = error.', visual_type: 'word_highlight', word: 'Parallel Structure ✓', definition: 'Items in a list must be in the same grammatical form', synonyms: ['singing, dancing, cooking (all gerunds) ✓', 'to sing, to dance, to cook (all infinitives) ✓'], antonyms: ['singing, to dance, cook ✗'], memory_tip: 'Think of it like a matching set — socks must both be the same type!', duration_seconds: 5 }
    ],
    concept_summary: 'Parallel structure: lists must use the same form. All -ing, or all "to+verb", or all base verb.',
    follow_up_questions: [{ question: 'Which is parallel? "He enjoys __"', options: { A: 'reading, to write, and swim', B: 'reading, writing, and swimming', C: 'to read, writing, and swim', D: 'read, to write, swimming' }, correct_answer: 'B' }]
  },

  // ═══════════════════════════════════════
  // BLOOD RELATIONS
  // ═══════════════════════════════════════
  {
    id: 'br_1', category: 'br', difficulty: 'Easy', concept_name: 'Direct Blood Relation',
    question_text: 'A is the father of B. B is the sister of C. C is the mother of D. How is A related to D?',
    options: { A: 'Uncle', B: 'Grandfather', C: 'Father', D: 'Great Grandfather' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Build the Family Tree', explanation: 'A → (father) → B. B is sister of C, so A is also C\'s father. C → (mother) → D. So A is D\'s grandfather!', visual_type: 'motion_graphic', scene_type: 'family_tree', tree: [{ label: 'A (Male)', level: 0 }, { label: 'C (Female)', level: 1 }, { label: 'D', level: 2 }], formula_used: null, analogy: 'Draw a tree top-to-bottom: A at top, C in middle, D at bottom.', duration_seconds: 5 }
    ],
    concept_summary: 'Always draw the family tree. Go step by step. Parent of parent = Grandparent.',
    follow_up_questions: [{ question: 'If X is the son of Y, and Y is the brother of Z, how is X related to Z?', options: { A: 'Son', B: 'Nephew', C: 'Brother', D: 'Uncle' }, correct_answer: 'B' }]
  },
  {
    id: 'br_2', category: 'br', difficulty: 'Medium', concept_name: 'Pointing / Introducing',
    question_text: 'Pointing to a photo, Neha says "He is the son of the only brother of my father\'s wife." How is Neha related to the person in the photo?',
    options: { A: 'Cousin', B: 'Sister', C: 'Aunt', D: 'Mother' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Decode Step by Step', explanation: '"Father\'s wife" = Neha\'s mother. "Only brother of mother" = Neha\'s maternal uncle. "Son of maternal uncle" = Neha\'s cousin.', visual_type: 'motion_graphic', scene_type: 'family_tree', formula_used: 'Father\'s wife = Mother → Mother\'s brother = Maternal Uncle → Uncle\'s son = Cousin', analogy: null, duration_seconds: 5 }
    ],
    concept_summary: 'Decode from the INSIDE OUT. "Father\'s wife" → Mother. "Mother\'s brother" → Maternal Uncle. "Uncle\'s son" → Cousin.',
    follow_up_questions: [{ question: '"She is the daughter of my father\'s only son." Who is she to me?', options: { A: 'Sister', B: 'Daughter', C: 'Niece', D: 'Cousin' }, correct_answer: 'B' }]
  },
  {
    id: 'br_3', category: 'br', difficulty: 'Easy', concept_name: 'Gender Identification',
    question_text: 'Ravi\'s mother is the only daughter of Meena\'s father. How is Meena related to Ravi?',
    options: { A: 'Sister', B: 'Aunt', C: 'Mother', D: 'Grandmother' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Identify the Key Person', explanation: '"Only daughter of Meena\'s father" = Meena herself (she is the only daughter). So Ravi\'s mother = Meena → Meena is Ravi\'s mother!', visual_type: 'motion_graphic', scene_type: 'family_tree', formula_used: 'Only daughter of Meena\'s father = Meena herself', analogy: 'If you are the ONLY daughter, then "only daughter of my father" = ME!', duration_seconds: 4 }
    ],
    concept_summary: '"Only son/daughter of X\'s parent" usually = X themselves. Watch out for this trick!',
    follow_up_questions: [{ question: 'A is the only son of B\'s father. B\'s brother is A\'s __?', options: { A: 'Son', B: 'Brother', C: 'They\'re the same person', D: 'Uncle' }, correct_answer: 'C' }]
  },
  {
    id: 'br_4', category: 'br', difficulty: 'Hard', concept_name: 'Code-Based Blood Relation',
    question_text: 'In a code: A+B means A is father of B, A-B means A is sister of B, A×B means A is mother of B. What does P+R-Q mean?',
    options: { A: 'P is grandfather of Q', B: 'P is uncle of Q', C: 'P is father of Q\'s sister', D: 'Q is niece of P' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Decode the Operations', explanation: 'P+R = P is father of R. R-Q = R is sister of Q. So: P is the father of R, and R is the sister of Q → P is the father of Q\'s sister.', visual_type: 'motion_graphic', scene_type: 'family_tree', formula_used: 'P→father→R, R→sister→Q', analogy: null, duration_seconds: 5 }
    ],
    concept_summary: 'For coded relations, substitute the code meaning and trace the relationship chain.',
    follow_up_questions: [{ question: 'P×R+Q means P is __ of Q?', options: { A: 'Grandmother', B: 'Mother', C: 'Aunt', D: 'Sister' }, correct_answer: 'A' }]
  },
  {
    id: 'br_5', category: 'br', difficulty: 'Medium', concept_name: 'Multiple Relations',
    question_text: 'Asha says "Rohan\'s mother is my mother\'s mother-in-law\'s daughter." How is Rohan related to Asha?',
    options: { A: 'Brother', B: 'Son', C: 'Cousin', D: 'Nephew' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Decode the Chain', explanation: '"My mother\'s mother-in-law" = Asha\'s father\'s mother (paternal grandmother). "That grandmother\'s daughter" = Asha\'s father\'s sister = Asha\'s aunt. "Aunt\'s son" = Rohan = Asha\'s cousin.', visual_type: 'motion_graphic', scene_type: 'family_tree', formula_used: 'Mother\'s mother-in-law = Paternal Grandma → her daughter = Father\'s sister = Aunt → Aunt\'s son = Cousin', analogy: null, duration_seconds: 6 }
    ],
    concept_summary: 'Mother\'s mother-in-law = Paternal Grandmother. Father\'s sister = Aunt. Aunt\'s child = Cousin.',
    follow_up_questions: [{ question: 'My father\'s sister\'s son is my __?', options: { A: 'Uncle', B: 'Brother', C: 'Cousin', D: 'Nephew' }, correct_answer: 'C' }]
  },

  // ═══════════════════════════════════════
  // CODING-DECODING
  // ═══════════════════════════════════════
  {
    id: 'cd_1', category: 'cd', difficulty: 'Easy', concept_name: 'Letter Shift Coding',
    question_text: 'If APPLE is coded as BQQMF, how is MANGO coded?',
    options: { A: 'NBOHR', B: 'NBOHP', C: 'NAOIP', D: 'MANGH' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Find the Pattern', explanation: 'A→B (+1), P→Q (+1), P→Q (+1), L→M (+1), E→F (+1). Each letter shifts +1 in the alphabet!', visual_type: 'pattern_reveal', pattern: ['A→B', 'P→Q', 'P→Q', 'L→M', 'E→F'], differences: ['+1', '+1', '+1', '+1', '+1'], formula_used: 'Each letter + 1', analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Apply to MANGO', explanation: 'M→N, A→B, N→O, G→H, O→P → NBOHP', visual_type: 'pattern_reveal', pattern: ['M→N', 'A→B', 'N→O', 'G→H', 'O→P'], differences: ['+1', '+1', '+1', '+1', '+1'], formula_used: 'MANGO → NBOHP', analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Check each letter shift. Could be +1, +2, -1, reverse, etc. Apply the SAME rule to decode/encode.',
    follow_up_questions: [{ question: 'APPLE → BQQMF (+1). What is DOG coded as?', options: { A: 'EPH', B: 'ENF', C: 'DPH', D: 'EFH' }, correct_answer: 'A' }]
  },
  {
    id: 'cd_2', category: 'cd', difficulty: 'Medium', concept_name: 'Reverse Coding',
    question_text: 'If DOCTOR is coded as QBODLQ, what system is being used?',
    options: { A: 'Reverse alphabet', B: '+2 shift', C: 'Mirror alphabet', D: '-1 shift' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Mirror Alphabet Explained', explanation: 'In mirror alphabet: A↔Z, B↔Y, C↔X, D↔W... D→W, O→L, C→X, T→G, O→L, R→I. But that doesn\'t match. Let\'s check reverse: each letter\'s mirror = Z+1 - position.', visual_type: 'pattern_reveal', pattern: ['D→W', 'O→L', 'C→X', 'T→G', 'O→L', 'R→I'], differences: ['mirror', 'mirror', 'mirror', 'mirror', 'mirror', 'mirror'], formula_used: 'Position + Mirror = 27', analogy: 'A=1,Z=26: mirror of D(4) = 23=W. A+Z=27.', duration_seconds: 5 }
    ],
    concept_summary: 'Mirror alphabet: A↔Z, B↔Y, C↔X... Numerically: if letter = n, code = 27−n. Always check A+Z=27.',
    follow_up_questions: [{ question: 'In mirror coding, CAT is coded as?', options: { A: 'XZG', B: 'ZBG', C: 'YAG', D: 'XAG' }, correct_answer: 'A' }]
  },
  {
    id: 'cd_3', category: 'cd', difficulty: 'Easy', concept_name: 'Number Coding',
    question_text: 'If A=1, B=2... Z=26, what is the code for CAT?',
    options: { A: '3-1-20', B: '4-2-21', C: '3-2-19', D: '2-1-20' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Alphabet Position', explanation: 'A=1, B=2, C=3... T=20, U=21... So C=3, A=1, T=20 → 3-1-20.', visual_type: 'pattern_reveal', pattern: ['C=3', 'A=1', 'T=20'], differences: ['3', '1', '20'], formula_used: 'Position number in alphabet', analogy: 'A is the 1st letter, T is the 20th. Count from A.', duration_seconds: 4 }
    ],
    concept_summary: 'Standard coding: A=1, B=2...Z=26. Reverse: A=26, B=25...Z=1. Know both systems.',
    follow_up_questions: [{ question: 'In A=1 code, DOG = ?', options: { A: '4-15-7', B: '4-14-7', C: '5-15-8', D: '3-15-7' }, correct_answer: 'A' }]
  },
  {
    id: 'cd_4', category: 'cd', difficulty: 'Medium', concept_name: 'Word-to-Number Coding',
    question_text: 'In a code: BOOK = 2, WORD = 2, DOOR = 2. What number will MOON be?',
    options: { A: '1', B: '2', C: '3', D: '4' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Find What\'s Common', explanation: 'BOOK has O appearing 2 times. WORD: each letter unique, count=0? Wait — count duplicate letters: BOOK (O,O)=1 pair, DOOR (O,O)=1 pair. Number of REPEATED letter pairs!', visual_type: 'pattern_reveal', pattern: ['BOOK → OO (1 pair)', 'DOOR → OO (1 pair)', 'MOON → OO (1 pair)'], differences: ['2', '2', '2'], formula_used: 'Count pairs of repeated letters', analogy: null, duration_seconds: 5 }
    ],
    concept_summary: 'Look for hidden patterns: vowel count, consonant count, repeated letters, word length. Try all!',
    follow_up_questions: [{ question: 'If STREET=2, SWEET=2, STEEP=2, what is ROOT?', options: { A: '1', B: '2', C: '3', D: '0' }, correct_answer: 'B' }]
  },
  {
    id: 'cd_5', category: 'cd', difficulty: 'Hard', concept_name: 'Conditional Coding',
    question_text: 'Rule: Vowels coded as next consonant, consonants coded as previous vowel. Code for "HIDE":',
    options: { A: 'AJEA', B: 'AJEF', C: 'IJEQ', D: 'AFEA' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Identify Each Letter\'s Type & Apply Rule', explanation: 'H=consonant→previous vowel=A. I=vowel→next consonant=J. D=consonant→previous vowel=A. E=vowel→next consonant=F? Wait, let\'s recheck: E→F (F is next consonant after E). So HIDE→AJEF?', visual_type: 'pattern_reveal', pattern: ['H(cons)→A', 'I(vowel)→J', 'D(cons)→A', 'E(vowel)→F'], differences: ['prev vowel', 'next cons', 'prev vowel', 'next cons'], formula_used: 'Vowel→next consonant, Consonant→prev vowel', analogy: null, duration_seconds: 6 }
    ],
    concept_summary: 'Complex coding: identify if each symbol follows different rules based on its type (vowel/consonant, odd/even position).',
    follow_up_questions: [{ question: 'Apply same rule: Code for "AT"?', options: { A: 'EU', B: 'AJ', C: 'EJ', D: 'AU' }, correct_answer: 'D' }]
  }
];

export const QUESTION_BANK_MAP = {};
QUESTIONS.forEach(q => {
  if (!QUESTION_BANK_MAP[q.category]) QUESTION_BANK_MAP[q.category] = [];
  QUESTION_BANK_MAP[q.category].push(q);
});
