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

// Clase que representa el Simulador de Préstamos
class Simulador {
    constructor() {
        // Tasas de interés predefinidas para diferentes tipos de clientes
        this.tasasInteres = {
            "VIP": { TNA: 0.45, TEA: 0.555 },
            "Regular": { TNA: 0.50, TEA: 0.625 },
            "Nuevo": { TNA: 0.55, TEA: 0.695 }
        };
    }

    // Método para calcular el monto de cada cuota
    calcularCuotas(cliente) {
        const cuotas = [];
        // Calcula el monto total del préstamo con interés
        let montoTotal = cliente.montoSolicitado * (1 + cliente.tasaInteres);
        // Calcula el monto de cada cuota
        let montoPorCuota = montoTotal / cliente.cuotas;
        for (let i = 1; i <= cliente.cuotas; i++) {
            cuotas.push(new Cuota(i, montoPorCuota.toFixed(2)));
        }
        return { cuotas, montoTotal };
    }

    // Método para solicitar datos del usuario
    solicitarDatos() {
        let nombre = prompt("Ingrese su nombre:");
        let montoSolicitado, cuotas;

        while (true) {
            montoSolicitado = parseFloat(prompt("Ingrese el monto solicitado:"));
            cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"), 10);

            if (!isNaN(montoSolicitado) && montoSolicitado > 0 &&
                !isNaN(cuotas) && cuotas > 0) {

                // Selección de tipo de cliente
                let tipoCliente = prompt("Seleccione el tipo de cliente (VIP, Regular, Nuevo):").trim();
                let tasas = this.tasasInteres[tipoCliente];

                if (tasas !== undefined) {
                    return { nombre, montoSolicitado, tasaInteres: tasas.TNA, cuotas, tasas };
                } else {
                    alert("Tipo de cliente inválido. Por favor, seleccione uno de los tipos predefinidos: VIP, Regular, o Nuevo.");
                }
            } else {
                alert("Por favor, ingrese valores válidos. Asegúrese de que el monto y las cuotas sean números positivos.");
            }
        }
    }

    // Método para ejecutar el simulador
    ejecutar() {
        // Capturamos los datos del cliente
        const datosCliente = this.solicitarDatos();
        let cliente = new Cliente(datosCliente.nombre, datosCliente.montoSolicitado, datosCliente.tasaInteres, datosCliente.cuotas);

        // Calculamos las cuotas
        let { cuotas: cuotasCalculadas, montoTotal } = this.calcularCuotas(cliente);

        // Mostramos el resultado en el HTML
        let resultadoDiv = document.getElementById('resultadoSimulador');
        resultadoDiv.innerHTML = `<h2>Resultado del Simulador</h2>`;
        resultadoDiv.innerHTML += `<p>Cliente: ${cliente.nombre}</p>`;
        resultadoDiv.innerHTML += `<p>Monto Solicitado: $${cliente.montoSolicitado.toFixed(2)}</p>`;
        resultadoDiv.innerHTML += `<p>Tasa de Interés Nominal Anual (TNA): ${(datosCliente.tasas.TNA * 100).toFixed(2)}%</p>`;
        resultadoDiv.innerHTML += `<p>Tasa Efectiva Anual (TEA): ${(datosCliente.tasas.TEA * 100).toFixed(2)}%</p>`;
        resultadoDiv.innerHTML += `<p>Monto Total a Pagar: $${montoTotal.toFixed(2)}</p>`;
        resultadoDiv.innerHTML += `<p>Cuotas:</p><ul>`;
        cuotasCalculadas.forEach(cuota => {
            resultadoDiv.innerHTML += `<li>Cuota ${cuota.numero}: $${cuota.monto}</li>`;
        });
        resultadoDiv.innerHTML += `</ul>`;
    }
}

// Crear una instancia del simulador y ejecutarlo
const simulador = new Simulador();
simulador.ejecutar();











