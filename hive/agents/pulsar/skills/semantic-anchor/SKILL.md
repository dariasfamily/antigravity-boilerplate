---
name: semantic-anchor
description: Ensures absolute intentionality conservation by preventing semantic drift.
tags: [validation, intent-preservation, antidrifting]
---

# ⚓ SKILL: semantic-anchor (Certified v1.0)
**Nivel de Rigor:** SUPERIOR 3.2
**ID de Identidad:** `SKILL-PULSAR-002`

## 1. PROPÓSITO ABSOLUTO `[✅ AUDITED]`
Mitigar la entropía semántica en procesos de refinamiento recursivo. Garantiza que el prompt final sea una representación fiel al 100% de la idea original.

## 2. ALGORITMO DE ANCLAJE `[✅ AUDITED]`
### 2.1 Mapeo de Intención (`INT-MAP`) `[✅ AUDITED]`
- Por cada instrucción generada, debe existir un vínculo (`ID`) a una palabra o frase del input original.
- Si una instrucción no tiene ancla, se declara como "Alucinación de Diseño" y se elimina.

### 2.2 Retro-Traducción (Back-Translation) `[✅ AUDITED]`
- El agente debe ser capaz de "des-compilar" el prompt final a lenguaje natural.
- **Prueba de Error:** Si la des-compilación difiere en significado de la idea original, el prompt falla la validación.

## 3. MÉTRICAS DE FIDELIDAD `[✅ AUDITED]`
- **Semantic Drift Threshold:** < 5%.
- **Faithfulness Score:** > 0.95 (LLM-as-a-judge).

---
**Sello de Certificación:** `skill_anchor_absolute_verified`
