
import os
import json
import time

def audit_text(content):
    """
    Mock Audit: Checks for forbidden words and keyword density.
    """
    forbidden = ["boring", "scam", "cheap"]
    score = 100
    for word in forbidden:
        if word in content.lower():
            score -= 20
    
    return {
        "safety_score": score,
        "status": "APPROVED" if score > 80 else "REJECTED"
    }

def main():
    print("[ARGUS] Opening the Eye...")
    
    # Simulate receiving a request
    # In a real scenario, this reads from a queue or CLI args
    target_content = """
    # SCRIPT: The Future of AI
    ...
    HOOK: Stop scrolling. This is not boring.
    ...
    """
    
    print(f"[ARGUS] Auditing Content ({len(target_content)} chars)...")
    time.sleep(1)
    
    result = audit_text(target_content)
    
    print(f"[ARGUS] RESULT: {result['status']} (Score: {result['safety_score']})")
    
    if result['status'] == "APPROVED":
        print("[ARGUS] Stamping 'QA_PASSED'. Forwarding to Echo...")
    else:
        print("[ARGUS] Flagging for revision.")

    # Return JSON for System Bus
    return json.dumps({
        "status": "success",
        "action": "audit",
        "audit_result": result
    })

if __name__ == "__main__":
    main()
