/* Proporcione un ejemplo para migrar una función con promesas a async/await */

function obtenerNombre() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Soy Jhoselin");
        }, 1000);
    });
}

/*console.log("=== Versión con promesas ===");
obtenerNombre().then((mensaje) => {
    console.log(mensaje);
});*/

async function obtenerNombreAsync() {
    const mensaje = await obtenerNombre();
    console.log(mensaje);
}

obtenerNombreAsync();