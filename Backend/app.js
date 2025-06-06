// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Conectado a MongoDB'))
.catch(err => console.error('🔴 Error al conectar a MongoDB:', err));

// Rutas
const ordenesRoutes = require('./routes/ordenes');
app.use('/api/ordenes', ordenesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡El backend de EDDIE’S STORE está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en puerto ${port}`);
});
