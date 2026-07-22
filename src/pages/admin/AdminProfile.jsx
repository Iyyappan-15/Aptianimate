import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminProfile() {
  const { profile, signOut } = useAuth();
  const { role } = useAdmin();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Admin Profile</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Your account details.</p>

      <div style={{ 
        background: 'var(--surface)', padding: '32px', borderRadius: '16px', 
        border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '24px' 
      }}>
        <img 
          src={profile?.avatar_url || 'https://www.gravatar.com/avatar/0?d=mp'} 
          alt="Avatar" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--surface2)' }} 
        />
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: 800 }}>{profile?.full_name || 'Anonymous'}</h2>
          <p style={{ margin: '0 0 12px 0', color: 'var(--muted)', fontSize: '1rem' }}>@{profile?.username}</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ 
              padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold',
              background: role === 'super_admin' ? 'rgba(217,119,6,0.1)' : 'rgba(124,58,237,0.1)',
              color: role === 'super_admin' ? 'var(--amber)' : 'var(--violet)'
            }}>
              {role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <button 
          onClick={signOut}
          style={{
            padding: '10px 20px', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 'bold',
            background: 'transparent', border: '1px solid rgba(220,38,38,0.4)', color: 'var(--coral)',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
