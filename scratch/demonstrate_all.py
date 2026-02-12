import json
import subprocess
import os
import sys
import time
import threading

CONFIG_PATH = r"C:\Users\daria\.gemini\AXON\mcp_config.json"

def read_output(process, name, result_container):
    """Reads stdout line by line and parses JSON-RPC."""
    # buffer = ""
    while True:
        line = process.stdout.readline()
        if not line:
            break
        
        try:
            line_str = line.strip()
            if not line_str: continue
            
            # print(f"[{name} RAW] {line_str[:100]}") # Debug
            
            try:
                msg = json.loads(line_str)
                
                # Check for tools/list result
                if "result" in msg and "tools" in msg["result"]:
                    tools = msg["result"]["tools"]
                    t_names = [t["name"] for t in tools]
                    result_container["tools"] = t_names
                    result_container["status"] = "OK"
                
                # Check for resources/list result
                if "result" in msg and "resources" in msg["result"]:
                    res = msg["result"]["resources"]
                    result_container["resources"] = len(res)
                    result_container["status"] = "OK"

            except json.JSONDecodeError:
                pass
        except Exception as e:
            print(f"[{name} READ ERROR] {e}")
            break

def verify_server(name, config):
    print(f"\n--- Checking {name.upper()} ---")
    if config.get("disabled"):
        print(f"Skipping {name} (Disabled)")
        return None

    cmd = config["command"]
    args = config["args"]
    env = os.environ.copy()
    env.update(config.get("env", {}))
    
    if cmd == "npx" and os.name == "nt":
        cmd = "npx.cmd"

    full_cmd = [cmd] + args
    
    result = {"status": "NO_RESPONSE", "tools": [], "resources": 0}
    
    try:
        process = subprocess.Popen(
            full_cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1,
            env=env,
            shell=True
        )
        
        t = threading.Thread(target=read_output, args=(process, name, result), daemon=True)
        t.start()
        
        # Initialize
        requests = [
            {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "demo", "version": "1.0"}}},
            {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}},
            {"jsonrpc": "2.0", "id": 3, "method": "resources/list", "params": {}}
        ]
        
        for req in requests:
            if process.poll() is not None: break
            try:
                process.stdin.write(json.dumps(req) + "\n")
                process.stdin.flush()
                time.sleep(0.5)
            except: break
            
        time.sleep(3)
        process.terminate()
        
        # Report
        status = result["status"]
        tools = result.get("tools", [])
        res_count = result.get("resources", 0)
        
        print(f"Status: {status}")
        if status == "OK":
            if tools:
                print(f"Tools ({len(tools)}): {', '.join(tools[:5])}{'...' if len(tools)>5 else ''}")
            if res_count > 0:
                print(f"Resources: {res_count} items found")
        else:
            print("No valid JSON-RPC response received.")

    except Exception as e:
        print(f"Failed to run: {e}")

def main():
    with open(CONFIG_PATH, "r") as f:
        config = json.load(f)
    servers = config.get("mcpServers", {})
    
    targets = ["notebooklm", "make", "zapier", "notion"]
    for t in targets:
        if t in servers:
            verify_server(t, servers[t])
        else:
            print(f"\n--- Checking {t.upper()} ---\nNot found in config")

if __name__ == "__main__":
    main()
