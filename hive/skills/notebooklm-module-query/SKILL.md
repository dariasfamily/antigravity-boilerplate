---
name: NotebookLM Module Query
description: Consultas filtradas por mÃ³dulo y agente en NotebookLM
category: query
tags: [notebooklm, filtering, queries, modules]
---

# NotebookLM Module Query

## PropÃ³sito
Ejecutar consultas en NotebookLM filtrando fuentes por mÃ³dulo, agente, o ambos. Permite selecciÃ³n granular para obtener respuestas especÃ­ficas.

## CuÃ¡ndo Usar
- Consultar solo fundamentos (MOD-1)
- Obtener insights de un agente especÃ­fico (ORION)
- Combinar filtros (MOD-2 + CALLIOPE)
- Excluir mÃ³dulos irrelevantes

## ParÃ¡metros

### Requeridos
- `notebook_id` (string): UUID del notebook
- `query` (string): Pregunta a hacer

### Opcionales
- `modules` (list[int]): NÃºmeros de mÃ³dulos a incluir (ej: [1, 2, 3])
- `agents` (list[string]): Nombres de agentes a incluir (ej: ["ORION", "CALLIOPE"])
- `categories` (list[string]): CategorÃ­as a incluir (ej: ["AS", "IAG"])
- `exclude_modules` (list[int]): MÃ³dulos a excluir
- `conversation_id` (string): Para follow-up questions

## Uso

### Ejemplo: Consulta por MÃ³dulo
```
Usa notebooklm-module-query para consultar el notebook "abc123" 
solo con fuentes de MOD-1 y MOD-2:
"Â¿CuÃ¡les son los fundamentos de arquitectura?"
```

### Ejemplo: Consulta por Agente
```
Consulta el notebook "xyz789" solo con fuentes de ORION:
"Â¿QuÃ© insights de mercado tenemos?"
```

### Ejemplo: Consulta Combinada
```
Consulta notebook "def456" con MOD-4 + ORION:
"Â¿QuÃ© dice ORION sobre arquitecturas de IA?"
```

### Ejemplo: ExclusiÃ³n
```
Consulta notebook "ghi789" excluyendo MOD-5 y MOD-6:
"Dame un overview general"
```

## ImplementaciÃ³n

### Paso 1: Obtener Fuentes
```python
notebook = mcp_notebooklm_notebook_get(notebook_id=notebook_id)
all_sources = notebook['sources']
```

### Paso 2: Aplicar Filtros
```python
filtered_sources = all_sources

# Filtrar por mÃ³dulos
if modules:
    module_patterns = [f"MOD-{m}" for m in modules]
    filtered_sources = [s for s in filtered_sources 
                        if any(p in s['title'] for p in module_patterns)]

# Filtrar por agentes
if agents:
    filtered_sources = [s for s in filtered_sources 
                        if any(agent in s['title'] for agent in agents)]

# Filtrar por categorÃ­as
if categories:
    category_patterns = [f"- {cat}]" for cat in categories]
    filtered_sources = [s for s in filtered_sources 
                        if any(p in s['title'] for p in category_patterns)]

# Excluir mÃ³dulos
if exclude_modules:
    exclude_patterns = [f"MOD-{m}" for m in exclude_modules]
    filtered_sources = [s for s in filtered_sources 
                        if not any(p in s['title'] for p in exclude_patterns)]

source_ids = [s['id'] for s in filtered_sources]
```

### Paso 3: Ejecutar Query
```python
result = mcp_notebooklm_notebook_query(
    notebook_id=notebook_id,
    query=query,
    source_ids=source_ids,
    conversation_id=conversation_id
)
```

### Paso 4: Enriquecer Respuesta
```python
response = {
    "answer": result['answer'],
    "sources_used": len(source_ids),
    "total_sources": len(all_sources),
    "filters_applied": {
        "modules": modules,
        "agents": agents,
        "categories": categories,
        "excluded_modules": exclude_modules
    },
    "source_titles": [s['title'] for s in filtered_sources]
}
```

## Salida Esperada

### Ã‰xito
```json
{
  "status": "success",
  "answer": "Los fundamentos de arquitectura incluyen...",
  "sources_used": 15,
  "total_sources": 50,
  "filters_applied": {
    "modules": [1, 2],
    "agents": null,
    "categories": null,
    "excluded_modules": null
  },
  "source_titles": [
    "[MOD-1 PLANNER] Architecture Fundamentals",
    "[MOD-2 PLANNER - AS] Domain-Driven Design",
    ...
  ]
}
```

## Casos de Uso

### Caso 1: InvestigaciÃ³n Progresiva
```python
# Fase 1: Solo fundamentos
query_module(notebook_id, "Explica los conceptos bÃ¡sicos", modules=[1])

# Fase 2: Fundamentos + Avanzado
query_module(notebook_id, "Profundiza en arquitecturas", modules=[1, 2])

# Fase 3: Todo
query_module(notebook_id, "Dame una visiÃ³n completa", modules=[1, 2, 3, 4])
```

### Caso 2: AuditorÃ­a por Agente
```python
# Â¿QuÃ© aÃ±adiÃ³ ORION?
query_module(notebook_id, "Resume tus hallazgos", agents=["ORION"])

# Â¿QuÃ© creÃ³ CALLIOPE?
query_module(notebook_id, "Muestra la estrategia", agents=["CALLIOPE"])

# Â¿QuÃ© revisÃ³ ARGUS?
query_module(notebook_id, "Lista los issues", agents=["ARGUS"])
```

### Caso 3: Consulta TemÃ¡tica
```python
# Solo arquitectura de software
query_module(notebook_id, "Explica DDD", categories=["AS"])

# Solo IA Generativa
query_module(notebook_id, "Â¿CÃ³mo funcionan los transformers?", categories=["IAG"])

# Solo seguridad
query_module(notebook_id, "Â¿QuÃ© riesgos hay?", categories=["CGC"])
```

## Mejores PrÃ¡cticas

1. **Empezar amplio, luego filtrar**: Primera query sin filtros, luego refinar
2. **Documentar criterios**: Anotar por quÃ© se eligieron ciertos filtros
3. **Verificar cobertura**: Asegurar que source_ids no estÃ© vacÃ­o
4. **Usar conversation_id**: Para follow-ups que mantengan contexto

## Limitaciones

- **Filtros por texto**: Depende de que los tÃ­tulos sigan el formato estÃ¡ndar
- **No fuzzy matching**: Debe coincidir exactamente (MOD-1, no Mod1)
- **Sin filtros complejos**: No soporta OR/AND anidados

## Troubleshooting

### Problema: 0 fuentes filtradas
**SoluciÃ³n**: Verificar formato de tÃ­tulos, revisar mÃ³dulos/agentes disponibles

### Problema: Respuesta genÃ©rica
**SoluciÃ³n**: Filtros demasiado amplios, ser mÃ¡s especÃ­fico

### Problema: InformaciÃ³n incompleta
**SoluciÃ³n**: Filtros demasiado restrictivos, ampliar mÃ³dulos

## Relacionado

- [notebooklm_source_tagging_protocol.md](file:///C:/Users/daria/.gemini/AXON/brain/23db3e90-973d-408a-8cca-4b5c5af3be6f/notebooklm_source_tagging_protocol.md)
- Skill: `notebooklm-batch-rename`
