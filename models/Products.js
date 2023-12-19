const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productsSchema = new mongoose.Schema({
  category_id: {
    type: Number,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  product_image: {
    type: String,
    maxlength: 255,
  },
  product_image2: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
  },
  processor: {
    type: String,
  },
  display: {
    type: String,
  },
  modelnumber: {
    type: String,
  },
  ram: { type: String },

  battery: { String },

  memory: { String },

  camera: { String },
  categoryName: { String },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
