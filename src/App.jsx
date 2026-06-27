// src/App.jsx
import { useState, useEffect } from 'react';
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
import SplashScreen from './components/SplashScreen';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#/', '') || '');
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splash_seen');
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

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

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_seen', 'true');
    setShowSplash(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Simple Hash Router
  let pageComponent;
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
  } else {
    pageComponent = <HomePage navigate={navigate} />;
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
            <nav className="navbar">
              <div className="navbar-inner">
                <div className="nav-brand" onClick={() => navigate('')}>
                  <img src={logoImg} alt="AptiAnimate Logo" className="nav-logo" />
                  AptiAnimate
                </div>
                <div className="nav-links">
                  <button className={`nav-link ${route === '' ? 'active' : ''}`} onClick={() => navigate('')}>Home</button>
                  <button className={`nav-link ${route === 'saved' ? 'active' : ''}`} onClick={() => navigate('saved')}>Saved</button>
                  <button className={`nav-link ${route === 'progress' ? 'active' : ''}`} onClick={() => navigate('progress')}>Progress</button>
                  {/* ✨ Ask AI nav button */}
                  <button
                    onClick={() => navigate('ask')}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      background: route.startsWith('ask') ? 'linear-gradient(135deg, var(--violet), var(--teal))' : 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(20,184,166,0.12))',
                      color: route.startsWith('ask') ? '#fff' : 'var(--violet)',
                      border: '1px solid rgba(124,58,237,0.3)',
                      borderRadius: '20px', padding: '6px 14px',
                      fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer',
                      transition: 'all 0.2s', marginLeft: '4px',
                      boxShadow: route.startsWith('ask') ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
                    }}
                  >
                    ✨ Ask AI
                  </button>
                  <button 
                    onClick={toggleTheme} 
                    style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px' }}
                  >
                    {theme === 'light' ? '🌙' : '☀️'}
                  </button>
                </div>
              </div>
            </nav>
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {pageComponent}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </>
  );
}

export default App;
