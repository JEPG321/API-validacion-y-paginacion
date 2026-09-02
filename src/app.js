const express = require("express");
const librosRoutes = require("./routes/libros.routes");

const app = express();

app.use(express.json());

app.use("/api", librosRoutes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: "JSON invalido",
      errors: {
        body: "El cuerpo de la solicitud debe ser un JSON valido"
      }
    });
  }

  return next(error);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

module.exports = app;
