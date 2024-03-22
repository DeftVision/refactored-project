const evaluationModel = require("../models/evaluationModel");
const userModel = require("../models/userModel");


exports.getEvaluations = async (req, res) => {
    try {
        const evaluations = await evaluationModel.find({});
        if (!evaluations) {
            return res.send({
                message: "evaluations not found."
            })
        }
        if (evaluations) {
            return res.send({
                evaluationCount: evaluations.length,
                evaluations,
            })
        }

    } catch (error) {
        console.log(error);
        return res.send({
            message: "evaluation callback error.",
            error,
        })
    }
}

exports.getQueryEvaluations = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.send({
                message: "user not found"
            })
        }
        if (user) {
            return res.send({
                user,
            })
        }
        const evaluations = await evaluationModel.find({location: user.location});
        if (!evaluations) {
            return res.send({
                message: "evaluations not found."
            })
        }
        if (evaluations) {
            return res.send({
                evaluationCount: evaluations.length,
                evaluations,
            })
        }

    } catch (error) {
        console.log(error);
        return res.send({
            message: "evaluation callback error.",
            error,
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
            cleanScore,
            serviceScore,
            image,
            identifyManager,
            comments
        } = req.body;
        if (!visitDateTime || !location || !wait || !foodScore || !cleanScore || !serviceScore || !comments) {
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
            cleanScore,
            serviceScore,
            image,
            identifyManager,
            comments
        })
        await evaluation.save();
        return res.send({
            message: "evaluation submitted successfully.",
            evaluation,
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "submitting callback error.",
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
                message: "evaluation not found.",
            });
        }

        if (evaluation) {
            return res.send({
                evaluation,
            });
        }
    } catch (error) {
        return res.send({
            message: "evaluation callback error.",
            error,
        });
    }
};

exports.updateEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
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
            cleanScore,
            serviceScore,
            image,
            identifyManager,
            comments
        } = req.body;
        const evaluation = await evaluationModel.findByIdAndUpdate(id, req.body, {new: true});
        if (evaluation) {
            return res.send({
                message: "evaluation updated successfully.",
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
            message: "updating callback error.",
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
                message: "evaluation deleted successfully.",
                evaluation,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "deleting callback error.",
            error,
        })
    }
}