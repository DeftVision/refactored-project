const express = require("express");
const router = express.Router();

const {
    newAnnouncement,
    getAnnouncements,
    getAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} = require("../controllers/announcementController");

router.get("/announcements", getAnnouncements);

router.get("/announcement/:id", getAnnouncement);

router.post("/newAnnouncement", newAnnouncement);

router.patch("/update/:id", updateAnnouncement);

router.delete("/delete/:id", deleteAnnouncement);

module.exports = router;