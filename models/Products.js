const mongoose = require ('mongoose');
const {Schema,model}= mongoose;

const productsSchema = new mongoose.Schema({
    category_id: {
      type: Number,
      required: true,
      unique:true,
    },
    product_name: {
      type: String,
      required: true,
      maxlength: 100,
      unique:true,

    },
    product_image: {
      type: String,
      maxlength: 255,
      unique:true,
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
  });
  
  const Product = mongoose.model('Product', productsSchema);
  
  module.exports = Product;