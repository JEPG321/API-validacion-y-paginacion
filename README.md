# API-validacion-y-paginacion

API REST sencilla hecha con Node.js y Express para demostrar:

- Validacion de datos en `POST /api/libros`
- Paginacion en `GET /api/libros`

## Requisitos

- Node.js 18 o superior

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start
```

La API se ejecuta en:

```bash
http://localhost:3000
```

## Endpoints

### Registrar libro

`POST /api/libros`

Ejemplo de body:

```json
{
  "titulo": "Cien anos de soledad",
  "autor": "Gabriel Garcia Marquez",
  "isbn": "9780307474728",
  "editorial": "Sudamericana"
}
```

### Listar libros con paginacion

`GET /api/libros?page=1&limit=5`

## Estructura

```text
biblioteca-api/
src/
data/
libros.js
routes/
libros.routes.js
controllers/
libros.controller.js
validators/
libros.validator.js
app.js
server.js
package.json
README.md
```
