const express = require("express");
const { AirplaneController } = require("../controllers");
const Router = express.Router();

Router.route('/health').get(AirplaneController.getAirplaneRoute)
Router.route("/")
  .post(AirplaneController.createAirplane)
  .get(AirplaneController.getAllAirplanes);
Router.route("/:id")
  .get(AirplaneController.getAirplaneById)
  .put(AirplaneController.updateAirplane)
  .delete(AirplaneController.deleteAirplane);

module.exports = Router;
