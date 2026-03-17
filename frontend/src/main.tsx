import React from 'react';
import ReactDOM from 'react-dom/client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import App from './App.tsx';

// 🚀 L-7ell: 7iydna 'petra-plugin-wallet-adapter' b merra!
// L-Aptos Wallet Adapter jdid kay-chouf Petra Wallet w ay wallet jdida (AIP-62 Standard) rasso bla plugins.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Khlli Provider bla plugins, ghadi y-detecti l-extension rasso */}
    <AptosWalletAdapterProvider autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);