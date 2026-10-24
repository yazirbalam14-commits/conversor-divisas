# 💱 Conversor de Divisas en Tiempo Real

Aplicación web moderna, ligera y responsiva para consultar tasas de cambio y realizar conversiones de divisas en tiempo real, desarrollada con **JavaScript Vanilla**, **Vite** y consumiendo la API de **ExchangeRate-API**.

---

## 🤖 Declaración de Uso de Inteligencia Artificial

En cumplimiento con los lineamientos académicos de la materia, se detalla el uso ético y transparente de herramientas de IA durante el desarrollo:

### 1. Herramientas de IA Utilizadas
* **GitHub Copilot** (Extensión oficial en **Visual Studio Code**, activada mediante el beneficio de **GitHub Student Developer Pack / GitHub Pro**): Utilizado como asistente de autocompletado inteligente, generación de código y copiloto de programación en pares.

### 2. Tareas en las que se usó la IA
* **Estructuración del proyecto:** Generación de la plantilla base de Vite, configuración de dependencias y reglas de `.gitignore` para salvaguarda de credenciales.
* **Maquetación inicial:** Asistencia en la generación de estilos CSS para el modo oscuro con efecto de cristal (*glassmorphism*) y diseño responsivo.
* **Consumo de la API:** Escritura de la función asíncrona con `fetch()` y lectura de variables de entorno mediante `import.meta.env`.
* **Manejo integral de errores:** Identificación de posibles fallos de red (`offline`), respuestas no soportadas de la API (`unsupported-code`) y códigos HTTP de saturación de cuota (`429 Too Many Requests`).
* **Documentación:** Apoyo en la redacción de la bitácora y la guía de despliegue.

### 3. Trabajo realizado manualmente por el estudiante (sin IA)
* **Definición de requerimientos y casos de prueba:** Especificación de las divisas objetivo (MXN, EUR, USD) y diseño del flujo de usuario.
* **Supervisión de seguridad:** Verificación estricta de que `.env` y `node_modules` permanecieran fuera del control de versiones en git.
* **Ajuste y depuración de la lógica de respuesta de la API:** Corrección manual para detectar la estructura de error propia de la API (`result: "error"`, `error-type: "unsupported-code"`), ya que la API suele retornar código HTTP 200 con payload de error en lugar de un código 404 tradicional.
* **Pruebas de estrés y conectividad:** Simulación de modo avión / desconexión de red en el navegador (DevTools > Network > Offline) para comprobar la activación del contenedor de error.
* **Control de versiones:** Inicialización del repositorio git, redacción de commits semánticos progresivos y vinculación con la cuenta de GitHub.

---

## 🛠️ Tecnologías Empleadas

* **HTML5 semántico** con accesibilidad (`aria-live`, roles de alerta).
* **CSS3 moderno** (Variables personalizadas, Flexbox, CSS Grid, Glassmorphism, animaciones fluidas).
* **JavaScript ES6+** (`async/await`, Fetch API, detección con `navigator.onLine`, internacionalización con `Intl.NumberFormat`).
* **Vite** (Entorno de desarrollo rápido y empaquetador optimizado).
* **ExchangeRate-API** ([https://open.er-api.com](https://open.er-api.com)) como fuente de tipos de cambio en vivo.

---

## 🚀 Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar el proyecto localmente en tu computadora:

### Prerrequisitos
* Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
* Tener instalado [Git](https://git-scm.com/).

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/Yazir-BF/conversor-divisas.git
cd conversor-divisas
```

### Paso 2: Instalar las dependencias
```bash
npm install
```

### Paso 3: Configurar las variables de entorno
Crea tu archivo `.env` a partir de la plantilla `.env.example`:

En Windows (PowerShell):
```powershell
Copy-Item .env.example .env
```
En Linux / macOS:
```bash
cp .env.example .env
```

El archivo `.env` contiene:
```env
# URL de la API de tipo de cambio
VITE_API_URL=https://open.er-api.com/v6/latest

# Tu API Key (Opcional para el tier gratuito open.er-api)
VITE_API_KEY=tu_api_key_aqui
```

> 🔒 **Nota de Seguridad:** El archivo `.env` se encuentra registrado en `.gitignore`, por lo que **nunca** se subirá al repositorio público ni expondrá claves de acceso.

### Paso 4: Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre tu navegador en la URL indicada por la terminal (usualmente `http://localhost:5173`).

### Paso 5: (Opcional) Compilar para producción
Para generar los archivos listos para producción en la carpeta `/dist`:
```bash
npm run build
npm run preview
```

---

## 🧪 Casos de Prueba y Manejo de Errores

La aplicación maneja tres escenarios críticos con mensajes claros y alertas visuales en rojo:

1. **Sin Conexión a Internet:**
   * *Cómo probarlo:* Desconecta tu Wi-Fi o en Chrome DevTools ve a la pestaña **Network** y selecciona **Offline**. Al presionar "Consultar", la app detectará la falta de red antes o durante la petición y mostrará la alerta correspondiente.
2. **Moneda Inválida o No Existente:**
   * *Cómo probarlo:* Escribe en el campo de moneda base un código inexistente como `XYZ` o `123`. La app detectará el error devuelto por la API y alertará que el código ISO no es válido.
3. **Límite de Peticiones (HTTP 429):**
   * *Cómo probarlo:* En caso de que la cuota de peticiones se agote o el servidor devuelva código HTTP 429, la interfaz indicará que se superó el límite de uso y sugerirá esperar unos momentos.

---

## 📂 Estructura del Proyecto

```text
├── .env                # Variables de entorno locales (IGNORADO POR GIT)
├── .env.example        # Plantilla pública de variables de entorno
├── .gitignore          # Reglas para proteger .env y node_modules
├── BITACORA_IA.md      # Bitácora detallada de prompts y aprendizaje con IA
├── README.md           # Documentación y declaración de IA
├── index.html          # Interfaz de usuario con estilos integrados en modo oscuro
├── app.js              # Lógica de consumo de API y manejo de errores
├── package.json        # Configuración del proyecto y scripts
└── package-lock.json   # Árbol de dependencias bloqueado
```

---

## 👤 Autor

* **Yazir Antonio Bala Flores** ([@Yazir-BF](https://github.com/Yazir-BF))
* Estudiante beneficiario del programa **GitHub Student Developer Pack (GitHub Pro)**.
