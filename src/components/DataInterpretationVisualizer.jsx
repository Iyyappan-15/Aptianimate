// src/components/DataInterpretationVisualizer.jsx
// Dynamic, interactive chart renderer for Data Interpretation questions
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Sector
} from 'recharts';

// ── Color Palette ─────────────────────────────────────────────────────────────
const CHART_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#f97316', '#ec4899', '#14b8a6', '#84cc16',
];

const DARK_BG = '#0f0f1a';
const CARD_BG = 'var(--surface)';
const BORDER = 'var(--border)';
const TEXT_MAIN = 'var(--text-main)';
const TEXT_SEC = 'var(--text-sec)';

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, unit = '' }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#1a1a2e', border: '1px solid #6366f144', borderRadius: 12,
      padding: '10px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      fontSize: '0.85rem', minWidth: 140,
    }}>
      <p style={{ color: '#aaa', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: entry.color }} />
          <span style={{ color: '#fff', fontWeight: 700 }}>
            {entry.name}: <span style={{ color: entry.color }}>{entry.value}{unit}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Bar Chart Renderer ─────────────────────────────────────────────────────────
function DynamicBarChart({ chartData, chartConfig }) {
  const { data, title, xKey, yKeys, unit = '', stacked = false } = chartData;
  const bars = yKeys || (data[0] ? Object.keys(data[0]).filter(k => k !== xKey) : []);

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: 12, fontSize: '0.9rem', fontWeight: 700, color: TEXT_MAIN }}>
          {title}
        </div>
      )}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 5 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fill: '#aaa', fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: '#ffffff20' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#aaa', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => unit ? `${v}${unit}` : v}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} cursor={{ fill: '#ffffff08' }} />
          <Legend
            wrapperStyle={{ fontSize: '0.8rem', paddingTop: 8 }}
            formatter={(value) => <span style={{ color: '#ccc', fontWeight: 600 }}>{value}</span>}
          />
          {bars.map((bar, i) => (
            <Bar
              key={bar}
              dataKey={bar}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={[6, 6, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
              animationDuration={800}
              animationBegin={i * 100}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Line Chart Renderer ────────────────────────────────────────────────────────
function DynamicLineChart({ chartData }) {
  const { data, title, xKey, yKeys, unit = '' } = chartData;
  const lines = yKeys || (data[0] ? Object.keys(data[0]).filter(k => k !== xKey) : []);

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: 12, fontSize: '0.9rem', fontWeight: 700, color: TEXT_MAIN }}>
          {title}
        </div>
      )}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: '#aaa', fontSize: 12, fontWeight: 600 }}
            axisLine={{ stroke: '#ffffff20' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#aaa', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => unit ? `${v}${unit}` : v}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend
            wrapperStyle={{ fontSize: '0.8rem', paddingTop: 8 }}
            formatter={(value) => <span style={{ color: '#ccc', fontWeight: 600 }}>{value}</span>}
          />
          {lines.map((line, i) => (
            <Line
              key={line}
              type="monotone"
              dataKey={line}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={3}
              dot={{ fill: CHART_COLORS[i % CHART_COLORS.length], r: 5, strokeWidth: 2, stroke: '#0f0f1a' }}
              activeDot={{ r: 7 }}
              animationDuration={800}
              animationBegin={i * 100}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Pie Chart Renderer ─────────────────────────────────────────────────────────
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 12} textAnchor="middle" fill={fill} fontSize={15} fontWeight={800}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#ccc" fontSize={13}>
        {value}
      </text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="#888" fontSize={12}>
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 4} outerRadius={innerRadius - 1} startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

function DynamicPieChart({ chartData }) {
  const { data, title, nameKey = 'name', valueKey = 'value', unit = '' } = chartData;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: 12, fontSize: '0.9rem', fontWeight: 700, color: TEXT_MAIN }}>
          {title}
        </div>
      )}
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey={valueKey}
            nameKey={nameKey}
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Legend
            wrapperStyle={{ fontSize: '0.8rem', paddingTop: 8 }}
            formatter={(value) => <span style={{ color: '#ccc', fontWeight: 600 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Data Table Renderer (for Table-based DI) ───────────────────────────────────
function DataTable({ tableData }) {
  if (!tableData || !tableData.headers || !tableData.rows) return null;
  const { title, headers, rows, unit = '' } = tableData;

  return (
    <div style={{ width: '100%' }}>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: 12, fontSize: '0.9rem', fontWeight: 700, color: TEXT_MAIN }}>
          {title}
        </div>
      )}
      <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #ffffff12' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{
                  padding: '10px 14px', textAlign: i === 0 ? 'left' : 'center',
                  background: '#6366f122', color: '#a5b4fc', fontWeight: 700,
                  borderBottom: '1px solid #6366f144', whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid #ffffff08' }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: '9px 14px', textAlign: ci === 0 ? 'left' : 'center',
                    color: ci === 0 ? TEXT_MAIN : '#e2e8f0', fontWeight: ci === 0 ? 600 : 400,
                    background: ri % 2 === 0 ? 'transparent' : '#ffffff04',
                  }}>
                    {cell}{ci > 0 && unit ? unit : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Visualizer Component ─────────────────────────────────────────────────
export default function DataInterpretationVisualizer({ question }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay for smooth mount animation
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!question) return null;

  const { chartData, tableData, chartType, setContext } = question;

  // Nothing to render
  if (!chartData && !tableData) return null;

  const renderChart = () => {
    const type = chartType || (chartData && chartData.type) || 'bar';
    switch (type) {
      case 'bar':   return <DynamicBarChart chartData={chartData} />;
      case 'line':  return <DynamicLineChart chartData={chartData} />;
      case 'pie':   return <DynamicPieChart chartData={chartData} />;
      case 'table': return <DataTable tableData={tableData} />;
      default:      return <DynamicBarChart chartData={chartData} />;
    }
  };

  return (
    <div
      style={{
        marginBottom: 24,
        background: DARK_BG,
        border: '1px solid #6366f130',
        borderRadius: 16,
        padding: '20px 20px 12px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Header chip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
        fontSize: '0.72rem', fontWeight: 700, color: '#a5b4fc',
        textTransform: 'uppercase', letterSpacing: '1.5px',
      }}>
        <span>📊</span>
        <span>Data Interpretation</span>
        {setContext && (
          <span style={{
            marginLeft: 'auto', background: '#6366f118', border: '1px solid #6366f144',
            padding: '3px 10px', borderRadius: 100, fontSize: '0.7rem', color: '#818cf8',
          }}>
            {setContext}
          </span>
        )}
      </div>

      {/* Chart OR Table */}
      {chartData && renderChart()}
      {!chartData && tableData && <DataTable tableData={tableData} />}

      {/* Optional note */}
      {question.note && (
        <div style={{
          marginTop: 12, padding: '8px 14px', borderRadius: 8,
          background: '#f59e0b10', border: '1px solid #f59e0b33',
          fontSize: '0.8rem', color: '#fbbf24',
        }}>
          📌 {question.note}
        </div>
      )}
    </div>
  );
}
