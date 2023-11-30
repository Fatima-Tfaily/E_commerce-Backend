const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getAllOrdersByUserId,
  deleteOrder,
  addOrders,
} = require("../controllers/OrdersController");

router.get("/getAll", getAllOrders);
router.get("/getByUserId/:id", getAllOrdersByUserId);
router.post("/add", addOrders);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
