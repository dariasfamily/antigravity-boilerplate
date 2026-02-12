# 🏗️ FULL 3.2: ARQUITECTURA TÉCNICA (ARGUS)
**ID:** `PROJ-2026-ARGUS-v0`
**Estado:** DISEÑO DE PRODUCCIÓN

## 1. Principios Rectores
1.  **Trust, but Verify:** Nada se aprueba sin auditoría.
2.  **Safety First:** La seguridad de marca trunfa sobre la creatividad.
3.  **SEO Maximization:** El contenido seguro también debe ser visible.

## 2. Estructura de Datos
- **Input:** `VIDEO_SCRIPT_v1.md` (de CALLIOPE), `Brand_Rules.json`.
- **Output:** `AUDIT_REPORT.json` (PASS/REJECT), `OPTIMIZED_SCRIPT.md`.
- **Persistencia:** `/brain/audit_logs/`.

## 3. Protocolo de Auditoría (The Codex)
Basado en `ARGUS_PROTOCOL.md` (v1.1):
1.  **Brand Safety:** Profanidad, Odio, Riesgo.
2.  **SEO:** Keywords en Hook, Título, Descripción.
3.  **Fact-Check:** Verificación de afirmaciones (RAG).
4.  **Readability:** INFLESZ Index > 55.

## 4. Motor de Inferencia
- **LLM:** Modelos de alta lógica (Claude 3.5 Sonnet / GPT-4o). Temperatura 0.1 (Estricto).
- **RAG:** Acceso a `rules_brand_safety` y Google Search (Simulado).
