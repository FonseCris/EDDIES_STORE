// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Importar rutas
const ordenesRouter = require("./routes/ordenes");
const productosRouter = require("./routes/products");
const usersRouter = require("./routes/users");       // ✅ Ruta para perfil de usuario
const authRoutes = require("./routes/auth.routes");  // ✅ Ruta para login y registro

const app = express();
const PORT = process.env.PORT || 5001;

// Verificar que MONGO_URI exista
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI no está definido en el archivo .env");
  process.exit(1); // Detener la aplicación
}

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (por ejemplo imágenes de productos)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// Rutas API
app.use("/api/ordenes", ordenesRouter);
app.use("/api/products", productosRouter);
app.use("/api/users", usersRouter);     // 🧑 Perfil de usuario
app.use("/api/auth", authRoutes);       // 🔐 Login, registro, perfil

// Ruta raíz
app.get("/", (req, res) => {
  res.send("🚀 Bienvenido a Eddie's Store API");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
