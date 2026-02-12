# ðŸ’¡ Ideas y Asuntos Pendientes
**Last Updated**: 2026-01-31 (Post-Phase D)

## ðŸ“Œ Estado Actual: Construyendo la "Brand Division"
El sistema estÃ¡ en transiciÃ³n de Infraestructura Pura -> ProducciÃ³n de Activos.

### ðŸŸ¡ Phase 1: Text & Strategy (En Progreso)
*   **Orion (Estrategia)**: âœ… DEFINIDO (Expert Level). Implementado en Dashboard (`OrionStudio`).
*   **Calliope (Scripting)**: âœ… DEFINIDO (V.E.R.A Protocol). Pendiente: `CalliopeStudio` UI.
*   **Echo (Social)**: â³ PENDIENTE (Siguiente en la lista).
*   **Argus (SEO)**: â³ PENDIENTE.

## ðŸš€ MÃ³dulo: AXON Studio (Dashboard V3)
Objetivo: Controlar toda la producciÃ³n desde una sola pantalla.
- [x] **Orion Studio**: Input de Directivas + P.O.S.E Validation (UI Lista).
- [ ] **Calliope Studio**: Editor de Guiones Markdown + V.E.R.A Check.
- [ ] **Data Vault**: Visualizador de archivos generados (`/vault/`).

## â“ Investigaciones / Integraciones Futuras
- [ ] **Video Gen (Cinema Agent)**: Integrar Veo/Sora para generar B-Roll basado en los guiones de Calliope.
- [ ] **Avatar Gen**: Integrar HeyGen o similar para leer los guiones.
- [ ] **Auto-Deploy**: Que Echo publique automÃ¡ticamente en TikTok (Rube MCP).

## âš ï¸ Deuda TÃ©cnica / Limpieza
- [ ] Mover lÃ³gica de simulaciÃ³n (`route.ts`) a Python Scripts reales (`/scripts/agents/`).
- [ ] Conectar Dashboard a Supabase Real (Actualmente usa Mock Data para demostraciÃ³n UI).

## ðŸ§  Specialist Agents Queue
### 1. Echo (Short-Form Specialist)
*   **Goal**: Dominate TikTok/Reels/Shorts.
*   **Function**: Analyze retention, generate hooks, script <60s.
*   **Metric**: "Seconds Watched".

### 2. Cinema (Long-Form Specialist)
*   **Goal**: High-production YouTube storytelling.
*   **Function**: Pacing graphs, 10m+ scripts, chapter markers.
*   **Metric**: "Watch Time".
