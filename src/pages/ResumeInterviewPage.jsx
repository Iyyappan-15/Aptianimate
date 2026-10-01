// src/pages/ResumeInterviewPage.jsx
import { useState } from 'react';
import ResumeUploadStep from '../components/interview/ResumeUploadStep';
import VoiceCallRoom from '../components/interview/VoiceCallRoom';
import InterviewScorecard from '../components/interview/InterviewScorecard';

export default function ResumeInterviewPage({ navigate }) {
  // Steps: 'upload' | 'call' | 'scorecard'
  const [currentStep, setCurrentStep] = useState('upload');
  const [candidateConfig, setCandidateConfig] = useState(null);
  const [callResults, setCallResults] = useState(null);

  const handleStartCall = (config) => {
    setCandidateConfig(config);
    setCurrentStep('call');
  };

  const handleCallComplete = (results) => {
    setCallResults(results);
    setCurrentStep('scorecard');
  };

  const handleRetake = () => {
    setCandidateConfig(null);
    setCallResults(null);
    setCurrentStep('upload');
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '40px' }}>
      {/* Top back navigation button */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px 16px 0' }}>
        <button
          onClick={() => {
            if (currentStep === 'call') {
              if (window.confirm('Leave interview call? Your current progress will be lost.')) {
                navigate(-1);
              }
            } else {
              navigate(-1);
            }
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--muted)',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Back to Mock Tests
        </button>
      </div>

      {currentStep === 'upload' && (
        <ResumeUploadStep onStartInterview={handleStartCall} />
      )}

      {currentStep === 'call' && candidateConfig && (
        <VoiceCallRoom
          candidateConfig={candidateConfig}
          onComplete={handleCallComplete}
          onExit={handleRetake}
        />
      )}

      {currentStep === 'scorecard' && callResults && (
        <InterviewScorecard
          candidateConfig={candidateConfig}
          qaPairs={callResults.qaPairs}
          durationSeconds={callResults.durationSeconds}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}
