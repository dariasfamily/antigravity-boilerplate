# ðŸ§¹ SMP v1.0: Protocolo de Mantenimiento de Sistema (The Living Hive)
**Autoridad:** Egeria (SecretarÃ­a Central)
**VersiÃ³n:** 1.0
**Estado:** ACTIVO

---

## 1. FILOSOFÃA "AUTOPOIESIS"
El sistema AXON es un organismo vivo que se nutre de su propia actividad. Para evitar la entropÃ­a (desorden), se requiere un ciclo constante de mantenimiento y sincronizaciÃ³n.

## 2. EL PULSO DE SINCRONIZACIÃ“N (Sync Pulse)
Este protocolo se activa automÃ¡ticamente ante los siguientes eventos:

### A. Trigger: Nacimiento de Agente
- **CuÃ¡ndo:** Tras la certificaciÃ³n de un nuevo agente (POC Audit).
- **AcciÃ³n:**
    1. Actualizar `registry.json` y `agents_registry.md`.
    2. Sincronizar artefactos finales a NotebookLM.
    3. Comunicar capacidades nuevas al resto del Hive (Broadcast).

### B. Trigger: Cambio de ConfiguraciÃ³n Global
- **CuÃ¡ndo:** ModificaciÃ³n de `mcp_config.json` o `system_prompt` global.
- **AcciÃ³n:**
    1. Regenerar el contexto de Egeria.
    2. Verificar conectividad de todos los MCPs.

### C. Trigger: Higiene Semanal (Routine)
- **CuÃ¡ndo:** EjecuciÃ³n manual o programada.
- **AcciÃ³n:**
    1. Escanear `hive/` buscando archivos temporales o corruptos.
    2. Verificar integridad de enlaces en documentaciÃ³n (`dead-link-check`).
    3. Archivar logs antiguos en `/brain/archive/`.

## 3. CADENA DE MANDO (Command Chain)
1.  **Egeria (Orquestador):** Detecta la necesidad y emite la orden (`/run system-maintenance`).
2.  **Agentes Especialistas:** Ejecutan la actualizaciÃ³n de sus propios dominios.
3.  **AuditorÃ­a GAP:** Valida que el mantenimiento no rompiÃ³ nada.

## 4. PROTOCOLO DE REPORTE OBLIGATORIO (MRP)
**Regla:** "Si no hay reporte, la tarea no existiÃ³."

### 4.1 Trigger de Reporte
- **CuÃ¡ndo:** Al finalizar cualquier `TaskBoundary` en estado `VERIFICATION` o `COMPLETED`.
- **Responsable:** El Agente Activo (e.g., PULSAR, ORION).

### 4.2 Formato EstÃ¡ndar (Deep-Log Forense)
El reporte debe depositarse en `hive/agents/egeria/inbox/` y cumplir con el estÃ¡ndar `SKILL-GLOBAL-001` (Contexto, Decisiones, Diff Log, Residuos).

### 4.3 Procesamiento (Egeria - The Cleaner)
1.  **Leer Inbox:** Procesar `hive/agents/egeria/inbox/*.md`.
2.  **Ejecutar Limpieza:** Si el reporte lista "Artefactos Temporales", Egeria debe eliminarlos.
3.  **Sintetizar:** Extraer "Logros" y "Decisiones CrÃ­ticas" al `KNOWLEDGE_LEDGER.md`.
4.  **Archivar:** Mover reporte a `/brain/archive/reports/`.

---
**Comando de EjecuciÃ³n:** `run_workflow: system-maintenance`
