function calcularPrestamo() {
    // Obtener los valores ingresados por el usuario
    let montoPrestamo = document.getElementById("montoPrestamo").value;
    let tasaInteres = document.getElementById("tasaInteres").value;
    let periodoPago = document.getElementById("periodoPago").value;

    // Validar los inputs
    if (montoPrestamo <= 0 || tasaInteres <= 0 || periodoPago <= 0) {
document.getElementById("resultado").innerText = "Por favor ingresa valores válidos.";
return;
    }

    // Calcular la tasa de interés mensual
    let tasaMensual = (tasaInteres / 100) / 12;
    // Calcular el número total de pagos
    let numeroPagos = periodoPago * 12;
    
    // Calcular el pago mensual usando la fórmula del interés compuesto
    let pagoMensual = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numeroPagos));

    // Mostrar el resultado en el elemento con id "resultado"
    document.getElementById("resultado").innerText = `El pago mensual es: $${pagoMensual.toFixed(2)}`;
}
