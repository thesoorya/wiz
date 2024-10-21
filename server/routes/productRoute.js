const express = require('express');
const { getAllProducts, getProductById, getFeaturedProduct, createProduct, deleteProduct, getRecommandedProduct, getByCategory, toggleFeaturedProduct, getExclusiveProduct
 } = require('../controller/productController');
const { protect, admin } = require('../middleware/protect');
const router = express.Router();

router.get('/',protect, admin, getAllProducts)
router.post('/',protect, admin, createProduct)
router.patch('/:id',protect, admin, toggleFeaturedProduct)
router.delete('/:id',protect, admin, deleteProduct)
router.get('/featured', getFeaturedProduct)
router.get('/exclusive', getExclusiveProduct)
router.get('/recommanded', getRecommandedProduct)
router.get('/category/:category', getByCategory)
router.get('/product/:id', getProductById)

module.exports = router;
