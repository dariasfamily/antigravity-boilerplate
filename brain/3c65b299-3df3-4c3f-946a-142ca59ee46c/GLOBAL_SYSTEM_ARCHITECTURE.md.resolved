# AXON Global System Architecture (The Hive)

## 1. Philosophy: The "Hive" Model
To make Agents and Skills accessible globally (from any project, chat, or extension), we need a **Central Hive** separate from individual project workspaces.

## 2. Recommended Directory Structure

```text
C:\Users\daria\.gemini\AXON\
│
├── hive\                       <-- [NEW] GLOBAL LIBRARY (The Source of Truth)
│   ├── agents\                 <-- Global Agent Definitions
│   │   ├── orion\
│   │   ├── calliope\
│   │   └── _templates\         <-- Starter templates for new agents
│   │
│   ├── skills\                 <-- Global Skill Capabilities
│   │   ├── research\           (Deep Search, Perplexity, Academic)
│   │   ├── social\             (YouTube API, LinkedIn, X)
│   │   ├── finance\            (Stripe, Crypto, Ledger)
│   │   └── coding\             (Refactoring, Testing, Deployment)
│   │
│   └── memories\               <-- Shared Long-term Memory (Vector DB)
│
├── workspaces\                 <-- YOUR PROJECTS (Implementation)
│   ├── Proyecto MENISCO\       <-- Uses agents from Hive
│   └── Creating Content Agents\
│
└── scratch\                    <-- TEMPORARY (Delete monthly)
```

## 3. Official Skill Recommendations (The "Prime Skills")
These are the essential capabilities I can configure for you:

### A. Research & Intelligence
*   **`DeepSearch`**: Multi-step reasoning search (uses Perplexity/Exa).
*   **`TrendWatch`**: Monitors social signals on X/Reddit.

### B. Content & Media
*   **`StudioOne`**: Image generation (Flux/Midjourney API).
*   **`VoxPopuli`**: Transcription and Audio synthesis.

### C. Operations
*   **`Ledger`**: Tracking costs and revenue (Stripe/Supabase).
*   **`DeployBot`**: Vercel/Netlify auto-deployment.

## 4. Migration Plan (Execution Steps)

1.  **Create The Hive**: I will generate the `\hive` folder structure.
2.  **Migrate Core Agents**: Move Orion and Calliope definitions from `scratch` to `hive\agents`.
3.  **Migrate Project**: Move `AXON-boilerplate` code to `workspaces\Proyecto MENISCO`.
4.  **Connect**: Update configuration to point `Proyecto MENISCO` to use the global Hive agents.

## 5. Configuration
I will create a master `config.yaml` in the root of `hive` that acts as the "DNS" for your system, telling every project where to find these tools.
