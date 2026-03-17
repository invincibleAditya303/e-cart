const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: String,
        required: true,
        size: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
}, {_id: false})

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: {
        type: [CartItemSchema],
        validate: [arr => arr.length <= 50, 'Cart item limit exceeded']
    },
}, {timestamps: true, strict: true})

module.exports = mongoose.model('Cart', CartSchema)