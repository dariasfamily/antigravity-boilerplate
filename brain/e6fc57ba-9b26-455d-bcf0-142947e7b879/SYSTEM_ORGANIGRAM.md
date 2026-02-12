# SYSTEM ORGANIGRAM (Visual Structure)

```mermaid
graph TD
    %% --- GOVERNANCE LAYER ---
    User((USER / COMMANDER)) -->|Controls| Dashboard[Dashboard V2 / Cockpit]
    Dashboard -->|Reads/Writes| DB[(Supabase: system_state)]
    
    %% --- AGENT LAYER ---
    subgraph "Core Systems"
        Hephaestus[Hephaestus: Engineer]
        Oculus[Oculus: Auditor]
        Hermes[Hermes: Messenger]
        Wealth[Wealth: CFO]
    end
    
    subgraph "Brand Division (The Studio)"
        Orion[Orion: Strategy] -->|Briefs| Calliope[Calliope: Script]
        Calliope -->|Script| Argus[Argus: QA/Audit]
        Argus -->|Approved| Thalia[Thalia: Visuals]
        Argus -->|Approved| Apollo[Apollo: Audio]
        Argus -->|Approved| Lumiere[Lumiere: Video]
        
        Thalia -->|Assets| Lumiere
        Apollo -->|Voice| Lumiere
        
        Lumiere -->|Final Video| Echo[Echo: Social Manager]
        Echo -->|Publish| Socials[X / LinkedIn / YouTube]
    end
    
    %% --- TOOLING LAYER (Redundancy) ---
    subgraph "Tool Stack"
        T_Audio[Audio] -->|Primary| ElevenLabs
        T_Audio -->|Alt| OpenAI_TTS
        
        T_Avatar[Avatar] -->|Primary| HeyGen
        T_Avatar -->|Alt| D_ID
        
        T_Image[Image] -->|Primary| NanoBanana
        T_Image -->|Alt| Midjourney
        
        T_Video[Video] -->|Primary| Veo3
        T_Video -->|Alt| Runway
    end
    
    %% --- AUTOMATION ---
    Cron(Nightly Trigger) -->|Wake Up| Orion
    Orion -->|Research| Trends[Trend Sources]
```

## Workflow Legend
1.  **Research**: Nightly Scan -> Orion creates Strategy.
2.  **Creation**: Calliope drafts -> Thalia/Apollo/Lumiere generate assets.
3.  **Audit**: Argus verifies Safety & Quality.
4.  **Distribution**: Echo publishes to mapped channels.
5.  **Correction**: Oculus monitors health -> Hephaestus fixes code.
