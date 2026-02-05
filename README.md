📚 Simulador de Lectura Crítica Pro
Este proyecto es una plataforma interactiva de entrenamiento para la comprensión lectora y la agilidad mental. Fue diseñado como una herramienta personal para practicar bajo presión de tiempo, eliminando las barreras de los servicios de pago y ofreciendo una personalización total del estudio.

🚀 Características Principales
Base de Datos Robusta: 200 reactivos originales que cubren diversas áreas: Ciencia, TI, Historia, Derecho y Filosofía.

Modos de Pregunta: Incluye Selección Múltiple y el desafiante formato Verdadero / Falso / No se dice.

Entrenamiento bajo Presión: Algoritmo de selección dinámica que asigna aproximadamente 2 preguntas por minuto para forzar la rapidez mental.

Configuración Personalizable: Filtros por duración (5 a 30 min), tipos de pregunta y niveles de dificultad (Fácil, Medio, Difícil).

Feedback Inmediato: Sistema de resultados con explicaciones detalladas para cada respuesta.

🛠️ Tecnologías Utilizadas
El proyecto fue construido utilizando un stack moderno de desarrollo web:

React.js (v18): Biblioteca principal para la construcción de la interfaz de usuario basada en componentes.

JavaScript (ES6+): Lógica del simulador, manejo de estados (useState, useEffect) y algoritmos de barajado (Shuffle) y filtrado.

HTML5: Estructura semántica de las diferentes pantallas del simulador.

CSS3: Estilos personalizados para una interfaz limpia, responsiva y enfocada en la lectura (Modo estudio).

JSON: Estructura de datos para el almacenamiento y gestión de los 200 reactivos.

Vite: Herramienta de construcción (build tool) para un entorno de desarrollo rápido y optimizado.

🧠 Lógica de Desarrollo
El simulador implementa un flujo de estado centralizado en App.jsx, donde se gestiona:

Filtrado: Selección cruzada entre questionTypes y difficultyFilters.

Temporizador: Un hook useEffect que controla el tiempo restante y dispara la pantalla de resultados al agotarse.

Evaluación: Comparación en tiempo real de las respuestas del usuario con la clave de respuestas del JSON.
