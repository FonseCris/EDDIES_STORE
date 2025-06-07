const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Asegúrate de que este sea el nombre correcto del modelo

const router = express.Router();

// Middleware para verificar token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido');
  }
}

// GET: Obtener perfil del usuario autenticado
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error al obtener perfil");
  }
});

// PUT: Actualizar perfil del usuario autenticado
router.put("/me", verifyToken, async (req, res) => {
  try {
    const { name, email, direccion, cumpleaños } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (direccion) updateFields.direccion = direccion;
    if (cumpleaños) updateFields.cumpleaños = cumpleaños;

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateFields, { new: true });
    res.status(200).json({ message: 'Perfil actualizado', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
});

module.exports = router;
