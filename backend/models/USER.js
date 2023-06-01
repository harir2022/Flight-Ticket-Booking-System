const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const USERSCHEMA = mongoose.Schema({

     name:{
          type: String,
          required:[true, "Please enter your name"],
          maxLength:[50, 'Your name must be at least 50 characters'],
     },

     email:{
          type: String,
          required:[true,"Please enter your email"],
          unique:[true, "Already the email has been exists"],
          validate:[validator.isEmail,"Please enter a valid email"]
     },

     phone:{
          type: String
     },
     
     password:{
          type:String, 
          required:[true,'Please enter the password'],
          select:false,
     },

     nationality:{
          type: String,
          maxLength:[100, 'Your Country name must be at least 100 characters'],
          required:[true,'Please enter your country name'],
     },

     dob: {
          type: Date,
     },
     
     gender:{
          type: String,
     },

     role:{
          type:String,
          default:'user'
      },
      createAt:{
          type:Date,
          default:Date.now
      },

});


// to hash the password
USERSCHEMA.pre('save', async function(next){
     if(!this.isModified('password'))
         next();
     this.password = await  bcrypt.hash(this.password,10); 
 });
 
// comparre enter password with UserPassword;
USERSCHEMA.methods.comparePassword= async function(enteredPassword){
     return await bcrypt.compare(enteredPassword,this.password);
 }



 //sign with object id ;
 USERSCHEMA.methods.getJWToken =  function(){
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
         expiresIn: process.env.JWT_EXPIRES_TIME
     })
}



module.exports=mongoose.model('USER',USERSCHEMA)