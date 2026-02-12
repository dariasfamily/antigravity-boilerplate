# Guía de MCP Servers Disponibles

## 📋 Resumen

Todos los MCP servers están **deshabilitados por defecto** para evitar problemas de conexión y consumo de recursos. Activa solo los que necesites.

## 🔧 Cómo Activar un MCP Server

1. Abre `C:\Users\daria\.gemini\AXON\mcp_config.json`
2. Busca el servidor que quieres activar
3. Cambia `"disabled": true` a `"disabled": false`
4. Guarda el archivo
5. Reinicia AXON

## 📊 MCP Servers Disponibles

### ✅ Recomendados para Uso Diario

#### 1. **NotebookLM** 
- **Estado:** Deshabilitado por defecto
- **Autenticación:** ✅ Configurada (`notebooklm-mcp-auth`)
- **Herramientas:** 32 tools
- **Uso:** Gestión de notebooks, fuentes, notas, chat, generación de contenido
- **Cuándo activar:** Cuando necesites trabajar con tus notebooks de NotebookLM
- **Ejemplo:** "Lista mis notebooks", "Añade esta fuente al notebook Orion"

#### 2. **Notion**
- **Estado:** Deshabilitado por defecto
- **Autenticación:** ✅ Configurada (API key)
- **Herramientas:** ~15 tools
- **Uso:** Gestión de bases de datos, páginas, bloques
- **Cuándo activar:** Cuando necesites leer/escribir en Notion
- **Ejemplo:** "Crea una página en Notion con este resumen"

### ⚙️ Automatización

#### 3. **Zapier**
- **Estado:** Deshabilitado por defecto
- **Autenticación:** ✅ Configurada (token)
- **Herramientas:** Acceso a 7000+ apps
- **Uso:** Automatización de workflows entre aplicaciones
- **Cuándo activar:** Cuando necesites conectar múltiples servicios
- **Ejemplo:** "Crea un Zap que envíe emails cuando..."

#### 4. **Make** (Integromat)
- **Estado:** Deshabilitado por defecto
- **Autenticación:** ✅ Configurada (URL SSE)
- **Herramientas:** Automatización visual
- **Uso:** Workflows complejos con lógica condicional
- **Cuándo activar:** Para automatizaciones más avanzadas que Zapier
- **Ejemplo:** "Crea un escenario en Make que..."

### 🔒 Actualmente Deshabilitados (Requieren Configuración)

#### 5. **Supabase**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere access token válido
- **Uso:** Base de datos PostgreSQL, autenticación, storage
- **Cuándo activar:** Si usas Supabase en tu proyecto

#### 6. **Vercel**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere token válido
- **Uso:** Despliegue de aplicaciones, gestión de proyectos
- **Cuándo activar:** Para deployments automáticos

#### 7. **GitHub**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere Personal Access Token válido
- **Uso:** Gestión de repos, issues, PRs
- **Cuándo activar:** Para automatizar tareas de GitHub

#### 8. **Perplexity**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere API key válida
- **Uso:** Búsqueda avanzada con IA
- **Cuándo activar:** Para búsquedas web potenciadas por IA

#### 9. **Rube**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere API key válida
- **Uso:** [Especificar uso de Rube]
- **Cuándo activar:** [Especificar cuándo]

### 🌐 Google Cloud (Requieren Configuración Adicional)

#### 10. **Cloud Run**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere configuración de GCP
- **Uso:** Gestión de servicios en Cloud Run
- **Cuándo activar:** Si usas Google Cloud Run

#### 11. **Firebase**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere configuración de Firebase
- **Uso:** Gestión de proyectos Firebase
- **Cuándo activar:** Si usas Firebase

#### 12. **Google Maps Code Assist**
- **Estado:** Deshabilitado
- **Autenticación:** ⚠️ Requiere configuración
- **Uso:** Asistencia de código para Google Maps API
- **Cuándo activar:** Si desarrollas con Google Maps

## 🎯 Configuraciones Recomendadas por Escenario

### Escenario 1: Trabajo con NotebookLM
```json
{
  "notebooklm": { "disabled": false }
}
```

### Escenario 2: Automatización + Documentación
```json
{
  "notebooklm": { "disabled": false },
  "notion": { "disabled": false },
  "zapier": { "disabled": false }
}
```

### Escenario 3: Desarrollo Full Stack
```json
{
  "github": { "disabled": false },
  "vercel": { "disabled": false },
  "supabase": { "disabled": false }
}
```

### Escenario 4: Todo Habilitado (⚠️ No Recomendado)
- Consumo alto de recursos
- Posibles conflictos de conexión
- Tiempo de inicio lento

## 🔍 Diagnóstico de Problemas

### Error: "Connecting to [servidor]..."
**Causa:** El servidor MCP no puede conectarse
**Solución:** 
1. Verifica que la autenticación esté configurada
2. Revisa los logs en la consola de AXON
3. Deshabilita el servidor si no lo necesitas

### Error: "DebugBridge Error"
**Causa:** Problema con el bridge de debug para servicios externos
**Solución:**
1. Verifica que `debug-mcp-bridge.js` existe
2. Revisa que los tokens/URLs sean válidos
3. Deshabilita temporalmente

### AXON se inicia lento
**Causa:** Demasiados MCP servers habilitados
**Solución:** Deshabilita los que no uses activamente

## 📝 Notas Importantes

1. **Autenticación de NotebookLM:** Ya está configurada con `notebooklm-mcp-auth`. Solo necesitas habilitar el servidor.

2. **Renovación de Tokens:** Algunos servicios requieren renovar tokens periódicamente (cada 30-90 días).

3. **Consumo de Recursos:** Cada MCP server habilitado consume memoria y puede ralentizar el inicio de AXON.

4. **Prioridad:** Habilita solo los servidores que uses en tu flujo de trabajo actual.

## 🚀 Próximos Pasos

1. Identifica qué MCP servers necesitas para tu trabajo actual
2. Habilita solo esos servidores en `mcp_config.json`
3. Reinicia AXON
4. Prueba que funcionan correctamente
5. Si alguno falla, revisa la autenticación y deshabilítalo si no es crítico
