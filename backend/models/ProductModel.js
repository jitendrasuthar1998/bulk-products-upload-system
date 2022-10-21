// make schema of product to save in mongodb

// and export this schema.

// and import that schema in products.controller.js and use insertMany to save a products array to database.

//A product card with Product Name, Description, Product Image, Regular Price, Selling Price(if
// different from regular price), Variant, and Category(if possible).

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { required: true, type: String },
    category: { required: true, type: String },
    brand: { required: true, type: String },
    price: { required: true, type: Number },
    stock: { required: true, type: Number },
    inStock: { required: true, type: Boolean },
    description: { required: true, type: String },
    image: { type: String },
})

module.exports = mongoose.model('product', productSchema);