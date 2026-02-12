import sys
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
        print("[ERROR] No tokens found")
        sys.exit(1)
            
    client = NotebookLMClient(
        cookies=tokens.cookies,
        csrf_token=tokens.csrf_token,
        session_id=tokens.session_id
    )
    
    # Notebook ID for "Orion" from previous list
    notebook_id = "3ec36f41-61d5-4c31-873a-452f547b3e9b" 
    
    print(f"[INFO] Fetching details for notebook: {notebook_id}...")
    try:
        # Get Notebook Details
        # internal get_notebook returns raw RPC result
        notebook_data = client.get_notebook(notebook_id)
        
        # Parse it slightly to find sources
        # Structure is complex list, but api_client.py logic suggests:
        # result[1] = source list? or result[0][1]?
        # Actual retrieval via mcp tool wrapper 'notebook_get' handles parsing.
        # Let's inspect the raw return to confirm we got data.
        
        if not notebook_data:
            print("[ERROR] Returned empty data for notebook.")
            return

        print("[SUCCESS] Notebook data retrieved.")
        print(json.dumps(notebook_data, default=str)[:2000] + "...") 
        
        # The raw RPC result for get_notebook is:
        # [title, [sources], id, ...]
        
        if isinstance(notebook_data, list) and len(notebook_data) > 0:
            # Handle potential nesting: [ [title, sources, ...] ]
            if isinstance(notebook_data[0], list):
                data = notebook_data[0]
            else:
                data = notebook_data

            if len(data) >= 2:
                title = data[0] if isinstance(data[0], str) else "Unknown"
                sources = data[1] if isinstance(data[1], list) else []
                
                print(f"Title: {title}")
                print(f"Source count: {len(sources)}")
            
                if sources and len(sources) > 0:
                    first_source = sources[0]
                    # Source structure: [[id], title, ...]
                    if isinstance(first_source, list) and len(first_source) >= 2:
                        src_ids = first_source[0]
                        src_id = src_ids[0] if isinstance(src_ids, list) else src_ids
                        src_title = first_source[1]
                    
                    print(f"\n[INFO] Testing access to first source details...")
                    print(f"Source: {src_title} (ID: {src_id})")
                    
                    # Try to get full text
                    print("[INFO] Fetching source full text...")
                    source_content = client.get_source_fulltext(src_id)
                    
                    content_len = source_content.get('char_count', 0)
                    print(f"[SUCCESS] Retrieved {content_len} characters of text.")
                    print(f"Snippet: {source_content.get('content', '')[:100]}...")
                else:
                    print("[WARN] Could not parse first source structure.")
            else:
                print("[WARN] Notebook has no sources.")
        else:
            print("[WARN] Unexpected notebook data format.")

    except Exception as e:
        print(f"[ERROR] Failed checking notebook details: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
