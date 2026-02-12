---
description: Register a new Agent in the AXON System
---

# New Agent Registration Workflow

Follow this standard procedure to add a new Agent to the AXON ecosystem (NUCLEUS V5.3+).

## 1. Define Identity & Role
- **ID Format**: `PROJ-[SYSTEM/YEAR]-[NAME]-[VERSION]` or `[NAME]_V[MAJOR]_[MINOR]` (e.g., `ORION_V3_4`).
- **Name**: CamelCase or Proper Case (e.g., `Orion`, `Pulsar`).
- **Role**: A clear, 3-5 word executive summary of their function.
- **Allowed Phases**: Select from `PLANNING`, `RESEARCH`, `SCRIPTING`, `PRODUCTION`, `AUDIT`, `PUBLISHING`.

## 2. Update Codebase (Source of Truth)
// turbo
1. **Edit `src/types/agent_types.ts`**:
   - Add the Agent's NAME to the `active_agent` Union type in `SystemContext`.
   - *Example*: `active_agent: 'ORION' | ... | 'NEW_AGENT';`

// turbo
2. **Edit `src/config/agent_registry.ts`**:
   - Add a new entry to the `AGENTS` constant.
   - Ensure `id`, `name`, `role`, `description`, and `allowed_phases` are strictly defined.

## 3. Database Registration
// turbo
1. **Create Seed Entry**:
   - Open `supabase/seeds/agents_seed.sql`.
   - Add a new `INSERT` statement for the agent.
   - *Tip*: Use `ON CONFLICT (id) DO UPDATE` to allow re-running the seed without errors.

## 4. Verification
1. **Run Type Check**: Ensure no TypeScript errors exist in `agent_registry.ts`.
2. **Run Seed**: Execute the SQL seed against the local or remote Supabase instance.
3. **Verify in Hive**: (Optional) Create a `TECHNICAL_DATASHEET_[NAME].md` in the Hive for documentation.
