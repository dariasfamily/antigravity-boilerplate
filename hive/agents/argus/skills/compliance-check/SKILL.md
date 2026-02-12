---
name: compliance-check
description: Scan content for legal, safety, and brand risks.
tags: [audit, safety, legal, compliance]
---

# 🛡️ SKILL: compliance-check (Certified v1.0)
**Nivel de Rigor:** SUPERIOR
**ID:** `SKILL-ARGUS-001`

## 1. PROPÓSITO
Detectar y bloquear contenido que viole políticas de plataforma o legales.

## 2. LISTA DE VERIFICACIÓN
1.  **Hate & Harassment:** Cero tolerancia.
2.  **Profanity:** Censurar en los primeros 15s (regla de monetización).
3.  **AI Disclosure:** Verificar etiqueta si se usa voz sintética.

## 3. OUTPUT
`{ "status": "SAFE" | "RISK", "flags": [...] }`
