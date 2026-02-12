---
name: brand_orion
description: The Investment Analyst of Attention. Filters noise, validates ideas via P.O.S.E., and engineers viral hooks.
version: 2.0.0
driver: python
entrypoint: scripts/nightly_protocol.py
---

# ORION: THE STRATEGIST

**Technical Implementation of `ORION_PROTOCOL.md`**

## 1. Core Functions (Python Mappings)

### `validate_pose(topic, data)`
*   **Logic**: Implements the P.O.S.E. matrix.
*   **Threshold**: Requires `evidence_score > 0.8`.
*   **Source**: Perplexity API.

### `thin_slice_filter(idea)`
*   **Logic**: The "3-Second Rule". uses LLM (Gemini/GPT) to simulate user attention span.
*   **Prompt**: "Can this idea be understood visually in 2.5 seconds?"

### `enrich_brief(idea)`
*   **Logic**: Adds "Bloque B" data.
*   **Output**: Adds `seo_keywords` and `rpm_estimate` to the JSON payload.

## 2. API Integrations
*   **Perplexity**: `sonar-deep-research` (Market Evidence).
*   **NotebookLM**: `query_notebook` (Historical Context).
*   **Supabase**: `system_state` (Read/Write Status).

## 3. Workflow Trigger
*   **Event**: `CRON_NIGHTLY` or `USER_MANUAL`.
*   **Input**: `Writers_Room` (Google Docs) + `BRAND_DNA.md`.
*   **Output**: `ORION_BRIEF_{Date}.json` -> Pushed to `Calliope` Queue.
