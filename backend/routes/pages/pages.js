const express = require('express');
const { isAuthenticatedUser, isAuthenticatedRole, isLoginUser } = require('../../middlewares/Auth');
const FLIGHT = require('../../models/FLIGHT');
const ErrorHandler = require('../../utils/ErrorHandler');
const { isObjectIdOrHexString } = require('mongoose');

const Router = express.Router();



Router.get(["/",'/home'],isLoginUser,(req,res)=>{
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
     
     
Router.get(['/search'],isLoginUser,(req,res)=>{
     const user = req.user;
     res.render("SearchFlight",{
          done:false,
          Name: user && user.name,
          Email: user && user.email,
          Nationality: user && user.nationality,
          admin: user &&   (user.role==='admin')
     })
     })
Router.get(['/Booking'],isAuthenticatedUser,async(req,res,next )=>{
     const flightId = req.query.flightId;
     const user = req.user;
     const flight = await FLIGHT.findById(flightId);
     if(!flight || flight==null) 
     return res.render("Booking",{ 
          Name: user && user.name,
          Email: user && user.email,
          Nationality: user && user.nationality,
               admin: user &&   (user.role==='admin')});
     // console.log(flight)
     res.render("Booking",{
          flightId: flightId,
          airline:flight.airline,
          flightNo:flight.flightNumber,
          departureCity:flight.departureCity,
          arrivalCity:flight.destinationCity,
          departureDate:flight.departureDate,
          arrivalDate:flight.arrivalDate,
          availableSeats:flight.availableSeats,
          seats:flight.seats,
          Name: user && user.name,
          Email: user && user.email,
          Nationality: user && user.nationality,
          admin: user &&   (user.role==='admin')
     })
     })

     Router.get(['/BookingDetails'],isLoginUser,(req,res)=>{
          const user = req.user;
          res.render("BookingDetails" ,{
               Name: user && user.name,
               Email: user && user.email,
               Nationality: user && user.nationality,
               admin: user &&   (user.role==='admin')
          })
      })

      Router.get('/AddFlights',isAuthenticatedUser,isAuthenticatedRole("admin"),(req, res) => {
          const user = req.user;
          res.render('Admin/AddFlights',{
               Name: user && user.name,
               Email: user && user.email,
               Nationality: user && user.nationality,
               admin: user &&   (user.role==='admin')
          });
      });

      Router.get(['/UpdateFlights' ,'/UpdateFlights/:id'],isAuthenticatedUser,isAuthenticatedRole("admin"),async(req, res) => {
           const user = req.user;
           if(req.params.id===undefined || !req.params.id || !isObjectIdOrHexString(req.params.id ))
                    return res.render('Admin/AddFlights',{
                         Name: user && user.name,
                         Email: user && user.email,
                         Nationality: user && user.nationality,
                         admin: user &&   (user.role==='admin'),
                    });

          const flight =await FLIGHT.findById(req.params.id);
          
          res.render('Admin/AddFlights',{
               Name: user && user.name,
               Email: user && user.email,
               Nationality: user && user.nationality,
               admin: user &&   (user.role==='admin'),
               airline: flight && flight.airline,
               flightNumber: flight && flight.flightNumber,
               departureCity: flight && flight.departureCity,
               destinationCity: flight && flight.destinationCity,
               departureDate: flight && flight.departureDate,
               departureTime: flight && flight.departureTime,
               arrivalDate: flight && flight.arrivalDate,
               arrivalTime: flight && flight.arrivalTime,
               availableSeats: flight && flight.availableSeats,
          });
      });
 
      Router.get(['/RemoveFlights' ,'/RemoveFlights/:id'],isLoginUser,isAuthenticatedRole("admin"),async(req, res) => {
           const user = req.user;
           if(req.params.id===undefined || !req.params.id || !isObjectIdOrHexString(req.params.id ))
                    return res.render('SearchFlight',{
                         Name: user && user.name,
                         Email: user && user.email,
                         Nationality: user && user.nationality,
                         admin: user &&   (user.role==='admin'),
                    });

          const flight =await FLIGHT.findById(req.params.id);
          
          res.render('SearchFlight',{
               Name: user && user.name,
               Email: user && user.email,
               Nationality: user && user.nationality,
               admin: user &&   (user.role==='admin'),
               airline: flight && flight.airline,
               flightNumber: flight && flight.flightNumber,
               departureCity: flight && flight.departureCity,
               destinationCity: flight && flight.destinationCity,
               departureDate: flight && flight.departureDate,
               departureTime: flight && flight.departureTime,
               arrivalDate: flight && flight.arrivalDate,
               arrivalTime: flight && flight.arrivalTime,
               availableSeats: flight && flight.availableSeats,
          });
      });
 

// Router.route('/admin/flights/new').post(isAuthenticatedUser,isAuthenticatedRole('admin'),addFlight);

// Router.route('/admin/flights/:id')
//                                         .put(isAuthenticatedUser,isAuthenticatedRole('admin'),updateFlight)
//                                         .delete(isAuthenticatedUser,isAuthenticatedRole('admin'),removeFlight);

module.exports = Router;