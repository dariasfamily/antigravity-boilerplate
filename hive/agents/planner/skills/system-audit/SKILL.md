---
name: system-audit
description: Scan the file system to verify adherence to ACP v1.0 and SMP v1.0 protocols.
tags: [audit, compliance, structure, analysis]
---

# 🕵️ SKILL: system-audit (Certified v1.0)
**Nivel de Rigor:** SUPREMO
**ID:** `SKILL-PLANNER-001`

## 1. PROPÓSITO
Escanear la estructura de archivos (`hive/`) para detectar desviaciones de la norma.

## 2. METODOLOGÍA
1.  **Existence Check:** ¿Existen `agents_registry.md`, `task.md`?
2.  **Integrity Check:** ¿Cada agente tiene `FINAL_SSv0` y `datasheet`?
3.  **Residue Check:** ¿Hay archivos temporales o logs antiguos?

## 3. OUTPUT
Reporte de Auditoría (`AUDIT_LOG_YYYY-MM-DD.md`) con lista de violaciones y correcciones sugeridas.
