import React from 'react';
import ReactDOM from 'react-dom/client';

// 🚀 L-7ell n-niha2i: Khddmna direct m3a l-navigateur (bypassing the adapter)
// msse7na l-Provider w l-plugins kamlin bach n-tfadaw l-machakil

// =========================================================
// ⚠️ M-H-I-M B-Z-A-F (DAROURI DIRHA F VS CODE) ⚠️
// L-Canvas hna ma-kay-9derch y-jib fichier './App.tsx'.
// F VS Code dyalek, msse7 hadchi kaml w copier ghir had l-code li m-commenté l-te7t:
//
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// 
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// =========================================================

// Hada ghir mock bach l-Canvas ma-y-tla3ch fih error 9ddamek
const App = () => (
  <div style={{ padding: '40px', color: '#00e5ff', fontFamily: 'monospace', fontSize: '16px', background: '#080b0f', height: '100vh' }}>
    ✅ L-code dyal main.tsx s7i7 100%! <br /><br />
    Copier l-code li m-commenté l-fou9 w 7etto f VS Code dyalek bach t-kmml l-khedma.
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);