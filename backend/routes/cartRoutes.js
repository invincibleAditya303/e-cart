const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

// Get cart items
router.get('/', authMiddleware, cartController.getCart)

// Add to cart
router.post('/add', authMiddleware, cartController.addToCart)

// Increase qty of Item
router.put('/items/increase', authMiddleware, cartController.increaseItem)

// Decrease qty of Item
router.put('/items/decrease', authMiddleware, cartController.decreaseItem)

//Remove from cart
router.post('/remove', authMiddleware, cartController.removeFromCart)

//Clear cart
router.delete('/clear', authMiddleware, cartController.clearCart)

module.exports = router