const mongoose = require('mongoose');
const SEATSCHEMA = require('./SEAT');
const BOOKING = require('./BOOKING');

const FLIGHTSCHEMA =  mongoose.Schema({

  airline: {
    type: String,
    required: [true,'Please enter the airline name ']
  },
  flightNumber: {
    type: String,
    required: [true,'Please enter the flight number ']
  },
  departureCity: {
    type: String,
    required: [true,'Please enter the departure city ']
  },
  destinationCity: {
    type: String,
    required: [true,'Please enter the destination city ']
  },
  departureDate: {
    type: Date,
    required: [true,'Please enter the departure date ']
  },
  departureTime: {
    type: String,
    required: [true,'Please enter the departure time ']
  },
  arrivalDate: {
    type: Date,
    required: [true,'Please enter the arrival Date ']
  },
  arrivalTime: {
    type: String,
    required: [true,'Please enter the arrival Time ']
  },
  availableSeats: {
    type: Number,
    default: 60 
  },
  seats:[],
  createdAt:{
    type:Date,
    default:Date.now
},
createdByUser:{
    type:mongoose.Schema.ObjectId,
    ref:'USER',
    required:true
} 
});


FLIGHTSCHEMA.pre('validate', function (next) {
  try {
    if (this.isNew) {
      const seats = [];
      for (let i = 1; i <= Math.ceil(this.availableSeats*0.5 ); i++) {
        seats.push({
          class: 'Economy',
          seatNumber: `E${i}`,
          available: true,
          price: 100, // Set the price as needed
        });
      }
      for (let i = 1; i <=Math.ceil (this.availableSeats*0.2); i++) {
        seats.push({
          class: 'First',
          seatNumber: `F${i}`,
          available: true,
          price: 200, // Set the price as needed
        });
      }
  
      for (let i = 1; i <=Math.ceil (this.availableSeats*0.3); i++) {
        seats.push({
          class: 'Business',
          seatNumber: `B${i}`,
          available: true,
          price: 300, // Set the price as needed
        });
      }
      this.seats = seats;
    }
    
    next();
  } catch (error) {
      next(error);
  }
});



FLIGHTSCHEMA.pre('remove', async function (next) {
  try {
    // Access the flight ID
    const flightId = this._id;

    // Cancel all bookings associated with the flight
    await BOOKING.updateMany(
      { flight: flightId },
      { $set: { status: 'Cancelled' } }
    );

    next();
  } catch (error) {
    next(error);
  }
});



const FLIGHT = mongoose.model('FLIGHT', FLIGHTSCHEMA);
module.exports = FLIGHT;
