const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')

const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many registration attempts. Try again later'
})

// Sign Up route
router.post('/register',registerLimiter, authController.register)

// Login route
router.post('/login', authController.login)

// Verify Token
router.get('/verify', authMiddleware, authController.verifyUser)

// Logour route
router.post('/logout', authController.logout)

module.exports = router