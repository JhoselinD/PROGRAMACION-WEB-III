/* Realizar un código para ejecutar una función callback después 2 segundos. */

function ejecutarDespuesDe2Segundos(callback) {
    setTimeout(function() {
        callback();
    }, 2000);
}

function saludo() {
    console.log("Hola, Se mostro luego de dos segundos");
}

ejecutarDespuesDe2Segundos(saludo);