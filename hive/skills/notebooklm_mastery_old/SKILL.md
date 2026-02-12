---
name: NotebookLM Mastery
description: Skilled in managing, auditing, and syncing Google NotebookLM environments.
---

# NotebookLM Mastery Skill

This skill provides the operational intelligence to manage a large ecosystem of Google NotebookLM notebooks.

## Core Capabilities
1. **Cataloging & Inventory**: Systematically listing all notebooks and their metadata into a global `registry.json`.
2. **Deep Auditing**: Creating detailed Markdown inventories of a notebook's sources, notes, and resources.
3. **Strategic Categorization**: Grouping sources into functional silos (e.g., Nucleus, Shield, Motor, Mind).
4. **Knowledge Syncing**: Ensuring local codebases and documents are up-to-date within their respective notebooks.

## Key Procedures

### 1. Global Inventory Update
- Run `list_notebooks` to get the latest identifiers.
- Compare with `hive/integrations/notebooklm/registry.json`.
- Update count and modified dates.

### 2. Notebook Source Extraction
- For a specific `notebook_id`, run `notebook_get`.
- Parse the output into a structured Markdown file in `hive/integrations/notebooklm/backups/`.
- Categorize sources based on the **6-Group Framework** (Nucleus, Structure, Volume, Motor, Shield, Mente).

### 3. Source Syncing
- Use `notebook_add_url`, `notebook_add_text`, or `notebook_add_drive` to keep notebooks fresh with the latest project developments.

## Automation Tools
The implementation of these procedures is supported by scripts located in `hive/integrations/notebooklm/scripts/`.
