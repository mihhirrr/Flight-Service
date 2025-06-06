const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");

/**
 * Schedule a new flight with the provided details.
 *
 * @param {import('express').Request} req - Express request object containing flight details in body.
 * @param {import('express').Response} res - Express response object to send back the result.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<import('express').Response>} JSON response with created flight details or error.
 */
async function createFlight(req, res, next) {
  const {
    flightNumber,
    airplaneId,
    departureAirportCode,
    arrivalAirportCode,
    departureTime,
    arrivalTime,
    Fare
  } = req.body;

  try {
    const createdFlight = await FlightService.createFlight({
      flightNumber,
      airplaneId,
      departureAirportCode,
      arrivalAirportCode,
      departureTime,
      arrivalTime,
      Fare
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

/**
 * Fetch all flights with optional filters via query parameters.
 *
 * @param {import('express').Request} req - Express request object containing optional query filters.
 * @param {import('express').Response} res - Express response object to send back the results.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<import('express').Response>} JSON response with flights list or error.
 */
async function getAllFlights(req, res, next) {
  try {
    const foundFlights = await FlightService.getFlights(req.query);

    const SuccessResponse = {
      ...Success,
      data: foundFlights
    };

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const ErrorResponse = {
      ...Error,
      error: {
        message: error.message
      }
    };

    return res.status(200).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights
};