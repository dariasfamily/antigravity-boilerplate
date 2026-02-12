# AXON BOILERPLATE: STRUCTURE MAP

This document guides Agents (and Humans) through the codebase anatomy.

## ðŸ“‚ Root Directory
*   `src/`: **The Codebase**. All app logic lives here.
*   `public/`: Static assets (images, fonts).
*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts`: Design system tokens.

## ðŸ­ `src/` (The Factory Floor)
*   `app/`: **App Router**. Pages and Layouts.
    *   `layout.tsx`: Root layout (Providers, Fonts).
    *   `page.tsx`: Landing page.
    *   `dashboard/`: **Command Center**.
        *   `wealth/`: Finance & Assets.
        *   `brand/`: Marketing & Influence.
        *   `life/`: Health & Growth.
        *   `legal/`: Compliance & Contracts.
*   `components/`: Reusable UI elements.
    *   `ui/`: ShadCN primitives (Button, Card).
*   `modules/`: **Domain Logic**.
    *   `wealth/`: Financial logic.
    *   `brand/`: Content engines.
    *   `life/`: Personal optimization.
    *   `legal/`: Protection systems.
*   `lib/`: Utilities.
    *   `utils.ts`: Helper functions.
    *   `supabase/`: DB Clients.
*   `hooks/`: Custom React Hooks.

## ðŸ§© Key Files (Signals)
*   `.env.local`: Secrets (Not in Git).
*   `middleware.ts`: Auth protection rules.

> **Agent Protocol**: Always check this file before creating new directories to maintain the fractal structure.
