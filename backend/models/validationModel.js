const mongoose = require("mongoose");
const schema = mongoose.Schema;

const validateSchema = new schema({
    firstName: {
        type: String,
        required: true,
    },
    slider: {
        type: Number,
        required: true,
    },
    selectField: {
        type: String,
        required: true,
    },
    funFact: {
        type: String,
        required: false,
    },
})

const validateModel = mongoose.model("Validate", validateSchema);
module.exports = validateModel;