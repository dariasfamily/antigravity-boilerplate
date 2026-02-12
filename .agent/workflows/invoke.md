---
description: Cómo invocar y colaborar con agentes de la colmena (Hive Agents)
---

# Protocolo de Invocación de Agentes

Para activar a un agente y sus habilidades dentro de cualquier espacio de trabajo de AXON, utiliza los siguientes patrones:

## 1. Invocación Directa (Llamado Nominal)
Simplemente dirígete al agente por su nombre y describe la tarea. Yo (como orquestador) asumiré su "sombrero" y cargaré su configuración.

- **Ejemplo Thalia:** "Thalia, audita mis fuentes del cuaderno Semilla v0."
- **Ejemplo Orion:** "Orion, genera un manifiesto estratégico para este proyecto."

## 2. Invocación de Habilidad (Skill-Based)
Si conoces la habilidad específica pero no el agente, puedes pedir la acción. El sistema buscará en el `registry.json` de skills para encontrar al ejecutor.

- **Ejemplo:** "Usa la skill `notebooklm_mastery` para sincronizar mi inventario."

## 3. Comandos Rápidos (Slash Commands)
He configurado atajos tipo `/slash` para tareas recurrentes:

- `/thalia-sync`: Inicia un inventariado completo de fuentes.
- `/orion-plan`: Lanza el workflow de planificación estratégica.

## 4. Colaboración Cross-Agente (Auto-Invocación)
Los agentes se llaman entre sí automáticamente según sea necesario:
- **ORION** invocará a **THALIA** si le falta contexto para una estrategia.
- **CALLIOPE** invocará a **THALIA** para obtener las últimas especificaciones antes de codear.

---
// turbo-all
Para ver el estado de tus agentes activos, puedes pedirme el `Hive Status`.
