import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      detailsOpen: false,
      copied: false
    };

    // Bind testing function to window for verification
    if (typeof window !== 'undefined') {
      window.simulateCrash = () => {
        this.setState({
          hasError: true,
          error: new Error("Simulated application crash for testing Error Boundary!"),
          errorInfo: { componentStack: "  in DashboardComponent (created by App)\n  in App (created by main)\n  in AuthProvider (created by main)\n  in ErrorBoundary" }
        });
      };
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidMount() {
    this.handleUnhandledError = (event) => {
      if (this.state.hasError) return;
      this.setState({
        hasError: true,
        error: event.error || new Error(event.message || "Unhandled runtime error"),
        errorInfo: { componentStack: `Line: ${event.lineno}, Col: ${event.colno}\nSource: ${event.filename}` }
      });
    };

    this.handleUnhandledRejection = (event) => {
      if (this.state.hasError) return;
      const reason = event.reason;
      const errorMsg = reason instanceof Error ? reason.message : String(reason);
      this.setState({
        hasError: true,
        error: reason instanceof Error ? reason : new Error(errorMsg || "Unhandled Promise Rejection"),
        errorInfo: { componentStack: reason?.stack || "Unhandled promise rejection with no stack trace available." }
      });
    };

    window.addEventListener('error', this.handleUnhandledError);
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleUnhandledError);
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, detailsOpen: false, copied: false });
    window.location.reload();
  };

  handleCopy = () => {
    const errorText = `Error: ${this.state.error?.toString()}\n\nStack:\n${this.state.errorInfo?.componentStack}`;
    navigator.clipboard.writeText(errorText)
      .then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy logs:", err);
      });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg-main, #0b0f19)',
          color: 'var(--text, #f8fafc)',
          padding: '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'var(--surface, #111827)',
            padding: '56px 40px',
            borderRadius: '28px',
            border: '1px solid var(--border, #1f2937)',
            textAlign: 'center',
            maxWidth: '540px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Visual: Floating 3D Wireframe Hexagonal Crystal */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              marginBottom: '28px',
              animation: 'floatY 4s ease-in-out infinite'
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                {/* Wireframe isometric polygon */}
                <polygon points="40,10 68,26 68,54 40,70 12,54 12,26" fill="none" stroke="var(--violet, #6366f1)" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="40,24 60,35 60,55 40,66 20,55 20,35" fill="none" stroke="var(--primary, #4f46e5)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
                {/* Connecting ribs */}
                <line x1="40" y1="10" x2="40" y2="24" stroke="var(--violet, #6366f1)" strokeWidth="1.5" />
                <line x1="68" y1="26" x2="60" y2="35" stroke="var(--violet, #6366f1)" strokeWidth="1.5" />
                <line x1="68" y1="54" x2="60" y2="55" stroke="var(--violet, #6366f1)" strokeWidth="1.5" />
                <line x1="40" y1="70" x2="40" y2="66" stroke="var(--violet, #6366f1)" strokeWidth="1.5" />
                <line x1="12" y1="54" x2="20" y2="55" stroke="var(--violet, #6366f1)" strokeWidth="1.5" />
                <line x1="12" y1="26" x2="20" y2="35" stroke="var(--violet, #6366f1)" strokeWidth="1.5" />
                {/* Glitch center dot */}
                <circle cx="40" cy="45" r="4" fill="#ef4444" style={{ animation: 'pulse 1.5s infinite' }} />
              </svg>
            </div>

            <h1 style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: '14px',
              letterSpacing: '-0.025em',
              color: 'var(--text, #f8fafc)'
            }}>
              System Interrupted
            </h1>
            
            <div style={{
              width: '48px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--violet, #6366f1), transparent)',
              margin: '0 auto 20px auto'
            }} />

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--muted, #9ca3af)',
              marginBottom: '36px',
              lineHeight: '1.6',
              padding: '0 8px'
            }}>
              An unexpected crash was prevented. You can attempt to restore the session or head back to safety.
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '36px'
            }}>
              <button 
                onClick={this.handleReset}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--violet, #4f46e5) 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'var(--shadow)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                Restore Session
              </button>

              <a 
                href="/#/"
                onClick={() => this.setState({ hasError: false, detailsOpen: false })}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'var(--surface2, #1f2937)',
                  color: 'var(--text, #f8fafc)',
                  border: '1px solid var(--border, #374151)',
                  borderRadius: '14px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--border, #374151)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--surface2, #1f2937)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Safe Dashboard
              </a>
            </div>

            {/* Custom Interactive Details Accordion */}
            <div style={{
              border: '1px solid var(--border, #1f2937)',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'var(--surface2, #0d111c)',
              textAlign: 'left'
            }}>
              {/* Accordion Summary */}
              <div 
                onClick={() => this.setState({ detailsOpen: !this.state.detailsOpen })}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderBottom: this.state.detailsOpen ? '1px solid var(--border, #1f2937)' : '1px solid transparent',
                  transition: 'border-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--muted, #9ca3af)' }}>
                    Diagnostic Logs
                  </span>
                </div>
                {/* Chevron icon with custom dynamic rotation */}
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    transform: this.state.detailsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: 'var(--muted, #9ca3af)'
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Accordion Content */}
              {this.state.detailsOpen && (
                <div style={{
                  animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  transformOrigin: 'top',
                  position: 'relative'
                }}>
                  {/* Copy Button */}
                  <button 
                    onClick={this.handleCopy}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '6px 12px',
                      background: this.state.copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      color: this.state.copied ? '#10b981' : 'var(--muted, #9ca3af)',
                      border: this.state.copied ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {this.state.copied ? 'Copied!' : 'Copy Logs'}
                  </button>

                  <div style={{
                    padding: '20px',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
                    fontSize: '0.775rem',
                    lineHeight: '1.6',
                    color: '#f87171',
                    whiteSpace: 'pre-wrap',
                    marginRight: '4px'
                  }}>
                    <strong style={{ color: '#fca5a5' }}>Error trace caught by React runtime:</strong>
                    <br />
                    {this.state.error && this.state.error.toString()}
                    <br /><br />
                    <strong style={{ color: '#fca5a5' }}>Component execution tree:</strong>
                    <br />
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </div>
                </div>
              )}
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes floatY {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(1.15); }
            }
            @keyframes slideDown {
              from { opacity: 0; transform: scaleY(0.95); }
              to { opacity: 1; transform: scaleY(1); }
            }
            
            /* Clean scrollbar custom styles for logs terminal */
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: var(--border, #1f2937);
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: var(--muted, #4b5563);
            }

            /* Responsive Light Mode overrides */
            @media (prefers-color-scheme: light) {
              :root {
                --bg-main: #f3f4f6;
                --surface: #ffffff;
                --surface2: #f9fafb;
                --border: #e5e7eb;
                --text: #111827;
                --muted: #4b5563;
              }
              button {
                color: #111827;
              }
            }
          `}} />
        </div>
      );
    }
    return this.props.children;
  }
}
