---
name: report-to-hq
description: Standardized method for Any Agent to submit a task completion report to Egeria.
tags: [reporting, communication, protocol, egeria]
---

# 📝 SKILL: report-to-hq (Global Standard)
**Nivel de Rigor:** ESTÁNDAR (Obligatorio)
**ID:** `SKILL-GLOBAL-001`
**Destino:** `hive/agents/egeria/inbox/`

## 1. PROPÓSITO
Permitir que cualquier agente (PULSAR, ORION, ETC.) notifique formalmente a Egeria sobre la finalización de una tarea, garantizando la **Trazabilidad Centralizada**.

## 2. ESTRUCTURA DEL REPORTE FORENSE (Deep-Log)
El agente debe generar un archivo Markdown con el siguiente template detallado:

```markdown
# 📨 MISSION REPORT: [Task Name]
**Agente:** [Nombre del Agente]
**Fecha:** [YYYY-MM-DD]
**ID Tarea:** [Task ID]
**Dependencia:** [Task anterior o Trigger]

## 1. Contexto Ejecutado
- **Objetivo:** [Qué se debía lograr]
- **Herramientas Usadas:** [Lista de tools/skills activadas]
- **Contexto de Entrada:** [Archivos leídos o inputs clave]

## 2. Decisiones y Razonamiento (Glass Box)
- **Algoritmo mental:** [Breve resumen del CoT/ToT usado]
- **Decisiones Críticas:** [Por qué se eligió A y no B]
- **Evaluación de Riesgo:** [Riesgo detectado vs mitigado]

## 3. Modificaciones (Diff Log)
- **[NEW]** [Archivo Creado]
- **[MOD]** [Archivo Editado - Breve descripción del cambio]
- **[DEL]** [Archivo Eliminado]

## 4. Gestión de Residuos (Para Egeria)
- **Artefactos Temporales:** [Lista de archivos intermedios que ya no sirven]
*Instrucción para Egeria:* "Por favor eliminar/archivar los ítems listados arriba."

## 5. Próximos Pasos (Handoff)
- **Estado Final:** [COMPLETO / PENDIENTE / BLOQUEADO]
- **Siguiente Agente Sugerido:** [Nombre]
```

## 3. PROTOCOLO DE ENTREGA
1.  **Generar:** Crear el archivo en `hive/agents/egeria/inbox/REPORT_[TIMESTAMP]_[AGENT].md`.
2.  **Notificar:** (Opcional) Mencionar en el chat "Reporte enviado a HQ".

---
**Certificado:** `skill_reporting_standard_v1`
