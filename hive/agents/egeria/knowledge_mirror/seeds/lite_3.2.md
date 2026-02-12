[  SS v0 LITE 3.2 ] - Semilla Maestra SS v0 LITE 3.2: Validación de Proyectos Críticos

Esta es la Semilla Maestra Canónica: SS v0 LITE 3.2 (Oficial).

Esta versión 3.2 no es una simple actualización; es el refinamiento "exquisito" derivado de la auditoría cruzada que expuso vulnerabilidades en la gestión de identidad temprana y la disponibilidad de datos. Hemos sellado esos vacíos.

A diferencia de modelos anteriores, este documento es absoluto. No requiere consultar manuales externos. Cada campo es una instrucción de ingeniería precisa diseñada para forzar la claridad y eliminar el pensamiento mágico antes de comprometer recursos.

--------------------------------------------------------------------------------

💎 SEMILLA MAESTRA: SS v0 LITE 3.2 (Especificación de Validación)

Estándar: FFRS (Full-Fidelity Requirements Specification).
Naturaleza: Documento Atómico y Autocontenido.
Uso: Filtro obligatorio de viabilidad para Ideación y PoC.

--------------------------------------------------------------------------------

1. MÓDULO DE INTENCIÓN Y ALCANCE (Base: ISO/IEC/IEEE 29148)

Objetivo: Eliminar la ambigüedad semántica del lenguaje natural y definir la postura de seguridad desde el nacimiento.

1.1. Identidad e Identificador Único (ID)
• Tipo de Dato: String (Alfanumérico).
◦ Formato: PROJ-[AAAA]-[NombreCorto]-v0 (ej. PROJ-2024-SECRETARIA-v0).
◦ Validación: Debe ser único en el Registry global para garantizar trazabilidad futura.
◦ 

1.2. Tipo de Acceso Previsto (Postura de Seguridad)
 [NUEVO v3.2]
• Tipo de Dato: Selección Única (Excluyente).
◦ Opciones:
◦ Público: Expuesto a internet abierto (Requiere DDoS protection, WAF).
1. Interno/Corporativo: Solo red privada/VPN (Requiere SSO).
2. Confidencial/Root: Solo el Owner (Localhost o Air-gapped).
3. Impacto: Define la arquitectura de IAM (Identity Access Management) necesaria en la fase FULL. Un error aquí invalida la viabilidad económica por costos de seguridad no previstos.
◦ 

1.3. Declaración de Intención (Problem Statement)
• Tipo de Dato: Texto Narrativo.
◦ Contenido: Descripción del "dolor" o la oportunidad sin mencionar la solución técnica.
◦ Restricción: Prohibido usar jerga técnica ("usar LLMs", "usar Python"). Solo lenguaje de dominio.
◦ 

1.4. Objetivo Verificable (Sintaxis ISO 29148)
• Tipo de Dato: Declaración Estructurada.
◦ Estructura Obligatoria: "El sistema [Nombre] deberá [Acción Funcional] para [Stakeholder/Usuario] bajo [Restricción de Rendimiento/Costo]".
◦ Criterio de Validación: ¿Es posible escribir un test binario (Pass/Fail) para esta frase? Si el objetivo es "mejorar", "ayudar" o "analizar" sin un output medible, se rechaza.
◦ 

1.5. Contexto Acotado (Bounded Context - DDD)
• Tipo de Dato: Listas de Exclusión/Inclusión.
◦ Campo IN (Core Domain): Lista explícita de funciones que el sistema SÍ realizará (ej. "Responder llamadas").
◦ Campo OUT (Anti-Requisitos): Lista explícita de lo que el sistema NO hará para evitar scope creep (ej. "No realizará pagos bancarios", "No gestionará inventario").
◦ 

--------------------------------------------------------------------------------

2. MÓDULO DE FILTRO LEGAL "KILL SWITCH" (Base: EU AI Act / GDPR)

Objetivo: Evitar responsabilidad penal o civil antes de escribir una sola línea de código.

2.1. Auditoría de Riesgo Inaceptable (EU AI Act - Art. 5)
• Tipo de Dato: Booleano (Sí/No) + Justificación.
◦ Interrogante: ¿El sistema utiliza técnicas subliminales, manipulación cognitiva, social scoring o identificación biométrica remota en tiempo real?
◦ Lógica de Control: Si TRUE → PROYECTO CANCELADO INMEDIATAMENTE (Kill Switch).
◦ 

2.2. Inventario de Datos Sensibles (GDPR)
• Tipo de Dato: Checklist de Categorías.
◦ Selección: Salud, Biometría, Finanzas, PII (Email, Teléfono), Orientación Política/Religiosa.
◦ Requisito: Si se selecciona alguna, se debe especificar la Base Legal (Consentimiento Explícito o Interés Legítimo). Sin esto, el proyecto es inviable legalmente.
◦ 

--------------------------------------------------------------------------------

3. MÓDULO DE VALIDACIÓN EPISTÉMICA (Base: Karl Popper & Bayes)

Objetivo: Filtrar el "pensamiento mágico" y asegurar que la idea es científica (falsable).

3.1. Hipótesis Central Falsable (Criterio de Demarcación)
• Tipo de Dato: Declaración Condicional.
◦ Estructura: "Si ejecutamos [Solución], entonces observaremos [Resultado Métrico]".
◦ Prueba de Falsación: Describir un hecho observable que, si ocurriera, demostraría que la idea ha fallado (ej. "Si la tasa de retención es < 5%, la hipótesis es falsa").
◦ 

3.2. Probabilidad Previa (Prior Bayesiano)
• Tipo de Dato: Flotante (0.0 a 1.0).
◦ Definición: Grado de creencia inicial en el éxito antes de ver nuevos datos.
◦ Fuente del Prior: ¿En qué datos históricos o experiencia previa se basa este número? (Evitar ex nihilo).
◦ 

3.3. Hipótesis de Monetización (Unit Economics)
• Tipo de Dato: Fórmula.
◦ Cálculo: (Valor Percibido por Unidad - Costo Operativo por Unidad) * Volumen Estimado.
◦ Definición de Valor: ¿Quién paga? (Dinero, Tiempo, Datos).
◦ 

--------------------------------------------------------------------------------

4. MÓDULO DE VIABILIDAD TÉCNICA (Base: Ingeniería de Datos y Scaling Laws)

Objetivo: Determinar si la idea es posible físicamente y rentable computacionalmente.

4.1. Disponibilidad de Datos de Entrada (Data Readiness)
 [NUEVO v3.2]
• Tipo de Dato: Selección Única + Evidencia.
◦ Estados:
◦ Existente y Accesible: Tengo los datos y permisos (ej. mis propios emails).
1. Existente pero Bloqueado: Existen, pero requiero scrapers/APIs costosas.
2. Inexistente: El sistema debe generar los datos (Alto Riesgo de Alucinación).
3. Justificación: Un proyecto de IA sin datos de entrada viables es una alucinación arquitectónica.
◦ 

4.2. Estimación de Complejidad Cognitiva
• Tipo de Dato: Selección Única.
◦ Nivel 1 (Bajo Costo): Recuperación pura (RAG/Búsqueda Semántica).
◦ Nivel 2 (Medio Costo): Generación simple (Resumen/Traducción).
◦ Nivel 3 (Alto Costo): Razonamiento complejo (Agentes/ReAct/Chain-of-Thought).
◦ Impacto: Define el presupuesto de tokens y la latencia esperada.
◦ 

4.3. Hipótesis de Costo Operativo (Inferencia)
• Tipo de Dato: Estimación Numérica.
◦ Fórmula: (Tokens de Entrada + Tokens de Salida) * Precio Modelo * Frecuencia de Uso.
◦ Criterio: ¿El margen de la sección 3.3 cubre este costo?
◦ 

--------------------------------------------------------------------------------

5. MÓDULO DE DECISIÓN (GO / NO-GO)

Objetivo: Autorización formal de paso a fase de Ingeniería (FULL).

5.1. Matriz de Validación Cruzada
• Legalidad: ¿Pasa el filtro EU AI Act y GDPR? (Sí/No).
◦ Seguridad: ¿Es viable proteger el Acceso (1.2) con el presupuesto actual? (Sí/No).
◦ Datos: ¿Los datos de entrada (4.1) son accesibles hoy? (Sí/No).
◦ Falsabilidad: ¿Existe una métrica de fracaso clara? (Sí/No).
◦ Economía: ¿Es el valor esperado > costo de cómputo? (Sí/No).
◦ 

5.2. Sentencia Final
• Estado:
◦ APROBADO (Pasar a SS v0 FULL y generar SRS).
▪ RECHAZADO (Archivar idea).
▪ PIVOTAR (Reescribir Hipótesis o Alcance).
▪ Firma: Hash criptográfico o firma digital del Owner responsable.
◦ 

--------------------------------------------------------------------------------

**Argumentación de la Versión 3.2:**Esta plantilla elimina la ingenuidad habitual en la fase de ideación. Al forzar la definición del Tipo de Acceso (1.2) y la Disponibilidad de Datos (4.1) antes de aprobar el proyecto, evitamos los dos fallos más comunes en sistemas de IA: construir algo inseguro que no se puede desplegar, o diseñar un motor de razonamiento para datos que no existen. Es rigor quirúrgico aplicado a la imaginación.
