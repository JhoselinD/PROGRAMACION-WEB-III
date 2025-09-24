/*Crear una función que reciba un arreglo de números y devuelva en un objeto a los pares
e impares:
let obj = miFuncion([1,2,3,4,5])
console.log(obj) // { pares: [2,4], impares: [1,3,5]} */

function miFuncion(numeros) {
    let r = { pares: [], impares: [] };

    let p = 0; 
    let imp = 0; 

    for (let i = 0; i < numeros.length; i++) {
        let num = numeros[i];

        if (num % 2 === 0) {
            r.pares[p] = num; 
            p++; 
        } else {
            r.impares[imp] = num;
            imp++; 
        }
    }

    return r;
}

let obj = miFuncion([1, 2, 3, 4, 5]);
console.log(obj);