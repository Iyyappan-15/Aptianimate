import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminDashboard() {
  const { role } = useAdmin();

  const cards = [
    { title: 'Total Users', value: '...', icon: '👥' },
    { title: 'Active Sessions', value: '...', icon: '⚡' },
    { title: 'System Health', value: '100%', icon: '💚' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Welcome back, {role}.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {cards.map(c => (
          <div key={c.title} style={{ 
            background: 'var(--surface)', padding: '24px', 
            borderRadius: '16px', border: '1px solid var(--border)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--muted)' }}>{c.title}</h3>
            </div>
            <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
