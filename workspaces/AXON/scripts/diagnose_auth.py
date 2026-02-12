"""
Script de Diagnóstico - Verificar Cookies y Autenticación
"""
import asyncio
import json
import httpx
from pathlib import Path

async def test_auth():
    storage_path = Path.home() / ".notebooklm" / "storage_state.json"
    
    print("=" * 70)
    print("🔍 Diagnóstico de Autenticación NotebookLM")
    print("=" * 70)
    print()
    
    # Leer cookies
    with open(storage_path, 'r') as f:
        storage_state = json.load(f)
    
    cookies_list = storage_state.get("cookies", [])
    print(f"📊 Total de cookies: {len(cookies_list)}")
    print()
    
    # Mostrar cookies importantes
    important_cookies = ["SID", "__Secure-1PSID", "__Secure-3PSID", "HSID", "SSID"]
    print("🔑 Cookies importantes:")
    for cookie in cookies_list:
        name = cookie.get("name")
        if name in important_cookies:
            value = cookie.get("value", "")
            print(f"  ✓ {name}: {value[:20]}... (len={len(value)})")
    print()
    
    # Convertir a dict para httpx
    cookies_dict = {c["name"]: c["value"] for c in cookies_list}
    cookie_header = "; ".join(f"{k}={v}" for k, v in cookies_dict.items())
    
    print("🌐 Probando petición a NotebookLM...")
    print()
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                "https://notebooklm.google.com/",
                headers={
                    "Cookie": cookie_header,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
                },
                follow_redirects=True,
                timeout=30.0,
            )
            
            final_url = str(response.url)
            status = response.status_code
            
            print(f"📍 URL final: {final_url}")
            print(f"📊 Status code: {status}")
            print()
            
            if "ServiceLogin" in final_url or "accounts.google.com" in final_url:
                print("❌ PROBLEMA: Redirigido a página de login")
                print("   Esto significa que Google no reconoce las cookies como válidas")
                print()
                print("💡 Posibles causas:")
                print("   1. Las cookies expiraron")
                print("   2. Falta el User-Agent correcto")
                print("   3. Google detecta que no es un navegador real")
                print("   4. Faltan headers adicionales")
                print()
                print("🔧 Solución recomendada:")
                print("   Usar la librería con un navegador real (Playwright)")
            else:
                print("✅ ¡Autenticación exitosa!")
                print("   La página de NotebookLM se cargó correctamente")
                
                # Buscar CSRF token
                if "SNlM0e" in response.text:
                    print("   ✓ CSRF token encontrado en la página")
                else:
                    print("   ⚠️  CSRF token NO encontrado")
                    
        except Exception as e:
            print(f"❌ Error en la petición: {e}")
    
    print()
    print("=" * 70)

if __name__ == "__main__":
    asyncio.run(test_auth())
