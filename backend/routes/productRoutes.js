const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

// Get all products
router.get('/',authMiddleware, productController.getAllProducts)

// Get product details
router.get('/:id', authMiddleware, productController.getProductById)

module.exports = router
