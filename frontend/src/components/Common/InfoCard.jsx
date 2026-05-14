import React from 'react';
import './InfoCard.css';

const InfoCard = ({ title, value, children }) => (
  <div className="info-card-compact">
    <div className="ic-left">
      <div className="ic-title">{title}</div>
      <div className="ic-value">{value}</div>
    </div>
    <div className="ic-right">{children}</div>
  </div>
);

export default InfoCard;
