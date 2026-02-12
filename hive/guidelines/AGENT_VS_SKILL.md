# AGENT vs SKILL: The Decision Matrix

This document defines the criteria for creating a new component in the AXON Hive.

## ðŸŽ¯ The Golden Rule
**Skills are TOOLS. Agents are WORKERS.**

If it *acts* (executes a task), it's a Skill.
If it *thinks* (plans, decides, manages), it's an Agent.

## ðŸ” Decision Matrix

| Feature | Skill (`hive/skills/`) | Agent (`hive/agents/`) |
| :--- | :--- | :--- |
| **Primary Function** | Execute single, defined tasks. | Orchestrate multiple tasks and skills. |
| **Complexity** | Deterministic (Input -> Output). | Probabilistic (Goals -> Plans -> Actions). |
| **State** | Stateless (usually). | Stateful (Remembers context, history). |
| **Tools** | Uses libraries, APIs, scripts. | Uses Skills from the Hive. |
| **Example** | `run_youtube_download`, `audit_code_file` | `YouTubeManager`, `SeniorDeveloper` |

## ðŸ› ï¸ When to Create a SKILL
Create a Skill when:
1.  You have a specific, repeatable technical task (e.g., "Resize Image").
2.  The task has clear inputs and outputs.
3.  You want to "teach" the system a new capability that any agent can use.
4.  The logic can be written in a script (Python, JS).

**Structure**:
- `SKILL.md` (Instructions)
- `scripts/` (Code)
- `tests/` (Verification)

## ðŸ§  When to Create an AGENT
Create an Agent when:
1.  You need a "Persona" or specific role (e.g., "The CFO").
2.  The task requires planning, reasoning, or multiple steps using different tools.
3.  You need someone to maintain long-term context of a project.
4.  You want to group a set of Skills under one "Standard Operating Procedure".

**Structure**:
- `AGENT.md` (System Prompt / Persona)
- `memory/` (Context)
- Access to specific Skills via `hive/config.yaml`.
