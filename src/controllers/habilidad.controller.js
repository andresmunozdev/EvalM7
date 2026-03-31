const { Habilidad, Personaje } = require('../models');

// GET - Obtener todas las habilidades y los personajes 
const getAll = async (req, res) => {
    try {
        const habilidades = await Habilidad.findAll({
        include: {
            model: Personaje,
            as: 'personajes',
            through: { attributes: ['nivelDominio'] },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    res.status(200).json({
        success: true,
        data: habilidades
    });
    } catch (error) {
    console.error('Error al obtener habilidades:', error);
    res.status(500).json({
        success: false,
        message: 'Error al obtener habilidades',
        error: error.message
    });
    }
};

// GET - Obtener una habilidad por ID
const getById = async (req, res) => {
    try {
    const { id } = req.params;

    const habilidad = await Habilidad.findByPk(id, {
        include: {
        model: Personaje,
        as: 'personajes',
        through: { attributes: ['nivelDominio'] },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!habilidad) {
        return res.status(404).json({
        success: false,
        message: 'Habilidad no encontrada'
        });
    }

    res.status(200).json({
        success: true,
        data: habilidad
    });
    } catch (error) {
    console.error('Error al obtener habilidad:', error);
    res.status(500).json({
        success: false,
        message: 'Error al obtener habilidad',
        error: error.message
    });
    }
};

// POST - Crear una nueva habilidad
const create = async (req, res) => {
    try {
    const { nombre, descripcion, categoria } = req.body;

    // Validar campos obligatorios
    if (!nombre || !categoria) {
        return res.status(400).json({
        success: false,
        message: 'Faltan datos obligatorios: nombre, categoria'
        });
    }

    // Validar categorías
    const categoriasValidas = ['Científica', 'Social', 'Técnica', 'Entretenimiento'];
    if (!categoriasValidas.includes(categoria)) {
        return res.status(400).json({
        success: false,
        message: `Categoría inválida. Debe ser: ${categoriasValidas.join(', ')}`
        });
    }

    const nuevaHabilidad = await Habilidad.create({
        nombre,
        descripcion: descripcion || null,
        categoria
    });

    res.status(201).json({
        success: true,
        message: 'Habilidad creada correctamente',
        data: nuevaHabilidad
    });
    } catch (error) {
    console.error('Error al crear habilidad:', error);

    // Controlar errores de nombres duplicados
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
        success: false,
        message: 'Ya existe una habilidad con ese nombre'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Error al crear habilidad',
        error: error.message
    });
    }
};

// PUT -  Actualizar una habilidad 
const update = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre, descripcion, categoria } = req.body;

    const habilidad = await Habilidad.findByPk(id);

    if (!habilidad) {
        return res.status(404).json({
        success: false,
        message: 'Habilidad no encontrada'
        });
    }

    // Validar ingreso del campo categoría
    if (categoria) {
        const categoriasValidas = ['Científica', 'Social', 'Técnica', 'Entretenimiento'];
        if (!categoriasValidas.includes(categoria)) {
        return res.status(400).json({
            success: false,
            message: `Categoría inválida. Debe ser: ${categoriasValidas.join(', ')}`
        });
        }
    }

    await habilidad.update({
        nombre: nombre || habilidad.nombre,
        descripcion: descripcion !== undefined ? descripcion : habilidad.descripcion,
        categoria: categoria || habilidad.categoria
    });

    res.status(200).json({
        success: true,
        message: 'Habilidad actualizada correctamente',
        data: habilidad
    });
    } catch (error) {
    console.error('Error al actualizar habilidad:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
        success: false,
        message: 'Ya existe una habilidad con ese nombre'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Error al actualizar habilidad',
        error: error.message
    });
    }
};

// DELETE Eliminar una habilidad
const remove = async (req, res) => {
    try {
    const { id } = req.params;

    const habilidad = await Habilidad.findByPk(id);

    if (!habilidad) {
        return res.status(404).json({
        success: false,
        message: 'Habilidad no encontrada'
        });
    }

    await habilidad.destroy();

    res.status(200).json({
        success: true,
        message: 'Habilidad eliminada correctamente',
        data: habilidad
    });
    } catch (error) {
    console.error('Error al eliminar habilidad:', error);
    res.status(500).json({
        success: false,
        message: 'Error al eliminar habilidad',
        error: error.message
    });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};