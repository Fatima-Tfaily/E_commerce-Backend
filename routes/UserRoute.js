const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const usersController = require("../controllers/usersController");
router.get("/", usersController.getAllUsers);
router.get("/getByID/:id", usersController.getUserByID);
router.get("/getSellers", usersController.getSellers);
router.get("/getAdmin", usersController.getAdmins);
router.get("/getAdminById/:id", usersController.getAdminByID);
router.post("/addUser", usersController.addUser); //aka Register
router.post("/loginUser", usersController.loginUser);
router.post("/AddSeller", usersController.addSeller);
router.put("/updateUser/:id", usersController.updateUser);
router.put("/switchToAdmin/:id", usersController.switchToAdmin);
router.delete("/deleteUser/:id", usersController.deleteUser);
const User = require("../models/users"); // Import the Blog model
module.exports = router;