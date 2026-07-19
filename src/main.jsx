import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// --- OAUTH POPUP CALLBACK HANDLER ---
// If this window was opened as a popup by our authService and Google redirected here
// with an id_token in the URL hash, send it back to the main window and wait for it to close us.
if (window.opener && window.location.hash.includes('id_token=')) {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const idToken = params.get('id_token');
  const error = params.get('error');
  
  if (idToken) {
    window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', id_token: idToken }, window.location.origin);
  } else if (error) {
    window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', error }, window.location.origin);
  }
  
  // Give the opener time to receive the message and close this window, 
  // but close it as a fallback just in case.
  setTimeout(() => window.close(), 3000);
}
// ------------------------------------


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
