# NotebookLM Integration - Manual Setup Guide

## ⚠️ Automated Login Not Working

Google bloquea los navegadores automatizados (Playwright/Selenium). La solución más confiable es usar el método manual del CLI oficial de `notebooklm-py`.

## ✅ Solución Recomendada: Usar el CLI Oficial

### Paso 1: Instalar el CLI
```bash
pip install notebooklm-py[cli]
```

### Paso 2: Ejecutar el Login Interactivo
```bash
python -m notebooklm.cli login
```

Este comando:
- Abrirá un navegador Playwright
- Te pedirá que inicies sesión
- Guardará las cookies en `~/.notebooklm/storage_state.json`

### Paso 3: Ejecutar el Sync
```bash
python scripts/sync_notebooklm.py
```

---

## 🔄 Alternativa: Exportar Cookies Manualmente (Si el CLI falla)

Si el CLI también falla, puedes exportar las cookies manualmente:

### Opción A: Usar Extensión de Chrome
1. Instala "EditThisCookie" o "Cookie-Editor" en Chrome
2. Ve a https://notebooklm.google.com/ (iniciado sesión)
3. Exporta las cookies como JSON
4. Guárdalas en `C:\\Users\\daria\\.notebooklm\\storage_state.json`

### Opción B: Usar DevTools (Más técnico)
1. Abre https://notebooklm.google.com/ en Chrome
2. F12 → Console
3. Ejecuta este código:
```javascript
copy(JSON.stringify({cookies: await cookieStore.getAll()}))
```
4. Pega el resultado en `C:\\Users\\daria\\.notebooklm\\storage_state.json`

---

## 📝 Notas
- Las cookies expiran cada ~30 días
- Cuando expiren, repite el proceso de login
- El script `sync_notebooklm.py` ya está configurado para usar las cookies guardadas
