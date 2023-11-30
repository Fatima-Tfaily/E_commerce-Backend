const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
  checkout_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  products_id: { type: Number, required: true },
  quantity_to_purchase: { type: Number, required: true },
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

module.exports = Checkout;