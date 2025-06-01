const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  imagen: String
});

const ordenSchema = new mongoose.Schema({
  productos: [productoSchema],
  total: Number,
  fecha: { type: Date, default: Date.now },
  cliente: {
    nombre: String,
    email: String
  }
});

module.exports = mongoose.model("Orden", ordenSchema);
