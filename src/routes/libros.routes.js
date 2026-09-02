const express = require("express");
const {
  crearLibro,
  obtenerLibros
} = require("../controllers/libros.controller");

const router = express.Router();

router.post("/libros", crearLibro);
router.get("/libros", obtenerLibros);

module.exports = router;
