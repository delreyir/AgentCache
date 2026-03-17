import React from 'react';
import ReactDOM from 'react-dom/client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import App from './App.tsx';

// Hna fin kan-goulou l-app dyalna t-kheddem Petra
const wallets = [new PetraWallet()];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Hada huwa l-Provider li kan khass */}
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);