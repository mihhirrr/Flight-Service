const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

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

module.exports = {
    createFlight,
};
