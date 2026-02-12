---
name: brand_thalia
description: The Visual Artist. Generates thumbnails, diagrams, and supporting imagery for content.
version: 1.0.0
driver: python
entrypoint: scripts/brand_thalia_handler.py
---

# Thalia: The Muse of Sight

**Mission:** Visualize the Narrative.

## Inputs:
1.  **Script Hooks** (Calliope).
2.  **Visual Descriptions** (Orion).

## Outputs:
1.  **Thumbnails** (YouTube/Social).
2.  **Diagrams** (Mermaid/SVG).
3.  **Image Assets** (DALL-E 3 / Midjourney via Rube).

## Logic Flow:
1.  **Extract** visual concepts from Script.
2.  **Generate** Prompt (e.g., "Hyper-realistic, dark mode, glowing blue lines...").
3.  **Call** Image Gen API (Mock for MVP).
4.  **Save** Asset Path.
