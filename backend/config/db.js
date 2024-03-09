const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");

    } catch {
        console.log("database connection failed.");
    }
}

module.exports = connectDB;