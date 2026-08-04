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
    // Currently aptitudeService is generic enough, but we could add company filtering later.
    return await aptitudeService.getRandomQuestions(limit);
  },

  /**
   * Fetches the required questions for the Technical section
   */
  async getTechnicalQuestions(company = 'TCS', assessment = 'Technical') {
    const limit = this.getConfig(company)?.technical?.questions || 10;
    return await technicalService.getRandomQuestions({ company, assessment, limit });
  }
};
