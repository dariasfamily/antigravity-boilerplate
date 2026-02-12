# Implementation Plan - Zapier, Notion, & Make MCP Servers

## Goal Description
Integrate Notion, Zapier, and Make MCP servers to extend AXON's capabilities.

## User Review Required
> [!IMPORTANT]
> **Action Required**:
> 1.  **Notion**: I need a **Notion Integration Token**. You can create one at [Notion Integrations](https://www.notion.so/my-integrations).
> 2.  **Zapier**: I need your **Zapier MCP URL**. You can get this from [Zapier MCP](https://mcp.zapier.app).
> 3.  **Make**: I need your **Make MCP URL** from your Make profile settings.

## Proposed Changes

### Notion Integration
-   **Package**: `@notionhq/notion-mcp-server` (via `npx`).
-   **Config**: Add to `mcp_config.json` with `NOTION_API_KEY` in environment variables.

### Zapier Integration
-   **Tool**: `mcp-remote` (via `npx`).
-   **Config**: Add to `mcp_config.json` pointing to the user-provided URL.

### Make Integration
-   **Tool**: `mcp-remote` (via `npx`).
-   **Config**: Add to `mcp_config.json` pointing to the user-provided URL.

## Verification Plan
-   **Notion**: Run `npx @notionhq/notion-mcp-server list-tools` (or equivalent) to verify connection.
-   **Zapier/Make**: Verify `mcp-remote` can connect to the endpoints.
