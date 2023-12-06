const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const {
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  addProduct,
} = require('../controllers/ProductsController');

router.post('/products', upload.single('image'), addProduct);
router.get('/getAll', getAllProducts);
router.get('/products/:productId', getProductByID);
router.put('/products/update/:ID', updateProductByID);
router.delete('/products/delete/:ID', deleteProductByID);

module.exports = router;
