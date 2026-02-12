import subprocess
import json
import sys
import os
import time

# Zapier configuration
config = {
    "command": "npx",
    "args": [
        "-y",
        "mcp-remote",
        "https://mcp.zapier.com/api/v1/connect?token=OTgxYTA3OWMtZTRiOC00OGEzLWI2YTItOTk2ODU4ODE4NWRlOnhMTXgrQldXZUxuai9vbkp6ek5zZkFoNkpLK1k1L0pmSm1WczJEc3BDSGc9",
        "--transport",
        "sse-only"
    ]
}

def verify_zapier():
    print(f"--- Verifying Zapier with SSE ---")
    try:
        cmd = [config["command"]] + config["args"]
        print(f"Running command: {' '.join(cmd)}")
        
        # Use shell=True for npx on Windows
        process = subprocess.Popen(
            cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=sys.stderr, # print stderr to console so we see mcp-remote logs
            text=True,
            bufsize=0,
            shell=True 
        )

        print("Waiting for process to start...", file=sys.stderr)
        time.sleep(5) # Give it a moment to launch

        # Initialize
        init_req = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "test-client", "version": "1.0"}
            }
        }
        
        print(f"Sending initialize...", file=sys.stderr)
        process.stdin.write(json.dumps(init_req) + "\n")
        process.stdin.flush()
        
        # Read init response
        print("Waiting for initialize response...", file=sys.stderr)
        response = process.stdout.readline()
        
        if not response:
             print(f"Failed to get init response. Process might have exited.", file=sys.stderr)
             return

        print(f"Received init response: {response[:100]}...", file=sys.stderr)
        
        # Initialized notification
        process.stdin.write(json.dumps({
            "jsonrpc": "2.0",
            "method": "notifications/initialized"
        }) + "\n")
        process.stdin.flush()

        # List Tools
        list_req = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/list" 
        }
        
        print(f"Sending tools/list...", file=sys.stderr)
        process.stdin.write(json.dumps(list_req) + "\n")
        process.stdin.flush()
        
        response = process.stdout.readline()
        if response:
            print(f"✅ Zapier: Successfully connected! Response: {response[:200]}")
        else:
             print(f"❌ Zapier: No response to tools/list.")

        process.terminate()

    except Exception as e:
        print(f"❌ Zapier: Error: {e}")

if __name__ == "__main__":
    verify_zapier()
