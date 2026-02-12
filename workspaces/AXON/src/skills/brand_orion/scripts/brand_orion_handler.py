import os
import sys
import json
import datetime
from dotenv import load_dotenv

# Add project root to sys.path to allow imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

# Load environment variables
load_dotenv()

def get_drive_service():
    """Stub for Google Drive Service (simulated via print for MVP)."""
    # Real implementation would use google-auth and googleapiclient
    print("[SYSTEM] Connecting to Google Drive Service...")
    return True

def read_research_prompt():
    """Reads the Master Prompt from Google Docs."""
    doc_id = "1DUR2mJnqMQUlBGsjNscgbLOBD0mg3062CS0lau--0tQ" # Hardcoded for MVP
    print(f"[ORION] Reading Research Prompt (Doc ID: {doc_id})...")
    # In a full implementation, we'd fetch the content via API.
    return "Research Prompt Content Loaded."

def write_to_log(message):
    """Appends a message to the Writers Room Log."""
    doc_id = "1-5yCpDk6spIjlIOW0iTPMvRf5EiH1ITU-e0yN9Zj1fY" # Hardcoded for MVP
    timestamp = datetime.datetime.now().isoformat()
    entry = f"\n\n## 🔵 ORION STRATEGY UPDATE [{timestamp}]\n{message}\n"
    print(f"[ORION] Writing to Writers Room Log (Doc ID: {doc_id}):\n{entry}")
    
    # In the fully autonomous version, this calls the Rube/Composio tool "GOOGLEDOCS_INSERT_TEXT_ACTION"
    # For now, we simulate the logic to prove the agent flow.
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python brand_orion_handler.py [action] [args]")
        sys.exit(1)

    action = sys.argv[1]

    if action == "init":
        print("[ORION] Initializing Neural Link...")
        get_drive_service()
        read_research_prompt()
        write_to_log("Orion Online. Neural Link Established. Ready for command.")
        print("[ORION] Initialization Complete.")

    elif action == "strategy":
        topic = sys.argv[2] if len(sys.argv) > 2 else "General"
        strategy = f"Analyzing trends for: {topic}. Hypothesis: High Viral Potential."
        write_to_log(strategy)
        
    else:
        print(f"Unknown action: {action}")

if __name__ == "__main__":
    main()
