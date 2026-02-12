# 🧠 SYSTEM CONTEXT vs DB REGISTRY (V3.4 AUDIT)
**Session ID**: session_delta_99
**Objective**: Clarify "Where is data stored?" (RAM vs Disk)

---

## 1. THE SPLIT STRATEGY
We separate **Operational Data (Context)** from **Analytical Data (DB)**.

| Feature | **Database (Persistent)** | **System Context (Ephemeral)** |
| :--- | :--- | :--- |
| **Purpose** | ROI Metrics, Dashboard, History | Agent Instructions (Prompting) |
| **Storage** | Supabase (Postgres) / S3 | RAM / Active Session JSON |
| **Content** | Flattened Stats (Cost, URLs, Dates) | **Full Nested Manifests** (Hooks, Scripts) |
| **Consumer** | Dashboard User (Darias) | Calliope (Writer Agent) |

---

## 2. AUDIT: WHAT IS STORED WHERE?

### A. MASTER DB RECORD (The "Dashboard" Data)
*Stored in Database. Used for calculating ROI and tracking status.*

```json
{
  "id": "rec_1738439400",
  "session_id": "session_delta_99",
  "business_owner": "AXON Inc.",
  "title": "How to Master SaaS Micro-Tools with AI (Step-by-Step)",
  "social_platform": "YouTube",
  "status": "PLANNED",
  "aspect_ratio": "16:9",
  "financials": {
      "production_cost": 0,
      "projected_revenue": 12000
  },
  "urls": {
      "resource": "https://youtube.com/watch?v=PENDING",
      "stats": "https://studio.youtube.com/..."
  }
}
```

### B. SYSTEM CONTEXT (The "Brain" Data)
*Passed to the next agent (Calliope). Contains the deep creative instructions.*

```json
{
  "session_id": "session_delta_99",
  "active_agent": "ORION",
  "workflow_input": { ... }, // Full original input preserved
  "orion_analysis": {
    "selected_candidates": [
        // FULL MANIFEST JSONS ARE HERE
        {
            "meta": { "id": "man_101", "validation_score": 1.0 },
            "content_architecture": {
                "core_concept": {
                    "hooks": { 
                        "primary": { "script_variants": ["..."] } 
                    }
                },
                "structure_timeline": [
                    { "start": "00:00", "visual_cue": "Montage..." }
                ]
            }
        }
    ],
    "rejected_concepts": [
        { "term": "Bad Idea 1", "score": 3.5, "reason": "Low Virality" }
    ]
  },
  "next_step": {
    "target_agent": "CALLIOPE",
    "action": "GENERATE_SCRIPT",
    "priority_manifest_id": "man_101"
  }
}
```

---
**Verdict**:
1. **Contexto**: Almacena los "Blueprints" completos (Top 3 Manifests) para que el Escritor tenga los Hooks y Estructuras.
2. **Base de Datos**: Almacena los "Records" financieros y de estado para el Dashboard.
