const evaluationModel = require("../models/evaluationModel");
const userModel = require("../models/userModel");


exports.getEvaluations = async (req, res) => {
    try {
        const evaluations = await evaluationModel.find({});
        if(!evaluations) {
            return res.send({
                message: "no evaluations were found."
            })
        }
        if(evaluations) {
            return res.send({
                evaluationCount: evaluations.length,
                evaluations,
            })
        }

    } catch (error){
        console.log(error);
        return res.send({
            message: "getting an evaluation callback error.",
            error,
        })
    }
}

exports.getQueryEvaluations = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        if(!user) {
            return res.send({
                message: "User not found"
            })
        }
        if(user) {
            return res.send({
                user,
            })
        }
        const evaluations = await evaluationModel.find({location: user.location});
        if(!evaluations) {
            return res.send({
                message: "No evaluations were found."
            })
        }
        if(evaluations) {
            return res.send({
                evaluationCount: evaluations.length,
                evaluations,
            })
        }

    } catch (error){
        console.log(error);
        return res.send({
            message: "getting an evaluation callback error.",
            error,
        })
    }
}

exports.newEvaluation = async (req, res) => {
    try {
        const { visitDateTime, evaluator, location, cashier, greeting, repeatOrder, upsell, patio, wait, foodScore, cleanScore, serviceScore, image, identifyManager, comments } = req.body;
        if(!visitDateTime || !location || !wait || !foodScore || !cleanScore || !serviceScore || !comments) {
            return res.send({
                message: "All fields are required.",
            })
        }
        const evaluation = new evaluationModel({visitDateTime, evaluator, location, cashier, greeting, repeatOrder, upsell, patio, wait, foodScore, cleanScore, serviceScore, image, identifyManager, comments })
        await evaluation.save();
        return res.send({
            message: "Evaluation submitted successfully.",
            evaluation,
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "submitting a new evaluation callback error.",
            error,
        })
    }
}

exports.getEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const evaluation = await evaluationModel.findById(id);
        if (!evaluation) {
            return res.send({
                message: "an evaluation was not found.",
            });
        }

        if (evaluation) {
            return res.send({
                evaluation,
            });
        }
    } catch (error) {
        return res.send({
            message: "searching for an evaluation callback error.",
            error,
        });
    }
};

exports.updateEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const {visitDateTime, evaluator, location, cashier, greeting, repeatOrder, upsell, patio, wait, foodScore, cleanScore, serviceScore, image, identifyManager, comments} = req.body;
        const evaluation = await evaluationModel.findByIdAndUpdate(id, req.body, {new: true});
        if(evaluation) {
            return res.send({
                message: "an evaluation was updated successfully.",
                evaluation,
            })
        }
        if(!evaluation) {
            return res.send({
                message: "Evaluation not found",
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "updating an evaluation callback error.",
            error,
        })
    }
}


exports.deleteEvaluation = async (req, res) => {
    try {
        const {id} = req.params;
        const evaluation = await evaluationModel.findByIdAndDelete(id);
        if(!evaluation) {
            return res.send({
                message: "Evaluation not found"
            })
        }
        if(evaluation) {
            return res.send({
                message: "an evaluation was deleted successfully.",
                evaluation,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "deleting an evaluation callback error.",
            error,
        })
    }
}