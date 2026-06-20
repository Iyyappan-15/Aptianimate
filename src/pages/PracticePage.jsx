// src/pages/PracticePage.jsx
import { useEffect, useState } from 'react';
import { QUESTIONS, CATEGORIES } from '../data/questionBank';
import { recordAnswer, isAnswered } from '../utils/localStorage';
import QuestionCard from '../components/QuestionCard';
import HintSystem from '../components/HintSystem';
import AnimationPlayer from '../components/AnimationPlayer';
import QuizCheck from '../components/QuizCheck';
import Mascot from '../components/Mascot';
import Confetti from '../components/Confetti';

export default function PracticePage({ questionId, navigate }) {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [result, setResult] = useState(null); // 'correct' | 'wrong'

  useEffect(() => {
    // Check if it's a temp custom question
    let q = null;
    if (questionId.startsWith('custom_')) {
      try {
        const temp = localStorage.getItem('temp_custom_q');
        if (temp) q = JSON.parse(temp);
      } catch (e) { }
    }
    
    if (!q) {
      q = QUESTIONS.find(x => x.id === questionId);
    }

    if (!q) {
      navigate('');
      return;
    }
    
    setQuestion(q);
    
    // Reset state for new question
    setSelectedOption(null);
    setSubmitted(false);
    setShowAnimation(false);
    setShowQuiz(false);
    setResult(null);

    // Auto-reveal if already answered in past
    if (isAnswered(q.id)) {
      // we don't auto-submit, let them practice again, but we could
    }
  }, [questionId, navigate]);

  if (!question) return null;

  const handleSubmit = (ans) => {
    const isCorrect = ans === question.correct_answer;
    setSubmitted(true);
    setResult(isCorrect ? 'correct' : 'wrong');
    recordAnswer(question.id, question.category, isCorrect);
    // Always show the visual explanation regardless of right or wrong
    setShowAnimation(true);
  };

  const handleRevealAnswer = () => {
    setSubmitted(true);
    setResult('wrong');
    recordAnswer(question.id, question.category, false);
    setShowAnimation(true);
  };

  return (
    <div className="page-wide" style={{ animation: 'fadeIn 0.5s ease' }}>
      {result === 'correct' && <Confetti />}
      <Mascot result={result} />

      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('')} 
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: 0, fontWeight: 500, transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Home
        </button>
        <span style={{ opacity: 0.5 }}>/</span>
        <button 
          onClick={() => navigate(`category/${question.category}`)} 
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: 0, fontWeight: 500, transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          {CATEGORIES.find(c => c.id === question.category)?.name || 'Category'}
        </button>
        <span style={{ opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>Practice</span>
      </div>

      <div className="practice-layout">
        {/* Left Column: Question & Hints */}
        <div className="flex-col gap-24">
          <QuestionCard
            question={question}
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
            submitted={submitted}
            onSubmit={handleSubmit}
          />

          {!showAnimation && submitted && result === 'wrong' && (
            <div style={{ animation: 'slideUp 0.4s ease' }}>
              <HintSystem question={question} onRevealAnswer={handleRevealAnswer} />
            </div>
          )}
        </div>

        {/* Right Column: Animation & Quiz */}
        <div className="flex-col gap-24">
          {showAnimation ? (
            <div style={{ animation: 'slideUp 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
              <AnimationPlayer
                animationScript={question.animation_script}
                conceptSummary={question.concept_summary}
                onComplete={() => {
                  if (question.follow_up_questions?.length > 0) {
                    setTimeout(() => setShowQuiz(true), 1500);
                  }
                }}
              />
            </div>
          ) : (
            <div className="empty-state" style={{ border: '1px dashed var(--border)', borderRadius: 'var(--radius)', height: '100%', minHeight: 400 }}>
              <div className="icon">🎬</div>
              <div className="title">Animation Locked</div>
              <div className="sub">Submit your answer to unlock the step-by-step visual explanation.</div>
            </div>
          )}

          {showQuiz && question.follow_up_questions && question.follow_up_questions[0] && (
            <QuizCheck quiz={question.follow_up_questions[0]} />
          )}
        </div>
      </div>
    </div>
  );
}
