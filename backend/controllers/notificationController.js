const notificationModel = require('../models/notificationModel');


exports.getNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.find({});
        if (!notifications) {
            return res.send({
                message: "notifications weren't found"
            })
        }
        return res.send({
            notifications
        })
    } catch (error) {
        console.log(error);
        return res.send({
            error,
        })
    }
}

exports.getNotification = async (req, res) => {
    try {
        const {id} = req.params;
        const notification = await notificationModel.findById({id});
        if (!notification) {
            return res.send({
                message: "notification not found"
            })
        }
        return res.send({
            notification
        })
    } catch (error) {
        console.log(error);
        return res.send({
            error,
        })
    }
}

exports.createNotification = async (req, res) => {
    try {
        const notifications = await notificationModel.find({});
        return res.send({
            notifications
        })
    } catch (error) {
        console.log(error);
        return res.send({
            error,
        })
    }
}

exports.updateNotification = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, type, text, read, user} = req.body;
        const notification = await notificationModel.findByIdAndUpdate(id, req.body, {new: true});
        return res.send({
            notification,
        })

    } catch (error) {
        console.log(error);
        return res.send({
            error,
        })
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const {id} = req.params;
        const notification = await notificationModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        return res.send({
            error,
        })
    }

}