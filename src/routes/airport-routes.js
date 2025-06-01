const express = require("express");
const { AirportController } = require("../controllers");
const Router = express.Router();

Router.route("/")
  .post(AirportController.createAirport)
  .get(AirportController.getAllAirports);
Router.route("/:id")
  .get(AirportController.getAirportById)
  .put(AirportController.updateAirport)
  .delete(AirportController.deleteAirport);

module.exports = Router;
