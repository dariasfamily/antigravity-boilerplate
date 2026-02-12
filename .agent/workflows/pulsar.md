---
description: Prototipo de Creación de Agentes mediante Refinamiento Recurrente (SS v0 3.2)
---

# 🛰️ Workflow: pulsar (Protocolo de Refinamiento Recurrente)

Este workflow estandariza la creación de nuevos agentes en el ecosistema AXON, garantizando la conservación de información y el rigor estratificado.

### 1. Inicialización de Semilla (LITE 3.2)
- Aplicar el archivo de espejo `knowledge_mirror/seeds/lite_3.2.md`.
- Definir el documento `[AGENT_ID]/LITE_3.2_INTENT.md`.
- **Objetivo**: Validar viabilidad, clasificación y propósito sistémico.

### 2. Estructuración Maestra (FULL 3.2)
- Aplicar el archivo de espejo `knowledge_mirror/seeds/full_3.2.md`.
- Definir el documento `[AGENT_ID]/FULL_3.2_ARCHITECTURE.md`.
- **Eriquerimiento**: Consultar el cuaderno de NotebookLM relacionado para llenar los módulos de "Data" y "Motor AI" con conocimiento específico del dominio.

### 3. Orquestación Híbrida (DOH v1.1)
- Aplicar la lógica de la Semilla Híbrida (`hybrid_1.0.md`).
- Decidir qué módulos requieren rigor **SUPERIOR** (ej. Lógica de razonamiento) y cuáles permanecen en **FULL** o **LITE**.
- **Acción**: Realizar preguntas específicas en el chat de NotebookLM para pulir los vacíos detectados en la fase FULL.

### 4. Generación de Activos Finales
- Crear `config.json` (Metadatos).
- Crear `system_prompt.md` (Identidad Operativa).
- Crear `README.md` (Ficha de Agente).
- Registrar el nuevo agente en el `Global Registry` del sistema.

### 5. Auditoría de Integridad (GAP v1.0)
- Aplicar el protocolo oficial `GAP v1.0`.
- Generar el reporte `AUDIT_REPORT_v1.0.md` en la carpeta del agente.
- **Mandatorio**: Verificar que no existe "pérdida de intención" (`INT-###`).

### 6. Validación y Cierre
- Crear el `walkthrough.md` del agente.
- Generar el Hash SHA-256 final para sellar la constitución del agente.

// turbo
3. mkdir hive/agents/[AGENT_ID]
