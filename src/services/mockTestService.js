import { aptitudeService } from './aptitudeService.js';
import { technicalService } from './technicalService.js';
import { MOCK_TEST_CONFIG } from '../config/mockTestConfig.js';

export const mockTestService = {
  /**
   * Retrieves the full test configuration for a specific company
   */
  getConfig(company = 'TCS') {
    return MOCK_TEST_CONFIG[company];
  },

  /**
   * Fetches the required questions for the Aptitude section
   */
  async getAptitudeQuestions(company = 'TCS') {
    const limit = this.getConfig(company)?.aptitude?.questions || 50;
    return await aptitudeService.getRandomQuestions(limit, company);
  },

  /**
   * Fetches the required questions for the Technical section
   */
  async getTechnicalQuestions(company = 'TCS', assessment = 'Technical') {
    const limit = this.getConfig(company)?.technical?.questions || 10;
    let questions = await technicalService.getRandomQuestions({ company, assessment, limit });
    
    // Fallback to generic/TCS questions if company-specific ones aren't available yet
    if (!questions || questions.length === 0) {
      questions = await technicalService.getRandomQuestions({ company: 'TCS', assessment, limit });
    }
    
    return questions;
  }
};
