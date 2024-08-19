// Clase que representa un Cliente
class Cliente {
    constructor(nombre, montoSolicitado, tasaInteres, cuotas) {
        this.nombre = nombre;
        this.montoSolicitado = montoSolicitado;
        this.tasaInteres = tasaInteres;
        this.cuotas = cuotas;
    }
}

// Clase que representa una Cuota
class Cuota {
    constructor(numero, monto) {
        this.numero = numero;
        this.monto = monto;
    }
}

// Función para calcular el monto de cada cuota
function calcularCuotas(cliente) {
    const cuotas = [];
    // Calcula el monto total del préstamo con interés
    let montoTotal = cliente.montoSolicitado * (1 + cliente.tasaInteres);
    // Calcula el monto de cada cuota
    let montoPorCuota = montoTotal / cliente.cuotas;
    for (let i = 1; i <= cliente.cuotas; i++) {
        cuotas.push(new Cuota(i, montoPorCuota.toFixed(2)));
    }
    return cuotas;
}

// Función para buscar una cuota específica
function buscarCuota(cuotas, numero) {
    return cuotas.find(cuota => cuota.numero === numero);
}

// Función para filtrar cuotas por monto
function filtrarCuotasPorMonto(cuotas, montoMinimo) {
    return cuotas.filter(cuota => cuota.monto >= montoMinimo);
}

// Función para solicitar entrada del usuario y validar datos
function solicitarDatos() {
    let nombre = prompt("Ingrese su nombre:");
    let montoSolicitado, tasaInteres, cuotas;

    while (true) {
        montoSolicitado = parseFloat(prompt("Ingrese el monto solicitado:"));
        tasaInteres = parseFloat(prompt("Ingrese la tasa de interés (ej: 0.05 para 5%):"));
        cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"), 10);

        if (!isNaN(montoSolicitado) && montoSolicitado > 0 &&
            !isNaN(tasaInteres) && tasaInteres >= 0 &&
            !isNaN(cuotas) && cuotas > 0) {
            break;
        } else {
            alert("Por favor, ingrese valores válidos. Asegúrese de que el monto, la tasa de interés y las cuotas sean números positivos.");
        }
    }

    return { nombre, montoSolicitado, tasaInteres, cuotas };
}

// Capturamos los datos del cliente
const datosCliente = solicitarDatos();
let cliente = new Cliente(datosCliente.nombre, datosCliente.montoSolicitado, datosCliente.tasaInteres, datosCliente.cuotas);

// Calculamos las cuotas
let cuotasCalculadas = calcularCuotas(cliente);

// Mostramos el resultado en el HTML
let resultadoDiv = document.getElementById('resultadoSimulador');
resultadoDiv.innerHTML = `<p>Cliente: ${cliente.nombre}</p>`;
resultadoDiv.innerHTML += `<p>Monto Solicitado: $${cliente.montoSolicitado.toFixed(2)}</p>`;
resultadoDiv.innerHTML += `<p>Tasa de Interés: ${(cliente.tasaInteres * 100).toFixed(2)}%</p>`; // Mostrar porcentaje correctamente
resultadoDiv.innerHTML += `<p>Cuotas:</p><ul>`;
cuotasCalculadas.forEach(cuota => {
    resultadoDiv.innerHTML += `<li>Cuota ${cuota.numero}: $${cuota.monto}</li>`;
});
resultadoDiv.innerHTML += `</ul>`;

// Ejemplo de búsqueda y filtrado
let cuotaBuscada = buscarCuota(cuotasCalculadas, 2);
console.log("Cuota buscada:", cuotaBuscada);

let cuotasFiltradas = filtrarCuotasPorMonto(cuotasCalculadas, 5000);
console.log("Cuotas filtradas (>= $5000):", cuotasFiltradas);





