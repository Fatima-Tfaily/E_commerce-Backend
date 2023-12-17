const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const categoryController = require("../controllers/CategoryController");
router.get("/", categoryController.getAllCategories);
router.get("/getByID/:id", categoryController.getCategoryByID);
router.post(
  "/addCategory",
  upload.single("image"),
  categoryController.addCategory
);
router.put("/updateCategory/:id", categoryController.updateCategory);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);
module.exports = router;
