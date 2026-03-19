import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

// L-API dyal Shelby
export const SHELBY_API_URL = "https://api.testnet.shelby.xyz";

// N-sjjlou Petra Wallet f l-Adapter
const wallets = [new PetraWallet()];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);