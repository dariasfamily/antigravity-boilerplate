---
name: logic-validator
description: Applies predicate logic and formal verification to prompt structures.
tags: [logic, verification, consistency]
---

# ⚖️ SKILL: logic-validator (Certified v1.0)
**Nivel de Rigor:** SUPERIOR 3.2
**ID de Identidad:** `SKILL-PULSAR-003`

## 1. PROPÓSITO ABSOLUTO `[✅ AUDITED]`
Verificar la consistencia interna de las instrucciones y la ausencia de contradicciones lógicas en el prompt final.

## 2. PROTOCOLO DE VALIDACIÓN `[✅ AUDITED]`
### 2.1 Análisis de Predicados `[✅ AUDITED]`
- Tratar cada restricción del prompt como una variable lógica.
- **Satisfacibilidad (SAT):** El prompt solo es válido si todas las variables pueden ser verdaderas simultáneamente sin contradicción.

### 2.2 Detección de Conflictos `[✅ AUDITED]`
- Identificar instrucciones del tipo: "Sé conciso" vs "Explica detalladamente cada paso".
- **Resolución:** Aplicar jerarquía de prioridades según el Módulo de Intención.

## 3. LLM-AS-A-JUDGE METRICS `[✅ AUDITED]`
- **Internal Consistency:** 100% (Binary: Pass/Fail).
- **Structural Integrity:** Validation against target model schema (e.g. GPT-4 vs Claude syntax).

---
**Sello de Certificación:** `skill_validator_absolute_verified`
