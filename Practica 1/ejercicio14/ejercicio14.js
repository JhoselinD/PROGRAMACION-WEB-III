/*  Proporcione un ejemplo para convertir una promesa en un callback. */

function mensajeCallback(callback) {
    setTimeout(() => {
        callback("Mi nombre es Jhoselin");
    }, 1000);
}

function mensajePromesa() {
    return new Promise((resolve) => {
        mensajeCallback((mensaje) => {
            resolve(mensaje);
        });
    });
}

mensajePromesa().then((mensaje) => {
    console.log(mensaje);
});