const express = require('express')
const { protect } = require('../middleware/protect')
const { addToCart, getCartProducts, updateQuantity, removeAllFromCart } = require('../controller/cartController')
const router = express.Router()

router.post('/', protect, addToCart)
router.get('/', protect, getCartProducts)
router.put('/:id', protect, updateQuantity)
router.delete('/', protect, removeAllFromCart)

module.exports = router