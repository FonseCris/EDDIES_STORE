const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct
} = require('../controllers/product.controller');

// Obtener todos los productos
router.get('/', getAllProducts);

// Crear un nuevo producto
router.post('/', createProduct);

// Actualizar un producto por ID
router.put('/:id', updateProduct);

module.exports = router;
