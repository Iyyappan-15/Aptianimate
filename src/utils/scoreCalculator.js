/**
 * scoreCalculator.js
 * Pure utility function: takes user answers and questions, returns full analytics.
 */

/**
 * @param {Array} questions  - Array of question objects (with .id and .correctAnswer)
 * @param {Object} answers   - Map of { questionId: selectedOption }
 * @param {Object} marked    - Map of { questionId: true/false } for "Mark for Review"
 * @param {number} timeTakenSeconds - Actual seconds used during the test
 * @param {number} totalSeconds     - Total allowed seconds (e.g. 3000 for 50 mins)
 * @returns {Object} Full analytics object
 */
export function calculateScore({ questions, answers, marked, timeTakenSeconds, totalSeconds }) {
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;

  const breakdown = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isAttempted = !!userAnswer;
    const isCorrect = isAttempted && userAnswer === q.correctAnswer;
    const isMarked = !!marked[q.id];

    if (!isAttempted) unattempted++;
    else if (isCorrect) correct++;
    else incorrect++;

    return {
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswer || null,
      isCorrect,
      isAttempted,
      isMarked,
      topic: q.topic,
    };
  });

  const attempted = correct + incorrect;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  const score = correct; // 1 mark per correct, no negative marking
  const timeTaken = timeTakenSeconds;
  const timeRemaining = totalSeconds - timeTakenSeconds;

  return {
    score,
    total: questions.length,
    correct,
    incorrect,
    unattempted,
    attempted,
    accuracy,
    timeTaken,
    timeRemaining,
    breakdown,
  };
}
