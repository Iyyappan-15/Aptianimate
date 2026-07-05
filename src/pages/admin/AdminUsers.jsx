import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../../repositories/adminRepository';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAllProfiles().then((data) => {
      if (mounted) {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>User Analytics</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>View all registered users on the platform.</p>

      <div style={{ 
        background: 'var(--surface)', border: '1px solid var(--border)', 
        borderRadius: '16px', overflow: 'hidden' 
      }}>
        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Loading users...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--muted)' }}>User</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--muted)' }}>Role</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--muted)' }}>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={u.avatar_url || 'https://www.gravatar.com/avatar/0?d=mp'} 
                          alt="avatar" 
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{u.full_name || 'Anonymous'}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>@{u.username}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                        background: u.role === 'super_admin' ? 'rgba(217,119,6,0.1)' : u.role === 'admin' ? 'rgba(124,58,237,0.1)' : 'var(--surface2)',
                        color: u.role === 'super_admin' ? 'var(--amber)' : u.role === 'admin' ? 'var(--violet)' : 'var(--muted)'
                      }}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--muted)' }}>
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
