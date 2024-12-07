const mysql = require('mysql');
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

// Configuración de la conexión
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'login',
    port: process.env.DB_PORT || 3306, // Agregado el puerto con valor predeterminado 3306
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = db;
