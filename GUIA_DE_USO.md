# Guia de uso

## Requisitos

- Node.js 18 o superior.
- Postman o Thunder Client, de forma opcional, para probar los endpoints.

## Encender la API

Abre una terminal en la carpeta del proyecto y ejecuta:

```powershell
cd "C:\EJERCICIOS ANALISIS\biblioteca-api"
npm.cmd install
npm.cmd start
```

La API se ejecuta en:

```text
http://localhost:3000
```

Para detenerla, presiona `Ctrl + C` en la terminal.

## Registrar un libro

Metodo: `POST`

URL:

```text
http://localhost:3000/api/libros
```

En Postman o Thunder Client selecciona `Body`, despues `raw` y el tipo `JSON`. Envia este cuerpo:

```json
{
  "titulo": "Cien anos de soledad",
  "autor": "Gabriel Garcia Marquez",
  "isbn": "9780307474728",
  "editorial": "Sudamericana"
}
```

Resultado esperado: HTTP `201` con el mensaje `Libro registrado correctamente` y los datos del libro creado.

Ejemplo de error: enviar un libro sin `titulo`.

```json
{
  "autor": "Gabriel Garcia Marquez",
  "isbn": "9780307474728"
}
```

Resultado esperado: HTTP `400` con un objeto `errors` que indica que el titulo es obligatorio.

## Consultar libros con paginacion

Metodo: `GET`

Primera pagina, con cinco libros:

```text
http://localhost:3000/api/libros?page=1&limit=5
```

Segunda pagina, con cinco libros:

```text
http://localhost:3000/api/libros?page=2&limit=5
```

Si no envias parametros, la API usa la pagina 1 y un limite de 5:

```text
http://localhost:3000/api/libros
```

Resultado esperado: HTTP `200` con una respuesta similar a esta:

```json
{
  "page": 1,
  "limit": 5,
  "total": 20,
  "totalPages": 4,
  "data": []
}
```

## Probar errores de paginacion

Pagina invalida:

```text
GET http://localhost:3000/api/libros?page=-1&limit=5
```

Resultado esperado: HTTP `400`; `errors.page` indica que debe ser mayor que cero.

Limite invalido:

```text
GET http://localhost:3000/api/libros?page=1&limit=100
```

Resultado esperado: HTTP `400`; `errors.limit` indica que no puede ser mayor que 20.

## Nota importante

Los datos se mantienen solamente mientras el servidor esta encendido. Cada vez que se reinicia, la lista vuelve a contener los 20 libros iniciales.
