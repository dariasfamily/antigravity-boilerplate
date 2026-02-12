‰ 
import json
import os
import urllib.parse
from pathlib import Path
import httpx

# Configuration
BATCHEXECUTE_URL = "https://notebooklm.google.com/_/LabsTailwindUi/data/batchexecute"
RPC_LIST_NOTEBOOKS = "wXbhsf"

def load_auth():
    auth_path = Path.home() / ".notebooklm-mcp" / "auth.json"
    if not auth_path.exists():
        print(f"Auth file not found: {auth_path}")
        return None
    
    with open(auth_path, "r") as f:
        return json.load(f)

def build_request_body(rpc_id, params, csrf_token):
    params_json = json.dumps(params, separators=(',', ':'))
    f_req = [[[rpc_id, params_json, None, "generic"]]]
    f_req_json = json.dumps(f_req, separators=(',', ':'))
    
    body_parts = [f"f.req={urllib.parse.quote(f_req_json, safe='')}"]
    if csrf_token:
        body_parts.append(f"at={urllib.parse.quote(csrf_token, safe='')}")
    
    return "&".join(body_parts) + "&"

def build_url(session_id):
    params = {
        "rpcids": RPC_LIST_NOTEBOOKS,
        "source-path": "/",
        "bl": "boq_labs-tailwind-frontend_20260208.03_p0", # Updated from observation
        "hl": "en",
        "rt": "c",
    }
    if session_id:
        params["f.sid"] = session_id
    
    query = urllib.parse.urlencode(params)
    return f"{BATCHEXECUTE_URL}?{query}"

def main():
    auth = load_auth()
    if not auth:
        return

    cookies = auth.get("cookies", {})
    csrf_token = auth.get("csrf_token", "")
    session_id = auth.get("session_id", "")

    print(f"Loaded auth with {len(cookies)} cookies")
    print(f"CSRF: {csrf_token}")
    print(f"SID: {session_id}")

    # Build client
    cookie_str = "; ".join(f"{k}={v}" for k, v in cookies.items())
    headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Origin": "https://notebooklm.google.com",
        "Referer": "https://notebooklm.google.com/",
        "Cookie": cookie_str,
        "X-Same-Domain": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    }

    # Prepare request
    params = [None, 1, None, [2]]
    body = build_request_body(RPC_LIST_NOTEBOOKS, params, csrf_token)
    url = build_url(session_id)

    print("\nSending request...")
    try:
        with httpx.Client(headers=headers, timeout=30.0) as client:
            response = client.post(url, content=body)
            print(f"Status: {response.status_code}")
            
            print("\n--- Response Body ---")
            print(response.text[:2000]) # Print first 2000 chars
            if len(response.text) > 2000:
                print("... (truncated)")
            print("\n---------------------")


            # Try to verify if it contains keywords like "Untitled" or known notebook names
            # User has 28 notebooks, so it should be large.
            
            # Parse it
            lines = response.text.strip().split("\n")
            for line in lines:
                if line.startswith(("[", "{")) or line.isdigit():
                    try:
                        if line.isdigit(): continue
                        data = json.loads(line)
                        print(f"Outer type: {type(data)}")
                        if isinstance(data, list):
                            for item in data:
                                if isinstance(item, list) and len(item) >= 3 and item[0] == "wrb.fr" and item[1] == RPC_LIST_NOTEBOOKS:
                                    payload = item[2]
                                    print("Found payload!")
                                    with open("c:\\Users\\daria\\payload.json", "w") as f:
                                        f.write(payload)
                                    print("Saved payload to c:\\Users\\daria\\payload.json")
                    except:
                        pass


    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
ú *cascade08úü*cascade08ü” *cascade08”– *cascade08–—*cascade08—˜ *cascade08˜š*cascade08š *cascade08*cascade08¡ *cascade08¡¢*cascade08¢£ *cascade08£§*cascade08§ª *cascade08ª­*cascade08­° *cascade08°³*cascade08³º *cascade08º¾*cascade08¾À *cascade08ÀÁ*cascade08ÁÃ *cascade08ÃÄ*cascade08ÄÉ *cascade08ÉÊ *cascade08Ê÷ *cascade08÷ù*cascade08ùú *cascade08úû *cascade08ûı *cascade08ış *cascade08şÿ *cascade08ÿ‚*cascade08‚„ *cascade08„†*cascade08†ˆ *cascade08ˆ¦ *cascade08¦¬*cascade08¬³ *cascade08³´*cascade08´µ *cascade08µ¸*cascade08¸¹ *cascade08¹½*cascade08½¾ *cascade08¾Á *cascade08ÁÄ *cascade08ÄÉ*cascade08ÉÊ*cascade08ÊĞ*cascade08ĞÑ*cascade08ÑÒ *cascade08ÒÖ*cascade08ÖÚ*cascade08ÚÛ *cascade08ÛÜ*cascade08Üİ *cascade08İâ*cascade08âú *cascade08ú¡ *cascade08¡‰  *cascade0820file:///c:/Users/daria/inspect_notebooklm_raw.py