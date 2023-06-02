const  mongoose = require("mongoose");


const SEATSCHEMA = new mongoose.Schema({
      seatNumber: String,
      available: Boolean,
      class: {
        type: String,
        enum: ['Economy', 'Business', 'First'],
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
});
module.exports = SEATSCHEMA;
module.exports = mongoose.model('SEAT',SEATSCHEMA);