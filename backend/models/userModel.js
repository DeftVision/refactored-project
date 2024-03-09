const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;