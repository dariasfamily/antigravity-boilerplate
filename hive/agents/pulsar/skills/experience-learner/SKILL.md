---
name: experience-learner
description: Implements Reinforcement Learning from Experience (RLE) using the STaR method.
tags: [rle, star, self-improvement, feedback-loop]
---

# 🧠 SKILL: experience-learner (Certified v1.1)
**Nivel de Rigor:** SUPERIOR 3.2
**ID de Identidad:** `SKILL-PULSAR-004`
**Fuente Técnica:** NotebookLM (`Ingeniería de Prompts y Procesamiento del Lenguaje`)

## 1. PROPÓSITO ABSOLUTO `[✅ AUDITED]`
Implementar un bucle de mejora continua basado en la experiencia generada ("Self-Taught Reasoner"), permitiendo que PULSAR refine sus propios templates basándose en el éxito de prompts previos.

## 2. METODOLOGÍA STaR (Self-Taught Reasoner) `[✅ AUDITED]`
### 2.1 Generación de Candidatos
- Ante un problema nuevo, genera múltiples cadenas de razonamiento (R1, R2, R3).
- Ejecuta la solución.

### 2.2 Filtrado de Éxito (Pruning)
- Si el usuario acepta el prompt sin ediciones -> **ÉXITO (+1)**.
- Si el usuario solicita cambios -> **FALLO (-1)**.

### 2.3 Ajuste (Fine-Tuning Simulado)
- Almacenar los pares `(Intención, Prompt Exitoso)` en la memoria de largo plazo (`/brain/knowledge/pulsar_gold_prompts.md`).
- Consultar este archivo como "Few-Shot Examples" en futuras iteraciones.

## 3. FEEDBACK LOOP RECURSIVO `[✅ AUDITED]`
- **Entrada:** Feedback del usuario (e.g., "hazlo más corto").
- **Acción:** Aplicar, regenerar, y guardar la *diff* como regla negativa en `pulsar_anti_patterns.md`.

---
**Sello de Certificación:** `skill_rle_absolute_verified`
