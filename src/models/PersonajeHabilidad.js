const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo PersonajeHabilidad (tabla de unión)
const PersonajeHabilidad = sequelize.define('PersonajeHabilidad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    personajeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'personajes',
        key: 'id'
        }
    },
    habilidadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'habilidades',
        key: 'id'
        }
    },
    nivelDominio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Avanzado',
        validate: {
        isIn: {
            args: [['Básico', 'Intermedio', 'Avanzado', 'Experto']],
            msg: 'El nivel debe ser: Básico, Intermedio, Avanzado o Experto'
        }
        }
    }
    }, {
    tableName: 'personaje_habilidades',
    timestamps: true
});

module.exports = PersonajeHabilidad;