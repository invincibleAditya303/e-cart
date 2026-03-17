const express = require('express')
const app = express()
app.use(express.json())
const {ObjectId} = require('mongoose').Types
const Cart = require('../models/Cart')
const Product = require('../models/Product')

exports.getCart = async (request, response) => {
    try {
        const userId = request.payload?.id

        if (!userId) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const cart = await Cart.findOne({user: userId}).populate('items.product')

        if (!cart) {
            return response.status(200).json({
                success: true,
                cart: {items: []}
            })
        }

        response.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        console.error('Cart fetch error', error)
        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

exports.addToCart = async (request, response) => {
    try {
        const userId = request.payload?.id

        if (!userId) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        
        const {_id, size, qty} = request.body
        

        if (!_id || !size || !qty || qty < 1) {
            return response.status(400).json({
                success: false,
                message: 'Invalid cart details'
            })
        }

        if (!ObjectId.isValid(_id)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product ID'
            })
        }

        const product = await Product.findById(_id)

        if (!product) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        if (qty > product.stock) {
            return response.status(400).json({
                success: false,
                message: 'Insufficient stock'
            })
        }

        let cart = await Cart.findOne({user: userId})
            
        if(!cart) {
            cart = new Cart ({
                user: userId,
                items: []
            })
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product._id.toString() === _id && item.size === size
        )

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty
        } else {
            cart.items.push({
                product,
                size,
                qty
            })
        }

        await cart.save()
        
        const populated = await cart.populate('items.product')
        response.status(200).json({
            success: true,
            populated
        })
        
    } catch (error) {
        console.error('cart add error', error)
        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

exports.increaseItem = async (request, response) => {
    try {
        const userId = request.payload?.id

        if (!userId) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const {productId, size} = request.body

        if (!productId || !size) {
            return response.status(400).json({
                success: false,
                message: 'Invalid request data'
            })
        }

        if (!ObjectId.isValid(productId)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product ID'
            })
        }

        const productItem = await Product.findById(productId)

        if (!productItem) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        

        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return response.status(400).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const itemIndex = cart.items.findIndex(item => 
            item.product._id.toString() === productId && item.size === size
        )

        if (itemIndex === -1) {
            return response.status(400).json({
                success: false,
                message: 'Item not found in cart'
            })   
        }

        if (cart.items[itemIndex].qty >= productItem.stock) {
            return response.status(400).json({
                success: false,
                message: 'Quantity exceeds available stock'
            })
        }

        cart.items[itemIndex].qty += 1

        await cart.save()
        const populated = await cart.populate('items.product')

        response.status(200).json({
            success: true,
            cart: populated})
    } catch (error) {
        console.error('Item decrement error', error)

        response.status(500).json({
            success: false,
            message: 'Servor error'
        })
    }
}

exports.decreaseItem = async (request, response) => {
    try {
        const userId = request.payload?.id

        if (!userId) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

         const {productId, size} = request.body

        if (!productId || !size) {
            return response.status(400).json({
                success: false,
                message: 'Invalid request data'
            })
        }

        if (!ObjectId.isValid(productId)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product ID'
            })
        }

        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return response.status(400).json('Cart not found')
        }

        const itemIndex = cart.items.findIndex(item => 
            item.product._id.toString() === productId && item.size === size
        )

        if (itemIndex === -1) {
            return response.status(400).json({
                success: false,
                message: 'Item not foun in cart'
            })   
        }

        if (cart.items[itemIndex].qty> 1) {
            cart.items[itemIndex].qty -= 1
        } else {
            cart.items = cart.items.filter(eachCartItem => 
                !(eachCartItem.product.toString() === productId && eachCartItem.size === size)
            )
        }
        await cart.save()
        const populated = await cart.populate('items.product')

        response.status(200).json({
            success: true,
            cart: populated
        })
    } catch (error) {
        console.error('Item decrement error', error)
        response.status(500).json({
            success: false,
            message: 'Servor error'})
    }
}

exports.removeFromCart = async (request, response) => {
    try {
        const userId = request.payload?.id
        
        if (!userId) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const {id, size} = request.body

        if (!id || !size) {
            return response.status(400).json({
                success: false,
                message: 'Invalid request data'
            })
        }

        if (!ObjectId.isValid(id)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product ID'
            })
        }

        const cart = await Cart.findOne({user: userId})
        

        if (!cart) {
            return response.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        cart.items = cart.items.filter(eachItem => 
            !(eachItem.product.toString() === id && eachItem.size === size)
        )
        
        await cart.save()
        
        const populated = await cart.populate('items.product')

        response.status(200).json({
            message: true,
            cart: populated})
    } catch (error) {
        console.error('cart add error', error)
        response.status(500).json({
            success: false,
            message: 'Server error'})
    }
}

exports.clearCart = async (request, response) => {
    try {
        const userId = request.payload?.id

        if (!userId) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return response.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        cart.items = []

        await cart.save()

        response.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        console.error('Cart clear error', error)

        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}