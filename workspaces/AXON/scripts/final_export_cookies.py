"""
Paso Final: Exportar Cookies con EditThisCookie

Ejecuta este script DESPUÉS de instalar la extensión.
"""
import json
from pathlib import Path
import webbrowser

print("=" * 70)
print("🍪 Exportar Cookies de NotebookLM con EditThisCookie")
print("=" * 70)
print()

print("1️⃣  Abriendo NotebookLM...")
webbrowser.open("https://notebooklm.google.com/")

print()
print("=" * 70)
print("PASOS EN CHROME:")
print("=" * 70)
print()
print("1. Busca el ícono de una GALLETA 🍪 en la barra de herramientas")
print("   (arriba a la derecha, junto a las extensiones)")
print()
print("2. Haz clic en el ícono de la galleta")
print()
print("3. En el menú que aparece, busca el ícono de EXPORTAR")
print("   (parece una flecha hacia abajo ⬇️ o un ícono de compartir)")
print()
print("4. Haz clic en EXPORTAR")
print("   Las cookies se copian automáticamente al portapapeles")
print()
print("=" * 70)
print()

input("Presiona ENTER cuando hayas exportado las cookies...")

print()
print("Ahora pega las cookies aquí (Ctrl+V y presiona ENTER dos veces):")
print()

# Leer JSON
lines = []
while True:
    try:
        line = input()
        if line.strip() == "" and lines:
            break
        lines.append(line)
    except EOFError:
        break

json_str = "\n".join(lines)
cookies_data = json.loads(json_str)

# Convertir formato si es necesario
if isinstance(cookies_data, list):
    # EditThisCookie exporta como array, necesitamos objeto con "cookies"
    cookies_data = {"cookies": cookies_data}

# Asegurar que los dominios tengan el punto inicial
for cookie in cookies_data.get("cookies", []):
    domain = cookie.get("domain", "")
    if domain and not domain.startswith("."):
        cookie["domain"] = "." + domain

# Guardar
storage_path = Path.home() / ".notebooklm" / "storage_state.json"
storage_path.parent.mkdir(parents=True, exist_ok=True)

with open(storage_path, 'w', encoding='utf-8') as f:
    json.dump(cookies_data, f, indent=2)

print()
print("=" * 70)
print(f"✅ Cookies guardadas en: {storage_path}")
print("=" * 70)
print()
print("🎉 ¡CONFIGURACIÓN COMPLETA!")
print()
print("Ejecutando sync automáticamente...")
print()

# Ejecutar sync automáticamente
import subprocess
import sys

result = subprocess.run(
    [sys.executable, "scripts/sync_notebooklm.py"],
    capture_output=True,
    text=True
)

print(result.stdout)
if result.stderr:
    print(result.stderr)

if result.returncode == 0:
    print()
    print("=" * 70)
    print("✅ ¡SINCRONIZACIÓN EXITOSA!")
    print("=" * 70)
else:
    print()
    print("=" * 70)
    print("⚠️  Hubo un error. Intenta ejecutar manualmente:")
    print("python scripts/sync_notebooklm.py")
    print("=" * 70)
