/**
 * AGENT OPERATIONAL TYPES (V7.2 - ORION V3.4 "SYSTEM CONTEXT")
 * Updates: Added `SystemContext` for Inter-Agent State
 */

// ==========================================
// 1. UNIVERSAL AGENT INTERFACE
// ==========================================

// ==========================================
// 1. UNIVERSAL AGENT INTERFACE
// ==========================================

export interface TrendObject {
    id: string;
    platform: string;
    signal: string; // "Rising", "Exploding", "Stable"
    source_url: string;
    detected_at: string;
    audience_segment: string;
    fatig_score: number; // 0-1
    opportunity_angle: string;
}

export interface IdeaObject {
    id: string; // UUID
    platform: string; // ag_platform_type string ref
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

export interface ScoreObject {
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

export type AgentStatus = 'idle' | 'processing' | 'paused_for_input' | 'paused_for_approval' | 'completed' | 'failed' | 'evaluating' | 'active' | 'paused' | 'error';

// ==========================================
// 2. ORION: INTELLIGENCE LAYER (V3.3)
// ==========================================

export interface OrionIngest {
    id: string;
    timestamp: string;
    source_trigger: 'User_Prompt' | 'Trend_Alert' | 'System_Rotation';

    raw_input: {
        topic_keywords: string[];
        analysis_mode: 'Specific_Target' | 'General_Exploration';
        content_spec: {
            target_platform: string;
            content_format: string;
            duration_category: string;
            exact_duration_seconds?: number;
        };
        brand_profile: {
            archetype: string;
            tone: string;
            niche_vertical: string;
            objective_kpi: string;
        };
        production_constraints: {
            budget_tier: string;
            has_human_talent: boolean;
        };
    };
}

export interface ManifestHook {
    type: 'Primary' | 'Secondary' | 'Final_CTA';
    strategy: string;
    script_variants: [string, string];
}

export interface DetailedSegment {
    timestamp_start: string;
    timestamp_end: string;
    label: string;
    description: string;
    visual_cue: string;
}

export interface OrionManifest {
    meta: {
        id: string;
        validation_score: number;
        predicted_virality: number;
        trend_direction: 'RISING 📈' | 'FLAT ➡️' | 'DECLINING 📉';
        status: 'APPROVED' | 'REJECTED_AUTO';
    };

    content_architecture: {
        core_concept: {
            title_variations: string[];
            hooks: {
                primary: ManifestHook;
                secondary: ManifestHook;
                final: ManifestHook;
            };
            emotional_target: string;
            format_archetype: string;
        };

        technical_constraints: {
            pacing: string;
            audio_landscape: string;
            visual_style: string;
            aspect_ratio: string;
            silent_optimization: boolean;
        };

        seo_pack: {
            primary_keywords: string[];
            vertical_search_intent: string;
        };

        structure_timeline: DetailedSegment[];
    };

    financial_projection: {
        estimated_rpm: number;
        monetization_focus: string;
        funnel_stage: string;
    };

    production_audit: {
        budget_compliant: boolean;
        brand_safe: boolean;
        trend_vertigo_check: 'PASS' | 'FAIL';
    };
}

export type AgentAssetType = 'SCRIPT_MD' | 'VIDEO_MP4' | 'AUDIO_WAV' | 'IMAGE_PNG' | 'THUMBNAIL_JPG' | 'METADATA_JSON' | 'IDEA_JSON' | 'TREND_REPORT' | 'AUDIT_REPORT';

export type ag_session_phase = 'PLANNING' | 'RESEARCH' | 'SCRIPTING' | 'PRODUCTION' | 'AUDIT' | 'PUBLISHING';

export interface MasterContentRecord {
    id: string;
    session_id: string;
    business_owner: string;
    channel_name: string;
    title: string;
    social_platform: string;
    content_type: string;
    objective_kpi: string;
    duration_seconds: number;
    file_size_estimates_mb: number;
    aspect_ratio: string;
    status: 'PLANNED' | 'SCRIPTING' | 'PRODUCING' | 'PUBLISHED';
    storage_location: string;
    created_at: string;
    published_at?: string;
    production_cost: number;
    projected_revenue: number;
    resource_url?: string;
    stats_url?: string;
}

// ==========================================
// 4. SYSTEM CONTEXT (RAM/SESSION STATE)
// ==========================================

export interface SystemContext {
    // 1. Session Identity
    session_id: string;
    active_agent: 'ORION' | 'CALLIOPE' | 'EGERIA' | 'PULSAR' | 'ARGUS' | 'PLANNER' | 'NEXUS' | 'APOLLO' | 'THALIA' | 'LYRA';

    // 2. The Full Input (Persisted for reference)
    workflow_input: OrionIngest;

    // 3. The "Brain" Output (Passed to Writer)
    orion_analysis: {
        // The Winners: Start scripting these immediately
        selected_candidates: OrionManifest[]; // FULL OBJECTS (Hooks, Timestamps needed for scripting)

        // The Losers: Keep for "Wait, what about..." queries
        rejected_concepts: Array<{
            term: string;
            score: number;
            reason: string;
        }>;
    };

    // 4. Handoff Instruction
    next_step: {
        target_agent: 'CALLIOPE';
        action: 'GENERATE_SCRIPT';
        priority_manifest_id: string; // The specific video we are focusing on NOW
    };

    // 5. Agent Registry (The "Hardware" State)
    agents: {
        [key: string]: UniversalAgentState<any, any>;
    };

    // 6. Global Memory (Variables shared across agents)
    global_variables: Record<string, any>;

    // 7. Activity Audit (Short-term log)
    activity_log: AgentActivityRecord[];

    // 8. Artifact Registry (Generated Outputs)
    artifact_registry: any[];
}

// ==========================================
// 5. CALLIOPE: CREATIVE LAYER (V1.0)
// ==========================================

export interface CalliopeIngest {
    manifest: OrionManifest;
    global_style_guide?: string;
}

export interface CalliopeOutput {
    script_id: string;
    final_script: string; // Markdown text
    scenes: Array<{
        segment_id: string;
        visual_prompt: string;
        audio_prompt: string;
        narration_text: string;
    }>;
    estimated_duration: number;
}

// ==========================================
// 6. SYSTEM STATE & LOGGING
// ==========================================

export interface SystemLog {
    id: string;
    timestamp: string;
    agent: string;
    action: string;
    status: 'SUCCESS' | 'FAILURE' | 'WARNING';
    details: string;
}

export interface AgentActivityRecord {
    id: string;
    timestamp: string;
    agent_id: string;
    action_type: string;
    target_id?: string;
    level: 'INFO' | 'WARNING' | 'SUCCESS' | 'FAILURE' | 'CRITICAL';
    message: string;
    data?: any; // For high-fidelity trace data (confidence, justification)
    metadata?: any;
}

export interface UniversalAgentState<TConfig, TData> {
    agent_id: string;
    status: AgentStatus;
    data: TData | null;
    config: TConfig;
    logs: string[];
}

