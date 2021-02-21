const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const  protect =asyncHandler(async(req, res, next) => {
    let token 
    console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            console.log(decoded)
            next()
        } catch (error) {
            console.error(error.message)
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

module.exports = protect