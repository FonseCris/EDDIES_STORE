const express = require('express');
const router = express.Router();

// Importar el controlador completo
const productController = require('../controllers/product.controller');

// Rutas definidas usando el controlador directamente
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;
