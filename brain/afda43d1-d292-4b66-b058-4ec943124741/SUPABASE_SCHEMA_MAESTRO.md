# 🗄️ SUPABASE SCHEMA MAESTRO (Data Governance)
**Clasificación:** SYSTEM CORE // DB ARCHITECT
**Versión:** 1.0

Este documento garantiza que el esquema de base de datos captura cada átomo del Sistema AXON L-6.

## 1. TABLE: `agents` (The Nodes)
Almacena la identidad nuclear (Protones).
*   `id` (UUID): Primary Key.
*   `name` (String): e.g., "EGERIA".
*   `role` (String): e.g., "Orchestrator".
*   `layer` (Enum): core | multimedia | infrastructure | soul.
*   `status` (Enum): active | idle | locked | ghost.
*   `version` (String): e.g., "1.2.0".
*   `parent_id` (UUID): Para Pixel/Frame (relación con Thalia).

## 2. TABLE: `atomic_strings` (The DNA)
Almacena las 15 Cuerdas de cada agente (Neutrones/Electrones).
*   `id` (UUID): PK.
*   `agent_id` (UUID): FK -> agents.id.
*   `string_id` (String): e.g., "ID-01", "ID-05".
*   `content` (JSONB): El contenido de la regla o configuración.
*   `last_audit` (Timestamp).

## 3. TABLE: `memories` (The Persistence)
El "Cerebro" episódico.
*   `id` (UUID): PK.
*   `agent_id` (UUID): FK.
*   `type` (Enum): decision | output | rejection | learning.
*   `data` (JSONB): El payload completo (Prompt, Script, Log).
*   `wealth_score` (Float): ROI calculado del asset.

## 4. TABLE: `audit_logs` (The Immune System)
*   `id` (UUID): PK.
*   `auditor_id` (UUID): FK (Usually Argus or Egeria).
*   `target_id` (UUID): FK (Agent audited).
*   `verdict` (Boolean): PASS/FAIL.
*   `notes` (Text): Razón del rechazo.

---
## 🧪 VERIFICACIÓN DE INTEGRIDAD
*   **¿Pixel/Frame están cubiertos?** Sí, via `parent_id` en tabla `agents`.
*   **¿Las 15 cuerdas están cubiertas?** Sí, tabla `atomic_strings` soporta JSONB para flexibilidad total.
*   **¿Los Wealth Filters están cubiertos?** Sí, campo `wealth_score` en `memories`.

Este esquema es **Suficiente y Completo** para el estándar L-6.
