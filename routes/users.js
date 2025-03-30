const express = require('express');
const router = express.Router();
const connection = require('../config/db'); 

// Ruta para registrar usuario
router.post("/register", async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const query = "INSERT INTO Usuarios (nombre, correo, contrasena, fecha_registro) VALUES (?, ?, ?, NOW())";
        
        connection.query(query, [nombre, correo, contrasena], (error, results) => {
            if (error) {
                console.error("Error al registrar usuario:", error);
                return res.status(500).json({ message: "Error del servidor" });
            }

            res.status(201).json({ message: "Usuario registrado correctamente", userId: results.insertId });
        });

    } catch (error) {
        console.error("Error inesperado:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        console.log("Datos recibidos en login:", { correo, contrasena });

        if (!correo || !contrasena) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const query = "SELECT * FROM Usuarios WHERE correo = ?";
        
        connection.query(query, [correo], (error, results) => {
            if (error) {
                console.error("Error al buscar usuario:", error);
                return res.status(500).json({ message: "Error del servidor" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Usuario no encontrado" });
            }

            const user = results[0];

            if (user.contrasena !== contrasena) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            res.status(200).json({ message: "Login exitoso", userId: user.id });
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});



module.exports = router;

