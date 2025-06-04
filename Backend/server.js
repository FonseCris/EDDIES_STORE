require('dotenv').config(); // 👈 Importar dotenv

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const ordenesRouter = require("./routes/ordenes");
const productosRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Conectar a MongoDB (usando URI de .env)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/ordenes", ordenesRouter);
app.use("/api/products", productosRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a Eddie's Store API");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
