/* ¿Cuando es conveniente utilizar un callback, y cuando es necesario utilizar una
promesa? */

/* Usa callbacks para tareas asíncronas simples, código heredado y notificaciones que
pueden ocurrir más de una vez. Usa promesas para manejar flujos de trabajo asíncronos
complejos, cuando necesitas encadenar múltiples operaciones, o cuando buscas una 
gestión de errores más robusta y un código más legible que el de los callbacks */

/* CALLBACKS
Callback en JavaScript es una función que se pasa como argumento a otra función y es 
llamada por ella en un momento determinado de la operación, por ejemplo, después de 
obtener datos de la base de datos. De esa manera el código de llamada puede extender 
la función llamada, proporcionando un comportamiento adicional, y la función llamada
se puede escribir de una manera más general, sin conocer el contexto en el que se llama.*/

/* PROMESAS
Una Promesa en JavaScript es un objeto que contiene información sobre el estado actual 
y resultado de una operación asincrónica. Hay tres estados diferentes: pending, fulfilledy
rejected. El pendingEstado es el estado inicial para cada Promesa y significa que la 
operación aún no se ha completado. Cuando lo es fulfilled, significa que la operación se 
completa con éxito, y su valor está disponible. Si la operación falla, la Promise estará 
en el rejectedestado y como resultado recibiremos un error.  */