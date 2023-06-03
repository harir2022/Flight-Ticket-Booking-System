const express = require('express');
const { isAuthenticatedUser, isAuthenticatedRole } = require('../../middlewares/Auth');

const Router = express.Router();



Router.get(["/",'/home'],(req,res)=>{
     const user = req.user;     
     if(!user){
          return res.render('Home');
     }
     console.log(user)
     
     res.render("Home",{
          Name:user.name,
          Email:user.email,
          Nationality:user.nationality,
          admin:  (user.role==='admin')
          })
 })

 Router.get(['/login'],(req,res)=>{
     res.render("Login")
 })

Router.get(['/register'],(req,res)=>{
     res.render("Register")
 })
 
 Router.get(['/profile'],isAuthenticatedUser,(req,res)=>{
      const user = req.user;
      res.render('Profile',{
           Name:user.name,
           Email:user.email,
           Nationality:user.nationality,
           admin:  (user.role==='admin')
          })
     })
     
     
     Router.get(['/search'],(req,res)=>{
          res.render("SearchFlight",{
               done:false
          })
      })

 

// Router.route('/admin/flights/new').post(isAuthenticatedUser,isAuthenticatedRole('admin'),addFlight);

// Router.route('/admin/flights/:id')
//                                         .put(isAuthenticatedUser,isAuthenticatedRole('admin'),updateFlight)
//                                         .delete(isAuthenticatedUser,isAuthenticatedRole('admin'),removeFlight);

module.exports = Router;