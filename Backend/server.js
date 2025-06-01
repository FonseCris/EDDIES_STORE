const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ordenesRouter = require("./routes/ordenes"); // Asegúrate que exista en /routes/ordenes.js

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/eddies_store")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err))
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/ordenes", ordenesRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a Eddie's Store API");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
