const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  user_id: { type: Object, required: true },
  products_id: { type: Object, required: true },
  product_image: { type: String, maxlength: 255 },
  quantity_to_purchase: { type: Number, required: true },
  price: { type: Number, required: true },
  product_name: { type: String, required: true },
});

const Carts = mongoose.model("Carts", cartsSchema);

module.exports = Carts;
