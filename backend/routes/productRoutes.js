const express = require('express')
const router = express.Router()
const { 
    getProducts, 
    getProduct, 
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview
 } = require("../controllers/productController")
const {protect, isAdmin} = require('../middlewares/authMiddleware')

router
    .route('/')
        .get(getProducts)
        .post(protect, isAdmin, createProduct)


router.route('/:id/reviews')
    .post(protect, createProductReview)


router.route('/:id')
    .get(getProduct)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct) 

module.exports = router