
import os
import shutil
import hashlib
import json
import time

# PATHS
BRAIN_DIR = r"C:\Users\daria\.gemini\AXON\brain\e6fc57ba-9b26-455d-bcf0-142947e7b879"
LIVE_DNA = os.path.join(BRAIN_DIR, "BRAND_DNA.md")
GOLDEN_DNA = r"C:\Users\daria\.gemini\AXON\scratch\AXON-boilerplate\.recovery\BRAND_DNA.golden.md"

def get_hash(filepath):
    """Calculates SHA256 hash of a file."""
    if not os.path.exists(filepath):
        return None
    with open(filepath, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def protect_core():
    """
    Checks if BRAND_DNA.md is corrupted or missing.
    Restores from Golden Copy if needed.
    """
    print("[GUARDIAN] Scannning Core Identity...")
    
    live_hash = get_hash(LIVE_DNA)
    golden_hash = get_hash(GOLDEN_DNA)
    
    if not golden_hash:
        print("[ERROR] Golden Copy missing! Creating new baseline...")
        if os.path.exists(LIVE_DNA):
            shutil.copy(LIVE_DNA, GOLDEN_DNA)
            return {"status": "baseline_created"}
        else:
            return {"status": "critical_failure", "msg": "No DNA found anywhere."}

    if not live_hash:
        print("[WARNING] Live DNA missing. Restoring from Golden Copy...")
        shutil.copy(GOLDEN_DNA, LIVE_DNA)
        return {"status": "restored", "reason": "missing_file"}
        
    if live_hash != golden_hash:
        # COMPLEXITY: Has user edited it? Or is it corruption?
        # For this stricter Admin requirement, we assume ANY deviation invites a check.
        # But auto-revert might analyze content first. For MVP, we alert.
        print("[ALERT] Integrity Mismatch. Live DNA differs from Golden Record.")
        # Optional: Auto-correct if policy is strict
        # shutil.copy(GOLDEN_DNA, LIVE_DNA) 
        return {"status": "mismatch", "live": live_hash, "golden": golden_hash}

    print("[GUARDIAN] Identity Verified. System Secure.")
    return {"status": "secure"}

if __name__ == "__main__":
    protect_core()
