# [PROT-005] Protocolo de Resiliencia, Genuinidad y Recuperación v1.0.0

## 0. Propósito
Garantizar que procesos largos o críticos (como auditorías forenses) puedan recuperarse de interrupciones manteniendo la integridad absoluta del contexto y asegurando que la ejecución es 100% genuina.

## 1. El Checkpoint Genuino
Cada punto de control en `hive/sessions/` debe contener:
- `process_id`: Identificador único de la sesión.
- `timestamp`: Marca de tiempo precisa.
- `last_successful_step`: ID del último paso completado.
- `context_hash`: Un hash (SHA-256) generado a partir de los archivos clave y el estado de la memoria en ese momento.
- `evidence_snapshot`: Referencia a los logs/archivos generados que prueban la ejecución del paso.

## 2. Mecanismo de Recuperación
Al detectar una interrupción:
1. El sistema lee el último archivo `.json` en `hive/sessions/`.
2. Verifica el `context_hash`. Si los archivos han cambiado sin registro, el sistema emite una **Alerta de Inconsistencia (Zero-Drift Violation)**.
3. El agente re-inyecta el estado guardado y continúa desde el `last_successful_step`.

## 3. Garantía de Genuinidad
Para evitar "trampas" o pérdidas de contexto:
- Cada acción ejecutada debe dejar una **Huella de Evidencia** (un archivo o entrada de log verificable).
- El protocolo **EET (Evidence-Evaluation-Trade-offs)** es obligatorio en cada checkpoint.
- Si no hay evidencia física de la ejecución, el paso se considera **NO COMPLETADO**.

## 4. Aplicación en AXON System Core
- Obligatorio para Auditorías Elite.
- Opcional para tareas atómicas.
- La firma del agente auditor es necesaria para cerrar cada checkpoint.
