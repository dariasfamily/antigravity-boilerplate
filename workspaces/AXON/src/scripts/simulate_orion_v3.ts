/**
 * SIMULATE ORION V3.4 - SYSTEM CONTEXT & DB SPLIT
 * Generates: ORION_CONTEXT_AUDIT_V3_4.md
 */

import { generateManifest } from '../utils/orion_logic';
import { OrionIngest, MasterContentRecord, SystemContext, OrionManifest } from '../types/agent_types';

// ==========================================
// 1. INPUT
// ==========================================
const INPUT: OrionIngest = {
    id: "session_delta_99",
    timestamp: new Date().toISOString(),
    source_trigger: 'User_Prompt',
    raw_input: {
        topic_keywords: ["Make Money", "AI", "Online"],
        analysis_mode: 'Specific_Target',
        content_spec: {
            target_platform: 'YouTube',
            content_format: 'Long_Form',
            duration_category: 'Deep_Dive (>15m)',
            exact_duration_seconds: 1800
        },
        brand_profile: {
            archetype: "The Practical Guide",
            tone: "Direct",
            niche_vertical: "Finance",
            objective_kpi: 'Conversion'
        },
        production_constraints: {
            budget_tier: 'Low',
            has_human_talent: false
        }
    }
};

// ==========================================
// 2. MOCK PROMPT AGENT
// ==========================================
const callPromptAgent = () => [
    "SaaS Micro-Tools with AI",
    "AI Art Etsy Stores",
    "Coding with Cursor",
    "Bad Idea 1",
    "Bad Idea 2"
];

// ==========================================
// 3. EXECUTION
// ==========================================
const performWorkflowAudit = () => {
    const logBuffer: string[] = [];
    const log = (m: string) => logBuffer.push(m);

    log("# ðŸ§  SYSTEM CONTEXT vs DB REGISTRY AUDIT (V3.4)");
    log(`**Session ID**: ${INPUT.id}`);

    // ... (Skipping standard flow steps for brevity in this specific audit focus) ...
    const rawTerms = callPromptAgent();
    const evaluated = rawTerms.map((t, i) => {
        const m = generateManifest(INPUT, t, true);
        const score = 9.5 - (i * 1.5); // 9.5, 8.0, 6.5, 5.0, 3.5
        m.meta.predicted_virality = score;
        m.meta.status = score > 7.0 ? 'APPROVED' : 'REJECTED_AUTO';
        return { term: t, manifest: m, score };
    });

    const winners = evaluated.filter(e => e.manifest.meta.status === 'APPROVED');
    const losers = evaluated.filter(e => e.manifest.meta.status === 'REJECTED_AUTO');

    // ==========================================
    // A. MASTER DB RECORD (PERSISTENCE)
    // ==========================================
    log("\n## A. MASTER DB RECORD (Stored in Supabase/Postgres)");
    log("Purpose: Long-term Metrics, ROI Calculation, Dashboard History.");

    // We create a record for the PRIMARY winner
    const primaryWinner = winners[0];
    const dbRecord: MasterContentRecord = {
        id: `rec_${Date.now()}`,
        session_id: INPUT.id,
        business_owner: "AXON Inc.",
        channel_name: "AXON Tech",
        title: primaryWinner.manifest.content_architecture.core_concept.title_variations[0],
        social_platform: "YouTube",
        content_type: "Video",
        objective_kpi: "Conversion",
        duration_seconds: 1800,
        file_size_estimates_mb: 4500,
        aspect_ratio: "16:9",
        status: 'PLANNED',
        storage_location: "s3://...",
        created_at: new Date().toISOString(),
        production_cost: 0,
        projected_revenue: 12000
    };
    log("```json");
    log(JSON.stringify(dbRecord, null, 2));
    log("```");

    // ==========================================
    // B. SYSTEM CONTEXT (SESSION MEMORY)
    // ==========================================
    log("\n## B. SYSTEM CONTEXT OBJECT (Passed to Agent: CALLIOPE)");
    log("Purpose: Immediate Instructions for Script Generation. Contains FULL Manifests.");

    const contextObject: SystemContext = {
        session_id: INPUT.id,
        active_agent: 'ORION', // Handoff pending
        workflow_input: INPUT, // Keep original input
        orion_analysis: {
            selected_candidates: winners.map(w => w.manifest), // FULL OBJECTS needed for hooks/timestamps
            rejected_concepts: losers.map(l => ({
                term: l.term,
                score: l.score,
                reason: "Low Virality Prediction"
            }))
        },
        next_step: {
            target_agent: 'CALLIOPE',
            action: 'GENERATE_SCRIPT',
            priority_manifest_id: winners[0].manifest.meta.id
        }
    };

    log("```json");
    log(JSON.stringify(contextObject, null, 2));
    log("```");

    log("\n**AUDIT CONCLUSIVO**:");
    log("1. **DB Record**: Flattened, Metric-Focused. (Ideal for Dashboard Tables)");
    log("2. **System Context**: Deep, Structured. (Ideal for Agent prompts: 'Use Hook Variant A from Manifest #1')");

    return logBuffer.join('\n');
};

const report = performWorkflowAudit();
console.log(report);
