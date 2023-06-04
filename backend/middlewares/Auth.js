const jwt = require('jsonwebtoken');

const USER = require('../models/USER')
const catchASyncErrors = require('./CatchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');

exports.isLoginUser = catchASyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token) {
        return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await USER.findById(decoded.id); // forgot to put await troubled roles;
    
    next();
}); 
// is user authenticated ? 
exports.isAuthenticatedUser = catchASyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token) {
        res.redirect('/login')
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await USER.findById(decoded.id); // forgot to put await troubled roles;
    
    next();
}); 



// who is this user ? admin or user ;
exports.isAuthenticatedRole = (...roles)=>{
    
    return (req, res, next)=>{
            if(!roles.includes(req.user.role)){
                return next(
                    new ErrorHandler(`Role ${req.user.role} cannot be allowed to accesss resoures `,403)
                )
            }
            next();
}}