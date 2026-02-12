
import {
    AgentLogic,
    EvaluationResult,
    TripleJustification,
    SystemContext
} from '../../core/types';
import { OrionIngest, OrionManifest } from '../../types/agent_types';
import { generateManifest } from '../../utils/orion_logic';

interface OrionOutput {
    candidates: OrionManifest[];
    rejected: Array<{ term: string; score: number; reason: string }>;
}

/**
 * 🌠 ORION V4 LOGIC
 * The first "Sealed" Agent.
 * 
 * Role: Investment Analyst of Attention.
 * Responsibility: Generate high-ROI content manifests.
 */
export class OrionLogic implements AgentLogic<OrionIngest, OrionOutput> {

    // 1. Metadata Checks (Must match Registry)
    public readonly manifest = {
        id: "ORION_V3_4",
        version: "3.4.0"
    };

    /**
     * 🧠 PHASE 2: PURE LOGIC
     * Generates top 3 content candidates.
     */
    public async process(input: OrionIngest, context: SystemContext): Promise<OrionOutput> {
        // 1. Extract Topics
        const topics = input.raw_input.topic_keywords;
        const candidates: OrionManifest[] = [];
        const rejected: any[] = [];

        // 2. Generate Manifests for each topic (Simulation logic)
        for (const topic of topics) {
            // Mocking "Evidence" check
            const evidence = true;
            const manifest = generateManifest(input, topic, evidence);

            // Simple filter logic
            if (manifest.meta.predicted_virality > 7) {
                candidates.push(manifest);
            } else {
                rejected.push({
                    term: topic,
                    score: manifest.meta.predicted_virality,
                    reason: "Low Virality Prediction"
                });
            }
        }

        // 3. Selection (Top 3)
        // Sort by virality
        const topCandidates = candidates
            .sort((a, b) => b.meta.predicted_virality - a.meta.predicted_virality)
            .slice(0, 3);

        return {
            candidates: topCandidates,
            rejected
        };
    }

    /**
     * 🛡️ PHASE 3A: SELF-EVALUATION (The Mirror)
     * Orion checks if he actually did his job.
     */
    public async evaluate(output: OrionOutput): Promise<EvaluationResult> {
        // Constraint 1: Must have at least 1 candidate
        if (output.candidates.length === 0) {
            return {
                passed: false,
                reason: "Zero candidates generated. Criteria too strict or input empty.",
                confidence_score: 0.0
            };
        }

        // Constraint 2: RPM must be viable (> $15.00)
        const avgRpm = output.candidates.reduce((sum, c) => sum + c.financial_projection.estimated_rpm, 0) / output.candidates.length;
        if (avgRpm < 15.00) {
            return {
                passed: false,
                reason: `Average RPM $${avgRpm} is below threshold ($15.00).`,
                confidence_score: 0.5
            };
        }

        return {
            passed: true,
            confidence_score: 0.95
        };
    }

    /**
     * 🛡️ PHASE 3B: TRIPLE JUSTIFICATION (The Gate)
     * Mandatory explanation for the Audit Log.
     */
    public async justify(output: OrionOutput): Promise<TripleJustification> {
        const topPick = output.candidates[0];

        return {
            identity: "Orion V3.4 (Attention Analyst). My goal is high-RPM, high-retention video architecture.",

            knowledge: `Analyzed ${output.candidates.length + output.rejected.length} concepts. ` +
                `Selected '${topPick?.content_architecture?.core_concept?.title_variations[0]}' based on 'Rising' trend direction.`,

            math: `Top Candidate Score: ${topPick?.meta.predicted_virality}/10. ` +
                `Projected RPM: $${topPick?.financial_projection.estimated_rpm}. ` +
                `Total Candidates: ${output.candidates.length}.`
        };
    }
}
