# Plan: AXON v1.7 Integration - Phase 1: Governance & UCC

Materializing the Central Control Unit (UCC) to enforce AXON v1.7 protocols.

## Proposed Changes

### [Engineering / src]

#### [MODIFY] [InternalAffairs.ts](file:///c:/Users/daria/.gemini/antigravity/workspaces/AXON/src/core/InternalAffairs.ts)
- Implement `CentralControlUnit` class.
- Add `ExecutionMinimumsAgent (EMA)` logic to validate task requirements.
- Implement the `ChangeLedger` for immutable recording of system movements.
- Add gatekeeping logic to prevent unauthorized or non-compliant modifications.

### [Engineering / src / components]

#### [MODIFY] [SystemMap.tsx](file:///c:/Users/daria/.gemini/antigravity/workspaces/AXON/src/components/dashboard/SystemMap.tsx)
- **New Nodes:** Add `UCC`, `EMA`, `AXON Orchestrator`, and `Failover Manager` to the `NODES` array.
- **Interactive Layers:** 
    - Enhance `handleNodeClick` to show a "Fidelity Sheet" or link to agent spec.
    - Add resource metrics (Tokens, Memory) to the `SystemNode` type and inspector panel.
- **Visuals:** 
    - Implement a "Package Journey" animation using SVG `animateMotion`.
    - Apply colors based on AXON hierarchy: Core (Red/Gold), Agents (Blue), Skills (Emerald).
- **States:** Add `adapting` and `failover` status types.

### [Engineering / src / core]

#### [MODIFY] [AgentRunner.ts](file:///c:/Users/daria/.gemini/antigravity/workspaces/AXON/src/core/AgentRunner.ts)
- **Governance Gatekeeping:** Call `InternalAffairs.getMinimumSteps` and validate start conditions.
- **Adaptive Orchestration:** Implement `switchMode` logic to toggle between `Abstraer`, `Expandir`, and `Pulir` modes based on context.
- **Failover Management:** Implement a `try-catch` wrapper that takes a "Snapshot" of context (PROT-008) and switches model providers on failure.
- **Enhanced Logging:** Implement LITE/FULL logging based on compliance requirements.

### [Knowledge Base / Brain]

#### [MODIFY] [walkthrough.md](file:///C:/Users/daria/.gemini/antigravity/brain/eed5dfb5-4975-42e9-b615-492a03592430/walkthrough.md)
- Track implementation progress of the UCC, Dashboard, and Orchestrator.

## Verification Plan

### Automated Tests
- Run unit tests for `InternalAffairs` (if they exist) or create a verification script to test the gatekeeper logic.
- Verify that a task failing to meet "Minimum Steps" is correctly blocked.
