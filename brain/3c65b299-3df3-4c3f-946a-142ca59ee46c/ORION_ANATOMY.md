# Anatomía del Agente ORION (System Analysis)

Este documento disecciona la arquitectura técnica y funcional del agente **ORION** basándose en el análisis del código fuente actual (`nightly_protocol.py`, `agent_types.ts`, `orion_logic.ts`, `SKILL.md`).

---

## 1. ¿Qué recibe Orion? (Inputs y Entradas)

Orion consume información de tres fuentes primarias para construir su contexto estratégico. No es un agente pasivo; busca activamente estos datos.

### A. Entradas Estructuradas (`OrionIngest`)
Definido en `src/types/agent_types.ts`. Es la carga útil técnica que activa una ejecución manual.
*   **ID**: Identificador único de solicitud.
*   **Timestamp**: Marca de tiempo de la ejecución.
*   **Directive (Directiva)**: Instrucción explícita del usuario (ej: "Investigar tendencias sobre 'Wealth Engineering'").
*   **Tools Used**: Registro de herramientas permitidas para esta sesión.

### B. Entradas de Contexto (Persistentes y Dinámicas)
Definido en `nightly_protocol.py`.
1.  **BRAND_DNA.md (La Constitución)**:
    *   **Ubicación**: `<AppData>/brain/BRAND_DNA.md` (Simulado)
    *   **Datos Clave**: Tono de voz, Pilares de contenido, "Golden Record".
    *   **Función**: Actúa como filtro de identidad. Si una tendencia no encaja con el ADN, Orion la descarta.
2.  **Writers Room (Intención del Usuario)**:
    *   **Tipo**: Dinámico (Ej: Google Doc / Notas).
    *   **Datos**: Notas de la semana, focos de atención temporal.
    *   **Ejemplo**: "Esta semana enfócate en 'Sistemas', olvida 'Motivación'".

### C. Opciones de Entrada Editables
Al ejecutar el agente manualmente (vía Dashboard o API), el usuario puede sobreescribir:
*   `active_focus`: Forzar un pilar específico.
*   `tone_override`: Ajuste temporal de personalidad (ej: "Más agresivo").
*   `search_depth`: Profundidad de la investigación (Deep vs Fast).

---

## 2. ¿Qué hace? (Función y Definición Paso a Paso)

Función Primaria: **"Investment Analyst of Attention"** (Analista de Inversión de Atención).
Su objetivo no es crear contenido, sino **validar ángulos estratégicos** antes de escribir una sola palabra.

### El Flujo de Ejecución (`Dissection of nightly_protocol.py`)

1.  **Ingesta de Contexto (Context Ingestion)**
    *   Lee `BRAND_DNA.md` para calibrar la personalidad.
    *   Lee las notas del usuario (Writers Room) para alinear la intención.

2.  **Síntesis de Consulta (Query Synthesis)**
    *   Combina *Pilar Activo* + *Nota de Usuario*.
    *   Genera una "Search Query" optimizada (ej: *"Latest trends in Wealth Engineering and Automation"*).

3.  **Investigación de Mercado (Oracle Investigation)**
    *   **Acción**: Consulta a Perplexity/Rube (Herramienta Externa).
    *   **Lógica**: Busca fuentes de alta autoridad (arXiv, TechCrunch) vs ruido social (Reddit).
    *   **Filtro**: Clasifica resultados por "Viral Score" y relevancia.

4.  **Validación Lógica (`orion_logic.ts`)**
    *   **P.O.S.E. Check**: Verifica si el tema cumple Problem, Obstacle, Solution, Evidence.
    *   **Niche RPM Calc**: Calcula el valor económico estimado (`predictNicheRPM`).
    *   **Psychology Scan**: Analiza si el gancho tiene triggers mentales (`analyzeHookPsychology`).

5.  **Generación del Brief (The Briefing)**
    *   No escribe el guion. Escribe la **Estrategia**.
    *   Propone: Tópico, Gancho, Ángulo Contrarian, Formato sugerido.
    *   **Salida**: Objeto JSON `OrionOutput` enviado a la cola de aprobación.

---

## 3. ¿Qué controla y gobierna su Skill? (Control de Operaciones)

El gobierno de Orion está definido en `src/skills/brand_orion/SKILL.md`.

*   **Rol**: Estratega Jefe.
*   **Driver**: `python` (Ejecución de scripts de análisis de datos).
*   **Gobernador (Trigger)**:
    *   **CRON_NIGHTLY**: Se ejecuta automáticamente cada noche para preparar el trabajo del día siguiente.
    *   **USER_MANUAL**: Invocación directa para investigar un tema específico.
*   **Límites (Constraints)**:
    *   **Rule of 3**: Si falla 3 veces en validar un tema, lo marca como "Dead End".
    *   **Identity Lock**: No puede proponer temas que violen el `BRAND_DNA`.

---

## 4. Archivos que Regulan este Agente

La "Columna Vertebral" de Orion en el sistema de archivos:

| Tipo | Archivo | Función |
| :--- | :--- | :--- |
| **Definición de Tipos** | `src/types/agent_types.ts` | Define la estructura estricta de sus Inputs (`OrionIngest`) y Outputs (`OrionOutput`). Contrato de interfaz. |
| **Lógica de Negocio** | `src/utils/orion_logic.ts` | Contiene las matemáticas y heurísticas (Cálculo de RPM, Validación de tendencias). El "Cerebro". |
| **Punto de Entrada API** | `src/app/api/agents/orion/route.ts` | Permite al frontend (Dashboard) comunicarse con Orion. |
| **Skill Manifest** | `src/skills/brand_orion/SKILL.md` | Documentación maestra, instrucciones de uso y metadatos para el sistema de agentes. |
| **Ejecutable (Driver)** | `src/skills/brand_orion/scripts/nightly_protocol.py` | El script real que realiza la orquestación de la investigación. |

---

## 5. Relaciones del Sistema

Orion es el **Nodo Inicial** de la cadena de producción.

1.  **Relación Ascendente (Input Sources)**:
    *   **Usuario (Comandante)**: Define la intención macro.
    *   **Mundo Exterior (Internet)**: Vía Perplexity/Rube para datos de mercado.

2.  **Relación Descendente (Outputs)**:
    *   **CALLIOPE (Writer)**: Orion *alimenta* a Calliope. Calliope no puede trabajar sin un `Strategic Brief` aprobado por Orion.
    *   Salida directa: `OrionOutput` -> Input de Calliope.

3.  **Relación Lateral (Peers)**:
    *   **System Context (Supabase)**: Orion registra sus decisiones en el `Activity Log` para que otros agentes (como Argus) tengan contexto histórico de *por qué* se eligió un tema.
