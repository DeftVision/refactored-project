const express = require("express");
const router = express.Router();

const { deleteDocument, getDocument, updateDocument, getDocuments, newDocument } = require("../controllers/documentController")


router.get("/documents", getDocuments)
router.get("/document/:id", getDocument)
router.post("/newDocument", newDocument)
router.patch("/update/:id", updateDocument)
router.delete("/delete/:id", deleteDocument)


module.exports = router;