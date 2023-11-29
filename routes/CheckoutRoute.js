const express = require("express");
const router = express.Router();

const {
    getAllCheckout,
    deleteCheckout,
} = require("../controllers/CheckoutController");

router.get("/getAll", getAllCheckout);
router.delete("/delete/:ids", deleteCheckout);

module.exports = router;
