const USER = require('../models/USER')
const CatchAsyncError = require("../middlewares/CatchAsyncError");
const ErrorHandler = require('../utils/ErrorHandler');
const sendToken = require('../utils/JWToken');

exports.registerUser =CatchAsyncError( async(req,res,next) => {
     const { name, email, password,nationality } = req.body;
     const user = await USER.create({
          name,
          email,
          password,
          nationality          
      });

     sendToken(user,200,res);

})

exports.loginUser =CatchAsyncError( async(req,res,next) => {
     const {email,password} = req.body;

     if(!email || !password) {
          return next(new ErrorHandler("Invalid Email or Password",401));
     }
     

     const user = await USER.findOne({ email}).select("+password");

     if(!user)
          return next(new ErrorHandler("Invalid Email or Password",401));
     
     const isPasswordMatched =  await user.comparePassword(password);
     
     if(!isPasswordMatched)
          return next(new ErrorHandler("Invalid Password",401));

     // sendtoken

     sendToken(user,200,res);
})

exports.logoutUser =CatchAsyncError( async(req,res,next) => {
     res.cookie('token',null,{
          expires: new Date(Date.now()),
          httpOnly: true,
      });
      res.status(200)
      .redirect('/Home')
     //  res.json({
     //      success: true,
     //      message:'logged out successfully'
     //  })
})