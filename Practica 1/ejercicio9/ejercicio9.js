/* Crear una promesa que devuelva un mensaje de éxito después de 3 segundos. */

const miPromesa = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Jhoselin"); 
    }, 3000);
});

miPromesa.then((x) => {
    console.log(x);
});