const express = require("express");
const { FlightController } = require("../controllers");
const Router = express.Router();

Router.route("/")
  .post(FlightController.createFlight)

module.exports = Router;