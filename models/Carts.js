const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  cart_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  products_id: { type: Number, required: true },
  quantity_to_purchase: { type: Number, required: true },
});

const Carts = mongoose.model("Carts", cartsSchema);

module.exports = Carts;
