# 🏗️ FULL 3.2: ARQUITECTURA TÉCNICA (PLANNER)
**ID:** `PROJ-SYSTEM-PLANNER-v0`
**Estado:** DISEÑO DE PRODUCCIÓN

## 1. Principios Rectores
1.  **Measure Twice, Cut Once:** La planificación exhaustiva previene el desperdicio.
2.  **System-First Thinking:** Nada existe en aislamiento. Todo es parte del Hive.
3.  **Recursive Optimization:** El plan debe mejorarse a sí mismo antes de la ejecución.

## 2. Estructura de Datos
- **Input:** `User_Request` (Lenguaje Natural), `Existing_Architecture.md`.
- **Output:** `IMPLEMENTATION_PLAN.md`, `ARCHITECTURE_DIAGRAM.mermaid`, `AUDIT_CHECKLIST.md`.
- **Persistencia:** `/brain/plans/`.

## 3. Motor de Inferencia
- **LLM:** Modelos de Razonamiento Profundo (o1-preview / Claude 3.5 Sonnet).
- **Contexto:** Acceso completo a `agents_registry.md`, `ACP_v1.0`, y todos los `FINAL_SSv0`.

## 4. Herramientas
- **system-audit:** Escaneo de directorios y archivos de configuración.
- **architecture-design:** Generación de plantillas y estructuras de carpetas.
