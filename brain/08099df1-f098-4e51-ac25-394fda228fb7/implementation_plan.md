# Implementation Plan: System Context Activity Log

## Goal Description
The user requires a structured history of all agent activities within the `SystemContext`. This history must pair the **Input/Decision** (Configuration, Directive) with the **Output/Data** (Result, Artifact) to allow full traceability of the "Question/Answer" cycle.

## User Review Required
> [!IMPORTANT]
> This change expands the `SystemContext` object. All components reading from Context will now have access to the full `activity_log`.

## Proposed Changes

### Core Types (`src/types/agent_types.ts`)
#### [MODIFY] `agent_types.ts`
- Define `AgentActivityRecord<TInput, TOutput>` interface.
- Add `activity_log: AgentActivityRecord[]` to `SystemContext`.

```typescript
export interface AgentActivityRecord {
    id: string; // uuid
    timestamp: string;
    agent_id: 'ORION' | 'CALLIOPE';
    // The "Question/Decision"
    input_configuration: any; 
    // The "Answer/Data"
    output_result: any;
    performance_metrics?: {
        execution_time_ms: number;
        confidence_score: number;
    };
}
```

### Context Provider (`src/context/AgentContext.tsx`)
#### [MODIFY] `AgentContext.tsx`
- Initialize `activity_log` as an empty array in default state.
- Add `recordActivity` method to the Context API.
- Implement the reducer logic to append new records.

### Dashboard Integration
#### [MODIFY] `StrategyRoom.tsx` (ORION)
- Call `recordActivity` when user clicks "APPROVE".
#### [MODIFY] `WriterRoom.tsx` (CALLIOPE)
- Call `recordActivity` when user clicks "APPROVE".

## Verification Plan

### Manual Verification
1.  **Orion Flow**:
    - Open Strategy Room.
    - Select "Viral (STEPPS)" framework.
    - Click "Start" -> Wait for result -> Click "Approve".
    - **Verify**: Check console log for "Activity Recorded" and inspect `SystemContext` to ensure the entry contains both the STEPPS input and the Strategic Brief output.

2.  **Calliope Flow**:
    - Open Writer Room.
    - Select "Negative Hook".
    - Click "Start" -> Wait -> Click "Approve".
    - **Verify**: Inspect `SystemContext` for the paired input/output record.
