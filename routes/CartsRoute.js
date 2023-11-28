const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  addCarts,
  deleteCart,
} = require("../controllers/CartsController");

router.get("/getAll", getAllCarts);
router.post("/add", addCarts);
router.delete("/delete/:ids", deleteCart);

module.exports = router;
