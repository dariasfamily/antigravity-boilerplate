# CONSTITUTION: ENGINEERING STANDARDS (v3.1)
> "Structure followed by Speed."

## 1. The Codebase (The Factory)
*   **Stack**: Next.js 14+ (App Router), Supabase, TailwindCSS.
*   **Repo Structure**: Monorepo-style organization.
    *   `/src`: Source code.
    *   `/brain`: Knowledge & Context.
    *   `/ops`: Automation scripts (n8n backups).

## 2. Quality Assurance (The Auditor)
*   **Type Safety**: Strict TypeScript. No `any`.
*   **Atomic Commits**: Features must be isolated and verifiable.
*   **Self-Healing**: Scripts should fail gracefully and log errors to Supabase.

## 3. Deployment
*   **Zero-Config**: `npm run dev` must work immediately after clone.
*   **CI/CD**: Auto-deploy to Vercel on `main` branch push.
*   **Environment**: Secrets managed via `.env` and Vercel Project Settings.
