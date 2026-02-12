import { ExecutionMinimums, UCCChangeEntry, SystemChangeType } from './types';

/**
 * 👮 INTERNAL AFFAIRS (THE AUDITOR)
 * 
 * "Who watches the watchers?" InternalAffairs does.
 * This class provides static validation for the most critical integrity constraints.
 * It is used by the AgentRunner to reject invalid states BEFORE they hit the DB.
 */

export class InternalAffairs {

    // =================================================================
    // 🏛️ CENTRAL CONTROL UNIT (UCC) & EMA
    // =================================================================

    /**
     * EMA (Execution-Minimums Agent)
     * Returns the required steps for a specific change type.
     */
    public static getMinimumSteps(type: SystemChangeType): ExecutionMinimums {
        const templates: Record<SystemChangeType, ExecutionMinimums> = {
            code: {
                template_id: 'EMA-CODE-v1',
                version: '1.0.0',
                required_steps: ['Pre-check: Lint', 'Pre-check: Test', 'Modify: Implementation', 'Post-check: Verify'],
                pre_checks: ['syntax_check', 'dependency_check'],
                post_checks: ['unit_test_passed', 'mirror_audit_prot001']
            },
            data: {
                template_id: 'EMA-DATA-v1',
                version: '1.0.0',
                required_steps: ['Snapshot: Before', 'Modify: DDL/DML', 'Validate: Integrity', 'Snapshot: After'],
                pre_checks: ['schema_validation'],
                post_checks: ['integrity_check', 'sync_check']
            },
            template: {
                template_id: 'EMA-TEMP-v1',
                version: '1.0.0',
                required_steps: ['Verify: Active Status', 'Modify: Content', 'Audit: SemVer'],
                pre_checks: ['version_check'],
                post_checks: ['registration_check']
            },
            pipeline: {
                template_id: 'EMA-PIPE-v1',
                version: '1.0.0',
                required_steps: ['Snapshot: Context', 'Execute: Step', 'Log: LITE/FULL'],
                pre_checks: ['limit_monitor'],
                post_checks: ['radiology_forensics']
            },
            memory: {
                template_id: 'EMA-MEMO-v1',
                version: '1.0.0',
                required_steps: ['Rule D3 Selection', 'Fetch: Layer', 'Audit: Source of Truth'],
                pre_checks: ['context_depth_check'],
                post_checks: ['zero_loss_check']
            },
            agent: {
                template_id: 'EMA-AGENT-v1',
                version: '1.0.0',
                required_steps: ['Verify: Manifest', 'Modify: Prompt/Skills', 'Register: ChangeLedger'],
                pre_checks: ['status_check'],
                post_checks: ['compliance_audit']
            }
        };

        return templates[type];
    }

    /**
     * UCC Compliance Enforcer - Gatekeeper
     * Validates if a change entry complies with system protocols.
     */
    public static validateCompliance(entry: UCCChangeEntry): boolean {
        // PROT-007: Gatekeeper check
        if (entry.compliance_status === 'Blocked') {
            throw new Error(`[UCC] COMPLIANCE VIOLATION: Task blocked for change ${entry.change_id}`);
        }

        // Check for mandatory fields (PROT-003)
        if (!entry.before_state_hash || !entry.after_state_hash) {
            throw new Error(`[UCC] DATA INTEGRITY VIOLATION: Missing state hashes for change ${entry.change_id}`);
        }

        return true;
    }

    /**
     * Change Ledger - Registration
     * In the real system, this would persist to the DB.
     */
    public static logChange(entry: UCCChangeEntry): void {
        console.log(`[UCC-LEDGER] [${entry.timestamp}] Change registered: ${entry.change_id} (Type: ${entry.type}, Status: ${entry.compliance_status})`);
    }

    // =================================================================
    // 💰 FINANCIAL INTEGRITY (NO FLOAT MATH)
    // =================================================================

    /**
     * Validates that a cost is safe to store.
     * REJECTS: JavaScript 'number' (if it has decimals), NaN, Infinity.
     * ACCEPTS: Strings ("10.50"), Integers (1050 cents), or Decimal libraries.
     * 
     * In this system, we store as `numeric(10,4)` in DB, but in JS we MUST handle as string 
     * or dedicated Decimal type to avoid 0.1 + 0.2 = 0.300000004
     */
    public static validateFinancialAudit(amount: number | string, currency: string = 'USD'): boolean {
        // 1. Currency Check
        if (!/^[A-Z]{3}$/.test(currency)) {
            throw new Error(`[InternalAffairs] Invalid Currency Code: ${currency}`);
        }

        // 2. Float Check
        if (typeof amount === 'number') {
            if (!Number.isSafeInteger(amount) && !Number.isInteger(amount)) {
                // It has decimals. DANGER.
                // We strictly FORBID passing raw JS floats for money.
                throw new Error(`[InternalAffairs] FINANCIAL VIOLATION: Floats forbidden. Use string or integer cents. Value: ${amount}`);
            }
        }

        // 3. String Format Check
        if (typeof amount === 'string') {
            if (!/^-?\d+(\.\d{1,4})?$/.test(amount)) {
                throw new Error(`[InternalAffairs] Invalid Money Format: ${amount}`);
            }
        }

        return true;
    }

    // =================================================================
    // 📝 AUDIT INTEGRITY (RFC 6902 + W3C)
    // =================================================================

    /**
     * Validates that a diff_log adheres to RFC 6902 (JSON Patch).
     * Must be an array of operations.
     */
    public static validateMemoryPatch(patch: any): boolean {
        if (patch === null) return true; // Null is allowed in V5.3

        if (!Array.isArray(patch)) {
            throw new Error(`[InternalAffairs] Patch must be an array.`);
        }

        for (const op of patch) {
            if (!op.op || !op.path) {
                throw new Error(`[InternalAffairs] Invalid Patch Operation: Missing 'op' or 'path'.`);
            }
            if (!['add', 'remove', 'replace', 'move', 'copy', 'test'].includes(op.op)) {
                throw new Error(`[InternalAffairs] Unknown Patch Op: ${op.op}`);
            }
        }

        return true;
    }

    /**
     * Validates W3C Trace Context formats (Hex 32 / Hex 16).
     */
    public static validateTraceStandards(traceId: string, spanId: string): boolean {
        if (!/^[0-9a-f]{32}$/.test(traceId)) {
            throw new Error(`[InternalAffairs] Invalid W3C Trace ID: ${traceId}`);
        }
        if (!/^[0-9a-f]{16}$/.test(spanId)) {
            throw new Error(`[InternalAffairs] Invalid W3C Span ID: ${spanId}`);
        }
        return true;
    }
}
