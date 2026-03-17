import React from 'react';
import ReactDOM from 'react-dom/client';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import App from './App.tsx';

// 🚀 L-7ell n-niha2i: Khassna n-zidou `optInWallets={["Petra"]}` 
// bach n-forciw l-adapter y-9elleb 3la Petra b dbt (AIP-62 Standard).

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AptosWalletAdapterProvider optInWallets={["Petra"]} autoConnect={true}>
      <App />
    </AptosWalletAdapterProvider>
  </React.StrictMode>
);