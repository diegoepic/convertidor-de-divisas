const ctx = document.getElementById('currencyChart').getContext('2d');
let currencyChart;

async function fetchHistoricalData(currency) {
  const urlAPI = `https://mindicador.cl/api/${currency}`;
  try {
    const response = await fetch(urlAPI);
    const data = await response.json();
    console.log(data);
    return data.serie.slice(0, 10).reverse(); // obtenemos los ultimos 10 valores de la serie
  } catch (error) {
    console.error("Error fetching historical data:", error);
  }
}

function renderChart(labels, data) {
  if (currencyChart) {
    currencyChart.destroy(); // utilizamos la funcion destroy para eliminar el grafico anterior en caso de que haya uno
  }

  currencyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor en CLP',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function updateChart(currency) {
  const historicalData = await fetchHistoricalData(currency);
  const labels = historicalData.map(item => item.fecha.split('T')[0]); // obtenemos solo la fecha sin la hora
  const values = historicalData.map(item => item.valor);  // obtenemos solo el valor de la moneda

  renderChart(labels, values);
}

document.getElementById("btnConvertir").addEventListener("click", () => {
  const monedaSelect = document.getElementById("selectMoneda").value;
  if (monedaSelect) {
    updateChart(monedaSelect);
  }
});