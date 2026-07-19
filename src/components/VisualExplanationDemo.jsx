// src/components/VisualExplanationDemo.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisualExplanationDemo({ navigate }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const replay = () => {
    setStep(0);
  };

  useEffect(() => {
    let timer;
    if (step === 0) {
      timer = setTimeout(() => setStep(1), 1200); 
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), 2200); 
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2000); 
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), 2500); 
    } else if (step === 4) {
      timer = setTimeout(() => setStep(5), 2500); 
    }
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="demo-section">
      <div className="demo-header">
        <motion.div 
          className="demo-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Visual Engine
        </motion.div>
        <h2>See Math Come to Life</h2>
        <p>AptiAnimate turns abstract word problems into clear, interactive visual stories.</p>
      </div>

      <div className="demo-container">
        <div className="demo-question-box">
          <div className="q-label">Example Problem</div>
          <p>
            <strong>Train A</strong> is moving at 60 km/h and <strong>Train B</strong> is moving at 40 km/h in the opposite direction. 
            The distance between them is 500 meters. How long will it take for them to meet?
          </p>
        </div>

        <div className="demo-arena">
          {/* Background Grid */}
          <div className="demo-grid-bg"></div>

          {/* Tracks */}
          <div className="track-line">
            <div className="track-ties"></div>
          </div>
          
          {/* Train A */}
          <motion.div
            className="train train-a"
            initial={{ left: '5%' }}
            animate={{ left: step >= 1 ? '40%' : '5%' }}
            transition={{ duration: 2, ease: 'linear' }}
          >
            <div className="train-icon">
              <span className="train-emoji">🚄</span>
              <span className="train-name">Train A</span>
            </div>
            <div className="train-speed">60 km/h <span>→</span></div>
          </motion.div>

          {/* Train B */}
          <motion.div
            className="train train-b"
            initial={{ right: '5%' }}
            animate={{ right: step >= 1 ? '40%' : '5%' }}
            transition={{ duration: 2, ease: 'linear' }}
          >
            <div className="train-icon">
              <span className="train-name">Train B</span>
              <span className="train-emoji">🚅</span>
            </div>
            <div className="train-speed"><span>←</span> 40 km/h</div>
          </motion.div>

          {/* Distance Indicator */}
          <AnimatePresence>
            {step < 2 && (
              <motion.div
                className="distance-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="dist-line"></div>
                <div className="dist-text">
                  {step === 0 ? 'Distance: 500m' : 'Closing distance...'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Meeting Point / Explosion */}
          <AnimatePresence>
            {step >= 2 && step < 4 && (
              <motion.div 
                className="meet-point"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.6 }}
              >
                💥 Meet!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanations Panel */}
          <div className="demo-explanations">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  className="expl-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <div className="expl-icon">⚡</div>
                  <div className="expl-content">
                    <div className="expl-label">Step 1: Relative Speed</div>
                    <div className="expl-math">60 + 40 = <strong>100 km/h</strong></div>
                    <div className="expl-note">Opposite directions → Add speeds</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  className="expl-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                >
                  <div className="expl-icon">⏱️</div>
                  <div className="expl-content">
                    <div className="expl-label">Step 2: Time = Dist / Speed</div>
                    <div className="expl-math">500m / (100 × 5/18)</div>
                    <div className="expl-note">Convert km/h to m/s</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Final Answer */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                className="final-answer"
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
              >
                <div className="answer-label">Answer</div>
                <div className="answer-value">18 Seconds</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Step */}
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                className="demo-cta-overlay"
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              >
                <div className="demo-cta-content">
                  <div className="demo-cta-icon">🎓</div>
                  <h3>Master Aptitude Visually</h3>
                  <p>Stop memorizing formulas. Start understanding the logic through interactive animations.</p>
                  <div className="demo-cta-buttons">
                    <button className="goal-btn selected" onClick={() => navigate('category/number-systems')}>Start Learning</button>
                    <button className="goal-btn" onClick={() => window.scrollTo({top: document.querySelector('.goal-selector')?.offsetTop || 0, behavior: 'smooth'})}>Explore Topics</button>
                  </div>
                  <button className="replay-btn" onClick={replay}>↺ Watch Demo Again</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Manual Controls */}
        {step < 5 && (
          <div className="demo-controls">
            <button className="demo-ctrl-btn" onClick={replay} disabled={step === 0}>
              ↺ Replay
            </button>
            <button className="demo-ctrl-btn primary" onClick={nextStep}>
              Next Step <span className="arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
