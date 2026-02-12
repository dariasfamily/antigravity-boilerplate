# Plan de ImplementaciÃ³n: GuÃ­a Maestra AXON Adaptada

## AuditorÃ­a y Correcciones Clave
1. **Rutas de Archivos**: La guÃ­a original sugiere `C:\Dev\`. Para garantizar permisos y compatibilidad con el entorno actual, usaremos `C:\Users\daria\.gemini\AXON\scratch\` como directorio raÃ­z para los proyectos y agentes.
   - Mapeo: `C:\Dev\` -> `C:\Users\daria\.gemini\AXON\scratch\Dev\`
2. **ConfiguraciÃ³n de UI**: Los pasos 1.2 y 1.3 requieren intervenciÃ³n manual del usuario en la interfaz grÃ¡fica de AXON. ProporcionarÃ© instrucciones precisas para esto ya que no puedo manipular la UI directamente.
3. **Versiones**: Confirmado AXON v1.15.8. El plan es compatible.
4. **Deny List**: La lista de comandos bloqueados es sÃ³lida. AÃ±adiremos validaciones adicionales si es necesario.

## Fase 1: ConfiguraciÃ³n Inicial
### Paso 1.2: PolÃ­tica de Terminal
- **AcciÃ³n**: Usuario configura UI para permitir ejecuciÃ³n automÃ¡tica con lista de denegaciÃ³n.
- **CorrecciÃ³n**: Asegurar que la lista de denegaciÃ³n incluya comandos destructivos comunes en Windows (`del`, `rmdir`).

### Paso 1.3: Modelo Principal
- **AcciÃ³n**: Usuario selecciona Gemini 3 Pro.
- **ValidaciÃ³n**: Verificar disponibilidad en la cuenta del usuario.

### Paso 1.4: Estructura de Directorios
- **AcciÃ³n**: Crear la jerarquÃ­a de carpetas en el scratch pad.
- **Estructura Propuesta**:
  ```
  C:\Users\daria\.gemini\AXON\scratch\Dev\
  â”œâ”€â”€ AXON-agents\
  â”‚   â”œâ”€â”€ social-media-agents\
  â”‚   â”œâ”€â”€ dev-agents\
  â”‚   â”œâ”€â”€ automation-workflows\
  â”‚   â””â”€â”€ shared-resources\
  ```

## Siguientes Fases
Se ejecutarÃ¡n en orden tras confirmar el Ã©xito de la Fase 1. Se prestarÃ¡ especial atenciÃ³n a la configuraciÃ³n de MCPs (Fase 2) para asegurar que las credenciales se manejen de forma segura (variables de entorno).
