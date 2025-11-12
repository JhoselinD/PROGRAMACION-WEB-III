import { db } from '../config/db.js';

// 6 Registrar un nuevo producto
export const crearProducto = async (nombre, precio, stock, categoriaId) => {
    const sql = 'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)';
    const values = [nombre, precio, stock, categoriaId];
    const [result] = await db.execute(sql, values);
    return result;
};

// FUNCIÓN AUXILIAR: Verifica si la categoría existe antes de crear el producto
export const categoriaExiste = async (id) => {
    const sql = 'SELECT id FROM categorias WHERE id = ?';
    const [rows, _] = await db.execute(sql, [id]);
    return rows.length > 0;
};

//7 Listar todos los productos con nombre de categoría
export const obtenerTodosLosProductos = async () => {
    const sql = `SELECT p.id, p.nombre, p.precio, p.stock, p.categoria_id,
            c.nombre AS nombre_categoria
        FROM productos p INNER JOIN categorias c ON p.categoria_id = c.id`;
    const [rows, _] = await db.execute(sql);
    return rows;
};

// 8 Obtener un producto por ID con nombre de categoría
export const obtenerProductoPorId = async (id) => {
    const sql = `SELECT p.id, p.nombre, p.precio, p.stock, p.categoria_id,
            c.nombre AS nombre_categoria
        FROM productos p INNER JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?`;
    const [rows, _] = await db.execute(sql, [id]);
    return rows[0];
};

//9 Actualizar todos los datos de un producto
export const actualizarProducto = async (id, nombre, precio, stock, categoriaId) => {
    const sql = `UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?
        WHERE id = ?`;
    const values = [nombre, precio, stock, categoriaId, id];
    const [result] = await db.execute(sql, values);
    return result;
};

//10 Actualizar Stock
export const actualizarStock = async (id, cantidadAjuste) => {
    const sql = 'UPDATE productos SET stock = stock + ? WHERE id = ?';
    const values = [cantidadAjuste, id];
    const [result] = await db.execute(sql, values);
    return result;
};