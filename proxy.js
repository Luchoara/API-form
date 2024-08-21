// ESTE PROXY ES EL QUE SIRVE Y TIENE EL INDEX.JS INCORPODADO

const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

const API_URL = 'https://api.routingapi.com/rtbs.json?key=a358613a-141b-4371-95e8-bfa73133db5b'; // 812 MVA

// Ruta para manejar solicitudes POST a través del proxy
app.post('/proxy', (req, res) => {
    const { publisher_id, caller_number } = req.body;
    
    const url = `${API_URL}&publisher_id=${publisher_id}&caller_number=${caller_number}`;
    
    request.post(
        {
            url: url,
            json: true,
            body: req.body,
        },
        (error, response, body) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.status(response.statusCode).send(body);
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
