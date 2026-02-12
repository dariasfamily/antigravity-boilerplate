# AXON System Loop: Auditoría Forense y Sincronización
**Versión:** 1.0.0 | **Estado:** MANDATORIO GLOBAL | **ID:** `AXON-PROTO-LOOP-001`

Este protocolo define el algoritmo de ejecución concurrente que DEBE ejecutarse en cada interacción del workspace.

## 🔄 El Algoritmo del Bucle (The Loop Algorithm)

### Fase 1: Sincronización Pre-Interacción (Input Sync)
1. **Context Loading:** El agente lee `RTM_MASTER` y `OIM_MASTER` para cargar el estado de los hilos.
2. **Workspace Scan:** Detección de cambios externos en archivos (espejos vs local).
3. **Intent Modeling:** Aplicación de FFRS para traducir la instrucción del usuario en términos de impacto en los hilos.

### Fase 2: Ejecución Concurrente (Execution)
Mientras se procesa la tarea principal, se ejecutan sub-tareas automáticas:
- **Hilo 5 (Docs):** Si se completa una etapa, actualizar `task.md`.
- **Hilo 4 (Dashboard):** Si hay cambios en volumen de datos, preparar registros para Supabase.
- **Hilo 6 (Patterns):** Identificar si la solución actual genera un nuevo estándar.

### Fase 3: Auditoría Forense Post-Interacción (The 7th Thread)
Antes de finalizar el turno:
1. **Traceability Closure:** Actualizar `RTM_MASTER` con el resultado de la intención.
2. **Knowledge Anchoring:** Indexar logros en `KNOWLEDGE_LEDGER.md`.
3. **Mirror Mirroring:** Ejecutar sincronización de NotebookLM si el cambio es sustancial (Ver `AXON-PROTO-SYNC-EXT-001`).
4. **Cloud Push:** Si se cierra una fase, disparar sincronización con GitHub.
5. **State Reflection:** Validar que el estado del sistema refleje fielmente la última versión.

### Fase 4: Reconciliación y Heartbeat (The Pulse)
Para alcanzar el 100% de certidumbre, el sistema ejecuta un chequeo de redundancia:
1. **Hash Comparison:** Comparación de firmas entre `hive/knowledge/` y los artefactos de sesión.
2. **Auto-Correction:** Si se detecta un desfase (drift), el hilo de Auditoría Forense bloquea la siguiente interacción hasta que el local se sincronice con el HIVE.
3. **Ledger Pulse:** Cada hito debe tener un hash de validación en el `KNOWLEDGE_LEDGER.md`.

## 🛑 Regla de Oro (Actualizada)
"Ningún cambio es definitivo hasta que el Bucle de Sistema haya cerrado la Auditoría Forense y el Heartbeat confirme paridad total (Zero-Drift)."
