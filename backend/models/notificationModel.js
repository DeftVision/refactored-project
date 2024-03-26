const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notificationSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: false,
    },
    user: {
        type: String,
        required: true,
    },
}, {timestamps: true})


const notificationModel = mongoose.model("Notification", notificationSchema);
module.exports = notificationModel;