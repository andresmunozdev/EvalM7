const sequelize = require('../config/database');
const Personaje = require('./Personaje');
const Habilidad = require('./Habilidad');
const PersonajeHabilidad = require('./PersonajeHabilidad');

// Configurar relaciones M:N
// Un Personaje tiene muchas Habilidades
// Una Habilidad está en muchos Personajes
Personaje.belongsToMany(Habilidad, {
    through: PersonajeHabilidad,
    foreignKey: 'personajeId',
    otherKey: 'habilidadId',
    as: 'habilidades'
});

Habilidad.belongsToMany(Personaje, {
    through: PersonajeHabilidad,
    foreignKey: 'habilidadId',
    otherKey: 'personajeId',
    as: 'personajes'
});

// Sincronizar modelos con la base de datos
// force: false = no borra datos si ya existen
// alter: true = actualiza esquema si hay cambios
sequelize
    .sync({ alter: false })
    .then(() => {
        console.log('Modelos sincronizados con la BD');
    })
    .catch((error) => {
        console.error('Error al sincronizar modelos:', error);
    });

module.exports = {
    sequelize,
    Personaje,
    Habilidad,
    PersonajeHabilidad
};