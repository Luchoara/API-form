const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
	"http://localhost:3000", // Desarrollo local
	"https://api-test-form-one.vercel.app/", // Dominio en Vercel
];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	})
);

app.use(express.json());
