require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Using port: ${port}`);
})
