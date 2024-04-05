const validateModel = require("../models/validationModel");

exports.newValidationForm = async (req, res) => {
    try {
        const {firstName, selectField, slider, funFact, file} = req.body;
        if (!firstName || !selectField || !slider || !file) {
            return res.send({
                message: "oops something went wrong."
            })
        }
        const validationField = new validateModel({firstName, selectField, slider, funFact, file});
        await validationField.save();
        return res.send({
            message: `success`,
            validationField,
        })

    } catch (error) {
        console.log(error);
        return res.send({
            message: "validate callback error",
            error,
        })
    }
}

exports.getValidationForm = async (req, res) => {
    try {
        const validates = await validateModel.find({firstName});
        if (!validates) {
            return res.send({
                message: "no validation found"
            })
        }
        if (validates) {
            return res.send({
                formCount: validates.length,
                validates,
            })
        }

    } catch (error) {
        console.log(error);
        return res.send({
            message: "validate callback error",
            error,
        })
    }
}