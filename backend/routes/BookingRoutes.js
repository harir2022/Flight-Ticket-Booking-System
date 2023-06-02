const express = require('express');
const { newBooking, getSingleBooking, getAllBookings } = require('../controllers/BookingController');
const { isAuthenticatedUser } = require('../middlewares/Auth');

const Router = express.Router();


Router.route('/booking/me').get(isAuthenticatedUser,getAllBookings);
Router.route('/booking/new').post(isAuthenticatedUser,newBooking)
Router.route('/booking/:id').get(isAuthenticatedUser,getSingleBooking)

// Router.route('/logout').get(logoutUser);

module.exports = Router;