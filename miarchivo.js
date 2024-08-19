// Clase para representar un cliente
class Cliente {
    constructor(nombre, montoSolicitado, cantidadCuotas, tipo) {
        this.nombre = nombre;
        this.montoSolicitado = montoSolicitado;
        this.cantidadCuotas = cantidadCuotas;
        this.tipo = tipo;
    }
}

// Clase para manejar las tasas de interés
class TasaInteres {
    constructor() {
        // Array de tasas de interés
        this.tasas = [
            { tipo: "vip", tasa: 0.45 },
            { tipo: "regular", tasa: 0.55 },
            { tipo: "nuevo", tasa: 0.54 }
        ];
    }

    // Método para obtener la tasa basada en el tipo de cliente
    obtenerTasa(tipo) {
        const tasa = this.tasas.find(t => t.tipo === tipo);
        return tasa ? tasa.tasa : 0;
    }
}

// Clase para calcular el préstamo
class Prestamo {
    constructor(cliente, tasaInteres) {
        this.cliente = cliente;
        this.tasaInteres = tasaInteres;
        this.montoFinal = 0;
        this.cuotas = []; // Array para almacenar las cuotas
    }

    // Método para calcular el monto final y las cuotas
    calcular() {
        if (this.tasaInteres === 0) {
            throw new Error("Tipo de cliente no válido.");
        }
        this.montoFinal = this.cliente.montoSolicitado * Math.pow((1 + this.tasaInteres), this.cliente.cantidadCuotas);
        const cuota = this.montoFinal / this.cliente.cantidadCuotas;

        // Llenar el array de cuotas
        for (let i = 1; i <= this.cliente.cantidadCuotas; i++) {
            this.cuotas.push(cuota);
        }
    }

    // Método para obtener el detalle de las cuotas
    obtenerDetalleCuotas() {
        return this.cuotas.map((cuota, index) => `Cuota ${index + 1}: $${cuota.toFixed(2)}`).join('\n');
    }

    // Método para generar el mensaje final
    obtenerMensaje() {
        return `Estimado ${this.cliente.nombre},\n\n` +
            `Resumen del préstamo:\n` +
            `Monto solicitado: $${this.cliente.montoSolicitado.toFixed(2)}\n` +
            `Cantidad de cuotas: ${this.cliente.cantidadCuotas}\n` +
            `Tasa de interés aplicada: ${(this.tasaInteres * 100).toFixed(2)}%\n\n` +
            `Detalles de las cuotas:\n` +
            `${this.obtenerDetalleCuotas()}\n\n` +
            `Monto total a pagar: $${this.montoFinal.toFixed(2)}`;
    }
}

// Función para mostrar un mensaje de alerta y en el div#resultadoSimulador
function mostrarResultado(mensaje) {
    alert(mensaje);
    document.getElementById("resultadoSimulador").innerText = mensaje;
}

document.addEventListener("DOMContentLoaded", function () {
    // Captura los datos del usuario
    let nombreCliente = prompt("Ingresa tu nombre completo:");
    let montoSolicitado = parseFloat(prompt("Ingresa el monto solicitado (en números):"));
    let cantidadCuotas = parseInt(prompt("Ingresa la cantidad de cuotas (en números):"));
    let tipoCliente = prompt("Ingresa el tipo de cliente (VIP, Regular, Nuevo):").toLowerCase();

    // Validar datos
    if (isNaN(montoSolicitado) || isNaN(cantidadCuotas) || !["vip", "regular", "nuevo"].includes(tipoCliente)) {
        mostrarResultado("Por favor, ingrese datos válidos.");
        return;
    }

    // Crear instancia de Cliente, TasaInteres y Prestamo
    let cliente = new Cliente(nombreCliente, montoSolicitado, cantidadCuotas, tipoCliente);
    let tasaInteres = new TasaInteres().obtenerTasa(cliente.tipo);
    let prestamo = new Prestamo(cliente, tasaInteres);

    try {
        prestamo.calcular();
        mostrarResultado(prestamo.obtenerMensaje());
    } catch (error) {
        mostrarResultado("Ocurrió un error: " + error.message);
    }
});












