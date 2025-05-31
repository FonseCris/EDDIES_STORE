const Product = require('../models/product.model');

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