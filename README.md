# EvalM7 API - The Big Bang Theory

Video Explicación en: https://youtu.be/dst4jJVeRt0 

API REST construida con **Node.js + Express + Sequelize + PostgreSQL** para gestionar personajes y habilidades de la serie **The Big Bang Theory**, incluyendo relación muchos-a-muchos entre ambas entidades.

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos](#modelo-de-datos)
- [Requisitos previos](#requisitos-previos)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Carga de datos iniciales (seed)](#carga-de-datos-iniciales-seed)
- [Documentación de la API](#documentación-de-la-api)
- [Manejo de errores](#manejo-de-errores)
- [Scripts disponibles](#scripts-disponibles)
- [Notas importantes](#notas-importantes)

## Características

- CRUD completo de personajes.
- CRUD completo de habilidades.
- Relación M:N entre personajes y habilidades con atributo extra `nivelDominio`.
- Validaciones de datos en controladores y modelos Sequelize.
- Respuestas en formato JSON con estructura consistente.
- Middleware de manejo de errores centralizado.

## Stack tecnológico

- Node.js
- Express 5
- Sequelize 6
- PostgreSQL
- dotenv
- nodemon (desarrollo)

## Estructura del proyecto

```text
.
├── package.json
└── src/
    ├── cargaDatos.js
    ├── server.js
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── habilidad.controller.js
    │   └── personaje.controller.js
    ├── middlewares/
    │   └── error.middleware.js
    ├── models/
    │   ├── Habilidad.js
    │   ├── index.js
    │   ├── Personaje.js
    │   └── PersonajeHabilidad.js
    └── routes/
        ├── habilidad.routes.js
        └── personaje.routes.js
```

## Modelo de datos

### Entidad Personaje

Campos principales:

- `id` (PK, autoincremental)
- `nombre` (string, obligatorio)
- `actor` (string, obligatorio)
- `edad` (integer, obligatorio, mayor a 0)
- `ocupacion` (string, obligatorio)
- `estado` (string, obligatorio)
- `fraseIconica` (text, opcional)
- `grupo` (string, obligatorio)

### Entidad Habilidad

Campos principales:

- `id` (PK, autoincremental)
- `nombre` (string, obligatorio, único)
- `descripcion` (text, opcional)
- `categoria` (string, obligatorio)

Valores permitidos en `categoria`:

- `Científica`
- `Social`
- `Técnica`
- `Entretenimiento`

### Tabla intermedia PersonajeHabilidad

Campos principales:

- `id` (PK, autoincremental)
- `personajeId` (FK -> personajes.id)
- `habilidadId` (FK -> habilidades.id)
- `nivelDominio` (string, default `Avanzado`)

Valores permitidos en `nivelDominio`:

- `Básico`
- `Intermedio`
- `Avanzado`
- `Experto`

### Relación

- Un personaje tiene muchas habilidades.
- Una habilidad pertenece a muchos personajes.
- La relación usa la tabla `personaje_habilidades`.

## Requisitos previos

- Node.js 18+ (recomendado)
- npm
- PostgreSQL instalado y en ejecución
- Base de datos creada previamente

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
NODE_ENV=development

DB_NAME=nombre_base_datos
DB_USER=usuario_postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar en modo desarrollo (con recarga automática):

```bash
npm run dev
```

3. Iniciar en modo normal:

```bash
npm start
```

Si todo está correcto, la API quedará disponible en:

- `http://localhost:3000`

## Carga de datos iniciales (seed)

El proyecto incluye un script para poblar la base de datos con personajes, habilidades y relaciones.

Ejecutar:

```bash
node src/cargaDatos.js
```

Este script:

- Crea habilidades base.
- Crea personajes principales.
- Asigna habilidades a personajes con `nivelDominio`.

## Documentación de la API

Base URL:

- `http://localhost:3000/api`

### Endpoint de bienvenida

#### GET /

Devuelve información general de la API.

Ejemplo de respuesta:

```json
{
  "success": true,
  "message": "API Serie \"The Big Bang Theory\" - Bootcamp FullStack JS - Personajes y Habilidades",
  "version": "1.0.0",
  "endpoints": {
    "personajes": "/api/personajes",
    "habilidades": "/api/habilidades"
  }
}
```

---

## Rutas de personajes

### GET /api/personajes

Obtiene todos los personajes con sus habilidades.

### GET /api/personajes/:id

Obtiene un personaje por ID con sus habilidades.

- Respuesta `404` si no existe.

### POST /api/personajes

Crea un nuevo personaje.

Body esperado:

```json
{
  "nombre": "Stuart Bloom",
  "actor": "Kevin Sussman",
  "edad": 39,
  "ocupacion": "Dueño de tienda de cómics",
  "estado": "Activo",
  "fraseIconica": "I own a comic book store.",
  "grupo": "Amigos"
}
```

Campos obligatorios:

- `nombre`
- `actor`
- `edad`
- `ocupacion`
- `estado`
- `grupo`

Validaciones relevantes:

- `edad` debe ser numérica.

### PUT /api/personajes/:id

Actualiza un personaje existente (parcial o total).

Body de ejemplo:

```json
{
  "edad": 40,
  "estado": "Inactivo"
}
```

- Respuesta `404` si no existe.
- Respuesta `400` si `edad` no es numérica.

### DELETE /api/personajes/:id

Elimina un personaje por ID.

- Respuesta `404` si no existe.

---

## Rutas de habilidades

### GET /api/habilidades

Obtiene todas las habilidades con sus personajes asociados.

### GET /api/habilidades/:id

Obtiene una habilidad por ID con sus personajes.

- Respuesta `404` si no existe.

### POST /api/habilidades

Crea una nueva habilidad.

Body esperado:

```json
{
  "nombre": "Programación",
  "descripcion": "Desarrollo de software y resolución de problemas",
  "categoria": "Técnica"
}
```

Campos obligatorios:

- `nombre`
- `categoria`

Categorías permitidas:

- `Científica`
- `Social`
- `Técnica`
- `Entretenimiento`

Validaciones relevantes:

- `nombre` único.
- `categoria` debe pertenecer al conjunto permitido.

### PUT /api/habilidades/:id

Actualiza una habilidad existente.

Body de ejemplo:

```json
{
  "descripcion": "Conocimientos avanzados en ciencias físicas"
}
```

- Respuesta `404` si no existe.
- Respuesta `400` por categoría inválida o nombre duplicado.

### DELETE /api/habilidades/:id

Elimina una habilidad por ID.

- Respuesta `404` si no existe.

## Manejo de errores

La API devuelve respuestas de error en JSON. Casos comunes:

- `400 Bad Request`: validaciones de negocio / datos inválidos.
- `404 Not Found`: recurso no encontrado.
- `500 Internal Server Error`: error inesperado.

Formato general:

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalle interno (según entorno)"
}
```

## Scripts disponibles

En `package.json`:

- `npm start` -> ejecuta `node src/server.js`
- `npm run dev` -> ejecuta `nodemon src/server.js`

## Notas importantes

- La sincronización de modelos está configurada con `sequelize.sync({ alter: false })`.
- El script de seed contiene una opción comentada para truncar tablas con `sequelize.truncate({ cascade: true })`; úsala con precaución.
- El middleware de errores existe, pero varios controladores responden errores directamente en `try/catch`; esto es funcional, aunque puede centralizarse más en una refactorización futura.

---

