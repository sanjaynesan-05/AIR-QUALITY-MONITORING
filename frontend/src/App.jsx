import React, { useEffect, useState } from "react";
import "./styles/global.css";
import TrendChart from "/src/TrendChart.jsx";
import AQIGauge from "./AQIGauge";

export default function App() {
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:8000/data/dashboard_3";
  const HISTORICAL_API_URL = "http://127.0.0.1:8000/data/historical";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchHistoricalData() {
      try {
        const res = await fetch(HISTORICAL_API_URL);
        if (!res.ok) throw new Error("Failed to fetch historical data");
        const json = await res.json();
        setHistoricalData(json);
      } catch (err) {
        console.error("Error fetching historical data:", err);
      }
    }

    fetchData();
    fetchHistoricalData();

    const interval = setInterval(() => {
      fetchData();
      fetchHistoricalData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Indoor Air Quality Dashboard</h1>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Indoor Air Quality Dashboard</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="container">
        <h1>Indoor Air Quality Dashboard</h1>
        <p>No data available</p>
      </div>
    );
  }

  const { metrics, aqi_value, aqi_status, aqi_description, datetime } = data;

  const getStatusClass = (scale) => {
    const scaleLower = scale.toLowerCase();
    if (["normal", "optimal", "safe", "good"].includes(scaleLower)) {
      return "status-good";
    } else if (scaleLower === "moderate") {
      return "status-moderate";
    } else {
      return "status-elevated";
    }
  };

  return (
    <div className="container">
      <h1>Indoor Air Quality Dashboard</h1>
      <p className="last-updated">Last updated: {datetime}</p>

      {["Poor", "Hazardous"].includes(aqi_status) && (
        <div className="alert-box">
          ⚠️ Air Quality is <strong>{aqi_status}</strong>. Take Precautions.
        </div>
      )}

      <div
        className="aqi-container"
        style={{
          width: 220,
          padding: 20,
          margin: "20px auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: 12,
          backgroundColor: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <h2>Air Quality Index</h2>
        <AQIGauge aqi={aqi_value} />
        <div
          style={{
            marginTop: 10,
            fontWeight: "600",
            color:
              aqi_value <= 50
                ? "#009966"
                : aqi_value <= 100
                ? "#ffde33"
                : aqi_value <= 150
                ? "#ff9933"
                : aqi_value <= 200
                ? "#cc0033"
                : aqi_value <= 300
                ? "#660099"
                : "#7e0023",
          }}
        >
          {aqi_status}
        </div>
        <p className="aqi-desc">{aqi_description}</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => {
          const statusClass = getStatusClass(metric.scale || "");
          const maxVal = metric.max && metric.max > 0 ? metric.max : 100;
          const fillPercent = Math.min((metric.value / maxVal) * 100, 100);

          return (
            <div key={metric.title} className="metric-card">
              <div className="metric-title">{metric.title}</div>
              <div className="metric-desc">{metric.desc}</div>
              <div className="metric-value">
                {metric.value}
                <span className="metric-unit">{metric.unit}</span>
                <span className={`status-badge ${statusClass}`}>
                  {metric.scale}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${fillPercent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {historicalData && (
        <div className="charts-section">
          {Object.keys(historicalData).map((key) => (
            <TrendChart
              key={key}
              title={key.toUpperCase()}
              labels={historicalData[key].map((entry) => entry.time)}
              dataPoints={historicalData[key].map((entry) => entry.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
