"""
Extractor de Cookies desde Chrome Profile de Playwright

Este script lee las cookies directamente del perfil de Chrome que Playwright creó.
"""
import json
import sqlite3
from pathlib import Path
import shutil

def extract_cookies_from_chrome_profile():
    print("=" * 70)
    print("🍪 Extrayendo Cookies del Perfil de Chrome")
    print("=" * 70)
    print()
    
    # Ruta al perfil de Playwright
    profile_path = Path.home() / ".notebooklm" / "browser_profile"
    cookies_db = profile_path / "Default" / "Cookies"
    
    if not cookies_db.exists():
        # Intentar con "Network" en lugar de "Default"
        cookies_db = profile_path / "Default" / "Network" / "Cookies"
    
    if not cookies_db.exists():
        print(f"❌ No se encontró la base de datos de cookies en:")
        print(f"   {cookies_db}")
        print()
        print("Ubicaciones buscadas:")
        print(f"  - {profile_path / 'Default' / 'Cookies'}")
        print(f"  - {profile_path / 'Default' / 'Network' / 'Cookies'}")
        return False
    
    print(f"✅ Base de datos de cookies encontrada:")
    print(f"   {cookies_db}")
    print()
    
    # Copiar la DB para evitar locks
    temp_db = Path("temp_cookies.db")
    shutil.copy2(cookies_db, temp_db)
    
    try:
        # Conectar a la DB de cookies
        conn = sqlite3.connect(temp_db)
        cursor = conn.cursor()
        
        # Extraer cookies de google.com y notebooklm.google.com
        cursor.execute("""
            SELECT name, value, host_key, path, expires_utc, is_secure, is_httponly, samesite
            FROM cookies
            WHERE host_key LIKE '%google.com%'
            ORDER BY host_key, name
        """)
        
        rows = cursor.fetchall()
        conn.close()
        
        print(f"📊 Cookies encontradas: {len(rows)}")
        print()
        
        # Convertir a formato storage_state.json
        cookies = []
        for row in rows:
            name, value, domain, path, expires, is_secure, is_httponly, samesite = row
            
            # Convertir samesite
            samesite_map = {0: "Lax", 1: "Strict", 2: "None", -1: "Lax"}
            samesite_str = samesite_map.get(samesite, "Lax")
            
            cookie = {
                "name": name,
                "value": value,
                "domain": domain if domain.startswith(".") else f".{domain}",
                "path": path,
                "expires": expires / 1000000 - 11644473600 if expires > 0 else -1,  # Convertir de Chrome time
                "httpOnly": bool(is_httponly),
                "secure": bool(is_secure),
                "sameSite": samesite_str
            }
            cookies.append(cookie)
            
            # Mostrar cookies importantes
            if name in ["SID", "__Secure-1PSID", "__Secure-3PSID", "HSID", "SSID"]:
                print(f"  ✓ {name}: {value[:20]}...")
        
        # Guardar en storage_state.json
        storage_state = {"cookies": cookies}
        storage_path = Path.home() / ".notebooklm" / "storage_state.json"
        storage_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(storage_path, 'w', encoding='utf-8') as f:
            json.dump(storage_state, f, indent=2)
        
        print()
        print("=" * 70)
        print(f"✅ Cookies guardadas en: {storage_path}")
        print(f"📊 Total: {len(cookies)} cookies")
        print("=" * 70)
        
        return True
        
    except Exception as e:
        print(f"❌ Error al extraer cookies: {e}")
        return False
    finally:
        # Limpiar archivo temporal
        if temp_db.exists():
            temp_db.unlink()

if __name__ == "__main__":
    success = extract_cookies_from_chrome_profile()
    
    if success:
        print()
        print("🎉 ¡Listo! Ahora ejecuta:")
        print("   python scripts/sync_notebooklm.py")
    else:
        print()
        print("⚠️  No se pudieron extraer las cookies automáticamente.")
        print("   Usa el método manual con EditThisCookie.")
