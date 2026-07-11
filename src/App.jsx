// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import logoImg from './assets/logo.png';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PracticePage from './pages/PracticePage';
import SavedPage from './pages/SavedPage';
import ProgressPage from './pages/ProgressPage';
import TopicPage from './pages/TopicPage';
import AskPage from './pages/AskPage';
import GovtPYQPage from './pages/GovtPYQPage';
import GovtRoadmapPage from './pages/GovtRoadmapPage';
import GovtDailyPracticePage from './pages/GovtDailyPracticePage';
import ProfilePage from './pages/ProfilePage';
import SplashScreen from './components/SplashScreen';
import DoodleOverlay from './components/DoodleOverlay';
import UsernameModal from './components/UsernameModal';
import { signInWithGoogle, signOut } from './services/authService';
import { getSystemSettings } from './repositories/adminRepository';

// Admin Components
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#/', '') || '');
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splash_seen');
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const { user, profile, loading: authLoading } = useAuth();
  const [systemSettings, setSystemSettings] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (user) {
      console.log("✅ SUPABASE AUTH SUCCESS! Your Anonymous User ID is:", user.id);
      console.log("Profile Data:", profile);
    }
  }, [user, profile]);

  useEffect(() => {
    let mounted = true;
    getSystemSettings().then(data => {
      if (mounted && data) {
        setSystemSettings(data);
      }
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.replace('#/', ''));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ctrl+K global shortcut → navigate to Ask AI page
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        navigate('ask');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigate = (path) => {
    window.location.hash = `/${path}`;
  };

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('splash_seen', 'true');
    setShowSplash(false);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Simple Hash Router
  let pageComponent;
  let isRouteAdmin = route === 'admin' || route.startsWith('admin/');

  if (route === '') {
    pageComponent = <HomePage navigate={navigate} />;
  } else if (route.startsWith('category/')) {
    const id = route.split('/')[1];
    pageComponent = <CategoryPage categoryId={id} navigate={navigate} />;
  } else if (route.startsWith('practice/')) {
    const id = route.split('/')[1];
    pageComponent = <PracticePage questionId={id} navigate={navigate} />;
  } else if (route.startsWith('topic/')) {
    const parts = route.split('/');
    const slug = parts[1];
    const name = parts.slice(2).join('/');
    pageComponent = <TopicPage topicSlug={slug} topicName={decodeURIComponent(name)} navigate={navigate} />;
  } else if (route === 'saved') {
    pageComponent = <SavedPage navigate={navigate} />;
  } else if (route === 'progress') {
    pageComponent = <ProgressPage navigate={navigate} />;
  } else if (route.startsWith('ask')) {
    // Support optional ?q= pre-fill: #/ask?q=your+question
    const rawHash = window.location.hash.replace('#/', '');
    const qIndex = rawHash.indexOf('?q=');
    const initialQuery = qIndex !== -1 ? decodeURIComponent(rawHash.slice(qIndex + 3).replace(/\+/g, ' ')) : '';
    pageComponent = <AskPage navigate={navigate} initialQuery={initialQuery} />;
  } else if (route === 'govt-pyq') {
    pageComponent = <GovtPYQPage navigate={navigate} />;
  } else if (route === 'govt-roadmaps') {
    pageComponent = <GovtRoadmapPage navigate={navigate} />;
  } else if (route === 'govt-daily') {
    pageComponent = <GovtDailyPracticePage navigate={navigate} />;
  } else if (route === 'profile') {
    pageComponent = <ProfilePage navigate={navigate} />;
  } else if (route === 'admin') {
    pageComponent = <AdminDashboard />;
  } else if (route === 'admin/users') {
    pageComponent = <AdminUsers />;
  } else if (route === 'admin/settings') {
    pageComponent = <AdminSettings />;
  } else if (route === 'admin/profile') {
    pageComponent = <AdminProfile />;
  } else {
    pageComponent = <HomePage navigate={navigate} />;
  }

  const role = profile?.role || 'user';
  const isAdmin = role === 'admin' || role === 'super_admin';

  if (systemSettings?.maintenance_mode && !isRouteAdmin && !isAdmin && !authLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 16px 0' }}>🛠️</h1>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.8rem', fontWeight: 900 }}>Under Maintenance</h2>
        <p style={{ color: 'var(--muted)', maxWidth: '400px' }}>
          We are currently performing scheduled maintenance on AptiAnimate. We'll be back shortly!
        </p>
        <p style={{ marginTop: '24px', fontSize: '0.9rem', color: 'var(--muted)' }}>
          Need help? Contact <a href={`mailto:${systemSettings?.contact_email}`} style={{ color: 'var(--violet)' }}>{systemSettings?.contact_email}</a>
        </p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="app-shell"
          >
            {!isRouteAdmin && (
              <nav className="navbar">
                {systemSettings?.announcement_text && (
                  <div style={{ background: 'var(--violet)', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {systemSettings.announcement_text}
                  </div>
                )}
                <div className="navbar-inner">
                  <div className="nav-brand" onClick={() => navigate('')}>
                    <img src={logoImg} alt="AptiAnimate Logo" className="nav-logo" />
                    AptiAnimate
                  </div>
                  <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                      <button className={`nav-link ${route === '' ? 'active' : ''}`} onClick={() => { navigate(''); setIsMobileMenuOpen(false); }}>Home</button>
                      <button className={`nav-link ${route === 'saved' ? 'active' : ''}`} onClick={() => { navigate('saved'); setIsMobileMenuOpen(false); }}>Saved</button>
                      <button className={`nav-link ${route === 'progress' ? 'active' : ''}`} onClick={() => { navigate('progress'); setIsMobileMenuOpen(false); }}>Progress</button>
                      {/* Ask AI nav button */}
                      <button
                        className={`nav-link ${route.startsWith('ask') ? 'active' : ''}`}
                        onClick={() => { navigate('ask'); setIsMobileMenuOpen(false); }}
                      >
                        Ask AI
                      </button>

                      {/* AI Battle nav button */}
                      <button
                        className={`nav-link ${route.startsWith('battle') ? 'active' : ''}`}
                        onClick={() => { navigate('battle'); setIsMobileMenuOpen(false); }}
                      >
                        AI Battle
                      </button>

                      {/* 🔐 Google Login / User Profile */}
                      {(!user || user.is_anonymous) ? (
                        <button
                          className="btn-google"
                          onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                        >
                          <svg width="14" height="14" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.75c-.53 2.87-2.14 5.3-4.57 6.96l7.14 5.53C43.51 36.31 46.5 30.8 46.5 24z"/>
                            <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.14-5.53c-1.97 1.33-4.5 2.13-8.75 2.13-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          </svg>
                          <span className="btn-text">Google Sign In</span>
                        </button>
                      ) : (
                        <div className="nav-profile-wrapper">
                          {/* Clickable profile: avatar + username → goes to /profile */}
                          <a
                            href="#/profile"
                            className="btn-profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <img
                              src={profile?.avatar_url || user?.user_metadata?.avatar_url || 'https://www.gravatar.com/avatar/0?d=mp'}
                              alt="avatar"
                              style={{
                                display: 'inline-block',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: '2px solid var(--violet)',
                                objectFit: 'cover',
                                flexShrink: 0,
                                pointerEvents: 'none',
                              }}
                            />
                            {profile?.username && (
                              <span className="profile-username">
                                @{profile.username}
                              </span>
                            )}
                        </a>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={toggleTheme} 
                      className="btn-theme-toggle"
                    >
                      {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                      {isMobileMenuOpen ? '✖' : '☰'}
                    </button>
                  </div>
                </div>
              </nav>
            )}
            
            {isRouteAdmin ? (
              <AdminRoute navigate={navigate}>
                <AdminLayout currentRoute={route} navigate={navigate} theme={theme} toggleTheme={toggleTheme}>
                  {pageComponent}
                </AdminLayout>
              </AdminRoute>
            ) : (
              <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {pageComponent}
              </main>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Global Scratchpad — floats over every page */}
      {!isRouteAdmin && <DoodleOverlay />}
      <UsernameModal />
      <Analytics />
    </>
  );
}

export default App;
