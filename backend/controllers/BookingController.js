const mongoose = require('mongoose');
const CatchAsyncError = require("../middlewares/CatchAsyncError");
const BOOKING = require("../models/BOOKING");
const FLIGHT = require("../models/FLIGHT");

exports.newBooking = CatchAsyncError(async ( req, res, next ) => {
     const {flightId, bookingDetails}      = req.body;
     // TODO:
     const userId =req.user._id;

     const flight = await FLIGHT.findById(flightId);
     
     if(!flight)
           return next(new Error("Couldn't find flight"));

     
     let booking =[];
     let totalSeats = 0; 
     let totalAmount = 0;

     for(var book of bookingDetails) {
          
          const {requestedSeatNumber , requestedClass }= book;         
          const mySeat = flight.seats.find((seat)=>seat.seatNumber===requestedSeatNumber && seat.class === requestedClass && seat.available);

          if(!mySeat)
               return next(new Error("Seats not available"));
          
          mySeat.available = false;
          flight.markModified('seats');// nested object updation in db
          
          totalAmount+=mySeat.price;
          totalSeats++;

          
          booking.push(mySeat);
          
     }    
     
     // console.log( booking)
     const booked = new BOOKING({
          user:userId,
          flight: flightId,
          seats:booking ,
          totalAmount,
          totalSeats
     })           

     await booked.save({
          validateBeforeSave:false
     });
     
     flight.availableSeats -=totalSeats;
     await flight.save({
          validateBeforeSave:false
     });
     res.send(booked);
     // seats: 
     //  totalSeats:
     // totalAmount: Number,
     // status
     // payment:


});

exports.getSingleBooking = CatchAsyncError(async ( req, res, next ) => {
     const {id} = req.params.id;
     const booking = await BOOKING.findOne(id);

     if(!booking){
          return next(new Error(`No booking found`));
     }

     res.statusCode(200 ).json({
          booking
     })
});

exports.getAllBookings = CatchAsyncError(async ( req, res, next ) => {
     const id = req.user._id;
     const booking = await BOOKING.find({user:id})
     .populate('flight')
     .populate({
       path: 'seats',
       model: 'Seat',
       match: { available: false }, // Only populate booked seats
       populate: {
         path: 'flight',
         model: 'Flight',
       },
     });
     
     
     if(!booking){
          return next(new Error(`No booking found`));
     }

     res.status(200 ).json({
          booking
     });
});