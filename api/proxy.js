const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Importación de node-fetch

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/proxy", async (req, res) => {
	const {
		publisher_id,
		caller_number,
		first_name,
		last_name,
		email,
		caller_state,
		caller_zip,
		attorney,
		incident_date,
		injured,
		trusted_form_cert_url,
	} = req.body;

	try {
		const baseURL = "https://rtb.retreaver.com/rtbs.json";
		const bodyData = {
			key: "136b19e3-3912-476a-8b5b-9a8de3fee354",
			publisher_id,
			caller_number,
			first_name,
			last_name,
			email,
			caller_state,
			caller_zip,
			attorney,
			incident_date,
			injured,
			trusted_form_cert_url,
		};

		const response = await fetch(baseURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		});

		if (response.ok) {
			const data = await response.json();
			res.status(200).json({ data });
		} else {
			const errorText = await response.text();
			console.error("Error in API response:", errorText);
			res.status(response.status).json({ message: "Error in API response", error: errorText });
		}
	} catch (error) {
		console.error("Internal server error:", error.message);
		res.status(500).json({ message: "Internal server error", error: error.message });
	}
});

module.exports = app;
