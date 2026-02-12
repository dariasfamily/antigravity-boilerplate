†
import subprocess
import json
import os
import sys
import threading
import time

# Path to the executable
exe_path = r"C:\Users\daria\AppData\Roaming\Python\Python313\Scripts\notebooklm-mcp.exe"

def read_stderr(pipe):
    for line in iter(pipe.readline, ''):
        print(f"[STDERR] {line.strip()}")

try:
    print(f"Launching {exe_path} --debug...")
    process = subprocess.Popen(
        [exe_path, "--debug"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=0
    )

    t = threading.Thread(target=read_stderr, args=(process.stderr,))
    t.daemon = True
    t.start()

    # 1. Send Initialize
    print("Sending initialize...")
    init_req = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "test-script", "version": "1.0"}
        }
    }
    process.stdin.write(json.dumps(init_req) + "\n")
    process.stdin.flush()

    # Read Initialize Response
    while True:
        line = process.stdout.readline()
        if not line: break
        try:
            resp = json.loads(line)
            if resp.get("id") == 1:
                print("Received initialize response")
                break
        except: continue

    # 2. Send Initialized Notification
    print("Sending initialized notification...")
    notify_req = {
        "jsonrpc": "2.0",
        "method": "notifications/initialized"
    }
    process.stdin.write(json.dumps(notify_req) + "\n")
    process.stdin.flush()

    # 3. Send Resources List
    print("Sending resources/list...")
    list_req = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "resources/list"
    }
    process.stdin.write(json.dumps(list_req) + "\n")
    process.stdin.flush()

    # Read Resources Response
    print("Reading resources response...")
    while True:
        line = process.stdout.readline()
        if not line: break
        try:
            resp = json.loads(line)
            if resp.get("id") == 2:
                print("Found response!")
                print(json.dumps(resp, indent=2))
                break
        except: continue

    process.terminate()

except Exception as e:
    print(f"Error: {e}")
†*cascade082,file:///c:/Users/daria/test_mcp_handshake.py