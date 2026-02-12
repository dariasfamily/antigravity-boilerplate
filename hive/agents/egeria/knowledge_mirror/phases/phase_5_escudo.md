[5 ESCUDO] Estrategias Integrales de Ciberseguridad, Gobernanza y Cumplimiento en IA

Aquí presento la extracción y estructuración de la información técnica crítica contenida en las fuentes para dominar el bloque de Ciberseguridad, Gobernanza y Compliance, diseñada para la toma de decisiones arquitectónicas y estratégicas.

1. Gestión de Identidad y Acceso (IAM) Moderno

Para dominar la autenticación y autorización en sistemas distribuidos y modernos, el experto debe manejar los estándares OAuth 2.0 y OpenID Connect (OIDC) con las siguientes especificaciones técnicas:

• Fundamentos de OIDC: OpenID Connect es una capa de identidad sobre OAuth 2.0 que permite verificar la identidad del usuario final y obtener información básica del perfil. Utiliza un ID Token (JWT) para transmitir esta información de autenticación de manera segura.

• Flujo de Código de Autorización con PKCE (Authorization Code Flow with PKCE):
◦ Es el estándar para aplicaciones móviles y JavaScript (SPA) para mitigar ataques de interceptación.
◦ Introduce parámetros críticos: code_verifier (cadena aleatoria) y code_challenge (derivado del verifier, usualmente SHA-256).
◦ Proceso: El cliente envía el code_challenge en la solicitud de autorización. Al canjear el código por el token, envía el code_verifier. El servidor valida que el verifier coincida con el challenge almacenado, evitando que un atacante que robó el código de autorización pueda usarlo.

• Seguridad en Tokens JWT (JSON Web Tokens):
◦ Validación Obligatoria: Se debe validar la firma (JWS), el emisor (iss), la audiencia (aud), y la expiración (exp).
◦ Prevención de Replay: Uso del claim nonce para asociar la sesión del cliente con el ID Token y mitigar ataques de repetición.
◦ Algoritmos: Se recomienda RS256 (firma asimétrica). No se debe aceptar el algoritmo none a menos que esté explícitamente registrado y sea seguro por contexto.
◦ Entropy de Secretos: Para firmas simétricas (HMAC), el client_secret debe tener suficiente entropía para evitar adivinación de claves.

2. Cifrado y Seguridad en el Transporte (El Túnel)

El experto debe comprender la evolución hacia TLS 1.3 y sus implicaciones políticas y técnicas.

• TLS 1.3 y Perfect Forward Secrecy (PFS):
◦ TLS 1.3 es una revisión completa diseñada tras las revelaciones de vigilancia masiva (caso Snowden).
◦ Cambio Crítico: Elimina el intercambio de claves RSA estáticas en favor de Diffie-Hellman (DH) efímero. Esto impone Perfect Forward Secrecy (PFS) obligatoria, lo que significa que comprometer una clave privada a largo plazo no permite descifrar el tráfico pasado.
◦ Impacto en Gobernanza: Esto generó conflicto con sectores (como el bancario/BITS) que dependían del descifrado "out-of-band" para monitoreo de red y cumplimiento normativo, ya que TLS 1.3 dificulta la visibilidad interna sin inversiones en nueva infraestructura (como endpoints o ephemeral key stores).

• Cifrado de Datos: Se menciona el uso de AES para algoritmos de cifrado de contenido en JWE (JSON Web Encryption), truncando hashes SHA-2 para derivar claves de cifrado simétrico (ej. AES-128 o superior).

3. Seguridad en Aplicaciones de IA y LLMs

Este es el nuevo frente de batalla. El profesional debe distinguir entre ataques de ejecución y ataques de comportamiento.

• Inyección Indirecta de Prompts (Indirect Prompt Injection):
◦ Mecanismo: El atacante controla datos de entrada (emails, webs, documentos) que el LLM procesa. El LLM malinterpreta estos datos como instrucciones.
◦ Impacto: Puede llevar a la exfiltración de datos del usuario, envío de correos phishing automatizados o ejecución remota de comandos si el LLM tiene acceso a herramientas.

• Defensa en Profundidad:
◦ Prevención: Uso de System Prompts endurecidos y técnicas de Spotlighting (delimitar, marcar o codificar entradas no confiables para que el LLM las distinga de las instrucciones).
◦ Detección: Implementación de clasificadores probabilísticos como "Prompt Shields" para detectar inyecciones antes de que lleguen al modelo.
◦ Mitigación: "Human-in-the-loop" para acciones sensibles (ej. aprobar envío de email).

• Riesgos de Cadena de Suministro (Supply Chain):
◦ Riesgos de Ejecución de Código: Archivos de modelos (ej. Pickle) pueden contener código malicioso o binarios incrustados. Se requiere análisis estático (escaneo de artefactos).
◦ Riesgos de Comportamiento: Actualizaciones silenciosas de APIs o "Drift" del modelo que degradan las alineaciones de seguridad. Se requiere análisis dinámico (red teaming continuo contra líneas base).

• Jailbreaking: Técnicas para saltar las políticas de seguridad del modelo. Las estrategias compuestas (composite strategies) son comunes en pruebas de penetración (Red Teaming).

4. Gobernanza y Marcos de Trabajo (NIST AI RMF & ISO)

Para la toma de decisiones a nivel organizacional, el NIST AI RMF 1.0 es la referencia central.

• Funciones del Núcleo (Core):
◦ GOVERN (Gobernar): Cultivar una cultura de gestión de riesgos.
◦ MAP (Mapear): Establecer el contexto y los riesgos relacionados (ej. impacto en terceros).
◦ MEASURE (Medir): Evaluar cuantitativa y cualitativamente los riesgos (métricas de confianza, impacto social).
◦ MANAGE (Gestionar): Priorizar y actuar sobre los riesgos (mitigar, transferir, evitar).

• Características de IA Confiable: Validez, Fiabilidad, Seguridad, Resiliencia, Responsabilidad (Accountability), Transparencia, Explicabilidad, Privacidad y Equidad (Fairness).
• Interacción Humano-IA: Se debe definir claramente el rol humano (human-in-the-loop) para contrarrestar sesgos cognitivos y sistémicos.

5. Compliance y Regulaciones (GDPR y EU AI Act)

El cumplimiento legal es un requisito no funcional crítico que define la viabilidad del sistema.

• GDPR y Generative AI:
◦ Exactitud (Art 5): Los LLMs alucinan. Si una organización procesa datos inexactos generados por IA que afectan a personas, viola el principio de exactitud.
◦ Derecho al Olvido: Eliminar datos personales de un modelo entrenado ("machine unlearning") es técnicamente complejo y a menudo requiere reentrenar el modelo, lo cual es costoso.
◦ Base Legal: El "Interés Legítimo" es la base más viable para el entrenamiento, pero requiere evaluaciones de impacto y permite "opt-outs".

• EU AI Act (Ley de IA de la UE):
◦ Clasificación de Riesgo:
▪ Riesgo Inaceptable: Prohibidos (ej. puntaje social, manipulación cognitiva) - Prohibición efectiva en Feb 2025.
▪ Alto Riesgo: Requieren conformidad estricta, gobernanza de datos, documentación técnica y supervisión humana (ej. RRHH, scoring crediticio).
▪ IA de Propósito General (GPAI): Obligaciones de transparencia y gestión de riesgos sistémicos para modelos fundacionales (Agosto 2025).
▪ Sanciones: El incumplimiento tiene plazos estrictos de adecuación (plena aplicabilidad en Ago 2026).

6. Modelado de Amenazas (Threat Modeling)

El experto debe anticipar vectores de ataque específicos para IA.

• OWASP Top 10 for LLM: La inyección de prompt es la vulnerabilidad número 1. También se destacan vulnerabilidades en la cadena de suministro (LLM03).

• Vectores de Ataque Específicos:
◦ Infección/Envenenamiento (Poisoning): Manipulación de datos de entrenamiento.
◦ Inferencia de Membresía: Deducir si datos de una persona específica se usaron en el entrenamiento.
◦ Inversión del Modelo: Reconstruir datos de entrenamiento a partir de las salidas del modelo.
