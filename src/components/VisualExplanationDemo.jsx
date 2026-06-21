// src/components/VisualExplanationDemo.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VisualExplanationDemo({ navigate }) {
  const [step, setStep] = useState(0);

  // Auto-advance some steps for the demo feel, but allow manual control
  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const replay = () => {
    setStep(0);
  };

  // Optional: Auto-play the first few steps to catch attention
  useEffect(() => {
    let timer;
    if (step === 0) {
      timer = setTimeout(() => setStep(1), 1500); // start trains moving after 1.5s
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), 2500); // show relative speed after trains meet
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2000); // show calculation
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), 3000); // show final answer
    } else if (step === 4) {
      timer = setTimeout(() => setStep(5), 2500); // show CTA
    }
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="demo-section">
      <div className="demo-header">
        <h2>🎬 Visual Explanation Demo</h2>
        <p>See how AptiAnimate transforms complex aptitude problems into easy-to-understand visual animations.</p>
      </div>

      <div className="demo-container">
        {/* Sample Question Box */}
        <div className="demo-question-box">
          <strong>Question:</strong> Train A is moving at 60 km/h and Train B is moving at 40 km/h in the opposite direction. The distance between them is 500 meters. How long will it take for them to meet?
        </div>

        {/* Animation Arena */}
        <div className="demo-arena">
          {/* Tracks */}
          <div className="track-line"></div>
          
          {/* Train A */}
          <motion.div
            className="train train-a"
            initial={{ left: '0%' }}
            animate={{ left: step >= 1 ? '40%' : '0%' }}
            transition={{ duration: 2.5, ease: 'linear' }}
          >
            <div className="train-icon">🚄 Train A</div>
            <div className="train-speed">60 km/h →</div>
          </motion.div>

          {/* Train B */}
          <motion.div
            className="train train-b"
            initial={{ right: '0%' }}
            animate={{ right: step >= 1 ? '40%' : '0%' }}
            transition={{ duration: 2.5, ease: 'linear' }}
          >
            <div className="train-icon">Train B 🚅</div>
            <div className="train-speed">← 40 km/h</div>
          </motion.div>

          {/* Distance Indicator */}
          <AnimatePresence>
            {step < 2 && (
              <motion.div
                className="distance-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="dist-line"></div>
                {/* A simple trick to animate numbers is to use a keyframe animation in CSS or swap values, since Framer Motion text tweening requires custom hooks. We will just use a CSS trick or static text that changes. */}
                <div className="dist-text">
                  {step === 0 ? '500m' : 'Closing distance...'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanations (Steps 2-4) */}
          <div className="demo-explanations">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  className="expl-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <div className="expl-label">1. Relative Speed</div>
                  <div className="expl-math">60 + 40 = <strong>100 km/h</strong></div>
                  <div className="expl-note">(Opposite directions = add speeds)</div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  className="expl-card"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                >
                  <div className="expl-label">2. Calculation</div>
                  <div className="expl-math">Time = Distance / Speed</div>
                  <div className="expl-note">T = 500m / (100 × 5/18 m/s)</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Final Answer */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                className="final-answer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                🎉 18 Seconds
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Step */}
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                className="demo-cta-overlay"
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
              >
                <div className="demo-cta-content">
                  <h3>Imagine learning every aptitude topic this way.</h3>
                  <div className="demo-cta-buttons">
                    <button className="goal-btn selected" onClick={() => navigate('category/number-systems')}>Start Learning</button>
                    <button className="goal-btn" onClick={() => window.scrollTo({top: document.querySelector('.goal-selector').offsetTop, behavior: 'smooth'})}>Explore Roadmap</button>
                  </div>
                  <button className="replay-btn" onClick={replay}>↺ Replay Demo</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Manual Controls */}
        {step < 5 && (
          <div className="demo-controls">
            <button className="demo-ctrl-btn" onClick={replay} disabled={step === 0}>↺ Replay</button>
            <button className="demo-ctrl-btn primary" onClick={nextStep}>Next Step →</button>
          </div>
        )}
      </div>
    </div>
  );
}
