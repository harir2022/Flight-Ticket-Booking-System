const express = require('express');
const { newBooking, getSingleBooking, getAllBookings, getMyBookings } = require('../controllers/BookingController');
const { isAuthenticatedUser, isAuthenticatedRole } = require('../middlewares/Auth');

const Router = express.Router();


Router.route('/booking/new').post(isAuthenticatedUser,newBooking)
Router.route('/booking/:id').get(isAuthenticatedUser,getSingleBooking)
Router.route('/bookings/me').get(isAuthenticatedUser,getMyBookings);

Router.route('/admin/bookings').get(isAuthenticatedUser,isAuthenticatedRole('admin'),getAllBookings);

module.exports = Router;