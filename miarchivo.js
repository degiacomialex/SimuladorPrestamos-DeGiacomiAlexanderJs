document.addEventListener("DOMContentLoaded", () => {
    const formularioPrestamo = document.getElementById("formularioPrestamo");
    const resultadoSimulador = document.getElementById("resultadoSimulador");

    const tasasInteres = {
        vip: 0.0080,  // 0.45%
        regular: 0.04,  // 1%
        nuevo: 0.025  // 1.5%
    };

    formularioPrestamo.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const monto = parseFloat(document.getElementById("monto").value);
        const cuotas = parseInt(document.getElementById("cuotas").value);
        const tipoCliente = document.getElementById("cliente").value;

        if (isNaN(monto) || isNaN(cuotas) || !tipoCliente) {
            alert("Por favor, ingrese todos los datos correctamente.");
            return;
        }

        const tasaInteres = tasasInteres[tipoCliente];
        const montoFinal = monto + (monto * tasaInteres);
        const valorCuota = montoFinal / cuotas;

        resultadoSimulador.innerHTML = `<h3>Resultados:</h3>
            <p>Monto total a pagar: $${montoFinal.toFixed(2)}</p>
            <p>Cuotas de: $${valorCuota.toFixed(2)} cada una.</p>
            <p>Detalles:</p>
            <ul>
                ${Array.from({ length: cuotas }, (v, i) => `<li>Cuota ${i + 1}: $${valorCuota.toFixed(2)}</li>`).join('')}
            </ul>`;
        
        localStorage.setItem("ultimoResultado", JSON.stringify({
            montoFinal,
            valorCuota,
            cuotas,
            tipoCliente
        }));
    });

    const ultimoResultado = JSON.parse(localStorage.getItem("ultimoResultado"));
    if (ultimoResultado) {
        resultadoSimulador.innerHTML = `<h3>Último resultado guardado:</h3>
            <p>Monto total a pagar: $${ultimoResultado.montoFinal.toFixed(2)}</p>
            <p>Cuotas de: $${ultimoResultado.valorCuota.toFixed(2)} cada una.</p>`;
    }
});














