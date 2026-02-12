
import { SupabaseClient } from '@supabase/supabase-js';
import { SystemContext } from '../types/agent_types';

export { SystemContext };

/**
 * 🛡️ AGENT CHASSIS CORE TYPES
 * The non-negotiable contracts for the Sealed Runner.
 */

export interface SessionContext<TInput = any> {
    session_id: string;
    agent_id: string;
    user_id: string;
    input: TInput;
    context: SystemContext; // The shared 'RAM' state
    db: SupabaseClient; // Database connection for persistence
}

export interface StandardEnvelope<T> {
    success: boolean;
    data: T;
    meta: {
        session_id: string;
        trace_id: string;
        timestamp: string;
        agent_id: string;
        agent_version: string;
    };
    audit: {
        evaluation_passed: boolean;
        auto_corrected: boolean;
        confidence_score: number;
    };
}

export interface EvaluationResult {
    passed: boolean;
    reason?: string;
    corrections?: any; // If auto-correction is implemented
    confidence_score: number; // 0.00 to 1.00
}

export interface TripleJustification {
    identity: string;   // "Who am I? (Role)"
    knowledge: string;  // "What do I know? (Context)"
    math: string;       // "Why this result? (Logic/Data)"
}

export interface AgentLogic<TInput, TOutput> {
    manifest: {
        id: string;
        version: string;
    };

    /**
     * Pure Business Logic.
     * MUST NOT side-effect to DB directly.
     */
    process(input: TInput, context: SystemContext): Promise<TOutput>;

    /**
     * The Mirror.
     * Agent checks its own work against constraints.
     */
    evaluate(output: TOutput): Promise<EvaluationResult>;

    /**
     * The Triple Gate.
     * Agent explains its reasoning for the Audit Log.
     */
    justify(output: TOutput): Promise<TripleJustification>;
}
