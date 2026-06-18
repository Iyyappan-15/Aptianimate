// src/components/LoadingSkeleton.jsx
export default function LoadingSkeleton() {
  return (
    <div className="question-card" style={{ padding: 24 }}>
      <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
      <div className="skeleton skeleton-text" style={{ height: 28, margin: '16px 0 24px' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="skeleton" style={{ height: 48, borderRadius: 8 }}></div>
        <div className="skeleton" style={{ height: 48, borderRadius: 8 }}></div>
        <div className="skeleton" style={{ height: 48, borderRadius: 8 }}></div>
        <div className="skeleton" style={{ height: 48, borderRadius: 8 }}></div>
      </div>
    </div>
  );
}
