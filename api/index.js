const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const API_URL =
	"https://api.routingapi.com/rtbs.json?key=ab514634-6955-4f94-9e22-5de033366d2f"; // URL del API real

app.post("/api/proxy", (req, res) => {
	const { publisher_id, caller_number } = req.body;

	const url = `${API_URL}&publisher_id=${publisher_id}&caller_number=${caller_number}`;

	console.log("Incoming request:", req.body);
	console.log("Request URL being sent to external API:", url);

	request.post(
		{
			url: url,
			json: true,
			body: req.body,
		},
		(error, response, body) => {
			if (error) {
				console.error("Error sending request to external API:", error);
				return res.status(500).send({ error: "Internal server error" });
			}

			if (response.statusCode !== 200) {
				console.error(
					`Unexpected response status from external API: ${response.statusCode}`
				);
				return res.status(response.statusCode).send(body);
			}

			console.log("Response from external API:", body);
			res.status(200).send(body);
		}
	);
});

module.exports = app;

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running");
});
