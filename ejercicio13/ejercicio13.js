/* Proporcione un ejemplo concreto donde el anidamiento de promesas se puede
reescribir mejor con async/await haciendo el código más limpio y mantenible. */

function hacerTareaPromesa() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Hice mi tarea"), 1000);
    });
}

function cenarPromesa() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Cenare mi comida"), 1000);
    });
}

function dormirPromesa() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Es hora de dormir"), 1000);
    });
}

console.log("---------- Versión con Promesas Anidadas ----------");

hacerTareaPromesa().then((mensaje1) => {
    console.log(mensaje1);
    cenarPromesa().then((mensaje2) => {
        console.log(mensaje2);
        dormirPromesa().then((mensaje3) => {
            console.log(mensaje3);
            console.log("El dia termino");
        });
    });
});


async function rutina() {
    const tarea = await hacerTareaPromesa();
    console.log(tarea);

    const cena = await cenarPromesa();
    console.log(cena);

    const dormir = await dormirPromesa();
    console.log(dormir);

    console.log("El dia termino");
}

setTimeout(() => {
    console.log("\n---------- Versión con Async/Await ----------");
    rutina();
}, 4000);