require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/userRoute");
const evaluationRoute = require("./routes/evaluationRoute");

const port = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/eval", evaluationRoute);

app.listen(port, () => {
    console.log(`Using port: ${port}`);
})
