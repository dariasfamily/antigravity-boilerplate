# 🕵️ ELITE DEEP TRACE: PHASE 8 - APOLLO ("The Composer")
**Role**: Audio Director & Sound Engineer.
**Protocol**: Level 5 (Maximum Oversight)
**Dashboard State**: 🔵 `APOLLO_MIXING` (Audio Waveform)

## 1. THE INPUT ARTIFACT (From Phase 6)
**Interface: Calliope -> Apollo**
Apollo reads the **Master Script**. He focuses on timing, emotion, and rhythm.

### 1.1 Structural Input Object
```json
{
  "script_ref": "SCR-2026-02-08-001",
  "segments": [
    { "text": "Your career ends in 2026.", "emotion": "GRAVE" },
    { "text": "The Architect survives.", "emotion": "HOPEFUL" }
  ],
  "audio_constraints": {
    "voice_gender": "MALE", // From Lyra
    "mood": "CINEMATIC_TENSION"
  }
}
```

## 2. THE PROCESS (Logic Kernel)

### 2.1 Micro-Step: Voice Casting
*   **Action**: Select Text-to-Speech Model ID.
*   **Selection**: `ElevenLabs_Model_X` (Deep/Authoritative).
*   **Tuning**: Set stability=0.5, similarity=0.8.

### 2.2 Micro-Step: Sound Design (SFX Layering)
*   **Action**: Insert SFX cues based on keywords.
*   **Insertions**:
    *   "Swarms" -> `sfx_drone_hum.mp3`
    *   "Ends" -> `sfx_glitch_impact.wav`

### 2.3 Micro-Step: Pacing Calculation
*   **Action**: Estimate total duration.
*   **Calc**: 140 words / 150wpm = 56 seconds. Fits "Short" (<60s) perfectly.

## 3. THE OUTPUT INTERFACE (Apollo -> Argus)

### 3.1 Audio Director File
```json
{
  "audio_id": "AUD-2026-02-08-001",
  "config": {
    "tts_engine": "ELEVENLABS",
    "voice_id": "EXAVITUS",
    "ssml_string": "<speak><prosody rate='slow'>Your career ends in 2026.</prosody></speak>"
  },
  "asset_list": ["voice_01.mp3", "sfx_hum.mp3", "bgm_cyber.mp3"]
}
```

## 4. DASHBOARD SIGNALS & CONTROL

### 4.1 Status Indicators
*   **Led Color**: 🔵 **BLUE (Wave)** = `MIXING`.
*   **Message**: "Casting Voice: Exavitus. Calculating Timings."
*   **Visual**: Audio Visualizer Spectrum.

### 4.2 User Intervention Controls ("The Sound Check")
*   **Trigger**: Apollo finishes. State -> 🟠 `WAITING_APPROVAL`.
1.  **[APPROVE]**: Lock Audio Plan.
2.  **[CHANGE_VOICE]**: "Too robotic. Try 'Adam'."
    *   *System Reaction*: Updates `voice_id` and re-estimates duration.
3.  **[MUTE_SFX]**: "Remove the drone hum." -> Updates asset list.

## 5. AUDIT LOG (The "Black Box" - 5 Levels)

| Level | Type | Message | Hash |
| :--- | :--- | :--- | :--- |
| **L1** | **IDENTITY** | `Apollo checking Audio Drivers.` | `q1r2...` |
| **L2** | **RESOURCE** | `TTS Cost Est: $0.10 (Char Count).` | `s3t4...` |
| **L3** | **DECISION** | `Voice Selected: EXAVITUS (Score: 99%).` | `u5v6...` |
| **L4** | **DATA** | `SSML Tags inserted: 5.` | `w7x8...` |
| **L5** | **STATE** | `Transition: MIXING -> AUDIO_READY.` | `y9z0...` |

---
**NEXT**: **PHASE 9: ARGUS (The Guardian)**
*Dependency*: User Approval of Audio & Visual Manifests.
