const express = require('express')
const router = express.Router()
const { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getUserOrders
} = require("../controllers/orderController.js")
const {protect} = require('../middlewares/authMiddleware')

router  
    .route('/myorders')
        .get(protect, getUserOrders) 
router
    .route('/:id')
        .get(protect, getOrderById)

router
    .route('/')
        .post(protect, addOrderItems)

router
    .route('/:id/pay')
        .put(protect, updateOrderToPaid)

module.exports = router