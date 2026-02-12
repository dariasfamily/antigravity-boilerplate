# Plan de Routing Inteligente (Gemini Router)

## Objetivo
Optimizar costes y latencia seleccionando dinámicamente el modelo adecuado para cada tarea.

## Modelos Disponibles (Bleeding Edge)
1.  **Gemini 3.0 Flash / Gemini 3.0 Pro (Low)**:
    *   *Uso*: Alta velocidad, bajo coste.
    *   *Ideal para*: Tareas simples, resúmenes cortos, clasificación, extracción de datos, "chat ligero".
2.  **Gemini 3.0 Pro (High) / Claude 4.5 Sonnet (Thinking)**:
    *   *Uso*: Razonamiento máximo, "Thinking Mode".
    *   *Ideal para*: Coding complejo, arquitectura, análisis de documentos largos, planificación estratégica.

## Reglas de Router (Lógica Propuesta)

### 1. Clasificación por Complejidad del Prompt
El sistema analizará el input del usuario para detectar palabras clave o estructuras complejas.

| Nivel | Criterio | Modelo Asignado |
| :--- | :--- | :--- |
| **Bajo** | "Resume esto", "Traduce", "¿Qué es...?", Saludos | **Flash** |
| **Medio** | "Escribe un correo sobre...", "Explica este concepto" | **Flash** (con Prompt Eng.) |
| **Alto** | "Genera código para...", "Analiza este PDF", "Planifica una estrategia" | **Pro** |

### 2. Clasificación por Herramientas (Tool Use)
*   **Si usa Rube/Composio (Social/Google)**: Depende de la acción.
    *   *Leer correo*: **Flash**.
    *   *Redactar respuesta diplomática*: **Pro**.
*   **Si usa Perplexity (Research)**: **Pro** (para sintetizar la investigación).
*   **Si usa Coding (Vercel/Supabase)**: **Pro** (siempre para código).

### 3. Implementación futura (Fase 6)
Crearemos un wrapper simple (`SmartLLMClient`) en el backend:

```typescript
async function smartRoute(prompt: string, context: any) {
  const complexity = analyzeComplexity(prompt); // Returns LOW, MED, HIGH
  if (complexity === 'HIGH' || context.requiresReasoning) {
    return callGeminiPro(prompt);
  }
  return callGeminiFlash(prompt);
}
```

## Siguientes Pasos
1.  Aprobar esta lógica.
2.  Definir los límites de tokens para "Contexto Largo" (ej: >10k tokens -> Pro).
