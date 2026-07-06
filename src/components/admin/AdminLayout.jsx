import React from 'react';

export default function AdminLayout({ children, currentRoute, navigate, theme, toggleTheme }) {
  const navItems = [
    { label: 'Dashboard', path: 'admin' },
    { label: 'User Analytics', path: 'admin/users' },
    { label: 'Settings', path: 'admin/settings' },
    { label: 'Profile', path: 'admin/profile' },
  ];

  return (
    <div className="admin-layout-shell" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Sidebar */}
      <div className="admin-sidebar" style={{ 
        width: '260px', 
        background: 'var(--surface)', 
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--violet)' }}>
            AptiAnimate <span style={{ color: 'var(--text)' }}>Admin</span>
          </h1>
        </div>
        <div className="admin-sidebar-nav" style={{ display: 'flex', flexDirection: 'column', padding: '16px 12px', gap: '8px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: isActive ? 'var(--violet)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--muted)',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--surface2)';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="admin-sidebar-bottom" style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={toggleTheme} 
            style={{ 
              width: '100%', padding: '10px', borderRadius: '10px', 
              background: 'var(--surface2)', border: 'none', 
              color: 'var(--text)', cursor: 'pointer', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
          </button>
          <button 
            onClick={() => navigate('')} 
            style={{ 
              width: '100%', padding: '10px', borderRadius: '10px', 
              background: 'transparent', border: '1px solid var(--border)', 
              color: 'var(--text)', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            ← Back to App
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-content-area" style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
