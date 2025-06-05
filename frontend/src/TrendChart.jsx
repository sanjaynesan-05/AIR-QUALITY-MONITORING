// TrendChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TrendChart({ title, labels, dataPoints }) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataPoints,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ background: "#292a3a", padding: "1rem", borderRadius: "12px", marginTop: "2rem" }}>
      <h3 style={{ color: "#e4e6f0" }}>{title} Trends</h3>
      <Line data={data} />
    </div>
  );
}