import React, { useEffect, useState } from "react";

function AirQualityDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/data/dashboard_3")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!data) return <div>Loading...</div>;

  const { metrics, aqi_value, aqi_status, aqi_description, datetime } = data;

  // Map the metrics to a simple object by title for easy access
  const metricMap = {};
  metrics.forEach((m) => {
    metricMap[m.title.toLowerCase()] = m;
  });

  return (
    <div className="dashboard-container">
      <h1>Indoor Air Quality Dashboard</h1>
      <p><strong>Last updated:</strong> {datetime}</p>
      <p><strong>AQI:</strong> {aqi_value} - {aqi_status}</p>
      <p>{aqi_description}</p>

      <div className="metrics-grid">
        <MetricCard metric={metricMap["pm1"]} />
        <MetricCard metric={metricMap["pm2.5"]} />
        <MetricCard metric={metricMap["pm10"]} />
        <MetricCard metric={metricMap["temperature"]} />
        <MetricCard metric={metricMap["co₂"] || metricMap["co2"]} />
        <MetricCard metric={metricMap["co"]} />
        <MetricCard metric={metricMap["tvoc"] || metricMap["ch2o"] || metricMap["formaldehyde"]} title="CH2O" unit="ppm" />
        <MetricCard metric={metricMap["humidity"] || metricMap["rh"]} title="RH" unit="%" />
      </div>
    </div>
  );
}

function MetricCard({ metric, title, unit }) {
  if (!metric) return null;

  return (
    <div className="metric-card">
      <h3>{title || metric.title}</h3>
      <p>{metric.desc}</p>
      <p className="value">
        {metric.value} {unit || metric.unit}
      </p>
      <p className={`scale scale-${metric.scale.toLowerCase().replace(/\s+/g, "-")}`}>
        {metric.scale}
      </p>
    </div>
  );
}

export default AirQualityDashboard;
