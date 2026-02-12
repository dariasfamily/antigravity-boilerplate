
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { AgentRunner } from '@/core/AgentRunner';
import { OrionLogic } from '@/agents/orion/OrionLogic';
import { SessionContext } from '@/core/types';
import { SystemContext } from '@/types/agent_types';

/**
 * 🧪 E2E VERIFICATION ROUTE
 * Triggers the full "Sealed Runner" pipeline.
 * Supports GET for browser testing and POST for automated testing.
 */
export async function GET(request: NextRequest) {
    return handleRequest(request);
}

export async function POST(request: NextRequest) {
    return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
    try {
        const supabase = await createClient();

        // 1. Authenticate (Must be logged in)
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized', details: authError }, { status: 401 });
        }

        // 2. Mock Input (Complex Orion Request)
        const mockInput = {
            id: `test_trigger_${Date.now()}`,
            timestamp: new Date().toISOString(),
            source_trigger: 'User_Prompt',
            raw_input: {
                topic_keywords: ['AI Automation', 'Agent Architecture'],
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

        // 3. Create Session (Normally fetched from DB)
        // For this test, we create a fresh session entry first to satisfy FKs
        const { data: sessionData, error: sessionError } = await supabase
            .from('ag_sessions')
            .insert({
                user_id: user.id,
                active_agent_id: 'ORION_V3_4',
                platform: 'Desktop'
            })
            .select()
            .single();

        if (sessionError) {
            return NextResponse.json({ error: 'Session Creation Failed', details: sessionError }, { status: 500 });
        }

        // 4. Construct Context
        const sessionContext: SessionContext<any> = {
            session_id: sessionData.id,
            agent_id: 'ORION_V3_4',
            user_id: user.id,
            input: mockInput,
            db: supabase,
            context: {
                session_id: sessionData.id,
                active_agent: 'ORION',
                workflow_input: mockInput,
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
            message: 'Sealed Runner Execution Complete',
            envelope: result
        });

    } catch (e: any) {
        return NextResponse.json({
            status: 'ERROR',
            message: e.message,
            stack: e.stack
        }, { status: 500 });
    }
}
