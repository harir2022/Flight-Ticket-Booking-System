const CatchAsyncError = require("../middlewares/CatchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const BOOKING = require("../models/BOOKING");
const FLIGHT = require("../models/FLIGHT");

exports.newBooking = CatchAsyncError(async ( req, res, next ) => {
     const {flightId, bookingDetails}      = req.body;
     // TODO:
     const userId =req.user._id;

     const flight = await FLIGHT.findById(flightId);
     
     if(!flight)
           return next(new ErrorHandler("Couldn't find flight",404));

     
     let booking =[];
     let totalSeats = 0; 
     let totalAmount = 0;

     for(var book of bookingDetails) {
          
          const {requestedSeatNumber , requestedClass }= book;         
          const mySeat = await flight.seats.find((seat)=>seat.seatNumber===requestedSeatNumber && seat.class === requestedClass && seat.available);

          if(!mySeat)
               return next(new ErrorHandler("Seats not available",404));
          
          mySeat.available = false;
          flight.markModified('seats');// nested object updation in db
          
          totalAmount+=mySeat.price;
          totalSeats++;

          console.log(mySeat)
          
          booking.push(mySeat);
          
     }    
     
     console.log( booking)
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
     const id= req.params.id;
     
     const booking = await BOOKING.findById(id)
                                   .populate('user')
                                   .populate({
                                        path:"flight",
                                        select:"-seats"
                                   })
                                   

     if(!booking){
          return next(new ErrorHandler(`No booking found`,404));
     }

     res.status(200 ).json({
          booking
     })
});

exports.getAllBookings = CatchAsyncError(async ( req, res, next ) => {
     const id = req.user._id;     
     const booking = await BOOKING.find({user:id})  
     .populate('user')
     .populate({
          path:"flight",
          select:"-seats"
     })
     
     if(!booking){
          return next(new ErrorHandler(`No booking found`,404));
     }

     res.status(200 ).json({
          booking
     });
     
  
});