const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { createProduct } = require('../controllers/product/product.controller');
const { getAllProducts, getProductById } = require('../controllers/product/fetchProduct.controller')

// 'images' is the name used in FormData
router.post('/', upload.array('images', 10), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
