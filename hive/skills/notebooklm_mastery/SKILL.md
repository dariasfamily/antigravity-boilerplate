---
name: notebooklm_mastery
description: Skilled in managing, auditing, and syncing Google NotebookLM environments.
---

# NotebookLM Mastery (Agent Skill)

## 🎯 Purpose
Provide operational intelligence to manage a large ecosystem of Google NotebookLM notebooks, ensuring all knowledge assets are cataloged, categorized, and synced with the Hive.

## 🛠️ Capabilities
*   **Cataloging & Inventory**: Systematically listing all notebooks and their metadata into a global `registry.json`.
*   **Deep Auditing**: Creating detailed Markdown inventories of a notebook's sources, notes, and resources (6-Group Framework).
*   **Strategic Categorization**: Grouping sources into functional silos (Nucleus, Structure, Volume, Motor, Shield, Mind).
*   **Knowledge Syncing**: Ensuring local codebases and documents are up-to-date within their respective notebooks.

## 📋 Instructions
1.  **Global Inventory Update**: Run `list_notebooks`, compare with `registry.json`, and update counts/dates.
2.  **Notebook Source Extraction**: Use `notebook_get` to fetch metadata and parse it into categorized Markdown in `backups/`.
3.  **Source Syncing**: Use `notebook_add_url`, `notebook_add_text`, or `notebook_add_drive` to push updates.

## 🛡️ Self-Correction Rules
*   [x] Verify `notebook_id` valid before any operation.
*   [x] If list fetch fails, check MCP server status via `mcp_get_service`.
*   [x] Log all deep audits to `hive/integrations/notebooklm/backups/`.

## 🧠 Memory & Context
*   **Reads**: `registry.json`, `mcp_config.json`.
*   **Writes**: `notebooks_inventory.csv`, `backups/*.md`.

## 🤖 Example Usage
User: "Thalia, audita el cuaderno Semilla v0."
Agent: Identifies ID -> Runs `notebook_get` -> Parses Categorization -> Saves to Backups -> Reports to User.