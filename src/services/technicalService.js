import { supabase } from '../lib/supabase.js';

export const technicalService = {
  /**
   * Fetch a random set of technical questions for a specific company and assessment.
   * Uses a zero-RPC approach: Fetches IDs only, randomly selects the required amount,
   * then fetches the full rows. This avoids downloading the entire table to the client.
   */
  async getRandomQuestions({ company, assessment, limit = 10 }) {
    if (!supabase) throw new Error("Supabase client is not initialized.");

    // 1. Fetch all IDs matching criteria
    const { data: allIds, error: idsError } = await supabase
      .from('technical_questions')
      .select('id')
      .eq('company', company)
      .eq('assessment', assessment);

    if (idsError) {
      console.error("Error fetching technical question IDs:", idsError);
      throw idsError;
    }

    if (!allIds || allIds.length === 0) {
      return [];
    }

    // 2. Randomly select the required number of IDs
    const shuffledIds = [...allIds].sort(() => 0.5 - Math.random());
    const selectedIds = shuffledIds.slice(0, limit).map(row => row.id);

    // 3. Fetch full data for those specific IDs
    const { data: questions, error: fetchError } = await supabase
      .from('technical_questions')
      .select('*')
      .in('id', selectedIds);

    if (fetchError) {
      console.error("Error fetching technical questions data:", fetchError);
      throw fetchError;
    }

    // 4. Map 'correctanswer' back to 'correctAnswer' and format for frontend
    // Shuffle the final array to randomize the order of the selected questions
    const finalQuestions = [...questions].sort(() => 0.5 - Math.random());
    
    return finalQuestions.map(q => {
      const { correctanswer, questiontype, ...rest } = q;
      return { 
        ...rest, 
        correctAnswer: correctanswer,
        questionType: questiontype || 'MCQ'
      };
    });
  }
};
