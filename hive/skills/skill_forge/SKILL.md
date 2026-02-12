---
name: skill_forge
description: Create, generate, and scaffold new AI Agent Skills. Use this skill when the user asks to "create a new skill", "add a capability", or "teach the system how to do X". It ensures all new skills follow the AXON Fractal Standard (Self-Auditable, Modular, Secure).
---

# The Skill Forge (Hephaestus Protocol)

This skill is the **Factory of Factories**. Its sole purpose is to spawn new, high-quality Skills that inherit the DNA of the AXON System.

## ðŸ§¬ Fractal DNA (The Standard)
All generated skills must contain:
1.  **SKILL.md**: The brain. YAML frontmatter + Markdown instructions.
2.  **scripts/**: The hands. Python/Node.js scripts for complex logic.
3.  **tests/**: The conscience. Self-audit scripts to verify functionality.
4.  **examples/**: The memory. Usage patterns.
5.  **resources/**: Templates or config files.

## ðŸ› ï¸ Usage

### 1. Analyze Requirements (The Input)
Before creating a skill, ask the user:
*   **Name**: Short, snake_case (e.g., `youtube_manager`).
*   **Role**: What "Hat" does this agent wear? (e.g., "Video Editor").
*   **Trigger**: When should the system call this? (e.g., "When user asks to upload video").
*   **Inputs/Outputs**: What data does it eat? What does it produce?

### 2. Forge the Skill (The Process)
Run the `generate_skill.py` script located in this folder. It will:
1.  Create the directory structure `src/skills/<skill_name>`.
2.  Generate a compliant `SKILL.md` with "AXON" boilerplate.
3.  Register the skill in the System Registry (if applicable).

### 3. Verify (The Audit)
*   **Self-Correct**: The script checks if the folder already exists.
*   **Test**: Run the new skill's `test_setup.py` (created automatically) to ensure it loads.

## âš ï¸ Safety Protocols
*   **No Duplicates**: Never overwrite an existing skill without explicit `FORCE` command.
*   **Sandboxing**: New skills should not modify `brain/` core files directly unless authorized.
