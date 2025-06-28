const express = require("express");
const { SeatsController } = require("../controllers");
const Router = express.Router();

Router.route('/').patch(SeatsController.udpateSeats)

module.exports = Router