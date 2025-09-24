/* Proporcione un ejemplo concreto de encadenamiento de promesas. */

function irALaUniversidad() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Estoy yendo a clases");
        }, 1000);
    });
}

function pasarClases() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Estoy pasando clases");
        }, 2000);
    });
}

function volverACasa() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Regrese a casa");
        }, 3000);
    });
}

irALaUniversidad()
    .then((mensaje1) => {
        console.log(mensaje1);
        return pasarClases();
    })
    .then((mensaje2) => {
        console.log(mensaje2);
        return volverACasa();
    })
    .then((mensaje3) => {
        console.log(mensaje3);
        console.log("A descansar");
    });