const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductByCategoryID,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  addProduct,
  getProductsByCategoryID,
  getProductsByCategoryid,
  getProductsByCategoryName,
} = require("../controllers/ProductsController");

router.post("/products", upload.single("image"), addProduct);
router.get("/getAll", getAllProducts);
router.get("/products/:productId", getProductByID);
router.get("/products/category/:category_id", getProductByCategoryID);
router.get("/products/categoryid/:category_id", getProductsByCategoryid);
router.get("/product/categoryName/:categoryName", getProductsByCategoryName);
router.put("/products/update/:ID", updateProductByID);
router.delete("/products/delete/:ID", deleteProductByID);

module.exports = router;
