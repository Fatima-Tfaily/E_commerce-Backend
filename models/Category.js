// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema({
//   categoryName: {
//     type: String,
//     required: true,
//   },
//   categoryImage: {
//     type: String,
//     required: true,
//   },
// });
// const Category = mongoose.model("Category", categorySchema);
// module.exports = Category;
// //done with this part, no modifications should be done here



// categoryModel.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  category_image: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
