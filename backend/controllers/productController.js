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


// @desc    Delete product by id
// @route   DELETE /api/products/:id
// @access  Private/ admin

const deleteProduct = asyncHandler( async (req,res) => { 
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({ message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


// @desc Create a product 
// @route POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })
  

// @desc Update a product 
// @route PUT /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {

    const {
        name, 
        price, 
        brand, 
        image, 
        category, 
        description, 
        countInStock,
    } = req.body
  
  
  const product = await Product.findById(req.params.id)

  if(product){

    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    
     

    const updatedProduct = await product.save()
    res.json(updatedProduct)

  } else {
      res.status(404)
      throw new Error('Product not found')
  }
})

module.exports = {
    getProducts, 
    getProduct, 
    deleteProduct,
    createProduct,
    updateProduct,
}