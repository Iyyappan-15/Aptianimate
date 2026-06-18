// src/App.jsx
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PracticePage from './pages/PracticePage';
import SavedPage from './pages/SavedPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#/', '') || '');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.replace('#/', ''));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = `/${path}`;
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
  } else if (route === 'saved') {
    pageComponent = <SavedPage navigate={navigate} />;
  } else if (route === 'progress') {
    pageComponent = <ProgressPage navigate={navigate} />;
  } else {
    pageComponent = <HomePage navigate={navigate} />;
  }

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand" onClick={() => navigate('')}>
            <div className="nav-brand-icon">⚡</div>
            AptitudeAnimate
          </div>
          <div className="nav-links">
            <button className={`nav-link ${route === '' ? 'active' : ''}`} onClick={() => navigate('')}>Home</button>
            <button className={`nav-link ${route === 'saved' ? 'active' : ''}`} onClick={() => navigate('saved')}>Saved</button>
            <button className={`nav-link ${route === 'progress' ? 'active' : ''}`} onClick={() => navigate('progress')}>Progress</button>
          </div>
        </div>
      </nav>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {pageComponent}
      </main>
    </div>
  );
}

export default App;
