# 🕵️ ELITE DEEP TRACE: PHASE 4 - ORION ("The Analyst")
**Role**: Intelligence Officer & Pattern Recognizer.
**Protocol**: Level 5 (Maximum Oversight)
**Dashboard State**: 🟢 `ORION_SCANNING` (Radar Sweep Animation)

## 1. THE INPUT ARTIFACT (From Phase 3)
**Interface: Pulsar -> Orion**
Orion receives the **Prompt Matrix**. He executes the query.

### 1.1 Structural Input Object
```json
{
  "matrix_ref": "PMX-2026-02-08-001",
  "project_context": {
    "notebook_id": "NB-PROJECT-001", // Created by Egeria for this session
    "drive_folder": "DRIVE-SESSION-001"
  },
  "source_config": {
    "primary": ["NotebookLM:Brand_Bible", "NotebookLM:Agent_Memory"],
    "secondary": ["Google_Search_V2:News", "Google_Scholar:Papers"],
    "depth_level": "DEEP_DIVE" // Mutable Pre-Execution
  },
  "prompts": [...]
}
```

## 2. THE PROCESS (Logic Kernel)

### 2.1 Micro-Step: Multi-Threaded Hunt
*   **Action**: Execute parallel searches to maximize coverage vs specificity.
*   **Strategy**:
    *   *Thread A (Broad)*: "Macro Trends 2026" (Ensures context).
    *   *Thread B (Niche)*: "Specific Agentic Protocols" (Ensures depth).
*   **Advantage**: Cross-references "Hype" (Broad) vs "Reality" (Niche).

### 2.2 Micro-Step: Data Structuring & Archival
*   **Action**: Parse Raw Text -> JSON Entities.
*   **Archival**: **IMMEDIATE WRITE** of raw findings to `NB-PROJECT-001`.
    *   *Goal*: System backup. If Orion crashes, data is saved.
*   **Filtering Logic (L1-L3)**:
    *   *L1*: Date Check (>2025).
    *   *L2*: Credibility Check (Domain Authority > 50).
    *   *L3*: Saturation Check (Is this everywhere? -> Discard).

### 2.3 Micro-Step: Insight Synthesis (Orion's Superpower)
*   **Skill**: "Pattern Recognition".
*   **Action**: Identify the "Gap".
*   **Result**: "Everyone is talking about 'Agents'. No one is talking about 'Agent Rights'. -> **OPPORTUNITY DETECTED**."

## 3. THE OUTPUT INTERFACE (Orion -> Lyra)

### 3.1 Intelligence Report V2
```json
{
  "report_id": "INT-2026-02-08-001",
  "meta": {
    "insight_depth_score": 9.5, // Orion's self-eval
    "sources_verified": 12
  },
  "trends": [
    {
      "id": "tr-01",
      "name": "Agentic Swarms",
      "gap_analysis": "Underserved Niche in 'swarms'",
      "evidence_links": ["https://techcrunch.com/...", "https://arxiv.org/..."]
    }
  ]
}
```

## 4. DASHBOARD SIGNALS & CONTROL

### 4.1 Status Indicators
*   **Led Color**: 🟢 **GREEN (Sweep)** = `SCANNING`.
*   **Message**: "Scanning Sources... Found 12 Verified Links."
*   **Timer**: `15s` Count Down (Auto-Proceed).
*   **Visual Panels**:
    1.  **Source Graph**: Nodes linked to actual URLs (Clickable).
    2.  **Confidence Heatmap**: Visualizing Source Authority.
    3.  **Live Feed**: Real-time log of `NotebookLM` writes.

### 4.2 User Intervention Controls ("The Intel Check")
*   **Trigger**: Orion finishes Report. State -> 🟠 `WAITING_APPROVAL`.
*   **Checkpoint Rule**: Auto-Pause if "Critical Contradiction" or "Zero Results".
1.  **[APPROVE]** (Green): Lock Intelligence. Send to Lyra.
2.  **[MODIFY]** (Yellow):
    *   *Action*: Delete "Saturated" trends.
    *   *Action*: Manually prioritization high-potential gaps.
3.  **[EXPAND]**: "Dig deeper on 'Agentic Swarms'." -> Re-triggers research loop on specific node.
4.  **[PAUSE/STOP]**: Halt research.
5.  **[RESTART]**: Clear cache and retry.

## 5. AUDIT LOG (The "Black Box" - 5 Levels)

| Level | Type | Message | Hash |
| :--- | :--- | :--- | :--- |
| **L1** | **IDENTITY** | `Orion Researching via Gemini Pro.` | `d5e6...` |
| **L2** | **RESOURCE** | `Search Cost: $0.12. Duration: 45s.` | `f7g8...` |
| **L3** | **DECISION** | `Filter Applied: Discarded 15 trends (Confidence < 70%).` | `h9i0...` |
| **L4** | **DATA** | `Extracted 2 Core Trends. 5 Citations.` | `j1k2...` |
| **L5** | **STATE** | `Transition: SCANNING -> REPORT_READY.` | `l3m4...` |

---
**NEXT**: **PHASE 5: LYRA (The Soul)**
*Dependency*: User Approval of Intelligence Report.
