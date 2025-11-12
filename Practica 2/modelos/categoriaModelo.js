import { db } from '../config/db.js';

// 1 Función para crear una categoría
export const crearCategoria = async (nombre, descripcion) => {
    const sql = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
    const values = [nombre, descripcion]; 
    const [result] = await db.execute(sql, values); 
    
    return result;
};

// 2 Función para obtener todas las categorías en db
export const obtenerTodasLasCategorias = async () => {
    const sql = 'SELECT * FROM categorias';
    const [rows, _] = await db.execute(sql); 
    return rows;
};

// 3 Obtener Categoría Y sus Productos 
export const obtenerCategoriaYProductos = async (id) => {
    const sqlCategoria = 'SELECT id, nombre, descripcion FROM categorias WHERE id = ?';
    const [categoriaRows, _] = await db.execute(sqlCategoria, [id]); 
    const categoria = categoriaRows[0]; 

    if (!categoria) {
        return {}; 
    }

    const sqlProductos = 'SELECT id, nombre, precio, stock FROM productos WHERE categoria_id = ?';
    const [productosRows, __] = await db.execute(sqlProductos, [id]);
    
    const resultadoFinal = {
        ...categoria, 
        productos: productosRows 
    };
    
    return resultadoFinal;
};

// 4 Actualizar Categoría (PUT)
export const actualizarCategoria = async (id, nombre, descripcion) => {
    const sql = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?';
    const values = [nombre, descripcion, id]; 
    
    const [result] = await db.execute(sql, values);
    return result;
};

//5 Eliminar Categoría y Productos Relacionados (DELETE)
export const eliminarCategoriaTransaccion = async (id) => {
    const connection = await db.getConnection();
    let productosEliminados = 0; // Contador

    try {
        await connection.beginTransaction();

        const sqlDeleteProductos = 'DELETE FROM productos WHERE categoria_id = ?';
        const [resultProductos] = await connection.execute(sqlDeleteProductos, [id]);
        productosEliminados = resultProductos.affectedRows;

        const sqlDeleteCategoria = 'DELETE FROM categorias WHERE id = ?';
        const [resultCategoria] = await connection.execute(sqlDeleteCategoria, [id]);
        
        await connection.commit();

        return {
            categoriaEliminada: resultCategoria.affectedRows,
            productosEliminados: productosEliminados
        };

    } catch (error) {
        await connection.rollback();
        throw error; 
    } finally {
        connection.release(); 
    }
};