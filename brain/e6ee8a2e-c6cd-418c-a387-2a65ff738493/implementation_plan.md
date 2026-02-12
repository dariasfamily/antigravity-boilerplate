# Implementation Plan - Agent ECHO Integration

## Goal Description
Integrate Agent ECHO ("The Voice") into the AXON v6.0 System Architecture. ECHO is responsible for distributing content created by Calliope to social platforms (X, LinkedIn, YouTube) and tracking engagement. This plan covers the TypeScript definitions, Context updates, and the creation of a "Strategy Manual" for NotebookLM.

## User Review Required
> [!IMPORTANT]
> The "NotebookLM" for ECHO will be created as a Markdown Artifact (`brain/ECHO_OPERATIONAL_MANUAL.md`). The user must manually import this file into their google NotebookLM instance to generate the actual notebook URL.

## Proposed Changes

### System Architecture (`src/types/agent_types.ts`)
#### [MODIFY] [agent_types.ts](file:///c:/Users/daria/.gemini/AXON/scratch/AXON-boilerplate/src/types/agent_types.ts)
- Define `EchoInput`: Receives `CalliopeOutput` and distribution targets.
- Define `EchoOutput`: social post URLs, content snippets, and scheduled times.
- Update `SystemContext`: Add `ECHO` to the `agents` registry.
- Update `AgentActivityRecord`: Allow 'ECHO' as an agent ID.

### System Context (`src/context/AgentContext.tsx`)
#### [MODIFY] [AgentContext.tsx](file:///c:/Users/daria/.gemini/AXON/scratch/AXON-boilerplate/src/context/AgentContext.tsx)
- Initialize `ECHO` state in `AgentProvider`.
- Add `setEchoState` to `AgentContextAPI`.
- Update `logEvent` to handle ECHO logs.

### Knowledge Base (`brain/`)
#### [NEW] [ECHO_OPERATIONAL_MANUAL.md](file:///c:/Users/daria/.gemini/AXON/brain/ECHO_OPERATIONAL_MANUAL.md)
- Comprehensive guide on ECHO's logic, "Voice" parameters, Platform constraints, and engagement metric definitions.

## Verification Plan

### Automated Tests
- TypeScript compilation check (via `tsc` if available, or visual inspection of Types).

### Manual Verification
- Review `agent_types.ts` to ensure `EchoInput` correctly references `CalliopeOutput`.
- Verify `AgentContext` default state includes ECHO.
- **Action**: User to confirm they can copy the content of `ECHO_OPERATIONAL_MANUAL.md` to NotebookLM.
