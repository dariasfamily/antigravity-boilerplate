# 🛡️ AGENT CHASSIS V4.1: THE SEALED RUNNER
> **Pattern**: Composition over Inheritance.
> **Philosophy**: "Trust, but Verify (and don't let them override the verification)."
> **Status**: PROPOSAL (Expert Aligned)

## 🚨 CRITICAL ARCHITECTURE SHIFT
**Previous (V4.0)**: Abstract Class (`class Orion extends AgentChassis`).
**Problem**: Logic overrides could bypass checks. `super.execute()` might not be called.
**New (V4.1)**: Factory/Sealed Runner (`AgentRunner.run(new OrionLogic())`).
**Benefit**: The Execution Loop is "Hardware Locked". The Agent Code simply *plugins* into the immutable Chassis.

---

## 1. THE CONTRACT (INTERFACES)

The "Logic" layer is all the Agent Developer gets to touch.

```typescript
// The "Brain" of the Agent
export interface AgentLogic<TInput, TOutput> {
    // 1. Metadata matches Registry
    manifest: {
        id: string; // "ORION_V3_4"
        version: string;
    };

    // 2. Pure Logic Step
    process(input: TInput, context: SystemContext): Promise<TOutput>;

    // 3. Self-Check (The Mirror)
    evaluate(output: TOutput): Promise<EvaluationResult>;
    
    // 4. Justify (The Triple Gate)
    justify(output: TOutput): Promise<TripleJustification>;
}
```

---

## 2. THE CHASSIS (SEALED RUNNER)

This code is **FINAL**. It cannot be extended. It *consumes* the Logic.

```typescript
export class AgentRunner {
    // Private Constructor prevents random instantiation
    private constructor(private readonly db: SupabaseClient) {}

    // The ONLY way to run an agent
    public static async execute<TInput, TOutput>(
        logic: AgentLogic<TInput, TOutput>,
        session: SessionContext
    ): Promise<StandardEnvelope<TOutput>> {
        
        // 🔒 PHASE 1: HARDENED INGEST
        // -----------------------------
        // Verify Session State (DB Check)
        // Verify Input Schema (Zod)
        
        // 🧠 PHASE 2: EXECUTE LOGIC (SANDBOXED)
        // -------------------------------------
        const startTime = performance.now();
        let result = await logic.process(session.input, session.context);
        
        // 🛡️ PHASE 3: THE "HARD" AUDIT (CANNOT BE SKIPPED)
        // ------------------------------------------------
        // A. Self-Evaluation
        const evalResult = await logic.evaluate(result);
        if (!evalResult.passed) {
             // Auto-Correction Loop (Managed by Runner)
             result = await this.autoCorrect(logic, result, evalResult);
        }

        // B. Triple Justification
        const justification = await logic.justify(result);
        
        // 💾 PHASE 4: THE NUCLEUS WRITE (ATOMIC)
        // --------------------------------------
        // 1. Generate W3C Trace ID (Random Hex 32)
        // 2. Insert into `ag_agent_memory` (Composite PK)
        // 3. Insert into `ag_logic_trace` (Composite FK)
        
        await this.persistToNucleus(session, result, justification);

        return this.envelope(result);
    }
}
```

---

## 3. HOW TO IMPLEMENT ORION (V5 STANDARD)

```typescript
// src/agents/orion/OrionLogic.ts

export class OrionLogic implements AgentLogic<OrionInput, OrionOutput> {
    manifest = { id: "ORION_V4", version: "1.0.0" };

    async process(input: OrionInput): Promise<OrionOutput> {
        // Pure Business Logic
        return generateManifest(input);
    }

    async evaluate(output: OrionOutput) {
        // Check Validity
        return { passed: true };
    }
}

// EXECUTION (In API Route)
await AgentRunner.execute(new OrionLogic(), session);
```
