"""
NotebookLM Login - Mantener Navegador Abierto

Este script abre el navegador y lo mantiene abierto para que el MCP server
pueda acceder a la sesión activa.
"""
import asyncio
from playwright.async_api import async_playwright
from pathlib import Path
import json

async def login_and_keep_open():
    print("=" * 70)
    print("🌐 NotebookLM - Login con Navegador Persistente")
    print("=" * 70)
    print()
    print("Este script:")
    print("1. Abre un navegador Chromium")
    print("2. Te permite loguearte en NotebookLM")
    print("3. MANTIENE el navegador abierto")
    print("4. Guarda las cookies automáticamente")
    print()
    print("⚠️  NO CIERRES ESTE TERMINAL - mantiene el navegador activo")
    print()
    
    storage_path = Path.home() / ".notebooklm" / "storage_state.json"
    storage_path.parent.mkdir(parents=True, exist_ok=True)
    
    async with async_playwright() as p:
        print("🚀 Abriendo navegador...")
        
        # Abrir navegador en modo persistente
        browser = await p.chromium.launch(
            headless=False,
            channel="chrome"  # Usar Chrome instalado
        )
        
        # Crear contexto
        context = await browser.new_context()
        page = await context.new_page()
        
        print("📍 Navegando a NotebookLM...")
        await page.goto("https://notebooklm.google.com/")
        
        print()
        print("=" * 70)
        print("✅ Navegador abierto")
        print("=" * 70)
        print()
        print("INSTRUCCIONES:")
        print("1. Loguéate en el navegador si no estás logueado")
        print("2. Espera a ver tus notebooks")
        print("3. Presiona ENTER aquí para guardar cookies")
        print("4. El navegador se quedará abierto")
        print()
        
        input("Presiona ENTER cuando hayas logueado... ")
        
        # Guardar cookies
        print("\n💾 Guardando cookies...")
        storage_state = await context.storage_state()
        
        with open(storage_path, 'w', encoding='utf-8') as f:
            json.dump(storage_state, f, indent=2)
        
        print(f"✅ Cookies guardadas en: {storage_path}")
        print()
        print("=" * 70)
        print("🎉 ¡Listo! Ahora:")
        print("=" * 70)
        print()
        print("1. Deja este navegador ABIERTO")
        print("2. Reinicia Antigravity")
        print("3. El MCP server podrá acceder a tus notebooks")
        print()
        print("⚠️  Para cerrar: Presiona Ctrl+C en este terminal")
        print()
        
        # Mantener el navegador abierto
        try:
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            print("\n\n👋 Cerrando navegador...")
            await browser.close()

if __name__ == "__main__":
    asyncio.run(login_and_keep_open())
