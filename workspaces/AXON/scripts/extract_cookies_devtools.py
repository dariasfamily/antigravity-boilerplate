"""
Extractor de Cookies SIN EXTENSIONES - Método Directo

Este script te guía para copiar las cookies directamente desde Chrome DevTools.
"""
import json
import webbrowser
from pathlib import Path

print("=" * 70)
print("🍪 Extractor de Cookies NotebookLM - SIN EXTENSIONES")
print("=" * 70)
print()

# Abrir NotebookLM
print("1️⃣  Abriendo NotebookLM en Chrome...")
webbrowser.open("https://notebooklm.google.com/")

print()
print("=" * 70)
print("SIGUE ESTOS PASOS EN CHROME:")
print("=" * 70)
print()
print("1. Presiona F12 (abre DevTools)")
print("2. Ve a la pestaña 'Application' (o 'Aplicación')")
print("   (está arriba junto a Console, Sources, etc.)")
print("3. En el menú izquierdo, expande 'Cookies'")
print("4. Haz clic en 'https://notebooklm.google.com'")
print("5. Verás una tabla con todas las cookies")
print()
print("=" * 70)
print("COPIA ESTAS COOKIES (una por línea):")
print("=" * 70)
print()
print("Busca y copia el VALOR (columna 'Value') de estas cookies:")
print("  - SID")
print("  - __Secure-1PSID")
print("  - __Secure-3PSID")
print("  - HSID")
print("  - SSID")
print("  - APISID")
print("  - SAPISID")
print()
print("=" * 70)
print()

cookies_to_extract = [
    "SID",
    "__Secure-1PSID", 
    "__Secure-3PSID",
    "HSID",
    "SSID",
    "APISID",
    "SAPISID",
    "__Secure-1PAPISID",
    "__Secure-3PAPISID"
]

cookies_dict = {}

for cookie_name in cookies_to_extract:
    value = input(f"Pega el valor de {cookie_name}: ").strip()
    if value:
        cookies_dict[cookie_name] = value

# Crear estructura de storage_state
storage_state = {
    "cookies": [
        {
            "name": name,
            "value": value,
            "domain": ".google.com",
            "path": "/",
            "expires": -1,
            "httpOnly": True if "Secure" in name or name in ["HSID", "SSID"] else False,
            "secure": True if "Secure" in name or name == "SAPISID" else False,
            "sameSite": "None" if "__Secure-3" in name else "Lax"
        }
        for name, value in cookies_dict.items()
    ]
}

# Guardar
storage_path = Path.home() / ".notebooklm" / "storage_state.json"
storage_path.parent.mkdir(parents=True, exist_ok=True)

with open(storage_path, 'w', encoding='utf-8') as f:
    json.dump(storage_state, f, indent=2)

print()
print("=" * 70)
print(f"✅ Cookies guardadas en: {storage_path}")
print("=" * 70)
print()
print("🎉 ¡TODO LISTO!")
print()
print("Ahora ejecuta: python scripts/sync_notebooklm.py")
print()
