// src/components/profile/ActivityHeatmap.jsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useHeatmap, useStatistics } from '../../hooks/useAnalytics';

const LEVEL_COLORS = {
  0: '#f1f5f9', // Slate-100 for crisp empty state visibility
  1: '#d1fae5', // emerald-100
  2: '#6ee7b7', // emerald-300
  3: '#10b981', // emerald-500
  4: '#047857', // emerald-700
};

const LEVEL_COLORS_DARK = {
  0: '#1e293b', // Slate-800 for dark mode empty state
  1: '#064e3b', // emerald-900
  2: '#047857', // emerald-700
  3: '#10b981', // emerald-500
  4: '#34d399', // emerald-400
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','Mon','','Wed','','Fri',''];

function getLevel(problems, minutes) {
  if (problems === 0 && minutes === 0) return 0;
  // If there's any activity, ensure they get at least level 1
  const score = problems + Math.floor(minutes / 5); // 1 point per 5 mins
  if (score <= 3) return 1;
  if (score <= 10) return 2;
  if (score <= 25) return 3;
  return 4;
}

function buildGrid(rawData) {
  // Map raw data to date-keyed map safely ignoring time
  const map = {};
  rawData.forEach(row => { 
    const dStr = row.activity_date.includes('T') ? row.activity_date.split('T')[0] : row.activity_date;
    map[dStr] = row; 
  });

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
    const dateStr = new Date(cursor.getTime() - cursor.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
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
  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
    {Array.from({ length: 52 }).map((_, wi) => (
      <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {Array.from({ length: 7 }).map((_, di) => (
          <div key={di} style={{ width: 15, height: 15, borderRadius: 3, boxSizing: 'border-box', border: '1px solid var(--border)', background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
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
  const scrollRef = useRef(null);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS;
  const cellBorder = isDark ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(0, 0, 0, 0.08)';

  const { weeks, monthLabels } = useMemo(() => {
    if (!data) return { weeks: [], monthLabels: [] };
    return buildGrid(data);
  }, [data]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);

  if (loading) return <SkeletonHeatmap />;
  if (error) return <div style={{ color: 'var(--coral)', fontSize: '0.85rem' }}>⚠️ {error}</div>;

  const totalActive = data.filter(d => d.problems_solved > 0 || d.minutes_practiced > 0).length;

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* Activity Overview Header */}
      <div style={{ marginBottom: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, alignItems: 'start' }}>
        
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

      {/* Heatmap: scrollable on mobile */}
      <div ref={scrollRef} style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8, scrollBehavior: 'smooth' }}>
        {/* Month labels */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 6, marginLeft: 28, position: 'relative', height: 16, minWidth: 'max-content' }}>
        {monthLabels.map(({ col, label }) => (
          <span
            key={`${col}-${label}`}
            style={{
              position: 'absolute',
              left: col * 19, // 15px cell + 4px gap
              fontSize: '0.75rem',
              color: 'var(--muted)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        ))}
      </div>

        <div style={{ display: 'flex', gap: 4, minWidth: 'max-content' }}>
          {/* Day labels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginRight: 8, paddingTop: 0 }}>
            {DAYS.map((d, i) => (
              <div key={i} style={{ width: 26, height: 15, fontSize: '0.65rem', color: 'var(--muted2)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'flex', gap: 4, paddingBottom: 6 }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {week.map((cell, di) => (
                  <div
                    key={di}
                    title={cell.inRange ? cell.date : ''}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 3,
                      boxSizing: 'border-box',
                      border: cell.inRange ? cellBorder : 'none',
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
      </div> {/* end scrollable wrapper */}

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>Less</span>
        {[0, 1, 2, 3, 4].map(l => (
          <div key={l} style={{ width: 15, height: 15, borderRadius: 3, boxSizing: 'border-box', border: cellBorder, background: colors[l] }} />
        ))}
        <span style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>More</span>
      </div>

      {tooltip.cell && <Tooltip cell={tooltip.cell} rect={tooltip.rect} />}
    </div>
  );
}
