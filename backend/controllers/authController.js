const User = require('../models/User')
const Cart = require('../models/Cart')
const express = require('express')
const app = express()
app.use(express.json())

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = user => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
}

exports.register = async (request, response) => {
    try {
        const {name, email, password} = request.body
        
        if (!name || !email || !password) {
            return response.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        email = email.toLowerCase()

        const isExistingUser = await User.findOne({email})

        if (isExistingUser) {
            return response.status(409).json({
                success: false,
                message: 'User already exists'})
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be atleast 6 characters'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedpassword,
            role: 'user'
        })

        await user.save()
        response.status(201).json({
            success: true,
            message: 'User regsitered successfully'
        })
    } catch (error) {
        console.error('Error while Registration', error)
        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }  
}

exports.login = async (request, response) => {
    try {
        let {email, password} = request.body

        if (!email || !password) {
            return response.status(400).json({
                success: false,
                message: 'Email and password required'
            })
        }

        email = email.toLowerCase()

        const user = await User.findOne({email}).select('+password')

        if (!user) {
            return response.status(401).json({
                success: false,
                message: 'Invalid User'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return response.status(401).json({
                success: false,
                message: 'Invalid password'
            })
        }

        let token = generateToken(user)

        response.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })
        
        response.status(200).json({
            success: true,
            message: 'Login successful'
        })
    } catch (error) {
        console.error('Login error', error)
        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

exports.verifyUser = async (request, response) => {
    try {
        response.status(200).json({
            success: true,
            user: request.payload
        })  
    } catch (error) {
        console.error('Verification error', error)

        response.status(500).json('Server error')
    }
}

exports.logout = async (request, response) => {
    try {
        response.clearCookie('token', {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'prodcution'? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        })

        response.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        console.log('Logout error', error)

        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}