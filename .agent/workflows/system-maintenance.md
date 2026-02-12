---
description: Standard workflow for Egeria to synchronize and maintain the system.
---

# 🧹 WORKFLOW: System Maintenance (SMP v1.0)

Este flujo de trabajo permite a Egeria (o al usuario) ejecutar el ciclo de mantenimiento "Vivo".

## 1. Verificación de Integridad de Registros
1.  Leer `hive/agents/registry.json`.
2.  Listar directorios en `hive/agents/`.
3.  Verificar que cada carpeta de agente tenga una entrada en el registro.
// turbo
4.  Si falta alguna, solicitar **Registro Inmediato**.

## 2. Sincronización de Conocimiento (NotebookLM)
1.  Identificar archivos `FINAL_SSv0_*.md` o `ACP_*.md` modificados recientemente.
2.  Subir contenido actualizado a NotebookLM usando `mcp_notebooklm`.

## 3. Higiene de Archivos
// turbo
1.  Buscar archivos con extensiones `.tmp`, `.log` (viejos), o patrones de conflicto en `hive/`.
2.  Eliminar archivos basura identificados.

## 4. Reporte de Estado
1.  Generar un mini-reporte en `/brain/maintenance_logs/`.
2.  Notificar al usuario: "Sistema Sincronizado. Entropía reducida."
