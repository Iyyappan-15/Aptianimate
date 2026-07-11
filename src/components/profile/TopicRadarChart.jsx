import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useProgress } from '../../hooks/useProgress';

export default function TopicRadarChart() {
  const { progressData, loading } = useProgress();

  if (loading) {
    return (
      <div style={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--muted)', fontWeight: 600 }}>Loading chart data...</p>
      </div>
    );
  }

  // Format data for Recharts
  // progressData is an array like [{ topic_name: 'Decimal Fractions', completion_percentage: 80, ... }]
  let chartData = [];
  
  if (progressData && progressData.length > 0) {
    chartData = progressData.map(item => ({
      subject: item.topic_name,
      A: item.completion_percentage || 0,
      fullMark: 100,
    }));
  } else {
    // Dummy data if they haven't started yet
    chartData = [
      { subject: 'Algebra', A: 0, fullMark: 100 },
      { subject: 'Geometry', A: 0, fullMark: 100 },
      { subject: 'Fractions', A: 0, fullMark: 100 },
      { subject: 'Ratios', A: 0, fullMark: 100 },
      { subject: 'Time & Work', A: 0, fullMark: 100 },
    ];
  }

  // We only want to show up to maybe 8 topics on the radar to keep it clean.
  // We'll take the 8 most recently interacted, or just slice.
  if (chartData.length > 8) {
    chartData = chartData.slice(0, 8);
  } else if (chartData.length < 3 && progressData.length > 0) {
      // Radar needs at least 3 points to look good
      const placeholders = [
        { subject: 'Logic', A: 0, fullMark: 100 },
        { subject: 'Data', A: 0, fullMark: 100 },
        { subject: 'Algebra', A: 0, fullMark: 100 }
      ];
      chartData = [...chartData, ...placeholders.slice(0, 3 - chartData.length)];
  }

  // Determine if it's dark theme for colors
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '24px 16px',
      height: '100%',
      minHeight: 380,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 10, paddingLeft: 10 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--text)' }}>
          Topic Mastery Radar
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>
          Visualize your strengths and weak areas
        </p>
      </div>

      <div style={{ flex: 1, width: '100%', minHeight: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid gridType="polygon" stroke={gridColor} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: textColor, fontSize: 11, fontWeight: 600 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Mastery"
              dataKey="A"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="#8b5cf6"
              fillOpacity={0.35}
              activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? '#1e293b' : '#fff',
                border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                borderRadius: 12,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
              itemStyle={{ color: '#8b5cf6', fontWeight: 700 }}
              formatter={(value) => [`${value}%`, 'Mastery']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
