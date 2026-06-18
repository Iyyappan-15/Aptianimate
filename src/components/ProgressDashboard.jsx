// src/components/ProgressDashboard.jsx
import { useEffect, useState } from 'react';
import { getStats, getStreak } from '../utils/localStorage';
import { CATEGORIES } from '../data/questionBank';

export default function ProgressDashboard() {
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState({ count: 0 });

  useEffect(() => {
    setStats(getStats());
    setStreak(getStreak());
  }, []);

  if (!stats) return null;

  const accuracy = stats.total_attempted > 0
    ? Math.round((stats.total_correct / stats.total_attempted) * 100)
    : 0;

  return (
    <div className="progress-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">🔥 Day Streak</div>
          <div className="stat-val text-coral">{streak.count}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">🎯 Accuracy</div>
          <div className="stat-val text-teal">{accuracy}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📝 Attempted</div>
          <div className="stat-val text-violet">{stats.total_attempted}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">✅ Correct</div>
          <div className="stat-val">{stats.total_correct}</div>
        </div>
      </div>

      <div className="section-header mt-24">
        <div className="section-title">Performance by Category</div>
      </div>

      <div className="cat-bars">
        {Object.entries(stats.by_category).length === 0 ? (
          <div className="text-muted text-sm">No data yet. Start practicing!</div>
        ) : (
          Object.entries(stats.by_category)
            .sort((a, b) => b[1].attempted - a[1].attempted)
            .map(([catId, data]) => {
              const cat = CATEGORIES.find(c => c.id === catId);
              if (!cat) return null;
              const perc = Math.round((data.correct / data.attempted) * 100);
              return (
                <div key={catId} className="cat-bar-item">
                  <div className="cat-bar-header">
                    <span className="font-bold">{cat.icon} {cat.name}</span>
                    <span className="text-muted">{data.correct}/{data.attempted} ({perc}%)</span>
                  </div>
                  <div className="cat-bar-track">
                    <div className="cat-bar-fill" style={{ width: `${perc}%` }} />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
