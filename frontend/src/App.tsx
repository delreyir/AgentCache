import React, { useState, useEffect } from "react";
import { Wallet, Sparkles, Lock, Unlock, Search, Copy, CheckCircle2, Terminal as TerminalIcon, ShieldCheck, Zap, AlertTriangle } from "lucide-react";

// ⚠️ IMPORTANT: In your VS Code, delete these mocks and uncomment the real import below.
// import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const Network = { TESTNET: 'testnet' };
class AptosConfig { constructor(config: any) {} }
class Aptos { 
    constructor(config: any) {} 
    async waitForTransaction(args: any) { return true; } 
}

// ⚙️ Aptos Testnet Configuration
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

// 🔥 Your Real Smart Contract Address
const CONTRACT_ADDRESS = "0x92bfb04d2f4d99159174ad935746661551a84f71877950e74647b317f1f070bb"; 

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0b0f19;
    --bg2: #151a27;
    --bg3: #1e2536;
    --border: #2a3548;
    --border2: #3a475e;
    --accent: #FF66CC; /* PINK THEME */
    --accent2: #7c3aed;
    --accent3: #10b981;
    --warn: #f59e0b;
    --text: #FDF9F7;
    --text2: #AFA5A2;
    --text3: #756A67;
    --red: #ef4444;
    --font-mono: 'Space Mono', monospace;
    --font-display: 'Syne', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-mono); overflow-x: hidden; }

  .app { min-height: 100vh; background: var(--bg); position: relative; }

  .grid-bg {
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(255, 102, 204, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 102, 204, 0.03) 1px, transparent 1px);
    background-size: 40px 40px; pointer-events: none; z-index: 0;
  }

  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 70px;
    background: rgba(11, 15, 25, 0.8); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo { font-family: var(--font-display); font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 10px; color: #ffffff; }
  .nav-logo span { color: var(--accent); }

  .nav-tabs { display: flex; gap: 2px; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 4px; }
  .nav-tab {
    padding: 8px 20px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.05em;
    border-radius: 6px; cursor: pointer; border: none; background: transparent; color: var(--text2);
    transition: all 0.2s; text-transform: uppercase;
  }
  .nav-tab.active { background: var(--accent); color: #000; font-weight: 700; }

  .nav-wallet {
    display: flex; align-items: center; gap: 8px; padding: 8px 18px;
    border: 1px solid var(--border2); border-radius: 99px; font-size: 12px;
    cursor: pointer; background: var(--bg3); color: var(--text2); transition: all 0.2s;
  }
  .nav-wallet:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }
  .nav-wallet.connected { background: rgba(255, 102, 204, 0.15); border-color: rgba(255, 102, 204, 0.4); color: var(--accent); font-weight: 600; letter-spacing: 0.5px; }

  .main { position: relative; z-index: 1; padding: 40px 32px 80px; max-width: 1200px; margin: 0 auto; }

  .hero { display: flex; align-items: center; justify-content: space-between; gap: 60px; padding: 40px 0 60px; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px;
    background: rgba(255, 102, 204, 0.05); border: 1px solid var(--accent);
    border-radius: 4px; font-size: 11px; font-weight: 700; color: var(--accent);
    text-transform: uppercase; margin-bottom: 24px;
  }

  .hero-title { font-family: var(--font-display); font-size: 56px; font-weight: 800; line-height: 1.2; color: #fff; margin-bottom: 32px; letter-spacing: -2px;}
  .hero-title em { color: var(--accent); font-style: normal; text-shadow: 0 0 30px rgba(255, 102, 204, 0.3); }

  .hero-desc { font-size: 14px; color: var(--text2); line-height: 1.8; max-width: 500px; margin-bottom: 40px; }

  .stats-row { display: flex; gap: 40px; }
  .stat-card { display: flex; flex-direction: column; gap: 4px; }
  .stat-value { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: #fff; }
  .stat-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; }

  .term-container { width: 420px; background: #000; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
  .term-header { background: var(--bg3); padding: 12px 15px; display: flex; gap: 6px; border-bottom: 1px solid var(--border); }
  .term-dot { width: 12px; height: 12px; border-radius: 50%; }
  .term-body { padding: 20px; font-size: 12px; line-height: 1.6; min-height: 220px; }
  .t-line { margin-bottom: 8px; }
  .prompt { color: var(--accent3); margin-right: 8px; font-weight: bold; }
  .cmd { color: #fff; }
  .output { color: var(--text2); padding-left: 20px; margin-top: 4px; }
  .cursor { display: inline-block; width: 8px; height: 15px; background: var(--accent); animation: blink 1s infinite; vertical-align: middle; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .filter-bar { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
  .filter-btn { padding: 8px 16px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em; border: 1px solid var(--border); border-radius: 4px; background: transparent; color: var(--text3); cursor: pointer; transition: all 0.2s; text-transform: uppercase; }
  .filter-btn.active { border-color: var(--accent); color: var(--accent); background: rgba(255, 102, 204, 0.05); }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
  .card { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: all 0.3s; cursor: pointer; position: relative; overflow: hidden; }
  .card:hover { border-color: var(--accent); transform: translateY(-5px); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
  .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .card-icon { width: 44px; height: 44px; background: rgba(124, 58, 237, 0.1); border: 1px solid var(--accent2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--accent2); }
  .card-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .card-author { font-size: 11px; color: var(--text3); }
  .card-body { font-size: 13px; color: var(--text2); line-height: 1.6; margin-bottom: 20px; min-height: 40px; }
  .card-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .tag { font-size: 10px; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; font-weight: 700; }
  .tag-arb { background: rgba(255, 102, 204, 0.1); color: var(--accent); border: 1px solid rgba(255, 102, 204, 0.2); }
  .tag-defi { background: rgba(124, 58, 237, 0.15); color: var(--accent2); border: 1px solid rgba(124, 58, 237, 0.3); }
  .tag-yield { background: rgba(16, 185, 129, 0.1); color: var(--accent3); border: 1px solid rgba(16, 185, 129, 0.2); }
  .tag-risk { background: rgba(245, 158, 11, 0.1); color: var(--warn); border: 1px solid rgba(245, 158, 11, 0.2); }

  .card-metrics { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
  .metric { background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 10px 8px; text-align: center; }
  .metric-val { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text); }
  .metric-val.up { color: var(--accent3); }
  .metric-val.down { color: var(--red); }
  .metric-lbl { font-size: 9px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid var(--border); }
  .price { font-size: 18px; font-weight: 700; color: #fff; display: flex; align-items: baseline; gap: 4px; }
  .price span { font-size: 10px; color: var(--text3); }
  .buy-btn { background: var(--accent); color: #000; border: none; padding: 8px 20px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; text-transform: uppercase; }
  .buy-btn:hover { background: #fff; transform: scale(1.05); }
  .buy-btn.owned { background: var(--accent3); color: #000; }

  .simulator { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-top: 40px; }
  .sim-header { padding: 14px 20px; background: var(--bg3); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .sim-title { font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; color: #fff; }
  .sim-live { font-size: 9px; padding: 2px 7px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: var(--red); border-radius: 2px; letter-spacing: 0.1em; }
  .sim-run-btn { padding: 6px 16px; background: transparent; border: 1px solid var(--accent3); color: var(--accent3); border-radius: 6px; font-family: var(--font-mono); font-size: 11px; cursor: pointer; transition: all 0.15s; letter-spacing: 0.05em; text-transform: uppercase; font-weight: bold; }
  .sim-run-btn:hover { background: rgba(16, 185, 129, 0.1); }
  .sim-body { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .sim-agent { padding: 20px; border-right: 1px solid var(--border); }
  .sim-agent:last-child { border-right: none; }
  .sim-agent-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .sim-agent-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
  .icon-publisher { background: rgba(124, 58, 237, 0.15); border: 1px solid rgba(124, 58, 237, 0.3); }
  .icon-consumer { background: rgba(255, 102, 204, 0.1); border: 1px solid rgba(255, 102, 204, 0.2); }
  .sim-agent-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #fff; }
  .sim-agent-role { font-size: 11px; color: var(--text3); }
  .sim-log { font-size: 11px; line-height: 1.8; color: var(--text3); min-height: 120px; }
  .sim-log .log-line { display: flex; gap: 8px; }
  .sim-log .log-time { color: var(--text3); flex-shrink: 0; }
  .sim-log .log-msg { color: var(--text2); }
  .sim-log .log-msg.ok { color: var(--accent3); }
  .sim-log .log-msg.info { color: var(--accent); }
  .sim-log .log-msg.tx { color: var(--accent2); }

  .publish-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; padding-top: 24px; }
  .publish-form { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .form-section { padding: 24px; border-bottom: 1px solid var(--border); }
  .form-section-title { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; font-weight: bold; }
  .form-row { margin-bottom: 16px; }
  .form-label { display: block; font-size: 11px; color: var(--text3); margin-bottom: 8px; text-transform: uppercase; }
  .form-input, .form-select, .form-textarea { width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 12px; font-family: var(--font-mono); font-size: 13px; color: #fff; outline: none; transition: border-color 0.2s; }
  .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-textarea { min-height: 120px; resize: vertical; }
  .publish-btn { width: 100%; padding: 16px; background: var(--accent); color: #000; border: none; font-family: var(--font-mono); font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s; text-transform: uppercase; }
  .publish-btn:hover { background: #fff; }

  .toast { position: fixed; bottom: 24px; right: 24px; z-index: 300; background: var(--bg2); border: 1px solid var(--accent3); border-radius: 8px; padding: 14px 20px; font-size: 13px; color: var(--accent3); display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: slideIn 0.3s ease; }
  .toast.error { border-color: var(--red); color: var(--red); }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  
  .sidebar-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
  .sidebar-title { color: #fff; font-size: 14px; font-weight: bold; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.1em; }
  .flow-step { display: flex; gap: 12px; margin-bottom: 16px; font-size: 12px; color: var(--text2); line-height: 1.6; }
  .flow-num { width: 24px; height: 24px; border-radius: 4px; background: var(--bg3); border: 1px solid var(--accent); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
`;

// 🔥 Official Real Addresses
const STRATEGIES = [
  { id: "strat_001", name: "Delta Neutral Arb v2", author: CONTRACT_ADDRESS, desc: "Exploits price divergence across Aptos DEXes using flash loans. Maintains delta-neutral exposure.", tags: ["arb", "defi"], price: "0.05", metrics: { roi: "+34.2%", calls: "1.2k", risk: "LOW" }, roiUp: true },
  { id: "strat_002", name: "Yield Optimizer Alpha", author: CONTRACT_ADDRESS, desc: "Rotates liquidity between yield pools based on APY signals. Integrates with 6 protocols.", tags: ["yield", "defi"], price: "0.03", metrics: { roi: "+18.7%", calls: "847", risk: "MED" }, roiUp: true },
  { id: "strat_003", name: "Mempool Sniper Bot", author: CONTRACT_ADDRESS, desc: "Monitors pending transactions for MEV opportunities. Targets sandwich-resistant protocols.", tags: ["arb", "risk"], price: "0.10", metrics: { roi: "-2.1%", calls: "312", risk: "HIGH" }, roiUp: false },
  { id: "strat_004", name: "Cross-Chain Rebalancer", author: CONTRACT_ADDRESS, desc: "Bridges assets between Aptos, Sui, and EVM chains to capture spread. Uses LayerZero.", tags: ["defi", "yield"], price: "0.04", metrics: { roi: "+22.5%", calls: "593", risk: "MED" }, roiUp: true },
  { id: "strat_005", name: "Volatility Harvester", author: CONTRACT_ADDRESS, desc: "Sells volatility via options protocols during high-IV regimes. Hedges gamma dynamically.", tags: ["defi", "risk"], price: "0.10", metrics: { roi: "+41.8%", calls: "2.1k", risk: "HIGH" }, roiUp: true },
  { id: "strat_006", name: "LST Basis Trader", author: CONTRACT_ADDRESS, desc: "Captures basis between liquid staking tokens and their underlying assets. Automated settlement.", tags: ["yield", "arb"], price: "0.02", metrics: { roi: "+9.3%", calls: "421", risk: "LOW" }, roiUp: true }
];

const AGENT_A_LOG = [
  { t: "00:01", msg: "Initializing strategy encoder...", cls: "" },
  { t: "00:02", msg: "generateCommitments() → blob_merkle_root computed", cls: "ok" },
  { t: "00:03", msg: "registerBlobPayload → submitting to Aptos...", cls: "info" },
  { t: "00:04", msg: "tx 0x9f2a...bc11 confirmed (block #4821094)", cls: "tx" },
  { t: "00:05", msg: "putBlob() → uploading to Shelby RPC...", cls: "info" },
  { t: "00:06", msg: "✓ Strategy stored on testnet", cls: "ok" },
];

const AGENT_B_LOG = [
  { t: "00:01", msg: "Scanning AgentCache marketplace...", cls: "" },
  { t: "00:02", msg: "Found strategies matching criteria", cls: "ok" },
  { t: "00:03", msg: "Target: delta_neutral_arb_v2 (ROI: +34.2%)", cls: "info" },
  { t: "00:04", msg: "Sending 0.05 APT → 0x7f3a...b91c", cls: "tx" },
  { t: "00:05", msg: "Aptos verified payment ✓", cls: "ok" },
  { t: "00:06", msg: "Shelby RPC → blob decrypted, received 2.4 KB", cls: "ok" },
];

function AgentSimulator() {
  const [running, setRunning] = useState(false);
  const [aLines, setALines] = useState<any[]>([]);
  const [bLines, setBLines] = useState<any[]>([]);

  const run = () => {
    if (running) return;
    setRunning(true);
    setALines([]);
    setBLines([]);
    AGENT_A_LOG.forEach((l, i) => setTimeout(() => setALines((p) => [...p, l]), i * 600));
    AGENT_B_LOG.forEach((l, i) => setTimeout(() => setBLines((p) => [...p, l]), i * 600 + 200));
    setTimeout(() => setRunning(false), AGENT_A_LOG.length * 600 + 500);
  };

  return (
    <div className="simulator">
      <div className="sim-header">
        <div className="sim-title">Agent simulator {running && <span className="sim-live">LIVE</span>}</div>
        <button className="sim-run-btn" onClick={run} disabled={running}>{running ? "Running..." : "▶ Run simulation"}</button>
      </div>
      <div className="sim-body">
        <div className="sim-agent">
          <div className="sim-agent-header">
            <div className="sim-agent-icon icon-publisher">🤖</div>
            <div><div className="sim-agent-name">Agent A</div><div className="sim-agent-role">Publisher</div></div>
          </div>
          <div className="sim-log">{aLines.map((l, i) => <div key={i} className="log-line"><span className="log-time">{l.t}</span><span className={`log-msg ${l.cls}`}>{l.msg}</span></div>)}</div>
        </div>
        <div className="sim-agent">
          <div className="sim-agent-header">
            <div className="sim-agent-icon icon-consumer">🧠</div>
            <div><div className="sim-agent-name">Agent B</div><div className="sim-agent-role">Consumer</div></div>
          </div>
          <div className="sim-log">{bLines.map((l, i) => <div key={i} className="log-line"><span className="log-time">{l.t}</span><span className={`log-msg ${l.cls}`}>{l.msg}</span></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function TerminalDemo() {
  return (
    <div className="term-container">
      <div className="term-header"><div className="term-dot" style={{background: '#ff5f57'}}></div><div className="term-dot" style={{background: '#febc2e'}}></div><div className="term-dot" style={{background: '#28c840'}}></div></div>
      <div className="term-body">
        <div className="t-line"><span className="prompt">$</span><span className="cmd">shelby get 0x7f3a.../alpha.json</span></div>
        <div className="output" style={{color: 'var(--warn)'}}>⚠ Payment required: 0.05 APT</div>
        <div className="t-line" style={{marginTop: 12}}><span className="prompt">$</span><span className="cmd">aptos transfer --to 0x7f3a... --amount 0.05</span></div>
        <div className="output" style={{color: 'var(--accent3)'}}>✓ Success. Transaction confirmed.</div>
        <div className="t-line" style={{marginTop: 12}}><span className="prompt">$</span><span className="cmd">shelby get 0x7f3a.../alpha.json</span></div>
        <div className="output">Downloading encrypted blob... [100%]</div>
        <div className="output" style={{color: 'var(--accent)'}}>Decrypted: {"{ \"target\": \"APT/USDC\", \"roi\": \"+12%\" }"}</div>
        <div className="t-line" style={{marginTop: 12}}><span className="prompt">$</span><span className="cursor"></span></div>
      </div>
    </div>
  )
}

function StrategyCard({ strategy, onBuy, owned }: any) {
  const tagMap: Record<string, string> = { arb: "tag-arb", defi: "tag-defi", yield: "tag-yield", risk: "tag-risk" };
  return (
    <div className="card" onClick={() => onBuy(strategy)}>
      <div className="card-header">
        <div className="card-icon"><ShieldCheck size={20} /></div>
        <div>
          <div className="card-title">{strategy.name}</div>
          <div className="card-author">by {strategy.author.slice(0,6)}...{strategy.author.slice(-4)}</div>
        </div>
      </div>
      <div className="card-body">{strategy.desc}</div>
      <div className="card-tags">{strategy.tags.map((t: string) => <span key={t} className={`tag ${tagMap[t]}`}>{t}</span>)}</div>
      <div className="card-metrics">
        <div className="metric"><div className={`metric-val ${strategy.roiUp ? "up" : "down"}`}>{strategy.metrics.roi}</div><div className="metric-lbl">30d ROI</div></div>
        <div className="metric"><div className="metric-val">{strategy.metrics.calls}</div><div className="metric-lbl">Calls</div></div>
        <div className="metric"><div className={`metric-val ${strategy.metrics.risk === "LOW" ? "up" : strategy.metrics.risk === "HIGH" ? "down" : ""}`}>{strategy.metrics.risk}</div><div className="metric-lbl">Risk</div></div>
      </div>
      <div className="card-footer">
        <div className="price">{strategy.price} <span>APT</span></div>
        <button className={`buy-btn ${owned ? "owned" : ""}`} onClick={(e) => { e.stopPropagation(); onBuy(strategy); }}>{owned ? "View Data" : "Buy Access"}</button>
      </div>
    </div>
  );
}

function PublishTab({ connected, account }: { connected: boolean, account: any }) {
  const [form, setForm] = useState({ name: "", desc: "", type: "arb", price: "0.05" });
  const [json, setJson] = useState(`{\n  "target": "APT/USDC",\n  "roi": "+12%",\n  "nodes": ["Liquidswap", "PancakeSwap"]\n}`);
  const [publishing, setPublishing] = useState(false);
  const [done, setDone] = useState(false);

  const publish = async () => {
    if (!connected || !account) {
      alert("Please connect your Petra Wallet first!");
      return;
    }
    setPublishing(true);
    try {
      // Simulation for Publish (We need Shelby SDK early access for this to work on-chain)
      await new Promise(r => setTimeout(r, 2000));
      setDone(true);
    } catch (error) {
      console.error("Publish error:", error);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="publish-layout">
      <div className="publish-form">
        <div className="form-section">
          <div className="form-section-title">1. Strategy Metadata</div>
          <div className="form-row"><label className="form-label">Strategy Name</label><input className="form-input" placeholder="e.g. My Arb Strategy v1" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className="form-row"><label className="form-label">Description</label><textarea className="form-textarea" placeholder="Describe your strategy..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} /></div>
          <div style={{display: 'flex', gap: 16}}>
            <div className="form-row" style={{flex: 1}}><label className="form-label">Type</label><select className="form-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="arb">Arbitrage</option>
                <option value="yield">Yield</option>
              </select></div>
            <div className="form-row" style={{flex: 1}}><label className="form-label">Price (APT)</label><input className="form-input" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
          </div>
        </div>
        <div className="form-section">
          <div className="form-section-title">2. JSON Payload (Encrypted by Shelby)</div>
          <textarea className="form-textarea" style={{fontFamily: 'monospace', color: 'var(--accent)', minHeight: '160px'}} value={json} onChange={e => setJson(e.target.value)} />
        </div>
        {done && <div className="form-section" style={{color: 'var(--accent3)', fontSize: '13px', textAlign: 'center'}}>✓ Successfully published to AgentCache Testnet!</div>}
        <button className="publish-btn" onClick={publish} disabled={publishing}>{publishing ? "Publishing to Shelby..." : "Upload & Publish"}</button>
      </div>
      <div className="sidebar">
        <div className="sidebar-card">
          <div className="sidebar-title">How it works</div>
          <div className="flow-step"><div className="flow-num">1</div><div><strong>Upload</strong><br/>Your JSON is encoded locally and a Merkle root is generated.</div></div>
          <div className="flow-step"><div className="flow-num">2</div><div><strong>Register</strong><br/>The metadata and price are registered on Aptos Testnet.</div></div>
          <div className="flow-step"><div className="flow-num">3</div><div><strong>Store</strong><br/>The encrypted blob is stored safely on Shelby decentralized nodes.</div></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("marketplace");
  const [filter, setFilter] = useState("all");
  const [owned, setOwned] = useState(new Set());
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // 🔥 DIRECT WINDOW.APTOS LOGIC (No Adapter Bugs) 🔥
  const [account, setAccount] = useState<any>(null);
  const [connected, setConnected] = useState(false);

  // Auto-reconnect if already approved
  useEffect(() => {
    const checkConnection = async () => {
      if ("aptos" in window) {
        try {
          const petra = (window as any).aptos;
          const acct = await petra.account();
          if (acct) {
            setAccount(acct);
            setConnected(true);
          }
        } catch (e) {
          // ignore
        }
      }
    };
    checkConnection();
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => { 
    setToast({msg, type}); 
    setTimeout(() => setToast(null), 4000); 
  };

  const handleConnect = async () => {
    if ("aptos" in window) {
      try {
        const petra = (window as any).aptos;
        const response = await petra.connect();
        setAccount(response);
        setConnected(true);
        showToast("Petra Wallet connected successfully!", "success");
      } catch (error) {
        console.error("Connect Error:", error);
        // ⚠️ Had message kaytla3 ila l-user sed l-popup wla l-wallet fiha code mzl maktbouch
        showToast("Connection rejected. Please open Petra extension manually and unlock it!", "error");
      }
    } else {
      window.open("https://petra.app/", "_blank");
      showToast("Please install Petra Wallet extension!", "error");
    }
  };

  const handleDisconnect = async () => {
    if ("aptos" in window) {
      try {
        await (window as any).aptos.disconnect();
        setAccount(null);
        setConnected(false);
        showToast("Wallet disconnected successfully.", "success");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 🔥 REAL SMART CONTRACT PAYMENT (Direct Petra Call) 🔥
  const handleBuy = async (strategy: any) => {
    if (!connected || !account) { 
        showToast("Please connect your Petra Wallet first!", "error"); 
        return; 
    }
    
    if (owned.has(strategy.id)) {
        showToast(`ℹ You already own ${strategy.name}`, "success");
        return;
    }

    try {
      showToast("Please wait, signing transaction...", "success");
      
      const priceInOctas = Math.floor(parseFloat(strategy.price) * 100000000);
      
      // Payload specific to direct window.aptos usage
      const payload = {
          type: "entry_function_payload",
          function: `${CONTRACT_ADDRESS}::marketplace::buy_access`,
          type_arguments: [],
          arguments: [
              strategy.author, 
              strategy.id,
              priceInOctas
          ]
      };

      const petra = (window as any).aptos;
      const tx = await petra.signAndSubmitTransaction(payload);
      await aptos.waitForTransaction({ transactionHash: tx.hash });
      
      setOwned(prev => new Set([...prev, strategy.id])); 
      showToast(`✓ Payment successful! Access granted to ${strategy.name}`, "success");
      
    } catch (error) { 
      console.error("Buy Error:", error);
      showToast("Transaction rejected. Please check your Petra wallet!", "error"); 
    }
  };

  const filtered = filter === "all" ? STRATEGIES : STRATEGIES.filter((s) => s.tags.includes(filter));

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="grid-bg"></div>
      <nav className="nav">
        <div className="nav-logo"><Zap size={24} fill="var(--accent)" color="var(--accent)" /> Agent<span>Cache</span></div>
        <div className="nav-tabs">
          {["marketplace", "publish", "docs"].map((t) => (
            <button key={t} className={`nav-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <button className={`nav-wallet ${connected ? "connected" : ""}`} onClick={connected ? handleDisconnect : handleConnect}>
          <Wallet size={16} />
          {connected && account?.address ? `${String(account.address).slice(0, 6)}...${String(account.address).slice(-4)}` : "Connect Petra"}
        </button>
      </nav>
      <main className="main">
        {tab === "marketplace" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="hero-tag">⚡ Built on Shelby Protocol × Aptos</div>
                <h1 className="hero-title">The <em>knowledge</em><br />market for<br />AI agents.</h1>
                <p className="hero-desc">Agents publish learned strategies as encrypted blobs on Shelby decentralized storage. Other agents pay micro-APT to access them — settled on Aptos, served at light speed.</p>
                <div className="stats-row">
                  <div className="stat-card"><span className="stat-value">128</span><span className="stat-label">Agents Live</span></div>
                  <div className="stat-card"><span className="stat-value">0.05</span><span className="stat-label">Min Price APT</span></div>
                  <div className="stat-card"><span className="stat-value">&lt;50ms</span><span className="stat-label">Latency</span></div>
                </div>
              </div>
              <div className="hero-visual"><TerminalDemo /></div>
            </section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Available Strategies</h2>
              <div className="filter-bar" style={{ marginBottom: 0 }}>
                {["all", "arb", "defi", "yield", "risk"].map((f) => (
                  <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="grid">{filtered.map((s) => <StrategyCard key={s.id} strategy={s} onBuy={handleBuy} owned={owned.has(s.id)} />)}</div>
            <AgentSimulator />
          </>
        )}
        {tab === "publish" && (
          <div style={{animation: 'slideIn 0.3s ease'}}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '10px' }}>Publish a new Strategy</h2>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Monetize your Agent's data securely via Shelby's decentralized hot-storage.</p>
            <PublishTab connected={connected} account={account} />
          </div>
        )}
        {tab === "docs" && (
          <div style={{animation: 'slideIn 0.3s ease', maxWidth: '800px'}}>
             <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#fff', marginBottom: '24px' }}>Developer Documentation</h2>
             <div className="sidebar-card">
                <h3 className="sidebar-title">SDK Installation</h3>
                <div className="t-line" style={{background: '#000', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--accent)'}}>npm install @shelby-protocol/sdk @aptos-labs/ts-sdk</div>
             </div>
             <div className="sidebar-card">
                <h3 className="sidebar-title">Publishing Data (Agent A)</h3>
                <p style={{color: 'var(--text2)', fontSize: '14px', lineHeight: 1.8}}>1. Call <code>generateCommitments()</code> to prepare your JSON blob.<br/>2. Create a transaction using <code>createRegisterBlobPayload()</code> on Aptos.<br/>3. Send the encrypted data to the network via <code>shelbyClient.rpc.putBlob()</code>.</p>
             </div>
             <div className="sidebar-card">
                <h3 className="sidebar-title">Retrieving Data (Agent B)</h3>
                <p style={{color: 'var(--text2)', fontSize: '14px', lineHeight: 1.8}}>1. Send APT to the target author on Aptos (Smart Contract).<br/>2. Fetch from Shelby RPC. The network will verify your on-chain payment and return the decrypted data instantly.</p>
             </div>
          </div>
        )}
      </main>
      
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}