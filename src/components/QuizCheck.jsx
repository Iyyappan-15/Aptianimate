// src/components/QuizCheck.jsx
import { useState } from 'react';

export default function QuizCheck({ quiz }) {
  const [selectedOption, setSelectedOption] = useState(null);

  if (!quiz) return null;

  const handleSelect = (key) => {
    if (selectedOption) return; // already answered
    setSelectedOption(key);
  };

  const isCorrect = selectedOption === quiz.correct_answer;

  return (
    <div className="quiz-check" style={{ animation: 'fadeIn 0.5s ease both' }}>
      <div className="quiz-header">📝 Quick Check</div>
      <div className="quiz-question">{quiz.question}</div>
      <div className="quiz-options">
        {Object.entries(quiz.options).map(([key, val]) => {
          let cls = 'quiz-opt';
          if (selectedOption) {
            if (key === quiz.correct_answer) cls += ' correct';
            else if (key === selectedOption) cls += ' wrong';
          }
          return (
            <button
              key={key}
              className={cls}
              onClick={() => handleSelect(key)}
              disabled={!!selectedOption}
            >
              <span className="opt-letter">{key}</span>
              <span>{val}</span>
            </button>
          );
        })}
      </div>
      {selectedOption && (
        <div className={`quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✨ Correct! You mastered this concept.' : `❌ The correct answer is ${quiz.correct_answer}.`}
        </div>
      )}
    </div>
  );
}
