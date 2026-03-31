# Documentación de API

## Información general

- **Nombre**: API Serie "The Big Bang Theory"
- **Versión**: `1.0.0`
- **Base URL local**: `http://localhost:3000`
- **Formato de datos**: JSON
- **Autenticación**: No requerida

## Endpoint de salud / bienvenida

### `GET /`
Devuelve información general de la API.

**Respuesta exitosa (`200`)**

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

## Recurso: Personajes

Base path: `/api/personajes`

### Estructura del objeto `Personaje`

```json
{
  "id": 1,
  "nombre": "Sheldon Cooper",
  "actor": "Jim Parsons",
  "edad": 42,
  "ocupacion": "Físico teórico",
  "estado": "Activo",
  "fraseIconica": "Bazinga!",
  "grupo": "Personajes principales",
  "habilidades": [
    {
      "id": 1,
      "nombre": "Física",
      "descripcion": "Dominio de conceptos avanzados",
      "categoria": "Científica",
      "PersonajeHabilidad": {
        "nivelDominio": "Experto"
      }
    }
  ]
}
```

### `GET /api/personajes`
Obtiene todos los personajes con sus habilidades.

**Respuesta (`200`)**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Sheldon Cooper",
      "actor": "Jim Parsons",
      "edad": 42,
      "ocupacion": "Físico teórico",
      "estado": "Activo",
      "fraseIconica": "Bazinga!",
      "grupo": "Personajes principales",
      "habilidades": []
    }
  ]
}
```

### `GET /api/personajes/:id`
Obtiene un personaje por ID.

- `200`: encontrado
- `404`: personaje no encontrado

### `POST /api/personajes`
Crea un personaje.

**Body requerido**

```json
{
  "nombre": "Leonard Hofstadter",
  "actor": "Johnny Galecki",
  "edad": 41,
  "ocupacion": "Físico experimental",
  "estado": "Activo",
  "fraseIconica": "Sometimes your movements are so lifelike...",
  "grupo": "Personajes principales"
}
```

**Campos obligatorios**

- `nombre`
- `actor`
- `edad` (numérico)
- `ocupacion`
- `estado`
- `grupo`

**Respuestas**

- `201`: creado correctamente
- `400`: faltan datos o `edad` inválida
- `500`: error del servidor

### `PUT /api/personajes/:id`
Actualiza un personaje existente.

**Body permitido (parcial o completo)**

```json
{
  "nombre": "Leonard",
  "edad": 42,
  "fraseIconica": "Nueva frase"
}
```

**Respuestas**

- `200`: actualizado correctamente
- `400`: `edad` inválida
- `404`: personaje no encontrado
- `500`: error del servidor

### `DELETE /api/personajes/:id`
Elimina un personaje.

**Respuestas**

- `200`: eliminado correctamente
- `404`: personaje no encontrado
- `500`: error del servidor

---

## Recurso: Habilidades

Base path: `/api/habilidades`

### Estructura del objeto `Habilidad`

```json
{
  "id": 1,
  "nombre": "Física",
  "descripcion": "Dominio de conceptos avanzados",
  "categoria": "Científica",
  "personajes": [
    {
      "id": 1,
      "nombre": "Sheldon Cooper",
      "actor": "Jim Parsons",
      "edad": 42,
      "ocupacion": "Físico teórico",
      "estado": "Activo",
      "fraseIconica": "Bazinga!",
      "grupo": "Personajes principales",
      "PersonajeHabilidad": {
        "nivelDominio": "Experto"
      }
    }
  ]
}
```

### `GET /api/habilidades`
Obtiene todas las habilidades con los personajes asociados.

- `200`: lista de habilidades
- `500`: error del servidor

### `GET /api/habilidades/:id`
Obtiene una habilidad por ID.

- `200`: encontrada
- `404`: habilidad no encontrada
- `500`: error del servidor

### `POST /api/habilidades`
Crea una nueva habilidad.

**Body requerido**

```json
{
  "nombre": "Ajedrez",
  "descripcion": "Buen nivel estratégico",
  "categoria": "Entretenimiento"
}
```

**Campos obligatorios**

- `nombre`
- `categoria`

**Categorías válidas**

- `Científica`
- `Social`
- `Técnica`
- `Entretenimiento`

**Respuestas**

- `201`: creada correctamente
- `400`: faltan datos, categoría inválida o nombre duplicado
- `500`: error del servidor

### `PUT /api/habilidades/:id`
Actualiza una habilidad.

**Body permitido (parcial o completo)**

```json
{
  "descripcion": "Descripción actualizada",
  "categoria": "Técnica"
}
```

**Respuestas**

- `200`: actualizada correctamente
- `400`: categoría inválida o nombre duplicado
- `404`: habilidad no encontrada
- `500`: error del servidor

### `DELETE /api/habilidades/:id`
Elimina una habilidad.

**Respuestas**

- `200`: eliminada correctamente
- `404`: habilidad no encontrada
- `500`: error del servidor

---

## Formato de errores

La API usa este patrón general de error:

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalle técnico (cuando aplica)"
}
```

## Notas

- En listados y búsquedas por ID, los campos `createdAt` y `updatedAt` se excluyen de las respuestas.
- Las relaciones entre `Personaje` y `Habilidad` son muchos-a-muchos mediante `PersonajeHabilidad`.
- El nivel de dominio se expone como `PersonajeHabilidad.nivelDominio`.
