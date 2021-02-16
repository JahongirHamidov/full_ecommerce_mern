const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const products = require('../data/products')

const Product = require('../models/productModel')

// @desc Fetch all products
// @route GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req,res) => {
    const products = await Product.find({})

    res.status(200).json(products)
}))

// @desc    Fetch product by id
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler( async (req,res) => { 
    const product = await Product.findById(p => p._id === req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

}))


module.exports = router