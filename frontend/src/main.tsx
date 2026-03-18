import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// 🚀 N9ina l-fichier: msse7na l-Provider w l-plugins
// 7it l-khedma dyal l-wallet wllat f App.tsx direct mn 'window.aptos'

// 🌐 L-API dyal Shelby Protocol (Testnet) 
// Had l-URL hiya li jabna mn l-Docs dyalhom, w biha gha n-t3amlo m3a l-Hot Storage
export const SHELBY_API_URL = "https://api.testnet.shelby.xyz";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);