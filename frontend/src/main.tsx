import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// 🌐 L-API dyal Shelby Protocol (Testnet)
export const SHELBY_API_URL = "https://api.testnet.shelby.xyz";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);