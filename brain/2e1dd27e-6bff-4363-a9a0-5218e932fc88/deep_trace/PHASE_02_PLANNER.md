# 🕵️ ELITE DEEP TRACE: PHASE 2 - PLANNER ("The Architect")
**Role**: Systems Architect & Strategy Designer.
**Protocol**: Level 5 (Maximum Oversight)
**Dashboard State**: 🔵 `PLANNER_ARCHITECTING` (Pulse)

## 1. THE INPUT ARTIFACT (From Phase 1)
**Interface: Egeria -> Planner**
Planner receives the **Session Manifest V2**. He does *not* accept raw text. He demands a structured `downstream_payload`.

### 1.1 Structural Input Object
```json
{
  "session_uuid": "SESS-2026-02-08-001",
  "sender": "EGERIA",
  "context_snapshot": "CTX-998877",
  "instructions": {
    "task_type": "STRATEGIC_FORESIGHT", // Defined by Egeria
    "output_format": "BLUEPRINT_JSON",
    "constraints": ["VISUALS_REQUIRED", "AUDIO_REQUIRED"],
    "depth": "L3_DETAILED"
  }
}
```

## 2. THE PROCESS (Logic Kernel)

### 2.1 Micro-Step: Deconstruction ( The Blueprinting)
*   **Action**: Break down "Strategic Foresight" into executeable components for the Hive.
*   **Logic Tree**:
    *   *Need Data?* -> Schedule **ORION** (Research).
    *   *Need Prompts?* -> Schedule **PULSAR** (Translation).
    *   *Need Brand Check?* -> Schedule **LYRA** (Filter).
    *   *Need Content?* -> Schedule **CALLIOPE** (Writer).
    *   *Need Assets?* -> Schedule **THALIA** (Visuals), **APOLLO** (Audio).
    *   *Need Assembly?* -> **USER (Manual)** or **AUTO_EDITOR (Future Agent)**.
    *   *Need Release?* -> Schedule **ARGUS** (Audit) -> **NEXUS** (Deploy).

### 2.2 Micro-Step: Dependency Mapping
*   **Action**: Calculate Critical Path.
*   **Rule**: `Orion` output is required for `Lyra`. `Lyra` output is required for `Calliope`.
*   **Optimization**: Check if `Thalia` and `Apollo` can run in parallel (Yes).

### 2.3 Micro-Step: Resource Estimation (Refined)
*   **Action**: Update Egeria's rough estimate with specific agent costs.
*   **Result**: "Orion Deep Research is expensive. Updating budget allocation."
*   **Audit L2**: "Budget Adjustment: +$0.05 for Deep Research."

## 3. THE OUTPUT INTERFACE (Planner -> Pulsar/Orion)

### 3.1 Execution Blueprint V1
```json
{
  "blueprint_id": "BP-2026-02-08-001",
  "strategy": "DEEP_DIVE_SEQUENTIAL",
  "dag_structure": [
    { "step": 1, "agent": "PULSAR", "action": "PROMPT_OPTIMIZE", "input_ref": "MANIFEST.raw_intent" },
    { "step": 2, "agent": "ORION", "action": "RESEARCH_EXECUTE", "depends_on": "step_1" },
    { "step": 3, "agent": "LYRA", "action": "BRAND_FILTER", "depends_on": "step_2" },
    { "step": 4, "agent": "CALLIOPE", "action": "SCRIPT_GEN", "depends_on": "step_3" },
    { "step": 5, "agent": ["THALIA", "APOLLO"], "action": "PARALLEL_PRODUCTION", "depends_on": "step_4" },
    { "step": 6, "agent": "ARGUS", "action": "FINAL_AUDIT", "depends_on": "step_5" },
    { "step": 7, "agent": "NEXUS", "action": "TRANSMIT", "depends_on": "step_6" }
  ]
}
```

## 4. DASHBOARD SIGNALS & CONTROL

### 4.1 Status Indicators
*   **Led Color**: 🔵 **BLUE (Pulse)** = `ARCHITECTING`.
*   **Message**: "Constructing Execution Graph... 7 Steps Identified."
*   **Timer**: `15s` Count Down (Auto-Proceed to Phase 3).
*   **Visual Panels**:
    1.  **General**: Overall Progress (Gantt).
    2.  **Flow**: Node Graph (DAG) with Live Status.
    3.  **Agent-Specific**: "Planner Logic" (Console Log).

### 4.2 User Intervention Controls ("The Blueprint Review")
*   **Trigger**: Planner finishes Blueprint. State -> 🟠 `WAITING_APPROVAL`.
*   **Checkpoint Rule**: System *must* notify User (Dash) after this step.
1.  **[APPROVE]** (Green): Lock Blueprint. Send to Phase 3.
2.  **[MODIFY]** (Yellow): Open Graph Editor (Drag & Drop Nodes).
    *   *Extensibility*: Add "Ghost Nodes" or "Extra Context" variables here.
3.  **[REJECT]** (Red): "Bad Plan. Retry."
4.  **[PAUSE]** (White): Freeze.

## 5. AUDIT LOG (The "Black Box" - 5 Levels)

| Level | Type | Message | Hash |
| :--- | :--- | :--- | :--- |
| **L1** | **IDENTITY** | `Planner Agent Authorized by Egeria Manifest.` | `b2c3...` |
| **L2** | **RESOURCE** | `Blueprint Cost Est: $0.20. Parallel Tracks: 1.` | `d4e5...` |
| **L3** | **DECISION** | `Strategy Selected: DEEP_DIVE_SEQUENTIAL.` | `f6g7...` |
| **L4** | **DATA** | `nodes: 7 edges: 6 complexity: MEDIUM.` | `h8i9...` |
| **L5** | **STATE** | `Transition: ARCHITECTING -> BLUEPRINT_READY.` | `j0k1...` |

---
**NEXT**: **PHASE 3: PULSAR (The Translator)**
*Dependency*: User Approval of Blueprint.
