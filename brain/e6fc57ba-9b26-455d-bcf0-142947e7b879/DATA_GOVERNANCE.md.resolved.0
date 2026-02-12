# DATA GOVERNANCE & AUDIT PROTOCOL
**System Version**: 2.1.0
**Enforcement**: Strict (Automated via Context Guardian)

## 1. THE "VAULT" (Storage Architecture)
All agent outputs are immutable assets. They must be stored chronologically and modularly.

**Root Directory**: `/AXON/vault/`

### Directory Structure Pattern
```text
/vault
  â”œâ”€â”€ /2024
  â”‚    â”œâ”€â”€ /05 (Month)
  â”‚    â”‚    â”œâ”€â”€ /12 (Day)
  â”‚    â”‚    â”‚    â”œâ”€â”€ /ORION_STRATEGY
  â”‚    â”‚    â”‚    â”‚    â”œâ”€â”€ ORION_BRIEF_001_HASH.json   (Raw Output)
  â”‚    â”‚    â”‚    â”‚    â”œâ”€â”€ ORION_BRIEF_001_META.json   (Metrics/Audit)
  â”‚    â”‚    â”‚    â”œâ”€â”€ /CALLIOPE_SCRIPTS
  â”‚    â”‚    â”‚    â”‚    â”œâ”€â”€ CALLIOPE_SCRIPT_001_HASH.md (The Script)
```

### Naming Convention (Standardized)
`[AGENT]_[TYPE]_[TIMESTAMP]_[ID].[EXT]`
*   **Example**: `ORION_BRIEF_20240512-1400_X79Z.json`

## 2. METRICS & INPUT/OUTPUT TRACKING
Every agent run creates a "Twin File" for metadata (The `_META.json`).

**Meta Schema:**
```json
{
  "id": "X79Z",
  "parent_id": "PREV_AGENT_ID",  // Traceability
  "agent": "Orion",
  "timestamp_start": "...",
  "timestamp_end": "...",
  "input_snapshot": { ... },       // What triggered it
  "output_hash": "...",            // Integrity check
  "audit_status": "PASSED",        // Self-Correction result
  "performance": {
    "latency_ms": 1200,
    "token_cost": 0.04
  }
}
```

## 3. THE AUTO-CORRECTION LOOP (The Auditor)
After **EVERY** generation, the `Context Guardian` runs a validation cycle:

1.  **Schema Check**: Does Output match strict JSON/Markdown schema?
2.  **Anti-Goal Check**: Does content contain banned phrases (Crypto, Gambling)?
3.  **Quality Check**: (For Calliope) Is readability < Grade 6? Is length < 60s?
4.  **Action**:
    *   **Pass**: Commit to Vault. Log to Dashboard.
    *   **Fail**: Trigger RE-RUN with error context. Log "Incident" to Dashboard.

## 4. DASHBOARD INTEGRATION
The "Agent Monitor" in the Dashboard reads directly from the `/vault` metadata.
*   **Editability**: If a user updates a file in the Dashboard (e.g., Orion Studio), it creates a **new version** (v2) in the vault, preserving the history.
