# Plan de Resolución: Workspace Fantasma (workspace.json)

El archivo `workspace.json` que ves en la barra lateral es una **entrada fantasma** (ghost entry). No existe físicamente en el disco duro, pero el IDE lo mantiene en su registro de sesiones, posiblemente como un alias del directorio `MENISCO`.

## Hallazgos de la Auditoría
1. **Inexistencia**: Se realizaron búsquedas recursivas (`fd`, `ls -Force`, `Get-ChildItem`) en todos los niveles desde `c:\Users\daria\` hacia abajo y no se encontró ningún archivo con ese nombre.
2. **Discrepancia**: El directorio `MENISCO` existe físicamente en `workspaces/MENISCO`, pero NO aparece en tu barra lateral.
3. **Hipótesis**: `workspace.json` es el nombre que el IDE ha asignado erróneamente al "contenedor" de MENISCO o es un residuo de una operación de refactorización previa.

## Acciones Propuestas

### 1. Refresco Forzado (Manual)
Dado que no hay un archivo físico que eliminar, la solución es forzar al IDE a recalcular la lista de espacios de trabajo.
*   **Paso 1**: Clic derecho sobre `workspace.json` en la barra lateral y seleccionar "Remove Folder from Workspace" (esto no borrará archivos, solo el enlace).
*   **Paso 2**: Si `MENISCO` no aparece automáticamente, usar "Open Workspace +" y navegar a `c:\Users\daria\.gemini\antigravity\workspaces\MENISCO`.

### 2. Sincronización de Nombres
Si deseas que `MENISCO` tenga un nombre más descriptivo en la interfaz, puedo renombrar la carpeta físicamente a algo como `INTENTION_ENGINEERING`.

## Verificación
- [ ] El usuario confirma que al cerrar la entrada `workspace.json` esta desaparece.
- [ ] El usuario confirma que `MENISCO` vuelve a ser visible bajo su nombre correcto.
