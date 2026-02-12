import os
import sys
import json
import argparse
import subprocess
import datetime
from pathlib import Path

# HERMES - THE SYSTEM ROUTER
# "The Message Must Go Through"

ROOT_DIR = Path(__file__).parent.parent.parent.parent.resolve()
SKILLS_DIR = ROOT_DIR / 'skills'

def log_transmission(sender, recipient, status, details):
    # Simple logging to stdout for now, the Auditor picks up logs later.
    timestamp = datetime.datetime.now().isoformat()
    icon = "📨" if status == "SENT" else "❌"
    print(f"{icon} [{timestamp}] HERMES: {sender} -> {recipient} | {status} | {details}")

def resolve_recipient_path(recipient):
    # Discovery Logic: Check if skill exists in src/skills/
    skill_path = SKILLS_DIR / recipient
    handler_script = skill_path / f"scripts/{recipient}_handler.py"
    
    if handler_script.exists():
        return handler_script
    return None

def route_message(recipient, action, payload_str):
    # 1. Resolve Target
    target_script = resolve_recipient_path(recipient)
    
    if not target_script:
        log_transmission("USER/HIVE", recipient, "FAILED", "Recipient not found")
        sys.exit(1)
        
    print(f"🕊️  HERMES: Routing '{action}' to {recipient}...")

    # 2. Prepare Payload (Converting JSON string to args)
    # This is a basic implementation. Ideally, agents should accept JSON stdin.
    # For now, we map specific known agents or pass raw args.
    
    cmd = [sys.executable, str(target_script)]
    
    try:
        payload = json.loads(payload_str)
    except json.JSONDecodeError:
        print("❌ Payload must be valid JSON.")
        sys.exit(1)

    # ADAPTER LOGIC (Refactor this as we scale)
    if recipient == "wealth_manager":
        if action == "add":
            cmd.extend(["add", "--name", payload.get("name"), "--type", payload.get("type"), "--value", str(payload.get("value")), "--currency", payload.get("currency")])
        elif action == "list":
            cmd.extend(["list"])
            
    elif recipient == "auditor_agent":
        # Auditor takes no args currently
        pass

    elif recipient == "n8n":
        import requests
        try:
            # Default to local n8n webhook
            N8N_URL = "http://localhost:5678/webhook/hermes-gateway"
            response = requests.post(N8N_URL, json=payload, timeout=2)
            if response.status_code == 200:
                print(f"✅ HERMES: Delivered to n8n Gateway.")
            else:
                print(f"⚠️  HERMES: n8n responded with {response.status_code}")
        except Exception as e:
            print(f"❌ HERMES: n8n Connection Failed: {e}")
            sys.exit(1)
        return # Terminate after API call, no subprocess needed
        
    else:
        # Generic Passthrough (Future Proofing)
        # cmd.extend([action, payload_str])
        print(f"⚠️  Generic routing for {recipient} not fully implemented. Running script raw.")

    # 3. Execute
    try:
        subprocess.check_call(cmd)
        log_transmission("USER/HIVE", recipient, "SENT", f"Action: {action}")
    except subprocess.CalledProcessError as e:
        log_transmission("USER/HIVE", recipient, "ERROR", f"Target crashed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Hermes System Router")
    subparsers = parser.add_subparsers(dest="command")

    # Command: Send
    send_parser = subparsers.add_parser("send", help="Send a message to an agent")
    send_parser.add_argument("--recipient", required=True, help="Name of the target skill")
    send_parser.add_argument("--action", required=True, help="Action command")
    send_parser.add_argument("--payload", default="{}", help="JSON payload string")

    args = parser.parse_args()

    if args.command == "send":
        route_message(args.recipient, args.action, args.payload)
    else:
        parser.print_help()