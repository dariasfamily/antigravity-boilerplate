# AXON v1.7 Architecture Map

## Logic Flow & Connectivity

```mermaid
graph TD
    subgraph "USER INTERFACE"
        Input["User Input / Intent"]
    end

    subgraph "AXON CORE (Antigravity Middleware)"
        UCC["Central Control Unit (UCC)"]
        EMA["EMA: Execution-Minimums Agent"]
        Ledger["Change Ledger (Inmutable)"]
        Orch["Adaptive Orchestrator"]
        Failover["Model Failover Manager"]
        Router["Context Router (Regla D3)"]
    end

    subgraph "HIERARCHICAL MEMORY (NotebookLM / Brain)"
        L1["L1: Quick Guide (Superficial)"]
        L2["L2: Operational Knowledge"]
        L3["L3 Core: Base Truth (Profunda)"]
    end

    subgraph "AGENT SWARM"
        A1["Research Agent"]
        A2["Creative/Edit Agent"]
        A3["Financial Agent ($)"]
        A4["Developer Agent"]
    end

    subgraph "DELIVERABLE"
        Obj["Deliverable Object (50+ Fields)"]
    end

    %% Flow Relationships
    Input --> UCC
    UCC --> EMA
    EMA -- "Checklist OK" --> Orch
    EMA -- "Block" --> Input
    
    Orch --> Router
    Router --> L1
    Router --> L2
    Router --> L3
    
    Orch --> Failover
    Failover -- "Model Switch" --> Orch
    
    Orch --> A1
    Orch --> A2
    Orch --> A3
    Orch --> A4

    A1 --> Ledger
    A2 --> Ledger
    A3 --> Ledger
    A4 --> Ledger

    Ledger --> Obj
    Obj -- "Feedback Loop" --> L3
```

## Functional Breakdown

1.  **UCC (Gatekeeper):** Verifies if the proposed change follows the "Execution Minimums".
2.  **Orchestrator:** Decides whether to expand, abstract, or polish based on the task complexity.
3.  **Context Router:** Applies Rule D3 to consume the right amount of memory (L1 vs L3).
4.  **Failover:** Ensures that if a model hits a limit, the state is snapshotted and resumed.
5.  **Change Ledger:** Records every atomic movement for forensic auditing.
