const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const  protect = asyncHandler(async(req, res, next) => {
    let token 
    console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token)

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            //console.error(error.message)
            res.status(401)
            throw new Error('Not authorized, token failed')
            
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    next()
})


const isAdmin = (req,res,next) => {

    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = {
    protect, 
    isAdmin
}