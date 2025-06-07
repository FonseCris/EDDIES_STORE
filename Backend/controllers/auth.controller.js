const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTRO
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, direccion, cumpleaños } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      nombre,
      email,
      password: hashedPassword,
      direccion,
      cumpleaños,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el registro" });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Correo no registrado" });
    }

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};

// ✅ OBTENER PERFIL
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select("-password");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

// ✅ ACTUALIZAR PERFIL
exports.actualizarPerfil = async (req, res) => {
  try {
    const camposActualizados = {
      nombre: req.body.nombre,
      email: req.body.email,
      direccion: req.body.direccion,
      cumpleaños: req.body.cumpleaños,
    };

    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      camposActualizados,
      { new: true }
    ).select("-password");

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({
      mensaje: "Perfil actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
};
