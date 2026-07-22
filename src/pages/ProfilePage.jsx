// src/pages/ProfilePage.jsx
import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { deleteAllAnalytics } from '../repositories/analyticsRepository';
import { supabase } from '../lib/supabase';

// ─── Section Wrapper ───────────────────────────────────────────────────────
function Section({ title, icon, children, isCollapsible = false, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="profile-section-card" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '20px',
      marginBottom: 20,
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: isCollapsible ? 'pointer' : 'default',
          marginBottom: isOpen ? 20 : 0
        }}
        onClick={() => isCollapsible && setIsOpen(!isOpen)}
      >
        <h2 style={{
          fontSize: '0.95rem', fontWeight: 800, color: 'var(--text)',
          margin: 0, display: 'flex', alignItems: 'center', gap: 8,
          textTransform: 'uppercase', letterSpacing: '0.07em',
        }}>
          <span>{icon}</span> {title}
        </h2>
        {isCollapsible && (
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--surface2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text)', fontSize: '0.8rem',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}>
            ▼
          </div>
        )}
      </div>
      {isOpen && children}
    </div>
  );
}

// ─── Account Settings ─────────────────────────────────────────────────────
function AccountSettings({ user, profile, signOut }) {
  const [resetting, setResetting] = useState(false);
  const [resettingProgress, setResettingProgress] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Report an Issue inline form state
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportCategory, setReportCategory] = useState('UI Bug');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSending, setReportSending] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState('');

  // Edit profile states
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [newUsername, setNewUsername] = useState(profile?.username || '');
  const [newDisplayName, setNewDisplayName] = useState(profile?.full_name || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const fileInputRef = useRef(null);

  const showMsg = (msg) => { setSaveMsg(msg); setTimeout(() => setSaveMsg(''), 3000); };

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username: newUsername.trim().toLowerCase().replace(/\s+/g, '_') })
        .eq('id', user.id);
      if (error) throw error;
      showMsg('Username updated!');
      setEditingUsername(false);
      window.location.reload();
    } catch (e) { showMsg('Error: ' + e.message); }
    finally { setSaving(false); }
  };

  const handleSaveDisplayName = async () => {
    if (!newDisplayName.trim()) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: newDisplayName.trim() })
        .eq('id', user.id);
      if (error) throw error;
      showMsg('Display name updated!');
      setEditingDisplayName(false);
      window.location.reload();
    } catch (e) { showMsg('Error: ' + e.message); }
    finally { setSaving(false); }
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return;
    setSaving(true);
    try {
      const ext = photoFile.name.split('.').pop();
      const filePath = `${user.id}/avatar.${ext}`;

      // Upload to Supabase Storage bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, photoFile, { upsert: true, contentType: photoFile.type });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) throw new Error('Could not get public URL');

      // Save URL to profiles table
      const { error: dbError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (dbError) throw dbError;

      showMsg('Profile photo updated!');
      setEditingPhoto(false);
      setPhotoFile(null);
      setPhotoPreview(null);
      window.location.reload();
    } catch (e) {
      showMsg('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showMsg('File too large. Max 5MB.');
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleResetProgress = async () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    try {
      setResettingProgress(true);
      await deleteAllAnalytics(user.id);
      if (supabase) await supabase.from('topic_progress').delete().eq('user_id', user.id);
      setConfirmReset(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setResettingProgress(false);
    }
  };

  const handleExportJSON = async () => {
    try {
      if (supabase) {
        const { data } = await supabase
          .from('daily_activity')
          .select('*')
          .eq('user_id', user.id)
          .order('activity_date', { ascending: true });
        const blob = new Blob([JSON.stringify(data || [], null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aptianimate_progress_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) { console.error(e); }
    setShowExportOptions(false);
  };

  const handleExportPDF = async () => {
    try {
      if (supabase) {
        const { default: jsPDF } = await import('jspdf');
        await import('jspdf-autotable');
        const { data } = await supabase
          .from('daily_activity')
          .select('*')
          .eq('user_id', user.id)
          .order('activity_date', { ascending: true });
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('AptiAnimate Progress Report', 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`User: ${profile?.full_name || profile?.username}`, 14, 30);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 36);
        if (data && data.length > 0) {
          const tableColumn = ['Date', 'Solved', 'Minutes', 'Topics'];
          const tableRows = data.map(a => [
            a.activity_date, a.problems_solved, a.minutes_practiced,
            (a.topics_covered || []).join(', ')
          ]);
          doc.autoTable({ startY: 45, head: [tableColumn], body: tableRows });
        } else {
          doc.text('No activity recorded yet.', 14, 50);
        }
        doc.save(`aptianimate_progress_${new Date().toISOString().slice(0, 10)}.pdf`);
      }
    } catch (e) { console.error(e); }
    setShowExportOptions(false);
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    try {
      setResetting(true);
      if (supabase) {
        await Promise.all([
          supabase.from('daily_activity').delete().eq('user_id', user.id),
          supabase.from('practice_sessions').delete().eq('user_id', user.id),
          supabase.from('topic_progress').delete().eq('user_id', user.id),
          supabase.from('bookmarks').delete().eq('user_id', user.id),
        ]);
        await supabase.from('profiles').delete().eq('id', user.id);
      }
      await signOut();
    } catch (e) {
      console.error('Delete account error:', e);
      setResetting(false);
      setConfirmDelete(false);
    }
  };

  const inputStyle = {
    flex: 1, padding: '6px 12px', borderRadius: 10, fontSize: '0.85rem',
    border: '1px solid var(--border)', background: 'var(--surface2)',
    color: 'var(--text)', outline: 'none',
  };
  const btnSm = (color = 'var(--violet)', filled = false) => ({
    padding: '5px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
    border: `1px solid ${color}`,
    background: filled ? color : 'transparent',
    color: filled ? '#fff' : color,
    cursor: saving ? 'wait' : 'pointer', transition: 'all 0.2s',
  });

  return (
    <div>
      {saveMsg && (
        <div style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(22,163,74,0.12)', color: '#16a34a', fontSize: '0.82rem', fontWeight: 700, marginBottom: 12 }}>
          ✅ {saveMsg}
        </div>
      )}

      {/* ── Change Profile Photo ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'var(--surface2)' }}>🖼️</div>
          <div>
            <p className="setting-title">Profile Photo</p>
            <p className="setting-desc">Upload a JPG, PNG or GIF (max 5MB)</p>
          </div>
        </div>

        {editingPhoto ? (
          <div className="setting-edit-group">
            {/* Hidden real file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {/* Preview */}
            {photoPreview && (
              <img
                src={photoPreview}
                alt="preview"
                className="profile-photo-preview"
              />
            )}
            {/* Choose file button */}
            <div className="setting-edit-actions">
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ ...btnSm('var(--violet)', false), display: 'flex', alignItems: 'center', gap: 6 }}
              >
                📂 {photoFile ? (photoFile.name.length > 10 ? photoFile.name.slice(0, 8) + '...' : photoFile.name) : 'Choose'}
              </button>
            {/* Save button — only active when file chosen */}
            {photoFile && (
              <button
                onClick={handleUploadPhoto}
                disabled={saving}
                style={btnSm('var(--violet)', true)}
              >
                {saving ? '… Up' : 'Upload'}
              </button>
            )}
            <button
              onClick={() => { setEditingPhoto(false); setPhotoFile(null); setPhotoPreview(null); }}
              style={btnSm('var(--muted)')}
            >
              Cancel
            </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditingPhoto(true)} style={btnSm('var(--violet)', false)}>Change</button>
        )}
      </div>

      {/* ── Change Display Name ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'var(--surface2)' }}>✏️</div>
          <div>
            <p className="setting-title">Display Name</p>
            <p className="setting-desc">Current: {profile?.full_name || '—'}</p>
          </div>
        </div>
        {editingDisplayName ? (
          <div className="setting-edit-group">
            <input
              style={inputStyle}
              value={newDisplayName}
              onChange={e => setNewDisplayName(e.target.value)}
              placeholder="Your display name"
            />
            <div className="setting-edit-actions">
              <button onClick={handleSaveDisplayName} disabled={saving} style={btnSm('var(--violet)', true)}>{saving ? '…' : 'Save'}</button>
              <button onClick={() => setEditingDisplayName(false)} style={btnSm('var(--muted)')}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditingDisplayName(true)} style={btnSm('var(--violet)', false)}>Change</button>
        )}
      </div>

      {/* ── Change Username ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'var(--surface2)' }}>@</div>
          <div>
            <p className="setting-title">Username</p>
            <p className="setting-desc">Current: @{profile?.username || '—'}</p>
          </div>
        </div>
        {editingUsername ? (
          <div className="setting-edit-group">
            <input
              style={inputStyle}
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              placeholder="new_username"
            />
            <div className="setting-edit-actions">
              <button onClick={handleSaveUsername} disabled={saving} style={btnSm('var(--violet)', true)}>{saving ? '…' : 'Save'}</button>
              <button onClick={() => setEditingUsername(false)} style={btnSm('var(--muted)')}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditingUsername(true)} style={btnSm('var(--violet)', false)}>Change</button>
        )}
      </div>

      {/* ── Language ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'var(--surface2)' }}>🌐</div>
          <div>
            <p className="setting-title">Language</p>
            <p className="setting-desc">Interface language preference</p>
          </div>
        </div>
        <select className="setting-select">
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* ── Export Progress ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'var(--surface2)' }}>📤</div>
          <div>
            <p className="setting-title">Export Progress</p>
            <p className="setting-desc">Download your activity as JSON or PDF</p>
          </div>
        </div>
        {showExportOptions ? (
          <div className="setting-edit-actions">
            <button onClick={handleExportJSON} style={btnSm('var(--violet)', false)}>JSON</button>
            <button onClick={handleExportPDF} style={btnSm('var(--violet)', false)}>PDF</button>
            <button onClick={() => setShowExportOptions(false)} style={{ ...btnSm('var(--muted)'), border: 'none' }}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setShowExportOptions(true)} style={btnSm('var(--violet)', false)}>Export</button>
        )}
      </div>

      {/* ── Reset Progress ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'rgba(217,119,6,0.1)' }}>🔄</div>
          <div>
            <p className="setting-title" style={{ color: 'var(--amber)' }}>Reset Progress</p>
            <p className="setting-desc">Erase all analytics and topic progress</p>
          </div>
        </div>
        <button
          onClick={handleResetProgress}
          disabled={resettingProgress}
          style={{ padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(217,119,6,0.4)', background: confirmReset ? 'var(--amber)' : 'transparent', color: confirmReset ? '#fff' : 'var(--amber)', cursor: resettingProgress ? 'wait' : 'pointer', transition: 'all 0.2s' }}
        >
          {resettingProgress ? '…' : confirmReset ? '⚠️ Confirm?' : 'Reset'}
        </button>
      </div>

      {/* ── Report an Issue ── */}
      <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="setting-info">
            <div className="setting-icon" style={{ background: 'var(--surface2)' }}>🐞</div>
            <div>
              <p className="setting-title">Report an Issue</p>
              <p className="setting-desc">Found a bug? Let us know!</p>
            </div>
          </div>
          {!showReportForm && !reportSent && (
            <button
              onClick={() => { setShowReportForm(true); setReportSent(false); setReportError(''); }}
              style={btnSm('var(--violet)', false)}
            >
              Report
            </button>
          )}
          {reportSent && (
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>✅ Sent!</span>
          )}
        </div>

        {showReportForm && !reportSent && (
          <div style={{
            marginTop: '14px', padding: '16px', borderRadius: '14px',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            {/* Category */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Issue Category</label>
              <select
                value={reportCategory}
                onChange={e => setReportCategory(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontWeight: 600 }}
              >
                <option value="UI Bug">UI or Visual Bug</option>
                <option value="Performance">Performance / Lag</option>
                <option value="Question Error">⚠️ Question Error (Wrong answer/typo)</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description textarea */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Describe the issue</label>
              <textarea
                value={reportDesc}
                onChange={e => setReportDesc(e.target.value)}
                placeholder="What happened? What did you expect? Be as detailed as you like..."
                rows={4}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: '10px',
                  border: '1px solid var(--border)', background: 'var(--bg)',
                  color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6,
                  resize: 'vertical', boxSizing: 'border-box'
                }}
              />
            </div>

            {reportError && (
              <div style={{ fontSize: '0.82rem', color: 'var(--coral)', fontWeight: 600 }}>⚠️ {reportError}</div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowReportForm(false); setReportDesc(''); setReportError(''); }}
                style={btnSm('var(--muted)')}
              >
                Cancel
              </button>
              <button
                disabled={reportSending || !reportDesc.trim()}
                onClick={async () => {
                  if (!reportDesc.trim()) return;
                  setReportSending(true);
                  setReportError('');
                  try {
                    const deviceInfo = {
                      userAgent: navigator.userAgent,
                      screenWidth: window.innerWidth,
                      screenHeight: window.innerHeight,
                      platform: navigator.platform
                    };
                    const { error } = await supabase.from('bug_reports').insert([{
                      user_id: user?.id || null,
                      username: profile?.username || '',
                      email: user?.email || '',
                      category: reportCategory,
                      description: reportDesc.trim(),
                      device_info: deviceInfo,
                      status: 'open',
                      page_url: window.location.href,
                    }]);
                    if (error) throw error;
                    setReportSent(true);
                    setShowReportForm(false);
                    setReportDesc('');
                    // Reset sent badge after 4 seconds
                    setTimeout(() => setReportSent(false), 4000);
                  } catch (e) {
                    setReportError(e.message || 'Failed to send. Try again.');
                  } finally {
                    setReportSending(false);
                  }
                }}
                style={{
                  ...btnSm('var(--violet)', true),
                  opacity: (reportSending || !reportDesc.trim()) ? 0.6 : 1,
                  cursor: (reportSending || !reportDesc.trim()) ? 'not-allowed' : 'pointer'
                }}
              >
                {reportSending ? 'Sending…' : '📨 Send Report'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Logout ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'rgba(220,38,38,0.08)' }}>🚪</div>
          <div>
            <p className="setting-title">Logout</p>
            <p className="setting-desc">Sign out of your account</p>
          </div>
        </div>
        <button
          onClick={signOut}
          style={{ padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(220,38,38,0.4)', background: 'transparent', color: 'var(--coral)', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Sign Out
        </button>
      </div>

      {/* ── Delete Account ── */}
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-icon" style={{ background: 'rgba(220,38,38,0.1)' }}>🗑️</div>
          <div>
            <p className="setting-title" style={{ color: 'var(--coral)' }}>Delete Account</p>
            <p className="setting-desc">Permanently delete your account and all data</p>
          </div>
        </div>
        <button
          onClick={handleDeleteAccount}
          style={{ padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(220,38,38,0.4)', background: confirmDelete ? 'var(--coral)' : 'transparent', color: confirmDelete ? '#fff' : 'var(--coral)', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          {confirmDelete ? '⚠️ Confirm Delete' : 'Delete'}
        </button>
      </div>
    </div>
  );
}


// ─── Main Profile Page ────────────────────────────────────────────────────
export default function ProfilePage({ navigate }) {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 16 }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <p style={{ color: 'var(--muted)', fontWeight: 600 }}>Please log in to view your profile.</p>
      </div>
    );
  }

  const avatarSrc = profile.avatar_url || user?.user_metadata?.avatar_url || null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px 14px 60px', width: '100%', boxSizing: 'border-box' }}>
      <button 
        onClick={() => navigate('home')} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 600, padding: '4px 0', marginBottom: '16px', border: 'none', cursor: 'pointer' }}
      >
        <span>←</span> Back to Home
      </button>
      {/* ── Profile Hero ── */}
      <div className="profile-hero-card">
        <div className="profile-hero-banner" />
        <div className="profile-hero-content">
          <div className="profile-hero-avatar-wrap">
            {avatarSrc ? (
              <img src={avatarSrc} alt={profile.username} className="profile-hero-avatar-img" />
            ) : (
              <div className="profile-hero-avatar-fallback">
                {profile.username?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
          <div className="profile-hero-text">
            <h1 className="profile-hero-name">
              {profile.full_name || profile.username}
            </h1>
            <p className="profile-hero-username">
              @{profile.username}
            </p>
          </div>
        </div>
      </div>

      {/* ── Account Settings ── */}
      <Section title="Account Settings" icon="⚙️" isCollapsible={false} defaultOpen={true}>
        <AccountSettings user={user} profile={profile} signOut={signOut} />
      </Section>
    </div>
  );
}
