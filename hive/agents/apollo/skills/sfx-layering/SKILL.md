---
name: sfx-layering
description: Automated insertion of Sound Effects using AudioSet Ontology mapping.
---

# SKILL: SFX LAYERING & AUDITORY RETENTION

## 1. Objective
Add depth and texture to the audio mix using precise semantic mapping.

## 2. Methodology
- **AudioSet Mapping:** Translate generic tags (e.g., "boom") to specific AudioSet IDs (e.g., `/m/042v_gx`).
- **Timing:** Align SFX transients with visual cuts (Frame-accurate).

## 3. Input
- `script_tags`: Labels like `[whoosh]`, `[click]`, `[impact]`.
- `visual_cuts`: Timestamp list from Thalia.

## 4. Output
- `sfx_track`: Isolated stem for mixing.
