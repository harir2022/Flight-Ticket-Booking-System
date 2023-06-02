const express = require('express');
const { getAllFlights, getSpecificFlight, addFlight, removeFlight, updateFlight } = require('../controllers/FlightController');
const { isAuthenticatedUser, isAuthenticatedRole } = require('../middlewares/Auth');

const Router = express.Router();


Router.route('/flights/:id').get(getSpecificFlight);
Router.route('/flights').get(getAllFlights);

Router.route('/admin/flights/new').post(isAuthenticatedUser,isAuthenticatedRole('admin'),addFlight);

Router.route('/admin/flights/:id')
                                        .put(isAuthenticatedUser,isAuthenticatedRole('admin'),updateFlight)
                                        .delete(isAuthenticatedUser,isAuthenticatedRole('admin'),removeFlight);

module.exports = Router;