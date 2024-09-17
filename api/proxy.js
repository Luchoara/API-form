const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/proxy", async (req, res) => {
	const {
		caller_number,
		first_name,
		last_name,
		email,
		dob,
		address,
		city,
		state,
		caller_zip,
		traffic_source_id,
		source_url,
		original_lead_submit_date,
		trusted_form_cert_url,
	} = req.body;

	try {
		const baseURL = "https://retreaverdata.com/data_writing";
		const params = new URLSearchParams({
			key: "cfaa884a-044b-4e93-9bbb-c5a51295cb3e", // 816 Medicare CPA data_writing
			caller_number,
			first_name,
			last_name,
			email,
			dob,
			address,
			city,
			state,
			caller_zip,
			traffic_source_id,
			source_url,
			original_lead_submit_date,
			trusted_form_cert_url,
		});

		const fullURL = `${baseURL}?${params.toString()}`;
		console.log("Full URL:", fullURL);

		const response = await fetch(fullURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			res.status(200).json({ data, fullURL });
		} else {
			res.status(response.status).json({ message: "Error in API response" });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
});

module.exports = app;
