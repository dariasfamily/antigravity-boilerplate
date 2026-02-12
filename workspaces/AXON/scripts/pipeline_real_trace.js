"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agent_registry_1 = require("../src/config/agent_registry");
const AgentFactory_1 = require("../src/core/AgentFactory");
const supabase_js_1 = require("@supabase/supabase-js");
// MOCK DB for Simulation
const mockDb = (0, supabase_js_1.createClient)('https://xyz.supabase.co', 'public-anon-key');
const mockContext = {
    session_id: 'sim-session-v2',
    active_agent: 'EGERIA',
    workflow_input: {
        id: 'ingest-001',
        timestamp: new Date().toISOString(),
        source_trigger: 'User_Prompt',
        raw_input: {
            topic_keywords: ['AI', 'Viral'],
            analysis_mode: 'General_Exploration',
            content_spec: { target_platform: 'YouTube', content_format: 'Shorts', duration_category: 'Short' },
            brand_profile: { archetype: 'Innovator', tone: 'Exciting', niche_vertical: 'Tech', objective_kpi: 'Views' },
            production_constraints: { budget_tier: 'Low', has_human_talent: false }
        }
    },
    orion_analysis: {
        selected_candidates: [],
        rejected_concepts: []
    },
    next_step: {
        target_agent: 'CALLIOPE',
        action: 'GENERATE_SCRIPT',
        priority_manifest_id: 'man-001'
    },
    agents: {},
    global_variables: {},
    activity_log: [],
    artifact_registry: []
};
async function run_real_logic_trace() {
    console.log("🧬 STARTING 'MASTER ALGORITHM' TRACE (Real Logic Kernels)...\n");
    // 1. EGERIA
    console.log(`--- [STEP 1] EGERIA (The Orchestrator) ---`);
    const egeria = AgentFactory_1.AgentFactory.createLogic(agent_registry_1.AGENTS.EGERIA.id);
    const egeriaOut = await egeria.process({ goal: "Create Viral AI News Video" }, mockContext);
    const egeriaJust = await egeria.justify(egeriaOut);
    console.log(`OUTPUT:`, JSON.stringify(egeriaOut, null, 2));
    console.log(`JUSTIFICATION: [${egeriaJust.math}] ${egeriaJust.knowledge}`);
    console.log(`------------------------------------------\n`);
    // 2. PLANNER
    console.log(`--- [STEP 2] PLANNER (The Architect) ---`);
    const planner = AgentFactory_1.AgentFactory.createLogic(agent_registry_1.AGENTS.PLANNER.id);
    const plannerOut = await planner.process({ task_description: "Design Pipeline for Viral News" }, mockContext);
    console.log(`OUTPUT:`, JSON.stringify(plannerOut, null, 2));
    console.log(`------------------------------------------\n`);
    // 3. PULSAR
    console.log(`--- [STEP 3] PULSAR (The Gateway) ---`);
    const pulsar = AgentFactory_1.AgentFactory.createLogic(agent_registry_1.AGENTS.PULSAR.id);
    const pulsarOut = await pulsar.process({ raw_prompt: "Write a script about deepseek v3" }, mockContext);
    console.log(`OUTPUT:`, JSON.stringify(pulsarOut, null, 2));
    console.log(`------------------------------------------\n`);
    // 4. THALIA
    console.log(`--- [STEP 4] THALIA (The Artist) ---`);
    const thalia = AgentFactory_1.AgentFactory.createLogic(agent_registry_1.AGENTS.THALIA.id);
    const thaliaOut = await thalia.process({ title_text: "DeepSeek vs ChatGPT", visual_concept: "Boxing ring code", platform: "YouTube" }, mockContext);
    console.log(`OUTPUT:`, JSON.stringify(thaliaOut, null, 2));
    console.log(`------------------------------------------\n`);
    // 5. ARGUS
    console.log(`--- [STEP 5] ARGUS (The Guardian) ---`);
    const argus = AgentFactory_1.AgentFactory.createLogic(agent_registry_1.AGENTS.ARGUS.id);
    const argusOut = await argus.process({ content_to_audit: thaliaOut.prompt, strictness: "High (Brand Safe)" }, mockContext);
    const argusJust = await argus.justify(argusOut);
    console.log(`OUTPUT:`, JSON.stringify(argusOut, null, 2));
    console.log(`VERDICT: ${argusJust.identity} says: ${argusJust.math}`);
    console.log(`------------------------------------------\n`);
    console.log("✅ MASTER ALGORITHM TRACE COMPLETE.");
}
run_real_logic_trace().catch(console.error);
