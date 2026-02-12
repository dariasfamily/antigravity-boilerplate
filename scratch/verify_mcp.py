import sys
import json
import subprocess
import threading
import time

def read_json_rpc(process):
    """Reads JSON-RPC messages from stdout."""
    while True:
        line = process.stdout.readline()
        if not line:
            break
        try:
            message = json.loads(line)
            # Filter logs if they are not JSON-RPC (some servers dump logs to stdout)
            if "jsonrpc" in message:
                print(f"[RECV] {json.dumps(message)}")
                # If verify success (resources listed or capabilities shown), we good.
                if "result" in message:
                     if "resources" in message["result"]:
                        print(f"[SUCCESS] Resources found: {len(message['result']['resources'])}")
                        return
                     if "capabilities" in message["result"]:
                        print("[SUCCESS] Initialized with capabilities.")
                        # After init, try list_resources if supported
                        # But for now, just consistent handshake is enough success proof.
                        
        except json.JSONDecodeError:
            print(f"[LOG] {line.strip()}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python verify_mcp.py <command> [args...]")
        sys.exit(1)

    command = sys.argv[1:]
    print(f"[INFO] Starting MCP Server: {' '.join(command)}")

    try:
        # Start the MCP server process
        process = subprocess.Popen(
            command,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1,
            shell=True
        )
        
        # Start a thread to read stderr (logs)
        def read_stderr():
            for line in process.stderr:
                print(f"[STDERR] {line.strip()}")
        threading.Thread(target=read_stderr, daemon=True).start()

        # Start a thread to read stdout (responses)
        threading.Thread(target=read_json_rpc, args=(process,), daemon=True).start()

        # 1. Send Initialize Request
        init_request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "verify_script", "version": "1.0"}
            }
        }
        print(f"[SEND] {json.dumps(init_request)}")
        process.stdin.write(json.dumps(init_request) + "\n")
        process.stdin.flush()

        # Wait a bit
        time.sleep(2)

        # 2. Verify if it's still running
        if process.poll() is not None:
             print(f"[ERROR] Process exited with code {process.returncode}")
             sys.exit(1)

        # 3. Call refresh_auth
        refresh_call = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/call",
            "params": {
                "name": "refresh_auth",
                "arguments": {}
            }
        }
        print(f"[SEND] {json.dumps(refresh_call)}")
        process.stdin.write(json.dumps(refresh_call) + "\n")
        process.stdin.flush()

        time.sleep(5) # Wait for auth

        # 4. Send Resources List Request
        list_resources = {
            "jsonrpc": "2.0",
            "id": 3,
            "method": "resources/list",
            "params": {}
        }
        print(f"[SEND] {json.dumps(list_resources)}")
        process.stdin.write(json.dumps(list_resources) + "\n")
        process.stdin.flush()
        
        time.sleep(3)
        
        # Cleanup
        process.terminate()
        print("[INFO] Verification Complete.")

    except Exception as e:
        print(f"[CRITICAL] Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
