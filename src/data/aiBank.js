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

export const getRandomQuestions = (config) => {
  let selected = [];
  
  if (config && config.categories) {
    Object.entries(config.categories).forEach(([category, count]) => {
      const categoryQuestions = ALL_QUESTIONS.filter(q => q.category === category);
      // Shuffle
      categoryQuestions.sort(() => Math.random() - 0.5);
      selected = [...selected, ...categoryQuestions.slice(0, count)];
    });
  }
  
  // Final shuffle
  return selected.sort(() => Math.random() - 0.5);
};
