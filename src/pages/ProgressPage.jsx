// src/pages/ProgressPage.jsx
import ProgressDashboard from '../components/ProgressDashboard';

export default function ProgressPage({ navigate }) {
  return (
    <div className="page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="section-header">
        <div className="section-title">Your Progress</div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('')}>Back to Home</button>
      </div>
      <ProgressDashboard />
    </div>
  );
}
