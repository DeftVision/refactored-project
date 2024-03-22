const validateModel = require("../models/validationModel");

exports.newValidate = async (req, res) => {
    try {
        const { username, startDate, slider, funFact } = req.body;
        if(!username || !startDate || !funFact) {
            return res.send({
                message: "required fields were missed."
            })
        }
        const validate = new validateModel({username, startDate, slider, funFact});
        await validate.save();
        return res.send({
            validate,
        })

    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "validate callback error",
            error,
        })
    }
}

exports.getValidates = async (req, res) => {
    try {
        const validates = await validateModel.find({});
        if(!validates) {
            return res.send({
                message: "no validation forms found"
            })
        }
        if(validates) {
            return res.send({
                formCount: validates.length,
                validates,
            })
        }

    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "validate callback error",
            error,
        })
    }
}