# AXON AGENT SYSTEM: INTEGRATION & OPERATIONS SPEC
**Agents:** ORION (Analytical/Strategic) & CALLIOPE (Creative/Execution)
**Version:** 1.0.0
**Target**: Full Operational Symbiosis

---

## 1. Claves de la Simbiosis (Executive Summary)
El sistema opera en un flujo lineal con retroalimentación circular.
*   **ORION (El Cerebro):** Decide *qué* decir y *por qué* (basado en datos y tendencias).
*   **CALLIOPE (La Voz):** Decide *cómo* decirlo (basado en psicología y retención).

> **Regla de Oro:** ORION nunca escribe guiones. CALLIOPE nunca decide la estrategia.

---

## 2. Matriz Comparativa (Agent Comparison)

| Aspecto | ORION (Agente Analítico) | CALLIOPE (Agente Creativo) |
| :--- | :--- | :--- |
| **Rol** | Estratega de Datos y Tendencias | Guionista y Psicólogo de Masas |
| **Input Principal** | Tendencias (Google Trends, RRSS), Noticias, Notas de Usuario. | Briefs Estructurados (JSON) de ORION. |
| **Output Principal** | `content_brief.json` (Tema, Ángulo, Fuentes). | `script_final.md` (Guion Técnico, Visuales, Audio). |
| **Contexto (Memoria)** | Base de Datos de Métricas Históricas, Identidad de Marca. | Diccionarios Sensoriales, Manuales de Persuasión. |
| **Información Privada** | Datos crudos de tendencias, análisis de competencia (Raw Data). | Reglas internas de redacción, "Power Words". |
| **Información Compartida** | **Identity_Vault** (Tono de marca, Avatar de Audiencia). | **Feedback_Logs** (Qué guiones funcionaron y por qué). |
| **Métrica de Éxito** | Relevancia del Tema (Trend Score). | Retención (Watch time) y Click-Through (CTR). |
| **Dashboard (Vista)** | "Radar de Tendencias" (Mapas de calor, Listas). | "Estudio de Producción" (Editor de Guiones, Previsualización). |

---

## 3. Protocolo de Intercambio de Datos (The Handshake)

### A. El Puente (The Bridge)
El archivo `inter_agent_comm/orion_to_calliope.json` es la única verdad.

```json
{
  "transmission_id": "uuid_v4",
  "timestamp": "ISO8601",
  "priority": "HIGH",
  "strategic_core": {
    "topic": "IA en Medicina",
    "angle": "Contrarian: Por qué los médicos NO desaparecerán",
    "target_emotion": "Alivio / Esperanza",
    "evidence_links": ["url1", "url2"]
  },
  "constraints": {
    "format": "TIKTOK",
    "duration_target": "60s",
    "forbidden_words": ["ChatGPT", "Futuro"]
  }
}
```

### B. El Bucle de Retorno (Feedback Loop)
Si CALLIOPE detecta que el Brief de ORION es inviable (ej. tema aburrido imposible de viralizar), genera un `error_report`:
*   **Error Code:** `NARRATIVE_DEAD_END`
*   **Action:** Solicitar nuevo ángulo a ORION.

---

## 4. Estandarización de Contexto y Almacenamiento

### Sistema de Archivos (El "Vault")
Todas las operaciones ocurren en la carpeta `brain/active_operation/`:

1.  `/inputs/`: Raw data ingresada por usuario.
2.  `/shared_context/`:
    *   `brand_voice.md` (Tono, Estilo - Leido por AMBOS).
    *   `audience_avatar.md` (Quién es el cliente - Leido por AMBOS).
3.  `/agent_memory/orion/`: Historial de tendencias detectadas.
4.  `/agent_memory/calliope/`: Historial de "Winning Hooks" (Ganchos ganadores).
5.  `/outputs/`: Guiones finales listos para producción.

### Estandarización de Métricas
Ambos agentes reportan al dashboard usando el mismo esquema de métricas normalizadas (0-100):
*   `Confidence_Score`: Qué tan seguro está el agente de su output.
*   `Processing_Time`: Latencia.
*   `Resource_Usage`: Tokens consumidos (costo).

---

## 5. Especificación del Dashboard (UI Integration)

El Dashboard actúa como la interfaz de control (Command Center).

### Sección 1: La Sala de Guerra (Strategy Room - ORION)
*   **Vista:** Informativa / Analítica.
*   **Componentes:**
    *   Gráfico de Tendencias en Tiempo Real.
    *   Lista de "Topic Opportunities" (Oportunidades de Tema).
*   **Acción Usuario:** Aprobar/Rechazar temas propuestos por ORION. (Solo los aprobados pasan a CALLIOPE).
*   **editable:** False (No se editan las tendencias, se seleccionan).

### Sección 2: El Taller (Writer's Room - CALLIOPE)
*   **Vista:** Operativa / Editor.
*   **Componentes:**
    *   Visor de Guion (Markdown renderizado).
    *   Teleprompter Preview.
    *   Checklist de Validación (Semáforos: Gancho 🟢, Cuerpo 🟡, CTA 🟢).
*   **Acción Usuario:** Editar texto del guion, regenerar secciones (ej. "Dame otro Gancho").
*   **editable:** True (El usuario es el editor jefe).

### Sección 3: Administración del Sistema (Admin Vault)
*   **Vista:** Técnica / Mantenimiento.
*   **Visible solo para:** Superadmin.
*   **Contenido:**
    *   Raw Logs de los Agentes.
    *   Costos de API.
    *   Ajuste de Prompts (Edición de `CALLIOPE_DEFINITION.md`).
    *   Gestión de Archivos del "Vault".

---

## 6. Módulo de Autocorrección y Mejora (Self-Healing)

### Detector de Errores (The Sentinel)
Un script supervisor ('Sentinel') vigila el intercambio:

1.  **Detección de Alucinación:**
    *   Si CALLIOPE cita datos no provistos por ORION $\rightarrow$ ALERTA.
    *   Acción: Inyectar aviso en el guion: `[VERIFICAR DATO]`.

2.  **Control de Calidad (Quality Gate):**
    *   Si `Script_Length` > 200 palabras $\rightarrow$ Rechazo Automático.
    *   Acción: Re-enviar a CALLIOPE con instrucción "CONDENSE_TO_150_WORDS".

3.  **Aprendizaje (Reinforcement):**
    *   Si el usuario edita masivamente un guion $\rightarrow$ Guardar el "diff" en `/agent_memory/calliope/learning_set.json`.
    *   Futuras generaciones consultarán este set para imitar el estilo del usuario.
