import express from 'express';
import * as CategoriaControlador from'./controladores/categoriaControlador.js'; 
import * as ProductoControlador from'./controladores/productoControlador.js'; 

const app = express();
app.use(express.json());

// Ejercicio 1
app.post('/categorias', CategoriaControlador.registrarCategoria);

// Ejercicio 2
app.get('/categorias', CategoriaControlador.listarCategorias);

// Ejercicio 3
app.get('/categorias/:id', CategoriaControlador.buscarCategoriaPorId);

// Ejercicio 4
app.put('/categorias/:id', CategoriaControlador.actualizarCategoria);

// Ejercicio 5
app.delete('/categorias/:id', CategoriaControlador.eliminarCategoria);

// Ejercicio 6
app.post('/productos', ProductoControlador.registrarProducto);

// Ejercicio 7
app.get('/productos', ProductoControlador.listarProductos);

// Ejercicio 8
app.get('/productos/:id', ProductoControlador.buscarProductoPorId);

// Ejercicio 9
app.put('/productos/:id', ProductoControlador.actualizarProducto);

//Ejercicio 10
app.patch('/productos/:id/stock', ProductoControlador.actualizarStock);

const puerto = 3001;
app.listen(puerto,
() => { console.log(`Servidor en http://localhost:${puerto}`);
});