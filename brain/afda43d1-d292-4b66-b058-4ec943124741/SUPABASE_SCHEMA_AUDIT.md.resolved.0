# 🔍 SUPABASE SCHEMA AUDIT: V5.3 vs V6.0 (Maestro)
**Target:** `workspaces/Proyecto MENISCO/dashboard-v3/supabase`
**Fecha:** 2026-02-10

Esta auditoría mapea el estado actual (V5.3 Diamond Cut) contra el Protocolo L-6 Maestro.

## 📊 COMPARATIVA DE ESTRUCTURA

| Componente | V5.3 (Actual) | V6.0 (Maestro L-6) | Estado | Acción Req. |
| :--- | :--- | :--- | :--- | :--- |
| **Identity** | `ag_agent_registry.id` | `agents.id` | ⚠️ Divergente | Renombrar o Alias View |
| **Atomic DNA** | `config_schema JSONB` | `table: atomic_strings` | ❌ Falta Tabla | **CREATE TABLE** |
| **Logic** | `ag_logic_trace` | `ag_logic_trace` | ✅ Compatible | Mantener |
| **Memoria** | `ag_agent_memory` | `memories` | ⚠️ Divergente | Unificar Nomenclatura |
| **Sub-Agentes**| *No Soportado* | `parent_id` column | ❌ Brecha Crítica | **ALTER TABLE** |

## 🚨 HALLAZGOS CRÍTICOS (GAP ANALYSIS)

### 1. The "Sub-Agent" Blindspot
La V5.3 no tiene concepto de jerarquía (`parent_id`).
*   **Riesgo:** Pixel y Frame flotarían como agentes huérfanos sin conexión a Thalia.
*   **Fix:** `ALTER TABLE ag_agent_registry ADD COLUMN parent_id text REFERENCES ag_agent_registry(id);`

### 2. The "15 Strings" Granularity
La V5.3 usa un blob JSON (`config_schema`). El L-6 exige auditoría por Cuerda.
*   **Riesgo:** Imposible auditar solo el "Wealth Filter" sin parsear todo el JSON.
*   **Fix:** Crear tabla relacional `ag_atomic_strings` para atomizar la configuración.

### 3. Nomenclatura "Nucleus" vs "Axon"
*   V5.3 usa prefijo `ag_` (Agnostic/Antigravity).
*   V6.0 debe mantener `ag_` para retro-compatibilidad, pero actualizando los ENUMs.

---

## 🛠️ ESTRATEGIA DE MIGRACIÓN (SAFE PATH)
No haremos `DROP TABLE`. Haremos `ALTER` y `CREATE IF NOT EXISTS`.

1.  **Backup:** Snapshot actual.
2.  **Schema Evol:**
    *   Añadir `parent_id` a registry.
    *   Crear `ag_atomic_strings`.
    *   Actualizar ENUM `ag_agent_status` (añadir `L6_LOCKED`).
3.  **Data Migration:**
    *   Insertar los 11 Agentes L-6 en `ag_agent_registry`.
    *   Poblar `ag_atomic_strings` con los datos de los Specs MD.

**Veredicto:** La base V5.3 es sólida (Titanium), pero necesita cirugía de precisión para soportar la anatomía L-6.
