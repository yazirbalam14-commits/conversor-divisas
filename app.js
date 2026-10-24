/**
 * app.js - Módulo de consulta y conversión de divisas con Manejo Completo de Errores
 * Prompt 4: Manejo de errores (sin conexión, respuesta vacía/moneda no existe, límite 429)
 */

// Lectura de variables de entorno mediante import.meta.env de Vite
const API_URL = import.meta.env.VITE_API_URL || 'https://open.er-api.com/v6/latest';
const API_KEY = import.meta.env.VITE_API_KEY;

// Elementos del DOM - Formulario y Botones
const baseCurrencyInput = document.getElementById('base-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const btnSpinner = document.getElementById('btn-spinner');
const btnText = document.getElementById('btn-text');
const quickChips = document.querySelectorAll('.chip-btn');

// Elementos del DOM - Contenedor de Error
const errorContainer = document.getElementById('error-container');
const errorIcon = document.getElementById('error-icon');
const errorTitle = document.getElementById('error-title');
const errorMessage = document.getElementById('error-message');

// Elementos del DOM - Contenedor de Resultados
const resultsContainer = document.getElementById('results-container');
const conversionSummary = document.getElementById('conversion-summary');
const lastUpdateSpan = document.getElementById('last-update');

const valMxn = document.getElementById('val-mxn');
const unitMxn = document.getElementById('unit-mxn');
const valEur = document.getElementById('val-eur');
const unitEur = document.getElementById('unit-eur');
const valUsd = document.getElementById('val-usd');
const unitUsd = document.getElementById('unit-usd');

/**
 * Muestra el contenedor de error con un mensaje personalizado y oculta los resultados
 * @param {string} title Título del error
 * @param {string} message Descripción detallada del error
 * @param {string} icon Emoji o ícono representativo
 */
function mostrarError(title, message, icon = '⚠️') {
  errorTitle.textContent = title;
  errorMessage.textContent = message;
  errorIcon.textContent = icon;

  errorContainer.classList.remove('hidden');
  resultsContainer.classList.add('hidden');
}

/**
 * Limpia y oculta cualquier mensaje de error activo en pantalla
 */
function limpiarError() {
  errorContainer.classList.add('hidden');
}

/**
 * Función asíncrona principal para consultar la API con manejo completo de errores
 */
async function consultarTipoCambio() {
  limpiarError();

  const baseCurrency = (baseCurrencyInput.value || '').trim().toUpperCase();
  const rawAmount = amountInput.value.trim();
  const amount = parseFloat(rawAmount);

  // Validación 0: Campos requeridos y cantidad válida
  if (!baseCurrency) {
    mostrarError('Moneda requerida', 'Por favor ingresa un código de moneda base (ej. USD, EUR, MXN).', '📝');
    baseCurrencyInput.focus();
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    mostrarError('Cantidad inválida', 'Ingresa una cantidad numérica mayor a 0 para realizar la conversión.', '🔢');
    amountInput.focus();
    return;
  }

  // Caso 1 (Previo a la petición): Verificación de conexión a Internet
  if (!navigator.onLine) {
    mostrarError(
      'Sin conexión a internet',
      'Tu dispositivo no cuenta con conexión de red. Revisa tu conexión a internet o Wi-Fi e intenta de nuevo.',
      '📡'
    );
    return;
  }

  // Activar estado de carga en la UI
  btnSpinner.style.display = 'inline-block';
  btnText.textContent = 'Consultando...';
  convertBtn.disabled = true;

  try {
    // Construir URL del endpoint
    const endpoint = `${API_URL.replace(/\/+$/, '')}/${encodeURIComponent(baseCurrency)}`;

    const response = await fetch(endpoint);

    // Caso 3: Superación del límite de peticiones (Código HTTP 429)
    if (response.status === 429) {
      mostrarError(
        'Límite de peticiones alcanzado (HTTP 429)',
        'Has superado el límite de consultas permitidas por la API. Por favor, espera unos minutos antes de intentar de nuevo.',
        '⏳'
      );
      return;
    }

    // Verificar si el estado HTTP es de error del servidor o cliente
    if (!response.ok) {
      mostrarError(
        `Error del servidor (${response.status})`,
        `No fue posible obtener los datos de la API. Código de estado HTTP: ${response.status} ${response.statusText}`,
        '🛑'
      );
      return;
    }

    const data = await response.json();

    // Caso 2: Respuesta vacía, error de la API o moneda inexistente
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

    const rates = data.rates;

    // Obtener tasas específicas para MXN, EUR y USD
    const rateMxn = rates['MXN'] || 0;
    const rateEur = rates['EUR'] || 0;
    const rateUsd = rates['USD'] || 0;

    // Cálculo de montos totales
    const totalMxn = amount * rateMxn;
    const totalEur = amount * rateEur;
    const totalUsd = amount * rateUsd;

    // Renderizar resultados en pantalla
    conversionSummary.textContent = `${amount.toLocaleString()} ${baseCurrency} equivale a:`;
    
    const updateTime = data.time_last_update_utc 
      ? new Date(data.time_last_update_utc).toLocaleString() 
      : 'En tiempo real';
    lastUpdateSpan.textContent = `Actualizado: ${updateTime}`;

    valMxn.textContent = `$${totalMxn.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    unitMxn.textContent = `1 ${baseCurrency} = ${rateMxn.toFixed(4)} MXN`;

    valEur.textContent = `€${totalEur.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    unitEur.textContent = `1 ${baseCurrency} = ${rateEur.toFixed(4)} EUR`;

    valUsd.textContent = `$${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    unitUsd.textContent = `1 ${baseCurrency} = ${rateUsd.toFixed(4)} USD`;

    // Desplegar sección de resultados exitosos
    resultsContainer.classList.remove('hidden');

  } catch (error) {
    console.error('Error durante la consulta a la API:', error);

    // Caso 1 (Durante la petición): Falla de red en pleno fetch (DNS, desconexión repentina, etc.)
    if (!navigator.onLine || error.name === 'TypeError' || error.message?.includes('Failed to fetch')) {
      mostrarError(
        'Sin conexión a internet',
        'Se perdió la conexión durante la consulta. Comprueba tu conexión a red e inténtalo de nuevo.',
        '📡'
      );
    } else {
      mostrarError(
        'Error inesperado',
        `Ocurrió un error al procesar la solicitud: ${error.message || 'Error desconocido'}.`,
        '❌'
      );
    }
  } finally {
    // Restaurar estado del botón
    btnSpinner.style.display = 'none';
    btnText.textContent = 'Consultar Tipo de Cambio';
    convertBtn.disabled = false;
  }
}

// Event Listeners
convertBtn.addEventListener('click', consultarTipoCambio);

// Chips de acceso rápido
quickChips.forEach(chip => {
  chip.addEventListener('click', () => {
    baseCurrencyInput.value = chip.dataset.currency;
    consultarTipoCambio();
  });
});

// Soporte para presionar tecla Enter
[baseCurrencyInput, amountInput].forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      consultarTipoCambio();
    }
  });
});
