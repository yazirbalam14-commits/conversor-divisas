/**
 * app.js - Módulo de consulta y conversión de divisas
 * Prompt 3: Petición a la API usando import.meta.env y fetch()
 */

// Lectura de variables de entorno mediante import.meta.env de Vite
const API_URL = import.meta.env.VITE_API_URL || 'https://open.er-api.com/v6/latest';
const API_KEY = import.meta.env.VITE_API_KEY;

// Elementos del DOM
const baseCurrencyInput = document.getElementById('base-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const btnSpinner = document.getElementById('btn-spinner');
const btnText = document.getElementById('btn-text');

const resultsContainer = document.getElementById('results-container');
const conversionSummary = document.getElementById('conversion-summary');
const lastUpdateSpan = document.getElementById('last-update');

const valMxn = document.getElementById('val-mxn');
const unitMxn = document.getElementById('unit-mxn');
const valEur = document.getElementById('val-eur');
const unitEur = document.getElementById('unit-eur');
const valUsd = document.getElementById('val-usd');
const unitUsd = document.getElementById('unit-usd');

const quickChips = document.querySelectorAll('.chip-btn');

/**
 * Función asíncrona para consultar la API de tipo de cambio y actualizar la UI
 */
async function consultarTipoCambio() {
  const baseCurrency = (baseCurrencyInput.value || 'USD').trim().toUpperCase();
  const amount = parseFloat(amountInput.value) || 1;

  // Actualizar estado de carga
  btnSpinner.style.display = 'inline-block';
  btnText.textContent = 'Consultando...';
  convertBtn.disabled = true;

  try {
    // Construir la URL del endpoint
    // open.er-api.com responde en la ruta /v6/latest/{BASE_CODE}
    const endpoint = `${API_URL.replace(/\/+$/, '')}/${baseCurrency}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    const rates = data.rates;

    // Calcular valores convertidos
    const rateMxn = rates['MXN'] || 0;
    const rateEur = rates['EUR'] || 0;
    const rateUsd = rates['USD'] || 0;

    const totalMxn = amount * rateMxn;
    const totalEur = amount * rateEur;
    const totalUsd = amount * rateUsd;

    // Actualizar valores en pantalla
    conversionSummary.textContent = `${amount.toLocaleString()} ${baseCurrency} equivale a:`;
    lastUpdateSpan.textContent = `Actualizado: ${data.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString() : 'Hoy'}`;

    valMxn.textContent = `$${totalMxn.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    unitMxn.textContent = `1 ${baseCurrency} = ${rateMxn.toFixed(4)} MXN`;

    valEur.textContent = `€${totalEur.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    unitEur.textContent = `1 ${baseCurrency} = ${rateEur.toFixed(4)} EUR`;

    valUsd.textContent = `$${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    unitUsd.textContent = `1 ${baseCurrency} = ${rateUsd.toFixed(4)} USD`;

    // Mostrar contenedor de resultados
    resultsContainer.classList.remove('hidden');

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

// Soporte para Enter en los campos
[baseCurrencyInput, amountInput].forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      consultarTipoCambio();
    }
  });
});
