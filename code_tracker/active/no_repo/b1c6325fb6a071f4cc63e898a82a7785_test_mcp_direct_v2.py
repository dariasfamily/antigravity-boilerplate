»	
import subprocess
import json
import os
import sys

# Path to the executable
exe_path = r"C:\Users\daria\AppData\Roaming\Python\Python313\Scripts\notebooklm-mcp.exe"

# JSON-RPC request
request = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "resources/list"
}

print(f"Launching {exe_path}...")
try:
    process = subprocess.Popen(
        [exe_path],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=0
    )

    print("Sending request...")
    json_req = json.dumps(request) + "\n"
    process.stdin.write(json_req)
    process.stdin.flush()

    print("Reading response...")
    # Read line by line
    while True:
        line = process.stdout.readline()
        if not line:
            break
        print(f"Received: {line.strip()}")
        try:
            resp = json.loads(line)
            if resp.get("id") == 1:
                print("Found response!")
                print(json.dumps(resp, indent=2))
                break
        except json.JSONDecodeError:
            continue

    process.terminate()

except Exception as e:
    print(f"Error: {e}")
»	*cascade082,file:///c:/Users/daria/test_mcp_direct_v2.py