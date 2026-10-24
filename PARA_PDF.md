# Reporte de Entrega: Tarea 2 - Programación con IA y Consumo de APIs

* **Estudiante:** Yazir Antonio Bala Flores
* **Materia:** Desarrollo de Software / Programación con IA
* **Profesor(a):** Evaluación Académica
* **Herramientas Utilizadas:** GitHub Copilot, Visual Studio Code, Git, Node.js, Vite
* **Fecha:** Octubre 2026

---

## 1. Evidencia de GitHub Pro (Student Developer Pack)

* **Enlace al perfil de GitHub:** [https://github.com/Yazir-BF](https://github.com/Yazir-BF)
* **Estado de la cuenta:** GitHub Pro Activo (Student Developer Pack)

> 📸 **Instrucción para el PDF:** Aquí pega tu captura de pantalla donde se aprecie claramente tu nombre de usuario `Yazir-BF` y la insignia morada **`PRO`** en tu perfil de GitHub o la confirmación de activación en [education.github.com/pack](https://education.github.com/pack).

*(Pega aquí tu imagen de captura)*

---

## 2. Enlace al Repositorio de la Aplicación

* **Repositorio en GitHub:** [https://github.com/Yazir-BF/conversor-divisas](https://github.com/Yazir-BF/conversor-divisas)
* **Historial de Commits:** Realizados de forma gradual y progresiva por el autor `Yazir-BF` a lo largo de cada etapa del proyecto (cumpliendo el requisito de no realizar un único commit al final).

---

## 3. Declaración de Uso de Inteligencia Artificial

### Herramientas de IA utilizadas:
* **GitHub Copilot** (Extensión oficial para **Visual Studio Code**, activada con el beneficio gratuito de estudiante de GitHub Pro): Empleada como asistente de autocompletado en el editor, generación de funciones y depuración de código.

### ¿Para qué se usó la IA en el proyecto?
1. **Generación de estructura base:** Creación de la configuración inicial de Vite (`package.json`), variables de entorno seguras (`.env`, `.env.example`) y exclusiones de archivos en `.gitignore`.
2. **Diseño de Interfaz:** Asistencia en la generación de la hoja de estilos en modo oscuro integrado en `index.html` con efectos visuales modernos (*glassmorphism*, variables CSS y diseño adaptable).
3. **Consumo de API Externa:** Escritura de la función asíncrona `fetch()` en `app.js` leyendo las variables de entorno mediante `import.meta.env`.
4. **Manejo Integral de Errores:** Identificación de casos límite (sin conexión, monedas inválidas y límite HTTP 429).
5. **Documentación:** Apoyo en la estructuración de la guía de despliegue en `README.md`.

### ¿Qué parte del proyecto hice manualmente (sin ayuda de IA)?
* **Supervisión y auditoría de seguridad:** Verificación manual de que `.env` y `node_modules` jamás fueran indexados en Git para evitar la fuga de credenciales.
* **Depuración de la respuesta de la API:** La IA asumía que una moneda inválida retornaba un código de estado HTTP 404. Manualmente analicé el tráfico en la pestaña Network de las DevTools y descubrí que la API retorna HTTP 200 con un cuerpo `{ "result": "error", "error-type": "unsupported-code" }`, por lo que reescribí la validación para inspeccionar el JSON.
* **Pruebas de estrés y conectividad:** Simulación manual del modo sin conexión en el navegador para verificar la respuesta del bloque `catch`.
* **Diseño y refinamiento de la experiencia de usuario:** Ajuste de accesibilidad semántica (`role="alert"`), adición de un indicador de carga animado (*spinner*) y botones de acceso rápido para divisas populares (USD, EUR, MXN, GBP, JPY).
* **Control de versiones:** Creación y ordenamiento de commits semánticos en Git.

---

## 4. Bitácora de Programación con IA

### 🔹 Prompt 1 (Estructura y Seguridad):
> *"Crea la configuración inicial de un proyecto web sencillo con Vite (package.json, .gitignore y un ejemplo de .env) para una app de consulta de tipo de cambio de divisas. Asegúrate de que el archivo .gitignore oculte el archivo .env y node_modules para nunca subir mi API Key al repositorio."*

* **Respuesta de la IA:** Generó `package.json` con Vite, `.env.example` y `.gitignore`.
* **¿Funcionó a la primera?:** Casi a la primera. Vite instaló las dependencias sin inconvenientes.
* **Ajuste realizado:** En `.gitignore`, la regla `.env*` ocultaba también `.env.example`. Se agregó la excepción `!.env.example` para que la plantilla pudiera compartirse en el repositorio público.

---

### 🔹 Prompt 2 (Interfaz de Usuario):
> *"Genera el archivo index.html con estilos CSS integrados en modo oscuro para el conversor de divisas. Debe tener una interfaz clara y usable con un campo para escribir la moneda base (ej. USD), un campo numérico para la cantidad, un botón para consultar la API, un contenedor oculto para mostrar los resultados y otro contenedor en rojo para mostrar mensajes de error."*

* **Respuesta de la IA:** Creó un archivo `index.html` con paleta en tonos oscuros e índigo, tarjeta central difuminada y contenedores con la clase `.hidden`.
* **¿Funcionó a la primera?:** Sí, la maquetación visual funcionó adecuadamente.
* **Ajuste realizado:** Se agregaron atributos de accesibilidad (`role="alert"`, `aria-live="polite"`), un spinner animado dentro del botón para brindar retroalimentación durante la consulta y chips interactivos para selección rápida de monedas.

---

### 🔹 Prompt 3 (Petición a la API):
> *"Escribe el archivo app.js que lea las variables VITE_API_URL y VITE_API_KEY desde el archivo .env usando import.meta.env. Crea una función asíncrona con fetch() que consulte la API de tipo de cambio (https://open.er-api.com/v6/latest) y muestre en pantalla la conversión de la moneda ingresada a Pesos Mexicanos (MXN), Euros (EUR) y Dólares (USD)."*

* **Respuesta de la IA:** Implementó `app.js` extrayendo las variables con `import.meta.env`, realizando la consulta con `fetch()` y calculando los valores multiplicando por las tasas de `rates`.
* **¿Funcionó a la primera?:** Parcialmente. Los cálculos eran matemáticamente correctos pero los números no tenían formato de moneda ni control de decimales.
* **Ajuste realizado:** Se formatearon los montos con `toLocaleString()` a 2 decimales y se extrajo la fecha de última actualización del servidor (`time_last_update_utc`).

---

### 🔹 Prompt 4 (Manejo de Errores):
> *"Modifica el archivo app.js para agregar un manejo de errores completo antes y durante la petición a la API. Debe detectar y mostrar un mensaje claro en pantalla en tres casos: 1) cuando el usuario no tiene conexión a internet, 2) cuando la API devuelve una respuesta vacía o la moneda no existe, y 3) cuando se supera el límite de peticiones (código HTTP 429)."*

* **Respuesta de la IA:** Añadió comprobaciones para `!navigator.onLine`, `response.status === 429` y un bloque `catch`.
* **¿Funcionó a la primera?:** No a la primera, debido a la discrepancia en el manejo de monedas inexistentes explicada en el siguiente apartado.
* **Ajuste realizado:** Se añadió sanitización de la entrada (`.toUpperCase()`, `encodeURIComponent()`), validación de valores numéricos mayores a cero, y doble control de conectividad (previo a la petición y durante fallas en el `fetch`).

---

### 🔹 Prompt 5 (Documentación README):
> *"Genera un archivo README.md para el repositorio que incluya dos secciones: primero, la declaración de uso de IA (indicando que usé GitHub Copilot y Visual Studio Code para generar la estructura, el consumo de la API y el manejo de errores, y qué partes hice yo manualmente); segundo, las instrucciones paso a paso para clonar el repositorio, configurar el archivo .env y ejecutar el proyecto."*

* **Respuesta de la IA:** Redactó la documentación con estructura Markdown, badges, comandos de consola y pasos de instalación.
* **¿Funcionó a la primera?:** Sí, la documentación fue clara y completa.
* **Ajuste realizado:** Se personalizaron los enlaces del repositorio de GitHub (`@Yazir-BF`), se añadió una guía de casos de prueba y se documentó la arquitectura de archivos.

---

### ⚠️ Error de la IA Detectado y Solución Aplicada

* **El Problema:** La IA programó la verificación de errores asumiendo que al ingresar una moneda inexistente (como `XYZ`), el servidor respondería con un error HTTP estándar (`response.status === 404` o `!response.ok`).
* **La Realidad en la API:** Al hacer la prueba real con `https://open.er-api.com/v6/latest/INVALID`, la API responde con código **HTTP 200 (OK)** pero con el cuerpo JSON:
  ```json
  {
    "result": "error",
    "error-type": "unsupported-code"
  }
  ```
  Al ser `response.ok === true`, el código de la IA continuaba e intentaba leer `data.rates['MXN']`. Al no existir la clave `rates`, JavaScript arrojaba un error de consola (`Cannot read properties of undefined`) y la pantalla quedaba congelada en lugar de mostrar el mensaje rojo de error.
* **Cómo lo resolví:** Reescribí la validación en `app.js` para comprobar explícitamente el contenido del JSON:
  ```javascript
  if (
    !data ||
    data.result === 'error' ||
    !data.rates ||
    Object.keys(data.rates).length === 0 ||
    data['error-type'] === 'unsupported-code'
  ) {
    mostrarError(
      'Moneda no encontrada o respuesta vacía',
      `El código "${baseCurrency}" no es válido o no existe en la API. Verifica el código ISO (ej. USD, EUR, MXN).`,
      '🔍'
    );
    return;
  }
  ```

---

### 💡 Aprendizajes y Mejoras Futuras al Programar con IA

1. **Verificar contratos de API reales:** No asumir que las APIs devuelven códigos HTTP estándar para errores de dominio; siempre conviene probar un endpoint real en consola antes de dar por buena la lógica de la IA.
2. **Contexto detallado en los prompts:** La próxima vez proporcionaré en el prompt una muestra del JSON de respuesta esperado para que la IA genere validaciones exactas desde el primer intento.
3. **Seguridad proactiva:** Mantener el principio de menor exposición asegurando `.gitignore` antes de realizar el primer commit en Git.

---

## 5. Demostración de la Aplicación (Video de 3 minutos)

* **Enlace al video de demostración:** *(Pega aquí el enlace de YouTube / Google Drive / Loom si tu profesor te pide video, o usa este guion para tu presentación en clase)*
* **Resumen de la demostración:**
  1. **Minuto 0:00 - 0:45:** Demostración en vivo de la aplicación en el navegador con Vite en `http://localhost:5173/`, consultando 100 USD y mostrando la conversión a MXN, EUR y USD.
  2. **Minuto 0:45 - 1:30:** Muestra del código fuente en Visual Studio Code, explicando la lectura de variables de entorno mediante `import.meta.env` y la exclusión de `.env` en `.gitignore`.
  3. **Minuto 1:30 - 2:15:** Demostración de los 3 casos de error: ingreso de moneda inválida (`XYZ`), desconexión de red simulada en DevTools (*Offline*), y explicación del control para error 429.
  4. **Minuto 2:15 - 3:00:** Explicación del uso de GitHub Copilot en VS Code, la depuración del error de respuesta JSON de la API y conclusiones.
