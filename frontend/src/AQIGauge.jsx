import React from "react";

const getColorForAQI = (aqi) => {
  if (aqi <= 50) return "#009966"; // Good (Green)
  if (aqi <= 100) return "#ffde33"; // Moderate (Yellow)
  if (aqi <= 150) return "#ff9933"; // Unhealthy for Sensitive Groups (Orange)
  if (aqi <= 200) return "#cc0033"; // Unhealthy (Red)
  if (aqi <= 300) return "#660099"; // Very Unhealthy (Purple)
  return "#7e0023"; // Hazardous (Maroon)
};

const getStatusText = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for SG";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

const getDescription = (aqi) => {
  if (aqi <= 50) return "Air quality is considered satisfactory, and air pollution poses little or no risk.";
  if (aqi <= 100) return "Air quality is acceptable; some pollutants may be a moderate health concern.";
  if (aqi <= 150) return "Sensitive groups may experience health effects.";
  if (aqi <= 200) return "Everyone may begin to experience health effects; sensitive groups may experience more serious effects.";
  if (aqi <= 300) return "Health warnings of emergency conditions.";
  return "Health alert: everyone may experience serious health effects.";
};

export default function AQIGauge({ aqi }) {
  const color = getColorForAQI(aqi);
  const status = getStatusText(aqi);
  const description = getDescription(aqi);

  return (
    <div className="aqi-section">
      <div className="aqi-circle" style={{ boxShadow: `0 0 30px ${color}` }}>
        {aqi}
        <div className="aqi-label">{status}</div>
      </div>
      <div className="aqi-desc">{description}</div>
    </div>
  );
}
