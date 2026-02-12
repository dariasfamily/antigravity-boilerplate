# ðŸ—ï¸ FULL 3.2: ARQUITECTURA TÃ‰CNICA (CALLIOPE)
**ID:** `PROJ-2026-CALLIOPE-v0`
**Estado:** DISEÃ‘O DE PRODUCCIÃ“N

## 1. Principios Rectores
1.  **Emotional Resonance:** Prioridad a la conexiÃ³n humana sobre la perfecciÃ³n tÃ©cnica.
2.  **Visual First:** El video es el rey. Pensar en imÃ¡genes antes que en palabras.
3.  **Brand Consistency:** Mantener el tono de voz de "AXON" en todo momento.

## 2. Estructura de Datos
- **Input:** `STRATEGY_MANIFESTO.md` (de ORION), `Brand_Guide.pdf`.
- **Output:** `VIDEO_SCRIPT_v1.md`, `STORYBOARD_TABLE.md`, `PROMPT_ASSETS.json`.
- **Persistencia:** `/brain/content/scripts/`.

## 3. Seguridad
- Filtrado de contenido sensible (NSFW, hate speech) en outputs generados.

## 4. Motor de Inferencia
- **LLM:** Modelos creativos (Gemini 1.5 Pro / GPT-4o) con alta temperatura (0.7 - 0.9).
- **RAG:** Acceso a guiones exitosos anteriores (`knowledge_mirror`).
