# Resumen: Protocolo NotebookLM v2.0 - Sistema Modular

## ✅ Actualizaciones Implementadas

### 1. Formato de Huella Mejorado
**Antes (v1.0)**:
```
[G-Anti] Título de la Fuente
```

**Ahora (v2.0)**:
```
[MOD-X AGENTE] Título de la Fuente
[MOD-X AGENTE - CATEGORIA] Título de la Fuente
```

### 2. Componentes del Nuevo Formato

#### Número de Módulo (MOD-X)
- Agrupa fuentes por tema/fase del proyecto
- Permite selección granular para consultas
- Ejemplo: `MOD-1`, `MOD-2`, `MOD-3`

#### Nombre del Agente
- Identifica quién añadió la fuente
- Opciones: `EGERIA`, `ORION`, `CALLIOPE`, `ARGUS`, `PULSAR`, `PLANNER`, `THALIA`, `APOLLO`, `NEXUS`
- Permite filtrar por responsable

#### Categoría Temática (Opcional)
- Abreviatura descriptiva del tema
- Ejemplo: `AS` (Arquitectura), `IAG` (IA Generativa), `CGC` (Ciberseguridad)

---

## 📋 Ejemplos del Estándar ChatGPT

### Estructura Observada
```
[1 NUCLEO - IS] Estándares de ingeniería de sistemas
[2 ESTRUCTURA - AS] Domain-Driven Design Patterns
[3 VOLUMEN - ID & SD] Apache Kafka Architecture
[4 MOTOR - IAG & SMA] Attention Is All You Need
[5 ESCUDO - CGC] GDPR Compliance Guidelines
[6 MENTE - EL & PC] Epistemology Fundamentals
```

### Documentos Maestros
```
[1 FULL NUCLEO] ALL SOURCES
[2 FULL ESTRUCTURA] Arquitectura de Software: Fundamentos
[3 FULL VOLUMEN] Ingeniería de Datos y Sistemas Distribuidos
```

---

## 🎯 Beneficios del Sistema Modular

### 1. Selección Granular
```python
# Consultar solo MOD-1 y MOD-2
sources_filtered = [s for s in sources 
                    if 'MOD-1' in s['title'] or 'MOD-2' in s['title']]

# Consultar solo fuentes de ORION
sources_orion = [s for s in sources if 'ORION' in s['title']]
```

### 2. Organización Visual
- Fuentes agrupadas por módulo en la UI
- Fácil identificación de quién añadió qué
- Estructura clara para proyectos grandes

### 3. Trazabilidad
- Saber qué agente trabajó en qué módulo
- Historial completo en REGISTRO_AXON
- Auditoría de contribuciones

---

## 🔧 Métodos de Implementación

### Opción A: Browser Automation (Probado ✅)
**Ventajas**:
- Funciona con cualquier tipo de fuente
- Control total sobre títulos
- Bypass de limitaciones de API

**Desventajas**:
- Lento (~1 minuto por 10 fuentes)
- Requiere sesión activa de Chrome
- Puede fallar por timeouts

**Uso**:
```python
browser_subagent(
    task=f"Rename sources in notebook {notebook_id} with [MOD-{X} {AGENTE}] prefix"
)
```

### Opción B: API para Texto
**Solo para fuentes de texto** (no URLs):
```python
mcp_notebooklm_notebook_add_text(
    notebook_id=notebook_id,
    title=f"[MOD-{X} {AGENTE}] {titulo}",
    text=contenido
)
```

---

## 📦 Estado de Notion MCP

### Búsqueda Realizada
```bash
npm search @notionhq/client
```

**Resultado**: ❌ No encontrado paquete MCP oficial de Notion

**Paquetes Relacionados**:
- `@notion-md-converter/core` - Convertidor Notion → Markdown
- `contentlayer-source-notion` - Source para Contentlayer

### Recomendación
**No instalar Notion MCP por ahora** porque:
1. No existe paquete MCP oficial
2. Alternativas no son MCPs verdaderos
3. Podemos implementar sincronización manual si es necesario

**Alternativa**:
- Exportar REGISTRO_AXON como Markdown
- Importar manualmente a Notion
- O crear skill personalizada de sincronización

---

## 🚀 Skills Recomendadas

### Skill 1: `notebooklm-batch-rename`
**Propósito**: Renombrado masivo automatizado

**Funcionalidad**:
- Input: notebook_id, module_num, agent_name
- Proceso: Browser automation para renombrar todas las fuentes
- Output: Fuentes renombradas + REGISTRO actualizado

**Estado**: 🔴 Pendiente de creación

### Skill 2: `notebooklm-module-query`
**Propósito**: Consultas filtradas por módulo/agente

**Funcionalidad**:
- Input: notebook_id, modules=[], agents=[], query
- Proceso: Filtrar source_ids y ejecutar query
- Output: Respuesta basada solo en fuentes seleccionadas

**Estado**: 🔴 Pendiente de creación

---

## 📊 Casos de Uso

### Caso 1: Proyecto Multi-Agente
```
Notebook: "Product Launch Strategy"

MOD-1 ORION: Market Research (10 fuentes)
MOD-2 CALLIOPE: Content Strategy (15 fuentes)
MOD-3 THALIA: Visual Assets (8 fuentes)
MOD-4 ARGUS: Quality Review (5 fuentes)

Consulta selectiva:
- "¿Qué dice el research?" → Filtrar MOD-1 ORION
- "¿Cuál es la estrategia de contenido?" → Filtrar MOD-2 CALLIOPE
- "¿Hay issues de calidad?" → Filtrar MOD-4 ARGUS
```

### Caso 2: Investigación Progresiva
```
Notebook: "AI Architecture Research"

MOD-1 PLANNER: Fundamentos (20 fuentes)
MOD-2 PLANNER: Arquitecturas Avanzadas (30 fuentes)
MOD-3 PLANNER: Implementación (25 fuentes)

Consulta progresiva:
- Fase 1: Solo MOD-1 (fundamentos)
- Fase 2: MOD-1 + MOD-2 (fundamentos + avanzado)
- Fase 3: Todos los módulos
```

---

## ✅ Próximos Pasos

### Inmediatos
1. ✅ Protocolo v2.0 documentado
2. ✅ Estándar basado en notebook ChatGPT
3. ⏳ Aplicar a notebook de prueba
4. ⏳ Crear skill `notebooklm-batch-rename`

### Mediano Plazo
1. Migrar notebooks existentes al nuevo formato
2. Crear dashboard de módulos y agentes
3. Implementar consultas filtradas automáticas
4. Documentar en datasheets de agentes

### Largo Plazo
1. Integración con sistema de logging global
2. Métricas de contribución por agente
3. Automatización completa del workflow
4. Posible integración con Notion (manual o custom skill)

---

## 📝 Documentos Actualizados

1. **[notebooklm_source_tagging_protocol.md](file:///C:/Users/daria/.gemini/AXON/brain/23db3e90-973d-408a-8cca-4b5c5af3be6f/notebooklm_source_tagging_protocol.md)** - Protocolo completo v2.0
2. **[walkthrough.md](file:///C:/Users/daria/.gemini/AXON/brain/23db3e90-973d-408a-8cca-4b5c5af3be6f/walkthrough.md)** - Walkthrough de implementación v1.0
3. **[task.md](file:///C:/Users/daria/.gemini/AXON/brain/23db3e90-973d-408a-8cca-4b5c5af3be6f/task.md)** - Checklist actualizado

---

**Versión**: 2.0  
**Fecha**: 2026-02-09  
**Estado**: ✅ Listo para Implementación
