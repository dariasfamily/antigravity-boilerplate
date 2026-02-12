"""
NotebookLM Authentication - Using Your Real Chrome Profile

This script uses your existing Chrome browser with your Google session already logged in.
This avoids Google's "insecure browser" detection.
"""
import asyncio
import sys
from pathlib import Path

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from playwright.async_api import async_playwright

STORAGE_PATH = Path.home() / ".notebooklm" / "storage_state.json"

async def setup_auth():
    """One-time authentication using your real Chrome browser."""
    print("=" * 60)
    print("🔐 NotebookLM Authentication Setup (Using Real Chrome)")
    print("=" * 60)
    print("\nThis will use your existing Chrome browser.\n")
    
    STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    async with async_playwright() as p:
        print("🌐 Connecting to your Chrome browser...")
        
        # Use channel="chrome" to use the real installed Chrome
        browser = await p.chromium.launch(
            headless=False,
            channel="chrome"  # Uses real Chrome instead of Chromium
        )
        
        context = await browser.new_context()
        page = await context.new_page()
        
        print("📱 Opening NotebookLM...")
        await page.goto("https://notebooklm.google.com/")
        
        print("\n" + "=" * 60)
        print("⏳ PLEASE LOG IN (if needed) IN THE CHROME WINDOW")
        print("=" * 60)
        print("\nIf you're already logged in to Google, just wait.")
        print("Otherwise, complete the login.")
        print("(Window will close automatically)\n")
        
        try:
            # Wait for successful navigation to the app
            await page.wait_for_url("**/u/**", timeout=300000)
            await page.wait_for_timeout(3000)
            
            print("\n✅ Detected successful login! Saving credentials...")
            await context.storage_state(path=str(STORAGE_PATH))
            
            print(f"✅ Saved to: {STORAGE_PATH}")
            print("\n" + "=" * 60)
            print("🎉 SETUP COMPLETE!")
            print("=" * 60)
            print("\nRun: python scripts/sync_notebooklm.py\n")
            
        except Exception as e:
            print(f"\n❌ Error: {e}")
            print("\nTroubleshooting:")
            print("  - Make sure you're logged in to Google in Chrome")
            print("  - Try visiting notebooklm.google.com manually first")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(setup_auth())
