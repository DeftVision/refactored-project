const express = require("express");
const router = express.Router();

const {newValidationForm, getValidationForm} = require("../controllers/validationController");

router.post("/validation", newValidationForm)
router.get("/validates", getValidationForm);


module.exports = router;