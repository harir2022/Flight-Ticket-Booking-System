const express = require('express');

const dotenv = require('dotenv');
const logger = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');


const app = express();

dotenv.config({path:'backend/config/config.env'});

app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended:    true }));
app.use(cookieparser());


//routes;



module.exports= app;