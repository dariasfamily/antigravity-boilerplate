# FASE 0 - ActualizaciÃ³n de Scope: Proyecto Mayor Domo

**Fecha:** 2026-02-09T21:16:48-05:00  
**Tipo:** ActualizaciÃ³n de especificaciones  
**VersiÃ³n:** v1.1

---

## ðŸŽ¯ Cambios Realizados

### **1. Renombrado de Proyecto**
- **Antes:** `zonal-parsec` (vacÃ­o, no existente)
- **DespuÃ©s:** **"Mayor Domo"** (MENISCO/dashboard-v3 + sistema de agentes global)

### **2. Scope Actualizado**

**Plan v3.0 (Inventario Forense):**
- âœ… Sistema de agentes (9 agentes, 39 skills)
- âœ… Proyecto Mayor Domo (MENISCO/dashboard-v3)
- âœ… Base de datos Supabase operativa
- âœ… Integraciones activas

**Plan v4.0 (ReconstrucciÃ³n Completa):**
- âœ… EspecificaciÃ³n global del sistema completo
- âœ… Requisitos funcionales y no funcionales
- âœ… Modelo de implementaciÃ³n operacional
- âœ… Contexto de intenciÃ³n (decisiones de diseÃ±o)

---

## ðŸ”§ ConfiguraciÃ³n Actualizada

### **Supabase MCP Habilitado**
```json
{
  "supabase": {
    "command": "npx",
    "args": [
      "-y",
      "@supabase/mcp-server-supabase@latest",
      "--access-token",
      "sbp_4f9e7936d3368c9a54c9d4f4e3a97d7494382d3f"
    ],
    "disabled": false
  }
}
```

**Estado:** âœ… Activo (requiere reinicio de AXON para cargar)

---

## ðŸ“Š Archivos Actualizados

| Archivo | Cambio |
|---------|--------|
| `PLAN_v3_SPECIFICATION.md` | Scope actualizado a Mayor Domo |
| `PLAN_v4_SPECIFICATION.md` | Scope actualizado a Mayor Domo |
| `mcp_config.json` | Supabase MCP habilitado |
| `block_01_arquitectura.md` | Completado con discrepancia documentada |

---

## âœ… PrÃ³ximos Pasos

### **Inmediato:**
1. **Reiniciar AXON** (para cargar Supabase MCP)
2. **Verificar Supabase** (listar tablas, esquema)
3. **Actualizar NotebookLM** (eliminar fuentes viejas, agregar nuevas)

### **Continuar FASE 1:**
4. **Block 02:** ConfiguraciÃ³n de Agentes
5. **Blocks 03-06:** Inventario de 9 agentes
6. **Block 09:** Proyecto Mayor Domo completo
7. **Block 10:** Integraciones (incluir Supabase)

---

## ðŸ’¡ VisiÃ³n: Mayor Domo

**Concepto:**
- **Sistema global** de agentes que funciona en cualquier chat/funciÃ³n de AXON
- **IntegraciÃ³n NotebookLM** al 95% (knowledge base persistente)
- **Base de datos operativa** en Supabase
- **Monetizable** como producto documentado al 100%

**Componentes:**
1. **Hive (Global):** 9 agentes, 39 skills, configuraciÃ³n
2. **Proyecto Web:** MENISCO/dashboard-v3 (Next.js + Supabase)
3. **Knowledge Base:** NotebookLM + Brain artifacts
4. **Integraciones:** Supabase, Vercel, MCPs

---

## ðŸš€ AplicaciÃ³n de Semilla de Superioridad

**FASE 1 (Plan v3.0):** Inventario completo â†’ ~60% reconstrucciÃ³n  
**FASE 2 (Plan v4.0):** IngenierÃ­a de intenciÃ³n â†’ ~95% reconstrucciÃ³n

**Resultado Final:**
- Sistema completamente documentado
- EspecificaciÃ³n formal (SS v0, SRS, OIM, INT)
- Transferible a cualquier agente IA
- Monetizable como activo intelectual

---

**Estado:** FASE 0 actualizada, lista para continuar FASE 1  
**PrÃ³xima acciÃ³n:** Reiniciar AXON y verificar Supabase
