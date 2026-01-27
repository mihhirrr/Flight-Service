const express = require("express");
const { SeatsController } = require("../controllers");
const Router = express.Router();

Router.route('/').patch(SeatsController.updateSeats)

module.exports = Router