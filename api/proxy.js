const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/proxy", async (req, res) => {
	const { publisher_id, caller_number, First_Name, Last_Name, Email, caller_zip, Project } =
		req.body;
			
		try {
		const baseURL = "https://rtb.retreaver.com/rtbs.json";
		const params = new URLSearchParams({
			key: "1856f0b6-ec9d-4197-980b-9fa017486bd5", // Publisher_test data_writing
			publisher_id,
			caller_number,
			First_Name,
			Last_Name,
			Email,
			caller_zip,
			Project,
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
