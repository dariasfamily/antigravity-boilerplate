---
name: hermes_agent
description: The System Service Bus. Routes messages between agents, manages N8N connectivity, and enforces inter-agent communication protocols.
---

# Hermes Agent (The System Bus)

## 🎯 Purpose
**Hermes** is the central nervous system's router. It decouples agents from each other. Instead of Agent A importing Agent B, Agent A sends a message to Hermes, and Hermes delivers it to Agent B (or N8N, or an External API).

## 🛠️ Capabilities
*   **Route Message**: Takes a JSON envelope (`recipient`, `action`, `payload`) and executes the target agent.
*   **Broadcast**: Sends a message to multiple subscribers (e.g., "System Audit Failed" -> N8N + Logs).
*   **Protocol Enforcer**: Validates that the payload matches the recipient's schema.

## 📋 Instructions
1.  **To Send**: Run `python src/skills/hermes_agent/scripts/hermes_handler.py send --recipient "wealth_manager" --action "add" --payload '{"amount": 100}'`

## 🛡️ Self-Correction Rules
*   [ ] Verify `recipient` exists in `src/skills/`.
*   [ ] If N8N is down, queue the message locally (Simple retry).
*   [ ] Log every transmission to `SYSTEM_STATE_LOG.md`.

## 🧠 Memory & Context
*   **Reads**: `src/skills/*` (Discovery).
*   **Writes**: `SYSTEM_STATE_LOG.md`.

## 🤖 Example Usage
User: "Tell the auditor to scan now."
Agent calls: `python src/skills/hermes_agent/scripts/hermes_handler.py send --recipient "auditor_agent" --action "scan" --payload '{}'`