const express = require('express');
const router = express.Router();
const personajeController = require('../controllers/personaje.controller');

// GET: Obtener todos los personajes
router.get('/', personajeController.getAll);

// GET: Obtener un personaje por ID
router.get('/:id', personajeController.getById);

// POST: Crear un nuevo personaje
router.post('/', personajeController.create);

// PUT: Actualizar un personaje
router.put('/:id', personajeController.update);

// DELETE: Eliminar un personaje
router.delete('/:id', personajeController.remove);

module.exports = router;