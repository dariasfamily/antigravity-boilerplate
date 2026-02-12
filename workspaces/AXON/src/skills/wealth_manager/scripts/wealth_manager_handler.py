import os
import sys
import json
import subprocess
import argparse
from pathlib import Path

# WEALTH MANAGER HANDLER (The Financial Hand)
# Interacts with Supabase to manage wealth assets.

# --- 1. SELF-CORRECTION (Dependency Check) ---
def install_package(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from supabase import create_client, Client
    import dotenv
except ImportError:
    print("ðŸ”§ Auto-installing dependencies (supabase, python-dotenv)...")
    install_package("supabase")
    install_package("python-dotenv")
    from supabase import create_client, Client
    import dotenv

# --- 2. CONFIGURATION ---
ROOT_DIR = Path(__file__).parent.parent.parent.parent.parent.resolve()
ENV_PATH = ROOT_DIR / '.env.local'
dotenv.load_dotenv(ENV_PATH)

URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
KEY = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not URL or not KEY:
    print("âŒ CRITICAL: Supabase credentials missing in .env.local")
    sys.exit(1)

supabase: Client = create_client(URL, KEY)

# --- 3. LOGIC ---

def add_asset(name, asset_type, value, currency):
    print(f"ðŸ’° Adding Asset: {name} ({asset_type}) = {value} {currency}...")
    
    data = {
        "user_id": "00000000-0000-0000-0000-000000000000", # Placeholder for strict RLS, usually need real user
        "name": name,
        "type": asset_type,
        "value": float(value),
        "currency": currency,
        "status": "active"
    }

    # Note: In a real app with RLS, we need a Service Role Key or Auth Token.
    # For this system running locally as Admin, we might need SERVICE_ROLE if RLS blocks ANON.
    # Let's try ANON first (AXON Boilerplate might have open policies for now or we need to upgrade input).
    
    try:
        response = supabase.table("wealth_assets").insert(data).execute()
        # Check if response has data (Supabase-py v2 returns object with .data)
        if hasattr(response, 'data') and response.data:
            print(f"âœ… Success! Asset ID: {response.data[0]['id']}")
        else:
             print("âš ï¸  Warning: No data returned. Check RLS policies.")
    except Exception as e:
        print(f"âŒ Error inserting asset: {e}")

def list_assets():
    print("ðŸ“Š Fetching Portfolio...")
    try:
        response = supabase.table("wealth_assets").select("*").execute()
        assets = response.data
        if not assets:
            print("ðŸ“­ Portfolio is empty.")
            return

        total = 0
        print(f"\n{'NAME':<20} | {'TYPE':<10} | {'VALUE':<12}")
        print("-" * 46)
        for asset in assets:
            val = asset.get('value', 0)
            total += val
            print(f"{asset.get('name'):<20} | {asset.get('type'):<10} | {val:,.2f} {asset.get('currency')}")
        print("-" * 46)
        print(f"ðŸ’Ž TOTAL NET WORTH: {total:,.2f}\n")

    except Exception as e:
        print(f"âŒ Error fetching assets: {e}")

# --- 4. EXECUTION ---
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Wealth Manager Skill")
    subparsers = parser.add_subparsers(dest="command")

    # Command: Add
    add_parser = subparsers.add_parser("add", help="Add a new asset")
    add_parser.add_argument("--name", required=True)
    add_parser.add_argument("--type", required=True, choices=["FIAT", "CRYPTO", "STOCK", "REAL_ESTATE", "OTHER"])
    add_parser.add_argument("--value", required=True, type=float)
    add_parser.add_argument("--currency", default="USD")

    # Command: List
    list_parser = subparsers.add_parser("list", help="List all assets")

    args = parser.parse_args()

    if args.command == "add":
        add_asset(args.name, args.type, args.value, args.currency)
    elif args.command == "list":
        list_assets()
    else:
        parser.print_help()