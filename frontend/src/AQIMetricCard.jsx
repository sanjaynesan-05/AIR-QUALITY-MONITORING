import React from 'react';

const MetricCard = ({ title, desc, value, unit, scale }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{desc}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        {value} {unit}
      </p>
      <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
        {scale}
      </span>
    </div>
  );
};

export default MetricCard;
