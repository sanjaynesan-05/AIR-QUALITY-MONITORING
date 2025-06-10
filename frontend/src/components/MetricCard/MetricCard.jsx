import React from "react";
import "./MetricCard.css";

export default function MetricCard({ title, value, unit, status, progress, color }) {
  // If color is not passed, fallback to gray
  const bgColor = color ? color + "22" : "#cccccc22"; // add transparency (22 in hex)

  return (
    <div
      className="metric-card"
      style={{
        borderColor: color,
        boxShadow: `0 0 10px ${color}55`,
        backgroundColor: bgColor,
      }}
    >
      <div className="metric-header">
        <h3>
          {title} {/* You can add emoji here if you want */}
        </h3>
        <span
          className="status-badge"
          style={{ backgroundColor: color }}
        >
          {status}
        </span>
      </div>
      <div className="metric-value">
        {value}
        <span className="metric-unit">{unit}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
