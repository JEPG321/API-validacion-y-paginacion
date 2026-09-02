# Explicacion de la API

Esta es una API REST sencilla para una biblioteca. Su objetivo es demostrar dos conceptos:

- Validacion de datos al registrar libros.
- Paginacion al consultar la lista de libros.

Los datos se guardan temporalmente en un arreglo de JavaScript. No se usa base de datos, por lo que al detener y volver a iniciar el servidor los libros registrados se pierden y se restauran los 20 libros iniciales.

## Como funciona

El servidor se inicia desde `src/server.js` y escucha en el puerto `3000`. El archivo `src/app.js` configura Express, interpreta cuerpos JSON y conecta las rutas que comienzan con `/api`.

Las rutas se encuentran en `src/routes/libros.routes.js`:

- `POST /api/libros` registra un libro.
- `GET /api/libros` consulta los libros paginados.

## Registro de libros

El controlador recibe los datos enviados por el cliente y llama a `validateLibro` en `src/validators/libros.validator.js`.

Las reglas son:

- `titulo` es obligatorio y no puede estar vacio.
- `autor` es obligatorio y no puede estar vacio.
- `isbn` es obligatorio, solo puede tener numeros y debe tener 10 o 13 caracteres.
- `editorial` es opcional.

Si algun dato falla, la API responde con HTTP `400` y un objeto `errors` que indica el campo incorrecto. Si todo es valido, se crea un ID, el libro se agrega al arreglo y la respuesta tiene HTTP `201`.

## Paginacion

El controlador valida `page` y `limit` con `validatePagination` en `src/validators/libros.validator.js`.

- Si no se envia `page`, usa `1`.
- Si no se envia `limit`, usa `5`.
- Ambos deben ser numeros enteros mayores que cero.
- `limit` no puede ser mayor que `20`.

La paginacion se realiza en `src/controllers/libros.controller.js` con estas operaciones:

```js
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;
const data = libros.slice(startIndex, endIndex);
```

Por ejemplo, para `page=2` y `limit=5`, el indice inicial es `5`. Como los arreglos empiezan en el indice cero, `slice(5, 10)` devuelve los libros 6 al 10.

La respuesta incluye la pagina solicitada, el limite, la cantidad total de libros, el total de paginas y los libros correspondientes a esa pagina.
