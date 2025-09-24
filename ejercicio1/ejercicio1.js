/*1. Crear una función que cuente cuántas veces aparece cada vocal en un texto y devuelva el
resultado en un objeto.
let obj = miFuncion(“euforia”)
console.log(obj) // { a: 1, e: 1, i: 1, o: 1, u: 1 } */
function contVocal(cadena){
    const x = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    cadena = cadena.toLowerCase();
     for (let i = 0; i < cadena.length; i++) {
        let letra = cadena[i];
        if (letra === "a") {
            x.a++;
        } else if (letra === "e") {
            x.e++;
        } else if (letra === "i") {
            x.i++;
        } else if (letra === "o") {
            x.o++;
        } else if (letra === "u") {
            x.u++;
        }
    }

return x;
}

const cadena = "euforia";
console.log(cadena);
const x = contVocal(cadena);

for (let vocal in x) {
    console.log(`${vocal}: ${x[vocal]}`);
}