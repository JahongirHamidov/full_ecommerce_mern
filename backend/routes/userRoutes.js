const express = require('express')
const router = express.Router()
const { 
    authUser, 
    getUserProfile, 
    registerUser,
    updateUserProfile ,
    getUsers
} = require("../controllers/userController")
const {protect, isAdmin} = require('../middlewares/authMiddleware')


router
    .route('/')
        .get(protect, isAdmin ,getUsers)
        .post(registerUser)
router.route('/login').post(authUser)
router
    .route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)


module.exports = router