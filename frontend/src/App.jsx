import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MetricCard from "./components/MetricCard/MetricCard";
import "./styles/global.css";

const API_URL = "http://127.0.0.1:8000/data/dashboard_3";

// Format "Last updated"
function timeAgo(datetime) {
  const diff = Math.floor((Date.now() - new Date(datetime)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return new Date(datetime).toLocaleString();
}

// AQI Status function
function getStatusInfo(value) {
  const num = Number(value);
  if (isNaN(num)) return { label: "Unknown", color: "#9e9e9e", emoji: "❓" };
  if (num <= 50) return { label: "Good", color: "#4caf50", emoji: "😊" };
  if (num <= 100) return { label: "Satisfactory", color: "#8bc34a", emoji: "🙂" };
  if (num <= 200) return { label: "Moderate", color: "#ffeb3b", emoji: "😐" };
  if (num <= 300) return { label: "Poor", color: "#ff9800", emoji: "😷" };
  if (num <= 400) return { label: "Very Poor", color: "#ff5722", emoji: "🤢" };
  return { label: "Severe", color: "#f44336", emoji: "☠️" };
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || error || !data || data.error) {
    return (
      <div className="scale-wrapper">
        <div className="container">
          <h1>Indoor Air Quality Dashboard</h1>
          <p style={{ color: error ? "red" : "#fff" }}>
            {loading
              ? "Loading data..."
              : error
              ? `Error: ${error}`
              : "No data available"}
          </p>
        </div>
      </div>
    );
  }

  const aqiInfo = getStatusInfo(data.aqi_value);
  const rawMetrics = data.metrics || [];
  const metrics = rawMetrics.map((metric) => {
    if (metric.title === "temperature") {
      return { ...metric, title: "temp" };
    }
    if (metric.title === "humidity") {
      return { ...metric, title: "RH" };
    }
    return metric;
  });

  const filledMetrics = [...metrics];
  while (filledMetrics.length < 8) {
    filledMetrics.push({ title: "N/A", value: 0, unit: "", max: 100 });
  }
  const displayedMetrics = filledMetrics.slice(0, 8);

  return (
    <div className="scale-wrapper">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Indoor Air Quality Dashboard</h1>
        </div>

        {/* Warning Banner */}
        <AnimatePresence>
          {["Poor", "Very Poor", "Severe"].includes(aqiInfo.label) && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="alert-banner"
            >
              ⚠️ Warning: Air quality is {aqiInfo.label}! Take precautions.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Info Row */}
        <div className="info-row centered-info">
          <div className="left-info">
            <span className="live-indicator" />
            Last updated: {timeAgo(data.datetime)}
          </div>
          <div className="logo-center">
            <img
              src="https://airvue.live/assets/images/logo_4.png"
              alt="AirVue Logo"
              className="info-logo"
            />
          </div>
          <div className="right-info">📍 Exhibition Hall</div>
        </div>

        {/* AQI Gauge */}
        <div
          className="aqi-section"
          style={{ borderColor: aqiInfo.color, color: aqiInfo.color }}
        >
          <motion.div
            className="aqi-circle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <motion.span
              key={data.aqi_value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aqi-value"
            >
              {data.aqi_value}
            </motion.span>
            <div className="aqi-label">
              {aqiInfo.emoji} {aqiInfo.label}
            </div>
          </motion.div>
          <p className="aqi-description">{data.aqi_description}</p>
        </div>

        {/* Metric Cards */}
        <div className="metrics-grid">
          {displayedMetrics.map((metric) => {
            const info = getStatusInfo(metric.value);
            const maxVal = metric.max && metric.max > 0 ? metric.max : 100;
            const fillPercent = Math.min((metric.value / maxVal) * 100, 100);

            return (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                status={info.label}
                emoji={info.emoji}
                progress={fillPercent}
                color={info.color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
