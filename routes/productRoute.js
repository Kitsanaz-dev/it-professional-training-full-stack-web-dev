const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/all-products', productController.getAllProducts);
router.post('/create-product', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/update-product/:id', productController.updateProduct);
router.patch('/update-stock/:id', productController.updateStock);
router.delete('/delete-product/:id', productController.deleteProduct);
router.get('/low-stock', productController.getLowStockProducts);

module.exports = router;