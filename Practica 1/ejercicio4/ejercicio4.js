/* Crear una función que reciba un arreglo de números y devuelva el número mayor y el
menor, en un objeto.
let obj = miFuncion([3,1,5,4,2])
console.log(obj) // { mayor: 5, menor: 1 } */

function miFuncion(numeros) {
    let menor = numeros[0];
    let mayor = numeros[0];

    for (let i = 1; i < numeros.length; i++) {
        let num = numeros[i];

        if (num < menor) {
            menor = num;
        }
        if (num > mayor) {
            mayor = num; 
        }
    }

    return { mayor: mayor, menor: menor };
}

let obj = miFuncion([3, 1, 5, 4, 2]);
console.log(obj);