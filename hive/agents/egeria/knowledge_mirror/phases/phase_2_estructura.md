[2 FULL ESTRUCTURA] Arquitectura de Software: Fundamentos, Estructuras y Patrones Críticos

Esta es la extracción y estructuración exhaustiva de la información solicitada sobre Arquitectura de Software y Patrones, basada en las fuentes proporcionadas (Ford et al., Microsoft, Cockburn, Hohpe, etc.).

Para que un profesional domine la "Estructura" del sistema y tome decisiones arquitectónicas fundamentadas, debe dominar los siguientes bloques de conocimiento:

1. Fundamentos de Arquitectura de Software

El experto debe distinguir entre "patrón" y "estilo" y entender la unidad básica de despliegue y acoplamiento.

• Patrón vs. Estilo: Un Patrón de Arquitectura es una solución reutilizable a un problema recurrente (ej. Circuit Breaker), mientras que un Estilo Arquitectónico define la organización estructural de alto nivel (ej. Microservicios, Capas).
• Architecture Quantum (Quantum Arquitectónico): Concepto crítico para sistemas distribuidos. Es un artefacto desplegable independientemente con alta cohesión funcional, alto acoplamiento estático y acoplamiento dinámico síncrono. Entender esto es vital para definir límites físicos en microservicios.
• Acoplamiento (Coupling):
◦ Estático: Cómo están conectados los servicios (dependencias, SO, frameworks).
◦ Dinámico: Cómo se comunican en tiempo de ejecución (síncrono vs. asíncrono).
◦ Ortogonal: Cuando dos partes distintas (ej. lógica de dominio y monitoreo) deben intersectarse. Aquí es donde patrones como Sidecar son útiles.

2. Paradigmas de Estructura: Layered, Hexagonal y Clean

El objetivo central es la Separación de Responsabilidades (SoC) para proteger la lógica de negocio de la infraestructura.

• Arquitectura en Capas (Layered/N-Tier):
◦ Organización horizontal (Presentación, Negocio, Persistencia).
◦ Desventaja: Tiende a convertirse en una "Big Ball of Mud" si no se gestiona bien, y promueve el acoplamiento técnico en lugar del funcional (ej. cambiar un campo en la UI requiere cambios en la DB).

• Arquitectura Hexagonal (Puertos y Adaptadores):
◦ Creada por Alistair Cockburn. Su intención es permitir que la aplicación sea utilizada por usuarios, programas o tests automatizados indistintamente, y desarrollada en aislamiento de la base de datos.
◦ Estructura: La lógica de negocio está en el centro. Los Puertos son interfaces abstractas (entrada/salida). Los Adaptadores son implementaciones concretas (REST, SQL, Mock) que "enchufan" el mundo exterior a los puertos.
◦ Beneficio: Permite cambiar tecnologías (ej. Oracle a Mongo) sin tocar el núcleo.

• Clean Architecture (Robert C. Martin):
◦ Refina la Hexagonal organizando el software en círculos concéntricos.
◦ Regla de Dependencia: Las dependencias solo pueden apuntar hacia adentro. Las capas externas (Frameworks, UI, DB) dependen de las internas (Casos de Uso, Entidades), nunca al revés.
◦ Seguridad: Aísla la lógica crítica, reduciendo la superficie de ataque y facilitando el cumplimiento (compliance) al centralizar la validación en los adaptadores.

3. Domain-Driven Design (DDD): El Corazón Semántico

Para evitar la "pérdida de datos" entre negocio y código, el experto debe dominar DDD.

DDD Estratégico (La Gran Imagen)
• Bounded Context (Contexto Acotado): Divide un sistema complejo en límites explícitos donde un modelo de dominio específico aplica. Es la base para definir microservicios.
• Lenguaje Ubicuo: Uso de los mismos términos por expertos de dominio y desarrolladores para evitar traducciones y malentendidos.
• Context Mapping: Documenta cómo se relacionan los bounded contexts (ej. Cliente-Proveedor, Conformista, Capa Anticorrupción).

DDD Táctico (La Implementación)
• Entidades: Objetos definidos por su identidad, que persiste en el tiempo (ej. una Orden con ID único).
• Value Objects (Objetos de Valor): Objetos definidos por sus atributos, inmutables y sin identidad propia (ej. una Dirección o una Coordenada GPS).
• Agregados (Aggregates): Un clúster de entidades y objetos de valor tratados como una sola unidad de consistencia transaccional. El acceso externo se hace solo a través de la Raíz del Agregado.
• Regla de Diseño: Un microservicio no debe ser más pequeño que un agregado.
• Servicios de Dominio: Lógica que no pertenece naturalmente a una entidad u objeto de valor (ej. un "Coordinador" de envíos).

4. Microservicios y Descomposición

Cómo romper el monolito sin crear un desastre distribuido.

Estrategias de Descomposición:
◦ Basada en Componentes: Identificar bloques lógicos (namespaces/directorios) y extraerlos.
◦ Tactical Forking: Copiar el monolito y eliminar el código que no se necesita en cada copia (útil para "Big Balls of Mud").

Integradores y Desintegradores de Granularidad:
◦ Desintegradores (Razones para dividir): Volatilidad del código, escalabilidad diferenciada, tolerancia a fallos, seguridad.
◦ Integradores (Razones para unir): Transacciones de base de datos (ACID), dependencias de datos, código compartido.

Gestión de Datos:
◦ Database per Service: Patrón esencial para desacoplar microservicios, eliminando claves foráneas y vistas compartidas.
◦ Patrones de Acceso a Datos Distribuidos: Replicación de columnas, caché replicada o "Data Domain" (tablas compartidas en un esquema separado como último recurso).

5. Comunicación y Coordinación (Sagas y Workflows)

El manejo de transacciones distribuidas es la parte más difícil ("The Hard Parts").

• Saga Pattern: Secuencia de transacciones locales donde cada paso publica un evento que dispara el siguiente. Si falla, se ejecutan transacciones compensatorias para deshacer cambios.

Orquestación vs. Coreografía:
◦ Orquestación: Un servicio central (Orquestador) controla el flujo. Ventaja: Manejo de errores centralizado. Desventaja: Cuello de botella y acoplamiento.
◦ Coreografía: Los servicios reaccionan a eventos sin un mando central. Ventaja: Desacoplamiento y escalabilidad. Desventaja: Difícil rastrear el flujo y manejar errores complejos.

Tipos de Sagas (Trade-off Analysis):
◦ Epic Saga: Síncrona, atómica, orquestada (muy acoplada, baja escala).
◦ Fairy Tale Saga: Síncrona, consistencia eventual, orquestada (balanceada).
◦ Parallel Saga: Asíncrona, eventual, orquestada (alta escala y complejidad).
◦ Anthology Saga: Asíncrona, eventual, coreografiada (máximo desacoplamiento, muy difícil de coordinar).

6. CQRS y Event Sourcing

Para sistemas de alto rendimiento y auditoría perfecta.

• CQRS (Command Query Responsibility Segregation): Separa los modelos de lectura (Query) y escritura (Command). Permite escalar lecturas y escrituras independientemente y optimizar esquemas de base de datos para cada fin.
• Event Sourcing: Persiste el estado de una entidad como una secuencia de eventos inmutables (ej. OrderCreated, ItemAdded) en lugar de solo el estado actual. Permite reconstruir el estado en cualquier punto del tiempo y auditoría total.
• Snapshots: Optimización para no reproducir todo el historial de eventos cada vez.

7. Patrones de Integración Empresarial (EIP)

Cómo mover mensajes de forma robusta.

• Pipes and Filters: Procesamiento secuencial de mensajes donde cada paso es independiente (ej. Desencriptar -> Autenticar -> Desduplicar).
• Content-Based Router: Enrutamiento dinámico basado en el contenido del mensaje.
• Idempotent Consumer: Garantiza que procesar el mismo mensaje múltiples veces tenga el mismo efecto que procesarlo una vez (vital para sistemas de mensajería con reintentos).
• API Gateway & Backend for Frontend (BFF): Patrones para desacoplar clientes de los servicios backend, adaptando la respuesta a las necesidades del cliente.

Esta base de conocimiento permite al experto no solo "codificar", sino architecturar soluciones que balanceen cohesión, acoplamiento y consistencia de datos según los trade-offs específicos del negocio.
