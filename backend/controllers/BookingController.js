const CatchAsyncError = require("../middlewares/CatchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const BOOKING = require("../models/BOOKING");
const FLIGHT = require("../models/FLIGHT");
const APIFeatures = require("../utils/APIFeature");

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
     const booking = await BOOKING.findOne(
          {    _id:id,
               user:req.user._id 
          }).populate('user')
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

exports.getMyBookings = CatchAsyncError(async ( req, res, next ) => {
     const user = req.user     
     const booking = await BOOKING.find({user:user._id})  
     .populate('user')
     .populate({
          path:"flight",
          select:"-seats"
     })
     
     if(!booking){
          return next(new ErrorHandler(`No booking found`,404));
     }

     console.log("booking.........")

     res.render("BookingDetails",{
          user:user._id,
          Name: user && user.name,
          Email: user && user.email,
          Nationality: user && user.nationality,
          admin: user &&   (user.role==='admin'),
          booking
     })

     // res.status(200 ).json({
     //      booking
     // });
     
     
});

//admin only routes
exports.getAllBookings = CatchAsyncError(async function(req,res,next){
     
     const query  = (req.query);
     const toFind = {}
     Object.keys(query).forEach(
          (key)=>{
               const nk1 = key.split(".")[0]
               const nk2 = key.split(".")[1]              
               const obj={}
               obj[nk2]= query[key]
               toFind[nk1]=obj;               
          }
     )
     
     const books = await  BOOKING.find()
     .populate('flight')
     .exec()
     
     // console.log(Object.keys(toFind.flight))
     let filteredBookings=null;
     Object.keys(toFind.flight).forEach( key=>
           filteredBookings = books.filter(booking => booking.flight[key] === toFind.flight[key])
     );
     if(!filteredBookings || filteredBookings.length === 0) {
          return next(new ErrorHandler('Booking not found',404));
     }
     
     
     res.json({
          success:true,
          bookings:filteredBookings
     });

})