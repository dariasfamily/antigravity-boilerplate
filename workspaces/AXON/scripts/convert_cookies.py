"""
Convertir cookies de EditThisCookie al formato Playwright storage_state.json

Este script toma las cookies exportadas por EditThisCookie y las convierte
al formato exacto que espera notebooklm-py.
"""
import json
from pathlib import Path

def convert_cookies():
    print("=" * 70)
    print("🔄 Convertir Cookies - EditThisCookie → Playwright")
    print("=" * 70)
    print()
    
    # Leer cookies de EditThisCookie
    raw_path = Path.home() / ".notebooklm" / "cookies_raw.json"
    storage_path = Path.home() / ".notebooklm" / "storage_state.json"
    
    print(f"📖 Leyendo: {raw_path}")
    
    with open(raw_path, 'r', encoding='utf-8') as f:
        edit_this_cookie_format = json.load(f)
    
    print(f"📊 Cookies encontradas: {len(edit_this_cookie_format)}")
    print()
    
    # Convertir al formato Playwright
    playwright_cookies = []
    
    for cookie in edit_this_cookie_format:
        # Mapear sameSite
        samesite_map = {
            "unspecified": "Lax",
            "no_restriction": "None",
            "lax": "Lax",
            "strict": "Strict"
        }
        
        playwright_cookie = {
            "name": cookie["name"],
            "value": cookie["value"],
            "domain": cookie["domain"],
            "path": cookie["path"],
            "expires": cookie.get("expirationDate", -1),
            "httpOnly": cookie.get("httpOnly", False),
            "secure": cookie.get("secure", False),
            "sameSite": samesite_map.get(cookie.get("sameSite", "unspecified"), "Lax")
        }
        
        playwright_cookies.append(playwright_cookie)
        
        # Mostrar cookies importantes
        if cookie["name"] in ["SID", "__Secure-1PSID", "__Secure-3PSID", "HSID", "SSID"]:
            print(f"  ✓ {cookie['name']}: {cookie['value'][:30]}...")
    
    # Crear storage_state.json
    storage_state = {
        "cookies": playwright_cookies,
        "origins": []
    }
    
    # Guardar
    print()
    print(f"💾 Guardando en: {storage_path}")
    
    with open(storage_path, 'w', encoding='utf-8') as f:
        json.dump(storage_state, f, indent=2)
    
    # Verificar cookies requeridas
    cookie_names = {c["name"] for c in playwright_cookies}
    required = {"SID", "HSID", "SSID", "__Secure-1PSID", "__Secure-3PSID"}
    
    print()
    print("=" * 70)
    print("✅ Conversión Completada")
    print("=" * 70)
    print()
    print(f"📊 Total cookies: {len(playwright_cookies)}")
    print(f"🔑 Cookies requeridas presentes: {required & cookie_names}")
    
    if required.issubset(cookie_names):
        print()
        print("🎉 ¡Todas las cookies necesarias están presentes!")
        print()
        print("Ahora puedes:")
        print("1. Reiniciar Antigravity")
        print("2. El MCP server debería conectarse automáticamente")
        print("3. Probar: python scripts/sync_notebooklm.py")
    else:
        missing = required - cookie_names
        print(f"\n⚠️  Faltan cookies: {missing}")
        print("Necesitas exportar cookies nuevamente con EditThisCookie")
    
    print()
    print("=" * 70)

if __name__ == "__main__":
    convert_cookies()
