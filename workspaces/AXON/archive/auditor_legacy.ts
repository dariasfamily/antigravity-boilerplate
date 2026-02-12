import fs from 'fs';
import path from 'path';

// THE AUDITOR (Self-Evolution Engine)
// This script runs post-build or manually to verify system integrity.

const ROOT_DIR = path.resolve(__dirname, '../../');
const ENV_FILE = path.join(ROOT_DIR, '.env.local');
const LOG_FILE = path.join(ROOT_DIR, '../../brain/e6fc57ba-9b26-455d-bcf0-142947e7b879/SYSTEM_STATE_LOG.md');

// 1. LOGGING (Memory)
function logEvent(event: string, details: string, success: boolean) {
    const date = new Date().toISOString().split('T')[0];
    const icon = success ? 'âœ…' : 'âŒ';
    const row = `| ${date} | Auditor | ${event} | ${details} | ${icon} |\n`;

    try {
        if (fs.existsSync(LOG_FILE)) {
            fs.appendFileSync(LOG_FILE, row);
        } else {
            console.warn('âš ï¸ Log file not found, skipping persistence.');
        }
    } catch (e) {
        console.error('Failed to write to log:', e);
    }
}

// 2. CHECK SECRETS
function checkSecrets(): boolean {
    if (fs.existsSync(ENV_FILE)) {
        const envContent = fs.readFileSync(ENV_FILE, 'utf-8');
        if (!envContent.includes('AXON_SECRET=')) {
            console.error('âŒ CRITICAL: AXON_SECRET is missing from .env.local');
            logEvent('AUDIT_SECRECY', 'Missing AXON_SECRET', false);
            return false;
        } else {
            console.log('âœ… SECRETS: Identity secured.');
            return true;
        }
    } else {
        console.error('âŒ CRITICAL: .env.local not found!');
        logEvent('AUDIT_ENV', 'Missing .env.local', false);
        return false;
    }
}

// 3. CHECK STRUCTURE
function checkStructure(): boolean {
    const requiredDirs = ['src/app', 'src/lib/supabase', 'src/components/ui'];
    let allExist = true;

    requiredDirs.forEach(dir => {
        if (!fs.existsSync(path.join(ROOT_DIR, dir))) {
            console.error(`âŒ STRUCTURE: Missing directory ${dir}`);
            logEvent('AUDIT_STRUCTURE', `Missing ${dir}`, false);
            allExist = false;
        }
    });

    if (allExist) {
        console.log('âœ… STRUCTURE: Anatomy verified.');
    }
    return allExist;
}

// 4. TRANSMISSION (The Nervous System)
async function transmitSignal(success: boolean, details: string) {
    const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/system-signal"; // Local n8n

    try {
        const payload = {
            event: "AUDIT_COMPLETE",
            agent: "AUDITOR_SCRIPT",
            timestamp: new Date().toISOString(),
            status: success ? "HEALTHY" : "CRITICAL",
            details: details
        };

        // Fire and forget (don't crash if n8n is offline)
        await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        console.log("âœ… SIGNAL TRANSMITTED to Automation Hub (n8n)");
    } catch (error) {
        console.warn("âš ï¸  SIGNAL LOST: n8n is offline or unreachable (Is it running?).");
    }
}

// EXECUTION
(async () => {
    console.log("ðŸ” STARTING SYSTEM AUDIT...");

    const secretsOk = checkSecrets();
    const structureOk = checkStructure();
    const allGo = secretsOk && structureOk;

    const resultIcon = allGo ? "âœ… SUCCESS" : "âŒ FAILURE";
    const resultText = allGo ? "System Nominal" : "Integrity Breach Detected";

    // Log to Memory
    logEvent('AUDIT_RUN', resultText, allGo);

    // Signal to Nervous System
    await transmitSignal(allGo, resultText);

    if (!allGo) process.exit(1);
    console.log("ðŸ›¡ï¸  AUDIT COMPLETE: System Secure.");
})();
