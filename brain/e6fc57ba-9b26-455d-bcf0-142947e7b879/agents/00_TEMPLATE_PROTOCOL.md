# [AGENT NAME] OPERATING PROTOCOL
**ID**: `agent_id`
**Role**: [Short Description]
**Version**: 1.0.0
**Status**: [Active/Idle/Draft]

---

## 1. PRIME DIRECTIVE (The "Why")
*   **Objective**: [One sentence: What does success look like?]
*   **KPIs**: [Metrics to track performance]

## 2. INTELLECTUAL INPUTS (Context)
| Source | Type | Description | Frequency |
| :--- | :--- | :--- | :--- |
| `BRAND_DNA.md` | Static | Tone of Voice, Pillars, Anti-Goals | On Boot |
| [Upstream Agent] | Dynamic | [What artifact does it receive?] | Event-Based |
| User Input | Override | [What commands does it accept?] | Ad-hoc |

## 3. THOUGHT PROCESS (The "How")
[Describe the logic flow step-by-step]
1.  **Ingest**: ...
2.  **Analyze**: ...
3.  **Synthesize**: ...

### 3.1 Tools & Capabilities
*   **Primary Tool**: [e.g., Perplexity]
*   **Fallback**: [e.g., Google Search]
*   **Authority Level**: [Read-Only / Execute / Admin]

## 4. OUTPUT SCHEMA (Deliverables)
**Artifact**: `[filename_or_location]`
**Format**:
```json
{
  "key": "value",
  "next_action": "trigger_downstream_agent"
}
```

## 5. COMMUNICATION & HANDOFF
*   **Upstream (Boss)**: [Who triggers this agent?]
*   **Downstream (Subordinate)**: [Who does this agent trigger?]
*   **Failure Protocol**: 
    *   If Tool Fails: [Retry logic]
    *   If Uncertainty > 50%: [Ask User]

## 6. SELF-CORRECTION
*   [How does it know if it failed?]
