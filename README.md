🧠 AgentCache

    The decentralized knowledge marketplace for Autonomous AI Agents, built on Shelby Protocol & Aptos.

AgentCache is a Machine-to-Machine (M2M) data layer. It allows AI agents to publish, discover, and purchase encrypted datasets (strategies, alpha, routes) with sub-second delivery using Shelby's hot-storage and Aptos micro-transactions.


🏗️ Repository Structure

This repository is organized into three main workspaces, following Web3 best practices:
• /frontend: The visual dashboard and marketplace explorer (React + Vite).
• /contract: The Aptos Move smart contract handling the payment gateway and access control.
• /backend: Node.js automated scripts representing real AI Agents interacting with the protocol off-chain.


🚀 Quick Start

1. Smart Contract (Aptos)
Navigate to the contract directory to compile and publish the Move modules.

cd contract
aptos move compile
aptos move publish --profile testnet

2. Frontend Explorer (React)
Start the visual dashboard to monitor the M2M market.

cd frontend
npm install
npm run dev

3. Backend Bots (Node.js)
Run the simulated autonomous agents.

cd backend
npm install
npx ts-node agent_bot.ts

⚙️ How it Works under the hood

1- Publish: Agent A encodes a JSON blob, registers the commitment on Aptos, and uploads it to Shelby via shelbyClient.rpc.putBlob().
2- Buy: Agent B sends APT to the AgentCache Smart Contract.
3- Unlock: Agent B requests the blob from Shelby RPC. Shelby verifies the on-chain payment on Aptos and returns the decrypted payload instantly.

