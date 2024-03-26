const express = require("express");
const router = express.Router();

const {
    getNotifications,
    createNotification,
    getNotification,
    updateNotification,
    deleteNotification
} = require("../controllers/notificationController")

router.get("/notifications", getNotifications);
router.get("/notification/:id", getNotification);
router.post("/newNotification", createNotification);

router.patch("/update/:id", updateNotification);
router.delete("/delete/:id", deleteNotification);

module.exports = router;