import { supabase } from '../lib/supabase.js';

export const aptitudeService = {
  /**
   * Bulk insert questions into the aptitude_questions table.
   * Useful for initial data ingestion.
   * @param {Array} questions Array of question objects
   * @returns {Object} { data, error }
   */
  async ingestQuestions(questions) {
    if (!supabase) throw new Error("Supabase client is not initialized.");
    
    // Postgres lowercases column names by default, so 'correctAnswer' is 'correctanswer' in DB
    const formattedQuestions = questions.map(q => {
      const { correctAnswer, ...rest } = q;
      return { ...rest, correctanswer: correctAnswer };
    });

    const { data, error } = await supabase
      .from('aptitude_questions')
      .upsert(formattedQuestions, { onConflict: 'id' }); // Use upsert to avoid duplicate key errors on re-runs
      
    if (error) {
      console.error("Error ingesting questions:", error);
      throw error;
    }
    return { data };
  },

  /**
   * Fetch a random set of questions using DB-side randomization via RPC.
   * This is scalable — Supabase picks random rows, not the browser.
   * Requires the `get_random_questions(limit_num)` Postgres function to exist.
   * @param {number} limit Number of questions to return
   * @returns {Array} Array of question objects
   */
  async getRandomQuestions(limit = 50, company = null) {
    if (!supabase) throw new Error("Supabase client is not initialized.");

    // If company is specified, we fetch and shuffle locally to ensure filtering
    if (company) {
      const { data, error } = await supabase
        .from('aptitude_questions')
        .select('*')
        .ilike('company', `%${company}%`);
      
      if (error) {
        console.error("Error fetching aptitude questions by company:", error);
        throw error;
      }
      
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      const limited = shuffled.slice(0, limit);
      
      return limited.map(q => {
        const { correctanswer, ...rest } = q;
        return { ...rest, correctAnswer: correctanswer };
      });
    }

    // Generic fallback (no company specified) via RPC
    const { data, error } = await supabase
      .rpc('get_random_questions', { limit_num: limit });

    if (error) {
      console.error("Error fetching random questions via RPC:", error);
      const { data: allData, error: fallbackError } = await supabase
        .from('aptitude_questions')
        .select('*');
      if (fallbackError) throw fallbackError;
      const shuffled = [...allData].sort(() => 0.5 - Math.random());
      const limited = shuffled.slice(0, limit);
      return limited.map(q => {
        const { correctanswer, ...rest } = q;
        return { ...rest, correctAnswer: correctanswer };
      });
    }

    // Map 'correctanswer' back to 'correctAnswer' for the frontend
    return data.map(q => {
      const { correctanswer, ...rest } = q;
      return { ...rest, correctAnswer: correctanswer };
    });
  }
};
