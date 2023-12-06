const Product = require ('../models/Products');
const {imageUploader} = require ('../extra/imageUploader')

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
}



const addProduct = async (req, res) => {
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
  
      const product = await Product.create({
        ...req.body,
        product_image: imageURL, 
      });
  
      res.status(200).json({
        success: true,
        message: 'Product added successfully',
        data: product,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(400).json({
        success: false,
        message: 'Product not added successfully',
        error: error.message,
      });
    }
  };



const getProductByID = async (req, res) => {
    try {
      const products = await Product.findById(req.params.productId);
      res.status(200).json ({
        success:true,
        message: 'Data retrieved successfully',
        data: products,
    });
}catch (error){
    res.status(400).json ({
        success:false,
        message:'Unable to retrieve product by ID',
        error:error,

    })
}

};
const updateProductByID = async (req,res) =>{
    try{
        const products = await Product.findByIdAndUpdate (
            req.params.ID,
            req.body);
            res.status(200).json({
                success:true,
                message:'Product updated successfully',
                data:products,
            })
        
    } catch(error){
        res.status(400).json({
            success:false,
            message:'Product not updated successfully,',
            error:error,
        });
    }
}

const deleteProductByID = async (req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
            res.status(200).json({
                success:true,
                message:'Product deleted successfully',
                data:deletedProduct,
            })
        
    } catch(error){
        res.status(400).json({
            success:false,
            message:'Product not deleted successfully,',
            error:error,
        });
    }
}

module.exports = {
    getAllProducts,
    getProductByID,
    updateProductByID,
    deleteProductByID,
    addProduct,
}