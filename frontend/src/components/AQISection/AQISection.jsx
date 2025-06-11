import React, { useEffect, useState } from "react";
import "./AQISection.css";

// Utility to return color based on AQI value
function getAQIColor(aqi) {
  if (aqi <= 50) return "#4caf50";       // Good - Green
  if (aqi <= 100) return "#ff9800";      // Moderate - Orange
  if (aqi <= 150) return "#f44336";      // Unhealthy for Sensitive Groups - Red
  if (aqi <= 200) return "#d32f2f";      // Unhealthy - Dark Red
  if (aqi <= 300) return "#7e57c2";      // Very Unhealthy - Purple
  return "#7e0023";                      // Hazardous - Maroon
}

export default function AQISection({ aqi = 78, label = "AQI", description = "Air Quality Index" }) {
  const [displayedAQI, setDisplayedAQI] = useState(0);
  const color = getAQIColor(aqi);

  useEffect(() => {
    let start = 0;
    const duration = 800; // in ms
    const stepTime = 15;
    const totalSteps = duration / stepTime;
    const increment = aqi / totalSteps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= aqi) {
        start = aqi;
        clearInterval(counter);
      }
      setDisplayedAQI(Math.round(start));
    }, stepTime);

    return () => clearInterval(counter);
  }, [aqi]);

  return (
    <div
      className="aqi-section"
      style={{
        borderColor: color,
        boxShadow: `0 0 10px ${color}55`,
        backgroundColor: `${color}22`,
      }}
    >
      <div
        className="aqi-circle"
        style={{
          borderColor: color,
          boxShadow: `0 0 18px ${color}55`,
        }}
      >
        <div className="aqi-value">{displayedAQI}</div>
        <div className="aqi-label">{label}</div>
      </div>
      <div className="aqi-description">{description}</div>
    </div>
  );
}
