const mongoose = require("mongoose");
const schema = mongoose.Schema;

const announcementSchema = new schema({
    audience: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: true,
    },
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        require: true,
    },
    display: {
        type: Boolean,
    },
    priority: {
        type: String,
        require: true,
    },
}, {timestamps: true})


const announcementModel = mongoose.model("Announcement", announcementSchema);
module.exports = announcementModel;