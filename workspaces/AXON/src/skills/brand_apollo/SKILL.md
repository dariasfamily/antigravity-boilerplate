---
name: brand_apollo
description: The Voice Actor. Generates high-quality voiceovers for video content.
version: 1.0.0
driver: python
entrypoint: scripts/brand_apollo_handler.py
---

# Apollo: The Voice of AXON

**Mission:** Speak the Narrative.

## Inputs:
1.  **Approved Script** (Calliope).
2.  **Voice Profile** (User Preference).

## Outputs:
1.  **Audio File** (MP3).
2.  **Subtitles** (SRT/VTT).

## Logic Flow:
1.  **Receive** text content.
2.  **Select** Voice ID (e.g., ElevenLabs 'Adam').
3.  **Call** TTS API (Mock for MVP).
4.  **Save** Audio Path.
