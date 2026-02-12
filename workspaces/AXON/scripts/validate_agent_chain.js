// fetch is global in Node 18+

async function validateChain() {
    const baseUrl = 'http://localhost:3000';

    console.log('--- STARTING AGENT CHAIN VALIDATION ---');

    // 1. ORION
    console.log('\n[1] Calling ORION...');
    try {
        const orionResponse = await fetch(`${baseUrl}/api/agents/orion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: 'Validation Test Topic' })
        });

        if (!orionResponse.ok) throw new Error(`Orion failed: ${orionResponse.statusText}`);
        const orionData = await orionResponse.json();
        console.log('Orion Success:', orionData.transmission_id);

        // 2. CALLIOPE
        console.log('\n[2] Calling CALLIOPE...');
        const calliopeResponse = await fetch(`${baseUrl}/api/agents/calliope`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orion_brief: orionData })
        });

        if (!calliopeResponse.ok) throw new Error(`Calliope failed: ${calliopeResponse.statusText}`);
        const calliopeData = await calliopeResponse.json();
        console.log('Calliope Success:', calliopeData.metadata?.title);

        // 3. ARGUS
        console.log('\n[3] Calling ARGUS...');
        const argusResponse = await fetch(`${baseUrl}/api/agents/argus`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(calliopeData)
        });

        if (!argusResponse.ok) {
            const errorText = await argusResponse.text();
            throw new Error(`Argus failed (${argusResponse.status}): ${errorText}`);
        }
        const argusData = await argusResponse.json();
        console.log('Argus Response:', JSON.stringify(argusData, null, 2));

        console.log('\n--- CHAIN VALIDATION COMPLETE: SUCCESS ---');

    } catch (error) {
        console.error('\n!!! VALIDATION FAILED !!!', error);
        process.exit(1);
    }
}

// Check if fetch is available (Node 18+), else mock or fail
if (!globalThis.fetch) {
    console.error('Node version too old for global fetch. Please use Node 18+');
    process.exit(1);
}

validateChain();
