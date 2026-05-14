import React from 'react';
import './StatBox.css';

const StatBox = ({ label, value, color }) => (
  <div className="stat-box" style={{ borderColor: color || '#ddd' }}>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

export default StatBox;
