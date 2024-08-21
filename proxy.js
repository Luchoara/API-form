const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

const API_URL = "http://localhost:4000/receive-data"; // API local

app.post("/proxy", (req, res) => {
    const data = req.body;
    const params = new URLSearchParams(data).toString();
    const url = `${API_URL}?${params}`;

    console.log("URL de solicitud a la API externa:", url);

    request.post(
        {
            url: url,
            json: true,
            body: data,
        },
        (error, response, body) => {
            if (error) {
                console.error("Error al enviar datos a la API externa:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error al enviar datos a la API externa",
                    error,
                });
            }

            console.log("Respuesta de la API externa:", body);

            res.status(response.statusCode).json({
                success: response.statusCode === 200 || response.statusCode === 201,
                message: response.statusCode === 200 || response.statusCode === 201 ? "Datos enviados correctamente" : `Error en la API externa. Código de estado: ${response.statusCode}`,
                data: body,
            });
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
