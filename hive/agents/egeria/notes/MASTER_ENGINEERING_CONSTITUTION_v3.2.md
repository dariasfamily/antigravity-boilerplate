# ðŸ’Ž AXON Master Engineering Constitution (v3.2)
**Estado:** Inmutable | Marco: **IngenierÃ­a de IntenciÃ³n (FFRS + EET)**
**Directiva:** `DOH v1.0` (Directiva de OrquestaciÃ³n HÃ­brida)

Esta constituciÃ³n rige la creaciÃ³n de todo activo, sistema o agente dentro del ecosistema AXON, seleccionando el nivel de rigor segÃºn el riesgo.

## 0. Principios Rectores (ConstituciÃ³n)
1. **Calidad Estructural**: Si la arquitectura falla, el modelo de IA no la salva.
2. **ConservaciÃ³n de InformaciÃ³n**: Prohibida la sÃ­ntesis/omisiÃ³n sin trazabilidad (`INT-###`).
3. **Zero Trust & PFS**: Todo componente es hostil hasta que se autentique. Cifrado con *Perfect Forward Secrecy* obligatorio.
4. **Falsabilidad Activa**: Todo sistema debe estar diseÃ±ado para ser auditado y refutado, no solo para "funcionar".
5. **Inmutabilidad del Evento**: Uso de *Event Sourcing* para auditorÃ­a forense perfecta.
6. **AuditorÃ­a Obligatoria (GAP v1.0)**: Ninguna fase se considera cerrada sin un Reporte de AuditorÃ­a que valide los 10 puntos de integridad.

---

## ðŸ§© EstratificaciÃ³n de Rigor

### A. SS v0 LITE 3.2 (El Filtro de Viabilidad)
- **Uso**: IdeaciÃ³n y PoC.
- **Acceso**: ClasificaciÃ³n temprana (PÃºblico, Interno, Confidencial).
- **Kill Switch**: AuditorÃ­a obligatoria contra riesgos inaceptables (EU AI Act).
- **EpistemologÃ­a**: HipÃ³tesis falsables (Popper) y Prior Bayesiano.

### B. SS v0 FULL 3.2 (El EstÃ¡ndar de ProducciÃ³n)
- **Uso**: Multi-agentes y productos reales.
- **Data Engineering**: Teorema CAP/PACELC y estrategia de replicaciÃ³n definida.
- **Seguridad**: TLS 1.3 y *Prompt Hardening* (Spotlighting).
- **CogniciÃ³n**: MÃ©tricas RAGAS (Factualidad y Relevancia).

### C. SS v0 SUPERIOR 3.2 (MisiÃ³n CrÃ­tica)
- **Uso**: Sistemas AutÃ³nomos o Financieros.
- **Integridad**: *Event Sourcing* y PatrÃ³n *Saga* obligatorio para transacciones distribuidas.
- **GestiÃ³n de Cambios**: AnÃ¡lisis de Impacto y ClasificaciÃ³n (Esencial vs Opcional).
- **Mente**: LÃ³gica Proposicional y de Predicados (QL) para requisitos formales.

---

## ðŸ›°ï¸ Protocolo de InteracciÃ³n NotebookLM (DOH v1.1)
Esta directiva rige la expansiÃ³n del conocimiento y la resoluciÃ³n de vacÃ­os de informaciÃ³n.
1. **Consulta Preventiva**: Antes de responder una interacciÃ³n, si es lÃ³gico y se requiere informaciÃ³n extra, el agente preguntarÃ¡: "Â¿Debo consultar NotebookLM?".
2. **AuditorÃ­a de Fuentes**: Revisar siempre si existe algÃºn cuaderno relacionado al tema, sus fuentes y recursos disponibles.
3. **ValidaciÃ³n de Uso**: Preguntar al usuario si desea usar esas fuentes como contexto y conocimiento previo.
4. **ResoluciÃ³n de VacÃ­os**: Ante cualquier vacÃ­o o necesidad de expansiÃ³n, el agente utilizarÃ¡ los cuadernos indexados, realizarÃ¡ preguntas en el chat de NotebookLM y crearÃ¡ los recursos necesarios para el proyecto.

---

## ðŸ“‘ Directiva de OrquestaciÃ³n HÃ­brida (DOH v1.0)
El "HÃ­brido" permite tejer capacidades de los tres niveles sin alterar las fuentes.
1. **ValidaciÃ³n**: Mandatorio (Lite 3.2).
2. **Arquitectura**: Seleccionable (Full 3.2).
3. **Integridad Forense**: Opcional/CrÃ­tico (Superior 3.2).

Todo proyecto finalizarÃ¡ con una **RTM Unificada** (Matriz de Trazabilidad) y un **Hash SHA-256** que selle el documento hÃ­brido final.
