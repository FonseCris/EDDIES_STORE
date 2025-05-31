const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  categoria: { type: String }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
