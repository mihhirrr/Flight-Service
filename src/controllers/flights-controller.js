const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");
const { CustomFilter } = require('../utils/Filter-helper')

async function createFlight(req, res, next) {
  const { flightNumber, airplaneId, departureAirportCode, arrivalAirportCode, departureTime, arrivalTime, Fare } = req.body;

  try {
    const createdFlight = await FlightService.createFlight({
      flightNumber, airplaneId, departureAirportCode, arrivalAirportCode, departureTime, arrivalTime, Fare
    });
    Success.message = "Flight scheduled successfully";
    Success.data = createdFlight;
    return res.status(StatusCodes.CREATED).json(Success);
  } catch (error) {
    Error.message = "Unable to add Flight";
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

async function getAllFlights(req,res,next){
    try {
      const customFilter = new CustomFilter(req.query).buildFilterObject();
      const foundFlights = await FlightService.getFlights(customFilter);
      res.status(StatusCodes.OK).json(foundFlights)
    } catch (error) {
      const ErrorResponse = { ...Error, error: { message: error.message } };
      res.status(500).json(ErrorResponse)
    }
}

module.exports = {
    createFlight, 
    getAllFlights
};