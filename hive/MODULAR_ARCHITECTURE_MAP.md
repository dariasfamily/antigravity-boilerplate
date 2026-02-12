# ðŸ§© MODULAR ARCHITECTURE (Skills Map M0-M9)

This document maps the abstract "Modular Skills" (Google AXON) to the concrete Agents and Resources in NUCLEUS V5.3.

## ðŸ—ºï¸ SKILL-TO-AGENT MAPPING

| Skill | Module Name | Responsible Agent | Integration Method |
| :--- | :--- | :--- | :--- |
| **M0** | **Orchestrator** | **EGERIA** | `system-orchestrator`. **Manager**. Receives goals, checks memory, creates plan. Usage of ReAct for high-level logic. |
| **M1** | **Brand DNA** | **LYRA** (Pending) | **Brand Architect**. *Keeper of the Voice*. Defines style, rules, and "Brand Bible". (Currently WIP). |
| **M2** | **Trend Radar** | **ORION** | `trend-analysis` logic. Uses RAG/Search to feed the Idea Factory. |
| **M3** | **Idea Factory** | **ORION** | Generates candidates. ToT/Few-Shot implemented in `OrionLogic`. |
| **M4** | **Deep Research** | **ORION** | Supported by NotebookLM retrieval (Egeria's `notebooklm_mastery`). |
| **M5** | **Viral Scoring** | **ORION** | `ranking` decision type. `confidence_score` utilizes LLM-as-a-Judge. |
| **M6** | **Content Packaging** | **CALLIOPE** | `script_generation` logic. Produces final artifacts (MD/JSON). |
| **M7** | **Publishing** | **ARGUS** (Prep) | Generates "Checklist" and Assets. (Actual posting via external API/Human). |
| **M8** | **Feedback Loop** | **ORION** | `ROI Analysis`. Feeds back into `ag_agent_memory` for future planning. |
| **M9** | **Risk Guardrails** | **ARGUS** | `compliance-check` skill. Enforces safety and brand/legal limits. |

## ðŸ“ DATA STRUCTURES (Interfaces)

To ensure interoperability, all Agents must respect these data contracts (defined in `src/types/agent_types.ts`).

### 1. The Idea Object (M3 -> M4 -> M5)
```typescript
interface IdeaObject {
    id: string; // UUID
    platform: ag_platform_type;
    format: string; // "Shorts", "Thread", etc.
    core: {
        promise: string;
        hook: string;
        angle: string;
        audience_pain: string;
        why_now: string;
    };
    meta: {
        risks: string[];
        keywords: string[];
        brand_differentiator: string;
    };
}
```

### 2. The Trend Object (M2 -> M3)
```typescript
interface TrendObject {
    id: string;
    platform: string;
    signal: string; // "Rising", "Exploding", "Stable"
    source_url: string;
    detected_at: string;
    audience_segment: string;
    fatiga_score: number; // 0-1
    opportunity_angle: string;
}
```

### 3. The Score Object (M5 -> M6)
```typescript
interface ScoreObject {
    idea_id: string;
    total_score: number; // 0-100
    subscores: {
        novelty: number;
        shareability: number;
        clarity: number;
        brand_fit: number;
        timing: number;
    };
    justification_summary: string;
    recommendation: 'PRODUCE' | 'DISCARD' | 'REVISE';
}
```
