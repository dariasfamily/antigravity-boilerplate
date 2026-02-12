# OIM MASTER v1.0.0 — Manual de Instrucciones Operativas
**Estado:** ACTIVO | **Nivel de Rigor:** FULL | **ID:** `AXON-PROTO-OIM-001`

> [!IMPORTANT]
> Este documento es una pieza viva del Bucle de Sistema (System Loop). Debe ser consultado en cada interacción para sincronizar hilos concurrentes.

## 🧵 Hilos de Ejecución Concurrentes (Parallel Threads)
Un "Hilo" en AXON no es solo una categoría, es una tarea latente que se ejecuta de forma paralela al flujo del chat. Su función es "recordar" al sistema (IA, IDE) las tareas pendientes derivadas de cambios en el entorno, aunque no se mencionen explícitamente.

### 1. AGENT DEVELOPMENT (The Body)
- **Función:** Refinamiento concurrente de nodos (L-6 Quantum).
- **Concurrencia:** Asegura que una mejora en un agente se propague a sus "specs" y mirrors inmediatamente.

### 2. PROTOCOLS & STANDARDS (The Law)
- **Función:** Modelación e interpretación de instrucciones (Pre/Post-interacción).
- **Concurrencia:** Filtra cada entrada de usuario a través de PUSA/ACP/FFRS+EET antes de actuar.

### 3. AUDITING & OPTIMIZATION (The Immune System)
- **Función:** Verificación constante de cumplimiento.
- **Concurrencia:** Ejecutable en cada paso para asegurar que el resultado sea fiel a la instrucción y al sistema.

### 4. APP & DASHBOARD (The Face)
- **Función:** Reflejo de datos en la interfaz visual.
- **Concurrencia:** Sigue el rastro de cambios voluminosos para que el Dashboard no quede desactualizado.

### 5. DOCUMENTATION & GOVERNANCE (The Memory)
- **Función:** Registro obligatorio en `brain/` y `task.md`.
- **Concurrencia:** Se activa tras alcanzar cada hito completado, sin excepción.

### 6. PATTERN RECOGNITION (The Future)
- **Función:** Meta-análisis en tiempo real.
- **Concurrencia:** Reconoce patrones de éxito para crear plantillas y estándares versionados para el resto del sistema.

### 7. FORENSIC AUDIT (The 7th Thread) - El Policía
- **Función:** Certificación y validación total.
- **Concurrencia:** **Sin este hilo no hay avance.** Valida activos contra espejos (Notebook Master Comparison).

---

## ⚙️ El Algoritmo "System Loop"
Este loop se ejecuta en cada interacción del workspace AXON:
1. **INPUT SCAN:** Identificar qué hilos son afectados por la instrucción (Directa/Indirectamente).
2. **THREAD CONCURRENCY:** El IDE/IA ejecuta tareas de fondo (Docs, Update Ledger, Audit) mientras procesa la respuesta.
3. **MIRROR SYNC:** Actualización del "Espejo" en NotebookLM para mantener paridad total.
