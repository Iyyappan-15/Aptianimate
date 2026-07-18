// src/data/governmentRegistry.js
// ─── Registry of all available Government PYQ papers ─────────────────────────
// To add a new exam in the future:
//   1. Add the JSON files to public/assessment-bank/government/<exam-folder>/
//   2. Add a new entry to GOVT_PYQ_REGISTRY below.
// No React component changes required.

export const GOVT_PYQ_REGISTRY = [
  {
    id: "ldc-2026",
    title: "LDC 2026",
    description: "Previous year questions from LDC/LGS 2026 examination.",
    icon: "📋",
    totalQuestions: 200,
    totalSets: 4,
    questionsPerSet: 50,
    totalMarks: 200,
    duration: 120, // minutes
    categories: ["Logical Reasoning", "Quantitative Aptitude", "General Knowledge", "English", "Physics", "Chemistry", "Biology", "Mathematics", "Commerce", "Economics", "Geography", "History", "Polity"],
    practiceSets: [
      {
        id: "set-1",
        title: "Practice Set 1",
        description: "Questions 1 – 50",
        questionRange: "Q00001 – Q00050",
        file: "/assessment-bank/government/ldc/ldc-2026-set-1.json"
      },
      {
        id: "set-2",
        title: "Practice Set 2",
        description: "Questions 51 – 100",
        questionRange: "Q00051 – Q00100",
        file: "/assessment-bank/government/ldc/ldc-2026-set-2.json"
      },
      {
        id: "set-3",
        title: "Practice Set 3",
        description: "Questions 101 – 150",
        questionRange: "Q00101 – Q00150",
        file: "/assessment-bank/government/ldc/ldc-2026-set-3.json"
      },
      {
        id: "set-4",
        title: "Practice Set 4",
        description: "Questions 151 – 200",
        questionRange: "Q00151 – Q00200",
        file: "/assessment-bank/government/ldc/ldc-2026-set-4.json"
      }
    ]
  }
  // ─── Future exams go here ─────────────────────────────────────────────────
  // {
  //   id: "ssc-cgl-2024",
  //   title: "SSC CGL 2024",
  //   ...
  // }
];
