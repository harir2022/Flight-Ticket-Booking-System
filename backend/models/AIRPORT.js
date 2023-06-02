const mongoose = require('mongoose');

const AIRPORTSCHEMA = mongoose.Schema({
     name: String,
     code: {
       type: String,
       unique: true,
     },
     city: String,
     country: String,
});

module.exports =mongoose.model('AIRPORT',AIRPORTSCHEMA);