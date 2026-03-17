const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Image must be a valid URL']
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    sizes: {
        type: [String],
        default: []
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }

}, {
        timestamps: true,
        strict: true
    
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product