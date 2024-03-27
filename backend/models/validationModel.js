const mongoose = require("mongoose");
const schema = mongoose.Schema;

const validateSchema = new schema({
    firstName: {
        type: String,
        required: false,
    },
    slider: {
        type: Number,
        required: false,
    },
    selectField: {
        type: String,
        required: false,
    },
    funFact: {
        type: String,
        required: false,
    },
})

const validateModel = mongoose.model("Validate", validateSchema);
module.exports = validateModel;