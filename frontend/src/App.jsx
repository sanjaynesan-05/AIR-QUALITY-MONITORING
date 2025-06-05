import React, { useState } from "react";
import AQIGauge from "./AQIGauge";

const metricData = [
  {
    id: 1,
    title: "PM2.5",
    description: "Fine particulate matter",
    value: 35,
    unit: "µg/m³",
    status: "Moderate",
    statusClass: "status-moderate",
    progress: 35,
  },
  {
    id: 2,
    title: "PM10",
    description: "Coarse particulate matter",
    value: 40,
    unit: "µg/m³",
    status: "Good",
    statusClass: "status-good",
    progress: 40,
  },
  {
    id: 3,
    title: "CO",
    description: "Carbon Monoxide",
    value: 6,
    unit: "ppm",
    status: "Good",
    statusClass: "status-good",
    progress: 6,
  },
  {
    id: 4,
    title: "NO2",
    description: "Nitrogen Dioxide",
    value: 60,
    unit: "ppb",
    status: "Moderate",
    statusClass: "status-moderate",
    progress: 60,
  },
  {
    id: 5,
    title: "O3",
    description: "Ozone",
    value: 20,
    unit: "ppb",
    status: "Good",
    statusClass: "status-good",
    progress: 20,
  },
  {
    id: 6,
    title: "SO2",
    description: "Sulfur Dioxide",
    value: 8,
    unit: "ppb",
    status: "Good",
    statusClass: "status-good",
    progress: 8,
  },
  {
    id: 7,
    title: "Temp",
    description: "Temperature",
    value: 27,
    unit: "°C",
    status: "Good",
    statusClass: "status-good",
    progress: 27,
  },
  {
    id: 8,
    title: "Humidity",
    description: "Relative Humidity",
    value: 45,
    unit: "%",
    status: "Good",
    statusClass: "status-good",
    progress: 45,
  },
];

export default function App() {
  const [aqi, setAqi] = useState(75);

  return (
    <div className="container">
      <h1>Indoor Air Quality Dashboard</h1>
      <div className="last-updated">Last Updated: {new Date().toLocaleString()}</div>
      <AQIGauge aqi={aqi} />

      <div className="metrics-grid" style={{ marginTop: "30px" }}>
        {metricData.map(({ id, title, description, value, unit, status, statusClass, progress }) => (
          <div key={id} className="metric-card">
            <div className="metric-title">{title}</div>
            <div className="metric-desc">{description}</div>
            <div className="metric-value">
              {value} <span className="metric-unit">{unit}</span>
              <span className={`status-badge ${statusClass}`}>{status}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
