const errorHandler = (err, req, res, next) => {
    console.error('Error capturado:', err);

    // Error de validación de Sequelize
    if (err.name === 'SequelizeValidationError') {
        const mensajes = err.errors.map((e) => e.message);
        return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: mensajes
        });
    }

    // Error de constraint de base de datos
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
        success: false,
        message: 'Ese registro ya existe en la base de datos',
        field: err.errors[0].path
        });
    }

    // Error genérico
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;