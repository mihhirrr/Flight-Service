const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { Error, Success } = require("../utils/common-utils");


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

async function getFlightById(req, res, next) {
  const id = parseInt(req.params.id);

  try {
    const RetrievedFlight = await FlightService.getFlightById(id);
    Success.message = "Flight found!";
    Success.data = RetrievedFlight;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    Error.error.message = error.message;
    Error.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(Error);
  }
}

async function updateFlight(req, res, next) {
  const id = parseInt(req.params.id);

  const allowedUpdates = ['flightNumber', 'airplaneId', 'departureAirportCode', 'arrivalAirportCode', 'departureTime', 'arrivalTime', 'Fare', 'boardingGate'];
  let updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  console.log(updates)

  try {
    const updatedFlight = await FlightService.updateFlight(id, updates);
    Success.message = "Flight updated successfully!";
    Success.data = updatedFlight;
    return res.status(StatusCodes.OK).json(Success);
  } catch (error) {
    ErrorResponse = { ...Error }
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.StatusCode = error.StatusCode;
    return res.status(error.StatusCode).json(ErrorResponse);
  }
}


module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight
};