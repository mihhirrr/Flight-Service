const express = require("express");
const { CityController } = require("../controllers");
const Router = express.Router();

Router.route("/")
        .post(CityController.createCity)
        .get(CityController.getAllCities);

Router.route("/:id")
        .get(CityController.getCityById)
        .put(CityController.updateCity)
        .delete(CityController.deleteCity);

module.exports = Router;
