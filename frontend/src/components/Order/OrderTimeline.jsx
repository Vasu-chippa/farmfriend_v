import React from 'react';
import './OrderTimeline.css';

const steps = ['Ordered','Packed','Shipped','Delivered','Completed'];

const OrderTimeline = ({ status = 'Ordered' }) => {
  const idx = Math.max(0, steps.indexOf(status));
  const percent = ((idx+1) / steps.length) * 100;

  return (
    <div className="timeline">
      <div className="timeline-steps">
        {steps.map((s, i) => (
          <div key={s} className={`step ${i <= idx ? 'done' : ''}`}>
            <div className="dot">{i <= idx ? '✓' : i+1}</div>
            <div className="label">{s}</div>
          </div>
        ))}
      </div>
      <div className="timeline-bar">
        <div className="timeline-progress" style={{width:`${percent}%`}} />
      </div>
    </div>
  );
};

export default OrderTimeline;
