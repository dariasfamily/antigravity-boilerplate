
/**
 * 👮 INTERNAL AFFAIRS (THE AUDITOR)
 * 
 * "Who watches the watchers?" InternalAffairs does.
 * This class provides static validation for the most critical integrity constraints.
 * It is used by the AgentRunner to reject invalid states BEFORE they hit the DB.
 */

export class InternalAffairs {

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
