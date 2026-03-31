const { Sequelize } = require('sequelize');
require('dotenv').config();

// Genera instancia Sequelize para conectar con la BD (en este caso, PostgreSQL local)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false 
    }
);

// Validar conexión de la BD
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión a PostgreSQL establecida correctamente');
    })
    .catch((error) => {
        console.error('Error al conectar a PostgreSQL:', error);
    });

module.exports = sequelize;