// src/data/aiBank.js

// Vite's import.meta.glob can aggregate all JSON files at build time!
const jsonModules = import.meta.glob('../../public/assessment-bank/ai-battle/**/*.json', { eager: true });

let ALL_QUESTIONS = [];

Object.keys(jsonModules).forEach((path) => {
  const fileContent = jsonModules[path].default || jsonModules[path];
  if (Array.isArray(fileContent)) {
    // Add category/topic based on folder structure
    const parts = path.split('/');
    const topicFile = parts[parts.length - 1].replace('.json', '');
    const categoryFolder = parts[parts.length - 2];

    let categoryName = categoryFolder;
    if (categoryFolder === 'quantitative') categoryName = 'Quantitative Aptitude';
    if (categoryFolder === 'logical') categoryName = 'Logical Reasoning';
    if (categoryFolder === 'verbal') categoryName = 'Verbal Ability';
    if (categoryFolder === 'technical') categoryName = 'Technical';

    const mappedQuestions = fileContent.map(q => ({
      ...q,
      category: categoryName,
      topic: topicFile
    }));

    ALL_QUESTIONS = [...ALL_QUESTIONS, ...mappedQuestions];
  }
});

/**
 * Get a random set of questions.
 *
 * @param {object} config            - Standard category config (e.g. { categories: { 'Quantitative Aptitude': 8 } })
 * @param {string[]} [selectedTopics] - Optional array of topic IDs (e.g. ['percentage', 'profit-loss']).
 *                                     When provided, questions are drawn ONLY from these topics.
 *                                     If a topic doesn't have enough questions, the system pads
 *                                     proportionally from other selected topics in the same category.
 */
export const getRandomQuestions = (config, selectedTopics = null) => {
  const TOTAL_BATTLE_QUESTIONS = 30;

  // ── Topic-filtered mode ───────────────────────────────────────────────────
  if (selectedTopics && selectedTopics.length > 0) {
    const topicSet = new Set(selectedTopics);

    // Filter the whole bank to selected topics only
    const eligible = ALL_QUESTIONS.filter(q => topicSet.has(q.topic));

    if (eligible.length === 0) {
      // Fallback: nothing matches — return standard random
      return getRandomQuestions(config, null);
    }

    // Shuffle eligible pool
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);

    // Take up to TOTAL_BATTLE_QUESTIONS; if fewer exist, take all
    return shuffled.slice(0, TOTAL_BATTLE_QUESTIONS);
  }

  // ── Original category-split mode (unchanged) ──────────────────────────────
  let selected = [];

  if (config && config.categories) {
    Object.entries(config.categories).forEach(([category, count]) => {
      const categoryQuestions = ALL_QUESTIONS.filter(q => q.category === category);
      categoryQuestions.sort(() => Math.random() - 0.5);
      selected = [...selected, ...categoryQuestions.slice(0, count)];
    });
  }

  return selected.sort(() => Math.random() - 0.5);
};

export const getQuestionsByIds = (ids) => {
  if (!ids || ids.length === 0) return [];
  return ids.map(id => ALL_QUESTIONS.find(q => q.id === id)).filter(Boolean);
};
