# Implementation Plan - Official & Marketing Skills Installation

## Goal Description
1.  Install "official and safe" skills from `skills.sh`.
2.  Integrate local marketing skills from `C:\Users\daria\Desktop\marketingskills-main`.
3.  Create a central **Skill Registry** (`/skills`) for easy lookup.

## User Review Required
> [!IMPORTANT]
> **Source Confirmation**: We will install skills from `https://github.com/vercel-labs/agent-skills`. This is the official Vercel Labs collection and is considered safe and standard for AI agents.

> [!NOTE]
> **Installation Path**: Skills will be installed into `C:\Users\daria\.gemini\AXON\hive\skills`. This aligns with the "Hive" architecture for global resources.

## Proposed Changes

### Global Skills Directory (`hive/skills`)
We will use the `npx skills add` command to install official skills and manually copy marketing skills.

#### Official Skills
*Already installed:* `react-best-practices`, `web-design-guidelines`, `react-native-guidelines`, `composition-patterns`.

#### Marketing Skills
We will copy the 25+ marketing skills from the user's desktop to `hive/skills/marketing`.
**Source**: `C:\Users\daria\Desktop\marketingskills-main\marketingskills-main\skills`
**Destination**: `C:\Users\daria\.gemini\AXON\hive\skills\marketing`

### Skill Registry (`/skills`)
We will create a master registry file at `hive/skills/SKILL_REGISTRY.md`. This file will:
- List all available skills by category.
- Provide a brief description of each.
- Be viewable by the user using a `/skills` command (mapped to `view_file` of this registry).

## Verification Plan

### Automated Verification
- **List Skills**: Run `npx skills list` to see if it picks up the nested marketing skills.
- **Registry Check**: Verify `SKILL_REGISTRY.md` exists and contains entries for both official and marketing skills.

### Manual Verification
- User can view the registry.
- User can try `view_file` on a marketing skill (e.g., `hive/skills/marketing/seo-audit/SKILL.md`).
