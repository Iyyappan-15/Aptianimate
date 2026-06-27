// src/data/govtExamSyllabus.js
// ─── Government Exams Full Syllabus ───

export const GOVT_EXAM_SYLLABUS = [
  {
    section: "Quantitative Aptitude",
    icon: "📊",
    color: "#3b82f6", // Blue
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    subcategories: [
      {
        name: "Number Systems",
        icon: "🔢",
        topics: [
          "Number System Basics",
          "LCM & HCF",
          "Divisibility Rules",
          "Prime Factorization",
          "Remainders",
          "Unit Digits & Cyclicity",
          "Decimal Fractions",
          "Simplification"
        ]
      },
      {
        name: "Arithmetic",
        icon: "➕",
        topics: [
          "Percentages",
          "Ratio & Proportion",
          "Averages",
          "Profit & Loss",
          "Simple Interest",
          "Compound Interest",
          "Ages",
          "Alligation & Mixtures"
        ]
      },
      {
        name: "Work & Motion",
        icon: "⚙️",
        topics: [
          "Time & Work",
          "Pipes & Cisterns",
          "Time, Speed & Distance",
          "Trains",
          "Boats & Streams"
        ]
      },
      {
        name: "Advanced Math (Govt Special)",
        icon: "📐",
        topics: [
          "Geometry",
          "Mensuration",
          "Algebra",
          "Data Sufficiency"
        ]
      }
    ]
  },
  {
    section: "Reasoning Ability",
    icon: "🧠",
    color: "#f59e0b", // Amber
    gradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
    subcategories: [
      {
        name: "General Intelligence",
        icon: "🧩",
        topics: [
          "General Intelligence",
          "Coding-Decoding",
          "Blood Relations",
          "Direction Sense",
          "Syllogism",
          "Ranking & Ordering"
        ]
      },
      {
        name: "Clocks & Calendars",
        icon: "⏰",
        topics: [
          "Clocks",
          "Calendars"
        ]
      },
      {
        name: "Non-Verbal Reasoning",
        icon: "👁️",
        topics: [
          "Pattern Completion",
          "Figure Series",
          "Mirror Images",
          "Water Images"
        ]
      }
    ]
  },
  {
    section: "English / Verbal Ability",
    icon: "📖",
    color: "#10b981", // Emerald
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    subcategories: [
      {
        name: "Grammar & Usage",
        icon: "✏️",
        topics: [
          "Error Detection",
          "Sentence Improvement",
          "Fillers",
          "Active & Passive Voice",
          "Direct & Indirect Speech"
        ]
      },
      {
        name: "Vocabulary & Comprehension",
        icon: "📝",
        topics: [
          "Reading Comprehension",
          "Cloze Test",
          "Word Swap",
          "One Word Substitution",
          "Phrase Replacement"
        ]
      }
    ]
  },
  {
    section: "Data Interpretation",
    icon: "📈",
    color: "#8b5cf6", // Purple
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #5b21b6 100%)",
    subcategories: [
      {
        name: "DI Sets",
        icon: "📊",
        topics: [
          "Tables",
          "Bar Charts",
          "Pie Charts",
          "Line Graphs"
        ]
      }
    ]
  }
];

export const GOVT_EXAM_FILTERS = [
  "SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD", "SSC CPO",
  "IBPS PO", "IBPS Clerk", "SBI PO", "SBI Clerk", "RBI Assistant",
  "RRB NTPC", "RRB Group D", "LIC AAO", "UPSC CSAT", "EPFO", "TNPSC"
];
