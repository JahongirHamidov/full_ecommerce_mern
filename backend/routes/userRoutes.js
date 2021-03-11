const express = require('express')
const router = express.Router()
const { 
    authUser, 
    getUserProfile, 
    registerUser,
    updateUserProfile ,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} = require("../controllers/userController")
const {protect, isAdmin} = require('../middlewares/authMiddleware')


router
    .route('/')
        .get(protect, isAdmin ,getUsers)
        .post(registerUser)

router
    .route('/:id')
        .get(protect, isAdmin, getUserById)
        .delete(protect, isAdmin, deleteUser)
        .put(protect, isAdmin,  updateUser)

router.route('/login').post(authUser)

router
    .route('/profile')
        .get(protect, getUserProfile)
        .put(protect, updateUserProfile)


module.exports = router