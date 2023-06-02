const FLIGHT = require('../models/FLIGHT');
const CatchAsyncError = require("../middlewares/CatchAsyncError");
const APIFeatures = require('../utils/APIFeature');

exports.getAllFlights =CatchAsyncError( async ( req, res, next ) => {
     
     const api =
           new APIFeatures(FLIGHT.find(), req.query)
           .search()
           .filter()
          
     //use await 
     const flights =await  api.query;
     res.json({
               flights: flights
     });
})

exports.getSpecificFlight =CatchAsyncError( async ( req, res, next ) => {
     res.send("flights");
})