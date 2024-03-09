const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        if(!users) {
            return res.send({
                message: "no users were found."
            })
        }
        return res.send({
            userCount: users.length,
            users,
        })

    } catch (error){
        console.log(error);
        return res.send({
            message: "getting all users callback error.",
            error,
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.send({
                message: "both fields are required.",
            })
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.send({
                message: "user is not registered.",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({
                message: "credentials entered are invalid.",
            })
        }
        return res.send({
            message: `${user.email} is logged in.`,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.send({
            message: "logging in a user callback error.",
            error,
        })
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, location } = req.body;
        if(!firstName || !lastName || !email || !password || !role || !location) {
            return res.send({
                message: "all fields are required.",
            })
        }


        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.send({
                message: "user is already registered.",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new userModel({firstName, lastName, role, location, email, password: hashedPassword})
        await user.save();
        return res.send({
            message: "user was registered successfully.",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.send({
            message: "registering a user callback error.",
            error,
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.send({
                message: "user was not found.",
            });
        }

        if (user) {
            return res.send({
                user,
            });
        }
    } catch (error) {
        return res.send({
            message: "getting a user callback error.",
            error,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if(user) {
            return res.send({
                message: "user was deleted successfully.",
                user,
            })
        }
    } catch (error) {
        console.log(error);
        return res.send({
            message: "deleting a user callback error.",
            error,
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const  { firstName, lastName, role, location, email, password} = req.body;
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.send({
            message: "User was updated successfully.",
            user,
        })
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "updating a user callback error.",
            error,
        })
    }
}
