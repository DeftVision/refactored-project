const express = require("express");
const router = express.Router();

const { newValidate, getValidates } = require("../controllers/validationController");

router.post("/validation", newValidate)
router.get("/validates", getValidates);


module.exports = router;