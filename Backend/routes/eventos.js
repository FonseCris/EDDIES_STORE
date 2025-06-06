const express = require("express");
const router = express.Router();
const Evento = require("../models/Evento");
const auth = require("../middleware/auth");

// Obtener eventos del usuario autenticado
router.get("/", auth, async (req, res) => {
  try {
    const eventos = await Evento.find({ usuario: req.user.id }).sort({ fecha: 1 });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener eventos" });
  }
});

// Crear un nuevo evento
router.post("/", auth, async (req, res) => {
  const { fecha, nombre } = req.body;
  if (!fecha || !nombre) {
    return res.status(400).json({ mensaje: "Faltan campos requeridos" });
  }

  try {
    const nuevoEvento = new Evento({
      usuario: req.user.id,
      fecha,
      nombre
    });
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar evento" });
  }
});

// Eliminar un evento
router.delete("/:id", auth, async (req, res) => {
  try {
    const evento = await Evento.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.id
    });

    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }

    res.json({ mensaje: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar evento" });
  }
});

module.exports = router;
