import os
import sys
import subprocess
import datetime
import json
from pathlib import Path

# OCULUS - THE AUDITOR AGENT
# The Immune System of Antigravity

# --- 1. DEPENDENCY CHECK ---
def install_package(package):
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    except:
        print(f"⚠️ Failed to auto-install {package}. Some features may break.")

try:
    import requests
    import dotenv
except ImportError:
    print("🔧 Ocular Upgrade: Installing dependencies...")
    install_package("requests")
    install_package("python-dotenv")
    import requests
    import dotenv

# --- 2. CONFIGURATION ---
ROOT_DIR = Path(__file__).parent.parent.parent.parent.parent.resolve()
ENV_FILE = ROOT_DIR / '.env.local'
LOG_FILE = Path(__file__).parent.parent.parent.parent.parent.parent.parent / 'brain/e6fc57ba-9b26-455d-bcf0-142947e7b879/SYSTEM_STATE_LOG.md'
N8N_WEBHOOK = "http://localhost:5678/webhook/system-signal"

dotenv.load_dotenv(ENV_FILE)

# --- 3. LOGGING MEMORY ---
def log_event(event, details, success):
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    icon = "✅" if success else "❌"
    row = f"| {date_str} | Oculus (Agent) | {event} | {details} | {icon} |\n"
    
    try:
        if LOG_FILE.exists():
            with open(LOG_FILE, "a", encoding="utf-8") as f:
                f.write(row)
        else:
            print("⚠️ Log file missing from Brain.")
    except Exception as e:
        print(f"❌ Memory Write Error: {e}")

# --- 4. IMMUNE FUNCTIONS ---
def check_secrets():
    if not ENV_FILE.exists():
        print("❌ CRITICAL: .env.local missing.")
        log_event("AUDIT_ENV", "Missing .env.local", False)
        return False
    
    secret = os.environ.get("ANTIGRAVITY_SECRET")
    if not secret:
        print("❌ CRITICAL: ANTIGRAVITY_SECRET missing.")
        log_event("AUDIT_SECR", "Missing Identity Token", False)
        return False
    
    print("✅ IDENTITY: Verified.")
    return True

def check_anatomy():
    # Define Core Anatomy. True = Critical (Start Fail), False = Regenerable (Auto-Fix)
    anatomy = {
        "src/app": True,
        "src/lib/supabase": True,
        "src/components/ui": False, # Missing in previous audits
        "src/skills": True
    }
    
    all_ok = True
    
    for path_str, is_critical in anatomy.items():
        fullpath = ROOT_DIR / path_str
        if not fullpath.exists():
            if is_critical:
                print(f"❌ CRITICAL DAMAGE: Missing {path_str}")
                log_event("AUDIT_STRUCT", f"Missing Critical {path_str}", False)
                all_ok = False
            else:
                print(f"🔧 AUTO-HEAL: Regenerating {path_str}...")
                try:
                    os.makedirs(fullpath, exist_ok=True)
                    print(f"   ✅ Healed: {path_str}")
                    log_event("AUTO_HEAL", f"Created {path_str}", True)
                except Exception as e:
                    print(f"   ❌ Heal Failed: {e}")
                    log_event("AUTO_HEAL_FAIL", f"Failed {path_str}", False)
                    all_ok = False
        else:
            # print(f"✅ ANATOMY: {path_str} exists.") # Too verbose
            pass
            
    print("✅ ANATOMY: Scanned.")
    return all_ok

def signal_nervous_system(success, details):
    payload = {
        "event": "AUDIT_COMPLETE",
        "agent": "OCULUS",
        "timestamp": datetime.datetime.now().isoformat(),
        "status": "HEALTHY" if success else "CRITICAL",
        "details": details
    }
    
    try:
        requests.post(N8N_WEBHOOK, json=payload, timeout=2)
        print("✅ HERMES: Signal transmitted to N8N.")
    except requests.exceptions.ConnectionError:
        print("⚠️  HERMES: N8N Unreachable (Is it running?).")
    except Exception as e:
        print(f"⚠️  HERMES: Signal Error: {e}")

# --- 5. EXECUTION ---
if __name__ == "__main__":
    print("\n👁️  OCULUS ONLINE: System Scan Initiated...")
    
    s_ok = check_secrets()
    a_ok = check_anatomy()
    
    system_healthy = s_ok and a_ok
    status = "System Nominal" if system_healthy else "Integrity Breach"
    
    log_event("AUDIT_RUN", status, system_healthy)
    signal_nervous_system(system_healthy, status)
    
    final_msg = "🛡️  SYSTEM GREEN" if system_healthy else "❌ SYSTEM RED"
    print(f"\n{final_msg}\n")
    
    if not system_healthy:
        sys.exit(1)