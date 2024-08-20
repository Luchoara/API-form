const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const API_URL =
	"https://api.routingapi.com/rtbs.json?key=b72fb292-0f3b-4606-ac2b-ace81e6eeaa7"; // // 811 - MVA CPL  //  URL del API real

app.post("/api/proxy", (req, res) => {
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

			console.log("Incoming request:", req.body);
			console.log("Request URL being sent to external API:", url);

			res.status(response.statusCode).send(body);
		}
	);
});

module.exports = app; // Exportar la app para que Vercel la use

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running");
});
