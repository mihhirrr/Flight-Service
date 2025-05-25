const express = require("express");
const { AirplaneController } = require("../controllers");
const Router = express.Router();

Router.post("/airplanes", AirplaneController.createAirplane);

module.exports = Router;
