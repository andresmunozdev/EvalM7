const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define el modelo de Habilidades

const Habilidad = sequelize.define('Habilidad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        notEmpty: {
            msg: 'El nombre de la habilidad no puede estar vacío'
        }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        isIn: {
            args: [['Científica', 'Social', 'Técnica', 'Entretenimiento']],
            msg: 'La categoría debe ser: Científica, Social, Técnica o Entretenimiento'
        }
        }
    }
    }, {
    tableName: 'habilidades',
    timestamps: true
});

module.exports = Habilidad;