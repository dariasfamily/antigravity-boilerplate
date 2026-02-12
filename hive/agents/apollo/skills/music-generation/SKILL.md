---
name: music-generation
description: Generate original background music tracks using AI Music models (Suno/Udio).
---

# SKILL: MUSIC GENERATION

## 1. Objective
Create background scores that match the emotional tone of the video without overpowering the voiceover.

## 2. Input
- `prompt`: Text description (e.g. "Cyberpunk, dark synthwave, 120 BPM, driving bass").
- `duration`: Targeting length.
- `loopable`: Boolean.

## 3. Output
- `track_file_path`: Absolute path.
- `bpm`: Detected Beats Per Minute.
- `key`: Musical Key.

## 4. Best Practices
- Always mix 5dB lower than the Vocal Track.
- Use "Sidechain Compression" instructions for the final mix.
