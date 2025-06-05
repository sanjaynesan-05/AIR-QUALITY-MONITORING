import React from "react";

const getColorForAQI = (aqi) => {
  if (aqi <= 50) return "#009966"; // Good (Green)
  if (aqi <= 100) return "#ffde33"; // Moderate (Yellow)
  if (aqi <= 150) return "#ff9933"; // Unhealthy for Sensitive Groups (Orange)
  if (aqi <= 200) return "#cc0033"; // Unhealthy (Red)
  if (aqi <= 300) return "#660099"; // Very Unhealthy (Purple)
  return "#7e0023"; // Hazardous (Maroon)
};

export default function AQIGauge({ aqi }) {
  const color = getColorForAQI(aqi);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const maxAQI = 500; // max AQI scale
  const progress = Math.min(aqi, maxAQI);
  const offset = circumference - (progress / maxAQI) * circumference;

  return (
    <svg width="180" height="100" viewBox="0 0 180 100" style={{ display: "block", margin: "auto" }}>
      {/* Background arc */}
      <circle
        cx="90"
        cy="90"
        r={radius}
        fill="none"
        stroke="#eee"
        strokeWidth="15"
        strokeDasharray={circumference}
        strokeDashoffset="0"
        transform="rotate(-180 90 90)"
      />
      {/* Progress arc */}
      <circle
        cx="90"
        cy="90"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="15"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-180 90 90)"
      />
      {/* Text showing AQI */}
      <text
        x="90"
        y="90"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="28"
        fontWeight="bold"
        fill={color}
      >
        {aqi}
      </text>
      <text
        x="90"
        y="115"
        textAnchor="middle"
        fontSize="14"
        fill="#333"
      >
        AQI
      </text>
    </svg>
  );
}
