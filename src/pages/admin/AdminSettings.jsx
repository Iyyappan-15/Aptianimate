import { useEffect, useState } from 'react';
import { getSystemSettings, updateSystemSettings } from '../../repositories/adminRepository';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    announcement_text: '',
    contact_email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    getSystemSettings().then(data => {
      if (mounted && data) {
        setSettings(data);
      }
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSystemSettings({
        maintenance_mode: settings.maintenance_mode,
        announcement_text: settings.announcement_text || null,
        contact_email: settings.contact_email
      });
      setMsg('Settings saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: '1px solid var(--border)', background: 'var(--surface2)',
    color: 'var(--text)', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'inherit'
  };

  if (loading) return <div style={{ color: 'var(--muted)' }}>Loading settings...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>System Settings</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Manage global application configuration.</p>

      {msg && (
        <div style={{ 
          padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
          background: msg.includes('Failed') ? 'rgba(220,38,38,0.1)' : 'rgba(22,163,74,0.1)',
          color: msg.includes('Failed') ? 'var(--coral)' : '#16a34a',
          fontWeight: 'bold'
        }}>
          {msg}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Maintenance Mode */}
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              name="maintenance_mode" 
              checked={settings.maintenance_mode} 
              onChange={handleChange}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: settings.maintenance_mode ? 'var(--coral)' : 'var(--text)' }}>
                Enable Maintenance Mode
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                Blocks all non-admin users from accessing the app.
              </div>
            </div>
          </label>
        </div>

        {/* Global Announcement */}
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Global Announcement</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
            Displays a banner at the top of the app for all users. Leave blank to disable.
          </p>
          <textarea 
            name="announcement_text"
            value={settings.announcement_text || ''}
            onChange={handleChange}
            placeholder="E.g., We are currently updating our question banks..."
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        {/* Contact Email */}
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>Support Email</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
            The email address users should contact for support.
          </p>
          <input 
            type="email"
            name="contact_email"
            value={settings.contact_email || ''}
            onChange={handleChange}
            placeholder="support@aptianimate.com"
            style={inputStyle}
          />
        </div>

        <div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            style={{
              padding: '12px 24px', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold',
              background: 'var(--violet)', color: '#fff', border: 'none', cursor: saving ? 'wait' : 'pointer'
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

      </div>
    </div>
  );
}
