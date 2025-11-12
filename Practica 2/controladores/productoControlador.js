import * as ProductoModelo from '../modelos/productoModelo.js';

//6 POST /productos Crear
export const registrarProducto = async (req, res) => {
    const { nombre, precio, stock, categoria_id } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'Falta "nombre".' });
    }
    if (nombre === '') {
        return res.status(400).json({ error: 'nombre no puede estar vacío.' });
    }
    if (!precio) {
        return res.status(400).json({ error: 'Falta "precio".' });
    }
    if (!stock) {
        return res.status(400).json({ error: 'Falta "stock".' });
    }
    if (!categoria_id) {
        return res.status(400).json({ error: 'Falta "categoria_id".' });
    }
    
    try {
        const existe = await ProductoModelo.categoriaExiste(categoria_id);
        if (!existe) {
            return res.status(404).json({ error: `La categoría con ID ${categoria_id} no fue encontrada.` });
        }

        const result = await ProductoModelo.crearProducto(nombre, precio, stock, categoria_id);
        
        return res.status(201).json({
            message: 'Producto registrado con éxito.',
            id_insertado: result.insertId,
            datos_enviados: { nombre, precio, stock, categoria_id }
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


//7 GET /productos Listar
export const listarProductos = async (req, res) => {
    try {
        const productos = await ProductoModelo.obtenerTodosLosProductos();

        if (productos.length === 0) {
            return res.status(200).json({ message: 'No se encontraron productos' });
        }

        return res.status(200).json(productos);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
};


//8 GET /productos/:id Buscar por ID
export const buscarProductoPorId = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) { 
        return res.status(400).json({ error: 'ID  inválido' });
    }

    try {
        const producto = await ProductoModelo.obtenerProductoPorId(id);

        if (!producto) {
            return res.status(404).json({ message: `No se encontró el producto con ID: ${id}.` });
        }

        return res.status(200).json(producto);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error del servidor.' });
    }
};


//9 PUT /productos/:id Actualizar todo
export const actualizarProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio, stock, categoria_id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID de producto inválido' });
    }

    if (!nombre) {
        return res.status(400).json({ error: 'Falta el campo "nombre"' });
    }
    if (!precio) {
        return res.status(400).json({ error: 'Falta el campo "precio"' });
    }
    if (!stock) {
        return res.status(400).json({ error: 'Falta el campo "stock"' });
    }
    if (!categoria_id) {
        return res.status(400).json({ error: 'Falta el campo "categoria_id"' });
    }

    try {
        const existe = await ProductoModelo.categoriaExiste(categoria_id);
        if (!existe) {
            return res.status(404).json({ error: `La categoría con ID ${categoria_id} no fue encontrada.` });
        }
        
        const result = await ProductoModelo.actualizarProducto(id, nombre, precio, stock, categoria_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el producto con ID: ${id} para actualizar.` });
        }

        return res.status(200).json({
            message: `Producto con ID ${id} actualizado`,
            datos_actualizados: { nombre, precio, stock, categoria_id }
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error del servidor.' });
    }
};


//10 PATCH /productos/:id/stock Actualizar stock
export const actualizarStock = async (req, res) => {
    const id = parseInt(req.params.id);
    const { cantidad } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID de producto inválido' });
    }
    
    if (cantidad === undefined) {
        return res.status(400).json({ error: 'Falta el campo "cantidad"' });
    }

    const cantidadAjuste = Number(cantidad);
    
    if (Number.isNaN(cantidadAjuste)) {
        return res.status(400).json({ message: 'La cantidad debe ser un número válido' });
    }

    if (!Number.isInteger(cantidadAjuste)) {
        return res.status(400).json({ message: 'La cantidad debe ser un número entero' });
    }
    
    if (cantidadAjuste === 0) {
        return res.status(400).json({ message: 'La cantidad debe ser diferente de cero' });
    }

    try {
        const result = await ProductoModelo.actualizarStock(id, cantidadAjuste);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el ID: ${id} para actualizar stock.` });
        }
        
        const productoActualizado = await ProductoModelo.obtenerProductoPorId(id);

        return res.status(200).json({
            message: `Stock del producto ID ${id} ajustado`,
            ajuste_realizado: cantidadAjuste,
            nuevo_stock: productoActualizado?.stock,
            nombre_producto: productoActualizado?.nombre
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error del servidor.' });
    }
};