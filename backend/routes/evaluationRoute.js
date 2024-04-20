const express = require("express");
const router = express.Router();

const {
    getAllEvaluations,
    getEvaluations,
    newEvaluation,
    getEvaluation,
    deleteEvaluation,
    updateEvaluation,
} = require("../controllers/evaluationController");

router.get("/allEvaluations", getAllEvaluations);
router.get("/evaluations", getEvaluations);
router.get("/evaluation/:id", getEvaluation);
router.post("/newEvaluation", newEvaluation);
router.patch("/update/:id", updateEvaluation);
router.delete("/delete/:id", deleteEvaluation);


module.exports = router;

