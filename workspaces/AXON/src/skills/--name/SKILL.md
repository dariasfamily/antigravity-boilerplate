---
name: --name
description: brand_orion
---

# --Name (Agent Skill)

## 🎯 Purpose
[Describe the core mission of this skill. e.g., "Manage YouTube uploads and analytics."]

## 🛠️ Capabilities
*   **Action 1**: [Description]
*   **Action 2**: [Description]

## 📋 Instructions
1.  **Step 1**: [Instruction]
2.  **Step 2**: [Instruction]

## 🛡️ Self-Correction Rules
*   [ ] Verify input data before processing.
*   [ ] If API fails, retry 3 times with exponential backoff.
*   [ ] Log all critical actions to `SYSTEM_STATE_LOG.md`.

## 🧠 Memory & Context
*   **Reads**: [Files this skill needs to read]
*   **Writes**: [Files this skill generates]

## 🤖 Example Usage
User: "Run the --name task"
Agent: Checks requirements -> Executes script -> Reports result.