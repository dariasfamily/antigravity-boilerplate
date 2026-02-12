
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { AgentRunner } from '@/core/AgentRunner';
import { OrionLogic } from '@/agents/orion/OrionLogic';
import { SessionContext } from '@/core/types';
import { SystemContext } from '@/types/agent_types';

/**
 * 🚀 ORION EXECUTION ROUTE
 * Production endpoint to trigger the Investment Analyst Agent.
 */
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // 1. Authenticate
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized', details: authError }, { status: 401 });
        }

        // 2. Parse Input (Optional: Allow overriding default mock inputs from body)
        const body = await request.json().catch(() => ({}));

        // Default Mock Input (Standardized for V4 Demo)
        const inputData = {
            id: `trigger_${Date.now()}`,
            timestamp: new Date().toISOString(),
            source_trigger: 'User_UI',
            raw_input: {
                topic_keywords: body.keywords || ['AI Automation', 'Agent Architecture'],
                analysis_mode: 'Specific_Target',
                content_spec: {
                    target_platform: 'YouTube',
                    content_format: 'Video_16_9',
                    duration_category: 'Medium_Form',
                    exact_duration_seconds: 600
                },
                brand_profile: {
                    archetype: 'Architect',
                    tone: 'Authoritative',
                    niche_vertical: 'Tech',
                    objective_kpi: 'Trust'
                },
                production_constraints: {
                    budget_tier: 'Low',
                    has_human_talent: false
                }
            }
        };

        // 3. Get or Create Session
        // In production, we should probably look up an active session or create one.
        // For simplicity/robustness here, we'll create a new "Run" session.
        const { data: sessionData, error: sessionError } = await supabase
            .from('ag_sessions')
            .insert({
                user_id: user.id,
                active_agent_id: 'ORION_V3_4',
                platform: 'Desktop',
                phase: 'RESEARCH'
            })
            .select()
            .single();

        if (sessionError) {
            console.error("Session Error:", sessionError);
            return NextResponse.json({ error: 'Session Creation Failed', details: sessionError }, { status: 500 });
        }

        // 4. Construct Context
        const sessionContext: SessionContext<any> = {
            session_id: sessionData.id,
            agent_id: 'ORION_V3_4',
            user_id: user.id,
            input: inputData,
            db: supabase,
            context: {
                session_id: sessionData.id,
                active_agent: 'ORION',
                workflow_input: inputData,
                orion_analysis: { selected_candidates: [], rejected_concepts: [] },
                next_step: {
                    target_agent: 'CALLIOPE',
                    action: 'GENERATE_SCRIPT',
                    priority_manifest_id: ''
                }
            } as SystemContext
        };

        // 5. EXECUTE RUNNER
        const result = await AgentRunner.execute(new OrionLogic(), sessionContext);

        return NextResponse.json({
            status: 'SUCCESS',
            envelope: result
        });

    } catch (e: any) {
        console.error("Orion Execution Error:", e);
        return NextResponse.json({
            status: 'ERROR',
            message: e.message
        }, { status: 500 });
    }
}
