// src/components/profile/WeeklyChart.jsx
import React, { useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useWeeklyProgress } from '../../hooks/useAnalytics';

const SkeletonChart = () => (
  <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,var(--surface2) 25%,var(--surface3) 50%,var(--surface2) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite', borderRadius: 12 }} />
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '12px 16px', boxShadow: 'var(--shadow)',
      fontSize: '0.82rem', minWidth: 160,
    }}>
      <p style={{ fontWeight: 800, marginBottom: 6, color: 'var(--text)' }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color, margin: '3px 0', fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function WeeklyChart() {
  const { data, loading, error } = useWeeklyProgress();

  if (loading) return <SkeletonChart />;

  if (error) return (
    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--coral)', fontSize: '0.85rem' }}>
      ⚠️ {error}
    </div>
  );

  const allZero = data.every(d => d.problemsSolved === 0 && d.minutesPracticed === 0);

  if (allZero) return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📈</div>
      <p style={{ color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>No activity yet</p>
      <p style={{ color: 'var(--muted2)', fontSize: '0.82rem' }}>Start solving problems to see your weekly progress chart.</p>
    </div>
  );

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="weekLabel"
          tick={{ fontSize: 11, fill: 'var(--muted)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 11, fill: 'var(--muted)' }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11, fill: 'var(--muted)' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '0.78rem', paddingTop: 12, color: 'var(--muted)' }}
          iconType="circle"
          iconSize={8}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="problemsSolved"
          name="Problems Solved"
          stroke="#16a34a"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#16a34a' }}
          activeDot={{ r: 5 }}
          animationDuration={800}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="minutesPracticed"
          name="Minutes Practiced"
          stroke="#2563eb"
          strokeWidth={2.5}
          strokeDasharray="5 4"
          dot={{ r: 3, fill: '#2563eb' }}
          activeDot={{ r: 5 }}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
