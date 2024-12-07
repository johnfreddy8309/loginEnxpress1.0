const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Crear la aplicación
const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Seguridad adicional con Helmet
app.use(helmet());

// Permitir solicitudes desde otros orígenes con CORS
app.use(cors());

// Logger de solicitudes
app.use(morgan('dev'));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error no controlado:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
