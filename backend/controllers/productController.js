const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')


// @desc Fetch all products
// @route GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({})

    res.status(200).json(products)
})



// @desc    Fetch product by id
// @route   GET /api/products/:id
// @access  Public

const getProduct = asyncHandler( async (req,res) => { 
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


module.exports = {getProducts, getProduct}