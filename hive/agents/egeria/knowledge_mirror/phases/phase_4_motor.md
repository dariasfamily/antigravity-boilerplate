[4 MOTOR] Arquitectura y Estrategias de IA Generativa y Sistemas Multi-Agente

Aquí presento la extracción y estructuración exhaustiva de la información solicitada sobre IA Generativa y Sistemas Multi-Agente (El Motor), basada estrictamente en las fuentes proporcionadas (Papers de Google DeepMind, OpenAI, Meta AI, Wikipedia y Transcripciones de 3Blue1Brown).

Esta base de conocimiento capacita al experto para dominar la arquitectura interna, el entrenamiento, el escalamiento y la orquestación de agentes.

1. Arquitectura Transformer Explicada

El Transformer es la arquitectura fundacional de los LLMs modernos, diseñada para paralelizar el procesamiento de secuencias y capturar dependencias a largo plazo.

Mecanismo de Atención (Query, Key, Value):
• Es el componente núcleo que permite al modelo ponderar la importancia de diferentes partes de la entrada.
◦ Analogía conceptual: Se puede visualizar como un sistema de recuperación de información. Un token lanza una "Consulta" (Query - Q) (ej. un sustantivo buscando adjetivos). Otros tokens ofrecen "Claves" (Key - K) que responden a esa consulta. Si Q y K se alinean (producto punto alto), se transfiere información a través del vector de "Valor" (Value - V).
◦ Cálculo Matemático: Attention(Q, K, V) = softmax(\frac{QK^T}{\sqrt{d_k}})V. El factor de escala \sqrt{d_k} previene la explosión de gradientes.

Self-Attention vs. Cross-Attention:
◦ Self-Attention (Autoatención): Ocurre dentro de una misma secuencia (codificador o decodificador), permitiendo que cada posición atienda a todas las demás posiciones de la misma secuencia.
◦ Cross-Attention (Atención Cruzada): Usada en arquitecturas Codificador-Decodificador. Las Queries provienen del decodificador (target), mientras que las Keys y Values provienen de la salida del codificador (source). Es fundamental para traducción o tareas donde se procesan dos tipos de datos distintos.

Codificación Posicional (Positional Encoding):
• Como el Transformer no usa recurrencia (RNN) ni convolución, no tiene noción inherente del orden. Se inyecta información sobre la posición relativa o absoluta de los tokens mediante funciones sinusoidales (seno y coseno) de diferentes frecuencias añadidas a los embeddings. Esto permite al modelo extrapolar a longitudes de secuencia mayores a las vistas en el entrenamiento.

Arquitectura Encoder-Decoder vs. Decoder-Only:
◦ Encoder-Decoder: (ej. T5, BART). Usa un codificador para "entender" la entrada y un decodificador para generar. Históricamente preferido para traducción.
◦ Decoder-Only: (ej. GPT, LLaMA). Unifica la comprensión y generación en un solo módulo de autoatención. Ha dominado recientemente por su eficiencia en escalamiento y simplicidad.
◦ RedLLM (Encoder-Decoder Revisado): Investigaciones recientes sugieren que, aunque el Decoder-Only domina el entrenamiento "compute-optimal", las arquitecturas Encoder-Decoder pueden ser más eficientes en inferencia y tener mejor rendimiento en finetuning para tareas específicas.

2. Fundamentos de LLMs y Leyes de Escalamiento

Para tomar decisiones sobre presupuestos de cómputo y datos, el experto debe dominar las Scaling Laws (Leyes de Escalamiento).

Leyes de Potencia (Power Laws): El rendimiento (pérdida de prueba) escala como una ley de potencia con respecto a tres factores principales, abarcando más de siete órdenes de magnitud:
1. Tamaño del Modelo (N): Número de parámetros.
2. Tamaño del Dataset (D): Cantidad de tokens de entrenamiento.
3. Cómputo (C): FLOPs utilizados.

• Eficiencia de Muestreo: Los modelos más grandes son más eficientes en cuanto a muestras; alcanzan el mismo nivel de rendimiento con menos pasos de optimización y menos datos que los modelos pequeños.
• Entrenamiento Compute-Optimal: Para un presupuesto de cómputo fijo, la asignación óptima implica entrenar modelos muy grandes y detenerlos significativamente antes de la convergencia, en lugar de entrenar modelos pequeños por mucho tiempo.
• Overfitting y Datos: El rendimiento entra en rendimientos decrecientes si N o D se mantienen fijos mientras el otro aumenta. La penalización depende de la relación N^{0.74}/D.
• Ventana de Contexto: El costo computacional de la atención crece cuadráticamente con la longitud del contexto. La extrapolación a contextos largos es un desafío; modelos Encoder-Decoder (RedLLM) han mostrado mejor capacidad de extrapolación que Decoder-Only en ciertas configuraciones.

3. RAG (Retrieval-Augmented Generation) y Memoria

RAG soluciona las limitaciones de la "memoria paramétrica" (conocimiento congelado en los pesos del modelo) integrando "memoria no paramétrica" (índices vectoriales).

• Arquitectura RAG: Combina un Retriever (ej. DPR - Dense Passage Retriever) y un Generador (ej. BART o GPT) entrenados o ajustados conjuntamente.
◦ Proceso: Ante una Query x, el retriever busca documentos relevantes z (Top-K) mediante MIPS (Maximum Inner Product Search). El generador condiciona la salida y en (x, z).

Estrategias de Generación RAG:
◦ RAG-Sequence: Utiliza el mismo documento recuperado para generar toda la secuencia de respuesta.
◦ RAG-Token: Puede usar diferentes documentos para predecir cada token sucesivo, permitiendo agregar información de múltiples fuentes en una sola respuesta.

Beneficios Críticos:
◦ Mitigación de Alucinaciones: Genera respuestas más específicas, diversas y factuales que los modelos solo paramétricos.
◦ Actualización de Conocimiento: Permite actualizar el "conocimiento del mundo" del modelo simplemente reemplazando el índice de documentos (Hot-swapping) sin necesidad de re-entrenar la red neuronal.

4. Sistemas Multi-Agente y Prompting Avanzado

Este bloque define cómo los modelos "actúan" y "razonan" para resolver tareas complejas.

• Limitaciones del Chain-of-Thought (CoT): Aunque CoT mejora el razonamiento matemático y simbólico, es una "caja negra" estática no conectada al mundo externo. Esto lleva a alucinaciones de hechos y propagación de errores.
• ReAct (Reason + Act): Un paradigma que intercala trazas de razonamiento con acciones en el entorno.
◦ Funcionamiento: El modelo genera un "Pensamiento" (para planificar, rastrear objetivos o manejar excepciones), luego una "Acción" (ej. buscar en Wikipedia), recibe una "Observación" del entorno, y repite el ciclo.
◦ Ventaja: Supera a CoT en tareas intensivas en conocimiento (como HotpotQA/FEVER) al reducir alucinaciones y permitir la recuperación de información en tiempo real.

Uso de Herramientas (Tool Usage):
◦ Los agentes pueden interactuar con APIs externas (ej. búsqueda en Wikipedia, entornos de compras web). El espacio de acción se aumenta para incluir comandos textuales que el entorno ejecuta.
◦ En entornos de decisión (ej. ALFWorld, WebShop), ReAct supera a métodos de aprendizaje por refuerzo (RL) e imitación con solo 1 o 2 ejemplos en el prompt (few-shot).

• Human-in-the-Loop: La traza de pensamientos de ReAct permite a los humanos inspeccionar y editar el razonamiento del modelo en tiempo real para corregir su comportamiento, algo imposible con métodos de "caja negra".

5. Evaluación de Modelos

El experto debe conocer las métricas para cuantificar la calidad, aunque las fuentes destacan la necesidad de evaluación humana para aspectos sutiles.

Métricas Automáticas:
◦ BLEU y ROUGE: Métricas de n-gramas estándar para similitud de texto, aunque limitadas para evaluar veracidad.
◦ Perplexity (Perplejidad): Medida de qué tan bien el modelo predice la muestra de prueba. Útil para pre-entrenamiento, pero no siempre correlaciona con la capacidad de resolver tareas aguas abajo.
◦ Exact Match (EM): Usada en QA para verificar si la respuesta generada contiene exactamente la respuesta correcta.

Benchmarks de Veracidad y Alucinación:
◦ FEVER: Verificación de hechos (Soporta/Refuta/Información Insuficiente). RAG y ReAct muestran gran desempeño aquí al recuperar evidencia externa.
◦ HotpotQA: Preguntas y respuestas multi-salto (multi-hop) que requieren razonar sobre múltiples documentos.

• Evaluación Humana: Esencial para medir "Factualidad" (corroborada por fuentes) y "Especificidad". En estudios, los humanos prefieren generaciones de RAG sobre modelos puramente paramétricos por ser más factuales.

Nota sobre Fuentes Faltantes:
Las fuentes proporcionadas no contienen información técnica específica sobre:
• Documentación de librerías modernas como LangChain o LlamaIndex.
• Detalles técnicos de algoritmos de Fine-tuning eficiente (PEFT) o LoRA (Low-Rank Adaptation), más allá de la mención general de "finetuning" o librerías como Hugging Face.
• Benchmarks modernos específicos mencionados en tu lista como "TruthfulnessQA" (aunque se cubre FEVER/HotpotQA).
• Para dominar esos conceptos específicos, el profesional debería consultar la documentación oficial de dichas librerías, ya que mis fuentes actuales se centran en los papers fundacionales teóricos (2017-2024) y no en la implementación de software actual.
