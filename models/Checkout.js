const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  products_id: { type: Object, required: true },
  quantity_to_purchase: { type: Number, required: true },
  price: { type: Number, required: true },
  product_name: { type: String, required: true },
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

module.exports = Checkout;
