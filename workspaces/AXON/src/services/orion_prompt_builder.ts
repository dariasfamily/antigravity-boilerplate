
/**
 * ORION PROMPT BUILDER
 * "The Connector": Bridges Static Markdown Definition to Active LLM Context.
 */

import { OrionIngest } from "../types/agent_types";
import { predictNicheRPM } from "../utils/orion_logic";

// In a real app, we would read the .md file using fs.
// For this boilerplate, we simulate the "Context Injection" of the Core Rules.
const CORE_IDENTITY = `
ROLE: You are AGENT ORION, the Analytic Engine and MBSE Architect of the AXON System.
MOTTO: "Evidence over Intuition. Structure over Chaos."
VERSION: 4.0

OBJECTIVE: Validate user ideas using the P.O.S.E framework (Persona, Objective, Scope, Evidence) and generate a High-Fidelity "Manifest" (Blueprint).

STRATEGIC INTELLIGENCE (2025):
- 3-Second Rule: Hooks must trigger Dopamine (Novelty, Curiosity, Negativity).
- System 1 vs 2: Target the lizard brain first (Visual/Audio), then the logic brain.
- Monetization: Prioritize "Audience Ownership" (Email/Community) over AdSense "Rent".
`;

export class OrionPromptBuilder {

    static buildSystemPrompt(brandProfile: { archetype: string, tone: string }): string {
        return `
${CORE_IDENTITY}

BRAND DNA ENFORCEMENT:
- Archetype: ${brandProfile.archetype}
- Tone: ${brandProfile.tone}
- Constraint: Reject any output that sounds "Corporate" or "Generic". Use the declared Tone.

OUTPUT FORMAT:
You must respond with a STRICT JSON object matching the 'OrionManifest' schema.
NO preamble. NO markdown text outside the JSON.
`;
    }

    static buildUserMessage(input: OrionIngest): string {
        // 1. Calculate Financial Context (Logic Injection)
        let financeContext = "";
        if (input.strategic_goals.monetization_focus === 'AdRevenue') {
            // We use our logic function to give a hint to the LLM
            // (In a real scenario, we'd pass the result, but here we just guide)
            financeContext = `FINANCIAL HINT: Prioritize niches with high RPM. (Finance > Gaming).`;
        }

        // 2. Fallback for System Consensus
        if (input.source_trigger === 'System_Consensus_State') {
            return `
TRIGGER: System Consensus (Autonomous Run).
CONTEXT: ${JSON.stringify(input.system_consensus_package?.context_data)}
DIRECTIVES: ${input.system_consensus_package?.directives.join(", ")}
TASK: Generate a content manifest aligned with the current System State.
${financeContext}
`;
        }

        // 3. User Input Mode
        return `
TRIGGER: User Interaction.
INPUT: "${input.user_input?.raw_text || "Analyze attached content refs"}"
PLATFORM: ${JSON.stringify(input.user_input?.format)}
TASK: Architect a video manifest for this concept.
${financeContext}
`;
    }
}
