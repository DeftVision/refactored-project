const mongoose = require("mongoose");
const schema = mongoose.Schema;

const validateSchema = new schema({
    username: {
        type: String,
        required: true,
    },
    slider: {
        type: Number,
    },
    startDate: {
        type: String,
        required: true,
    },
    funFact: {
        type: String,
        required: true,
    },
})

const validateModel = mongoose.model("Validate", validateSchema);
module.exports = validateModel;