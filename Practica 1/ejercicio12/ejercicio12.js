/* Proporcione un ejemplo concreto donde el anidamiento de callbacks se puede
reescribir mejor con async/await haciendo el código más limpio y mantenible. */

function hacerTareaCallback(callback) {
    setTimeout(() => {
        console.log("Hice mi tarea");
        callback();
    }, 1000);
}

function cenarCallback(callback) {
    setTimeout(() => {
        console.log("Cené");
        callback();
    }, 1000);
}

function dormirCallback(callback) {
    setTimeout(() => {
        console.log("Me fui a dormir");
        callback();
    }, 1000);
}

console.log("---------- Versión con Callbacks ----------");
hacerTareaCallback(() => {
    cenarCallback(() => {
        dormirCallback(() => {
            console.log("El dia acabo");
        });
    });
});



function hacerTarea() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Hago mi tarea"), 1000);
    });
}

function cenar() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Estoy cenando"), 1000);
    });
}

function dormir() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Es hora de dormir"), 1000);
    });
}

async function rutina() {
    console.log(await hacerTarea());
    console.log(await cenar());
    console.log(await dormir());
    console.log("Acabo el dia");
}

setTimeout(() => {
    console.log("\n---------- Versión con Async/Await ----------");
    rutina();
}, 4000);