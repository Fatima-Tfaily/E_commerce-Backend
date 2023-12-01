const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const usersController = require("../controllers/UsersController");
router.get("/", usersController.getAllUsers);
router.get("/getByID/:id", usersController.getUserByID);
router.post("/addUser", usersController.addUser); //aka Register
router.post("/loginUser", usersController.loginUser);
router.put("/updateUser/:id",  isAuthenticated,usersController.updateUser);
router.put("/switchToAdmin/:id",  usersController.switchToAdmin);
router.delete("/deleteUser/:id", isAuthenticated,usersController.deleteUser);
const User = require("../models/Users"); // Import the Blog model
module.exports = router;
