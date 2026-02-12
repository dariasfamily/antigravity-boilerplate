import asyncio
import os
import sys
from notebooklm.client import NotebookLMClient

# Constants
EXPORT_DIR = "notebooklm/exports"

async def main():
    """
    Synchronizes notebooks from Google NotebookLM to local folder.
    Uses stored credentials from ~/.notebooklm/storage_state.json
    Run scripts/login_notebooklm.py first to authenticate.
    """
    print("🔐 Authenticating with NotebookLM...")
    
    try:
        # Use stored credentials (from login_notebooklm.py)
        async with await NotebookLMClient.from_storage() as client:
            print("✅ Authenticated!")
            print("📚 Fetching notebooks...")
            
            notebooks = await client.notebooks.list()
            print(f"Found {len(notebooks)} notebooks.\n")

            if not os.path.exists(EXPORT_DIR):
                os.makedirs(EXPORT_DIR)

            for nb in notebooks:
                print(f"   - {nb.title} (ID: {nb.id})")
                # Future: Download content
                # content = await client.notebooks.get(nb.id)
                
    except FileNotFoundError:
        print("❌ No stored credentials found.")
        print("Please run: python scripts/login_notebooklm.py")
    except Exception as e:
        print(f"❌ Failed to sync: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())

