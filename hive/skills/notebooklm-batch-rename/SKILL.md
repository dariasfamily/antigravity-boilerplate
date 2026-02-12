---
name: NotebookLM Batch Rename
description: Renombrado masivo de fuentes con formato modular [MOD-X AGENTE]
category: automation
tags: [notebooklm, browser-automation, batch-processing]
---

# NotebookLM Batch Rename

## PropÃ³sito
Renombrar mÃºltiples fuentes en un notebook de NotebookLM aplicando el formato modular estÃ¡ndar `[MOD-X AGENTE]`.

## CuÃ¡ndo Usar
- DespuÃ©s de importar fuentes vÃ­a research
- Al organizar notebooks existentes
- Cuando necesitas etiquetar fuentes con agente responsable
- Para aplicar sistema modular a proyectos

## ParÃ¡metros

### Requeridos
- `notebook_id` (string): UUID del notebook
- `module_num` (int): NÃºmero de mÃ³dulo (1, 2, 3...)
- `agent_name` (string): Nombre del agente (ORION, CALLIOPE, etc.)

### Opcionales
- `category` (string): CategorÃ­a temÃ¡tica (AS, IAG, CGC, etc.)
- `source_ids` (list): IDs especÃ­ficos de fuentes a renombrar (default: todas)
- `dry_run` (bool): Simular sin ejecutar (default: false)

## Uso

### Ejemplo BÃ¡sico
```
Usa la skill notebooklm-batch-rename para renombrar todas las fuentes del notebook 
"4cea8c11-3424-4fb9-8ab2-57e5b26dfc99" con formato MOD-1 ORION
```

### Ejemplo con CategorÃ­a
```
Renombra las fuentes del notebook "abc123" como MOD-2 PLANNER - AS 
(Arquitectura de Software)
```

### Ejemplo Selectivo
```
Renombra solo las fuentes [id1, id2, id3] del notebook "xyz789" 
como MOD-3 CALLIOPE
```

## ImplementaciÃ³n

### Paso 1: Obtener Fuentes
```python
notebook = mcp_notebooklm_notebook_get(notebook_id=notebook_id)
sources = notebook['sources']

# Filtrar si se especificaron source_ids
if source_ids:
    sources = [s for s in sources if s['id'] in source_ids]
```

### Paso 2: Construir Nuevos TÃ­tulos
```python
for source in sources:
    old_title = source['title']
    
    # Formato bÃ¡sico
    if category:
        new_title = f"[MOD-{module_num} {agent_name} - {category}] {old_title}"
    else:
        new_title = f"[MOD-{module_num} {agent_name}] {old_title}"
    
    source['new_title'] = new_title
```

### Paso 3: Ejecutar Browser Automation
```python
browser_subagent(
    task=f"""
    Rename sources in NotebookLM notebook {notebook_id}:
    
    For each source:
    1. Click 'More' menu (â‹®)
    2. Click 'Cambiar nombre de la fuente'
    3. Replace title with new format
    4. Save (Enter)
    
    Sources to rename:
    {json.dumps([{
        'old': s['title'], 
        'new': s['new_title']
    } for s in sources], indent=2)}
    
    Return count of successfully renamed sources.
    """,
    recording_name="batch_rename_sources"
)
```

### Paso 4: Actualizar Registro
```python
# Obtener o crear REGISTRO_AXON
registry_sources = [s for s in notebook['sources'] 
                    if 'REGISTRO_AXON' in s['title']]

if registry_sources:
    # Actualizar existente
    registry_id = registry_sources[0]['id']
    old_content = mcp_notebooklm_source_get_content(source_id=registry_id)
    
    new_entry = f"""
## {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**AcciÃ³n**: Renombradas {len(sources)} fuentes al MOD-{module_num}
**Agente**: {agent_name}

### Fuentes Renombradas
{chr(10).join([f"- {s['new_title']}" for s in sources])}
"""
    
    updated_content = old_content + new_entry
    
    # Eliminar viejo y crear nuevo
    mcp_notebooklm_source_delete(source_id=registry_id, confirm=True)
    mcp_notebooklm_notebook_add_text(
        notebook_id=notebook_id,
        title="REGISTRO_AXON",
        text=updated_content
    )
else:
    # Crear nuevo registro
    # ... (similar al cÃ³digo anterior)
```

## Salida Esperada

### Ã‰xito
```json
{
  "status": "success",
  "renamed_count": 10,
  "failed_count": 0,
  "module": "MOD-1",
  "agent": "ORION",
  "registry_updated": true
}
```

### Error Parcial
```json
{
  "status": "partial",
  "renamed_count": 8,
  "failed_count": 2,
  "failed_sources": ["source_id_1", "source_id_2"],
  "error": "Browser timeout on 2 sources"
}
```

## Limitaciones

- **Velocidad**: ~1 minuto por 10 fuentes (browser automation)
- **Requiere sesiÃ³n activa**: Usuario debe estar logueado en Chrome
- **Timeouts**: Puede fallar en redes lentas
- **No reversible**: Una vez renombrado, no hay "undo" automÃ¡tico

## Mejores PrÃ¡cticas

1. **Dry run primero**: Usar `dry_run=true` para verificar
2. **Backup**: Anotar tÃ­tulos originales antes de renombrar
3. **Lotes pequeÃ±os**: Renombrar en grupos de 10-20 fuentes
4. **Verificar despuÃ©s**: Revisar visualmente en NotebookLM UI

## Troubleshooting

### Problema: Browser timeout
**SoluciÃ³n**: Reducir nÃºmero de fuentes, verificar conexiÃ³n

### Problema: Fuentes no encontradas
**SoluciÃ³n**: Verificar que notebook_id y source_ids sean correctos

### Problema: Registro no se actualiza
**SoluciÃ³n**: Verificar permisos, reintentar creaciÃ³n manual

## Relacionado

- [notebooklm_source_tagging_protocol.md](file:///C:/Users/daria/.gemini/AXON/brain/23db3e90-973d-408a-8cca-4b5c5af3be6f/notebooklm_source_tagging_protocol.md)
- Skill: `notebooklm-module-query`
