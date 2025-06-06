const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema({
  productos: [
    {
      nombre: String,
      cantidad: Number,
      precio: Number
    }
  ],
  total: Number,
  cliente: {
    nombre: String,
    email: String
  },
  estado: {
    type: String,
    default: "pendiente"
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Orden", OrdenSchema);
