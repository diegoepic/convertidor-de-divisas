const monto = document.getElementById("inputPesos").value;
const monedaSelect = document.getElementById("selectMoneda");
const btnConvertir = document.getElementById("btnConvertir");

async function getDivisas(monedaSelect) {
  try {
    let urlAPI = "";
    if (monedaSelect == "dolar") {
      urlAPI = "https://mindicador.cl/api/dolar";
    } else if (monedaSelect == "euro") {
      urlAPI = "https://mindicador.cl/api/euro";
    }
    //console.log(urlAPI);

    api = await fetch(urlAPI);
    const data = await api.json();
    valorMoneda = data.serie[0].valor;
    //console.log(valorMoneda);

    return valorMoneda;
  } catch (error) {
    console.error("Error:", error);
  }
}

function hacerConversion(monto, valorMoneda) {
  const resultado = monto / valorMoneda;
  console.log(resultado);
  return resultado;
}

document.getElementById("btnConvertir").addEventListener("click", () => {
  const monto = document.getElementById("inputPesos").value;
  const monedaSelect = document.getElementById("selectMoneda").value;
if (monto == "") {
    alert("Debe ingresar un monto");
    return;
}
  if (monedaSelect == "") {
    alert("Debe seleccionar una moneda");
    return;
  }

  montoConvertido = getDivisas(monedaSelect).then((valorMoneda) => {
    const resultado = hacerConversion(monto, valorMoneda);
    sufijo = monedaSelect == "dolar" ? "es" : "s";
    document.getElementById(
      "valorConvertido"
    ).innerHTML = `El monto convertido es de: ${resultado.toFixed(3)} ${monedaSelect}(${sufijo})`;
  });
});
