const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const Port = process.env.PORT;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database
const db = require("./db");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(Port, () => {
  console.log("listen on port: ", Port);
});