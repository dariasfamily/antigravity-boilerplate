# Plan de Implementación: Upgrade de Pulsar a Estándar L-6 (PUSA v1.2)

## 0. Contexto
El agente **Pulsar** opera actualmente bajo un estándar v1.0 (Architecture 3.2). Para comunicarse efectivamente con Egeria v1.3 y el resto del Hive, debe ser elevado al Estándar Maestro L-6, incorporando las 15 Cuerdas (IAO) y la integración con el Wealth-Module.

## 1. Objetivo Verificable
Transformar la definición de Pulsar en `hive/agents/pulsar/` para que cumpla al 100% con el `AXON_AGENT_SPEC_TEMPLATE.md` v1.2.

## 2. Cambios Propuestos

### A. Migración de Identidad (Cuerdas 1-4)
- **Archivo:** `hive/agents/pulsar/PULSAR_V1.2_MASTER_SPEC.md`
- **Acción:** Crear nuevo archivo basado en el Template v1.2.
- **Detalle:**
    - Definir [ID-01] Mimetismo: Estilo "Ingeniero de Prompts de Élite".
    - Definir [ID-02] Policía: Prohibición absoluta de síntesis de información.
    - Definir [ID-03] Pre-Audit: Verificar `semantic-anchor` antes de cada output.

### B. Sincronización Intel & Wealth (Cuerdas 5-8)
- **Detalle:**
    - [ID-05] Wealth-Filter: Pulsar reduce costos de tokens y latencia (Eficiencia Operativa).
    - [ID-06] Sync-Strategy: Conexión con NotebookLM de Ingeniería de Prompts.
    - [ID-07] Gap-Trigger: Umbral de confianza 0.9.

### C. Conexión Hive (Cuerdas 9-12)
- **Detalle:**
    - [ID-09] Handshake-Key: `PULSAR-NON-SYNTHESIS-V1.2`.
    - [ID-10] Voto: Peso 4 (Área Técnica/Estructural).

### D. Persistencia & Cronos (Cuerdas 13-15)
- **Detalle:**
    - Integración con la Cuerda 15 (Cronos) para agendar revisiones de prompts complejos.

### E. Archivos a Modificar/Crear
#### [NEW] `hive/agents/pulsar/PULSAR_V1.2_MASTER_SPEC.md`
Archivo maestro que reemplaza conceptualmente a `FINAL_SSv0_PULSAR.md`.

#### [MODIFY] `hive/agents/pulsar/system_prompt.md`
Actualizar encabezado para reflejar versión v1.2 y nuevas directivas de Cuerdas.

#### [DELETE] (Opcional - Deprecated)
`FINAL_SSv0_PULSAR.md` (Se mantendrá como archivo histórico/legacy por seguridad, renombrado a `_LEGACY_FINAL_SSv0_PULSAR.md`).

## 3. Plan de Verificación
1.  **Validación Estructural:** Verificar que `PULSAR_V1.2_MASTER_SPEC.md` contiene las 14 secciones del Template + Cuerda 15.
2.  **Validación de Identidad:** Verificar que el System Prompt invoca la "Policía de No-Síntesis".
3.  **Cross-Check:** Egeria verificará el Handshake Key en su registro simulado.

## User Review Required
> [!IMPORTANT]
> Este cambio redefine la "constitución" de Pulsar. Su comportamiento será más estricto en cuanto a la conservación de información (No-Síntesis).
