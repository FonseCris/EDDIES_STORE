const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/perfil/:id", authController.obtenerPerfil);
router.put("/perfil/:id", authController.actualizarPerfil);

module.exports = router;
