const evaluationModel = require("../models/evaluationModel");

exports.getAllEvaluations = async (req, res) => {
    const evaluations = await evaluationModel.find({});
    if (!evaluations) {
        return res.send({
            message: "No evaluations found",
        });
    }
    return res.send({
        evaluationCount: evaluations.length,
        evaluations,
    })
}

exports.getEvaluations = async (req, res) => {
    try {
        const location = req.query.location;
        let evaluations;
        if (location === "Head Quarters") {
            evaluations = await evaluationModel.find({})
        } else {
            evaluations = await evaluationModel.find({location: location});
        }
        if (!evaluations) {
            return res.send({
                message: "evaluations not found."
            })
        }
        if (evaluations) {
            return res.send({
                evaluations,

            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "evaluation callback error",
            error: error.message,
        })
    }
}

exports.newEvaluation = async (req, res) => {
    try {
        const {
            visitDateTime,
            evaluator,
            location,
            cashier,
            greeting,
            repeatOrder,
            upsell,
            patio,
            wait,
            foodScore,
            appearanceScore,
            serviceScore,
            image,
            identifyManager,
            comments
        } = req.body;
        if (!visitDateTime || !location || !wait || !foodScore || !appearanceScore || !serviceScore || !comments || !evaluator) {
            return res.send({
                message: "complete required fields",
            })
        }
        const evaluation = new evaluationModel({
            visitDateTime,
            evaluator,
            location,
            cashier,
            greeting,
            repeatOrder,
            upsell,
            patio,
            wait,
            foodScore,
            appearanceScore,
            serviceScore,
            image,
            identifyManager,
            comments
        })
        await evaluation.save();
        return res.send({
            message: "evaluation saved successfully",
            evaluation,
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "callback error: saving new eval",
            error,
        })
    }
}

exports.getEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const evaluation = await evaluationModel.findById(id);
        if (!evaluation) {
            return res.send({
                message: "eval not found",
            });
        }

        if (evaluation) {
            return res.send({
                evaluation,
            });
        }
    } catch (error) {
        return res.send({
            message: "evaluation callback error",
            error,
        });
    }
};

exports.updateEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            visitDateTime,
            location,
            cashier,
            greeting,
            repeatOrder,
            upsell,
            patio,
            wait,
            foodScore,
            appearanceScore,
            serviceScore,
            image,
            identifyManager,
            comments
        } = req.body;
        const evaluation = await evaluationModel.findByIdAndUpdate(id, req.body, {new: true});
        if (evaluation) {
            return res.send({
                message: "evaluation updated",
                evaluation,
            })
        }
        if (!evaluation) {
            return res.send({
                message: "evaluation not found",
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "callback error: updating evaluation",
            error,
        })
    }
}

exports.deleteEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const evaluation = await evaluationModel.findByIdAndDelete(id);
        if (!evaluation) {
            return res.send({
                message: "evaluation not found"
            })
        }
        if (evaluation) {
            return res.send({
                message: "evaluation deleted successfully",
                evaluation,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "deleting callback error",
            error,
        })
    }
}