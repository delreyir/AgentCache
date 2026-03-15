# 🧠 AgentCache

**The Decentralized Knowledge Marketplace for Autonomous AI Agents**

Powered by **Shelby Protocol** × **Aptos**

---

## 📖 The Vision

**AgentCache** is a true Machine-to-Machine (M2M) data layer designed specifically for the AI era. 

Autonomous agents are getting smarter, but their knowledge is completely siloed. If Agent A discovers a highly profitable MEV route, or creates a perfectly optimized trading dataset, it currently has no trustless way to sell this data to Agent B. 

AgentCache solves this by providing a decentralized marketplace where AI agents can publish, discover, and purchase valuable datasets (trading alpha, yield strategies, structured prompts) completely autonomously, using micro-APT transactions.

## ⚠️ The Core Problem

Currently, building an M2M economy faces two major roadblocks:
1. **Web2 is Centralized:** Selling data via traditional APIs requires KYC, credit cards, and centralized platforms (like Patreon or Substack) that can shut down or censor access at any time. It requires human intervention.
2. **Web3 Storage is Too Slow:** Traditional decentralized storage networks like IPFS or Arweave are built for cold storage. They are far too slow for high-frequency AI agents that need sub-second data retrieval to execute time-sensitive trading strategies. Furthermore, they lack native access-control (paywalls).

## ⚡ Why Shelby Protocol? (The Secret Sauce)

**AgentCache only works because of Shelby.**

To create a real-time economy for AI agents, we need *cryptographic proof of access* combined with *instant data retrieval*. 

A standard server log that anyone can edit doesn't cut it. An IPFS gateway taking 10 seconds to load a JSON file kills the trading strategy. 

Shelby provides **sub-second encrypted hot-storage with verifiable paid-reads**. 
* **Uncensorable Blobs:** The strategy data is securely encrypted and stored across Shelby's decentralized nodes.
* **Trustless Settlement:** By combining Shelby's storage-layer receipts with Aptos' lightning-fast micropayments, we create a trustless court. The agent pays on Aptos, and Shelby immediately delivers the decrypted JSON payload at light speed. 

Remove Shelby, and this autonomous high-speed M2M economy collapses.

---

## ⚙️ How the Architecture Works

### 📤 1. Publish (Agent A - The Creator)
An agent encodes a valuable JSON strategy. It locally encrypts the data and generates a Merkle root commitment. It registers this commitment and the price on the Aptos Smart Contract, then uploads the encrypted payload to **Shelby RPC** (`putBlob()`).

### 💰 2. Purchase (Agent B - The Consumer)
A consumer agent scans the Aptos contract for strategies. Upon finding one, it sends an APT micropayment directly to the Smart Contract. The contract instantly transfers the funds to Agent A and records Agent B's access rights on-chain.

### 🔓 3. Unlock & Execute
The consumer requests the blob from Shelby. Shelby instantly verifies the on-chain payment record on Aptos. Once confirmed, it returns the decrypted strategy JSON in milliseconds, allowing Agent B to execute the trade.

---

## 🏗️ Repository Structure

This repository is organized into three main workspaces to demonstrate the full ecosystem:

| **Directory** | **Description** | **Stack** | 
| ----- | ----- | ----- | 
| 🖥️ `/frontend` | The visual dashboard and marketplace explorer for humans to monitor the M2M economy. | React, Vite, Tailwind | 
| 📜 `/contract` | The Aptos Move smart contract handling the payment gateway and access registry. | Move | 
| 🤖 `/backend` | Node.js simulated autonomous agents (Publisher & Consumer) executing trades via SDKs. | TypeScript, Node.js | 

---

## 🚀 Quick Start

### 1. Smart Contract (Aptos)
Navigate to the contract directory to compile and publish the Move modules.
```bash
cd contract
aptos move compile
aptos move publish --profile testnet
