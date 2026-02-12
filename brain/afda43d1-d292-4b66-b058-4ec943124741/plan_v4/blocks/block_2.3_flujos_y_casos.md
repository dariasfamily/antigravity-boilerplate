# Block 2.3: Flujos y Casos de Uso (FASE 2)

## Metadata
- **Plan:** v4.0
- **SecciÃ³n:** III. Requisitos (Parte 2)
- **Timestamp:** 2026-02-09T22:25:00-05:00
- **Estado:** completed
- **SesiÃ³n ID:** afda43d1-d292-4b66-b058-4ec943124741

## ðŸ”„ Flujos End-to-End

### 1. IngenierÃ­a de IntenciÃ³n (Input Layer)
- **Actor:** Darias -> **Agente:** PULSAR.
- **Proceso:** El usuario expresa una idea vaga. Pulsar aplica CO-STAR y CoT para generar un **Master Prompt**.
- **Output:** IntenciÃ³n transmutada.

### 2. Arquitectura de EjecuciÃ³n (Strategy Layer)
- **Agente:** PULSAR -> **Agente:** PLANNER/ORION.
- **Proceso:** Planner desglosa el Master Prompt en tareas atÃ³micas asignadas a agentes especÃ­ficos del Hive. Orion define los Ã¡ngulos estratÃ©gicos (Riqueza, Salud, Influencia).
- **Output:** Plan de ImplementaciÃ³n / SS v0 especÃ­fica.

### 3. FÃ¡brica de ProducciÃ³n (Production Layer)
- **Agente:** PLANNER -> **Agente:** CALLIOPE -> **Agente:** ARGUS.
- **Proceso:** Calliope genera el contenido (scripts, cÃ³digo) basado en el plan. Argus audita la calidad, seguridad de marca y cumplimiento de la Directiva Primera.
- **Output:** Asset Verificado.

### 4. AmplificaciÃ³n y Entrega (Output Layer)
- **Agente:** ARGUS (Audit Pass) -> **Agentes:** THALIA & APOLLO.
- **Proceso:** Thalia genera la capa visual (thumbnails, UI). Apollo genera la capa sonora (voiceovers). 
- **Destino:** ECHO (Canal de Entrega) -> Darias.

### 5. AuditorÃ­a de Conocimiento (Governance Layer)
- **Agente:** EGERIA (CKO).
- **Proceso:** Escucha todas las interacciones, actualiza el `KNOWLEDGE_LEDGER.md` y sincroniza NotebookLM.
- **Output:** System Memory persistente.

## ðŸŽ¯ Casos de Uso Principales

### UC-001: AuditorÃ­a de Nuevo Sistema
- **Trigger:** Darias solicita auditar un nuevo proyecto.
- **Flujo:** Planner diseÃ±a el protocolo -> Egeria ejecuta el inventario -> Midas (futuro) evalÃºa el costo.

### UC-002: ProducciÃ³n de Video Viral
- **Trigger:** Idea de contenido de Orion.
- **Flujo:** Pulsar (Prompt) -> Calliope (Script) -> Argus (Compliance) -> Apollo/Thalia (Assets).

## âœ… PrÃ³ximo Paso
SesiÃ³n 2.4: Modelo de ImplementaciÃ³n (OIM). DefiniciÃ³n de la arquitectura tÃ©cnica (Next.js/Supabase/MCP) que sustenta estos flujos.

---
**Firma:** AXON System Kernel (SesiÃ³n 2.3)
