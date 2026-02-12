# 🚀 SYSTEM UPGRADE ROADMAP: V2 (TITAN EDITION)
**Objective**: Elevate from "Experimental AI" to "Forensic-Grade Intelligence Platform".
**Core Architecture**: "The Nucleus" V5.0 (Database) + "Agent Chassis" V4.0 (Code).
**Guiding Principle**: "Glass Box" Transparency & Non-Negotiable Standardization.

---

## 🏛️ PHASE 1: THE FOUNDATION ("THE NUCLEUS V5.0")
*Status: READY FOR DEPLOYMENT (Schema Defined)*

**Goal**: Establish the "Titanium" Database Layer that enforces truth before code runs.

*   [ ] **1.1. Deploy "The Nucleus" V5.0 Schema**
    *   Target: Supabase (PostgreSQL).
    *   Action: Execute `THE_NUCLEUS_SCHEMA.md` SQL.
    *   CRITICAL CHECKS:
        *   Verified Composite Primary Keys for Partitioning `(captured_at, id)`.
        *   Verified W3C Trace IDs (`char(32)`).
        *   Verified strict `NUMERIC(10,4)` for money.
        *   Verified RLS enabled on ALL tables.

*   [ ] **1.2. Implement "Events Backbone"**
    *   Create `ag_control_events` and `ag_agent_registry`.
    *   Seed the Registry with `ORION_V3_4` definition.

---

## 🛡️ PHASE 2: THE ENFORCER ("AGENT CHASSIS V4")
*Status: DESIGNED (Spec V4.0)*

**Goal**: Create the "Golden Template" code that forces all agents to comply with the Nucleus.

*   [ ] **2.1. Create `AgentChassis.ts` (Abstract Base Class)**
    *   Implements `execute()` Core Loop (Final/Enforced).
    *   Implements `StandardEnvelope` (Audit, Financials, TraceID).
    *   Enforces `justifyDecision()` (Triple Justification Protocol).

*   [ ] **2.2. Implement "Internal Affairs" Auditors**
    *   `validateMoney()`: Anti-float logic.
    *   `validateJSONPatch()`: RFC 6902 Compliance Check.
    *   `validateW3CTrace()`: Trace ID Format Check.

---

## 🧪 PHASE 3: THE PILOT ("ORION V4 REFACTOR")
*Status: PENDING CHASSIS*

**Goal**: Prove the architecture by upgrading Orion to the Titan Standard.

*   [ ] **3.1. Migrate Orion Logic to V4 Chassis**
    *   Wrap existing `orion_logic.ts` functions into `OrionV4` class methods.
    *   Map Inputs/Outputs to strict Enums (`AgentPhase`, `Platform`).

*   [ ] **3.2. Activate "Triple Justification"**
    *   Connect `justifyDecision()` to NotebookLM (Knowledge) and Identity Config.

*   [ ] **3.3. Verify "Time Travel" Capability**
    *   Test `PAUSE`, `EDIT_MEMORY` (via JSON Patch), and `RESUME` workflow.

---

## 👁️ PHASE 4: THE GOD VIEW ("DASHBOARD V4")
*Status: PENDING NUCLEUS*

**Goal**: Visualize the "Glass Box".

*   [ ] **4.1. Connect Dashboard to RLS-Protected Realtime Streams**
    *   Subscribe to `ag_agent_memory` (Partitioned) and `ag_sessions`.

*   [ ] **4.2. Build "The Forensic Timeline"**
    *   UI Component that visualizes `ag_logic_trace` (Decisions) + `ag_control_events` (Commands).

---

## 📋 EXECUTION ORDER
1.  **Execute SQL (Phase 1)**: Create the Tables.
2.  **Write Code (Phase 2)**: Create `AgentChassis.ts`.
3.  **Refactor (Phase 3)**: Upgrade Orion.
4.  **Visualize (Phase 4)**: Build Dashboard.
