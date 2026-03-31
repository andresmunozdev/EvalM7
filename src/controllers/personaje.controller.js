const { Personaje, Habilidad } = require('../models');

// GET - Obtener todos los personajes y sus habilidades
const getAll = async (req, res) => {
    try {
    const personajes = await Personaje.findAll({
        include: {
            model: Habilidad,
            as: 'habilidades',
            through: { attributes: ['nivelDominio'] }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    res.status(200).json({
        success: true,
        data: personajes
        });
    } catch (error) {
    console.error('Error al obtener personajes:', error);
    res.status(500).json({
        success: false,
        message: 'Error al obtener personajes',
        error: error.message
        });
    }
};

// GET - Obtener personaje específico por su ID
const getById = async (req, res) => {
    try {
        const { id } = req.params;

    const personaje = await Personaje.findByPk(id, {
        include: {
            model: Habilidad,
            as: 'habilidades',
            through: { attributes: ['nivelDominio'] },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!personaje) {
        return res.status(404).json({
            success: false,
            message: 'Personaje no encontrado'
        });
    }

    res.status(200).json({
        success: true,
        data: personaje
        });
    } catch (error) {
        console.error('Error al obtener personaje:', error);
        res.status(500).json({
        success: false,
        message: 'Error al obtener personaje',
        error: error.message
        });
    }
};

// POST - Crear personaje
const create = async (req, res) => {
    try {
        const { nombre, actor, edad, ocupacion, estado, fraseIconica, grupo } = req.body;

        // Valida campos obligatorios
        if (!nombre || !actor || !edad || !ocupacion || !estado || !grupo) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos obligatorios: nombre, actor, edad, ocupacion, estado, grupo'
        });
    }

    // Valida edad = a número
        if (isNaN(edad)) {
        return res.status(400).json({
            success: false,
            message: 'La edad debe ser un valor numérico'
        });
    }

    const nuevoPersonaje = await Personaje.create({
        nombre,
        actor,
        edad: Number(edad),
        ocupacion,
        estado,
        fraseIconica: fraseIconica || null,
        grupo
    });

    res.status(201).json({
        success: true,
        message: 'Personaje creado correctamente',
        data: nuevoPersonaje
    });
    } catch (error) {
    console.error('Error al crear personaje:', error);
    res.status(500).json({
        success: false,
        message: 'Error al crear personaje',
        error: error.message
    });
    }
};

// PUT - Actualizar un personaje
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, actor, edad, ocupacion, estado, fraseIconica, grupo } = req.body;

    // Validar que edad esté y sea numerica
    if (edad !== undefined && isNaN(edad)) {
        return res.status(400).json({
            success: false,
            message: 'La edad debe ser un valor numérico'
        });
    }

    const personaje = await Personaje.findByPk(id);

    if (!personaje) {
        return res.status(404).json({
            success: false,
            message: 'Personaje no encontrado'
        });
        }

    // Actualiza los campos 
    await personaje.update({
        nombre: nombre || personaje.nombre,
        actor: actor || personaje.actor,
        edad: edad ? Number(edad) : personaje.edad,
        ocupacion: ocupacion || personaje.ocupacion,
        estado: estado || personaje.estado,
        fraseIconica: fraseIconica !== undefined ? fraseIconica : personaje.fraseIconica,
        grupo: grupo || personaje.grupo
    });

    res.status(200).json({
        success: true,
        message: 'Personaje actualizado correctamente',
        data: personaje
    });
    } catch (error) {
        console.error('Error al actualizar personaje:', error);
        res.status(500).json({
        success: false,
        message: 'Error al actualizar personaje',
        error: error.message
        });
    }
};

// DELETE - Eliminar personaje
const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const personaje = await Personaje.findByPk(id);

        if (!personaje) {
        return res.status(404).json({
            success: false,
            message: 'Personaje no encontrado'
        });
    }

    await personaje.destroy();

    res.status(200).json({
        success: true,
        message: 'Personaje eliminado correctamente',
        data: personaje
        });
    } catch (error) {
        console.error('Error al eliminar personaje:', error);
        res.status(500).json({
        success: false,
        message: 'Error al eliminar personaje',
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