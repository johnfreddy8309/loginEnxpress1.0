const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const util = require('util');

const router = express.Router();

// Convertir db.query a promesa
const query = util.promisify(db.query).bind(db);

// Ruta para registrar usuario
router.post('/registrar', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        const userExists = await query('SELECT * FROM tb_usuarios WHERE usuario = ?', [usuario]);
        if (userExists.length > 0) {
            return res.status(409).json({ success: false, message: 'El usuario ya está registrado' });
        }

        // Encriptar la contrasena
        const hash = await bcrypt.hash(contrasena, 10);

        // Insertar el usuario en la base de datos
        await query('INSERT INTO tb_usuarios (usuario, contrasena) VALUES (?, ?)', [usuario, hash]);
        return res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
    } catch (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario existe
        const results = await query('SELECT * FROM tb_usuarios WHERE usuario = ?', [usuario]);
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Comparar contrasena
        const validPassword = await bcrypt.compare(contrasena, user.contrasena);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        return res.status(200).json({ success: true, message: 'Autenticación satisfactoria' });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

module.exports = router;
