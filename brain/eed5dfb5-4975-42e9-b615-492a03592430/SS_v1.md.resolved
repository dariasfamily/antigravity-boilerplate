# System Specification v1 (FFRS) — Antigravity/AXON

**Version:** 1.7 (Failover + Adaptivity + UCC)  
**Status:** Official / Audited  
**Framework:** FFRS + EET (COC v1.0 Compliance + PROT-001)

---

> [!NOTE]
> Este documento es una extracción íntegra, organizada y agrupada de todos los puntos, datos y requisitos mencionados, sin pérdida de información, estructurados para análisis posterior y diseño del sistema.

## 0) Principios de control (garantía de no pérdida de datos)

**0.1 Trazabilidad absoluta**
* Todo elemento (fuente, nota, agente, campo del objeto, paso del pipeline) recibe: `uid` único, `version`, `origen`, `fecha`, `dependencias[]`, `fuentes_base[]` (links a Nivel 3).
* Ningún resumen vive sin referencias explícitas a sus fuentes profundas.

**0.2 Inmutabilidad por versiones**
* Las capas derivadas (Nivel 1 y 2) **no sobrescriben** fuentes profundas (Nivel 3).
* Cualquier actualización crea nueva versión; las versiones previas se conservan.

**0.3 Registro vivo obligatorio**
* Cada sesión de NotebookLM crea/actualiza la nota **“registro”** como fuente viva (Formato fijo: Cambios, Fuentes, Docs impactados, Decisiones, Pendientes, Riesgos).

---

## 1) Integraciones Técnicas & Plataformas IA

**1.1 Antigravity (orquestación multinivel)**
* Integrar y usar **ComfyUI dentro de Antigravity**.
* Uso de **/agent/** o **hive** como modelo de organización.
* Control de herramientas del browser y Gemini CLI.
* **Middleware Avanzado:** Implementación de `AxonOrchestrator`, `CentralControlUnit (UCC)`, `ModelFailoverManager`.

**1.2 Continuidad Automática (Failover de modelo - Entregable F)**
* **Monitor de límites** por sesión/chat/agente/modelo.
* **Failover automático** al siguiente modelo de mayor capacidad (política de fallback).
* **Snapshot de contexto transaccional:** Pipeline state, step id, variables, variables intermedias, refs L1/L2/L3, logs parciales.
* **Rehidratación validada:** Resume exacto del estado mediante hash del snapshot.
* **Módulos:** `ModelFailoverManager`, `ContextSnapshotStore`, `ModelPolicyRegistry`.

---

## 2) Sistema de Agentes (Arquitectura Adaptativa - Entregable G)

**2.1 Adaptación Autónoma (AXON Orchestrator)**
El sistema evalúa la tarea activa y decide automáticamente realizar operaciones adaptativas:
* **Abstraer/bajar nivel** (simplificar).
* **Sustraer** (eliminar ruido).
* **Expandir** (añadir detalle/capacidad).
* **Argumentar** (justificar con refs L3).
* **Pulir** (refinar outputs).
* **Agregar/editar** (modificar artefactos).

**2.2 Module Registry & Change Planner**
* Catálogo versionado de módulos (agentes, dashboards, esquemas DB).
* Planificación de cambios como propuestas versionadas (dry-run + aprobación automática).

**2.3 Unidad Central de Control (UCC - Entregable H)**
* **Execution-Minimums Agent (EMA):** Genera plantillas de mínimos pasos (obligatorios) por tipo de tarea (Código, DB, Plantillas, Pipelines, Cuadernos).
* **Change Ledger:** Registro de movimientos inmutable en tiempo real.
* **Update Broadcaster:** Difusión de actualizaciones a todos los elementos del sistema.
* **Compliance Enforcer:** Gatekeeper que bloquea la ejecución si no se cumplen los pasos mínimos.

---

## 3) Pipeline & Trazabilidad (Radiología Forense)

**3.1 Logs en 2 niveles (LITE/FULL)**
* **Log ejecutivo (LITE):** Legible por humano. **Log forense (FULL):** Estructurado para investigación.
* Registro de `knowledge_depth_used` y `axon_change_id`.

**3.2 Checkpoints transaccionales**
* Ejecución idempotente con `resume_step_id`.
* Logs correlacionados: `failover_event_id`, `previous_model_id` → `new_model_id`.

---

## 4) Objeto Entregable Objetivo (Estructura Central)

**4.1 Definición y Plantillas**
* Objeto de 50+ campos con arquitectura 3 capas (Funcional, Técnica, Fuentes).
* Enriquecimiento vía agentes y registro en Change Ledger.

---

## 5) Gestión del Conocimiento (Memoria Jerárquica)

**5.1 Organización en 3 capas (L1/L2/L3)**
* **L1 (Guía rápida):** Gatillos de escalado y máx 10 bullets.
* **L2 (Operativo):** Procedimientos y criterios.
* **L3 Core (Canónicas) / L3 Edge (Apoyo):** Fuentes base vivas (~30).

**5.2 Context Router**
* Dirige consultas dinámicamente según necesidad real (Regla D3).

---

## 8) Auditoría, Forense & Control de Calidad (QC)

**8.1 Auditoría por capas y QC Checklist**
* Pre-checks y Post-checks obligatorios.
* Checks: `uid`, `version`, `status (active|deprecated|archived)`, `refs_L3[]`, Gatillos de escalado.

**8.2 Rollback Automático**
* SNAPSHOT previo inmutable; reversión automática si fallan validaciones post-ejecución.

---

## 11) Auditoría Protector & Blindaje Mínimo

**11.1 Blindaje del Failover y Adaptación**
* **Incompatibilidad:** `ModelPolicyRegistry` con requisitos mínimos.
* **Estabilidad:** Límite de frecuencia de adaptaciones + ventanas de cambio.
* **Burocracia:** Plantillas de mínimos ultra-compactas (5-12 pasos máx).

---

## 🧾 12) CHECKLIST OPERATIVO DEL SISTEMA (v1.3 Integrated)

### A) Arranque del proyecto (una vez por proyecto)
* [ ] **Project Manifest** (1 página): objetivo, alcance, no-alcance, métricas de éxito, riesgos críticos.
* [ ] **DomainMap v1**: dominios → subdominios → cuadernos → docs L1/L2 → fuentes L3 core.
* [ ] **Convención de nombres única** aplicada globalmente.
* [ ] **Plantillas oficiales v1** registradas (L1, L2, L3, agentes, pipeline, Objeto Entregable).

### B) Por cada cuaderno (memoria jerárquica)
* [ ] **L3 Core/Edge** definido (fuentes canónicas + apoyo), versionado y con `status`.
* [ ] **L1 (guía rápida)**: ≤10 bullets + “cuándo NO usar L1” + refs explícitas a L3.
* [ ] **L2 (operativo)**: procedimientos, criterios, casos de uso + refs explícitas a L3.
* [ ] **Registro vivo** en NotebookLM actualizado con formato fijo.

### C) Por cada ejecución del sistema (trazabilidad)
* [ ] **Log LITE** generado. **Log FULL** si impacto alto o auditoría requerida.
* [ ] **`knowledge_depth_used`** registrado (1|2|3).
* [ ] **Refs cruzadas** entre logs ↔ campos del Objeto Entregable Objetivo.

### D) Control de calidad (QC mínimo)
* [ ] Cada doc tiene: `uid`, `version`, `status (active|deprecated|archived)`.
* [ ] L1/L2 incluyen `refs_L3[]` + fecha de última sincronización.
* [ ] Aplicada **Regla D3** (selección de profundidad por tipo de tarea).
* [ ] **Fuente canónica** definida por dominio (1–3 máx) y **SemVer** en plantillas.

### E) Auditoría forense por capas
* [ ] Superficial, Operativa y Profunda con reportes versionados y referencias exactas.

### F) Continuidad automática (Failover)
* [ ] Monitor de límites + `ModelFailoverManager`.
* [ ] Snapshots transaccionales + rehidratación validada.
* [ ] Registro del evento en logs, registro vivo y métricas de observabilidad.

### G) Sistema AXON adaptativo por capas, niveles y módulos
* [ ] `AxonOrchestrator`, `PolicyEngine`, `ModuleRegistry`, `ContextRouter`, `ChangePlanner`.
* [ ] Operaciones: Abstraer, Sustraer, Expandir, Argumentar, Pulir, Agregar/Editar.
* [ ] Snapshots (antes/después), dry-run, rollback y SemVer en módulos.

### H) Plantillas de mínimos (EMA) + Unidad Central de Control (UCC)
* [ ] EMA entrega plantillas de mínimos pasos (5-12 pasos máx). UCC registra movimientos en Change Ledger.
* [ ] Sincronización en tiempo real vía Update Broadcaster.
* [ ] Compliance Enforcer actúa como Gatekeeper preventivo.

---

**Mirror Verification Trace (FFRS-004):**
- **Protocol:** PROT-001 (Mirror Protocol)
- **Status:** 100% Literal Fidelity Verified (AXON v1.7)
- **Date:** 2026-02-11
