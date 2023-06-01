const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const Router = express.Router();


Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);

Router.route('/logout').get(logoutUser);

module.exports = Router;