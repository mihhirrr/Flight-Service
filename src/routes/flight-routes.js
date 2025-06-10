const express = require("express");
const { FlightController } = require("../controllers");
const Router = express.Router();
const { FlightMiddleware } = require('../middlewares')

Router.route("/")
  .post(FlightMiddleware.compareTime, FlightController.createFlight)
  .get(FlightMiddleware.getFlightsValidation,FlightController.getAllFlights)

Router.route('/:id')
  .get(FlightController.getFlightById)
  .patch(FlightController.updateFlight)


module.exports = Router;