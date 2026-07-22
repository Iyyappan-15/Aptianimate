import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

const CATEGORY_COLORS = {
  'UI Bug':          { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  'Performance':     { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  'Question Error':  { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444' },
  'Feature Request': { bg: 'rgba(16,185,129,0.12)',  color: '#10b981' },
  'Other':           { bg: 'rgba(156,163,175,0.12)', color: '#9ca3af' },
};

const STATUS_COLORS = {
  'open':        { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', label: '🔴 Open' },
  'in_progress': { bg: 'rgba(245,158,11,0.1)',  color: '#f59e0b', label: '🟡 In Progress' },
  'resolved':    { bg: 'rgba(16,185,129,0.1)',  color: '#10b981', label: '🟢 Resolved' },
  'closed':      { bg: 'rgba(156,163,175,0.1)', color: '#9ca3af', label: '⚫ Closed' },
};

export default function AdminBugReports() {
  const [reports, setReports]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus]     = useState('All');
  const [expandedId, setExpandedId]     = useState(null);
  const [updatingId, setUpdatingId]     = useState(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bug_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setReports(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('bug_reports')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) {
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } else {
      alert('Failed to update status.');
    }
    setUpdatingId(null);
  };

  const deleteReport = async (id) => {
    if (!window.confirm('Delete this report permanently?')) return;
    const { error } = await supabase.from('bug_reports').delete().eq('id', id);
    if (!error) {
      setReports(prev => prev.filter(r => r.id !== id));
      if (expandedId === id) setExpandedId(null);
    } else {
      alert('Failed to delete report.');
    }
  };

  const categories = ['All', 'UI Bug', 'Performance', 'Question Error', 'Feature Request', 'Other'];
  const statuses   = ['All', 'open', 'in_progress', 'resolved', 'closed'];

  const filtered = reports.filter(r => {
    const catOk    = filterCategory === 'All' || r.category === filterCategory;
    const statusOk = filterStatus   === 'All' || (r.status || 'open') === filterStatus;
    return catOk && statusOk;
  });

  const counts = {
    total:       reports.length,
    open:        reports.filter(r => !r.status || r.status === 'open').length,
    in_progress: reports.filter(r => r.status === 'in_progress').length,
    resolved:    reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>🐛 Bug Reports</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '28px' }}>
        User-submitted issue reports from the app.
      </p>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Reports', value: counts.total, color: 'var(--violet)', icon: '📋' },
          { label: 'Open',         value: counts.open,        color: '#ef4444', icon: '🔴' },
          { label: 'In Progress',  value: counts.in_progress, color: '#f59e0b', icon: '🟡' },
          { label: 'Resolved',     value: counts.resolved,    color: '#10b981', icon: '🟢' },
        ].map(c => (
          <div key={c.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '20px 24px',
            borderTop: `3px solid ${c.color}`,
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '8px', fontWeight: 600 }}>
              {c.icon} {c.label}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>Category</label>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{
              padding: '8px 14px', borderRadius: '10px',
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--text)', fontWeight: 600, cursor: 'pointer'
            }}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>Status</label>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 14px', borderRadius: '10px',
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--text)', fontWeight: 600, cursor: 'pointer'
            }}
          >
            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : STATUS_COLORS[s]?.label || s}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={fetchReports}
            style={{
              padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text)', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
            Loading reports...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
            <div style={{ fontWeight: 700 }}>No reports match your filters.</div>
          </div>
        ) : (
          filtered.map((report, idx) => {
            const status   = report.status || 'open';
            const catStyle = CATEGORY_COLORS[report.category] || CATEGORY_COLORS['Other'];
            const stStyle  = STATUS_COLORS[status]   || STATUS_COLORS['open'];
            const isExpanded = expandedId === report.id;

            return (
              <div
                key={report.id}
                style={{
                  borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s',
                }}
              >
                {/* Row */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '18px 24px', cursor: 'pointer',
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : report.id)}
                >
                  {/* Expand Arrow */}
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem', minWidth: '16px' }}>
                    {isExpanded ? '▾' : '▸'}
                  </span>

                  {/* Category Badge */}
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem',
                    fontWeight: 700, whiteSpace: 'nowrap',
                    background: catStyle.bg, color: catStyle.color, minWidth: '110px', textAlign: 'center'
                  }}>
                    {report.category}
                  </span>

                  {/* Status Badge */}
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem',
                    fontWeight: 700, whiteSpace: 'nowrap',
                    background: stStyle.bg, color: stStyle.color, minWidth: '100px', textAlign: 'center'
                  }}>
                    {stStyle.label}
                  </span>

                  {/* Description preview */}
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {report.description?.slice(0, 100) || 'No description'}
                      {report.description?.length > 100 ? '…' : ''}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                      by {report.email || 'Anonymous'} · {new Date(report.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div style={{
                    padding: '0 24px 24px 56px',
                    display: 'flex', flexDirection: 'column', gap: '16px'
                  }}>
                    {/* Full Description */}
                    <div style={{
                      background: 'var(--surface2)', borderRadius: '12px', padding: '16px',
                      fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text)',
                      whiteSpace: 'pre-wrap', border: '1px solid var(--border)'
                    }}>
                      {report.description}
                    </div>

                    {/* Meta grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {[
                        { label: '👤 Username',    value: report.username || '—' },
                        { label: '📧 Email',       value: report.email    || '—' },
                        { label: '🔗 Page URL',    value: report.page_url || '—' },
                        { label: '🖥️ Platform',   value: report.device_info?.platform || '—' },
                        { label: '📐 Screen Size', value: report.device_info ? `${report.device_info.screenWidth}×${report.device_info.screenHeight}` : '—' },
                      ].map(m => (
                        <div key={m.label} style={{
                          background: 'var(--bg)', border: '1px solid var(--border)',
                          borderRadius: '10px', padding: '12px'
                        }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, marginBottom: '4px' }}>{m.label}</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text)', wordBreak: 'break-all' }}>{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Actions Row */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', marginRight: '4px' }}>
                        Change Status:
                      </span>
                      {Object.entries(STATUS_COLORS).map(([key, s]) => (
                        <button
                          key={key}
                          disabled={updatingId === report.id || status === key}
                          onClick={() => updateStatus(report.id, key)}
                          style={{
                            padding: '6px 14px', borderRadius: '20px', border: 'none',
                            background: status === key ? s.bg : 'var(--surface2)',
                            color: status === key ? s.color : 'var(--muted)',
                            fontWeight: 700, fontSize: '0.8rem',
                            cursor: status === key ? 'default' : 'pointer',
                            opacity: updatingId === report.id ? 0.6 : 1,
                            outline: status === key ? `2px solid ${s.color}` : 'none',
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                      <div style={{ flex: 1 }} />
                      <button
                        onClick={() => deleteReport(report.id)}
                        style={{
                          padding: '6px 14px', borderRadius: '20px', border: 'none',
                          background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                          fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                          marginLeft: 'auto'
                        }}
                      >
                        🗑️ Delete Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
