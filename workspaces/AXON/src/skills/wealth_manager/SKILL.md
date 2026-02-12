---
name: wealth_manager
description: Manage financial assets, track net worth, and update Supabase records. This skill is the Financial Hand of the system.
---

# Wealth Manager (Agent Skill)

## 🎯 Purpose
The **Wealth Manager** is responsible for the "Wealth Brain's" data integrity. It acts as the interface between the Agent/User and the `wealth_assets` database in Supabase. It allows for adding assets, listing portfolio status, and calculating total Net Worth.

## 🛠️ Capabilities
*   **Add Asset**: Insert a new financial asset (Bank Account, Crypto, Stock, Real Estate) into Supabase.
*   **List Portfolio**: Retrieve a summary of all tracked assets.
*   **Calculate Net Worth**: Aggregate values from the database to report total Wealth.
*   **Sync**: (Future) Connect with n8n/Stripe to update values automatically.

## 📋 Instructions
1.  **To Add an Asset**: Provide type (FIAT, CRYPTO, etc.), name, value, and currency.
2.  **To Audit Wealth**: Run without arguments to get a full report.

## 🛡️ Self-Correction Rules
*   [ ] **Validation**: Ensure `value` is a positive number.
*   [ ] **Security**: Never log raw Supabase keys.
*   [ ] **DB Integrity**: If INSERT fails, check Supabase connection and retry once.
*   [ ] **Logging**: Record all transaction attempts to `SYSTEM_STATE_LOG.md`.

## 🧠 Memory & Context
*   **Reads**: `.env.local` (for Supabase Credentials), `wealth_assets` (Table).
*   **Writes**: `wealth_assets` (Table), `SYSTEM_STATE_LOG.md`.

## 🤖 Example Usage
User: "Add a new Bitcoin asset worth 50000 USD"
Agent calls: `python src/skills/wealth_manager/scripts/wealth_manager_handler.py add --name "Bitcoin Cold Storage" --type "CRYPTO" --value 50000 --currency "USD"`