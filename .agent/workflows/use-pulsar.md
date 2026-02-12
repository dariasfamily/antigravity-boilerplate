---
description: How to use PULSAR to transmute ideas into technical prompts
---

## 🛰️ PROTOCOLO PULSAR: Transformación de Intención

Este workflow define el uso de PULSAR como un "Upstream Provider" de prompts para otros agentes o tareas de Darias.

### 1. Invocación de la Idea
- **Entrada**: Una idea vaga o intención latente expresada en lenguaje natural.
- **Acción**: Llamar a PULSAR referenciando la idea.
- **Regla**: Prohibido usar jerga técnica en el input; PULSAR se encarga de la traducción.

### 2. Ciclo de Refinamiento (PULSAR-Core)
- **Cerebro (SUPERIOR)**: PULSAR aplicará automáticamente:
    - **Bootstrap Semántico**: Limpieza de ruido.
    - **Selección de Framework**: (CO-STAR para activos, ToT para problemas).
    - **Chain-of-Thought**: Descomposición lógica.

### 3. Validación de Retro-Traducción
- PULSAR presentará una "Vista Previa de Coherencia" preguntando: "¿Esto captura el 100% de tu intención original?".
- Solo se procede si Darias confirma la **Fidelidad Semántica**.

### 4. Entrega y Parámetros
- **Salida**: El prompt optimizado + Hiperparámetros sugeridos (Temp, Top-P).
- **Relación**: El prompt resultante puede ser inyectado automáticamente en procesos de **Orion**, **Calliope** o **Egeria**.

### 5. Registro Histórico
- Cada transformación exitosa debe quedar registrada en `hive/agents/pulsar/history/[YYYY-MM-DD]-[ID_IDEA].md` para aprendizaje futuro.
