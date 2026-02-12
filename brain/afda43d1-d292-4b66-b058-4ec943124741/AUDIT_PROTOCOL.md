# AUDIT PROTOCOL - Protocolo Anti-Fuga de Datos

**VersiÃ³n:** 1.0  
**Fecha:** 2026-02-09T20:27:30-05:00  
**Infraestructura:** OpciÃ³n A (Base ~92% confianza)  
**Aplicable a:** Plan v3.0 y Plan v4.0

---

## ðŸŽ¯ Principios Fundamentales

### 1. **Persistencia Inmediata**
Cada bloque se guarda **inmediatamente** despuÃ©s de completarse, no al final de la sesiÃ³n.

### 2. **Idempotencia**
Cada bloque puede re-ejecutarse sin duplicar datos. Si un bloque ya existe, se valida o se actualiza.

### 3. **Trazabilidad Total**
Cada dato tiene:
- **Origen:** QuÃ© archivo/directorio se escaneÃ³
- **Timestamp:** CuÃ¡ndo se capturÃ³
- **Agente:** QuiÃ©n lo capturÃ³
- **SesiÃ³n ID:** En quÃ© sesiÃ³n se capturÃ³

### 4. **Versionado**
Cada modificaciÃ³n a un bloque se versiona (v1, v2, etc.).

### 5. **Checkpointing**
El estado del sistema se guarda en JSON despuÃ©s de cada bloque, permitiendo recuperaciÃ³n.

### 6. **Sin SÃ­ntesis**
**PROHIBIDO** resumir, comprimir u omitir informaciÃ³n. Datos literales, completos, estructurados.

### 7. **Modularidad**
Bloques independientes. Falla de un bloque no afecta a los demÃ¡s.

---

## ðŸ“¦ Estructura de un Bloque

Cada bloque sigue este formato:

```markdown
# Block ID: block_XX_nombre

## Metadata
- **Plan:** v3.0 | v4.0
- **SecciÃ³n:** [Nombre de la secciÃ³n]
- **Timestamp Inicio:** YYYY-MM-DDTHH:MM:SS-05:00
- **Timestamp Fin:** YYYY-MM-DDTHH:MM:SS-05:00
- **Estado:** pending | in-progress | completed | failed
- **Agente Ejecutor:** AXON | [Otro agente]
- **SesiÃ³n ID:** [UUID de la conversaciÃ³n]
- **VersiÃ³n:** v1 | v2 | ...

## Entrada
- **Directorio/Archivo a escanear:** [Ruta absoluta]
- **Archivos esperados:** [Lista de archivos que se espera encontrar]
- **Criterios de bÃºsqueda:** [QuÃ© buscar]

## Proceso
1. [Paso 1]
2. [Paso 2]
3. ...

## Salida
[Datos completos sin compresiÃ³n]

### Formato de Salida
- **Listas:** Para elementos mÃºltiples
- **Tablas:** Para datos estructurados
- **CÃ³digo:** Para configuraciones o scripts
- **Texto literal:** Para contenido de archivos

## ValidaciÃ³n
- âœ… Todos los archivos listados existen fÃ­sicamente
- âœ… No se omitiÃ³ ningÃºn elemento
- âœ… No se sintetizÃ³ informaciÃ³n
- âœ… Checksums correctos (si aplica)

## Checksum
- **MD5:** [hash del contenido de salida]
- **Elementos procesados:** [nÃºmero]
- **TamaÃ±o total:** [bytes]

## Notas del Agente
[Decisiones tomadas, asunciones, incertidumbres, elementos no determinables]
```

---

## ðŸ”„ Flujo de EjecuciÃ³n por Bloque

### **Paso 1: Verificar Pre-Condiciones**
Antes de ejecutar un bloque:
1. Leer `PLAN_vX_CHECKPOINT.json`
2. Verificar que el bloque anterior estÃ¡ `completed`
3. Verificar integridad del bloque anterior (checksum)
4. Si el bloque actual ya existe:
   - Si estÃ¡ `completed` â†’ Validar y saltar
   - Si estÃ¡ `failed` â†’ Re-ejecutar
   - Si estÃ¡ `in-progress` â†’ Re-ejecutar (posible interrupciÃ³n)

### **Paso 2: Ejecutar Bloque**
1. Actualizar estado a `in-progress` en checkpoint
2. Registrar timestamp de inicio
3. Ejecutar proceso del bloque
4. Capturar salida sin sÃ­ntesis

### **Paso 3: Guardar Bloque**
1. Escribir archivo `block_XX_nombre.md` en `/blocks/`
2. Calcular checksum de la salida
3. Registrar timestamp de fin
4. Actualizar estado a `completed` en checkpoint

### **Paso 4: Validar Bloque**
1. Verificar que el archivo existe
2. Verificar que el checksum es correcto
3. Verificar que no hay datos truncados
4. Marcar validaciÃ³n en el bloque

### **Paso 5: Actualizar Checkpoint**
1. Actualizar `PLAN_vX_CHECKPOINT.json`:
   ```json
   {
     "plan": "v3.0",
     "last_completed_block": "block_03_agentes_core",
     "next_block": "block_04_agentes_content",
     "timestamp": "2026-02-09T20:45:00-05:00",
     "session_id": "afda43d1-...",
     "blocks_completed": 3,
     "blocks_total": 14,
     "progress_percent": 21.4,
     "data_integrity_hash": "abc123..."
   }
   ```

### **Paso 6: Registrar en Log**
1. Agregar entrada a `PLAN_vX_EXECUTION_LOG.md`:
   ```markdown
   | 2026-02-09T20:45:00 | block_03_agentes_core | completed | 3 agentes | 0 errores |
   ```

---

## ðŸ›¡ï¸ Mecanismos Anti-Fuga

### **1. Guardado Incremental**
- Cada bloque se guarda inmediatamente
- No se espera al final de la sesiÃ³n
- Si se interrumpe, solo se pierde el bloque actual

### **2. Checkpoint JSON**
- Estado del sistema en formato mÃ¡quina-legible
- Permite recuperaciÃ³n automÃ¡tica
- AgnÃ³stico al agente (cualquier agente puede continuar)

### **3. ValidaciÃ³n de Integridad**
- Checksums MD5 para detectar corrupciÃ³n
- Conteo de elementos procesados
- VerificaciÃ³n de tamaÃ±o de archivos

### **4. Sin SÃ­ntesis**
- **Formato estructurado:** Listas, tablas, cÃ³digo
- **Datos literales:** Copiar contenido exacto
- **No prosa:** Evitar descripciones narrativas
- **ValidaciÃ³n:** Pregunta explÃ­cita "Â¿Se omitiÃ³ algo?"

### **5. Trazabilidad**
- Cada dato tiene origen (archivo/directorio)
- Timestamp de captura
- Agente ejecutor
- SesiÃ³n ID

### **6. Idempotencia**
- Bloques pueden re-ejecutarse
- VerificaciÃ³n de existencia antes de ejecutar
- ActualizaciÃ³n vs. creaciÃ³n

---

## ðŸ”§ RecuperaciÃ³n de SesiÃ³n

### **Escenario 1: InterrupciÃ³n por LÃ­mite de Contexto**
1. Guardar estado actual en checkpoint
2. Crear nota en NotebookLM con estado
3. PrÃ³ximo agente lee checkpoint
4. ContinÃºa desde `next_block`

### **Escenario 2: Error en Bloque**
1. Marcar bloque como `failed` en checkpoint
2. Registrar error en log
3. Re-ejecutar bloque con correcciones
4. Actualizar versiÃ³n del bloque (v2)

### **Escenario 3: Cambio de Agente**
1. Agente A guarda checkpoint
2. Agente B lee checkpoint
3. Agente B lee `AUDIT_PROTOCOL.md` (este archivo)
4. Agente B continÃºa desde `next_block`

### **Comando de RecuperaciÃ³n**
```markdown
## Instrucciones para Agente Sucesor

1. Leer: C:\Users\daria\.gemini\AXON\brain\afda43d1-...\PLAN_vX_CHECKPOINT.json
2. Identificar: `next_block`
3. Validar: Bloques anteriores (checksums)
4. Continuar: Ejecutar `next_block` segÃºn AUDIT_PROTOCOL.md
```

---

## ðŸ“Š Formato de Checkpoint JSON

```json
{
  "plan": "v3.0",
  "plan_name": "Inventario Forense",
  "last_completed_block": "block_03_agentes_core",
  "next_block": "block_04_agentes_content",
  "timestamp": "2026-02-09T20:45:00-05:00",
  "session_id": "afda43d1-d292-4b66-b058-4ec943124741",
  "agent_executor": "AXON",
  "blocks_completed": 3,
  "blocks_total": 14,
  "progress_percent": 21.4,
  "data_integrity_hash": "abc123...",
  "blocks_status": {
    "block_01_arquitectura": "completed",
    "block_02_configuracion": "completed",
    "block_03_agentes_core": "completed",
    "block_04_agentes_content": "pending",
    "...": "..."
  },
  "errors": [],
  "warnings": [
    "Block 02: Algunos archivos de configuraciÃ³n no encontrados"
  ]
}
```

---

## ðŸ“‹ Formato de Execution Log

```markdown
# Execution Log - Plan v3.0

| Timestamp | Block ID | Status | Elements | Errors | Agent |
|-----------|----------|--------|----------|--------|-------|
| 2026-02-09T20:30:00 | block_01_arquitectura | completed | 15 dirs, 42 files | 0 | AXON |
| 2026-02-09T20:35:00 | block_02_configuracion | completed | 3 configs | 1 warning | AXON |
| 2026-02-09T20:45:00 | block_03_agentes_core | completed | 3 agentes | 0 | AXON |
| ... | ... | ... | ... | ... | ... |
```

---

## âœ… Criterios de ValidaciÃ³n de Bloque

Un bloque se considera **vÃ¡lido** si:
1. âœ… Archivo `.md` existe en `/blocks/`
2. âœ… Metadata completa (timestamps, IDs, estado)
3. âœ… Salida no estÃ¡ vacÃ­a
4. âœ… Checksum coincide con el contenido
5. âœ… No hay datos truncados (verificar final del archivo)
6. âœ… Formato estructurado (listas, tablas, no prosa)
7. âœ… Trazabilidad (origen de cada dato)

---

## ðŸš€ Extensibilidad a OpciÃ³n B

Mejoras futuras (no implementadas en OpciÃ³n A):
1. **Snapshot inicial:** Backup completo antes de auditorÃ­a
2. **Doble persistencia:** Guardar en local + NotebookLM simultÃ¡neamente
3. **ValidaciÃ³n cruzada:** Checksums + conteo automÃ¡tico
4. **Log de decisiones:** Documentar asunciones del agente en cada bloque
5. **RevisiÃ³n humana:** Pausar despuÃ©s de cada fase para validaciÃ³n

---

## ðŸ“– Uso de este Protocolo

### **Para Agentes:**
1. Leer este archivo antes de ejecutar cualquier bloque
2. Seguir el flujo de ejecuciÃ³n exactamente
3. Actualizar checkpoint despuÃ©s de cada bloque
4. Registrar en log despuÃ©s de cada bloque

### **Para Darias (Usuario):**
1. Revisar checkpoint para ver progreso
2. Revisar log para ver errores/warnings
3. Validar bloques crÃ­ticos manualmente
4. Aprobar continuaciÃ³n a siguiente fase

---

**Ãšltima actualizaciÃ³n:** 2026-02-09T20:27:30-05:00  
**PrÃ³xima revisiÃ³n:** Al finalizar FASE 0
