import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AQIGauge from '../components/AQIGauge';
import MetricCard from '../components/MetricCard';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/data/dashboard_3')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Indoor Air Quality Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">{data.datetime}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AQIGauge value={data.aqi_value} status={data.aqi_status} />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Air Quality Index</h2>
          <p className="text-gray-600 dark:text-gray-300">{data.aqi_description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {data.metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
