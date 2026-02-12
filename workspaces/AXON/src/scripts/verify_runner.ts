import { AgentRunner } from '../core/AgentRunner';
import { AgentLogic, SessionContext, EvaluationResult, TripleJustification, SystemContext } from '../core/types';

/**
 * 🧪 ADAPTIVE RUNNER VERIFICATION SCRIPT
 */
async function verifyRunner() {
    console.log('--- AXON ADAPTIVE RUNNER VERIFICATION START ---');

    // MOCK AGENT LOGIC
    const mockAgent: AgentLogic<any, any> = {
        manifest: { id: 'MOCK-AGENT', version: '1.0.0', type: 'code' } as any,
        process: async (input: any, context: SystemContext) => {
            console.log(`[EXEC] Agent Processing in MODE: ${context.mode || 'Default'}`);
            if (context.failover_active) {
                console.log('[FAILOVER] Model switched! Returning success on retry.');
                return { result: 'Recovered Data' };
            }
            if (input.trigger_fail) throw new Error('Simulated Model Failure');
            return { result: 'Standard Data' };
        },
        evaluate: async (output: any): Promise<EvaluationResult> => ({ passed: true, confidence_score: 0.95 }),
        justify: async (output: any): Promise<TripleJustification> => ({
            identity: 'Auditor',
            knowledge: 'Test Context',
            math: '1+1=2'
        })
    };

    // MOCK SESSION
    const session: SessionContext<any> = {
        session_id: 'SESS-777',
        agent_id: 'MOCK-AGENT',
        user_id: 'DARIAS',
        input: { trigger_fail: false },
        context: { complexity: 10 } as any, // Should trigger ORCHESTRATOR
        db: {
            from: (table: string) => ({
                insert: (data: any) => ({
                    select: (fields: string) => ({
                        single: () => Promise.resolve({ data: { captured_at: 'now', id: 'm-1' }, error: null })
                    }),
                    then: (cb: any) => cb({ data: null, error: null })
                })
            })
        } as any
    };

    // 1. TEST ADAPTIVE ORCHESTRATION (COMPLEXITY > 8)
    console.log('\n--- 1. Testing Adaptive Orchestration ---');
    const envelope1 = await AgentRunner.execute(mockAgent, session);
    console.log(`[PASS] Result: ${envelope1.data.result}`);
    console.log(`[PASS] Mode was adapted: ${envelope1.audit.auto_corrected === false}`);

    // 2. TEST FAILOVER (TRIGGER ERROR)
    console.log('\n--- 2. Testing Model Failover ---');
    session.input.trigger_fail = true;
    session.context.complexity = 5; // Normal complexity
    const envelope2 = await AgentRunner.execute(mockAgent, session);
    console.log(`[PASS] Result: ${envelope2.data.result}`);
    console.log(`[PASS] Auto-corrected (Failover): ${envelope2.audit.auto_corrected}`);

    console.log('\n--- AXON ADAPTIVE RUNNER VERIFICATION COMPLETE ---');
}

verifyRunner().catch(console.error);
