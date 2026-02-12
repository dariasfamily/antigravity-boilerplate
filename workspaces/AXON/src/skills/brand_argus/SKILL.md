---
name: brand_argus
description: The Quality Assurance & Vision Agent. Audits content for brand safety, SEO relevance, and visual quality.
version: 1.0.0
driver: python
entrypoint: scripts/brand_argus_handler.py
---

# Argus: The All-Seeing Eye

**Mission:** Ensure quality and safety before publication.

## Inputs:
1.  **Draft Scripts** (Calliope).
2.  **Generated Visuals** (Thalia/Lumiere - Future).
3.  **SEO Keywords** (Pythia/Orion).

## Outputs:
1.  **Audit Reports** (Pass/Fail).
2.  **Safety Scores** (0-100).
3.  **SEO Suggestions**.

## Logic Flow:
1.  **Receive** content (Text or Image URL).
2.  **Analyze** against Brand Guidelines (Safety, Tone).
3.  **Verify** Keywords presence.
4.  **Approve** for Echo (Distribution) or **Reject** back to Calliope.
