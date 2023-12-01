const db = require("../config/db");
const {imageUploader} = require("../extra/imageUploader");
const Category = require("../models/Category");
//  Add a new Category
// const addCategory = async (req, res) => {
//   try {
//     // if (!req.file) {
//     //   return res.status(400).json({ msg: "No file uploaded" });
//     // }
//     // const imageUrl = await imageUploader(req.file);
//     // if (!imageUrl) {
//     //   return res.status(500).json({ msg: "Error uploading the image" });
//     // }
//     const newCategory = new Category({
//       categoryName: req.body.categoryName,
//       imageUrl: req.body.categoryImage, // Use the imageUrl variable
//     });
//     await newCategory.save();
//     res.json(newCategory);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
// Add a new Category
// const addCategory = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     const imageUrl = await imageUploader(req);

//     if (!imageUrl) {
//       return res.status(500).json({ msg: 'Error uploading the image' });
//     }

//     const newCategory = new Category({
//       categoryName: req.body.categoryName,
//       imageUrl: imageUrl, // Use the imageUrl variable
//     });

//     await newCategory.save();
//     res.json(newCategory);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const users = await Category.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get a Category by ID
const getCategoryByID = async (req, res) => {
try {
const foundCategory = await Category.findById(req.params.id);

if (!foundCategory) {
return res.status(404).json({ msg: "Category not found" });
}
res.json(foundCategory);
} catch (err) {
console.error(err.message);
if (err.kind === "ObjectId") {
return res.status(404).json({ msg: "Category not found" });
}
res.status(500).send("Server Error");
}
};


// Update category
const updateCategory = async (req, res) => {
const categoryId = req.params.id;
try {
const updatedCategory = await Category.findOneAndUpdate(
{ _id: categoryId },
{
$set: {
categoryName: req.body.categoryName,
categoryImage: req.body.categoryImage,
},
},
{ new: true }
);
// Check if the category was found and updated
if (!updatedCategory) {
return res.status(404).json({ msg: "Category not found" });
}
res.json(updatedCategory);
} catch (err) {
console.error(err.message);
res.status(500).send("Server Error");
}
};
// Delete a category
const deleteCategory = async (req, res) => {
const categoryId = req.params.id;
try {
const result = await Category.findByIdAndDelete(categoryId);
if (!result) {
return res.status(404).json({
success: false,
message: "Category not found",
});
}
res.json({
success: true,
message: "Category deleted successfully",
});
} catch (error) {
res.status(500).json({
success: false,
message: "Unable to delete Category",
error: error.message,
});
}
};

const addCategory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required',
      });
    }

    const imageURL = await imageUploader(req);

    if (!imageURL) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading image',
      });
    }

    // Create the product with the correct property name (product_image)
    const category = await Category.create({
      ...req.body,
      category_image: imageURL, // Use the correct property name
    });
res.status(200).json({
      success: true,
      message: 'Category added successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(400).json({
      success: false,
      message: 'Category not added successfully',
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByID,
  addCategory,
  deleteCategory,
  updateCategory,
};
