// ESTE PROXY ES EL QUE SIRVE Y TIENE EL INDEX.JS INCORPODADO

const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// "https://api.routingapi.com/rtbs.json?key=a358613a-141b-4371-95e8-bfa73133db5b "; // 812 MVA_CPL

// "https://api.routingapi.com/rtbs.json?key=ab514634-6955-4f94-9e22-5de033366d2f"; // 803 Medicare

const API_URL =
	"https://api.routingapi.com/rtbs.json?key=a358613a-141b-4371-95e8-bfa73133db5b "; // 812 MVA_CPL
		

// Ruta para manejar solicitudes POST a través del proxy
app.post("/proxy", (req, res) => {
	const {
		publisher_id,
		caller_number,
		first_name,
		last_name,
		trusted_form_cert_url,
		needs_attorney,
		person_at_fault,
		incident_date,
		injury_occurred,
		injury_type,
		accident_description,
		have_attorney,
		incident_timeframe,
		zip,
		hospitalized_or_treated,
		email,
	} = req.body;

	const url = `${API_URL}&publisher_id=${publisher_id}&caller_number=${caller_number}&first_name=${first_name}&last_name=${last_name}&trusted_form_cert_url=${trusted_form_cert_url}&needs_attorney=${needs_attorney}&person_at_fault=${person_at_fault}&incident_date=${incident_date}&injury_occurred=${injury_occurred}&injury_type=${injury_type}&accident_description=${accident_description}&have_attorney=${have_attorney}&incident_timeframe=${incident_timeframe}&hospitalized_or_treated=${hospitalized_or_treated}&zip=${zip}&email=${email}`;

	console.log("URL de solicitud a la API externa:", url);
	console.log("Datos enviados a la API externa:", req.body);

	request.post(
		{
			url: url,
			json: true,
			body: req.body,
		},
		(error, response, body) => {
			if (error) {
				console.error("Error al enviar datos a la API externa:", error);
				return res
					.status(500)
					.json({
						success: false,
						message: "Error al enviar datos a la API externa",
						error,
					});
			}

			console.log("Respuesta de la API externa:", body);
			console.log("Código de estado de la API externa:", response.statusCode);

			if (response.statusCode === 200 || response.statusCode === 201) {
				res
					.status(response.statusCode)
					.json({
						success: true,
						message: "Datos enviados correctamente",
						data: body,
					});
			} else {
				res
					.status(response.statusCode)
					.json({
						success: false,
						message: `Error en la API externa. Código de estado: ${response.statusCode}`,
						data: body,
					});
			}
		}
	);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Proxy server running on http://localhost:${PORT}`);
});
