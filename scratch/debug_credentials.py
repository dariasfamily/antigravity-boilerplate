import requests
import sys

def test_zapier():
    print("\n--- Testing Zapier ---")
    url = "https://mcp.zapier.com/api/v1/connect?token=OTgxYTA3OWMtZTRiOC00OGEzLWI2YTItOTk2ODU4ODE4NWRlOnhMTXgrQldXZUxuai9vbkp6ek5zZkFoNkpLK1k1L0pmSm1WczJEc3BDSGc9"
    headers = {"Accept": "text/event-stream"}
    try:
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("[SUCCESS] Zapier connection accepted (SSE Stream Open).")
        else:
            print(f"[FAILED] Status: {response.status_code}")
            print(f"Response: {response.text[:200]}")
    except Exception as e:
        print(f"[ERROR] Zapier connection failed: {e}")

def test_notion():
    print("\n--- Testing Notion ---")
    url = "https://api.notion.com/v1/users/me"
    # Using the key provided in mcp_config.json
    api_key = "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"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Notion-Version": "2022-06-28"
    }
    
    print(f"Requesting {url} with key starting {api_key[:10]}...")
    try:
        response = requests.get(url, headers=headers, timeout=15)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("[SUCCESS] Notion Key is VALID.")
            print(f"User: {response.json().get('name', 'Unknown')}")
        else:
            print(f"[FAILED] Status {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"[ERROR] Notion request failed: {e}")

def test_rube():
    print("\n--- Testing Rube ---")
    url = "https://rube.app/mcp"
    api_key = "ak_MZIW2r2loez7Tee501sg"
    
    headers_variations = [
        {"Rube-Api-Key": api_key, "Label": "Header: Rube-Api-Key"},
        {"Authorization": f"Bearer {api_key}", "Label": "Header: Auth Bearer"},
        {"X-Api-Key": api_key, "Label": "Header: X-Api-Key"},
        {"Authorization": api_key, "Label": "Header: Auth (Raw)"}
    ]

    for headers in headers_variations:
        label = headers.pop("Label")
        print(f"Trying {label}...")
        try:
            # MCP usually uses POST for JSON-RPC, but GET might check auth on some endpoints. 
            # However, for SSE/MCP, it might be a GET to establish the stream.
            # Let's try GET first.
            response = requests.get(url, headers=headers, stream=True, timeout=10)
            print(f"  Status: {response.status_code}")
            if response.status_code == 200:
                print(f"  [SUCCESS] Accepted with {label}")
                return
            elif response.status_code != 401 and response.status_code != 403:
                 print(f"  [INFO] Got {response.status_code} (not 401), implies auth might be OK but method wrong?")
        except Exception as e:
            print(f"  [ERROR] Request failed: {e}")

def test_notion():
    print("\n--- Testing Notion ---")
    url = "https://api.notion.com/v1/users/me"
    api_key = "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"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Notion-Version": "2022-06-28"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("[SUCCESS] Notion Key is VALID.")
            print(f"User: {response.json().get('name', 'Unknown')}")
        else:
            print(f"[FAILED] Status {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"[ERROR] Notion request failed: {e}")

if __name__ == "__main__":
    test_zapier()
    test_rube()
    test_notion()
