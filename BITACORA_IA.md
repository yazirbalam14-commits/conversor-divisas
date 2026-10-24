# 📓 Bitácora de Programación con Inteligencia Artificial

* **Estudiante:** Yazir Antonio Bala Flores
* **Materia:** Desarrollo de Aplicaciones Web / Programación con IA
* **Herramientas de IA utilizadas:** GitHub Copilot en Visual Studio Code (activado con GitHub Pro)
* **Proyecto:** Conversor de Divisas con Vite y API de Tasas de Cambio

---

## 1. Registro de Prompts y Evaluación de Respuestas

A continuación se presentan los 5 prompts reales utilizados para la construcción incremental de la aplicación, detallando el resultado obtenido y los ajustes realizados en cada iteración.

---

### 🔹 Prompt 1: Estructura y Seguridad
> **Prompt tal cual:**
> *"Crea la configuración inicial de un proyecto web sencillo con Vite (package.json, .gitignore y un ejemplo de .env) para una app de consulta de tipo de cambio de divisas. Asegúrate de que el archivo .gitignore oculte el archivo .env y node_modules para nunca subir mi API Key al repositorio."*

* **¿Qué respuesta dio la IA?**
  Generó el archivo `package.json` con Vite como dependencia de desarrollo, un archivo `.gitignore` con exclusiones para `node_modules` y `.env`, y un archivo plantilla `.env.example`.
* **¿Funcionó a la primera?**
  **Casi a la primera.** La configuración general de Vite funcionó de inmediato y las dependencias se instalaron correctamente con `npm install`.
* **¿Qué tuve que corregir o ajustar?**
  En el archivo `.gitignore` original, la regla genérica `.env*` excluía también el archivo `.env.example`, impidiendo que los colaboradores del repositorio conocieran qué variables se necesitaban. Tuve que agregar la excepción explícita `!.env.example` para que el archivo de ejemplo sí pudiera subirse a Git sin exponer la clave privada.

---

### 🔹 Prompt 2: Interfaz de Usuario
> **Prompt tal cual:**
> *"Genera el archivo index.html con estilos CSS integrados en modo oscuro para el conversor de divisas. Debe tener una interfaz clara y usable con un campo para escribir la moneda base (ej. USD), un campo numérico para la cantidad, un botón para consultar la API, un contenedor oculto para mostrar los resultados y otro contenedor en rojo para mostrar mensajes de error."*

* **¿Qué respuesta dio la IA?**
  Entregó un archivo `index.html` completo con un diseño en modo oscuro moderno, utilizando fuentes de Google Fonts (Plus Jakarta Sans), una tarjeta central con efecto de cristal (*glassmorphism*), inputs con íconos, botones de acceso rápido (*quick chips*) y contenedores con la clase `hidden`.
* **¿Funcionó a la primera?**
  **Sí, funcionó muy bien visualmente.**
* **¿Qué tuve que corregir o ajustar?**
  Ajusté los atributos de accesibilidad (`role="alert"` en el contenedor de error y `aria-live="polite"` en los resultados) para garantizar buenas prácticas semánticas, e incluí un spinner CSS en el botón de consulta para que el usuario perciba retroalimentación visual inmediata durante la petición.

---

### 🔹 Prompt 3: Petición a la API
> **Prompt tal cual:**
> *"Escribe el archivo app.js que lea las variables VITE_API_URL y VITE_API_KEY desde el archivo .env usando import.meta.env. Crea una función asíncrona con fetch() que consulte la API de tipo de cambio (https://open.er-api.com/v6/latest) y muestre en pantalla la conversión de la moneda ingresada a Pesos Mexicanos (MXN), Euros (EUR) y Dólares (USD)."*

* **¿Qué respuesta dio la IA?**
  Generó el archivo `app.js` importando las variables de entorno mediante `import.meta.env.VITE_API_URL`, realizando un `fetch()` asíncrono al endpoint `${API_URL}/${baseCurrency}` y multiplicando la cantidad por las tasas de `rates['MXN']`, `rates['EUR']` y `rates['USD']`.
* **¿Funcionó a la primera?**
  **Parcialmente.** Realizaba la petición y convertía las monedas, pero los números salían sin formato (muchos decimales y sin separadores de miles).
* **¿Qué tuve que corregir o ajustar?**
  Añadí el formateo de monedas con `toLocaleString('es-MX', ...)` para pesos, euros y dólares con 2 decimales fijos, además de capturar la fecha de última actualización provista por la API (`time_last_update_utc`) para desplegarla en la tarjeta.

---

### 🔹 Prompt 4: Manejo de Errores
> **Prompt tal cual:**
> *"Modifica el archivo app.js para agregar un manejo de errores completo antes y durante la petición a la API. Debe detectar y mostrar un mensaje claro en pantalla en tres casos: 1) cuando el usuario no tiene conexión a internet, 2) cuando la API devuelve una respuesta vacía o la moneda no existe, y 3) cuando se supera el límite de peticiones (código HTTP 429)."*

* **¿Qué respuesta dio la IA?**
  Implementó validaciones previas (`!navigator.onLine`), condicionales sobre `response.status === 429`, verificación de `data.result === 'error'` y un bloque `catch` para atrapar fallos de red tipo `Failed to fetch`.
* **¿Funcionó a la primera?**
  **No a la primera.** Requirió una depuración importante explicada en la sección siguiente sobre la respuesta de la API.
* **¿Qué tuve que corregir o ajustar?**
  Se debió añadir validación en dos momentos para la conectividad: antes de enviar la petición (con `navigator.onLine`) y durante la petición en el bloque `catch` (cuando el usuario pierde conexión a mitad del vuelo y `fetch` arroja un `TypeError`). También se agregó sanitización para convertir la divisa a mayúsculas con `.toUpperCase()` y codificarla con `encodeURIComponent()`.

---

### 🔹 Prompt 5: Documentación README
> **Prompt tal cual:**
> *"Genera un archivo README.md para el repositorio que incluya dos secciones: primero, la declaración de uso de IA (indicando que usé GitHub Copilot y Visual Studio Code para generar la estructura, el consumo de la API y el manejo de errores, y qué partes hice yo manualmente); segundo, las instrucciones paso a paso para clonar el repositorio, configurar el archivo .env y ejecutar el proyecto."*

* **¿Qué respuesta dio la IA?**
  Produjo un documento estructurado en Markdown con insignias, tablas explicativas, bloques de código para la instalación y explicación de la arquitectura del proyecto.
* **¿Funcionó a la primera?**
  **Sí.** La redacción fue clara y respetó las directrices solicitadas.
* **¿Qué tuve que corregir o ajustar?**
  Personalicé los datos con mi usuario de GitHub (`@yazirbalam14-commits`), el nombre exacto del repositorio, y agregué una sección de prueba de errores paso a paso para facilitar la evaluación del profesor durante la revisión.

---

### 🔹 Prompt 6: Rediseño visual formal
> **Prompt tal cual:**
> *"Cambia los estilos del index.html para que la página se vea más sobria y formal, quitando el fondo azul genérico. Usa una paleta con fondo claro en blanco roto (#F4F4F4) o crema (#FAF5EB), encabezados en verde bosque (#1E3F20), texto principal en gris carbón (#2C2C2C), el botón principal con acento en amarillo oro (#D49B2A) y las alertas de error en tono terracota (#C15C3D), cuidando que el texto tenga buen contraste."*

* **¿Qué respuesta dio la IA?**
  Reescribió la hoja de estilos CSS en `index.html` adoptando la paleta sobria solicitada: fondo con gradiente en crema claro (`#FAF5EB`), tarjeta en blanco puro con bordes sutiles, encabezados en verde bosque (`#1E3F20`), cuerpo de texto en gris carbón (`#2C2C2C`), botón principal en amarillo oro (`#D49B2A`) y alertas de error en terracota (`#C15C3D`).
* **¿Funcionó a la primera?**
  **Casi a la primera.** La armonía de colores quedó muy elegante y sobria, pero requirió una optimización en el contraste del botón y la alerta.
* **¿Qué tuve que corregir o ajustar?**
  En la primera propuesta, el botón amarillo oro tenía texto en color blanco, lo que generaba un contraste insuficiente. Lo ajusté a un tono oscuro institucional (`#192C1A`) con `font-weight: 700`, superando el ratio de contraste exigido por accesibilidad WCAG (más de 5.5:1). Asimismo, en el contenedor terracota se empleó un fondo claro suave (`#FDF5F2`) con tipografía en marrón terracota profundo (`#8C371E` y `#4E2114`) para máxima claridad de lectura.

---

## 2. Error de la IA Detectado y Cómo se Resolvió

### ⚠️ El Problema:
Al probar el caso 2 (*moneda que no existe*, por ejemplo ingresando `XYZ` o `123`), la propuesta inicial de la IA asumía que la API respondería con un código de error HTTP estándar (`response.status === 404`). Por lo tanto, el código hacía:

```javascript
// Código propuesto inicialmente por la IA (INCORRECTO para esta API):
if (!response.ok) {
  mostrarError('Error en el servidor', 'Código no encontrado');
  return;
}
const data = await response.json();
const rateMxn = data.rates['MXN']; // 💥 Rompía aquí si la moneda no existía
```

### 🔍 Detección y Análisis:
Al inspeccionar las peticiones reales en la consola de red (*Network Tab* de Chrome DevTools) consultando `https://open.er-api.com/v6/latest/INVALID`, me percaté de que la API **no devuelve HTTP 404 ni 400**. La API devuelve **código HTTP 200 (OK)** con el siguiente cuerpo JSON:

```json
{
  "result": "error",
  "error-type": "unsupported-code"
}
```

Como la respuesta tenía `response.ok === true`, el código de la IA continuaba su ejecución e intentaba acceder a `data.rates['MXN']`. Al no existir la propiedad `rates` en el objeto de error, JavaScript arrojaba un error de ejecución `Cannot read properties of undefined (reading 'MXN')` o mostraba `NaN` en pantalla en lugar de presentar el mensaje de error amigable en rojo.

### 🛠️ Solución Implementada:
Modifiqué la validación en `app.js` para inspeccionar la estructura interna del JSON devuelto por la API antes de intentar leer cualquier tasa:

```javascript
// Solución corregida y aplicada:
if (
  !data ||
  data.result === 'error' ||
  !data.rates ||
  Object.keys(data.rates).length === 0 ||
  data['error-type'] === 'unsupported-code'
) {
  const razon = data?.['error-type'] ? ` (Causa: ${data['error-type']})` : '';
  mostrarError(
    'Moneda no encontrada o respuesta vacía',
    `El código "${baseCurrency}" no es válido o no existe en la API${razon}. Verifica el código ISO (ej. USD, EUR, MXN).`,
    '🔍'
  );
  return;
}
```

Con esta corrección, al teclear cualquier moneda inválida, la app muestra de inmediato la alerta roja indicando que el código no existe en la API, cumpliendo al 100% con la rúbrica.

---

## 3. Aprendizajes y Qué Haría Distinto la Próxima Vez

### Lo que aprendí:
1. **La IA es un acelerador, no un sustituto de la verificación:** La IA es excelente para estructurar código boilerplate y diseñar interfaces estéticas con rapidez, pero los contratos específicos de cada API externa (como códigos de estado HTTP vs. payloads de error) deben verificarse siempre en la práctica y con datos reales.
2. **Seguridad en capas:** La seguridad de no filtrar claves API no solo depende de no escribirlas en el código, sino de configurar adecuadamente el archivo `.gitignore` desde el primer commit antes de hacer cualquier `git add .`.
3. **Manejo de errores resiliente:** Detectar errores requiere pensar en los diferentes momentos del ciclo de vida de una petición HTTP: antes de salir (estado de red con `navigator.onLine`), durante el transporte (fallos de conexión en `fetch`), a nivel de protocolo (códigos HTTP 429, 500) y a nivel de payload de aplicación (`result: "error"`).

### Qué haría distinto la próxima vez:
1. **Compartir el esquema de respuesta en el prompt:** En lugar de pedirle a la IA que consuma una API genérica, le proporcionaría un ejemplo real del JSON que devuelve el endpoint (tanto de éxito como de error) dentro del mismo prompt. Esto le permite a la IA generar las validaciones exactas desde el primer intento.
2. **Pedir TypeScript o esquemas de validación (Zod):** Para proyectos más grandes, pediría desde el inicio tipado estricto o un esquema de validación para garantizar que si la API cambia su respuesta, el código falle de manera controlada y descriptiva.
3. **Prompts más atómicos:** Dividir las peticiones en pasos aún más pequeños (primero validaciones, luego UI, luego petición y finalmente pruebas) facilita la detección temprana de discrepancias en el código.
