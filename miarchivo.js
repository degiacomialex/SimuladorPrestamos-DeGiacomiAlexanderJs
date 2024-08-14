// Función para capturar entradas del usuario y calcular el préstamos
function iniciarSimulador() {
    // Capturar entradas del usuario usando prompt()
    let montoPrestamo = parseFloat(prompt("Ingresa el monto del préstamo:"));
    let tasaInteres = parseFloat(prompt("Ingresa la tasa de interés (%):"));
    let periodoPago = parseInt(prompt("Ingresa el período de pago (en años):"));

    // Validar entradas
    if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(periodoPago) || montoPrestamo <= 0 || tasaInteres <= 0 || periodoPago <= 0) {
        alert("Por favor ingresa valores válidos.");
        return;
    }

    // Crear un objeto para representar el préstamos
    let prestamo = {
        monto: montoPrestamo,
        tasa: tasaInteres,
        periodo: periodoPago,
        // Método para calcular el pago mensual
        calcularPagoMensual: function() {
            let tasaMensual = (this.tasa / 100) / 12;
            let numeroPagos = this.periodo * 12;
            return (this.monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numeroPagos));
        }
    };

    // Calcular el pago mensual usando el método del objeto
    let pagoMensual = prestamo.calcularPagoMensual();

    // Mostrar el resultado al usuario
    alert(`El pago mensual es: $${pagoMensual.toFixed(2)}`);
    console.log(`Monto del préstamo: $${prestamo.monto}`);
    console.log(`Tasa de interés: ${prestamo.tasa}%`);
    console.log(`Período de pago: ${prestamo.periodo} años`);
    console.log(`Pago mensual calculado: $${pagoMensual.toFixed(2)}`);
}

// Iniciar el simulador
iniciarSimulador();
