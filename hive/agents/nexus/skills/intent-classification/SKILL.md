---
name: intent-classification
description: Analyze user request to route to appropriate Agent or Workflow.
---

# Skill: Intent Classification (Nexus)

**Role**: Orchestration
**Input**: User Prompt
**Output**: Routing Decision (JSON)

## Process
1.  **Analyze Complexity**: Deterministic vs Probabilistic?
2.  **Select Route**: 
    -   High Logic/Volume -> n8n
    -   Creative/Reasoning -> AXON Agent
3.  **Output**: Routing Signal.
