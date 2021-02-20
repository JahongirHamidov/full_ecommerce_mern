const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const  protect = async(req, res, next) => {
    let token 

    console.log(req.headers.authorization);
    next()
}

module.exports = protect