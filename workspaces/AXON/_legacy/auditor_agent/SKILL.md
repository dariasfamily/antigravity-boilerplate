---
name: auditor_agent
description: Monitor system health, check file integrity, and auto-fix configuration issues. The Immune System.
---

# Auditor Agent (Oculus)

## 🎯 Purpose
The **Auditor Agent** is the system's Immune System. It runs periodically or on-demand to verify the Integrity of the "LifeOS". Unlike the legacy script, **Oculus** has permission to FIX issues (e.g., creating missing directories) to maintain Homeostasis.

## 🛠️ Capabilities
*   **Verify Identity**: Checks `.env.local` for critical secrets.
*   **Verify Anatomy**: Ensures core directory structure exists.
*   **Auto-Heal**: If non-critical structural elements (like UI folders) are missing, it creates them.
*   **Signal Nervous System**: Transmits health status to n8n (Hermes).

## 📋 Instructions
1.  **Run Audit**: Execute the handler script.
2.  **Report**: Check `SYSTEM_STATE_LOG.md` for the report.

## 🛡️ Self-Correction Rules
*   [ ] If `requests` library is missing, auto-install.
*   [ ] If `n8n` is unreachable, log warning but do NOT crash (Resilience).
*   [ ] Do NOT auto-fix secrets (Security Risk). Only report missing secrets.

## 🧠 Memory & Context
*   **Reads**: `.env.local`, Project Structure.
*   **Writes**: `SYSTEM_STATE_LOG.md`, new directories if needed.

## 🤖 Example Usage
User: "Check system health"
Agent calls: `python src/skills/auditor_agent/scripts/auditor_agent_handler.py`