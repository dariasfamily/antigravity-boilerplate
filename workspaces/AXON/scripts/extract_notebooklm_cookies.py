"""
NotebookLM Cookie Extractor - Usando tu Chrome con sesión activa

Este script usa tu perfil de Chrome donde ya estás logueado en Google,
evitando completamente el bloqueo de "browser not secure".
"""
import asyncio
import sys
import os
import json
from pathlib import Path

if not os.environ.get("HOME"):
    os.environ["HOME"] = str(Path.home())

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from playwright.async_api import async_playwright

STORAGE_PATH = Path.home() / ".notebooklm" / "storage_state.json"

# Ruta típica del perfil de Chrome en Windows
CHROME_USER_DATA = Path.home() / "AppData" / "Local" / "Google" / "Chrome" / "User Data"

async def extract_cookies_from_chrome():
    """Extrae cookies usando tu Chrome con sesión activa."""
    print("=" * 60)
    print("🍪 Extractor de Cookies - Usando tu Chrome Real")
    print("=" * 60)
    print()
    
    if not CHROME_USER_DATA.exists():
        print(f"❌ No se encontró Chrome en: {CHROME_USER_DATA}")
        print("\nPor favor, proporciona la ruta de tu perfil de Chrome.")
        return False
    
    print(f"✅ Perfil de Chrome encontrado: {CHROME_USER_DATA}")
    print("\n⚠️  IMPORTANTE: Cierra todas las ventanas de Chrome antes de continuar.")
    input("Presiona ENTER cuando hayas cerrado Chrome...")
    
    STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    async with async_playwright() as p:
        print("\n🌐 Abriendo Chrome con tu perfil...")
        
        try:
            # Usar el perfil de Chrome del usuario (donde ya está logueado)
            context = await p.chromium.launch_persistent_context(
                user_data_dir=str(CHROME_USER_DATA),
                headless=False,
                channel="chrome"
            )
            
            page = context.pages[0] if context.pages else await context.new_page()
            
            print("📱 Navegando a NotebookLM...")
            await page.goto("https://notebooklm.google.com/")
            
            print("\n✅ Si ya estás logueado, deberías ver NotebookLM cargando...")
            print("⏳ Esperando que la página cargue completamente...\n")
            
            # Esperar a que cargue (ya debería estar logueado)
            await page.wait_for_url("**/u/**", timeout=60000)
            await page.wait_for_timeout(3000)
            
            print("✅ NotebookLM cargado! Extrayendo cookies...")
            
            # Guardar cookies
            await context.storage_state(path=str(STORAGE_PATH))
            
            print(f"\n✅ Cookies guardadas en: {STORAGE_PATH}")
            print("\n" + "=" * 60)
            print("🎉 ¡EXTRACCIÓN COMPLETA!")
            print("=" * 60)
            print("\nAhora ejecuta: python scripts/sync_notebooklm.py\n")
            
            await context.close()
            return True
            
        except Exception as e:
            print(f"\n❌ Error: {e}")
            print("\nPosibles soluciones:")
            print("  1. Asegúrate de cerrar TODAS las ventanas de Chrome")
            print("  2. Verifica que estés logueado en Google en Chrome")
            print("  3. Intenta el método manual con EditThisCookie")
            return False

if __name__ == "__main__":
    success = asyncio.run(extract_cookies_from_chrome())
    sys.exit(0 if success else 1)
