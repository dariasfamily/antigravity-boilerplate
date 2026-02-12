# IMP_BRAND_DIVISION_V2: The AXON Studio ("The Muses")

**Objective**: Scale the Brand Division from a simple poster to a full-stack **Content Production Studio**.
**Philosophy**: "Hollywood Quality at API Speed."

## 1. Governance: The Muse System (7 Specialized Agents)

We are splitting the creative process into atomic specialized roles.

### ðŸ§  **Orion (The Showrunner)** - *Strategy & Direction*
*   **Role**: Executive Producer.
*   **Tasks**: Market research, trend spotting, "Master Storyboard" creation.
*   **Integration**: Writes the **Core Direction** into `NotebookLM` for User visibility.
*   **Input**: User Goal.
*   **Output**: `Creative_Brief`, `Project_Manifest` (in NotebookLM).

### âœï¸ **Calliope (The Screenwriter)** - *Text & Script*
*   **Role**: Lead Writer.
*   **Tasks**: Scripts, Hooks, Descriptions, Captions, dialogue.
*   **Input**: `Creative_Brief`.
*   **Output**: `Screenplay_Markdown`, `Twitter_Thread`.

### ðŸŽ¨ **Thalia (The Art Director)** - *Static Visuals*
*   **Role**: Visual Artist.
*   **Tasks**: Thumbnails, Storyboards, Character Design, Color Palettes, Midjourney Prompts.
*   **Input**: `Screenplay_Markdown`.
*   **Output**: `Image_Prompts`, `Visual_Style_Guide`.

### ðŸŽ¼ **Apollo (The Sound Engineer)** - *Audio*
*   **Role**: Audio Designer.
*   **Tasks**: Voiceovers (ElevenLabs), SFX strings, Background Music generation, Audio Mixing.
*   **Input**: `Screenplay` + `Visual_Mood`.
*   **Output**: `Audio_Files`, `Voice_Prompts`.

### ðŸŽ¥ **Lumiere (The Cinematographer)** - *Video*
*   **Role**: Director of Photography.
*   **Tasks**: Camera angles, Lighting setup, Scene transitions, Video Generation (Veo/Sora).
*   **Input**: `Storyboard` + `Audio`.
*   **Output**: `Video_Scenes`, `Final_Cut`.

### ðŸ” **Argus (The Optimizer)** - *SEO & QA*
*   **Role**: Quality Assurance & Analyst.
*   **Tasks**: SEO Audit, A/B Testing plans, Content Grading, Competitor Analysis.
*   **Input**: `Draft_Content`.
*   **Output**: `Audit_Report`, `Optimization_Suggestions`.

### ðŸ“¡ **Echo (The Broadcaster)** - *Distribution*
*   **Role**: Publisher.
*   **Tasks**: Uploading, tagging, scheduling, community management.
*   **Input**: `Final_Asset` + `Optimization_Data`.
*   **Output**: `Published_Link`.

---

## 2. System Core: The Blackboard Architecture (Shared Context)

To ensure **Fractal Intelligence** and **Perfect Memory**, we replace direct communication with a **Shared System Context**.

### 2.1 The Data Structure (`SystemContext`)
The "Master File" that holds the entire truth of the system at `t=now`.
*   **Global Variables**: Brand Tone, Wealth Goals, Focus Topics.
*   **Agent States**:
    *   `ORION`: Stratgy, Manifest, Logs.
    *   `CALLIOPE`: Scripts, V.E.R.A. Scores, Logs.
    *   `ECHO`: Distribution Status, Links, Logs.
*   **Artifact Registry**: List of all generated files.

### 2.2 Persistence (The "Save Game")
*   **Runtime**: React State (`AgentContext.tsx`).
*   **Storage**: Supabase Table (`system_state`).
    *   **Auto-Sync**: Every viable change (Success/Failure) triggers a DB write.
    *   **History**: We keep a log of state changes for debugging (Time Travel).

### 2.3 Visibility (The "Writers Room")
NotebookLM remains the **Human Interface** for deep reading.
1.  **Orion/Calliope** push their "Blue Pills" and "Scripts" to the Context.
2.  **System** syncs these artifacts to `AXON_Writers_Room` in NotebookLM.
3.  **User** reviews in NotebookLM.

---

## 3. Technical Architecture

### Database Schema Expansion (`brand_studio`)
*   `project_id`: UUID
*   `stage`: (STRATEGY, SCRIPT, VISUALS, AUDIO, VIDEO, QA, LIVE)
*   `script_content`: Text
*   `visual_prompts`: JSON
*   `audio_assets`: JSON array
*   `video_assets`: JSON array
*   `seo_score`: Float
*   `notebook_link`: URL (Deep link to the specific NotebookLM note)

### Directory Structure
```text
src/skills/
  brand_orion/
  brand_calliope/
  brand_thalia/
  brand_apollo/
  brand_lumiere/
  brand_argus/
  brand_echo/
```

## 4. Execution Roadmap (Phased)
1.  **Phase 1 (The Writers Room)**: Implement Orion, Calliope, and Argus. (Strategy -> Script -> SEO).
2.  **Phase 2 (The Art Department)**: Implement Thalia and Apollo. (Visuals + Audio).
3.  **Phase 3 (The Set)**: Implement Lumiere. (Video Generation).
4.  **Phase 4 (Broadcast)**: Implement Echo.
5.  **Phase 5 (Dashboard V3) [COMPLETED]**: Deep Observability & Analytics (Context Inspector, Pipeline Visualizer, Input/Output Splits).

## 5. User Review Required
> [!NOTE]
> This is a massive expansion. Are you ready to instantiate 7 new agents? This increases complexity but provides granular control.
