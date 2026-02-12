# AXON External Sync Protocol: Cloud & Repo Parity
**Versión:** 1.0.0 | **Estado:** MANDATORIO | **ID:** `AXON-PROTO-SYNC-EXT-001`

Este protocolo extiende el `SYSTEM_LOOP_PROTOCOL` para garantizar paridad total fuera del workspace local.

## 🎯 Objetivo
Asegurar que NotebookLM (Cerebro Compartido) y GitHub (Memoria Fósil) reflejen siempre el estado 1:1 del sistema AXON tras cada hito crítico.

## 🔄 El Algoritmo de Sincronización Externa

### 1. Triggers de Activación (Cuándo)
- **Fin de Fase:** Al marcar una tarea de primer nivel como `[x]` en `task.md`.
- **Paso Crítico:** Cambios en esquemas de base de datos, protocolos de gobernanza o specs de agentes.
- **Manual:** Invocado por Darias o el Hilo 7.

### 2. Fase A: Sincronización Cognitiva (NotebookLM)
- **Action:** El Hilo 5 (Docs) identifica archivos modificados.
- **Action:** Se utiliza `mcp_notebooklm_notebook_add_text` o `source_sync_drive` para actualizar fuentes.
- **Verification:** Auditoría de `source_count` y versión en el título del notebook.

### 3. Fase B: Sincronización de Repositorio (GitHub)
- **Staging:** `git add .` para preparar todos los cambios verificados.
- **Commiting:** Mensaje de commit atómico siguiendo el estándar AXON (`[VERSION] - Achievement`).
- **Pushing:** `git push` para consolidar el ADN en la nube.

### 4. Fase C: Certificación de Paridad Triádica (The Triangle)
El Heartbeat no dará "PASS" hasta que:
1. **Local:** El ADN esté coherente.
2. **NotebookLM:** Las fuentes reflejen la versión actual.
3. **GitHub:** El repositorio tenga el commit de la fase.

## 🛑 Regla de Oro Externa
"El sistema no está actualizado hasta que la tríada Local-Notebook-GitHub sea idéntica al 100%."
