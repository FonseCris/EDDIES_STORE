const Product = require('../models/product.model');

// ✅ Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// ✅ Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el producto', error: err.message });
  }
};

// ✅ Actualizar un producto por ID
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el producto' });
  }
};
