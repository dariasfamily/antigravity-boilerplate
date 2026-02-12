import { NextResponse } from 'next/server';
import { OrionOutput } from '@/types/agent_types';

// MOCK ORION LOGIC (Until Gemini API is fully wired)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { topic } = body;

        // Simulate "Thinking" time
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockOutput: OrionOutput = {
            transmission_id: `sys_orion_${Date.now()}`,
            strategic_brief: {
                topic: topic || "AI Agents for Solopreneurs",
                selected_angle: "The 'Employee' Mindset vs The 'Builder' Mindset",
                target_emotion: "Urgency / FOMO",
                primary_framework: "P.O.S.E."
            },
            confidence_score: 0.92,
            market_gap_score: 88,
            competitor_density: "Medium-High",
            detected_keywords: ["AI Automation", "Passive Income", "Cursor Tutorial"],
            tactical_assets: {
                hooks: [
                    { type: 'visual', desc: 'Split screen: 10 hours coding vs 10 mins agent supervision' },
                    { type: 'verbal', desc: 'Stop coding. Start orchestrating.' }
                ],
                meta_data: {
                    id: `brief_${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    target_platform: ["TikTok", "YouTube Shorts"],
                    confidence_score: 0.92,
                    model_used: "Orion-Synthesizer-V3"
                },
                research_core: {
                    validation_pose: "Problem: Time. Obstacle: Skill. Solution: Agents. Evidence: Viral Growth.",
                    micro_tension: "Manual Coding is Dead",
                    seo_vertical: "Tech / SaaS",
                    retention_critical: "Show the income dashboard in first 3s"
                },
                tactical_execution: {
                    topic: topic || "AI Agents",
                    hook_proposal: "If you are writing functions by hand, you are losing money.",
                    narrative_format: "Contrarian Rant",
                    estimated_rpm: "$15.00",
                    seo_points: ["AI", "Tech", "Money"]
                },
                calliope_instructions: {
                    tone: "Ruthless but encouraging",
                    pacing: "Rapid",
                    structure: "Hook -> Agitate -> Solve",
                    required_elements: ["Terminal View", "Revenue Graph"],
                    forbidden_terms: ["Deep dive", "Journey"]
                }
            }
        };

        return NextResponse.json(mockOutput);
    } catch (error) {
        return NextResponse.json({ error: 'Orion Failed' }, { status: 500 });
    }
}
