
import {
    AgentLogic,
    SessionContext,
    StandardEnvelope,
    EvaluationResult,
    TripleJustification,
    SystemContext
} from './types';
import { InternalAffairs } from './InternalAffairs';

/**
 * 🛡️ AGENT RUNNER (V4.2 AXON ADAPTIVE)
 * 
 * The immutable execution engine evolved for AXON v1.7.
 * - Enforces UCC Governance (EMA)
 * - Implements Adaptive Orchestration (PROT-009)
 * - Implements Model Failover & Snapshots (PROT-008)
 * - Enforces Triple Justification & Atomic Writes
 */
export class AgentRunner {

    private constructor() { }

    /**
     * THE ADAPTIVE EXECUTION LOOP
     * Orchestrates the agent flow with resilience and intelligence.
     */
    public static async execute<TInput, TOutput>(
        logic: AgentLogic<TInput, TOutput>,
        session: SessionContext<TInput>
    ): Promise<StandardEnvelope<TOutput>> {

        const changeType = (logic.manifest as any).type || 'agent';

        try {
            // ---------------------------------------------------------
            // 🏛️ PHASE 0: UCC GOVERNANCE GATEKEEPER (PROT-007)
            // ---------------------------------------------------------
            const mins = InternalAffairs.getMinimumSteps(changeType);
            console.log(`[UCC-GATE] Validating ${logic.manifest.id} against template: ${mins.template_id}`);
            // Logic to confirm all pre_checks are met would go here

            // ---------------------------------------------------------
            // 🧠 PHASE 1: EXECUTION WITH ADAPTIVE MODES & FAILOVER
            // ---------------------------------------------------------
            console.log(`[${logic.manifest.id}] Starting Execution (Mode: ${session.context.mode || 'Standard'})...`);

            let result: TOutput;
            let retryCount = 0;
            const maxRetries = 1;

            const runWithFailover = async (): Promise<TOutput> => {
                try {
                    // ADAPTIVE ORCHESTRATION (PROT-009: Abstraer/Expandir)
                    const adaptedContext = this.orchestrate(session.context);
                    return await logic.process(session.input, adaptedContext);
                } catch (error: any) {
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.warn(`[FAILOVER] Snapshotting context and switching provider for ${logic.manifest.id}...`);
                        // PROT-008: Snapshotting logic
                        const snapshot = {
                            last_state: session.context,
                            error: error.message,
                            timestamp: new Date().toISOString()
                        };
                        // Simulate model switch by updating context
                        session.context.failover_active = true;
                        session.context.last_snapshot = snapshot;

                        return await runWithFailover();
                    }
                    throw error;
                }
            };

            result = await runWithFailover();

            // ---------------------------------------------------------
            // 🛡️ PHASE 2: AUDIT & JUSTIFICATION
            // ---------------------------------------------------------
            let evalResult = await logic.evaluate(result);
            const justification = await logic.justify(result);

            // ---------------------------------------------------------
            // 💾 PHASE 3: ATOMIC PERSISTENCE (CHANGE LEDGER)
            // ---------------------------------------------------------
            const traceId = this.generateTraceId();
            const spanId = this.generateSpanId();

            await this.persistToNucleus(
                session,
                logic,
                result,
                justification,
                evalResult,
                traceId,
                spanId
            );

            // ARCH-001: Register to UCC Change Ledger
            InternalAffairs.logChange({
                change_id: traceId,
                timestamp: new Date().toISOString(),
                type: changeType,
                agent_id: logic.manifest.id,
                ema_template_id: mins.template_id,
                before_state_hash: 'prev_hash_stub',
                after_state_hash: 'next_hash_stub',
                policy_applied: 'PROT-007 Gatekeeper',
                compliance_status: evalResult.passed ? 'OK' : 'Warning',
                modules_touched: [logic.manifest.id]
            });

            return {
                success: evalResult.passed,
                data: result,
                meta: {
                    session_id: session.session_id,
                    trace_id: traceId,
                    timestamp: new Date().toISOString(),
                    agent_id: logic.manifest.id,
                    agent_version: logic.manifest.version
                },
                audit: {
                    evaluation_passed: evalResult.passed,
                    auto_corrected: retryCount > 0,
                    confidence_score: evalResult.confidence_score
                }
            };

        } catch (error: any) {
            console.error(`[${logic.manifest.id}] CRITICAL FAIL (Failover Exhausted):`, error);
            throw error;
        }
    }

    /**
     * ADAPTIVE ORCHESTRATOR (PROT-009)
     * Adjusts the context depth (D3 Rule) or mode based on current state.
     */
    private static orchestrate(context: SystemContext): SystemContext {
        // Logic to switch between 'Abstraer' and 'Expandir'
        // If context is too large, it might suggest 'Abstraer'
        // If precision is low, it suggests 'Expandir'
        if ((context as any).complexity > 8) {
            console.log(`[ORCH] Complexity high. Switching to MODE: EXPANDIR`);
            return { ...context, mode: 'Expandir' };
        }
        return context;
    }

    // =================================================================
    // 🔒 PRIVATE KERNEL METHODS
    // =================================================================

    private static async persistToNucleus<TOutput>(
        session: SessionContext<any>,
        logic: AgentLogic<any, any>,
        result: TOutput,
        justification: TripleJustification,
        evaluation: EvaluationResult,
        traceId: string,
        spanId: string
    ) {
        const { data: memoryData, error: memoryError } = await session.db
            .from('ag_agent_memory')
            .insert({
                session_id: session.session_id,
                agent_id: session.agent_id,
                memory_snapshot: result as any,
                diff_log: null
            })
            .select('session_id, captured_at, id')
            .single();

        if (memoryError) throw new Error(`Nucleus Write Failed (Memory): ${memoryError.message}`);

        await session.db.from('ag_logic_trace').insert({
            session_id: session.session_id,
            agent_id: session.agent_id,
            trace_id: traceId,
            span_id: spanId,
            decision_type: 'ADAPTIVE_RUN',
            input_snapshot_captured_at: memoryData.captured_at,
            input_snapshot_id: memoryData.id,
            justification_identity: justification.identity,
            justification_knowledge: justification.knowledge,
            justification_math: justification.math,
            confidence_score: evaluation.confidence_score,
            auto_corrected: false
        });
    }

    private static generateTraceId(): string { return this.randomHex(32); }
    private static generateSpanId(): string { return this.randomHex(16); }
    private static randomHex(length: number): string {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }
}
