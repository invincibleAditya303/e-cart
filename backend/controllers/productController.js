const mongoose = require('mongoose')
const Product = require('../models/Product')

exports.getAllProducts = async (request, response) => {
    try {
        const {category, size, minPrice, maxPrice, page, limit, search} = request.query
        const pageNumber = parseInt(page) || 1
        const limitNumber = Math.min(parseInt(limit) || 10, 50)

        let query = {}

        const escapeRegex = text => {
            return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        }

        if (search) {
            const safeSearch = escapeRegex(search)
            query.$or = [
                {name: new RegExp(safeSearch, 'i')},
                {description: new RegExp(safeSearch, 'i')}
            ]
        }

        if (category && category !== 'All') query.category = category
        if (size) query.sizes = size
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = minPrice
            if (maxPrice) query.price.$lte = maxPrice
        }

        const products = await Product.find(query).skip((pageNumber-1) * limitNumber).limit(limitNumber)
        response.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch (error) {
        console.error('Production fetch error', error)
        response.status(400).json({
            success: false,
            messasge: 'Server error'
        })
    }
}

exports.getProductById = async (request, response) => {
    try {
        const {id} = request.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product ID'
            })
        }

        const product = await Product.findById(id)

        if (!product) {
            response.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        response.status(200).json({
            success: true,
            product
        })
    } catch(error) {
        console.error('Get product error', error)
        response.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}