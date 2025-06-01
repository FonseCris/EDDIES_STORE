const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct
} = require('../controllers/product.controller');

// ✅ GET - Obtener todos los productos
router.get('/', getAllProducts);

// ✅ POST - Crear un nuevo producto
router.post('/', createProduct);

// ✅ PUT - Actualizar un producto por ID
router.put('/:id', updateProduct);

module.exports = router;
