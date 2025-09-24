/* Proporcione un ejemplo para convertir un callback en una promesa */

function nombreCallback(callback) {
    setTimeout(() => {
        callback("Mi nombre es Jhoselin");
    }, 1000);
}

/*nombreCallback((mensaje) => {
    console.log("Resultado con callback:", mensaje);
});*/

function nombrePromesa() {
    return new Promise((resolve) => {
        nombreCallback((mensaje) => {
            resolve(mensaje);
        });
    });
}

nombrePromesa().then((mensaje) => {
    console.log("Resultado con promesa:", mensaje);
});