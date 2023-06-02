const express = require('express');
const { getAllFlights, getSpecificFlight } = require('../controllers/FlightController');

const Router = express.Router();


Router.route('/flights').get(getAllFlights);
Router.route('/flights:id').get(getSpecificFlight);

// Router.route('/logout').get(logoutUser);

module.exports = Router;