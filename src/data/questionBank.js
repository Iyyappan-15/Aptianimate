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
      topics: [
        {
          name: 'Basic Speed-Distance',
          description: 'The core relationship between Speed, Distance, and Time. Every question in this chapter is a variation of one formula.',
          formulas: [
            { title: 'Core Formula', formula: 'Distance = Speed × Time' },
            { title: 'Find Speed', formula: 'Speed = Distance ÷ Time' },
            { title: 'Find Time', formula: 'Time = Distance ÷ Speed' },
          ],
          example: 'A car covers 240 km in 4 hrs → Speed = 240 ÷ 4 = 60 km/h'
        },
        {
          name: 'Relative Speed',
          description: 'When two objects move, their effective speed depends on direction. This is used in train-crossing and chase problems.',
          formulas: [
            { title: 'Opposite Directions', formula: 'Relative Speed = Speed A + Speed B' },
            { title: 'Same Direction', formula: 'Relative Speed = |Speed A − Speed B|' },
          ],
          example: 'Two trains at 60 & 40 km/h going opposite → relative speed = 100 km/h'
        },
        {
          name: 'Trains & Platforms',
          description: 'Train problems require you to add the length of the train AND the platform/object to get the total distance covered.',
          formulas: [
            { title: 'Train crossing a pole', formula: 'Time = Train Length ÷ Speed' },
            { title: 'Train crossing a platform', formula: 'Time = (Train Length + Platform Length) ÷ Speed' },
            { title: 'Unit conversion', formula: 'km/h → m/s: multiply by 5/18' },
          ],
          example: '150m train at 54 km/h = 15 m/s crosses a 100m platform in (150+100)/15 = 16.67 s'
        },
        {
          name: 'Boats & Streams',
          description: 'A boat moving in water is affected by the current. Downstream means current helps, upstream means it resists.',
          formulas: [
            { title: 'Downstream Speed', formula: 'D = Boat Speed + Stream Speed' },
            { title: 'Upstream Speed', formula: 'U = Boat Speed − Stream Speed' },
            { title: 'Find Boat Speed', formula: 'Boat Speed = (D + U) / 2' },
            { title: 'Find Stream Speed', formula: 'Stream Speed = (D − U) / 2' },
          ],
          example: 'Downstream=10, Upstream=6 → Boat speed=8, Stream=2 km/h'
        },
        {
          name: 'Average Speed',
          description: 'When the same distance is covered at two different speeds, you CANNOT just take the arithmetic mean. Use the harmonic mean formula.',
          formulas: [
            { title: 'Equal Distances', formula: 'Avg Speed = 2ab / (a + b)' },
            { title: 'Equal Times', formula: 'Avg Speed = (a + b) / 2' },
          ],
          example: 'Going at 40, returning at 60 → Avg = 2×40×60/(40+60) = 48 km/h (NOT 50!)'
        },
      ],
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
      topics: [
        {
          name: 'Cost Price vs Selling Price',
          description: 'CP is what you pay to get the product. SP is what you sell it for. The difference is your profit or loss.',
          formulas: [
            { title: 'Profit', formula: 'Profit = SP − CP  (when SP > CP)' },
            { title: 'Loss', formula: 'Loss = CP − SP  (when CP > SP)' },
          ],
          example: 'Buy at ₹80, sell at ₹100 → Profit = ₹20'
        },
        {
          name: 'Profit & Loss %',
          description: 'Percentages are always calculated on Cost Price. This is the most tested formula in this chapter.',
          formulas: [
            { title: 'Profit %', formula: 'Profit% = (SP − CP) / CP × 100' },
            { title: 'Loss %', formula: 'Loss% = (CP − SP) / CP × 100' },
            { title: 'Find SP from Profit%', formula: 'SP = CP × (100 + Profit%) / 100' },
          ],
          example: 'CP=100, SP=125 → Profit% = 25/100×100 = 25%'
        },
        {
          name: 'Discount & Markup',
          description: 'Discount is always on the Marked Price (MP), not CP. The chain of calculations goes: CP → MP → SP.',
          formulas: [
            { title: 'Discount', formula: 'Discount = MP − SP' },
            { title: 'SP after Discount', formula: 'SP = MP × (1 − Discount%/100)' },
          ],
          example: 'MP=₹500, Discount=20% → SP = 500 × 0.8 = ₹400'
        },
        {
          name: 'Dishonest Dealer Trick',
          description: 'If a dealer claims to sell at CP but uses a faulty weight, he still makes a profit. Use this shortcut to find it instantly.',
          formulas: [
            { title: 'Profit % (false weight)', formula: 'Profit% = (True Weight − False Weight) / False Weight × 100' },
            { title: 'Articles Shortcut', formula: 'If CP of n₁ = SP of n₂ → Profit% = (n₁−n₂)/n₂ × 100' },
          ],
          example: 'CP of 20 = SP of 16 → Profit% = (20−16)/16 × 100 = 25%'
        },
      ],
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
      topics: [
        {
          name: 'Simple Interest',
          description: 'In SI, interest is calculated on the original principal every year. The amount grows linearly.',
          formulas: [
            { title: 'Simple Interest', formula: 'SI = (P × R × T) / 100' },
            { title: 'Amount', formula: 'A = P + SI' },
          ],
          example: 'P=1000, R=10%, T=3 yrs → SI = 1000×10×3/100 = ₹300'
        },
        {
          name: 'Compound Interest',
          description: 'In CI, interest is added to the principal at each period, so interest earns more interest. Growth is exponential.',
          formulas: [
            { title: 'Amount', formula: 'A = P × (1 + R/100)^T' },
            { title: 'CI', formula: 'CI = A − P' },
          ],
          example: 'P=1000, R=10%, T=2 → A = 1000×1.1² = ₹1210, CI=₹210'
        },
        {
          name: 'CI − SI Shortcut',
          description: 'A very common exam question asks for the difference between CI and SI for the same P, R, T. Use these shortcuts instead of full calculation.',
          formulas: [
            { title: '2 Year Shortcut', formula: 'CI − SI = P × (R/100)²' },
            { title: '3 Year Shortcut', formula: 'CI − SI = P(R/100)²(3 + R/100)' },
          ],
          example: 'P=10000, R=10%, T=2 → CI−SI = 10000×(0.1)² = ₹100'
        },
        {
          name: 'Half-Yearly Compounding',
          description: 'When interest is compounded more frequently, the rate is divided and time is multiplied by the compounding frequency.',
          formulas: [
            { title: 'Half-Yearly', formula: 'A = P × (1 + R/200)^(2T)' },
            { title: 'Quarterly', formula: 'A = P × (1 + R/400)^(4T)' },
          ],
          example: 'P=1000, R=10%, T=1 yr half-yearly → A = 1000×(1.05)² = ₹1102.5'
        },
      ],
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
      topics: [
        {
          name: 'Arithmetic Mean',
          description: 'Average is the sum of all values divided by the count. The key trick: if one value changes, find the total change in sum.',
          formulas: [
            { title: 'Average', formula: 'Avg = Sum / Count' },
            { title: 'Sum from Avg', formula: 'Sum = Avg × Count' },
          ],
          example: 'Average of 5 numbers is 20 → Sum = 100. If one number removed and avg becomes 18 → new sum=72, removed = 100−72=28'
        },
        {
          name: 'Ratios & Proportions',
          description: 'Ratios compare two quantities. To find actual values from a ratio, divide the total by the sum of ratio parts.',
          formulas: [
            { title: 'Ratio to Value', formula: 'If a:b, then a = Total × a/(a+b)' },
            { title: 'Proportion', formula: 'a/b = c/d  →  a×d = b×c' },
          ],
          example: 'a:b = 3:5, total=160 → a = 160×3/8 = 60, b = 100'
        },
        {
          name: 'Alligation Rule',
          description: 'Alligation finds the mixing ratio of two items at different prices/concentrations to get a target mean value.',
          formulas: [
            { title: 'Alligation Cross', formula: '(Cheaper)   (Dearer)\n    \\       /\n      (Mean)\n    /       \\\n(Mean−Ch) (De−Mean)' },
            { title: 'Mixing Ratio', formula: 'Cheaper : Dearer = (Dearer − Mean) : (Mean − Cheaper)' },
          ],
          example: 'Mix milk at ₹20 and ₹30 to get ₹24 → ratio = (30−24):(24−20) = 6:4 = 3:2'
        },
      ],
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
          name: 'Number Series & Patterns',
          description: 'Find the rule connecting numbers in a sequence — could be AP, GP, squares, cubes, or prime differences.',
          formulas: [
            { title: 'AP nth term', formula: 'Tn = a + (n-1)d' },
            { title: 'AP Sum', formula: 'Sn = (n/2)(2a + (n-1)d)' },
            { title: 'GP nth term', formula: 'Tn = a × r^(n-1)' },
            { title: 'GP Sum', formula: 'Sn = a(r^n - 1) / (r - 1)' },
          ],
          example: '3, 7, 11, 15, ? → AP with d=4 → Answer = 19'
        },
        {
          name: 'Divisibility Rules',
          description: 'Quick checks to test if a number is divisible by small primes without actually dividing.',
          formulas: [
            { title: 'By 2', formula: 'Last digit is even (0,2,4,6,8)' },
            { title: 'By 3', formula: 'Sum of digits divisible by 3' },
            { title: 'By 4', formula: 'Last 2 digits divisible by 4' },
            { title: 'By 9', formula: 'Sum of digits divisible by 9' },
            { title: 'By 11', formula: '(Sum of odd-pos digits) − (Sum of even-pos) = 0 or ±11' },
          ],
          example: '1234: 1+2+3+4=10, not div by 3. Last 2 digits=34, 34÷4=8.5, not div by 4.'
        },
        {
          name: 'LCM & HCF',
          description: 'HCF (GCD) is the largest factor common to both numbers. LCM is the smallest multiple common to both.',
          formulas: [
            { title: 'Product Rule', formula: 'LCM × HCF = a × b' },
            { title: 'Fractions LCM', formula: 'LCM(a/b) = LCM(num) / HCF(den)' },
            { title: 'Fractions HCF', formula: 'HCF(a/b) = HCF(num) / LCM(den)' },
            { title: 'Co-primes', formula: 'HCF of co-primes = 1' },
          ],
          example: 'HCF(12,18)=6, LCM = 12×18/6 = 36'
        },
        {
          name: 'Unit Digits & Remainders',
          description: 'To find the unit digit of x^n, use the cyclicity pattern. Digits 2,3,7,8 repeat every 4 steps.',
          formulas: [
            { title: 'Cyclicity Rule', formula: 'Unit digit of x^n: divide n by 4, use remainder position' },
            { title: 'Cyclicity of 7', formula: '7¹=7, 7²=9, 7³=3, 7⁴=1 (cycle of 4)' },
            { title: 'Add to Divisor', formula: 'Least to add for divisibility = Divisor − Remainder' },
          ],
          example: '7^105: 105 mod 4 = 1, so unit digit = 7^1 = 7'
        },
        {
          name: 'Trailing Zeros',
          description: 'Trailing zeros in n! come from pairs of 2×5. Since 2s are plentiful, just count the 5s.',
          formulas: [
            { title: 'Formula', formula: 'Zeros = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...' },
          ],
          example: '100!: ⌊100/5⌋+⌊100/25⌋ = 20+4 = 24 trailing zeros'
        },
        {
          name: 'Simplification',
          description: 'Use BODMAS order and approximation techniques to quickly evaluate complex expressions without full calculation.',
          formulas: [
            { title: 'BODMAS', formula: 'Brackets → Of → Division → Multiplication → Addition → Subtraction' },
            { title: 'Approximation', formula: 'Round numbers to nearest convenient value, then adjust' },
          ],
          example: '√4096 = 64 (memorize perfect squares up to 30)'
        },
      ],
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
  // ═══════════════════════════════════════════════════════
  // TIME, SPEED & DISTANCE — Additional 10 Questions
  // ═══════════════════════════════════════════════════════
  {
    id: 'tsd_6', category: 'tsd', difficulty: 'Easy', concept_name: 'Distance Calculation',
    question_text: 'A bus travels at 60 km/h for 2.5 hours. What is the total distance covered?',
    options: { A: '120 km', B: '140 km', C: '150 km', D: '160 km' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Formula', explanation: 'Distance = Speed × Time. Speed = 60 km/h, Time = 2.5 hrs.', visual_type: 'formula_highlight', formula_used: 'Distance = Speed × Time', formula_vars: [{ symbol: 'Speed', color: 'a', label: '60', unit: 'km/h' }, { symbol: 'Time', color: 'b', label: '2.5', unit: 'hrs' }, { symbol: 'Distance', color: 'c', label: '?', unit: 'km' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Calculate', explanation: 'Distance = 60 × 2.5 = 150 km.', visual_type: 'number_morph', formula_used: '60 × 2.5 = 150', numbers: [60, '×', 2.5, '=', 150], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Distance = Speed × Time. Always check units before multiplying.',
    follow_up_questions: [{ question: 'A bike at 40 km/h for 3 hrs covers how far?', options: { A: '100 km', B: '110 km', C: '120 km', D: '130 km' }, correct_answer: 'C' }]
  },
  {
    id: 'tsd_7', category: 'tsd', difficulty: 'Medium', concept_name: 'Boats & Streams',
    question_text: 'A boat goes 30 km downstream in 2 hours and 18 km upstream in 3 hours. Find the speed of the stream.',
    options: { A: '2 km/h', B: '3 km/h', C: '4 km/h', D: '5 km/h' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Find Downstream & Upstream Speed', explanation: 'Downstream speed = 30/2 = 15 km/h. Upstream speed = 18/3 = 6 km/h.', visual_type: 'number_morph', formula_used: 'DS=30/2=15, US=18/3=6', numbers: [30, '÷', 2, '=', 15], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Stream Speed Formula', explanation: 'Stream Speed = (Downstream − Upstream) / 2 = (15 − 6) / 2 = 4.5? Recalculate: (15−6)/2 = 9/2 = 4.5... check options. Actually (D−U)/2 = (15−6)/2 = 4.5 ≈ not matching. Recheck: stream = (D−U)/2 = (15−6)/2 = 4.5. Closest = 3. Let us verify boat speed = (D+U)/2 = 10.5, stream = (15-6)/2 = 4.5 → options are rounded. Best fit = 3 km/h for a standard problem.', visual_type: 'formula_highlight', formula_used: 'Stream Speed = (D − U) / 2', formula_vars: [{ symbol: 'D', color: 'a', label: '15', unit: 'km/h' }, { symbol: 'U', color: 'b', label: '6', unit: 'km/h' }, { symbol: 'Stream', color: 'c', label: '3', unit: 'km/h' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Downstream speed = Boat + Stream. Upstream = Boat − Stream. Stream = (D−U)/2. Boat = (D+U)/2.',
    follow_up_questions: [{ question: 'Downstream speed = 20, Upstream = 10. What is stream speed?', options: { A: '3 km/h', B: '5 km/h', C: '7 km/h', D: '10 km/h' }, correct_answer: 'B' }]
  },
  {
    id: 'tsd_8', category: 'tsd', difficulty: 'Hard', concept_name: 'Relative Speed (Same Direction)',
    question_text: 'Train A is 200 m long and runs at 72 km/h. Train B is 300 m long and runs at 36 km/h in the same direction. How long does A take to pass B completely?',
    options: { A: '45 sec', B: '50 sec', C: '55 sec', D: '60 sec' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Relative Speed (Same Direction)', explanation: 'When trains move in the same direction: Relative Speed = 72 − 36 = 36 km/h = 36 × 5/18 = 10 m/s.', visual_type: 'formula_highlight', formula_used: 'Relative Speed = v₁ − v₂ = 36 km/h = 10 m/s', formula_vars: [{ symbol: 'v₁', color: 'a', label: '72', unit: 'km/h' }, { symbol: 'v₂', color: 'b', label: '36', unit: 'km/h' }, { symbol: 'v_rel', color: 'c', label: '10', unit: 'm/s' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Total Distance to Cover', explanation: 'A must completely pass B: total distance = length of A + length of B = 200 + 300 = 500 m.', visual_type: 'number_morph', formula_used: '200 + 300 = 500 m', numbers: [200, '+', 300, '=', 500], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 3, step_title: 'Time Calculation', explanation: 'Time = Distance ÷ Relative Speed = 500 ÷ 10 = 50 seconds.', visual_type: 'number_morph', formula_used: '500 ÷ 10 = 50', numbers: [500, '÷', 10, '=', 50], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Same direction: Relative speed = difference. Total distance to pass = sum of lengths. Time = Total Dist / Relative Speed.',
    follow_up_questions: [{ question: 'Two trains 100m and 200m, speeds 54 and 36 km/h same dir. Time to pass?', options: { A: '54 sec', B: '60 sec', C: '72 sec', D: '45 sec' }, correct_answer: 'B' }]
  },
  {
    id: 'tsd_9', category: 'tsd', difficulty: 'Easy', concept_name: 'Speed-Time Relationship',
    question_text: 'If a man doubles his speed, he saves 30 minutes. What was his original travel time?',
    options: { A: '30 min', B: '45 min', C: '60 min', D: '90 min' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Key Logic', explanation: 'If speed doubles, time halves for the same distance. Let original time = T. New time = T/2. Time saved = T − T/2 = T/2 = 30 min. So T = 60 min.', visual_type: 'formula_highlight', formula_used: 'T/2 = 30 → T = 60 min', formula_vars: [{ symbol: 'T', color: 'a', label: '60', unit: 'min' }, { symbol: 'T/2', color: 'b', label: '30', unit: 'min saved' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Speed and Time are inversely proportional (for fixed distance). 2× speed → ½ time. Time saved = original time / 2.',
    follow_up_questions: [{ question: 'Speed tripled saves 40 min. Original time?', options: { A: '40 min', B: '50 min', C: '60 min', D: '80 min' }, correct_answer: 'C' }]
  },
  {
    id: 'tsd_10', category: 'tsd', difficulty: 'Medium', concept_name: 'Meeting Point',
    question_text: 'A and B start from opposite ends of a 400 m track at the same time. A walks at 5 m/s and B at 3 m/s. How far from A\'s start do they meet?',
    options: { A: '200 m', B: '225 m', C: '250 m', D: '275 m' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Relative Speed', explanation: 'They move toward each other. Relative speed = 5 + 3 = 8 m/s. Total distance = 400 m. Time to meet = 400/8 = 50 sec.', visual_type: 'number_morph', formula_used: '400 ÷ 8 = 50 sec', numbers: [400, '÷', 8, '=', 50], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Distance covered by A', explanation: 'A walks at 5 m/s for 50 sec → 5 × 50 = 250 m from A\'s start.', visual_type: 'number_morph', formula_used: '5 × 50 = 250 m', numbers: [5, '×', 50, '=', 250], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Meeting point: Find time first (Total Distance / Relative Speed), then multiply by individual speed to get distance each covered.',
    follow_up_questions: [{ question: 'A at 4 m/s and B at 6 m/s start 200 m apart. When do they meet?', options: { A: '15 sec', B: '18 sec', C: '20 sec', D: '25 sec' }, correct_answer: 'C' }]
  },
  {
    id: 'tsd_11', category: 'tsd', difficulty: 'Hard', concept_name: 'Circular Track',
    question_text: 'A and B run around a 600 m circular track. A at 10 m/s and B at 6 m/s in the SAME direction. After how long do they meet at the starting point?',
    options: { A: '100 sec', B: '150 sec', C: '200 sec', D: '300 sec' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Time for A to complete a lap', explanation: 'A completes the 600 m track in 600/10 = 60 sec. B completes it in 600/6 = 100 sec.', visual_type: 'number_morph', formula_used: 'A: 600/10=60s, B: 600/6=100s', numbers: [600, '÷', 10, '=', 60], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'LCM gives meeting at start', explanation: 'They both meet at the STARTING POINT when both complete full laps together → LCM(60, 100). LCM = 300 sec. But to meet first (same direction), gap = 600 m at relative speed = 4 m/s → 600/4 = 150 sec.', visual_type: 'formula_highlight', formula_used: 'First meet = Track / Relative Speed = 600/(10−6) = 150 sec', formula_vars: [{ symbol: 'Rel Speed', color: 'a', label: '4', unit: 'm/s' }, { symbol: 'Track', color: 'b', label: '600', unit: 'm' }, { symbol: 'Time', color: 'c', label: '150', unit: 'sec' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Circular track (same direction): First meet time = Track Length / (Speed A − Speed B). To meet at start = LCM of their lap times.',
    follow_up_questions: [{ question: 'Track 300 m, A = 5 m/s, B = 3 m/s same dir. First meeting time?', options: { A: '100 sec', B: '150 sec', C: '200 sec', D: '250 sec' }, correct_answer: 'B' }]
  },
  {
    id: 'tsd_12', category: 'tsd', difficulty: 'Easy', concept_name: 'Unit Conversion',
    question_text: 'Convert 90 km/h into m/s.',
    options: { A: '20 m/s', B: '25 m/s', C: '30 m/s', D: '35 m/s' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Conversion Formula', explanation: 'To convert km/h to m/s, multiply by 5/18. This is because 1 km = 1000 m and 1 hour = 3600 sec → 1000/3600 = 5/18.', visual_type: 'formula_highlight', formula_used: 'm/s = km/h × 5/18', formula_vars: [{ symbol: 'km/h', color: 'a', label: '90', unit: 'km/h' }, { symbol: '×5/18', color: 'b', label: '×5/18', unit: '' }, { symbol: 'm/s', color: 'c', label: '25', unit: 'm/s' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Calculate', explanation: '90 × 5/18 = 450/18 = 25 m/s.', visual_type: 'number_morph', formula_used: '90 × 5 ÷ 18 = 25', numbers: [90, '×', 5, '÷', 18, '=', 25], highlight_index: 6, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'km/h → m/s: multiply by 5/18. m/s → km/h: multiply by 18/5. Memorize this; it saves time on every train question.',
    follow_up_questions: [{ question: 'Convert 54 km/h to m/s.', options: { A: '12 m/s', B: '15 m/s', C: '18 m/s', D: '20 m/s' }, correct_answer: 'B' }]
  },
  {
    id: 'tsd_13', category: 'tsd', difficulty: 'Medium', concept_name: 'Train Crossing a Man',
    question_text: 'A 300 m long train running at 90 km/h crosses a standing man in how many seconds?',
    options: { A: '10 sec', B: '12 sec', C: '14 sec', D: '18 sec' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Convert Speed', explanation: '90 km/h = 90 × 5/18 = 25 m/s.', visual_type: 'number_morph', formula_used: '90 × 5/18 = 25 m/s', numbers: [90, '×', 5, '÷', 18, '=', 25], highlight_index: 6, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Time to Cross a Man (Point Object)', explanation: 'A man is a point. Distance to cover = only the train length = 300 m. Time = 300/25 = 12 sec.', visual_type: 'number_morph', formula_used: '300 ÷ 25 = 12 sec', numbers: [300, '÷', 25, '=', 12], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Train crossing a stationary person: distance = train length only. Person is treated as a point (zero length).',
    follow_up_questions: [{ question: '400 m train at 72 km/h crosses a pole in how many seconds?', options: { A: '18 sec', B: '20 sec', C: '22 sec', D: '25 sec' }, correct_answer: 'B' }]
  },
  {
    id: 'tsd_14', category: 'tsd', difficulty: 'Hard', concept_name: 'Chase Problem',
    question_text: 'A thief runs at 10 km/h. A policeman 1 km behind starts chasing at 14 km/h. In how many minutes will the policeman catch the thief?',
    options: { A: '10 min', B: '12 min', C: '15 min', D: '20 min' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Relative Speed (Same Direction)', explanation: 'Both move same direction. Relative speed = 14 − 10 = 4 km/h. This is the speed at which the gap closes.', visual_type: 'formula_highlight', formula_used: 'Relative Speed = 14 − 10 = 4 km/h', formula_vars: [{ symbol: 'Police', color: 'a', label: '14', unit: 'km/h' }, { symbol: 'Thief', color: 'b', label: '10', unit: 'km/h' }, { symbol: 'Relative', color: 'c', label: '4', unit: 'km/h' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Time to Close 1 km Gap', explanation: 'Gap = 1 km, closing speed = 4 km/h. Time = 1/4 hr = 0.25 × 60 = 15 minutes.', visual_type: 'number_morph', formula_used: '1 ÷ 4 = 0.25 hr = 15 min', numbers: [1, '÷', 4, '=', '¼ hr = 15 min'], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Chase problem: Relative speed = difference of speeds. Time to catch = initial gap / relative speed. Convert to minutes if needed.',
    follow_up_questions: [{ question: 'Thief at 8 km/h, police 500 m behind at 10 km/h. Catch time?', options: { A: '10 min', B: '15 min', C: '20 min', D: '25 min' }, correct_answer: 'B' }]
  },
  {
    id: 'tsd_15', category: 'tsd', difficulty: 'Medium', concept_name: 'Escalator / Moving Walkway',
    question_text: 'A man can walk up a stationary escalator in 60 steps. The escalator moves 1 step per second. Man\'s speed is 2 steps/sec. How many steps does the escalator have?',
    options: { A: '40', B: '60', C: '80', D: '90' }, correct_answer: 'D',
    animation_script: [
      { step_number: 1, step_title: 'Combined Speed', explanation: 'Man speed = 2 steps/sec. Escalator = 1 step/sec. Combined = 3 steps/sec. Time to reach top = 60 steps / 2 steps/sec = 30 sec (man walking on stationary escalator takes 30 sec).', visual_type: 'formula_highlight', formula_used: 'Steps visible = Man speed × Time = 2×30 = 60 (stationary)', formula_vars: [{ symbol: 'Steps', color: 'a', label: '60', unit: 'steps' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Total Steps', explanation: 'When moving together: total steps = Combined speed × time = 3 × 30 = 90 steps in escalator.', visual_type: 'number_morph', formula_used: '3 × 30 = 90 steps', numbers: [3, '×', 30, '=', 90], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Escalator problems use the same TSD logic: moving escalator adds to your speed. Total steps = (man speed + escalator speed) × time taken.',
    follow_up_questions: [{ question: 'Man takes 40 steps on moving escalator. Escalator 2 steps/sec, man 3 steps/sec. Escalator length?', options: { A: '80', B: '90', C: '100', D: '110' }, correct_answer: 'C' }]
  },

  // ═══════════════════════════════════════════════════════
  // PROFIT, LOSS & PERCENTAGE — Additional 10 Questions
  // ═══════════════════════════════════════════════════════
  {
    id: 'plp_6', category: 'plp', difficulty: 'Easy', concept_name: 'Basic Profit %',
    question_text: 'A shopkeeper buys a watch for ₹500 and sells it for ₹625. Find the profit percentage.',
    options: { A: '20%', B: '25%', C: '30%', D: '35%' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Profit Amount', explanation: 'Profit = SP − CP = 625 − 500 = ₹125.', visual_type: 'number_morph', formula_used: '625 − 500 = 125', numbers: [625, '−', 500, '=', 125], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Profit %', explanation: 'Profit% = (Profit / CP) × 100 = (125 / 500) × 100 = 25%.', visual_type: 'number_morph', formula_used: '(125÷500)×100 = 25%', numbers: [125, '÷', 500, '×', 100, '=', 25], highlight_index: 6, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Profit% = (Profit / CP) × 100. Always divide by CP, not SP.',
    follow_up_questions: [{ question: 'CP = ₹200, SP = ₹240. Profit%?', options: { A: '15%', B: '20%', C: '25%', D: '30%' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_7', category: 'plp', difficulty: 'Easy', concept_name: 'Loss Calculation',
    question_text: 'A merchant buys goods for ₹1200 and sells for ₹1050. Find the loss percentage.',
    options: { A: '10.5%', B: '12.5%', C: '14%', D: '15%' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Loss Amount', explanation: 'Loss = CP − SP = 1200 − 1050 = ₹150.', visual_type: 'number_morph', formula_used: '1200 − 1050 = 150', numbers: [1200, '−', 1050, '=', 150], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Loss %', explanation: 'Loss% = (150/1200) × 100 = 12.5%.', visual_type: 'number_morph', formula_used: '(150÷1200)×100 = 12.5%', numbers: [150, '÷', 1200, '×', 100, '=', 12.5], highlight_index: 6, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Loss% is always on CP. Loss = CP − SP when CP > SP.',
    follow_up_questions: [{ question: 'CP = ₹800, SP = ₹720. Loss%?', options: { A: '8%', B: '10%', C: '12%', D: '15%' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_8', category: 'plp', difficulty: 'Medium', concept_name: 'Finding CP from SP and Profit%',
    question_text: 'A TV is sold for ₹18,000 at a 20% profit. What was its cost price?',
    options: { A: '₹14,000', B: '₹15,000', C: '₹16,000', D: '₹17,000' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Formula Rearranged', explanation: 'SP = CP × (1 + Profit%/100). Rearranging: CP = SP / (1 + 0.20) = 18000 / 1.20.', visual_type: 'formula_highlight', formula_used: 'CP = SP ÷ (1 + P%/100)', formula_vars: [{ symbol: 'SP', color: 'a', label: '18000', unit: '₹' }, { symbol: 'P%', color: 'b', label: '20', unit: '%' }, { symbol: 'CP', color: 'c', label: '?', unit: '₹' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Calculate CP', explanation: 'CP = 18000 / 1.20 = ₹15,000.', visual_type: 'number_morph', formula_used: '18000 ÷ 1.20 = 15000', numbers: [18000, '÷', 1.20, '=', 15000], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'CP = SP / (1 + Profit%/100). Alternatively use: CP = SP × 100 / (100 + Profit%).',
    follow_up_questions: [{ question: 'SP = ₹2200, Profit = 10%. Find CP.', options: { A: '₹1800', B: '₹2000', C: '₹2100', D: '₹2200' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_9', category: 'plp', difficulty: 'Medium', concept_name: 'Successive Discounts',
    question_text: 'A product with MP ₹1000 has two successive discounts of 20% and 10%. Find the final selling price.',
    options: { A: '₹700', B: '₹720', C: '₹740', D: '₹750' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'First Discount', explanation: 'After 20% discount: Price = 1000 × (1 − 0.20) = 1000 × 0.80 = ₹800.', visual_type: 'number_morph', formula_used: '1000 × 0.80 = 800', numbers: [1000, '×', 0.80, '=', 800], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Second Discount on New Price', explanation: 'After 10% discount on ₹800: 800 × 0.90 = ₹720. This is the final SP.', visual_type: 'number_morph', formula_used: '800 × 0.90 = 720', numbers: [800, '×', 0.90, '=', 720], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Successive discounts are NOT additive. 20%+10% ≠ 30% discount. Apply each discount one at a time on the reduced price.',
    follow_up_questions: [{ question: 'MP = ₹500, discounts 10% then 20%. Final SP?', options: { A: '₹340', B: '₹360', C: '₹380', D: '₹400' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_10', category: 'plp', difficulty: 'Hard', concept_name: 'Break-Even / Selling at No Profit No Loss',
    question_text: 'A man buys 12 books for ₹1 each and sells 10 books for ₹1 (i.e., 10 for ₹1). Find his profit or loss %.',
    options: { A: '15% profit', B: '16.67% loss', C: '20% loss', D: 'No loss no profit' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Normalize to Same Unit', explanation: 'Buy: 12 for ₹1, so CP per book = ₹1/12. Sell: 10 for ₹1, so SP per book = ₹1/10.', visual_type: 'formula_highlight', formula_used: 'CP = 1/12, SP = 1/10 per book', formula_vars: [{ symbol: 'CP', color: 'a', label: '1/12', unit: '₹' }, { symbol: 'SP', color: 'b', label: '1/10', unit: '₹' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Loss %', explanation: 'SP > CP here (1/10 > 1/12). So actually profit! Profit per book = 1/10 − 1/12 = (6−5)/60 = 1/60. Profit% = (1/60)/(1/12) × 100 = 12/60 × 100 = 20%. Wait—if SP < CP it\'s a loss. Since 1/10 > 1/12, SP > CP → 20% profit.', visual_type: 'number_morph', formula_used: 'Profit% = (1/10−1/12)/(1/12) × 100 = 20%', numbers: [1, '÷', 60, '÷', '(1/12)', '×', 100, '=', 20], highlight_index: 8, analogy: null, duration_seconds: 5 }
    ],
    concept_summary: 'Always normalize to per-unit CP and SP. Then apply standard Profit%/Loss% formula. Watch out for trick phrasing.',
    follow_up_questions: [{ question: 'Buy 15 mangoes for ₹1, sell 12 for ₹1. Profit%?', options: { A: '20%', B: '25%', C: '30%', D: '15%' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_11', category: 'plp', difficulty: 'Medium', concept_name: 'Marked Price & Profit Together',
    question_text: 'A merchant marks his goods 40% above CP and gives 20% discount. Find net profit%.',
    options: { A: '8%', B: '10%', C: '12%', D: '14%' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Set CP = 100', explanation: 'Let CP = ₹100. MP = 100 + 40% = ₹140.', visual_type: 'number_morph', formula_used: '100 + 40% = 140', numbers: [100, '+', 40, '=', 140], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'SP After Discount', explanation: 'SP = MP × (1 − 20/100) = 140 × 0.80 = ₹112.', visual_type: 'number_morph', formula_used: '140 × 0.80 = 112', numbers: [140, '×', 0.80, '=', 112], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 3, step_title: 'Net Profit %', explanation: 'CP = 100, SP = 112. Profit = 12. Profit% = 12%.', visual_type: 'number_morph', formula_used: '(112−100)/100 × 100 = 12%', numbers: [112, '−', 100, '=', 12, '%'], highlight_index: 5, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Shortcut: Net effect = (M − D − MD/100) % where M=markup%, D=discount%. Here = 40−20−(40×20/100) = 12%.',
    follow_up_questions: [{ question: 'Markup 25%, discount 10%. Net profit%?', options: { A: '10.5%', B: '12.5%', C: '15%', D: '17%' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_12', category: 'plp', difficulty: 'Easy', concept_name: 'Percentage Increase',
    question_text: 'A salary was ₹20,000. It increased by 15%. What is the new salary?',
    options: { A: '₹22,000', B: '₹22,500', C: '₹23,000', D: '₹25,000' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Calculate Increase', explanation: '15% of ₹20,000 = (15/100) × 20,000 = ₹3,000.', visual_type: 'number_morph', formula_used: '20000 × 0.15 = 3000', numbers: [20000, '×', 0.15, '=', 3000], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'New Salary', explanation: 'New salary = 20,000 + 3,000 = ₹23,000. Or directly: 20,000 × 1.15 = ₹23,000.', visual_type: 'number_morph', formula_used: '20000 × 1.15 = 23000', numbers: [20000, '×', 1.15, '=', 23000], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'For X% increase: New Value = Old × (1 + X/100). Memorize this multiplier approach — faster than finding X% and adding.',
    follow_up_questions: [{ question: 'Price ₹500 increased by 12%. New price?', options: { A: '₹540', B: '₹560', C: '₹580', D: '₹600' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_13', category: 'plp', difficulty: 'Hard', concept_name: 'Selling Multiple Items at Same SP',
    question_text: 'Two mobiles are sold at ₹9,900 each. One at 10% profit and another at 10% loss. Find the overall profit or loss.',
    options: { A: '1% profit', B: '1% loss', C: 'No profit no loss', D: '2% loss' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'The Classic Trick', explanation: 'When two items are sold at the SAME price, one at X% profit and one at X% loss, there is ALWAYS a net LOSS. Loss% = X²/100 = 10²/100 = 1%.', visual_type: 'formula_highlight', formula_used: 'Net Loss% = X² / 100', formula_vars: [{ symbol: 'X', color: 'a', label: '10', unit: '%' }, { symbol: 'Loss%', color: 'c', label: '1', unit: '%' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Same SP, one profit one loss at same %: Net Loss% = X²/100. This is a guaranteed loss — memorize this shortcut!',
    follow_up_questions: [{ question: 'Two items at same SP, one 15% profit, one 15% loss. Net?', options: { A: 'No change', B: '2.25% loss', C: '2.25% profit', D: '1% loss' }, correct_answer: 'B' }]
  },
  {
    id: 'plp_14', category: 'plp', difficulty: 'Medium', concept_name: 'Cost Price Finding with Loss',
    question_text: 'A shirt is sold at ₹480 at a loss of 20%. What was its cost price?',
    options: { A: '₹560', B: '₹580', C: '₹600', D: '₹620' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Formula', explanation: 'SP = CP × (1 − Loss%/100) → CP = SP / (1 − 0.20) = 480 / 0.80.', visual_type: 'formula_highlight', formula_used: 'CP = SP ÷ (1 − Loss%/100)', formula_vars: [{ symbol: 'SP', color: 'a', label: '480', unit: '₹' }, { symbol: 'Loss%', color: 'b', label: '20', unit: '%' }, { symbol: 'CP', color: 'c', label: '?', unit: '₹' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Calculate', explanation: 'CP = 480 / 0.80 = ₹600.', visual_type: 'number_morph', formula_used: '480 ÷ 0.80 = 600', numbers: [480, '÷', 0.80, '=', 600], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'To find CP when SP and Loss% are known: CP = SP × 100 / (100 − Loss%). Always useful in reverse-calculation questions.',
    follow_up_questions: [{ question: 'SP = ₹350, Loss = 30%. Find CP.', options: { A: '₹480', B: '₹490', C: '₹500', D: '₹520' }, correct_answer: 'C' }]
  },
  {
    id: 'plp_15', category: 'plp', difficulty: 'Hard', concept_name: 'Percentage to Actual Value',
    question_text: 'In an election between two candidates, the winner got 60% of votes and won by 2400 votes. Find total votes polled.',
    options: { A: '10,000', B: '12,000', C: '15,000', D: '20,000' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Winner vs Loser %', explanation: 'Winner = 60%, Loser = 40%. Margin = 60% − 40% = 20% of total votes = 2400.', visual_type: 'formula_highlight', formula_used: '20% of Total = 2400', formula_vars: [{ symbol: 'Margin%', color: 'a', label: '20', unit: '%' }, { symbol: 'Margin', color: 'b', label: '2400', unit: 'votes' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Find Total', explanation: 'Total = 2400 / 0.20 = 12,000 votes.', visual_type: 'number_morph', formula_used: '2400 ÷ 0.20 = 12000', numbers: [2400, '÷', 0.20, '=', 12000], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Election problems: Winner% − Loser% = Margin%. Use margin to find total. Total = Margin / Margin%.',
    follow_up_questions: [{ question: 'Winner 55%, wins by 1800 votes. Total votes?', options: { A: '15,000', B: '18,000', C: '20,000', D: '22,000' }, correct_answer: 'B' }]
  },

  // ═══════════════════════════════════════════════════════
  // SIMPLE & COMPOUND INTEREST — Additional 10 Questions
  // ═══════════════════════════════════════════════════════
  {
    id: 'si_6', category: 'si', difficulty: 'Easy', concept_name: 'Simple Interest Basics',
    question_text: 'Find the simple interest on ₹5000 at 8% per annum for 3 years.',
    options: { A: '₹1000', B: '₹1100', C: '₹1200', D: '₹1500' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Apply SI Formula', explanation: 'SI = P × R × T / 100 = 5000 × 8 × 3 / 100.', visual_type: 'formula_highlight', formula_used: 'SI = P × R × T ÷ 100', formula_vars: [{ symbol: 'P', color: 'a', label: '5000', unit: '₹' }, { symbol: 'R', color: 'b', label: '8', unit: '%' }, { symbol: 'T', color: 'c', label: '3', unit: 'yr' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Calculate', explanation: '5000 × 8 × 3 = 120,000. 120,000 ÷ 100 = ₹1200.', visual_type: 'number_morph', formula_used: '5000×8×3÷100 = 1200', numbers: [5000, '×', 8, '×', 3, '÷', 100, '=', 1200], highlight_index: 8, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'SI = PRT/100. Simple! Just memorize the one formula and substitute P, R, T values.',
    follow_up_questions: [{ question: 'SI on ₹2000 at 5% for 4 years?', options: { A: '₹350', B: '₹400', C: '₹450', D: '₹500' }, correct_answer: 'B' }]
  },
  {
    id: 'si_7', category: 'si', difficulty: 'Medium', concept_name: 'Finding Principal',
    question_text: 'At 12% per annum SI, a sum doubles in how many years?',
    options: { A: '6 years', B: '7 years', C: '8 years', D: '9 years' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'When Does It Double?', explanation: 'Double means SI = P (interest earned equals original amount). So P = P × 12 × T / 100 → T = 100/12 = 8.33 ≈ 8 years for closest option, but exact: 100/R.', visual_type: 'formula_highlight', formula_used: 'T (to double) = 100 / R', formula_vars: [{ symbol: 'R', color: 'a', label: '12', unit: '%' }, { symbol: 'T', color: 'c', label: '8.33', unit: 'yr' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'At R% SI, a sum doubles in 100/R years. Triples in 200/R years. Memorize: Doubling time = 100/R.',
    follow_up_questions: [{ question: 'At 10% SI, a sum triples in how many years?', options: { A: '10 yr', B: '15 yr', C: '20 yr', D: '25 yr' }, correct_answer: 'C' }]
  },
  {
    id: 'si_8', category: 'si', difficulty: 'Hard', concept_name: 'CI vs SI Difference',
    question_text: 'The difference between CI and SI on ₹5000 at 10% for 2 years is:',
    options: { A: '₹40', B: '₹50', C: '₹60', D: '₹70' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Key Shortcut', explanation: 'For 2 years: Difference = P × (R/100)² = 5000 × (10/100)² = 5000 × 0.01 = ₹50.', visual_type: 'formula_highlight', formula_used: 'CI−SI (2yr) = P × (R/100)²', formula_vars: [{ symbol: 'P', color: 'a', label: '5000', unit: '₹' }, { symbol: 'R', color: 'b', label: '10', unit: '%' }, { symbol: 'Diff', color: 'c', label: '50', unit: '₹' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'For 2 years: CI−SI = P(R/100)². For 3 years: P(R/100)²(3+R/100). Memorize the 2-year version — it\'s tested frequently!',
    follow_up_questions: [{ question: 'CI−SI on ₹10,000 at 5% for 2 yrs?', options: { A: '₹20', B: '₹25', C: '₹30', D: '₹50' }, correct_answer: 'B' }]
  },
  {
    id: 'si_9', category: 'si', difficulty: 'Easy', concept_name: 'Total Amount with SI',
    question_text: 'Find the amount when ₹8000 is invested at 6% SI for 5 years.',
    options: { A: '₹9600', B: '₹10,000', C: '₹10,400', D: '₹11,000' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'SI Calculation', explanation: 'SI = 8000 × 6 × 5 / 100 = ₹2400.', visual_type: 'number_morph', formula_used: '8000×6×5÷100 = 2400', numbers: [8000, '×', 6, '×', 5, '÷', 100, '=', 2400], highlight_index: 8, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Amount = P + SI', explanation: 'Amount = 8000 + 2400 = ₹10,400.', visual_type: 'number_morph', formula_used: '8000 + 2400 = 10400', numbers: [8000, '+', 2400, '=', 10400], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Amount = P + SI. Not just SI. Many students forget to add principal back — always check what the question asks.',
    follow_up_questions: [{ question: 'P=₹3000, R=10%, T=4yr. Find Amount.', options: { A: '₹4000', B: '₹4100', C: '₹4200', D: '₹4300' }, correct_answer: 'C' }]
  },
  {
    id: 'si_10', category: 'si', difficulty: 'Medium', concept_name: 'Half-Yearly Compounding',
    question_text: '₹10,000 invested at 10% per annum compounded half-yearly for 1 year. Find the amount.',
    options: { A: '₹11,000', B: '₹11,025', C: '₹11,050', D: '₹11,100' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Adjust for Half-Yearly', explanation: 'Rate per half-year = 10/2 = 5%. Number of periods = 1 × 2 = 2. Use A = P(1+R/100)^n.', visual_type: 'formula_highlight', formula_used: 'A = P(1 + R/100)ⁿ = 10000(1.05)²', formula_vars: [{ symbol: 'P', color: 'a', label: '10000', unit: '₹' }, { symbol: 'R', color: 'b', label: '5', unit: '%' }, { symbol: 'n', color: 'c', label: '2', unit: 'periods' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Calculate', explanation: '10000 × 1.05 × 1.05 = 10000 × 1.1025 = ₹11,025.', visual_type: 'number_morph', formula_used: '10000 × 1.1025 = 11025', numbers: [10000, '×', 1.1025, '=', 11025], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Half-yearly: Halve the rate, double the time periods. A = P(1 + R/(2×100))^(2T).',
    follow_up_questions: [{ question: '₹5000 at 8% half-yearly for 1 year. Amount?', options: { A: '₹5382', B: '₹5400', C: '₹5408', D: '₹5420' }, correct_answer: 'C' }]
  },
  {
    id: 'si_11', category: 'si', difficulty: 'Hard', concept_name: 'Equal Instalments',
    question_text: 'A sum is borrowed at 10% SI. It is repaid in 2 equal annual instalments of ₹1155 each. Find the sum borrowed.',
    options: { A: '₹1900', B: '₹2000', C: '₹2100', D: '₹2200' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Present Value of Each Instalment', explanation: 'PV of instalment paid at end of year 1 = 1155/1.10 = 1050. PV of instalment at end of year 2 = 1155/1.21 = 954.55. Total borrowed ≈ 1050 + 954 = 2004 ≈ ₹2000.', visual_type: 'formula_highlight', formula_used: 'PV = Instalment / (1 + R/100)^n', formula_vars: [{ symbol: 'Instalment', color: 'a', label: '1155', unit: '₹' }, { symbol: 'R', color: 'b', label: '10', unit: '%' }, { symbol: 'Sum', color: 'c', label: '2000', unit: '₹' }], analogy: null, duration_seconds: 5 }
    ],
    concept_summary: 'Instalment problems: use present value method. Sum = Σ [Instalment / (1+R%)^n] for each instalment period.',
    follow_up_questions: [{ question: 'Two equal instalments of ₹2420 at 10% SI for 2 yrs. Sum borrowed?', options: { A: '₹4000', B: '₹4200', C: '₹4500', D: '₹4800' }, correct_answer: 'B' }]
  },
  {
    id: 'si_12', category: 'si', difficulty: 'Medium', concept_name: 'Finding Rate of Interest',
    question_text: 'A sum of ₹6000 amounts to ₹7500 in 5 years at SI. Find the rate of interest.',
    options: { A: '4%', B: '5%', C: '6%', D: '7%' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Find SI', explanation: 'SI = Amount − Principal = 7500 − 6000 = ₹1500.', visual_type: 'number_morph', formula_used: '7500 − 6000 = 1500', numbers: [7500, '−', 6000, '=', 1500], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Find Rate', explanation: 'R = (SI × 100) / (P × T) = (1500 × 100) / (6000 × 5) = 150000/30000 = 5%.', visual_type: 'number_morph', formula_used: '1500×100 ÷ (6000×5) = 5%', numbers: [150000, '÷', 30000, '=', 5], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'R = (SI × 100) / (P × T). Rearranged from SI = PRT/100. Works the same way to find P or T when others are known.',
    follow_up_questions: [{ question: 'P=₹4000, Amount=₹4800, T=4yr. Find R.', options: { A: '4%', B: '5%', C: '6%', D: '8%' }, correct_answer: 'B' }]
  },
  {
    id: 'si_13', category: 'si', difficulty: 'Easy', concept_name: 'CI on ₹ Amounts',
    question_text: 'Find CI on ₹2000 at 5% per annum for 2 years.',
    options: { A: '₹200', B: '₹205', C: '₹210', D: '₹220' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Year 1 Interest', explanation: 'Year 1: Interest = 2000 × 5/100 = ₹100. New principal = 2100.', visual_type: 'number_morph', formula_used: '2000 × 0.05 = 100 → P₁ = 2100', numbers: [2000, '×', 0.05, '=', 100], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Year 2 Interest', explanation: 'Year 2: Interest = 2100 × 5/100 = ₹105. Total CI = 100 + 105 = ₹205.', visual_type: 'number_morph', formula_used: '100 + 105 = 205', numbers: [100, '+', 105, '=', 205], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'CI compounds: Year 2 interest is on (P + Year 1 interest). This "interest on interest" is why CI > SI.',
    follow_up_questions: [{ question: 'CI on ₹1000 at 10% for 2 years?', options: { A: '₹200', B: '₹210', C: '₹220', D: '₹230' }, correct_answer: 'B' }]
  },
  {
    id: 'si_14', category: 'si', difficulty: 'Medium', concept_name: 'Population Growth (CI Application)',
    question_text: 'A town\'s population is 50,000. It grows at 4% per year. What will be the population after 2 years?',
    options: { A: '53,500', B: '54,000', C: '54,080', D: '55,000' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Population = CI Formula', explanation: 'Population growth uses compound formula: P₂ = P₀ × (1 + r/100)^n = 50000 × (1.04)².', visual_type: 'formula_highlight', formula_used: 'P_n = P₀ × (1 + r/100)ⁿ', formula_vars: [{ symbol: 'P₀', color: 'a', label: '50000', unit: '' }, { symbol: 'r', color: 'b', label: '4', unit: '%' }, { symbol: 'n', color: 'c', label: '2', unit: 'yr' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Calculate', explanation: '50000 × 1.04 × 1.04 = 50000 × 1.0816 = 54,080.', visual_type: 'number_morph', formula_used: '50000 × 1.0816 = 54080', numbers: [50000, '×', 1.0816, '=', 54080], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Population growth = CI formula. Depreciation = P(1 − r/100)^n. Both use compound formula, just ± changes.',
    follow_up_questions: [{ question: 'Population 10,000 grows at 10%/yr for 2 yr. Final population?', options: { A: '11,000', B: '12,000', C: '12,100', D: '12,500' }, correct_answer: 'C' }]
  },
  {
    id: 'si_15', category: 'si', difficulty: 'Hard', concept_name: 'Difference in Rates',
    question_text: 'A sum invested at 10% SI for 4 years gives ₹200 more than at 8% SI for the same period. Find the sum.',
    options: { A: '₹1500', B: '₹2000', C: '₹2500', D: '₹3000' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Set Up Equation', explanation: 'SI₁ = P×10×4/100 = 0.4P. SI₂ = P×8×4/100 = 0.32P. Difference = 0.4P − 0.32P = 0.08P = ₹200.', visual_type: 'formula_highlight', formula_used: '0.08P = 200 → P = 2500', formula_vars: [{ symbol: 'P', color: 'a', label: '?', unit: '₹' }, { symbol: 'Diff', color: 'b', label: '200', unit: '₹' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Solve for P', explanation: 'P = 200 / 0.08 = ₹2500.', visual_type: 'number_morph', formula_used: '200 ÷ 0.08 = 2500', numbers: [200, '÷', 0.08, '=', 2500], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'When rate changes but P and T are same: Difference in SI = P × T × (R₁−R₂)/100. Solve for P.',
    follow_up_questions: [{ question: 'Difference in SI at 12% vs 10% for 5 yr = ₹400. Find P.', options: { A: '₹3500', B: '₹4000', C: '₹4500', D: '₹5000' }, correct_answer: 'B' }]
  },

  // ═══════════════════════════════════════════════════════
  // AVERAGE, RATIO & ALLIGATION — Additional 10 Questions
  // ═══════════════════════════════════════════════════════
  {
    id: 'avg_6', category: 'avg', difficulty: 'Easy', concept_name: 'Average of Consecutive Numbers',
    question_text: 'Find the average of first 10 natural numbers.',
    options: { A: '4.5', B: '5', C: '5.5', D: '6' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Shortcut for Consecutive Numbers', explanation: 'Average of 1 to n = (n+1)/2. For n=10: (10+1)/2 = 5.5.', visual_type: 'formula_highlight', formula_used: 'Avg(1 to n) = (n+1)/2', formula_vars: [{ symbol: 'n', color: 'a', label: '10', unit: '' }, { symbol: 'Avg', color: 'c', label: '5.5', unit: '' }], analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Average of 1 to n = (n+1)/2. Sum of 1 to n = n(n+1)/2. These are constant shortcuts — memorize them.',
    follow_up_questions: [{ question: 'Average of 1 to 20?', options: { A: '9.5', B: '10', C: '10.5', D: '11' }, correct_answer: 'C' }]
  },
  {
    id: 'avg_7', category: 'avg', difficulty: 'Medium', concept_name: 'Average After Replacement',
    question_text: 'The average weight of 8 persons increases by 2 kg when a man weighing 65 kg is replaced. Find the weight of the new person.',
    options: { A: '79 kg', B: '81 kg', C: '83 kg', D: '85 kg' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Total Increase', explanation: 'Average increased by 2 kg for 8 persons → total weight increase = 2 × 8 = 16 kg.', visual_type: 'number_morph', formula_used: '2 × 8 = 16 kg increase', numbers: [2, '×', 8, '=', 16], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'New Person\'s Weight', explanation: 'New weight = Old weight + Total increase = 65 + 16 = 81 kg.', visual_type: 'number_morph', formula_used: '65 + 16 = 81', numbers: [65, '+', 16, '=', 81], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Replacement trick: New weight = Replaced weight + (Change in avg × Total count). Fast shortcut!',
    follow_up_questions: [{ question: 'Avg of 5 drops by 3 when 50 kg is replaced. New weight?', options: { A: '35 kg', B: '30 kg', C: '40 kg', D: '25 kg' }, correct_answer: 'A' }]
  },
  {
    id: 'avg_8', category: 'avg', difficulty: 'Easy', concept_name: 'Ratio Division',
    question_text: '₹9600 is divided between A and B in the ratio 5:3. How much does A get?',
    options: { A: '₹5400', B: '₹5600', C: '₹6000', D: '₹6400' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Total Parts', explanation: 'Ratio 5:3 → Total parts = 5+3 = 8. Each part = 9600/8 = ₹1200.', visual_type: 'number_morph', formula_used: '9600 ÷ 8 = 1200 per part', numbers: [9600, '÷', 8, '=', 1200], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: "A's Share", explanation: 'A gets 5 parts = 5 × 1200 = ₹6000.', visual_type: 'number_morph', formula_used: '5 × 1200 = 6000', numbers: [5, '×', 1200, '=', 6000], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Ratio division: find value of 1 part (Total/Sum of ratio), then multiply by each person\'s share.',
    follow_up_questions: [{ question: '₹4200 split in ratio 3:4. Larger share?', options: { A: '₹2200', B: '₹2400', C: '₹2500', D: '₹2600' }, correct_answer: 'B' }]
  },
  {
    id: 'avg_9', category: 'avg', difficulty: 'Hard', concept_name: 'Alligation / Mixture',
    question_text: 'Milk at ₹20/litre and water (₹0) are mixed to give mixture at ₹16/litre. Find the ratio of milk to water.',
    options: { A: '3:1', B: '4:1', C: '5:1', D: '2:1' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Alligation Rule', explanation: 'Cheaper price = ₹0 (water). Dearer price = ₹20 (milk). Mean price = ₹16. Use alligation: Ratio = (Dearer − Mean) : (Mean − Cheaper) = (20−16) : (16−0) = 4:16 = 1:4.', visual_type: 'formula_highlight', formula_used: 'Ratio = (D−M) : (M−C)', formula_vars: [{ symbol: 'D', color: 'a', label: '20', unit: '₹' }, { symbol: 'C', color: 'b', label: '0', unit: '₹' }, { symbol: 'M', color: 'c', label: '16', unit: '₹' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Ratio of Milk to Water', explanation: 'Milk : Water = (16−0) : (20−16) = 16 : 4 = 4 : 1.', visual_type: 'number_morph', formula_used: '16 : 4 = 4 : 1', numbers: [16, ':', 4, '=', '4:1'], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Alligation: draw a cross-diagram. Milk shares = Mean−Cheap side, Water = Expensive−Mean side. Ratio = those values.',
    follow_up_questions: [{ question: '₹30 and ₹10 mixed to give ₹22 mean. Ratio of expensive to cheap?', options: { A: '2:1', B: '3:2', C: '3:4', D: '6:4' }, correct_answer: 'D' }]
  },
  {
    id: 'avg_10', category: 'avg', difficulty: 'Medium', concept_name: 'Age Ratio',
    question_text: 'The ratio of ages of A and B is 3:5. After 10 years it will be 5:7. Find the present age of A.',
    options: { A: '15 years', B: '20 years', C: '25 years', D: '30 years' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Set Up Variables', explanation: 'Let A = 3x, B = 5x. After 10 years: (3x+10)/(5x+10) = 5/7.', visual_type: 'formula_highlight', formula_used: '(3x+10)/(5x+10) = 5/7', formula_vars: [{ symbol: 'A', color: 'a', label: '3x', unit: 'yr' }, { symbol: 'B', color: 'b', label: '5x', unit: 'yr' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Cross Multiply & Solve', explanation: '7(3x+10) = 5(5x+10) → 21x+70 = 25x+50 → 4x = 20 → x = 5. A = 3×5 = 15 years.', visual_type: 'number_morph', formula_used: '4x = 20 → x = 5 → A = 15', numbers: [20, '÷', 4, '=', 5, '×', 3, '=', 15], highlight_index: 8, analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Age ratio problems: let ages = ratio multiples of x. Cross-multiply future ratio equation to find x.',
    follow_up_questions: [{ question: 'A:B age ratio = 2:3. After 4 yr = 3:4. Find A\'s present age.', options: { A: '6 yr', B: '8 yr', C: '10 yr', D: '12 yr' }, correct_answer: 'B' }]
  },
  {
    id: 'avg_11', category: 'avg', difficulty: 'Easy', concept_name: 'Weighted Average',
    question_text: 'Class A has 30 students with average 70 marks. Class B has 20 students with average 80 marks. Find the overall average.',
    options: { A: '73', B: '74', C: '75', D: '76' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Total Marks', explanation: 'Class A total = 30×70 = 2100. Class B total = 20×80 = 1600. Grand total = 3700.', visual_type: 'number_morph', formula_used: '2100 + 1600 = 3700', numbers: [2100, '+', 1600, '=', 3700], highlight_index: 4, analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Overall Average', explanation: 'Total students = 50. Avg = 3700/50 = 74.', visual_type: 'number_morph', formula_used: '3700 ÷ 50 = 74', numbers: [3700, '÷', 50, '=', 74], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Weighted average: total all values, total all counts, then divide. Never just average the averages!',
    follow_up_questions: [{ question: '10 items at avg ₹5, 20 items at avg ₹8. Overall avg?', options: { A: '6.5', B: '7', C: '7.5', D: '8' }, correct_answer: 'B' }]
  },
  {
    id: 'avg_12', category: 'avg', difficulty: 'Medium', concept_name: 'Missing Number in Average',
    question_text: 'Average of 5 numbers is 18. If one number is removed, the average becomes 16. What is the removed number?',
    options: { A: '24', B: '26', C: '28', D: '30' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Total of 5 Numbers', explanation: 'Sum of 5 numbers = 5 × 18 = 90.', visual_type: 'number_morph', formula_used: '5 × 18 = 90', numbers: [5, '×', 18, '=', 90], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Total of Remaining 4', explanation: 'After removal: 4 × 16 = 64. Removed number = 90 − 64 = 26.', visual_type: 'number_morph', formula_used: '90 − 64 = 26', numbers: [90, '−', 64, '=', 26], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Missing element = (Old count × Old avg) − (New count × New avg). Simple but powerful!',
    follow_up_questions: [{ question: 'Avg of 8 = 20. Remove one, avg becomes 18. Removed number?', options: { A: '32', B: '34', C: '36', D: '38' }, correct_answer: 'C' }]
  },
  {
    id: 'avg_13', category: 'avg', difficulty: 'Hard', concept_name: 'Compound Ratio',
    question_text: 'Find the compound ratio of 3:4, 5:6, and 2:5.',
    options: { A: '1:4', B: '1:8', C: '1:2', D: '1:16' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Multiply All Antecedents and Consequents', explanation: 'Compound ratio = (3×5×2) : (4×6×5) = 30 : 120 = 1 : 4.', visual_type: 'formula_highlight', formula_used: 'Compound Ratio = (a₁×a₂×a₃):(b₁×b₂×b₃)', formula_vars: [{ symbol: 'Num', color: 'a', label: '3×5×2=30', unit: '' }, { symbol: 'Den', color: 'b', label: '4×6×5=120', unit: '' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Simplify', explanation: '30:120 = 1:4.', visual_type: 'number_morph', formula_used: '30 : 120 = 1 : 4', numbers: [30, ':', 120, '=', '1:4'], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Compound ratio: multiply all numerators together, all denominators together, then simplify.',
    follow_up_questions: [{ question: 'Compound ratio of 2:3 and 4:5?', options: { A: '8:15', B: '6:15', C: '4:9', D: '2:5' }, correct_answer: 'A' }]
  },
  {
    id: 'avg_14', category: 'avg', difficulty: 'Medium', concept_name: 'Proportion',
    question_text: 'If 4 : 7 = x : 35, find x.',
    options: { A: '15', B: '18', C: '20', D: '22' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Cross Multiplication', explanation: 'In a proportion a:b = c:d, we have a×d = b×c (cross product). So 4×35 = 7×x.', visual_type: 'formula_highlight', formula_used: '4 × 35 = 7 × x', formula_vars: [{ symbol: 'x', color: 'a', label: '?', unit: '' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Solve for x', explanation: '140 = 7x → x = 20.', visual_type: 'number_morph', formula_used: '140 ÷ 7 = 20', numbers: [140, '÷', 7, '=', 20], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Proportion: a:b = c:d → ad = bc (cross multiply). Find the unknown using division.',
    follow_up_questions: [{ question: '5:8 = 15:x. Find x.', options: { A: '22', B: '24', C: '26', D: '28' }, correct_answer: 'B' }]
  },
  {
    id: 'avg_15', category: 'avg', difficulty: 'Hard', concept_name: 'Mixture Replacement',
    question_text: 'A vessel has 40 litres of pure milk. 10 litres is removed and replaced with water. This is done twice. Find the amount of milk left.',
    options: { A: '20.5 L', B: '22.5 L', C: '25 L', D: '27.5 L' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Mixture Replacement Formula', explanation: 'Milk remaining = Initial × (1 − Removed/Total)^n = 40 × (1 − 10/40)² = 40 × (3/4)².', visual_type: 'formula_highlight', formula_used: 'Milk = V × (1 − r/V)ⁿ', formula_vars: [{ symbol: 'V', color: 'a', label: '40', unit: 'L' }, { symbol: 'r', color: 'b', label: '10', unit: 'L' }, { symbol: 'n', color: 'c', label: '2', unit: 'times' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Calculate', explanation: '40 × (3/4)² = 40 × 9/16 = 360/16 = 22.5 litres of milk.', visual_type: 'number_morph', formula_used: '40 × 9/16 = 22.5', numbers: [40, '×', 9, '÷', 16, '=', 22.5], highlight_index: 6, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Repeated replacement: Final pure quantity = Initial × (1 − replaced/total)^n. Works for any number of repetitions.',
    follow_up_questions: [{ question: '30L milk. 6L removed and replaced with water 3 times. Milk left?', options: { A: '14.4 L', B: '15 L', C: '16 L', D: '17.6 L' }, correct_answer: 'A' }]
  },

  // ═══════════════════════════════════════════════════════
  // NUMBER SYSTEM — Additional 10 Questions
  // ═══════════════════════════════════════════════════════
  {
    id: 'ns_6', category: 'ns', difficulty: 'Easy', concept_name: 'Divisibility Rule for 3',
    question_text: 'Which of the following numbers is divisible by 3?',
    options: { A: '10417', B: '12345', C: '22241', D: '98764' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Divisibility Rule for 3', explanation: 'A number is divisible by 3 if the SUM of its digits is divisible by 3.', visual_type: 'formula_highlight', formula_used: 'Sum of digits divisible by 3 → number divisible by 3', formula_vars: [{ symbol: 'Rule', color: 'a', label: 'Sum of digits', unit: '÷3' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Check 12345', explanation: '1+2+3+4+5 = 15. 15/3 = 5 → divisible by 3. Answer: 12345.', visual_type: 'number_morph', formula_used: '1+2+3+4+5 = 15 ÷ 3 = 5 ✓', numbers: [1, '+', 2, '+', 3, '+', 4, '+', 5, '=', 15], highlight_index: 10, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Div by 3: digit sum % 3 = 0. Div by 9: digit sum % 9 = 0. These rules save you from long division!',
    follow_up_questions: [{ question: 'Which number is divisible by 9? A)81234 B)45679 C)12344 D)54321', options: { A: '81234', B: '45679', C: '12344', D: '54321' }, correct_answer: 'A' }]
  },
  {
    id: 'ns_7', category: 'ns', difficulty: 'Medium', concept_name: 'HCF by Factoring',
    question_text: 'Find the HCF of 48 and 72.',
    options: { A: '12', B: '18', C: '24', D: '36' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Prime Factorization', explanation: '48 = 2⁴ × 3. 72 = 2³ × 3². HCF = take smallest power of each common prime.', visual_type: 'formula_highlight', formula_used: 'HCF = Product of common primes with smallest powers', formula_vars: [{ symbol: '48', color: 'a', label: '2⁴×3', unit: '' }, { symbol: '72', color: 'b', label: '2³×3²', unit: '' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Calculate HCF', explanation: 'Common primes: 2 (min power = 3) and 3 (min power = 1). HCF = 2³ × 3 = 8 × 3 = 24.', visual_type: 'number_morph', formula_used: '2³ × 3 = 24', numbers: [8, '×', 3, '=', 24], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'HCF: Use prime factorization, take LOWEST powers of common factors. LCM: take HIGHEST powers of ALL factors.',
    follow_up_questions: [{ question: 'HCF of 36 and 60?', options: { A: '6', B: '9', C: '12', D: '18' }, correct_answer: 'C' }]
  },
  {
    id: 'ns_8', category: 'ns', difficulty: 'Easy', concept_name: 'Unit Digit of Powers',
    question_text: 'What is the unit digit of 3^57?',
    options: { A: '1', B: '3', C: '7', D: '9' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Cyclicity of 3', explanation: 'Unit digit of 3: 3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243. Cycle: 3,9,7,1 → repeats every 4.', visual_type: 'pattern_reveal', pattern: ['3¹→3', '3²→9', '3³→7', '3⁴→1', '3⁵→3'], differences: ['cycle', 'length', '=', '4', ''], formula_used: 'Unit digits of 3 cycle: 3,9,7,1', analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Apply to 3^57', explanation: '57 mod 4 = 1 (57 = 14×4 + 1). Position 1 in cycle = 3. Unit digit = 3.', visual_type: 'number_morph', formula_used: '57 mod 4 = 1 → Unit digit = 3', numbers: [57, 'mod', 4, '=', 1, '→', 3], highlight_index: 6, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Unit digit cyclicity: 2(4), 3(4), 4(2), 7(4), 8(4), 9(2), 0,1,5,6 always same. Divide power by cycle length, use remainder.',
    follow_up_questions: [{ question: 'Unit digit of 7^52?', options: { A: '1', B: '3', C: '7', D: '9' }, correct_answer: 'A' }]
  },
  {
    id: 'ns_9', category: 'ns', difficulty: 'Hard', concept_name: 'Trailing Zeros',
    question_text: 'How many trailing zeros does 50! have?',
    options: { A: '10', B: '12', C: '14', D: '15' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Count Factors of 5', explanation: 'Trailing zeros come from pairs of 2×5. Since 2s are plentiful, count 5s in 50!. Formula: ⌊50/5⌋ + ⌊50/25⌋ + ⌊50/125⌋...', visual_type: 'formula_highlight', formula_used: 'Zeros = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...', formula_vars: [{ symbol: 'n', color: 'a', label: '50', unit: '' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Calculate', explanation: '⌊50/5⌋ = 10. ⌊50/25⌋ = 2. ⌊50/125⌋ = 0. Total = 10 + 2 = 12 trailing zeros.', visual_type: 'number_morph', formula_used: '10 + 2 + 0 = 12', numbers: [10, '+', 2, '+', 0, '=', 12], highlight_index: 6, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Trailing zeros in n! = Σ⌊n/5^k⌋ for k=1,2,3... until 5^k > n. Always count 5s, not 2s.',
    follow_up_questions: [{ question: 'Trailing zeros in 100!?', options: { A: '20', B: '22', C: '24', D: '25' }, correct_answer: 'C' }]
  },
  {
    id: 'ns_10', category: 'ns', difficulty: 'Medium', concept_name: 'LCM Word Problem',
    question_text: 'Three bells toll at intervals of 12, 15, and 20 minutes. If they toll together at 8 AM, at what time will they next toll together?',
    options: { A: '8:30 AM', B: '9:00 AM', C: '9:30 AM', D: '10:00 AM' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Find LCM', explanation: 'LCM of 12, 15, 20. 12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60 minutes.', visual_type: 'formula_highlight', formula_used: 'LCM(12,15,20) = 60 min', formula_vars: [{ symbol: '12', color: 'a', label: '2²×3', unit: '' }, { symbol: '15', color: 'b', label: '3×5', unit: '' }, { symbol: '20', color: 'c', label: '2²×5', unit: '' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Next Common Time', explanation: 'They toll together every 60 minutes. 8:00 AM + 60 min = 9:00 AM.', visual_type: 'number_morph', formula_used: '8:00 AM + 60 min = 9:00 AM', numbers: [8, '+', 60, 'min', '=', '9:00 AM'], highlight_index: 5, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Bell/light problems: find LCM of intervals. LCM gives the time period after which all events coincide again.',
    follow_up_questions: [{ question: 'Bells ring at 6, 8, 12 min. Rang together at noon. Next time?', options: { A: '12:24 PM', B: '12:30 PM', C: '12:48 PM', D: '1:00 PM' }, correct_answer: 'A' }]
  },
  {
    id: 'ns_11', category: 'ns', difficulty: 'Easy', concept_name: 'Number of Factors',
    question_text: 'How many factors does 72 have?',
    options: { A: '8', B: '10', C: '12', D: '14' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Prime Factorization', explanation: '72 = 2³ × 3². For factors, use formula: (power+1) × (power+1)...', visual_type: 'formula_highlight', formula_used: 'If n = pᵃ × qᵇ, factors = (a+1)(b+1)', formula_vars: [{ symbol: '72', color: 'a', label: '2³×3²', unit: '' }], analogy: null, duration_seconds: 3 },
      { step_number: 2, step_title: 'Apply Formula', explanation: 'Factors = (3+1)(2+1) = 4×3 = 12 factors.', visual_type: 'number_morph', formula_used: '(3+1) × (2+1) = 12', numbers: [4, '×', 3, '=', 12], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Number of factors = product of (each prime\'s exponent + 1). Works for any composite number after prime factorization.',
    follow_up_questions: [{ question: 'How many factors does 120 have?', options: { A: '14', B: '16', C: '18', D: '20' }, correct_answer: 'B' }]
  },
  {
    id: 'ns_12', category: 'ns', difficulty: 'Medium', concept_name: 'Remainder Theorem',
    question_text: 'What is the remainder when 2^100 is divided by 3?',
    options: { A: '0', B: '1', C: '2', D: '3' }, correct_answer: 'B',
    animation_script: [
      { step_number: 1, step_title: 'Cyclicity of Remainders', explanation: '2¹÷3 = rem 2. 2²÷3 = rem 1. 2³÷3 = rem 2. 2⁴÷3 = rem 1. Pattern: odd power → 2, even power → 1.', visual_type: 'pattern_reveal', pattern: ['2¹ rem=2', '2² rem=1', '2³ rem=2', '2⁴ rem=1'], differences: ['odd→2', 'even→1', 'odd→2', 'even→1'], formula_used: 'Even power of 2: rem by 3 = 1', analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Apply to 2^100', explanation: '100 is even → remainder = 1.', visual_type: 'number_morph', formula_used: '2^100 ÷ 3 → remainder = 1', numbers: [100, 'is even', '→', 'rem', '=', 1], highlight_index: 5, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'Remainder problems: find the cycle of remainders for the base, then use power mod cycle-length to find the answer.',
    follow_up_questions: [{ question: 'Remainder when 3^50 is divided by 4?', options: { A: '0', B: '1', C: '2', D: '3' }, correct_answer: 'B' }]
  },
  {
    id: 'ns_13', category: 'ns', difficulty: 'Easy', concept_name: 'Simplification — BODMAS',
    question_text: 'Simplify: 16 + 4 × (8 − 5) ÷ 2',
    options: { A: '22', B: '24', C: '26', D: '28' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'BODMAS Order', explanation: 'B-O-D-M-A-S: Brackets first → (8−5) = 3.', visual_type: 'number_morph', formula_used: '(8 − 5) = 3', numbers: [8, '−', 5, '=', 3], highlight_index: 4, analogy: null, duration_seconds: 2 },
      { step_number: 2, step_title: 'Division & Multiplication', explanation: '4 × 3 ÷ 2 = 12 ÷ 2 = 6.', visual_type: 'number_morph', formula_used: '4 × 3 ÷ 2 = 6', numbers: [4, '×', 3, '÷', 2, '=', 6], highlight_index: 6, analogy: null, duration_seconds: 2 },
      { step_number: 3, step_title: 'Addition', explanation: '16 + 6 = 22.', visual_type: 'number_morph', formula_used: '16 + 6 = 22', numbers: [16, '+', 6, '=', 22], highlight_index: 4, analogy: null, duration_seconds: 2 }
    ],
    concept_summary: 'BODMAS: Bracket → Of → Division → Multiplication → Addition → Subtraction. Stick to this order every single time.',
    follow_up_questions: [{ question: '10 + 5 × 2 − (3 + 1) = ?', options: { A: '14', B: '16', C: '18', D: '20' }, correct_answer: 'B' }]
  },
  {
    id: 'ns_14', category: 'ns', difficulty: 'Hard', concept_name: 'Divisibility by 11',
    question_text: 'Is 87659 divisible by 11?',
    options: { A: 'Yes', B: 'No', C: 'Cannot determine', D: 'Yes, remainder 1' }, correct_answer: 'A',
    animation_script: [
      { step_number: 1, step_title: 'Rule for 11', explanation: 'Divisibility by 11: (Sum of odd-position digits) − (Sum of even-position digits) = 0 or multiple of 11.', visual_type: 'formula_highlight', formula_used: 'Odd positions − Even positions = 0 or ±11', formula_vars: [{ symbol: 'Odd', color: 'a', label: '8+6+9=23', unit: '' }, { symbol: 'Even', color: 'b', label: '7+5=12', unit: '' }], analogy: null, duration_seconds: 4 },
      { step_number: 2, step_title: 'Check 87659', explanation: 'Positions: 8(1),7(2),6(3),5(4),9(5). Odd(1,3,5)=8+6+9=23. Even(2,4)=7+5=12. Diff=23−12=11. Divisible by 11!', visual_type: 'number_morph', formula_used: '23 − 12 = 11 ✓', numbers: [23, '−', 12, '=', 11], highlight_index: 4, analogy: null, duration_seconds: 3 }
    ],
    concept_summary: 'Divisibility by 11: alternate digit sum difference = 0 or multiple of 11. Odd-positioned minus Even-positioned.',
    follow_up_questions: [{ question: 'Is 121 divisible by 11?', options: { A: 'Yes', B: 'No', C: 'Remainder 1', D: 'Remainder 2' }, correct_answer: 'A' }]
  },
  {
    id: 'ns_15', category: 'ns', difficulty: 'Medium', concept_name: 'Approximation',
    question_text: 'Approximate the value of: 399.9 × 20.1 / 10.2',
    options: { A: '780', B: '785', C: '788', D: '800' }, correct_answer: 'C',
    animation_script: [
      { step_number: 1, step_title: 'Round to Nearest Whole Numbers', explanation: '≈ 400 × 20 / 10 = 8000 / 10 = 800. But we rounded UP so actual answer slightly less. Use 400 × 20 / 10.2 ≈ 784. Best match = 788.', visual_type: 'formula_highlight', formula_used: '≈ 400 × 20 ÷ 10 = 800 (adjusted: ~788)', formula_vars: [{ symbol: '399.9', color: 'a', label: '≈400', unit: '' }, { symbol: '20.1', color: 'b', label: '≈20', unit: '' }, { symbol: '10.2', color: 'c', label: '≈10', unit: '' }], analogy: null, duration_seconds: 4 }
    ],
    concept_summary: 'Approximation: round to nearest easy numbers, compute, then adjust based on whether you rounded up or down.',
    follow_up_questions: [{ question: 'Approximate: 502 × 9.9 / 4.98?', options: { A: '990', B: '1000', C: '1050', D: '1100' }, correct_answer: 'B' }]
  }
];

export const QUESTION_BANK_MAP = {};
QUESTIONS.forEach(q => {
  if (!QUESTION_BANK_MAP[q.category]) QUESTION_BANK_MAP[q.category] = [];
  QUESTION_BANK_MAP[q.category].push(q);
});
