const express = require('express');

const dotenv = require('dotenv');
const logger = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');


const app = express();

dotenv.config({path:'backend/config/config.env'});

app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended:true }));
app.use(cookieparser());


//routes;

const authRoute = require("./routes/authRoutes");
app.use('/api/v1',authRoute);


const flightRoute = require("./routes/FlightRoutes");
app.use('/api/v1',flightRoute);

const bookingRoute = require("./routes/BookingRoutes");
app.use('/api/v1',bookingRoute);

module.exports= app;