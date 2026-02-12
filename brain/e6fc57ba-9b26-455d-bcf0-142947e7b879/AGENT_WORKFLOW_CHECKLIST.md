# AGENT WORKFLOW CHECKLIST & VISUALIZATION GUIDE
**"The Blueprint for System Visibility"**

This document defines the exact operational checklist for ORION, CALLIOPE, and ARGUS, mapping their execution flow to System Context updates and defining the visual representation requirements for the Dashboard (Admin vs. Public).

## 1. COMPARATIVE AGENT WORKFLOW TABLE

| Agent | Execution Order | Core Output | Input Source | Primary Dependencies | Context Target (`agents.[ID].data`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ORION** | **1** (Initiator) | `StrategicBrief` | User Topic / Trend Data | Perplexity, Google Trends, Brand DNA | `strategic_brief`, `confidence_score` |
| **CALLIOPE** | **2** (Processor) | `ScriptContent` | `StrategicBrief` | Hook_Lab, Tone_Modulator, V.E.R.A. | `script_content`, `metadata` |
| **ARGUS** | **3** (Validator) | `ArgusOutput` | `ScriptContent` | Safety Rules, SEO Tools, Fact Checker | `verdict`, `scores`, `edits` |

---

## 2. DETAILED AGENT CHECKLISTS

### 🟢 ORION (The Investigator)
**Trigger**: User clicks "RUN SYNTHESIS" or Auto-Schedule.
**Public Logic**: "ANALYZING TRENDS..."

#### Execution Checklist:
1.  [ ] **Ingest Phase**: Query input Topic.
    *   *Check*: Is volume > Threshold? (Google Trends)
    *   *Check*: Is "Pain Point" valid? (X/Reddit)
2.  [ ] **Filter Phase**: Apply Brand DNA.
    *   *Check*: Does it violate "Generic" filters?
    *   *Check*: Does it fit `P.O.S.E.` framework?
3.  [ ] **Synthesis Phase**: Generate Assets.
    *   *Generates*: Viral Hook (`hook_proposal`)
    *   *Generates*: SEO Keywords (`seo_vertical`)
    *   *Generates*: Calliope Instructions (`tone`, `pacing`)

#### Context Population:
*   `strategic_brief.topic` <- Input Topic
*   `strategic_brief.validation_pose` <- derived from P.O.S.E
*   `confidence_score` <- (0-1 calculated score)

#### Dashboard Visualization:
*   **Public View**: "Status: OPTIMIZING STRATEGY", "Topic: [Input]"
*   **Admin View**: Real-time log of API calls ("Querying Perplexity...", "Filtering 'Cringe' patterns..."), Raw JSON of `calliope_instructions`.

---

### 🟣 CALLIOPE (The Writer)
**Trigger**: Orion Status = `DONE` or Manual "GENERATE SCRIPT".
**Public Logic**: "WRITING SCRIPT..."

#### Execution Checklist:
1.  [ ] **Parsing Phase**: Read `OrionOutput`.
    *   *Check*: Format (Reel vs Short).
    *   *Action*: Select Template (e.g., `Template_60s_DeepDive`).
2.  [ ] **Drafting Phase**: Generate Skeleton.
    *   *Action*: Write Hook (0-3s).
    *   *Action*: Write Payoff.
3.  [ ] **Optimization Phase**: Apply V.E.R.A.
    *   *Check*: Is text "Sensory"? (Adjective swap).
    *   *Check*: Are loops "Open"?

#### Context Population:
*   `script_content.full_markdown` <- The Script
*   `metadata.vera_score` <- Quality Score
*   `feedback_loop.iteration` <- Counter

#### Dashboard Visualization:
*   **Public View**: "Status: DRAFTING", Progress Bar (Parsing -> Drafting -> Polishing).
*   **Admin View**: Live preview of the Markdown being generated token-by-token (Matrix style), V.E.R.A score heatmap.

---

### 🛡️ ARGUS (The Gatekeeper)
**Trigger**: Calliope Status = `DONE` or Manual "RUN AUDIT".
**Public Logic**: "AUDITING VISUALS..."

#### Execution Checklist:
1.  [ ] **Safety Phase**: Pre-flight Check.
    *   *Check*: Profanity (Start).
    *   *Check*: Hate Speech (Global).
2.  [ ] **Fact Phase**: Truth Grounding.
    *   *Check*: Compare claims vs RAG/Knowledge.
    *   *Verdict*: Label 0 (Pass) vs Label 1 (Fail).
3.  [ ] **SEO Phase**: Discovery Opt.
    *   *Check*: Title Length (< 70 chars).
    *   *Check*: Keyword Density.
4.  [ ] **Verdict Phase**: Final Stamp.
    *   *Decision*: PASS / WARN / REJECT.

#### Context Population:
*   `verdict` <- "PASS"/"REJECT"
*   `scores` <- `{ brand_safety: 100, seo: 95 }`
*   `edits` <- Auto-corrected Title/Tags.

#### Dashboard Visualization:
*   **Public View**: "Status: VERIFYING", Final Badge (✅ PASS / ❌ REJECT).
*   **Admin View**: Detailed Scorecard (Brand Safety %, SEO %, Readability Score), List of specific "Red Flags" detected and "Auto-Fixes" applied.

---

## 3. DASHBOARD IMPLEMENTATION SPEC (UI)

### Visual Hierarchy
The Dashboard must implement a **"Depth-Layered" UI**.

#### Layer 1: The Surface (Public/Team View)
*   **Goal**: At-a-glance status.
*   **Components**:
    *   **Traffic Light Status**: Green (Active), Amber (Processing), Red (Error).
    *   **High-Level KPI**: "Confidence: 95%", "Words: 145", "Verdict: PASS".
    *   **Action Buttons**: "RUN", "STOP".

#### Layer 2: The Underworld (Admin View - Logic & Logs)
*   **Requirement**: Visible ONLY if `isAdmin === true`.
*   **Components**:
    *   **Live Neurons**: Real-time streaming logs of *decisions* (not just errors).
        *   *Ex*: "Orion: Discarding topic 'X' due to low volume."
    *   **Data Insect**: Clickable JSON inspector for `Input` -> `Output` blocks.
    *   **The "Why"**: A tooltip or panel explaining *why* Argus rejected a script (showing the specific failed rule).

### Interaction Flow (The "Relay")
1.  **Orion Card**:
    *   User inputs Topic -> Clicks Run.
    *   *Animation*: Radar Pulse.
2.  **Connector**:
    *   A visual "Pipe" or "Synapse" lights up connecting Orion -> Calliope when data flows.
3.  **Calliope Card**:
    *   Auto-unlocks when Synapse is active.
    *   *Animation*: Typing effect.
4.  **Argus Card**:
    *   Displays "Scanning..." overlay.
    *   *Result*: Stamps the Calliope card with a seal of approval.
