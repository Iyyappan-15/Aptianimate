// src/services/topicService.js
import { TOPIC_CONTENT } from '../data/topicContent';

/**
 * Service for fetching topic content.
 * 
 * Currently, this loads from the local `TOPIC_CONTENT` object.
 * To migrate to Firebase later, you simply update the logic in `getTopicBySlug`
 * to fetch from Firestore (e.g., `getDoc(doc(db, "topics", slug))`).
 * No UI components will need to change!
 */

export const topicService = {
  /**
   * Fetch topic details by its unique slug.
   * @param {string} slug - The URL-safe slug of the topic.
   * @returns {Promise<Object|null>} The topic data or null if not found.
   */
  async getTopicBySlug(slug) {
    return new Promise((resolve) => {
      // Simulate network latency (200ms-600ms) to ensure UI handles loading states properly
      const latency = Math.floor(Math.random() * 400) + 200;
      
      setTimeout(() => {
        // Fetch from local data
        const topicData = TOPIC_CONTENT[slug];
        
        // TODO: Replace with Firebase logic:
        // const docRef = doc(db, "topics", slug);
        // const docSnap = await getDoc(docRef);
        // resolve(docSnap.exists() ? docSnap.data() : null);

        resolve(topicData || null);
      }, latency);
    });
  }
};
