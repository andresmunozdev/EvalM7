require('dotenv').config();
const express = require('express');

// Importa modelos (Sequelize)
require('./models');

// Importa rutas
const personajeRoutes = require('./routes/personaje.routes');
const habilidadRoutes = require('./routes/habilidad.routes');

// Importa middleware de errores
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Parsear JSON
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API Serie "The Big Bang Theory" - Bootcamp FullStack JS - Personajes y Habilidades',
        version: '1.0.0',
        endpoints: {
        personajes: '/api/personajes',
        habilidades: '/api/habilidades',
        }
    });
});

// Rutas para la API
app.use('/api/personajes', personajeRoutes);
app.use('/api/habilidades', habilidadRoutes);

// MIDDLEWARE DE ERRORES

app.use(errorHandler);

// INICIAR SERVIDOR

app.listen(PORT, () => {
console.log(`
API Serie "The Big Bang Theory" - Bootcamp FullStack JS
Servidor corriendo en puerto ${PORT}
http://localhost:${PORT}
`);
});

module.exports = app;