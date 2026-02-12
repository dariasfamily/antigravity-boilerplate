import json
import csv
import os

REGISTRY_PATH = r"C:\Users\daria\.gemini\AXON\hive\integrations\notebooklm\registry.json"
CSV_PATH = r"C:\Users\daria\.gemini\AXON\hive\integrations\notebooklm\notebooks_inventory.csv"

def sync_inventory():
    if not os.path.exists(REGISTRY_PATH):
        print(f"Error: Registry not found at {REGISTRY_PATH}")
        return

    with open(REGISTRY_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    notebooks = data.get("notebooks", [])
    
    with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["ID", "Title", "Sources", "Last Modified"])
        for nb in notebooks:
            writer.writerow([
                nb.get("id"),
                nb.get("title"),
                nb.get("sources"),
                nb.get("modified")
            ])
    
    print(f"Successfully synced {len(notebooks)} notebooks to {CSV_PATH}")

if __name__ == "__main__":
    sync_inventory()
