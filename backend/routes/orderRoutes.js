const express = require('express')
const router = express.Router()
const { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getUserOrders,
    getOrders
} = require("../controllers/orderController.js")
const {protect, isAdmin} = require('../middlewares/authMiddleware')

router  
    .route('/myorders')
        .get(protect, getUserOrders) 
router
    .route('/:id')
        .get(protect, getOrderById)

router
    .route('/')
        .post(protect, addOrderItems)
        .get(protect, isAdmin ,getOrders)

router
    .route('/:id/pay')
        .put(protect, updateOrderToPaid)

module.exports = router