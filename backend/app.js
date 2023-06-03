const express = require('express');
const { customHBS } = require('./customHBS');
const path=require("path")
const dotenv = require('dotenv');
const logger = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');

const hbs=require("hbs");

const app = express();

dotenv.config({path:'backend/config/config.env'});

app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended:true }));
app.use(cookieparser());


// Enable CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Update with your allowed origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const location=path.join(__dirname,"./public")

//views
const shared=path.join(__dirname,"./views/Shared");
hbs.registerPartials(shared)

app.use(express.static(location))

customHBS(hbs);
app.set("view engine" ,"hbs");
app.set('views',path.join(__dirname,"./views"));

//routes;


app.use('/',require('./routes/pages/pages'))


const authRoute = require("./routes/authRoutes");
app.use('/api/v1',authRoute);


const flightRoute = require("./routes/FlightRoutes");
app.use('/api/v1',flightRoute);

const bookingRoute = require("./routes/BookingRoutes");
app.use('/api/v1',bookingRoute);




const middlewares = require('./middlewares/Error');


app.use(middlewares);

module.exports= app;