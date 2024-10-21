const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    category: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    },
    isExclusive: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const Product = mongoose.model('products', productSchema)

module.exports = Product