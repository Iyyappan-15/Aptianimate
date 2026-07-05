// src/components/profile/ActivityHeatmap.jsx
import React, { useState, useMemo } from 'react';
import { useHeatmap, useStatistics } from '../../hooks/useAnalytics';

const LEVEL_COLORS = {
  0: 'var(--surface3)',
  1: '#bbf7d0',
  2: '#4ade80',
  3: '#16a34a',
  4: '#14532d',
};

const LEVEL_COLORS_DARK = {
  0: 'var(--surface3)',
  1: '#14532d',
  2: '#166534',
  3: '#16a34a',
  4: '#4ade80',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','Mon','','Wed','','Fri',''];

function getLevel(problems, minutes) {
  const score = problems + Math.floor(minutes / 15);
  if (score === 0) return 0;
  if (score === 1) return 1;
  if (score <= 3)  return 2;
  if (score <= 6)  return 3;
  return 4;
}

function buildGrid(rawData) {
  // Map raw data to date-keyed map
  const map = {};
  rawData.forEach(row => { map[row.activity_date] = row; });

  // Build 365-day grid starting from 52 weeks ago (Sunday)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  // Round back to the nearest Sunday
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  let week = [];
  const monthLabels = []; // {col, label}

  let col = 0;
  let prevMonth = -1;
  const cursor = new Date(start);

  while (cursor <= today || week.length > 0) {
    const dateStr = cursor.toISOString().slice(0, 10);
    const row = map[dateStr];
    const inRange = cursor >= start && cursor <= today;

    if (cursor.getDay() === 0 && week.length > 0) {
      weeks.push(week);
      col++;
      week = [];
    }

    const month = cursor.getMonth();
    if (inRange && month !== prevMonth && cursor.getDay() === 0) {
      monthLabels.push({ col, label: MONTHS[month] });
      prevMonth = month;
    }

    week.push({
      date: dateStr,
      day: cursor.getDay(),
      inRange,
      level: inRange ? getLevel(row?.problems_solved || 0, row?.minutes_practiced || 0) : -1,
      data: row || null,
    });

    cursor.setDate(cursor.getDate() + 1);
    if (cursor > today && week.length === 7) break;
  }
  if (week.length) weeks.push(week);

  return { weeks, monthLabels };
}

const Tooltip = ({ cell, rect }) => {
  if (!cell || !rect) return null;
  const d = cell.data;
  const dateObj = new Date(cell.date);
  const label = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{
      position: 'fixed',
      left: rect.left + rect.width / 2,
      top: rect.top - 8,
      transform: 'translate(-50%, -100%)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '10px 14px',
      fontSize: '0.78rem',
      boxShadow: 'var(--shadow)',
      zIndex: 9999,
      minWidth: 180,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    }}>
      <p style={{ fontWeight: 800, marginBottom: 6, color: 'var(--text)' }}>{label}</p>
      <p style={{ color: 'var(--muted)', margin: '2px 0' }}>🎯 {d?.problems_solved || 0} problems solved</p>
      <p style={{ color: 'var(--muted)', margin: '2px 0' }}>⏱ {d?.minutes_practiced || 0} min practiced</p>
      <p style={{ color: 'var(--muted)', margin: '2px 0' }}>📚 {(d?.topics_studied || []).join(', ') || 'None'}</p>
    </div>
  );
};

const SkeletonHeatmap = () => (
  <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
    {Array.from({ length: 52 }).map((_, wi) => (
      <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {Array.from({ length: 7 }).map((_, di) => (
          <div key={di} style={{ width: 13, height: 13, borderRadius: 3, background: 'linear-gradient(90deg,var(--surface2) 25%,var(--surface3) 50%,var(--surface2) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
        ))}
      </div>
    ))}
  </div>
);

const formatTime = (seconds) => {
  if (!seconds) return '0s';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export default function ActivityHeatmap() {
  const { data, loading, error } = useHeatmap();
  const { data: stats } = useStatistics();
  const [tooltip, setTooltip] = useState({ cell: null, rect: null });

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS;

  const { weeks, monthLabels } = useMemo(() => {
    if (!data) return { weeks: [], monthLabels: [] };
    return buildGrid(data);
  }, [data]);

  if (loading) return <SkeletonHeatmap />;
  if (error) return <div style={{ color: 'var(--coral)', fontSize: '0.85rem' }}>⚠️ {error}</div>;

  const totalActive = data.filter(d => d.problems_solved > 0 || d.minutes_practiced > 0).length;

  return (
    <div style={{ width: '100%' }}>
      {/* Activity Overview Header */}
      <div style={{ marginBottom: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, alignItems: 'start' }}>
        
        {/* Active Days */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>Active Days</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '1.6rem', color: 'var(--violet)' }}>📅</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--violet)', lineHeight: 1 }}>{totalActive}</span>
          </div>
          <p style={{ margin: '0 0 6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>Consistency score</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 6, background: 'var(--surface3)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.max(1, Math.round((totalActive/365)*100))}%`, background: 'var(--violet)', borderRadius: 3, transition: 'width 1s ease-out' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text)' }}>
              {Math.round((totalActive/365)*100)}%
            </span>
          </div>
        </div>

        {/* Fastest Solve */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>Fastest Solve</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '1.6rem', color: '#f97316' }}>⚡</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
              {stats?.fastestSolve || 0}s
            </span>
          </div>
        </div>

        {/* Total Practice Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>Total Practice Time</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '1.6rem', color: '#3b82f6' }}>⏱</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
              {formatTime(stats?.totalTimeSeconds || 0)}
            </span>
          </div>
          <p style={{ margin: '0 0 6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>
            Avg per day: {formatTime((stats?.totalTimeSeconds || 0) / (stats?.activeDays || 1))}
          </p>
        </div>
      </div>

      {/* Month labels */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 4, marginLeft: 22, position: 'relative', height: 16 }}>
        {monthLabels.map(({ col, label }) => (
          <span
            key={`${col}-${label}`}
            style={{
              position: 'absolute',
              left: col * 16,
              fontSize: '0.65rem',
              color: 'var(--muted)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 2 }}>
        {/* Day labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 4, paddingTop: 0 }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ width: 18, height: 13, fontSize: '0.6rem', color: 'var(--muted2)', display: 'flex', alignItems: 'center' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'flex', gap: 3, overflowX: 'auto', paddingBottom: 4 }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {week.map((cell, di) => (
                <div
                  key={di}
                  title={cell.inRange ? cell.date : ''}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 3,
                    background: cell.inRange ? colors[cell.level] : 'transparent',
                    cursor: cell.inRange && cell.data ? 'pointer' : 'default',
                    transition: 'transform 0.1s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (cell.inRange) {
                      setTooltip({ cell, rect: e.currentTarget.getBoundingClientRect() });
                    }
                  }}
                  onMouseLeave={() => setTooltip({ cell: null, rect: null })}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--muted2)' }}>Less</span>
        {[0, 1, 2, 3, 4].map(l => (
          <div key={l} style={{ width: 12, height: 12, borderRadius: 3, background: colors[l] }} />
        ))}
        <span style={{ fontSize: '0.7rem', color: 'var(--muted2)' }}>More</span>
      </div>

      {tooltip.cell && <Tooltip cell={tooltip.cell} rect={tooltip.rect} />}
    </div>
  );
}
