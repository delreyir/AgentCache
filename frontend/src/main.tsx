import React from 'react';
import ReactDOM from 'react-dom/client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import App from './App.tsx';

// 🌐 L-API dyal Shelby Protocol (Testnet)
export const SHELBY_API_URL = "https://api.testnet.shelby.xyz";

// 🚀 N-sjjlou Petra Wallet b7al kima dar f datamesh
const wallets = [new PetraWallet()];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);