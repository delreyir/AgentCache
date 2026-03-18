import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// 🚀 N9ina l-fichier: msse7na l-Provider w l-plugins
// 7it l-khedma dyal l-wallet wllat f App.tsx direct mn 'window.aptos'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);