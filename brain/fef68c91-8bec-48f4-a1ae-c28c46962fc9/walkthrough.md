# Walkthrough - MCP Connection Fixes

## Final Status
| Server | Status | Notes |
| :--- | :--- | :--- |
| **Zapier** | \u2705 Connected | Using `debug-mcp-bridge.js`. |
| **Make** | \u2705 Connected | Corrected zone to `us2.make.com`. |
| **NotebookLM** | \u2705 Configured | Timeout increased to 600s. |
| **Rube** | \u26d4 Disabled | Disabled due to session/auth errors. |

## Changes Made
### 1. Make.com Fix
-   **Problem**: `401 Unauthorized` and `deadline exceeded`.
-   **Root Cause**: Wrong zone in URL (`us1` vs `us2`) and missing `mcp:use` scope in token.
-   **Fix**: Updated URL to `https://us2.make.com/mcp/u/<TOKEN>/sse` and used `debug-mcp-bridge.js`.

### 2. Rube (Composio)
-   **Problem**: `Authenticated user not found`.
-   **Action**: Disabled in `mcp_config.json` to prevent VS Code errors after multiple failed authentication attempts.

### 3. Tooling
-   Created `debug-mcp-bridge.js` to provide better visibility into connection errors than the standard `mcp-remote`.

## How to use
Run `MCP: Reload` in VS Code to apply the changes. Make and Zapier tools should now be available to the agent.
