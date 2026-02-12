import { NextResponse } from 'next/server';
import { CalliopeOutput, OrionOutput } from '@/types/agent_types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const orion_brief: OrionOutput = body.orion_brief;

        // Simulate "Writing" time
        await new Promise(resolve => setTimeout(resolve, 1200));

        const mockScript: CalliopeOutput = {
            metadata: {
                title: `VIRAL: ${orion_brief.strategic_brief.topic}`,
                format: "Reel",
                estimated_duration: "45s",
                vera_score: 94,
                tone_match: "High"
            },
            script_content: {
                hook_block: {
                    time_range: "0:00-0:03",
                    visual_cue: "Split Screen: Left(User Tired) Right(Robot Working)",
                    audio_text: "(Glitch Sound) Stop working so hard.",
                    overlay_text: "STOP CODING."
                },
                value_block: {
                    time_range: "0:03-0:30",
                    visual_cue: "Screen recording of terminal autocompleting code.",
                    audio_text: "This agent just built my entire backend while I drank coffee. Here is the script."
                },
                payoff_block: {
                    time_range: "0:30-0:45",
                    visual_cue: "Stripe Dashboard Green Line.",
                    audio_text: "Build systems. Not syntax. Link in bio.",
                    overlay_text: "RESULT: $5k/mo"
                },
                full_markdown: `# SCRIPT\n\n**HOOK**: Stop working so hard...\n**BODY**: This agent built my backend...\n**CTA**: Link in bio.`
            },
            feedback_loop: {
                iteration_count: 1,
                correction_log: ["Shortened hook to < 3s"]
            }
        };

        return NextResponse.json(mockScript);
    } catch (error) {
        return NextResponse.json({ error: 'Calliope Failed' }, { status: 500 });
    }
}
