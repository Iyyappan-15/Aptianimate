import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };

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

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
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
          background: 'var(--bg-main, #f8fafc)',
          color: 'var(--text, #0f172a)',
          padding: '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Background Glows */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0) 70%)',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'var(--surface, #ffffff)',
            padding: '48px 32px',
            borderRadius: '24px',
            border: '1px solid var(--border, #e2e8f0)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Visual Crash Icon */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              marginBottom: '24px',
              animation: 'pulseGlow 2s infinite alternate'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{
              fontSize: '1rem',
              color: 'var(--muted, #64748b)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              The application encountered an unexpected error. You can attempt to recover the app or return to the dashboard.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <button 
                onClick={this.handleReset}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  background: 'var(--primary, #6366f1)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 8px -1px rgba(99, 102, 241, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(99, 102, 241, 0.2)';
                }}
              >
                Recover Application
              </button>

              <a 
                href="/#/"
                onClick={() => this.setState({ hasError: false })}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  background: 'var(--surface2, #f1f5f9)',
                  color: 'var(--text, #0f172a)',
                  border: '1px solid var(--border, #e2e8f0)',
                  borderRadius: '12px',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--border, #e2e8f0)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--surface2, #f1f5f9)';
                }}
              >
                Back to Dashboard
              </a>
            </div>

            {/* Technical Details Accordion */}
            <details style={{
              textAlign: 'left',
              border: '1px solid var(--border, #e2e8f0)',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--bg-main, #f8fafc)'
            }}>
              <summary style={{
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                userSelect: 'none',
                color: 'var(--muted, #64748b)',
                borderBottom: '1px solid transparent'
              }}
              onClick={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent.open) {
                  e.currentTarget.style.borderBottom = '1px solid transparent';
                } else {
                  e.currentTarget.style.borderBottom = '1px solid var(--border, #e2e8f0)';
                }
              }}
              >
                Show technical details
              </summary>
              <div style={{
                padding: '16px',
                maxHeight: '200px',
                overflowY: 'auto',
                fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
                fontSize: '0.75rem',
                lineHeight: '1.5',
                color: '#ef4444',
                whiteSpace: 'pre-wrap'
              }}>
                <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                <br /><br />
                <strong>Stack:</strong> {this.state.errorInfo && this.state.errorInfo.componentStack}
              </div>
            </details>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulseGlow {
              from { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
              to { transform: scale(1.05); box-shadow: 0 0 12px 4px rgba(239, 68, 68, 0.2); }
            }
            
            /* Dark Mode Overrides if user has it active on system */
            @media (prefers-color-scheme: dark) {
              :root {
                --bg-main: #0f172a;
                --text: #f8fafc;
                --surface: #1e293b;
                --surface2: #0f172a;
                --border: #334155;
                --muted: #94a3b8;
              }
            }
          `}} />
        </div>
      );
    }
    return this.props.children;
  }
}
