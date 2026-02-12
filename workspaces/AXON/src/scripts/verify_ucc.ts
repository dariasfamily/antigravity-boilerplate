import { InternalAffairs } from '../core/InternalAffairs';
import { UCCChangeEntry } from '../core/types';

/**
 * 🧪 UCC VERIFICATION SCRIPT
 */
async function verifyUCC() {
    console.log('--- AXON UCC VERIFICATION START ---');

    // 1. Test EMA Template Retrieval
    const codeMins = InternalAffairs.getMinimumSteps('code');
    console.log(`[PASS] EMA Code Template: ${codeMins.template_id} (Rev ${codeMins.version})`);
    console.log(`Steps: ${codeMins.required_steps.join(' -> ')}`);

    // 2. Test Compliance Success (PROT-007)
    const validEntry: UCCChangeEntry = {
        change_id: 'CHG-001',
        timestamp: new Date().toISOString(),
        type: 'code',
        agent_id: 'antigravity',
        ema_template_id: 'EMA-CODE-v1',
        before_state_hash: 'abc123hash',
        after_state_hash: 'xyz789hash',
        policy_applied: 'PROT-007 Standard',
        compliance_status: 'OK',
        modules_touched: ['InternalAffairs.ts']
    };

    try {
        InternalAffairs.validateCompliance(validEntry);
        InternalAffairs.logChange(validEntry);
        console.log('[PASS] Compliance Validation (Valid entry accepted)');
    } catch (e: any) {
        console.error(`[FAIL] Compliance Validation error: ${e.message}`);
    }

    // 3. Test Compliance Block (Gatekeeper)
    const blockedEntry: UCCChangeEntry = {
        ...validEntry,
        change_id: 'CHG-002',
        compliance_status: 'Blocked'
    };

    try {
        InternalAffairs.validateCompliance(blockedEntry);
        console.log('[FAIL] Compliance Validation (Blocked entry was NOT caught!)');
    } catch (e: any) {
        console.log(`[PASS] Compliance Validation (Blocked entry CAUGHT: ${e.message})`);
    }

    // 4. Test Data Integrity Check (PROT-003)
    const brokenEntry: UCCChangeEntry = {
        ...validEntry,
        change_id: 'CHG-003',
        before_state_hash: '' // Missing hash
    };

    try {
        InternalAffairs.validateCompliance(brokenEntry);
        console.log('[FAIL] Integrity Validation (Broken hash was NOT caught!)');
    } catch (e: any) {
        console.log(`[PASS] Integrity Validation (Broken hash CAUGHT: ${e.message})`);
    }

    console.log('--- AXON UCC VERIFICATION COMPLETE ---');
}

verifyUCC();
