const express = require('express');
const router = express.Router();
const habilidadController = require('../controllers/habilidad.controller');

// GET: Obtener todas las habilidades
router.get('/', habilidadController.getAll);

// GET: Obtener una habilidad por ID
router.get('/:id', habilidadController.getById);

// POST: Crear una nueva habilidad
router.post('/', habilidadController.create);

// PUT: Actualizar una habilidad
router.put('/:id', habilidadController.update);

// DELETE: Eliminar una habilidad
router.delete('/:id', habilidadController.remove);

module.exports = router;