---
description: Ejecutar sincronización rápida de NotebookLM vía Thalia
---

# Thalia Sync Workflow

Este comando activa a **THALIA** con su skill `notebooklm_mastery` para auditar y sincronizar el cuaderno activo.

// turbo
1. Cargar configuración de Thalia desde `hive/agents/thalia/config.json`.
// turbo
2. Ejecutar `notebook_get` para el cuaderno especificado.
// turbo
3. Generar inventario categorizado en `hive/integrations/notebooklm/backups/`.
// turbo
4. Sincronizar el CSV maestro.

**Uso:** `/thalia-sync [notebook_id]`
