/**
 * TopicPicker.jsx
 * A topic selection screen shown before starting any battle mode.
 * Supports: Select All, Clear All, category grouping, and minimum validation.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// All available topics mapped to categories — mirrors the ai-battle folder structure
export const ALL_TOPICS = {
  'Quantitative Aptitude': [
    { id: 'percentage',              label: 'Percentages' },
    { id: 'profit-loss',             label: 'Profit & Loss' },
    { id: 'time-speed-distance',     label: 'Time, Speed & Distance' },
    { id: 'time-work',               label: 'Time & Work' },
    { id: 'average',                 label: 'Averages' },
    { id: 'ratio-proportion',        label: 'Ratio & Proportion' },
    { id: 'simple-interest',         label: 'Simple Interest' },
    { id: 'compound-interest',       label: 'Compound Interest' },
    { id: 'number-system',           label: 'Number System' },
    { id: 'algebra',                 label: 'Algebra' },
    { id: 'geometry',                label: 'Geometry' },
    { id: 'permutation-combination', label: 'Permutation & Combination' },
    { id: 'probability',             label: 'Probability' },
    { id: 'pipes-cisterns',          label: 'Pipes & Cisterns' },
  ],
  'Logical Reasoning': [
    { id: 'puzzle',                  label: 'Puzzles' },
    { id: 'seating-arrangement',     label: 'Seating Arrangement' },
    { id: 'blood-relation',          label: 'Blood Relations' },
    { id: 'coding-decoding',         label: 'Coding & Decoding' },
    { id: 'ranking',                 label: 'Ranking & Order' },
    { id: 'calendar',                label: 'Calendar' },
    { id: 'clock',                   label: 'Clocks' },
    { id: 'alphabet',                label: 'Alphabet Series' },
    { id: 'statement-conclusion',    label: 'Statement & Conclusion' },
  ],
  'Verbal Ability': [
    { id: 'synonyms',                label: 'Synonyms' },
    { id: 'antonyms',                label: 'Antonyms' },
    { id: 'vocabulary',              label: 'Vocabulary' },
    { id: 'grammar',                 label: 'Grammar' },
    { id: 'sentence-completion',     label: 'Sentence Completion' },
    { id: 'sentence-correction',     label: 'Sentence Correction' },
  ],
  'Technical': [
    { id: 'data-structures',         label: 'Data Structures' },
    { id: 'algorithms',              label: 'Algorithms' },
    { id: 'dbms',                    label: 'DBMS' },
    { id: 'oops',                    label: 'OOPs Concepts' },
    { id: 'operating-system',        label: 'Operating Systems' },
    { id: 'computer-networks',       label: 'Computer Networks' },
  ],
};

// All topic IDs flattened
export const ALL_TOPIC_IDS = Object.values(ALL_TOPICS).flat().map(t => t.id);

const CATEGORY_COLORS = {
  'Quantitative Aptitude': { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.3)' },
  'Logical Reasoning':     { accent: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)' },
  'Verbal Ability':        { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)' },
  'Technical':             { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.3)' },
};

const CATEGORY_ICONS = {
  'Quantitative Aptitude': '🔢',
  'Logical Reasoning':     '🧩',
  'Verbal Ability':        '📝',
  'Technical':             '💻',
};

export default function TopicPicker({ mode, onStart, onBack }) {
  const [selectedTopics, setSelectedTopics] = useState(new Set(ALL_TOPIC_IDS));
  const [expandedCategories, setExpandedCategories] = useState(new Set(Object.keys(ALL_TOPICS)));
  const [error, setError] = useState('');

  const totalSelected = selectedTopics.size;

  const toggleTopic = (topicId) => {
    setError('');
    setSelectedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  const toggleCategory = (category) => {
    setError('');
    const categoryIds = ALL_TOPICS[category].map(t => t.id);
    const allSelected = categoryIds.every(id => selectedTopics.has(id));
    setSelectedTopics(prev => {
      const next = new Set(prev);
      if (allSelected) categoryIds.forEach(id => next.delete(id));
      else categoryIds.forEach(id => next.add(id));
      return next;
    });
  };

  const toggleExpandCategory = (cat) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectAll = () => { setError(''); setSelectedTopics(new Set(ALL_TOPIC_IDS)); };
  const clearAll  = () => { setError(''); setSelectedTopics(new Set()); };

  const handleStart = () => {
    if (totalSelected === 0) {
      setError('Please select at least 1 topic to start the battle.');
      return;
    }
    onStart(Array.from(selectedTopics));
  };

  const modeLabel = mode === 'ai' ? 'Battle AI' : mode === 'friend' ? 'Battle Friend' : 'Play Globally';
  const modeColor = mode === 'ai' ? '#8b5cf6' : mode === 'friend' ? '#3b82f6' : '#10b981';

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '32px 20px 60px',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '32px', width: '100%', maxWidth: 780 }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', cursor: 'pointer', fontSize: '0.9rem',
              fontWeight: 600, padding: '8px 16px', borderRadius: 999, transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surface2)'}
          >
            Back ↩
          </button>
        </div>
        <div style={{ fontSize: '2.6rem', marginBottom: 8 }}>⚔️</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 8px', color: modeColor }}>
          {modeLabel} — Choose Topics
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: 0 }}>
          Questions will only come from the topics you select below.
        </p>
      </motion.div>

      {/* Control bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', maxWidth: 780, marginBottom: 20, flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
          <span style={{ color: modeColor, fontSize: '1.3rem', fontWeight: 900 }}>{totalSelected}</span>
          <span style={{ color: 'var(--muted)' }}> / {ALL_TOPIC_IDS.length} topics selected</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={selectAll} style={{
            padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer', border: '2px solid var(--violet)', background: 'transparent',
            color: 'var(--violet)', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--violet)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--violet)'; }}
          >✓ Select All</button>
          <button onClick={clearAll} style={{
            padding: '8px 18px', borderRadius: 999, fontWeight: 700, fontSize: '0.85rem',
            cursor: 'pointer', border: '2px solid var(--border)', background: 'transparent',
            color: 'var(--muted)', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >✕ Clear All</button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ width: '100%', maxWidth: 780, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(ALL_TOPICS).map(([category, topics]) => {
          const colors = CATEGORY_COLORS[category];
          const icon   = CATEGORY_ICONS[category];
          const categoryIds = topics.map(t => t.id);
          const selectedInCat = categoryIds.filter(id => selectedTopics.has(id)).length;
          const allInCatSelected = selectedInCat === categoryIds.length;
          const noneInCatSelected = selectedInCat === 0;
          const isExpanded = expandedCategories.has(category);

          return (
            <motion.div key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'var(--surface)', borderRadius: 16, overflow: 'hidden',
                border: `1.5px solid ${allInCatSelected ? colors.accent : 'var(--border)'}`,
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', background: allInCatSelected ? colors.bg : 'transparent',
                transition: 'background 0.2s',
              }}>
                <button onClick={() => toggleExpandCategory(category)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, background: 'none',
                  border: 'none', cursor: 'pointer', color: 'var(--text)', fontWeight: 800,
                  fontSize: '1rem', flex: 1, textAlign: 'left', padding: 0,
                }}>
                  <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                  <span style={{ color: allInCatSelected ? colors.accent : 'var(--text)' }}>{category}</span>
                  <span style={{
                    fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)',
                    background: 'var(--surface2)', padding: '2px 8px', borderRadius: 999,
                  }}>{selectedInCat}/{categoryIds.length}</span>
                  <span style={{
                    marginLeft: 4, color: 'var(--muted)', fontSize: '0.85rem',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s', display: 'inline-block',
                  }}>›</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleCategory(category); }} style={{
                  padding: '6px 14px', borderRadius: 999, fontWeight: 700, fontSize: '0.8rem',
                  cursor: 'pointer', border: `1.5px solid ${colors.accent}`, whiteSpace: 'nowrap',
                  background: allInCatSelected ? colors.accent : 'transparent',
                  color: allInCatSelected ? '#fff' : colors.accent, transition: 'all 0.15s',
                }}>
                  {allInCatSelected ? '✓ All' : noneInCatSelected ? '+ Select All' : `+ ${categoryIds.length - selectedInCat} more`}
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '4px 20px 20px', display: 'flex', flexWrap: 'wrap', gap: 10,
                      borderTop: '1px solid var(--border)',
                    }}>
                      {topics.map(topic => {
                        const isSel = selectedTopics.has(topic.id);
                        return (
                          <motion.button key={topic.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            onClick={() => toggleTopic(topic.id)}
                            style={{
                              padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
                              border: `1.5px solid ${isSel ? colors.accent : 'var(--border)'}`,
                              background: isSel ? colors.bg : 'var(--surface2)',
                              color: isSel ? colors.accent : 'var(--muted)',
                              fontWeight: isSel ? 700 : 500, fontSize: '0.85rem',
                              transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6,
                            }}
                          >
                            {isSel && <span style={{ fontSize: '0.7rem' }}>✓</span>}
                            {topic.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              marginTop: 20, padding: '10px 20px', borderRadius: 10,
              background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444',
              color: '#ef4444', fontWeight: 600, fontSize: '0.9rem',
            }}
          >⚠️ {error}</motion.div>
        )}
      </AnimatePresence>

      {/* Start button */}
      <motion.button
        whileHover={{ scale: totalSelected > 0 ? 1.03 : 1 }}
        whileTap={{ scale: totalSelected > 0 ? 0.97 : 1 }}
        onClick={handleStart}
        disabled={totalSelected === 0}
        style={{
          marginTop: 32, padding: '16px 56px', borderRadius: 14, fontSize: '1.1rem',
          fontWeight: 800, border: 'none', color: '#fff', letterSpacing: '0.5px',
          cursor: totalSelected === 0 ? 'not-allowed' : 'pointer',
          background: totalSelected === 0 ? 'var(--border)' : `linear-gradient(135deg, ${modeColor}, ${modeColor}cc)`,
          opacity: totalSelected === 0 ? 0.6 : 1, transition: 'all 0.2s',
          boxShadow: totalSelected > 0 ? `0 8px 24px ${modeColor}44` : 'none',
        }}
      >
        {totalSelected === 0
          ? 'Select at least 1 topic'
          : `🚀 Start ${modeLabel} (${totalSelected} topic${totalSelected === 1 ? '' : 's'})`}
      </motion.button>

      <p style={{ marginTop: 12, color: 'var(--muted)', fontSize: '0.82rem', textAlign: 'center' }}>
        30 questions will be drawn randomly from your selected topics
      </p>
    </div>
  );
}
