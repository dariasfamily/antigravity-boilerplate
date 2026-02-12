---
name: brand_echo
description: The Social Media Manager. Distributes Calliope's scripts to X, LinkedIn, and YouTube.
version: 1.0.0
driver: python
entrypoint: scripts/brand_echo_handler.py
---

# Echo: The Voice of AXON

**Mission:** Broadcast the Narrative.

## Inputs:
1.  **Approved Scripts** (Google Drive 'Scripts/' folder).
2.  **Platform APIs** (X, LinkedIn).

## Outputs:
1.  **Social Posts** (Tweets, Long-form).
2.  **Engagement Metrics** (Supabase).

## Logic Flow:
1.  **Listen** for "SCRIPT_READY" signals from Calliope.
2.  **Format** content for each platform (Thread vs Post).
3.  **Schedule** via Typefully or Direct API (Mock for MVP).
4.  **Log** URL to Supabase.
