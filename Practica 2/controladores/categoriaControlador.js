import * as CategoriaModelo from '../modelos/categoriaModelo.js';

// 1 crear POST /categorias
export const registrarCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
    }

    try {
        const result = await CategoriaModelo.crearCategoria(nombre, descripcion); 

        return res.status(200).json({
            message: ' Categoría registrada',
            id_insertado: result.insertId, 
            nombre: nombre,
            descripcion: descripcion 
        });
    } catch (error) {
        console.error('Error :', error);
        return res.status(500).json({ 
            error: 'Error al procesar el registro.' 
        });
    }
};

// 2 GET /categorias
export const listarCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModelo.obtenerTodasLasCategorias();
        
        if (categorias.length === 0) {
            return res.status(200).json({ message: 'No hay categorías registradas.' });
        }

        return res.status(200).json(categorias);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Error al listar las categorías.' 
        });
    }
};

//3 GET /categorias/:id Buscar por ID en productos
export const buscarCategoriaPorId = async (req, res) => {
    const id = parseInt(req.params.id); 

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID no es un número válido.' });
    }

    try {
        const resultadoCompleto = await CategoriaModelo.obtenerCategoriaYProductos(id);
        
        if (!resultadoCompleto.nombre) { 
            return res.status(404).json({ message: `No se encontró ID: ${id}` });
        }
        return res.status(200).json(resultadoCompleto);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Error al buscar la categoría.' 
        });
    }
};

//4 PUT /categorias/:id Actualizar
export const actualizarCategoria = async (req, res) => {
    const id = parseInt(req.params.id);             //  ID de la URL y los datos
    const { nombre, descripcion } = req.body;

    if (id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero válido y mayor a cero.' });
    }
    if (req.params.id !== String(id)) {
        return res.status(400).json({ error: 'El ID no es un número entero válido.' });
    }
    if (!nombre) {
        return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
    }
    if (!descripcion) {
        return res.status(400).json({ error: 'El campo "descripcion" es obligatorio' });
    }

    try {
        const result = await CategoriaModelo.actualizarCategoria(id, nombre, descripcion);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró la categoría con ID: ${id} para actualizar.` });
        }

        return res.status(200).json({ 
            message: `Categoría con ID ${id} actualizada correctamente.`,
            nombre_nuevo: nombre,
            descripcion_nueva: descripcion
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor al actualizar la categoría.' 
        });
    }
};

//5 DELETE /categorias/:id Eliminar
export const eliminarCategoria = async (req, res) => {
    const id = parseInt(req.params.id); 

    if (id <= 0) {      //ID Positivo
        return res.status(400).json({ error: 'El ID debe ser mayor a cero' });
    }
    
    if (req.params.id !== String(id)) {    //ID Entero
        return res.status(400).json({ error: 'El ID no es valido.' });
    }

    try {
        const resultado = await CategoriaModelo.eliminarCategoriaTransaccion(id);

        if (resultado.categoriaEliminada === 0) {
            return res.status(404).json({ message: `No se encontro: ${id} para eliminar.` });
        }

        return res.status(200).json({
            message: `ID ${id} eliminada`,
            productos_afectados: resultado.productosEliminados
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Error al eliminar la categoría y sus productos.'
        });
    }
};