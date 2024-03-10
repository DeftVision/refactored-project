const express = require("express");
const router = express.Router();

const {getUsers, loginUser, newUser, getUser, deleteUser, updateUser} = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/login", loginUser);
router.post("/newuser", newUser);
router.patch("/update/:id", updateUser)
router.get("/user/:id", getUser);
router.delete("/delete/:id", deleteUser)

module.exports = router;