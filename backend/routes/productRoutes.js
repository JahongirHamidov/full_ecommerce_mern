const express = require('express')
const router = express.Router()
const { getProducts, getProduct } = require("../controllers/productController")


router.route('/').get(getProducts)

router.route('/:id').get(getProduct)


module.exports = router