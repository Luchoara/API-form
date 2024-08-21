const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Ruta para manejar solicitudes POST
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log('Datos recibidos:', receivedData);
    res.json({ message: 'Solicitud recibida correctamente!', data: receivedData });
});

