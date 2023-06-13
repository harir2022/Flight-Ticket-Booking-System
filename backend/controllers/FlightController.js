const FLIGHT = require('../models/FLIGHT');
const CatchAsyncError = require("../middlewares/CatchAsyncError");
const APIFeatures = require('../utils/APIFeature');
const ErrorHandler = require('../utils/ErrorHandler');

exports.getAllFlights =CatchAsyncError( async ( req, res, next ) => {
     
     const api =
           new APIFeatures(FLIGHT.find(), req.query)
           .search()
           .filter()
          
     //use await 
     const flights =await  api.query;


     if(!flights)
          return next(new ErrorHandler('No flights found',404));
     const user = req.user;
     if (req.headers.accept === 'application/json') {
          res.json({
                    admin: user &&   (user.role==='admin'),
                    flights: flights
          });
     } else {
          
          res.status(200).render('SearchFlight',{
               Name: user && user.name,
               Email: user && user.email,
               Nationality: user && user.nationality,
               admin: user &&   (user.role==='admin'),
               done:true,
               flights:flights
          });
     }
})

exports.getSpecificFlight =CatchAsyncError( async ( req, res, next ) => {
     
     
     const flight = await FLIGHT.findById(req.params.id);
     if(!flight)
          return next(new ErrorHandler('No flight found',404));

     res.status(200).json({
          success: true,
          flight
     })

})



exports.addFlight = CatchAsyncError( async (req, res,next) => {
     const {  airline,flightNumber,
          departureCity,destinationCity,
          departureDate,departureTime,
          arrivalDate,arrivalTime,
          availableSeats} = req.body;

          const flight = await FLIGHT.create({
               airline,flightNumber,
          departureCity,destinationCity,
          departureDate,departureTime,
          arrivalDate,arrivalTime,
          availableSeats,
          createdByUser: req.user._id
          });

          
          res.json({
               success:true,
               data:flight
          })
});

exports.updateFlight = CatchAsyncError( async (req, res,next) => {

     const flight = await  FLIGHT.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true,
          useFindAndModify:false
      });

      if(!flight)
               return next(new ErrorHandler('No flight found',404));

      res.json({
          success:true,
          flight
      })

});

exports.removeFlight = CatchAsyncError( async (req, res,next) => {     
     const flight = await FLIGHT.findByIdAndRemove(req.params.id);
     if(!flight)
               return next(new ErrorHandler('No flight found',404));

     res.json({
          success:true,
          msg:"Deleted successfully"
     });
});