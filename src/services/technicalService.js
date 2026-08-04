import technicalQuestionsData from '../data/tcs_technical_questions.json';

export const technicalService = {
  /**
   * Fetch a random set of technical questions for a specific company and assessment.
   * Loads from local JSON bundled with the app to avoid database dependency.
   */
  async getRandomQuestions({ company, assessment, limit = 10 }) {
    // Filter questions based on company and assessment
    const matchedQuestions = technicalQuestionsData.filter(q => 
      q.company === company && q.assessment === assessment
    );

    if (matchedQuestions.length === 0) {
      return [];
    }

    // Randomly select the required number of questions
    const shuffled = [...matchedQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, limit);

    // Format for frontend
    return selected.map(q => {
      const { correctAnswer, questionType, ...rest } = q;
      return { 
        ...rest, 
        correctAnswer: correctAnswer,
        questionType: questionType || 'MCQ',
        // ensure options is an array
        options: Array.isArray(q.options) ? q.options : Object.values(q.options || {})
      };
    });
  }
};
