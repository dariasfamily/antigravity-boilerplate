# 🔐 NotebookLM MCP Authentication

The `notebooklm` server is failing because it requires **Google Authentication**. Since it runs in a background process, it cannot open a browser window for you to log in.

## 🛠️ How to Fix

You must run the authentication flow manually once.

1.  **Open a Terminal** (PowerShell or CMD).
2.  **Run this command**:
    ```powershell
    & "C:/Users/daria/AppData/Roaming/Python/Python313/Scripts/notebooklm-mcp-auth.exe"
    ```
    *(This will open a Chrome window. Log in to your Google account there. Once logged in, the tool will save the credentials and close.)*

3.  **Follow the instructions** in the terminal (it may ask you to copy a URL to your browser).

4.  **Restart the Agent/IDE** to reload the MCP server.

## 🐞 Troubleshooting Other MCPs

-   **Zapier/Make**: Ensure your API tokens in `mcp_config.json` are still valid.
-   **Notion**: Ensure `NOTION_API_KEY` is valid.
