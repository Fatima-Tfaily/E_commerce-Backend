const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  checkout_id: { type: Number, required: true },
  order_date: { type: Date, required: true },
  total_amount: { type: Decimal, required: true },
  status: { type: String, required: true },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
