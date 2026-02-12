const { spawn } = require('child_process');

const NOTION_API_KEY = "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";

const child = spawn('npx', ['-y', '@notionhq/notion-mcp-server'], {
    env: { ...process.env, NOTION_API_KEY },
    stdio: ['pipe', 'pipe', 'inherit'],
    shell: true
});

let output = '';
child.stdout.on('data', (data) => {
    output += data.toString();
    console.error(`[NotionTest] Received: ${data.toString()}`);
    if (output.includes('"id":1')) {
        console.error('[NotionTest] SUCCESS: Received tools list!');
        console.log(output);
        process.exit(0);
    }
});

const request = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {}
}) + "\n";

console.error('[NotionTest] Sending list_tools request...');
child.stdin.write(request);

setTimeout(() => {
    console.error('[NotionTest] Timeout waiting for response.');
    child.kill();
    process.exit(1);
}, 15000);
