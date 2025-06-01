const express = require("express");
const router = express.Router();
const Orden = require("../models/orden");

// Crear una nueva orden
router.post("/", async (req, res) => {
  try {
    const { productos, total, cliente } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío o es inválido." });
    }

    if (!cliente || !cliente.nombre || !cliente.email) {
      return res.status(400).json({ error: "Información del cliente incompleta." });
    }

    const nuevaOrden = new Orden({ productos, total, cliente });
    const ordenGuardada = await nuevaOrden.save();

    res.status(201).json({ mensaje: "Orden guardada con éxito.", orden: ordenGuardada });
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Actualizar el estado de una orden
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const ordenActualizada = await Orden.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!ordenActualizada) {
      return res.status(404).json({ mensaje: "Orden no encontrada" });
    }

    res.json({ mensaje: "Estado actualizado con éxito", orden: ordenActualizada });
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    res.status(500).json({ error: "Error interno al actualizar la orden" });
  }
});

module.exports = router;
