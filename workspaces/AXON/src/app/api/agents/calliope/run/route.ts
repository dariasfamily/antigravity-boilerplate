
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { AgentRunner } from '@/core/AgentRunner';
import { CalliopeLogic } from '@/agents/calliope/CalliopeLogic';
import { SessionContext } from '@/core/types';
import { SystemContext, CalliopeIngest } from '@/types/agent_types';

/**
 * âœï¸ CALLIOPE EXECUTION ROUTE
 * Triggers the Copywriting Agent.
 */
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // 1. Authenticate
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized', details: authError }, { status: 401 });
        }

        // 2. Parse Input: Expecting an OrionManifest or similar context
        const body = await request.json().catch(() => ({}));

        // Verify we have a manifest to work with
        if (!body.manifest) {
            // Fallback: If no manifest provided, create a dummy one for testing
            body.manifest = {
                meta: { id: "mock_orion", trend_direction: "RISING ðŸ“ˆ" },
                content_architecture: {
                    core_concept: {
                        hooks: {
                            primary: { script_variants: ["Stop scrolling!", "Listen to this."] },
                            final: { script_variants: ["Click the link.", "Follow for more."] }
                        },
                        emotional_target: "Curiosity"
                    },
                    technical_constraints: { audio_landscape: "Upbeat" }
                },
                financial_projection: { estimated_rpm: 15.0 }
            };
        }

        const inputData: CalliopeIngest = {
            manifest: body.manifest,
            global_style_guide: "AXON_V2"
        };

        // 3. Get Session (Reusable logic, could be abstracted)
        const { data: sessionData, error: sessionError } = await supabase
            .from('ag_sessions')
            .insert({
                user_id: user.id,
                active_agent_id: 'CALLIOPE_V1_0',
                platform: 'Desktop',
                phase: 'SCRIPTING' // Calliope's Phase
            })
            .select()
            .single();

        if (sessionError) {
            console.error("Session Error:", sessionError);
            return NextResponse.json({ error: 'Session Creation Failed', details: sessionError }, { status: 500 });
        }

        // 4. Construct Context
        const sessionContext: SessionContext<CalliopeIngest> = {
            session_id: sessionData.id,
            agent_id: 'CALLIOPE_V1_0',
            user_id: user.id,
            input: inputData,
            db: supabase,
            context: {
                session_id: sessionData.id,
                active_agent: 'CALLIOPE',
                workflow_input: {} as any, // Only needed for Orion really
                // Pass previous analysis if available
                orion_analysis: { selected_candidates: [body.manifest], rejected_concepts: [] },
                next_step: {
                    target_agent: 'CALLIOPE', // We are here
                    action: 'GENERATE_SCRIPT',
                    priority_manifest_id: body.manifest.meta.id
                }
            } as SystemContext
        };

        // 5. EXECUTE RUNNER
        const result = await AgentRunner.execute(new CalliopeLogic(), sessionContext);

        return NextResponse.json({
            status: 'SUCCESS',
            envelope: result
        });

    } catch (e: any) {
        console.error("Calliope Execution Error:", e);
        return NextResponse.json({
            status: 'ERROR',
            message: e.message
        }, { status: 500 });
    }
}
