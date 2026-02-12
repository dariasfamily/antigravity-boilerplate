import sys
import os
import json
from pathlib import Path

# Add site-packages to path
sys.path.append(r"C:\Users\daria\AppData\Roaming\Python\Python313\site-packages")

try:
    from notebooklm_mcp.api_client import NotebookLMClient
    from notebooklm_mcp.auth import load_cached_tokens
except ImportError:
    print("Could not import notebooklm_mcp. Please check path.")
    sys.exit(1)

def main():
    print("[INFO] Loading cached tokens...")
    tokens = load_cached_tokens()
    if not tokens:
        print("[ERROR] No tokens found in auth.json")
        sys.exit(1)
            
    print(f"[INFO] Tokens loaded. Extracted at: {tokens.extracted_at}")
    
    print("[INFO] Initializing Client...")
    client = NotebookLMClient(
        cookies=tokens.cookies,
        csrf_token=tokens.csrf_token,
        session_id=tokens.session_id
    )
    
    print("[INFO] Calling list_notebooks(debug=True)...")
    try:
        notebooks = client.list_notebooks(debug=True)
        print(f"[SUCCESS] Found {len(notebooks)} notebooks.")
        for nb in notebooks:
            print(f"- {nb.title} ({nb.id})")
    except Exception as e:
        print(f"[ERROR] Failed to list notebooks: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
