# NotebookLM Integration Workspace

This folder is dedicated to storing data and scripts related to Google NotebookLM.

## Authentication & API
**CRITICAL**: This automation relies on your Google Session Cookies.

### How to get your Cookie (GOOGLE_TOKEN):
1.  Open Chrome and go to [NotebookLM](https://notebooklm.google.com/).
2.  Open Developer Tools (F12) -> Application Tab -> Cookies.
3.  Find `https://notebooklm.google.com`.
4.  Look for a cookie named `__Secure-1PSID` (or similar long string).
5.  Copy its value.
6.  Add it to your `.env.local` file:
    ```bash
    GOOGLE_TOKEN="your_cookie_value_here"
    ```

### How to run the sync:
```bash
python scripts/sync_notebooklm.py
```

## Structure
*   `./exports`: Place manual exports here.
*   `./scripts`: Custom sync scripts (see `scripts/sync_notebooklm.py`).
