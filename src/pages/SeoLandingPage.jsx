// src/pages/SeoLandingPage.jsx
// High-converting, SEO-optimized landing page for top search queries.
// Features: Live Physics Engine simulator, Formula Cheat Sheet, Step-by-Step Examples,
// FAQ with Schema.org JSON-LD markup, and 1-click WhatsApp / Short creation studio.

import { useState, useEffect } from 'react';
import { updatePageSEO } from '../utils/seoHelper';
import TrainPhysicsEngine from '../components/engines/TrainPhysicsEngine';
import BoatPhysicsEngine from '../components/engines/BoatPhysicsEngine';
import ClockPhysicsEngine from '../components/engines/ClockPhysicsEngine';
import CisternPhysicsEngine from '../components/engines/CisternPhysicsEngine';
import ReelCaptureModal from '../components/ReelCaptureModal';

const SEO_TOPICS = {
  'problems-on-trains': {
    slug: 'trains',
    title: 'Problems on Trains — Formulas, Shortcuts & Animated Practice',
    metaDesc: 'Master Problems on Trains with visual physics animations. Learn Relative Speed shortcuts, km/h to m/s conversion, pole crossing, and platform crossing for TCS NQT & SSC CGL.',
    h1: 'Problems on Trains: Visual Shortcuts & Practice',
    badge: '🚂 Quantitative Aptitude',
    hook: 'Why do speeds ADD UP when trains move in opposite directions?',
    formulaPill: 'Relative Speed = S₁ + S₂ (Opposite)',
    engineType: 'train',
    formulas: [
      {
        name: 'Unit Conversion (km/h to m/s)',
        formula: 'x km/h = x × (5 / 18) m/s',
        note: 'Always convert speeds to m/s when train lengths are given in meters.',
      },
      {
        name: 'Crossing a Stationary Pole or Person',
        formula: 'Time = Length of Train / Speed of Train',
        note: 'A pole or person has negligible length, so distance = length of train.',
      },
      {
        name: 'Crossing a Platform or Bridge',
        formula: 'Time = (Length of Train + Length of Platform) / Speed',
        note: 'Distance covered equals the train length PLUS the platform length.',
      },
      {
        name: 'Relative Speed: Opposite Direction',
        formula: 'Relative Speed = S₁ + S₂',
        note: 'Trains moving towards each other close the distance at their combined speed.',
      },
      {
        name: 'Relative Speed: Same Direction (Overtaking)',
        formula: 'Relative Speed = |S₁ − S₂|',
        note: 'The faster train gains distance at the difference of their two speeds.',
      },
    ],
    examples: [
      {
        q: 'A train 125 meters long passes a telegraph pole in 9 seconds. Find the speed of the train in km/h.',
        steps: [
          'Step 1: Distance = Length of train = 125 m. Time = 9 seconds.',
          'Step 2: Speed in m/s = Distance / Time = 125 / 9 m/s.',
          'Step 3: Convert to km/h by multiplying with (18 / 5): (125 / 9) × (18 / 5) = 25 × 2 = 50 km/h.',
        ],
        ans: '50 km/h',
      },
      {
        q: 'Two trains 140m and 160m long run at speeds of 60 km/h and 40 km/h respectively in opposite directions. How long will they take to cross each other?',
        steps: [
          'Step 1: Total Distance = 140m + 160m = 300 meters.',
          'Step 2: Relative Speed (opposite) = 60 + 40 = 100 km/h.',
          'Step 3: Convert 100 km/h to m/s: 100 × (5/18) = 250 / 9 m/s.',
          'Step 4: Time = Distance / Speed = 300 / (250/9) = (300 × 9) / 250 = 10.8 seconds.',
        ],
        ans: '10.8 seconds',
      },
    ],
    faqs: [
      {
        q: 'Why do we multiply by 5/18 to convert km/h to m/s?',
        a: '1 kilometer = 1000 meters, and 1 hour = 3600 seconds. Therefore, 1 km/h = 1000m / 3600s = 5/18 m/s. Multiplying any km/h speed by 5/18 gives m/s instantly.',
      },
      {
        q: 'What is the formula when two trains cross each other in the same direction?',
        a: 'When moving in the same direction, Relative Speed = Speed₁ − Speed₂. Time taken to cross = (Length of Train₁ + Length of Train₂) / (Speed₁ − Speed₂).',
      },
      {
        q: 'Does train length matter when crossing a standing man or pole?',
        a: 'Yes, the length of the train is the exact distance the train must travel to clear the pole. However, the width of the man or pole is considered zero.',
      },
    ],
  },

  'boats-and-streams': {
    slug: 'boats-streams',
    title: 'Boats and Streams — Formulas, Shortcuts & Visual Practice',
    metaDesc: 'Master Boats & Streams aptitude questions. Learn downstream speed (u+v), upstream speed (u-v), and still water formulas with interactive animated simulations.',
    h1: 'Boats & Streams: Visual Rules & Formulas',
    badge: '🚤 Work & Motion Aptitude',
    hook: 'River current aiding vs opposing: Never mix up u+v and u-v again!',
    formulaPill: 'Downstream = u + v | Upstream = u − v',
    engineType: 'boat',
    formulas: [
      {
        name: 'Downstream Speed (With Stream)',
        formula: 'Downstream Speed (D) = u + v',
        note: 'Where u = speed of boat in still water, v = speed of water stream.',
      },
      {
        name: 'Upstream Speed (Against Stream)',
        formula: 'Upstream Speed (U) = u − v',
        note: 'The river current opposes the boat, slowing down its forward progress.',
      },
      {
        name: 'Speed of Boat in Still Water',
        formula: 'u = (Downstream + Upstream) / 2',
        note: 'Average of downstream and upstream speeds.',
      },
      {
        name: 'Rate of Water Stream (Current)',
        formula: 'v = (Downstream − Upstream) / 2',
        note: 'Half the difference between downstream and upstream speeds.',
      },
    ],
    examples: [
      {
        q: 'A boat can travel with a speed of 13 km/h in still water. If the speed of the stream is 4 km/h, find the time taken to go 68 km downstream.',
        steps: [
          'Step 1: Downstream speed = Speed of boat + Stream = 13 + 4 = 17 km/h.',
          'Step 2: Distance to cover = 68 km.',
          'Step 3: Time taken = Distance / Speed = 68 / 17 = 4 hours.',
        ],
        ans: '4 hours',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between upstream and downstream?',
        a: 'Downstream means the boat is travelling in the same direction as the water current (water pushes the boat, net speed u + v). Upstream means travelling against the water current (water resists the boat, net speed u - v).',
      },
      {
        q: 'How to calculate speed in still water if both upstream and downstream speeds are known?',
        a: 'Add both speeds and divide by 2: Speed in Still Water = (Downstream Speed + Upstream Speed) / 2.',
      },
    ],
  },

  'clock-problems': {
    slug: 'time-speed-distance',
    title: 'Clock Angle Problems — Formulas, Tricks & Visual Simulation',
    metaDesc: 'Calculate angles between clock hands at any time. Master the angle formula θ = |30H - 5.5M| with interactive analog clock simulation for placement tests.',
    h1: 'Clock Angle Problems: Visual Shortcuts',
    badge: '🕒 Reasoning & Aptitude',
    hook: 'Find angle between clock hands at 3:30 without memorizing formulas!',
    formulaPill: 'Angle θ = |30H − (11/2)M|°',
    engineType: 'clock',
    formulas: [
      {
        name: 'General Clock Angle Formula',
        formula: 'θ = |(30 × H) − (11/2 × M)| degrees',
        note: 'Where H is hour (1-12) and M is minute (0-59). If θ > 180°, reflex angle is 360° − θ.',
      },
      {
        name: 'Minute Hand Angular Speed',
        formula: 'Minute Hand = 6° per minute',
        note: 'Covers 360° in 60 minutes = 360 / 60 = 6°/min.',
      },
      {
        name: 'Hour Hand Angular Speed',
        formula: 'Hour Hand = 0.5° per minute',
        note: 'Covers 360° in 12 hours (720 min) = 360 / 720 = 0.5°/min.',
      },
      {
        name: 'Relative Speed Between Hands',
        formula: 'Relative Speed = 6° − 0.5° = 5.5° per minute',
        note: 'Minute hand gains 5.5 degrees on the hour hand every single minute.',
      },
    ],
    examples: [
      {
        q: 'What is the angle between the hands of a clock at 3:30?',
        steps: [
          'Step 1: H = 3, M = 30.',
          'Step 2: Apply formula: θ = |(30 × 3) − (11/2 × 30)| = |90 − 165| = 75°.',
          'Step 3: Since 75° < 180°, the acute angle is 75°.',
        ],
        ans: '75 degrees',
      },
    ],
    faqs: [
      {
        q: 'How many times do clock hands coincide in a 24-hour day?',
        a: 'The hands of a clock coincide exactly 22 times in a 24-hour day (11 times in 12 hours, because between 11 and 1 they coincide only once at 12:00).',
      },
      {
        q: 'What if the calculated angle is greater than 180 degrees?',
        a: 'A clock face is 360°. If your formula yields an angle greater than 180°, subtract it from 360° to find the smaller angle (e.g. 360° − 210° = 150°).',
      },
    ],
  },

  'pipes-and-cisterns': {
    slug: 'pipes-cisterns',
    title: 'Pipes and Cisterns — Shortcuts, Formulas & Animated Tank Simulation',
    metaDesc: 'Understand Pipes and Cisterns problems with animated water tank physics. Master inlet (+) and outlet (-) rates, leak problems, and combined tank fill time.',
    h1: 'Pipes & Cisterns: Formulas & Simulation',
    badge: '🚰 Time & Work Aptitude',
    hook: 'Visualize water filling and leaking in a tank step by step!',
    formulaPill: 'Net Rate = (1/A + 1/B) − 1/C',
    engineType: 'cistern',
    formulas: [
      {
        name: 'Inlet Pipe Fill Rate',
        formula: '1 Hour Work = +1 / T',
        note: 'If a pipe fills a tank in T hours, it fills 1/Tth part of the tank per hour.',
      },
      {
        name: 'Outlet / Waste Pipe Drain Rate',
        formula: '1 Hour Work = −1 / T',
        note: 'An emptying pipe takes away volume, so its rate is treated as negative work.',
      },
      {
        name: 'Two Inlets Working Together',
        formula: 'Time = (A × B) / (A + B)',
        note: 'Combined time taken when Pipe A and Pipe B both fill the tank simultaneously.',
      },
    ],
    examples: [
      {
        q: 'Pipe A can fill a tank in 10 hours and Pipe B can empty it in 15 hours. If both are opened together, how long will it take to fill the tank?',
        steps: [
          'Step 1: In 1 hour, Pipe A fills 1/10 and Pipe B empties 1/15.',
          'Step 2: Net 1-hour rate = 1/10 − 1/15 = (3 − 2) / 30 = 1/30.',
          'Step 3: Total time to fill the entire tank = 30 hours.',
        ],
        ans: '30 hours',
      },
    ],
    faqs: [
      {
        q: 'How are pipes and cisterns problems related to time and work?',
        a: 'They are fundamentally identical. An inlet pipe is like a worker building something (positive rate), while an outlet or leak pipe is like destroying work (negative rate).',
      },
    ],
  },

  'tcs-nqt-aptitude': {
    slug: 'trains',
    title: 'TCS NQT Aptitude Questions 2026 — Syllabus, Shortcuts & Practice',
    metaDesc: 'Crack TCS NQT Numerical Ability with animated explanations. Practice top repeated aptitude topics: Trains, Percentages, Profit & Loss, Time & Work.',
    h1: 'TCS NQT Aptitude: Top Questions & Shortcuts',
    badge: '🎯 Campus Placement 2026',
    hook: 'Master the top 5 most repeated TCS NQT numerical ability questions!',
    formulaPill: 'TCS NQT · 26 Questions in 40 Mins',
    engineType: 'train',
    formulas: [
      {
        name: 'TCS NQT Time Speed Distance',
        formula: 'Relative Speed = S₁ + S₂ (opposite), S₁ − S₂ (same)',
        note: 'Nearly every TCS NQT exam includes 2 questions on trains and relative speed.',
      },
      {
        name: 'Work and Efficiency Formula',
        formula: 'Total Work = Number of Men × Days × Hours × Efficiency',
        note: 'Used for alternating worker problems and pipe cistern problems.',
      },
      {
        name: 'Successive Percentage Shortcut',
        formula: 'Net Change = a + b + (ab / 100) %',
        note: 'Essential for successive discounts and profit-loss calculations.',
      },
    ],
    examples: [
      {
        q: 'A and B can do a piece of work in 12 days, B and C in 15 days, and C and A in 20 days. How long will A take alone?',
        steps: [
          'Step 1: 2(A + B + C) 1-day work = 1/12 + 1/15 + 1/20 = (5 + 4 + 3) / 60 = 12/60 = 1/5.',
          'Step 2: (A + B + C) 1-day work = 1/10.',
          'Step 3: A 1-day work = (A + B + C) − (B + C) = 1/10 − 1/15 = (3 − 2) / 30 = 1/30.',
          'Step 4: A alone takes 30 days.',
        ],
        ans: '30 days',
      },
    ],
    faqs: [
      {
        q: 'What is the syllabus for TCS NQT Numerical Ability?',
        a: 'The key topics include Number Systems, Percentages, Profit & Loss, Time Speed Distance (Trains & Boats), Time & Work, Ratio & Proportion, Averages, and Data Interpretation.',
      },
      {
        q: 'Is there negative marking in TCS NQT Foundation section?',
        a: 'In recent patterns, there is no negative marking, but accuracy and time management (averaging 1.5 minutes per question) are critical for getting shortlisted.',
      },
    ],
  },
};

export default function SeoLandingPage({ topicKey, navigate }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);
  const [simPreset, setSimPreset] = useState('opposite');

  const topic = SEO_TOPICS[topicKey] || SEO_TOPICS['problems-on-trains'];

  // Update dynamic SEO & Schema on mount / topic switch
  useEffect(() => {
    window.scrollTo(0, 0);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topic.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    };

    updatePageSEO({
      title: `${topic.title} | AptiAnimate`,
      description: topic.metaDesc,
      canonicalUrl: `https://aptianimate.vercel.app/topics/${topicKey}`,
      schema,
    });
  }, [topicKey, topic]);

  // Construct mock steps for physics engines
  const getSimStep = () => {
    if (topic.engineType === 'train') {
      if (simPreset === 'pole') {
        return {
          step: 1,
          title: 'Train Crossing Pole',
          explanation: 'Train crossing a telegraph pole. Distance equals train length.',
          render_data: {
            entities: [{ type: 'train', label: '125m Train @ 50 km/h', startX: 5, endX: 85, duration: 2.5 }],
            obstacle: { type: 'pole', label: 'Pole', x: 75 },
            distance: '125m',
            total_distance: '125 meters',
          },
        };
      }
      if (simPreset === 'same') {
        return {
          step: 1,
          title: 'Two Trains Same Direction',
          explanation: 'Fast train overtakes slow train. Relative speed is difference.',
          render_data: {
            entities: [
              { type: 'train', label: 'Fast 80 km/h', startX: 5, endX: 85, duration: 2.4 },
              { type: 'train', label: 'Slow 50 km/h', startX: 45, endX: 75, duration: 3.2 },
            ],
            distance: '300m',
            total_distance: 'V_rel = 80 − 50 = 30 km/h',
          },
        };
      }
      return {
        step: 1,
        title: 'Two Trains Opposite Direction',
        explanation: 'Trains approach each other. Speeds add up for fast closing time.',
        render_data: {
          entities: [
            { type: 'train', label: 'Train A @ 60 km/h', startX: 5, endX: 45, duration: 2.2 },
            { type: 'train', label: 'Train B @ 40 km/h', startX: 95, endX: 55, duration: 2.2 },
          ],
          distance: '500m',
          total_distance: 'V_rel = 60 + 40 = 100 km/h',
        },
      };
    }

    if (topic.engineType === 'boat') {
      const isUp = simPreset === 'upstream';
      return {
        step: 1,
        title: isUp ? 'Upstream: Against Current' : 'Downstream: With Current',
        explanation: isUp ? 'River resists boat: u − v' : 'River aids boat: u + v',
        render_data: {
          entities: [
            { type: 'boat', label: isUp ? 'Boat (Upstream 9 km/h)' : 'Boat (Downstream 17 km/h)', startX: isUp ? 85 : 10, endX: isUp ? 20 : 80, duration: 2.8 },
          ],
          total_distance: isUp ? 'Net = 13 − 4 = 9 km/h' : 'Net = 13 + 4 = 17 km/h',
        },
      };
    }

    if (topic.engineType === 'clock') {
      return {
        step: 1,
        title: 'Clock Angle at 3:30',
        explanation: 'Angle between hands at 3:30 is exactly 75 degrees.',
        render_data: { hours: 3, minutes: 30 },
      };
    }

    return {
      step: 1,
      title: 'Water Cistern Fill',
      explanation: 'Inlet A fills, Outlet C drains.',
      render_data: { fill_pct: 65, total_distance: 'Net Rate = +1/10 − 1/15' },
    };
  };

  const renderEngine = () => {
    const step = getSimStep();
    if (topic.engineType === 'train') return <TrainPhysicsEngine step={step} isActive={true} />;
    if (topic.engineType === 'boat') return <BoatPhysicsEngine step={step} isActive={true} />;
    if (topic.engineType === 'clock') return <ClockPhysicsEngine step={step} isActive={true} />;
    return <CisternPhysicsEngine step={step} isActive={true} />;
  };

  const handleShareWhatsApp = () => {
    const text = `🔥 Check out this visual formula cheat sheet for ${topic.h1} on AptiAnimate:\n👉 https://aptianimate.vercel.app/topics/${topicKey}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px 64px' }}>
      {/* ── Breadcrumb ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '16px' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('')}>Home</span>
        <span>›</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('category/quantitative-aptitude')}>Aptitude</span>
        <span>›</span>
        <span style={{ color: 'var(--violet)', fontWeight: 700 }}>{topic.badge}</span>
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(124, 58, 237, 0.1)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          color: 'var(--violet)',
          fontSize: '0.85rem',
          fontWeight: 800,
          padding: '6px 16px',
          borderRadius: '24px',
          marginBottom: '12px',
        }}>
          {topic.badge}
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 900,
          lineHeight: 1.2,
          margin: '0 0 12px 0',
          color: 'var(--text-main)',
        }}>
          {topic.h1}
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-sec)',
          maxWidth: '680px',
          margin: '0 auto 20px',
          lineHeight: 1.6,
        }}>
          Stop memorizing formulas blindly. Understand the physics and step-by-step logic through interactive visual models.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(`topic/${topic.slug}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, var(--violet), var(--teal))',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(124, 58, 237, 0.3)',
            }}
          >
            <span>🚀</span> Start Practicing 80+ Questions
          </button>

          <button
            onClick={() => setIsReelModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--surface2)',
              border: '1.5px solid var(--border)',
              color: 'var(--text-main)',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            <span>🎬</span> Create Short / Reel
          </button>

          <button
            onClick={handleShareWhatsApp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#25D366',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            <span>💬</span> Share Cheat Sheet
          </button>
        </div>
      </div>

      {/* ── Live Interactive Simulator Section ── */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '36px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--violet)' }}>
              Interactive Simulator
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0' }}>
              Test Scenarios in Real-Time
            </h2>
          </div>

          {/* Scenario Switchers */}
          {topic.engineType === 'train' && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSimPreset('opposite')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  background: simPreset === 'opposite' ? 'var(--violet)' : 'var(--surface2)',
                  color: simPreset === 'opposite' ? '#fff' : 'var(--text-sec)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Opposite (V₁ + V₂)
              </button>
              <button
                onClick={() => setSimPreset('same')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  background: simPreset === 'same' ? 'var(--violet)' : 'var(--surface2)',
                  color: simPreset === 'same' ? '#fff' : 'var(--text-sec)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Same Direction
              </button>
              <button
                onClick={() => setSimPreset('pole')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  background: simPreset === 'pole' ? 'var(--violet)' : 'var(--surface2)',
                  color: simPreset === 'pole' ? '#fff' : 'var(--text-sec)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Crossing Pole
              </button>
            </div>
          )}

          {topic.engineType === 'boat' && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSimPreset('downstream')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  background: simPreset === 'downstream' ? 'var(--teal)' : 'var(--surface2)',
                  color: simPreset === 'downstream' ? '#fff' : 'var(--text-sec)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Downstream (u + v)
              </button>
              <button
                onClick={() => setSimPreset('upstream')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  background: simPreset === 'upstream' ? 'var(--coral)' : 'var(--surface2)',
                  color: simPreset === 'upstream' ? '#fff' : 'var(--text-sec)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Upstream (u − v)
              </button>
            </div>
          )}
        </div>

        {/* Engine Render */}
        {renderEngine()}
      </div>

      {/* ── Formula Cheat Sheet ── */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
          📐 Core Formulas & Shortcuts
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {topic.formulas.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--violet)' }}>
                {item.name}
              </div>
              <div style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                fontWeight: 800,
                color: 'var(--text-main)',
              }}>
                {item.formula}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Real Exam Examples ── */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
          💡 Step-by-Step Solved Examples
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {topic.examples.map((ex, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)' }}>
                Q{idx + 1}: {ex.q}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                {ex.steps.map((st, i) => (
                  <div key={i} style={{ fontSize: '0.88rem', color: 'var(--text-sec)', lineHeight: 1.5 }}>
                    {st}
                  </div>
                ))}
              </div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                color: '#10b981',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '4px 12px',
                borderRadius: '8px',
              }}>
                Final Answer: {ex.ans}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ Accordion (Indexed by Google) ── */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
          ❓ Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topic.faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  padding: '16px 20px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <span>{faq.q}</span>
                <span style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </div>
              {openFaq === idx && (
                <div style={{
                  padding: '0 20px 16px',
                  fontSize: '0.88rem',
                  color: 'var(--text-sec)',
                  lineHeight: 1.6,
                  borderTop: '1px dashed var(--border)',
                  paddingTop: '12px',
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        textAlign: 'center',
        padding: '36px 20px',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(20, 184, 166, 0.08))',
        border: '1px solid var(--border)',
        borderRadius: '24px',
      }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 10px' }}>
          Ready to Test Your Speed?
        </h3>
        <p style={{ color: 'var(--text-sec)', maxWidth: '500px', margin: '0 auto 20px' }}>
          Practice 80+ real company exam questions on {topic.h1} with instant hints, streak rewards, and visual solutions.
        </p>
        <button
          onClick={() => navigate(`topic/${topic.slug}`)}
          style={{
            background: 'linear-gradient(135deg, var(--violet), var(--teal))',
            color: '#fff',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
          }}
        >
          Start Practice Now →
        </button>
      </div>

      {/* ── Shorts / Reel Studio Modal ── */}
      <ReelCaptureModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
        topicTitle={topic.h1}
        hookText={topic.hook}
        formulaPill={topic.formulaPill}
        shareUrl={`https://aptianimate.vercel.app/topics/${topicKey}`}
      >
        {renderEngine()}
      </ReelCaptureModal>
    </div>
  );
}
