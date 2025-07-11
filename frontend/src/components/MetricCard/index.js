import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Make sure the extension matches App.jsx or App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
