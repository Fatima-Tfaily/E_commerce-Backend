const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  addCarts,
  deleteCart,
  deleteCartsByUserId,
  getCartsById,
} = require("../controllers/CartsController");

router.get("/getAll", getAllCarts);
router.get("/get/:id", getCartsById);
router.post("/add", addCarts);
router.delete("/delete/:id", deleteCart);
router.delete("/deleteByUserId/:id", deleteCart);

module.exports = router;
