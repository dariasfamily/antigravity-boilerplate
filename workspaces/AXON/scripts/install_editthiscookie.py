"""
Script Automático para Instalar EditThisCookie y Preparar Todo

Este script abre Chrome en la página de instalación de la extensión.
"""
import webbrowser
import time

print("=" * 60)
print("🍪 Instalación Automática de EditThisCookie")
print("=" * 60)
print()

# URL correcta de la extensión
extension_url = "https://chromewebstore.google.com/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg"

print("1️⃣  Abriendo Chrome Web Store...")
webbrowser.open(extension_url)
time.sleep(2)

print()
print("=" * 60)
print("AHORA EN CHROME:")
print("=" * 60)
print()
print("1. Haz clic en el botón azul 'Agregar a Chrome'")
print("2. Confirma 'Agregar extensión'")
print()
print("Presiona ENTER cuando hayas instalado la extensión...")
input()

print()
print("=" * 60)
print("EXPORTAR COOKIES:")
print("=" * 60)
print()
print("1. Ve a https://notebooklm.google.com/ (ya deberías estar logueado)")
print("2. Busca el ícono de una GALLETA 🍪 en la barra de herramientas")
print("   (arriba a la derecha, junto a la barra de direcciones)")
print("3. Haz clic en el ícono de la galleta")
print("4. En el menú que se abre, haz clic en el ícono de EXPORTAR")
print("   (parece una flecha hacia abajo o un ícono de descarga)")
print("5. Las cookies se copian automáticamente al portapapeles")
print()
print("Presiona ENTER cuando hayas exportado las cookies...")
input()

print()
print("Ahora pega las cookies aquí (Ctrl+V y presiona ENTER dos veces):")
print()

# Leer el JSON
lines = []
while True:
    try:
        line = input()
        if line.strip() == "" and lines:
            break
        lines.append(line)
    except EOFError:
        break

import json
from pathlib import Path

json_str = "\n".join(lines)
cookies_data = json.loads(json_str)

# Guardar
storage_path = Path.home() / ".notebooklm" / "storage_state.json"
storage_path.parent.mkdir(parents=True, exist_ok=True)

# Convertir formato si es necesario
if isinstance(cookies_data, list):
    cookies_data = {"cookies": cookies_data}

with open(storage_path, 'w', encoding='utf-8') as f:
    json.dump(cookies_data, f, indent=2)

print()
print("=" * 60)
print(f"✅ Cookies guardadas en: {storage_path}")
print("=" * 60)
print()
print("🎉 ¡TODO LISTO!")
print()
print("Ahora ejecuta: python scripts/sync_notebooklm.py")
print()
