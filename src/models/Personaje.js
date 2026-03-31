const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo Personaje
const Personaje = sequelize.define('Personaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: {
            msg: 'El nombre no puede estar vacío'
        }
        }
    },
    actor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: {
            msg: 'El actor no puede estar vacío'
        }
        }
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        isNumeric: {
            msg: 'La edad debe ser un número'
        },
        min: {
            args: [1],
            msg: 'La edad debe ser mayor a 0'
        }
        }
    },
    ocupacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fraseIconica: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    grupo: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    tableName: 'personajes',
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = Personaje;