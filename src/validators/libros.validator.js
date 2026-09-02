function validateLibro(data) {
  const errors = {};

  if (data.titulo === undefined) {
    errors.titulo = "El titulo es obligatorio";
  } else if (typeof data.titulo !== "string" || data.titulo.trim() === "") {
    errors.titulo = "El titulo no puede estar vacio";
  }

  if (data.autor === undefined) {
    errors.autor = "El autor es obligatorio";
  } else if (typeof data.autor !== "string" || data.autor.trim() === "") {
    errors.autor = "El autor no puede estar vacio";
  }

  if (data.isbn === undefined) {
    errors.isbn = "El ISBN es obligatorio";
  } else if (!/^\d+$/.test(String(data.isbn))) {
    errors.isbn = "El ISBN debe contener solamente numeros";
  } else if (![10, 13].includes(String(data.isbn).length)) {
    errors.isbn = "El ISBN debe contener 10 o 13 numeros";
  }

  if (
    data.editorial !== undefined &&
    data.editorial !== null &&
    typeof data.editorial !== "string"
  ) {
    errors.editorial = "La editorial debe ser una cadena de texto";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validatePagination(query) {
  const errors = {};
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? 5 : Number(query.limit);

  if (!Number.isInteger(page)) {
    errors.page = "El parametro page debe ser un numero entero";
  } else if (page <= 0) {
    errors.page = "El parametro page debe ser mayor que 0";
  }

  if (!Number.isInteger(limit)) {
    errors.limit = "El parametro limit debe ser un numero entero";
  } else if (limit <= 0) {
    errors.limit = "El parametro limit debe ser mayor que 0";
  } else if (limit > 20) {
    errors.limit = "El parametro limit no puede ser mayor que 20";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    page,
    limit
  };
}

module.exports = {
  validateLibro,
  validatePagination
};
