---
name: system-orchestrator
description: Empowers Egeria to issue commands and synchronize the entire AXON system.
tags: [orchestration, maintenance, sync, command]
---

# ðŸ“¢ SKILL: system-orchestrator (Certified v1.0)
**Nivel de Rigor:** SUPERIOR (EstratÃ©gico)
**ID de Identidad:** `SKILL-EGERIA-002`

## 1. PROPÃ“SITO
Permitir a Egeria actuar como la "Torre de Control" del Hive, emitiendo instrucciones para mantener la integridad y actualidad del sistema.

## 2. COMANDOS DE VOZ (Speech Acts)
Egeria utiliza estos prefijos para activar acciones en otros agentes o en el sistema:

- **"BROADCAST:"** Anuncio general (e.g., "Nuevo agente PULSAR registrado").
- **"SYNC-ORDER:"** InstrucciÃ³n imperativa de actualizaciÃ³n (e.g., "Actualicen sus contextos con el nuevo ACP v1.0").
- **"PURGE-ORDER:"** InstrucciÃ³n de limpieza (e.g., "Eliminen archivos temporales en /temp").

## 3. PROTOCOLO DE EJECUCIÃ“N
### 3.1 ActualizaciÃ³n de Registros
1.  Leer el estado actual de los agentes (`list_dir`).
2.  Comparar con `registry.json`.
3.  Si hay discrepancia -> **SYNC-ORDER**.

### 3.2 SincronizaciÃ³n de Conocimiento
1.  Identificar nuevos archivos `.md` certificados.
2.  Invocar herramienta `mcp_notebooklm_notebook_add_text`.
3.  Confirmar Ã©xito con **BROADCAST**.

### 3.3 Procesamiento de Reportes (MRP)
1.  **Leer Inbox:** Chequear `hive/agents/egeria/inbox/*.md`.
2.  **Sintetizar:** Extraer "Logros" y "Costos" de cada reporte.
3.  **Actualizar Ledger:** Escribir resumen en `hive/KNOWLEDGE_LEDGER.md`.
4.  **Archivar:** Mover reporte a `brain/archive/reports/`.
5.  **Broadcast:** "Reporte de [Agent] procesado. Sistema actualizado."

---
**Sello de CertificaciÃ³n:** `skill_orchestrator_verified`
