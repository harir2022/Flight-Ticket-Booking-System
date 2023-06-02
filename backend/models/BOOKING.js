const mongoose = require('mongoose');
const BOOKINGSCHEMA =  mongoose.Schema({
     user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'USER',
       required: true
     },
     flight: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'FLIGHT',
       required: true
     },
     seats: [ ],
      totalSeats: {
        type:Number,
        required:true,
      },
     totalAmount: Number,
     status: {
     type: String,
     enum: ['Pending', 'Confirmed', 'Cancelled'],
     default: 'Pending',
     },
     payment: {
     status: {
          type: String,
          enum: ['Pending', 'Completed','Refunded'],
          default: 'Pending',
    },
  },
  bookedAt:{
    type:Date,
    default:Date.now
}
     
   });
   
   const BOOKING = mongoose.model('BOOKING', BOOKINGSCHEMA);
   
   module.exports = BOOKING;
   