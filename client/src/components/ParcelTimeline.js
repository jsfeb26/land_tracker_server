import React from 'react';

const ParcelTimeline = () => (
  <div className="timeline-container">
    <div className="time-point-container">
      <div className="time-point-icon-container">
        <div className="time-point selected" />
        <div className="time-point-line" />
      </div>
      <div className="time-point-text">New properties</div>
    </div>

    <div className="time-point-container">
      <div className="time-point-icon-container">
        <div className="time-point-line" />
        <div className="time-point" />
        <div className="time-point-line" />
      </div>
      <div className="time-point-text">Due diligence</div>
    </div>

    <div className="time-point-container">
      <div className="time-point-icon-container">
        <div className="time-point-line" />
        <div className="time-point" />
        <div className="time-point-line" />
      </div>
      <div className="time-point-text">Closing</div>
    </div>

    <div className="time-point-container">
      <div className="time-point-icon-container">
        <div className="time-point-line" />
        <div className="time-point" />
        <div className="time-point-line" />
      </div>
      <div className="time-point-text">Marketing</div>
    </div>

    <div className="time-point-container">
      <div className="time-point-icon-container">
        <div className="time-point-line" />
        <div className="time-point" />
      </div>
      <div className="time-point-text">Sales</div>
    </div>
  </div>
);

export default ParcelTimeline;
