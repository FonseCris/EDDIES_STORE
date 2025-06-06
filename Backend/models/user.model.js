const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  direccion: { type: String },
  cumpleaños: { type: Date },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
