const express = require("express");
const router = express.Router();

const {
  getAllCheckout,
  deleteCheckout,
  addCheckout,
} = require("../controllers/CheckoutController");

router.get("/getAll", getAllCheckout);
router.delete("/delete/:id", deleteCheckout);
router.post("/addCheckout", addCheckout);

module.exports = router;
