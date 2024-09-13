const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/proxy', async (req, res) => {
  const { publisher_id,
    caller_number,
    first_name,
    last_name,
    email,
    state,
    caller_zip,
    trusted_form_cert_url,
  } = req.body;

  try {
    const baseURL = "https://api.routingapi.com/rtbs.json";
    const params = new URLSearchParams({
      key: "8ed5caf5-14cd-4dbc-9f8c-2fd3927f05da",
      publisher_id,
      caller_number,
      first_name,
      last_name,
      email,
      state,
      caller_zip,
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
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = app;
