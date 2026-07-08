import React from 'react';
import './TopicSkeleton.css';

export default function TopicSkeleton() {
  return (
    <div className="skeleton-container">
      {/* Header Skeleton */}
      <div className="skeleton-header">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-subtitle pulse"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="skeleton-stats-grid">
        <div className="skeleton-stat-card pulse"></div>
        <div className="skeleton-stat-card pulse"></div>
        <div className="skeleton-stat-card pulse"></div>
        <div className="skeleton-stat-card pulse"></div>
      </div>

      {/* Content Area Skeleton */}
      <div className="skeleton-content-area pulse"></div>
    </div>
  );
}
