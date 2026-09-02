const libros = require("../data/libros");
const {
  validateLibro,
  validatePagination
} = require("../validators/libros.validator");

function crearLibro(req, res) {
  const { isValid, errors } = validateLibro(req.body);

  if (!isValid) {
    return res.status(400).json({
      error: "Datos invalidos",
      errors
    });
  }

  const nuevoLibro = {
    id: libros.length + 1,
    titulo: req.body.titulo.trim(),
    autor: req.body.autor.trim(),
    isbn: String(req.body.isbn),
    editorial:
      typeof req.body.editorial === "string" && req.body.editorial.trim() !== ""
        ? req.body.editorial.trim()
        : undefined
  };

  libros.push(nuevoLibro);

  return res.status(201).json({
    mensaje: "Libro registrado correctamente",
    data: nuevoLibro
  });
}

function obtenerLibros(req, res) {
  const { isValid, errors, page, limit } = validatePagination(req.query);

  if (!isValid) {
    return res.status(400).json({
      error: "Parametros invalidos",
      errors
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = libros.length;
  const totalPages = Math.ceil(total / limit);
  const data = libros.slice(startIndex, endIndex);

  return res.status(200).json({
    page,
    limit,
    total,
    totalPages,
    data
  });
}

module.exports = {
  crearLibro,
  obtenerLibros
};
