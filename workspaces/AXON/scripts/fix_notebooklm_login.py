"""
NotebookLM Login - SOLUCIÓN FINAL

Usa el perfil persistente de Playwright que ya tiene las cookies guardadas.
"""
import asyncio
from playwright.async_api import async_playwright
from pathlib import Path
import json

async def login_with_persistent_profile():
    print("=" * 70)
    print("🔐 NotebookLM Login - Usando Perfil Persistente")
    print("=" * 70)
    print()
    
    profile_path = Path.home() / ".notebooklm" / "browser_profile"
    storage_path = Path.home() / ".notebooklm" / "storage_state.json"
    
    print(f"📁 Perfil: {profile_path}")
    print(f"💾 Storage: {storage_path}")
    print()
    
    async with async_playwright() as p:
        print("🚀 Abriendo navegador con perfil persistente...")
        
        # Usar el perfil persistente que ya tiene las cookies
        context = await p.chromium.launch_persistent_context(
            str(profile_path),
            headless=False,
            args=['--disable-blink-features=AutomationControlled']
        )
        
        page = context.pages[0] if context.pages else await context.new_page()
        
        print("📍 Navegando a NotebookLM...")
        await page.goto("https://notebooklm.google.com/", wait_until="networkidle")
        
        print()
        print("=" * 70)
        print("✅ Navegador abierto con perfil persistente")
        print("=" * 70)
        print()
        print("INSTRUCCIONES:")
        print("1. Si no estás logueado, loguéate ahora")
        print("2. Espera a ver tus notebooks")
        print("3. Presiona ENTER aquí")
        print()
        
        input("Presiona ENTER cuando veas tus notebooks... ")
        
        # Guardar el estado completo
        print("\n💾 Guardando cookies...")
        storage_state = await context.storage_state()
        
        # Verificar que tenemos las cookies necesarias
        cookies = storage_state.get("cookies", [])
        cookie_names = {c["name"] for c in cookies}
        required = {"SID", "HSID", "SSID", "__Secure-1PSID", "__Secure-3PSID"}
        
        print(f"\n📊 Total cookies: {len(cookies)}")
        print(f"🔑 Cookies encontradas: {sorted(cookie_names)[:10]}...")
        
        if required.issubset(cookie_names):
            print(f"✅ Todas las cookies requeridas están presentes!")
        else:
            missing = required - cookie_names
            print(f"⚠️  Faltan cookies: {missing}")
        
        # Guardar
        with open(storage_path, 'w', encoding='utf-8') as f:
            json.dump(storage_state, f, indent=2)
        
        print(f"\n✅ Cookies guardadas en: {storage_path}")
        print()
        print("=" * 70)
        print("🎉 ¡Listo!")
        print("=" * 70)
        print()
        print("Ahora puedes:")
        print("1. Cerrar este navegador (Ctrl+C)")
        print("2. Reiniciar Antigravity")
        print("3. El MCP server tendrá acceso a tus notebooks")
        print()
        
        # Mantener abierto si el usuario quiere
        print("Presiona Ctrl+C para cerrar...")
        try:
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            print("\n\n👋 Cerrando...")
            await context.close()

if __name__ == "__main__":
    asyncio.run(login_with_persistent_profile())
