import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    category: 'UI Bug',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch logged-in user to pre-fill
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFormData(prev => ({ ...prev, email: user.email || '' }));
        const { data: prof } = await supabase.from('profiles').select('username').eq('id', user.id).single();
        if (prof) {
          setProfile(prof);
          setFormData(prev => ({ ...prev, username: prof.username || '' }));
        }
      }
    }
    getUser();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        platform: navigator.platform
      };

      const { error } = await supabase.from('bug_reports').insert([{
        user_id: user ? user.id : null,
        username: formData.username,
        email: formData.email,
        category: formData.category,
        description: formData.description,
        device_info: deviceInfo,
        page_url: document.referrer || window.location.href, // Captures where they came from
      }]);

      if (error) throw error;
      
      setSuccess(true);
      // Reset form (keep email/username)
      setFormData(prev => ({ ...prev, category: 'UI Bug', description: '' }));
      
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-issue-page" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1rem'
        }}
      >
        ← Back
      </button>

      <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text)' }}>Report an Issue</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.5 }}>
          Found a bug? Or is an aptitude question incorrect? Let us know below.
        </p>

        {success ? (
          <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--emerald)', borderRadius: '12px', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--emerald)', marginBottom: '8px' }}>✅ Report Submitted!</h2>
            <p style={{ color: 'var(--text)', marginBottom: '16px' }}>Thank you for helping us improve AptiAnimate.</p>
            <button 
              onClick={() => navigate('/')}
              style={{ background: 'var(--emerald)', color: '#fff', padding: '10px 20px', borderRadius: '12px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              Return Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Split Row for Username & Email */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600 }}>Username (Optional)</label>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="@username"
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600 }}>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600 }}>Issue Category</label>
              <select 
                name="category" 
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
              >
                <option value="UI Bug">UI or Visual Bug</option>
                <option value="Performance">Performance / Lag</option>
                <option value="Question Error">⚠️ Question Error (Wrong answer/typo)</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600 }}>Description</label>
              <textarea 
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe what happened, what you expected, or which question is incorrect..."
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', minHeight: '150px', resize: 'vertical' }}
              />
            </div>

            {errorMsg && (
              <div style={{ color: 'var(--coral)', fontSize: '0.9rem', padding: '10px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '8px' }}>
                {errorMsg}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--violet)', color: '#fff', padding: '14px', borderRadius: '12px', border: 'none', 
                fontSize: '1rem', fontWeight: 700, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
                marginTop: '10px'
              }}
            >
              {loading ? 'Sending...' : 'Send Report'}
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', margin: 0 }}>
              Device info (browser, screen size) will be securely attached to help us debug.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
