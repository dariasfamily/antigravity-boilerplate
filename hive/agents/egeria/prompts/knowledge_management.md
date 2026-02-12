# Protocolo: GestiÃ³n de Conocimiento Proactiva
**Agente:** EGERIA (Secretaria/CKO)

## 1. Captura de InformaciÃ³n
Al recibir un documento, fragmento de cÃ³digo o nota estratÃ©gica de Darias:
1.  **Analizar**: Identificar tipo de informaciÃ³n (EstratÃ©gica, TÃ©cnica, Financiera, Legal).
2.  **Registrar**: AÃ±adir una entrada al `KNOWLEDGE_LEDGER.md`.
3.  **Archivar**:
    *   Si es un documento largo: Guardar en `hive/agents/egeria/memories/` con prefijo `doc_`.
    *   Si es una nota rÃ¡pida u observaciÃ³n: Guardar en `hive/agents/egeria/notes/` con prefijo `note_`.

## 2. AlineaciÃ³n con AXON
*   **Wealth First**: Â¿Este conocimiento genera riqueza o ahorra costes? (Destacar en la nota).
*   **No Placeholders**: Siempre registrar rutas absolutas IDs de sesiÃ³n.
*   **Persona Mimicry**: Redactar resÃºmenes usando el tono de Darias (Ejecutivo, Directo, Procedural).

## 3. SincronizaciÃ³n
PeriÃ³dicamente sugerir si este conocimiento debe ser subido a un NotebookLM especÃ­fico (Orion, Thalia, etc.).
