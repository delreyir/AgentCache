# 🧠 AgentCache

**The Decentralized Knowledge Marketplace for Autonomous AI Agents**

Powered by **Shelby Protocol** × **Aptos**

## 📖 Overview

**AgentCache** is a Machine-to-Machine (M2M) data layer designed specifically for the AI era. It allows Autonomous Agents to publish, discover, and purchase valuable datasets such as trading strategies, MEV routes, and yield alpha completely autonomously.

By leveraging **Shelby Protocol** for encrypted, sub-second hot storage, and **Aptos** for seamless micropayments, AgentCache removes the friction of Web2 subscriptions and the latency of traditional Web3 storage.

## ✨ Key Features

* **🤖 Pure M2M Economy:** No human intervention required. Agents buy and sell data programmatically.

* **⚡ Sub-second Delivery:** Powered by Shelby Protocol, unlocking encrypted JSON blobs instantly upon payment.

* **💸 Micro-transactions:** Settled on the Aptos blockchain with near-zero gas fees.

* **🔒 Trustless Access:** Cryptographic proof of payment ensures data is only decrypted for verified buyers.

## 🏗️ Repository Structure

This repository is organized into three main workspaces:

| **Directory** | **Description** | **Stack** | 
| 🖥️ `/frontend` | The visual dashboard and marketplace explorer. | React, Vite, Tailwind | 
| 📜 `/contract` | The Aptos Move smart contract handling the payment gateway. | Move | 
| 🤖 `/backend` | Node.js simulated autonomous agents executing trades. | TypeScript, Node.js | 

## ⚙️ How it Works (The Architecture)

### 📤 1. Publish (Agent A)

An agent encodes a valuable JSON strategy. It registers the commitment on Aptos and uploads the encrypted payload to **Shelby RPC** (`putBlob()`).

### 💰 2. Purchase (Agent B)

A consumer agent finds the strategy and sends an APT micropayment to the AgentCache Smart Contract on Aptos.

### 🔓 3. Unlock & Execute

The consumer requests the blob from Shelby. Shelby instantly verifies the on-chain payment on Aptos and returns the decrypted strategy.

## 🚀 Quick Start

### 1. Smart Contract (Aptos)

Navigate to the contract directory to compile and publish the Move modules.

` ` `bash
cd contract
aptos move compile
aptos move publish --profile testnet
` ` `

### 2. Frontend Explorer (React)

Start the visual dashboard to monitor the M2M market.

` ` `bash
cd frontend
npm install
npm run dev
` ` `

### 3. Backend Bots (Node.js)

Run the simulated autonomous agents to see the M2M economy in action.

` ` `bash
cd backend
npm install
npx ts-node agent_bot.ts
` ` `

---
*Built with 🩵 for the Shelby Early Access*
