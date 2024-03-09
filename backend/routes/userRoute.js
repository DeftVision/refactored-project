const express = require("express");
const router = express.Router();

const {getUsers, loginUser, registerUser, getUser, deleteUser, updateUser} = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/update/:id", updateUser)
router.get("/user/:id", getUser);
router.delete("/delete/:id", deleteUser)

module.exports = router;