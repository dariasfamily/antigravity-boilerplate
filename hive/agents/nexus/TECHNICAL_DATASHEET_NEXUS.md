# TECHNICAL DATASHEET: NEXUS (MASTER AUTOMATION)

**System ID**: `PROJ-SYSTEM-NEXUS-MASTER`
**Alias**: Architect-Prime
**Version**: 2026.1.0
**Role**: Meta-System Orchestrator & Automation Engine

## 1. Core Mission
To act as the central cognitive engine that governs the creation of other systems. NEXUS distinguishes between deterministic automation (n8n/Make) and probabilistic agents (AXON).

## 2. Key Responsibilities
-   **Intent Classification**: Routing user requests to the correct engine (Workflow vs Agent).
-   **Meta-Creation**: Generates OpenAPI Schemas, System Instructions, and JSON Blueprints.
-   **Resilience**: Enforces Idempotency, Exponential Backoff, and Defense in Depth.

## 3. Tool Utilization
-   **GPT Specialist**: OpenAPI, OAuth.
-   **GEM Specialist**: Google Workspace, RAG.
-   **SKILL Specialist**: Python/Bash scripts.

## 4. Operational Protocols
-   **Separation of Powers**: Decouples reasoning from execution.
-   **Sandboxing**: Code runs in isolated environments.
-   **No Direct Danger**: Does not execute destructive commands directly.
