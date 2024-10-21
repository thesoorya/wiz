const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./lib/db");
const authRoute = require('./routes/authRoute')
const PORT = process.env.PORT || 5000;

// db connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// api endpoints
app.use('/api/auth', authRoute)

// server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
