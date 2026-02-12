---
name: voice-synthesis
description: Generate human-like speech using external APIs (ElevenLabs/OpenAI).
---

# SKILL: VOICE SYNTHESIS

## 1. Objective
Transform text scripts into high-fidelity audio files using defined Voice IDs.

## 2. Input
- `text`: The raw script.
- `voice_id`: The specific avatar ID (e.g., "Adam_v2").
- `stability`: Float (0.0 - 1.0).
- `style`: "News", "Narration", "Hyped".

## 3. Output
- `audio_file_path`: Absolute path to the .mp3/.wav file.
- `duration`: Seconds.

## 4. Constraint
- Must verify no "hallucinations" in pronunciation.
