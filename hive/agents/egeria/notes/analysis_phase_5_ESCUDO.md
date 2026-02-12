# AnÃ¡lisis de Conocimiento: Fase 5 - Escudo (Seguridad y Gobernanza)
**Estado:** Integrado | Rigor: **SUPERIOR**
**Fuentes:** `[5 FULL ESCUDO] Ciberseguridad, Gobernanza y Cumplimiento`

## ðŸ›¡ï¸ 1. Seguridad de Identidad y Transporte
- **IAM (OIDC/OAuth2 + PKCE)**: Uso obligatorio de PKCE para mitigar interceptaciÃ³n. ValidaciÃ³n estricta de JWT (firma RS256, audiencia, emisor).
- **TLS 1.3 & PFS**: Cifrado con *Perfect Forward Secrecy* obligatorio. La seguridad histÃ³rica no se ve comprometida por fallos futuros en claves maestras.
- **GestiÃ³n de Secretos**: Uso de bÃ³vedas (KMS/Vault). Prohibido el uso de secretos en el cÃ³digo o logs.

## ðŸ•µï¸ 2. Defensa en IA (Prompt Security)
- **InyecciÃ³n Indirecta**: ProtecciÃ³n mediante **Spotlighting** (delimitaciÃ³n de inputs) y **System Prompt Hardening**.
- **Prompt Shields**: Uso de clasificadores para detectar ataques antes de que lleguen al modelo.
- **Supply Chain**: Escaneo estÃ¡tico de modelos (Anti-Pickle) y verificaciÃ³n de hashes (SHA-256).

## âš–ï¸ 3. Gobernanza y Compliance
- **NIST AI RMF**: Ciclo de gestiÃ³n de riesgos: GOVERN -> MAP -> MEASURE -> MANAGE.
- **GDPR & EU AI Act**: ClasificaciÃ³n de riesgo de IA. Protocolos para el "Derecho al Olvido" (purgado de vectores) y garantÃ­a de Exactitid (Art 5).
- **OWASP LLM Top 10**: AuditorÃ­a continua basada en las 10 vulnerabilidades crÃ­ticas de modelos de lenguaje.

## ðŸš€ AplicaciÃ³n en AXON
La seguridad es **Zero Trust**. Cada comunicaciÃ³n entre agentes debe estar autenticada y cifrada. Se implementarÃ¡n "Circuit Breakers" financieros y de seguridad para mitigar bucles infinitos o comportamientos anÃ³malos.
