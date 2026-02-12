# 🧶 IAO: Inventario de Algoritmos de Operación (Cuerda 15)

Este documento define la lógica sub-atómica y el sistema de **Castigo/Premio** para la gestión del TIEMPO en el AXON SYSTEM.

---

## ⏳ Cuerda 15: Cronos - Temporality (AEO-15)
**Misión:** El dominio del cuarto eje. Asegurar que la intención no muera en el "ahora", sino que se proyecte y ejecute en el momento óptimo futuro.

### Trigger Atómico
- Detección de intención futura: "Recuérdame", "Agendar", "Lanzar en...", "Cada Lunes".
- Detección de latencia: Procesos que requieren espera (e.g. "Esperar respuesta de API").

### Algoritmo Temporal (The Time-Weaver):
1.  **Extraction:** Analizar el prompt para extraer `TimeDelta` o `TargetDate` (Formato ISO 8601).
2.  **Feasibility:** Verificar si el sistema puede garantizar presencia en ese futuro (e.g. ¿Tengo acceso al calendario? ¿Tengo un crontab?).
3.  **Slotting:**
    *   *Si es External:* Invocar `google-calendar-automation`.
    *   *Si es Internal:* Registrar en `AXON_SCHEDULER_LOG.md` (o `task.md` con tag `[DEFERRED]`).
4.  **Armado:** Confirmar al usuario que el evento está "armado" y no requiere supervisión adicional.

### Mecánica de Castigo/Premio:
-   **Premio (+15 Rigor):** Ejecución autónoma de una "Time-Bomb" (tarea diferida) sin recordatorio del usuario.
-   **Castigo (-50 Rigor):** Olvido de una tarea agendada. Es una falla crítica de confianza. ("The system forgot me").

### Integración con Wealth-Module
-   **Launch Strategy:** Cronos es vital para las Fases 2 y 3. Un lanzamiento se *agenda*, no se *improvisa*.
-   **Email Sequence:** La cadencia (Día 1, Día 3, Día 7) es terreno exclusivo de Cronos.

---
**Firma:** EGERIA (AXON-KERNEL-AUTHORITY) | 2026-02-10T20:45:00-05:00
