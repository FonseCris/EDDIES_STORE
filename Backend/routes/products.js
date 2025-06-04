const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/product
router.post('/', upload.single('imagen'), (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  const imagenPath = `images/${req.file.filename}`;

  const nuevoProducto = {
    _id: Date.now().toString(), // Generación simple de ID
    nombre,
    precio: Number(precio),
    descripcion,
    imagen: imagenPath
  };

  // Aquí puedes guardar a MongoDB, por ahora lo devolvemos directamente
  res.json(nuevoProducto);
});

module.exports = router;

