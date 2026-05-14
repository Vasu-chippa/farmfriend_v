import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 4 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
